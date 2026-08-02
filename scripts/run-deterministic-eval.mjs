import fs from "node:fs";
import {
  hashText,
  runCase,
  runnerVersion
} from "./lib/deterministic-eval.mjs";
import { validateJsonOrThrow } from "./lib/schema-validator.mjs";

const casesPath = "evals/cases.json";
const resultSchemaPath = "evals/result-schema.json";

function readFile(filePath) {
  return fs.readFileSync(filePath, "utf8");
}

function readJson(filePath) {
  return JSON.parse(readFile(filePath));
}

function readStdin() {
  return fs.readFileSync(0, "utf8");
}

function sourceCommit(input) {
  return input.source_commit ?? process.env.SOURCE_COMMIT ?? null;
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

function runReportInput(suite, suiteSha256, caseMap, input) {
  if (!Array.isArray(input.cases)) {
    throw new Error("report input must contain cases array");
  }

  if (input.cases.length === 0) {
    throw new Error("report input cases must contain at least one case");
  }

  const includeAssistantOutput = input.include_assistant_output === true;

  return {
    result_schema_version: "0.1.0",
    suite_id: suite.suite_id,
    suite_schema_version: suite.schema_version,
    suite_sha256: suiteSha256,
    source_commit: sourceCommit(input),
    evaluation_target: suite.evaluation_target,
    run_id: input.run_id ?? "local-deterministic-eval",
    runner_version: runnerVersion,
    verification_level: includeAssistantOutput ? "recomputed" : "runner_generated",
    adapter: input.adapter ?? input.platform ?? "fixture",
    model: input.model ?? null,
    created_at: input.created_at ?? new Date().toISOString(),
    cases: input.cases.map((item) => runSingleInput(caseMap, item, { includeAssistantOutput }))
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
  const suiteRaw = readFile(casesPath);
  const suite = JSON.parse(suiteRaw);
  const suiteSha256 = hashText(suiteRaw);
  const resultSchema = readJson(resultSchemaPath);
  const caseMap = new Map(suite.cases.map((item) => [item.id, item]));
  const input = readInputFromArgs(process.argv.slice(2));
  const result = Array.isArray(input.cases)
    ? runReportInput(suite, suiteSha256, caseMap, input)
    : runReportInput(suite, suiteSha256, caseMap, {
        run_id: input.run_id ?? "local-deterministic-eval",
        adapter: input.adapter ?? input.platform ?? "fixture",
        model: input.model ?? null,
        source_commit: input.source_commit,
        created_at: input.created_at,
        include_assistant_output: input.include_assistant_output === true,
        cases: [input]
      });

  validateJsonOrThrow(result, resultSchema, "deterministic eval result");
  console.log(JSON.stringify(result, null, 2));

  const deterministicPass = result.cases.every((item) => item.deterministic_pass);
  process.exitCode = deterministicPass ? 0 : 1;
} catch (error) {
  console.error(error instanceof Error ? error.message : String(error));
  process.exitCode = 2;
}
