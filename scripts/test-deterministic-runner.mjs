import fs from "node:fs";
import { spawnSync } from "node:child_process";

const fixturesDir = "evals/fixtures";
const runnerPath = "scripts/run-deterministic-eval.mjs";
const allowedExpectedStatuses = new Set(["pass", "fail"]);

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function fixtureFiles() {
  return fs
    .readdirSync(fixturesDir)
    .filter((name) => name.endsWith(".input.json"))
    .sort()
    .map((name) => `${fixturesDir}/${name}`);
}

function assertFixtureExpectation(filePath, fixture) {
  if (!allowedExpectedStatuses.has(fixture.expected_runner_status)) {
    throw new Error(`${filePath} expected_runner_status must be pass or fail`);
  }
}

function runFixture(filePath) {
  const fixture = readJson(filePath);
  assertFixtureExpectation(filePath, fixture);

  const result = spawnSync(process.execPath, [runnerPath, filePath], {
    encoding: "utf8"
  });

  if (result.status === 2) {
    throw new Error(`${filePath} produced runner input/schema error:\n${result.stderr}`);
  }

  let report;
  try {
    report = JSON.parse(result.stdout);
  } catch (error) {
    throw new Error(`${filePath} did not produce JSON stdout:\n${result.stdout}\n${result.stderr}`);
  }

  const deterministicPass = report.cases.every((item) => item.deterministic_pass);
  const expectedExitCode = fixture.expected_runner_status === "pass" ? 0 : 1;

  if (result.status !== expectedExitCode) {
    throw new Error(
      `${filePath} exit code ${result.status} did not match expected ${expectedExitCode} (${fixture.expected_runner_status})`
    );
  }

  if (fixture.expected_runner_status === "pass" && !deterministicPass) {
    throw new Error(`${filePath} expected pass but report contains deterministic failure`);
  }

  if (fixture.expected_runner_status === "fail" && deterministicPass) {
    throw new Error(`${filePath} expected fail but report contains no deterministic failure`);
  }

  return {
    filePath,
    status: fixture.expected_runner_status,
    caseCount: report.cases.length
  };
}

const files = fixtureFiles();
if (files.length === 0) {
  throw new Error(`${fixturesDir} must contain at least one .input.json fixture`);
}

const results = files.map(runFixture);
const passed = results.filter((item) => item.status === "pass").length;
const failedAsExpected = results.filter((item) => item.status === "fail").length;

console.log(`deterministic runner fixtures ok: ${results.length}`);
console.log(`expected pass fixtures: ${passed}`);
console.log(`expected fail fixtures: ${failedAsExpected}`);
