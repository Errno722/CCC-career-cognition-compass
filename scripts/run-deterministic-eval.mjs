import fs from "node:fs";
import crypto from "node:crypto";

const casesPath = "evals/cases.json";
const runnerVersion = "0.1.0";
const checkNames = [
  "literal_all_of",
  "literal_any_of",
  "literal_not_contains",
  "regex_not_contains",
  "max_questions",
  "max_characters"
];

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function readStdin() {
  return fs.readFileSync(0, "utf8");
}

function statusResult(status, detail) {
  return { status, detail };
}

function normalizeText(value) {
  return value
    .normalize("NFKC")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();
}

function asOutputText(value) {
  if (typeof value !== "string") {
    throw new Error("assistant_output must be a string");
  }
  return value;
}

function outputViews(output) {
  return {
    raw: output,
    normalized: normalizeText(output)
  };
}

function literalAppears(views, literal) {
  return views.raw.includes(literal) || views.normalized.includes(normalizeText(literal));
}

function countQuestions(text) {
  return (text.match(/[?？]/g) ?? []).length;
}

function charLength(text) {
  return Array.from(text).length;
}

function hashOutput(text) {
  return crypto.createHash("sha256").update(text).digest("hex");
}

function outputMetrics(output) {
  return {
    character_count: charLength(output),
    question_mark_count: countQuestions(output),
    estimated_follow_up_question_count: "semantic_pending"
  };
}

function checkLiteralAllOf(expected, views) {
  const required = expected.literal_all_of;
  const missing = required.filter((literal) => !literalAppears(views, literal));

  if (missing.length > 0) {
    return statusResult("fail", `missing: ${missing.join(", ")}`);
  }

  return statusResult("pass", `found ${required.length}/${required.length}`);
}

function checkLiteralAnyOf(expected, views) {
  const missingGroups = expected.literal_any_of
    .map((group, index) => ({ group, index }))
    .filter(({ group }) => !group.some((literal) => literalAppears(views, literal)));

  if (missingGroups.length > 0) {
    return statusResult(
      "fail",
      `missing any option from groups: ${missingGroups.map(({ index }) => index).join(", ")}`
    );
  }

  return statusResult("pass", `matched ${expected.literal_any_of.length}/${expected.literal_any_of.length} groups`);
}

function checkLiteralNotContains(expected, views) {
  const forbidden = expected.literal_not_contains.filter((literal) => literalAppears(views, literal));

  if (forbidden.length > 0) {
    return statusResult("fail", `forbidden literal found: ${forbidden.length} item(s)`);
  }

  return statusResult("pass", `no forbidden literals found (${expected.literal_not_contains.length} checked)`);
}

function checkRegexNotContains(expected, views) {
  const matched = [];

  for (const pattern of expected.regex_not_contains) {
    const regex = new RegExp(pattern);
    if (regex.test(views.raw) || regex.test(views.normalized)) {
      matched.push(pattern);
    }
  }

  if (matched.length > 0) {
    return statusResult("fail", `forbidden regex matched: ${matched.length} pattern(s)`);
  }

  return statusResult("pass", `no forbidden regex matched (${expected.regex_not_contains.length} checked)`);
}

function checkMaxQuestions(expected, output) {
  const limit = expected.structural_assertions.max_questions;
  const actual = countQuestions(output);

  if (actual > limit) {
    return statusResult("fail", `question marks: ${actual}, limit: ${limit}`);
  }

  return statusResult("pass", `question marks: ${actual}, limit: ${limit}`);
}

function checkMaxCharacters(expected, output) {
  const limit = expected.structural_assertions.max_characters;

  if (!Number.isInteger(limit)) {
    return statusResult("not_applicable", "no max_characters assertion");
  }

  const actual = charLength(output);
  if (actual > limit) {
    return statusResult("fail", `characters: ${actual}, limit: ${limit}`);
  }

  return statusResult("pass", `characters: ${actual}, limit: ${limit}`);
}

