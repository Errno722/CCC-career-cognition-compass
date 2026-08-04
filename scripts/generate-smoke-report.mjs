import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";

const casesPath = "evals/cases.json";
const runnerPath = "scripts/run-deterministic-eval.mjs";
const checkEvalsPath = "scripts/check-evals.mjs";
const requiredSmokeCaseIds = [
  "greeting-001",
  "messy-input-001",
  "project-mining-001",
  "privacy-001",
  "interviewer-role-focus-001"
];
const placeholders = [
  "REPLACE_WITH_ACTUAL_MODEL",
  "REPLACE_WITH_ACTUAL_ASSISTANT_OUTPUT"
];

function usage() {
  return [
    "Usage:",
    "  node scripts/generate-smoke-report.mjs evals/inputs/chatgpt-smoke.input.json",
    "  node scripts/generate-smoke-report.mjs evals/inputs/chatgpt-smoke.input.json --output evals/results/chatgpt/2026-08-04-smoke-2.json"
  ].join("\n");
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function parseArgs(argv) {
  let inputPath = null;
  let outputPath = null;

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];

    if (arg === "--output") {
      outputPath = argv[index + 1];
      index += 1;
      if (!outputPath) {
        throw new Error("--output requires a file path");
      }
      continue;
    }

    if (arg.startsWith("--")) {
      throw new Error(`unknown option: ${arg}`);
    }

    if (inputPath) {
      throw new Error("only one input JSON file is supported");
    }
    inputPath = arg;
  }

  if (!inputPath) {
    throw new Error(usage());
  }

  return { inputPath, outputPath };
}

function assertNoPlaceholders(value, location = "input") {
  if (typeof value === "string") {
    for (const placeholder of placeholders) {
      if (value.includes(placeholder)) {
        throw new Error(`${location} still contains placeholder: ${placeholder}`);
      }
    }
    return;
  }

  if (Array.isArray(value)) {
    value.forEach((item, index) => assertNoPlaceholders(item, `${location}[${index}]`));
    return;
  }

  if (value && typeof value === "object") {
    for (const [key, item] of Object.entries(value)) {
      assertNoPlaceholders(item, `${location}.${key}`);
    }
  }
}

function nonEmptyString(value, name) {
  if (typeof value !== "string" || value.trim().length === 0) {
    throw new Error(`${name} must be a non-empty string`);
  }
  return value.trim();
}

function assertSafeAdapter(adapter) {
  if (!/^[a-z0-9][a-z0-9-]*$/.test(adapter)) {
    throw new Error("adapter must use lowercase letters, numbers, and hyphens only");
  }
}

function assertSourceCommit(sourceCommit) {
  if (!/^[a-f0-9]{40}$/.test(sourceCommit)) {
    throw new Error("source_commit must be a full 40-character lowercase git SHA");
  }
}

function assertExactSmokeCases(inputCases, caseMap) {
  if (!Array.isArray(inputCases)) {
    throw new Error("cases must be an array");
  }

  if (inputCases.length !== requiredSmokeCaseIds.length) {
    throw new Error(`smoke input must contain exactly ${requiredSmokeCaseIds.length} cases`);
  }

  const seen = new Set();
  const normalizedById = new Map();

  for (const item of inputCases) {
    if (!item || typeof item !== "object" || Array.isArray(item)) {
      throw new Error("each case must be an object");
    }

    const caseId = nonEmptyString(item.case_id, "case_id");
    if (seen.has(caseId)) {
      throw new Error(`duplicate case_id: ${caseId}`);
    }
    seen.add(caseId);

    if (!requiredSmokeCaseIds.includes(caseId)) {
      throw new Error(`unexpected smoke case_id: ${caseId}`);
    }

    const canonicalCase = caseMap.get(caseId);
    if (!canonicalCase) {
      throw new Error(`unknown case_id in ${casesPath}: ${caseId}`);
    }

    if (typeof item.input !== "string") {
      throw new Error(`${caseId} must include the original input from ${casesPath}`);
    }

    if (item.input !== canonicalCase.input) {
      throw new Error(`${caseId} input must exactly match ${casesPath}`);
    }

    const assistantOutput = nonEmptyString(item.assistant_output, `${caseId}.assistant_output`);
    normalizedById.set(caseId, {
      case_id: caseId,
      assistant_output: assistantOutput
    });
  }

  const missingCaseIds = requiredSmokeCaseIds.filter((caseId) => !seen.has(caseId));
  if (missingCaseIds.length > 0) {
    throw new Error(`missing smoke case(s): ${missingCaseIds.join(", ")}`);
  }

  return requiredSmokeCaseIds.map((caseId) => normalizedById.get(caseId));
}

function reportDate() {
  return new Date().toISOString().slice(0, 10);
}

function safeRunIdFragment(runId) {
  return runId.replace(/[^A-Za-z0-9._-]+/g, "-").slice(0, 80);
}

