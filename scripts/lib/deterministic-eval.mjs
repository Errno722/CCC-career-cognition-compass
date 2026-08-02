import crypto from "node:crypto";

export const runnerVersion = "0.2.0";
export const checkNames = [
  "literal_all_of",
  "literal_any_of",
  "literal_not_contains",
  "regex_not_contains",
  "max_questions",
  "max_characters"
];

export function hashText(text) {
  return crypto.createHash("sha256").update(text).digest("hex");
}

export function normalizeText(value) {
  return value
    .normalize("NFKC")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();
}

export function asOutputText(value) {
  if (typeof value !== "string") {
    throw new Error("assistant_output must be a string");
  }
  return value;
}

export function outputViews(output) {
  return {
    raw: output,
    normalized: normalizeText(output)
  };
}

export function countQuestions(text) {
  return (text.match(/[?？]/g) ?? []).length;
}

export function charLength(text) {
  return Array.from(text).length;
}

export function outputMetrics(output) {
  return {
    character_count: charLength(output),
    question_mark_count: countQuestions(output),
    estimated_follow_up_question_count: "semantic_pending"
  };
}

function statusResult(status, detail) {
  return { status, detail };
}

function literalAppears(views, literal) {
  return views.raw.includes(literal) || views.normalized.includes(normalizeText(literal));
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

export function runCase(caseItem, assistantOutput, options = {}) {
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
    assistant_output_sha256: hashText(output),
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

export function deterministicChecksMatch(a, b) {
  return JSON.stringify(a.checks) === JSON.stringify(b.checks) &&
    JSON.stringify(a.check_details) === JSON.stringify(b.check_details) &&
    JSON.stringify(a.metrics) === JSON.stringify(b.metrics) &&
    a.assistant_output_sha256 === b.assistant_output_sha256 &&
    a.deterministic_status === b.deterministic_status &&
    a.deterministic_pass === b.deterministic_pass;
}