function toStatusMap(details) {
  return Object.fromEntries(checkNames.map((name) => [name, details[name].status]));
}

function runCase(caseItem, assistantOutput, options = {}) {
  const output = asOutputText(assistantOutput);
  const views = outputViews(output);
  const expected = caseItem.expected;

  const checkDetails = {
    literal_all_of: checkLiteralAllOf(expected, views),
    literal_any_of: checkLiteralAnyOf(expected, views),
    literal_not_contains: checkLiteralNotContains(expected, views),
    regex_not_contains: checkRegexNotContains(expected, views),
    max_questions: checkMaxQuestions(expected, output),
    max_characters: checkMaxCharacters(expected, output)
  };

  const checks = toStatusMap(checkDetails);
  const deterministicPass = Object.values(checks).every((status) => status === "pass" || status === "not_applicable");
  const result = {
    case_id: caseItem.id,
    assistant_output_sha256: hashOutput(output),
    deterministic_status: deterministicPass ? "pass" : "fail",
    deterministic_pass: deterministicPass,
    metrics: outputMetrics(output),
    checks,
    check_details: checkDetails,
    semantic_status: "pending"
  };

  if (options.includeAssistantOutput) {
    result.assistant_output = output;
  }

  return result;
}

function getCase(caseMap, caseId) {
  const caseItem = caseMap.get(caseId);
  if (!caseItem) {
    throw new Error(`unknown case_id: ${caseId}`);
  }
  return caseItem;
}

function runSingleInput(caseMap, input, options = {}) {
  if (!input || typeof input !== "object" || Array.isArray(input)) {
    throw new Error("input must be a JSON object");
  }

  if (typeof input.case_id !== "string") {
    throw new Error("input.case_id must be a string");
  }

  return runCase(getCase(caseMap, input.case_id), input.assistant_output, {
    includeAssistantOutput: options.includeAssistantOutput || input.include_assistant_output === true
  });
}

function runReportInput(suite, caseMap, input) {
  if (!Array.isArray(input.cases)) {
    throw new Error("report input must contain cases array");
  }

  return {
    result_schema_version: "0.1.0",
    suite_id: suite.suite_id,
    suite_schema_version: suite.schema_version,
    evaluation_target: suite.evaluation_target,
    run_id: input.run_id ?? "local-deterministic-eval",
    runner_version: runnerVersion,
    adapter: input.adapter ?? input.platform ?? "fixture",
    model: input.model ?? null,
    created_at: input.created_at ?? new Date().toISOString(),
    cases: input.cases.map((item) => runSingleInput(caseMap, item, {
      includeAssistantOutput: input.include_assistant_output === true
    }))
  };
}

function readInputFromArgs(args) {
  if (args.length === 0) {
    return JSON.parse(readStdin());
  }

  if (args.length === 1) {
    return readJson(args[0]);
  }

  return {
    run_id: "local-deterministic-eval",
    adapter: "fixture",
    model: null,
    cases: args.map((filePath) => readJson(filePath))
  };
}

try {
  const suite = readJson(casesPath);
  const caseMap = new Map(suite.cases.map((item) => [item.id, item]));
  const input = readInputFromArgs(process.argv.slice(2));
  const result = Array.isArray(input.cases)
    ? runReportInput(suite, caseMap, input)
    : runReportInput(suite, caseMap, {
        run_id: input.run_id ?? "local-deterministic-eval",
        adapter: input.adapter ?? input.platform ?? "fixture",
        model: input.model ?? null,
        created_at: input.created_at,
        include_assistant_output: input.include_assistant_output === true,
        cases: [input]
      });

  console.log(JSON.stringify(result, null, 2));

  const deterministicPass = result.cases.every((item) => item.deterministic_pass);
  process.exitCode = deterministicPass ? 0 : 1;
} catch (error) {
  console.error(error instanceof Error ? error.message : String(error));
  process.exitCode = 2;
}