function resolveOutputPath(adapter, inputRunId, requestedOutputPath) {
  const repoRoot = process.cwd();
  let outputPath;

  if (requestedOutputPath) {
    outputPath = requestedOutputPath;
  } else {
    outputPath = path.join("evals", "results", adapter, `${reportDate()}-smoke.json`);
    if (fs.existsSync(outputPath) && typeof inputRunId === "string" && inputRunId.trim().length > 0) {
      outputPath = path.join(
        "evals",
        "results",
        adapter,
        `${reportDate()}-smoke-${safeRunIdFragment(inputRunId.trim())}.json`
      );
    }
  }

  const absolutePath = path.resolve(outputPath);
  const relativePath = path.relative(repoRoot, absolutePath);
  const relativePosixPath = relativePath.split(path.sep).join("/");

  if (relativePath.startsWith("..") || path.isAbsolute(relativePath)) {
    throw new Error("output path must stay inside this repository");
  }

  if (!relativePosixPath.startsWith(`evals/results/${adapter}/`)) {
    throw new Error(`output path must be under evals/results/${adapter}/`);
  }

  if (!relativePosixPath.endsWith(".json")) {
    throw new Error("output path must end with .json");
  }

  if (fs.existsSync(absolutePath)) {
    throw new Error(
      `${relativePosixPath} already exists; provide --output with a new file name or set a unique run_id`
    );
  }

  return { absolutePath, relativePosixPath };
}

function runNodeScript(scriptPath, inputJson = null) {
  return spawnSync(process.execPath, [scriptPath], {
    input: inputJson,
    encoding: "utf8"
  });
}

function parseRunnerReport(result) {
  try {
    return JSON.parse(result.stdout);
  } catch (error) {
    throw new Error(`runner did not produce valid JSON:\n${result.stdout}\n${result.stderr}`);
  }
}

function failedCheckNames(caseResult) {
  return Object.entries(caseResult.checks)
    .filter(([, status]) => status === "fail")
    .map(([checkName]) => checkName);
}

function printSummary(report, reportPath) {
  const failedCases = report.cases.filter((item) => !item.deterministic_pass);
  const passCount = report.cases.length - failedCases.length;

  console.log(`report_path: ${reportPath}`);
  console.log(`total_cases: ${report.cases.length}`);
  console.log(`deterministic_passed: ${passCount}`);
  console.log(`failed_cases: ${failedCases.length === 0 ? "none" : failedCases.map((item) => item.case_id).join(", ")}`);

  if (failedCases.length > 0) {
    console.log("failed_case_checks:");
    for (const item of failedCases) {
      console.log(`- ${item.case_id}: ${failedCheckNames(item).join(", ")}`);
    }
  }

  console.log(`recomputed: ${report.verification_level === "recomputed" ? "yes" : "no"}`);
  console.log(`adapter: ${report.adapter}`);
  console.log(`model: ${report.model}`);
  console.log(`source_commit: ${report.source_commit}`);
}

try {
  const { inputPath, outputPath } = parseArgs(process.argv.slice(2));
  const suite = readJson(casesPath);
  const caseMap = new Map(suite.cases.map((item) => [item.id, item]));
  const input = readJson(inputPath);

  assertNoPlaceholders(input);

  const adapter = nonEmptyString(input.adapter, "adapter");
  assertSafeAdapter(adapter);
  const model = nonEmptyString(input.model, "model");
  const sourceCommit = nonEmptyString(input.source_commit, "source_commit");
  assertSourceCommit(sourceCommit);
  const cases = assertExactSmokeCases(input.cases, caseMap);
  const runId = typeof input.run_id === "string" && input.run_id.trim().length > 0 ? input.run_id.trim() : undefined;
  const { absolutePath, relativePosixPath } = resolveOutputPath(adapter, runId, outputPath);

  const runnerInput = {
    adapter,
    model,
    source_commit: sourceCommit,
    include_assistant_output: true,
    cases
  };

  if (runId) {
    runnerInput.run_id = runId;
  }

  const runnerResult = runNodeScript(runnerPath, JSON.stringify(runnerInput));
  if (runnerResult.status === 2) {
    throw new Error(`runner input/schema error:\n${runnerResult.stderr}`);
  }

  if (![0, 1].includes(runnerResult.status)) {
    throw new Error(`runner exited with unexpected status ${runnerResult.status}:\n${runnerResult.stderr}`);
  }

  const report = parseRunnerReport(runnerResult);
  if (report.verification_level !== "recomputed") {
    throw new Error("smoke reports must be verification_level: recomputed");
  }

  fs.mkdirSync(path.dirname(absolutePath), { recursive: true });
  fs.writeFileSync(absolutePath, `${JSON.stringify(report, null, 2)}\n`, "utf8");

  const checkResult = runNodeScript(checkEvalsPath);
  if (checkResult.status !== 0) {
    fs.unlinkSync(absolutePath);
    throw new Error(
      `saved report failed ${checkEvalsPath}; removed ${relativePosixPath}\n${checkResult.stdout}\n${checkResult.stderr}`
    );
  }

  printSummary(report, relativePosixPath);
} catch (error) {
  console.error(error instanceof Error ? error.message : String(error));
  process.exitCode = 1;
}
