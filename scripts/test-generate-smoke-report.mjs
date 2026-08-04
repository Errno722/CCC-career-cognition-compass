import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";

const repoRoot = process.cwd();
const generatorPath = "scripts/generate-smoke-report.mjs";
const requiredSmokeCaseIds = [
  "greeting-001",
  "messy-input-001",
  "project-mining-001",
  "privacy-001",
  "interviewer-role-focus-001"
];

const copyEntries = [
  ".gitignore",
  "README.md",
  "CHANGELOG.md",
  "SKILLS.md",
  "core",
  "docs",
  "evals",
  "prompts",
  "scripts",
  "skills",
  "workbuddy"
];

function officialResultsSignature() {
  const root = path.join(repoRoot, "evals", "results");
  const files = [];
  if (!fs.existsSync(root)) {
    return "";
  }

  const stack = [root];
  while (stack.length > 0) {
    const dir = stack.pop();
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const entryPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        stack.push(entryPath);
      } else if (entry.isFile()) {
        files.push(path.relative(repoRoot, entryPath));
      }
    }
  }

  return files.sort().join("\n");
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function writeJson(filePath, value) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, `${JSON.stringify(value, null, 2)}\n`, "utf8");
}

function run(command, args, cwd) {
  return spawnSync(command, args, {
    cwd,
    encoding: "utf8"
  });
}

function runOrThrow(command, args, cwd) {
  const result = run(command, args, cwd);
  if (result.status !== 0) {
    throw new Error(`${command} ${args.join(" ")} failed:\n${result.stdout}\n${result.stderr}`);
  }
  return result.stdout;
}

function commitAll(cwd, message) {
  runOrThrow("git", ["add", "."], cwd);
  runOrThrow(
    "git",
    ["-c", "user.name=CCC Test", "-c", "user.email=ccc-test@example.com", "commit", "-m", message],
    cwd
  );
  return runOrThrow("git", ["rev-parse", "HEAD"], cwd).trim();
}

function makeTempRepo() {
  const tempRoot = fs.mkdtempSync(path.join(os.tmpdir(), "ccc-smoke-test-"));

  for (const entry of copyEntries) {
    const source = path.join(repoRoot, entry);
    const target = path.join(tempRoot, entry);
    if (fs.existsSync(source)) {
      fs.cpSync(source, target, { recursive: true });
    }
  }

  fs.rmSync(path.join(tempRoot, "evals", "results", "smoke-test"), {
    recursive: true,
    force: true
  });

  runOrThrow("git", ["init", "-q"], tempRoot);
  const head = commitAll(tempRoot, "initial");

  return { dir: tempRoot, head };
}

function cleanup(repo) {
  fs.rmSync(repo.dir, { recursive: true, force: true });
}

function caseMap(repo) {
  const suite = readJson(path.join(repo.dir, "evals", "cases.json"));
  return new Map(suite.cases.map((item) => [item.id, item]));
}

function validInput(repo, options = {}) {
  const casesById = caseMap(repo);
  const output = options.assistantOutput ?? "合成测试回复：只用于验证 smoke report 生成流程。";
  return {
    adapter: options.adapter ?? "smoke-test",
    model: options.model ?? "test-model",
    source_commit: options.sourceCommit ?? repo.head,
    include_assistant_output: options.includeAssistantOutput ?? true,
    run_id: options.runId,
    cases: requiredSmokeCaseIds.map((caseId) => ({
      case_id: caseId,
      input: casesById.get(caseId).input,
      assistant_output: typeof output === "function" ? output(caseId) : output
    }))
  };
}

function writeInput(repo, name, input) {
  const filePath = path.join(repo.dir, "evals", "inputs", name);
  writeJson(filePath, input);
  return path.relative(repo.dir, filePath);
}

function runGenerator(repo, inputPath, extraArgs = []) {
  return run(process.execPath, [generatorPath, inputPath, ...extraArgs], repo.dir);
}

function combinedOutput(result) {
  return `${result.stdout}\n${result.stderr}`;
}

function expectFailure(name, result, expectedText = null) {
  if (result.status === 0) {
    throw new Error(`${name}: expected failure but command succeeded`);
  }
  if (expectedText && !combinedOutput(result).includes(expectedText)) {
    throw new Error(`${name}: expected output to include ${expectedText}\n${combinedOutput(result)}`);
  }
}

function expectSuccess(name, result) {
  if (result.status !== 0) {
    throw new Error(`${name}: expected success\n${combinedOutput(result)}`);
  }
}

function withRepo(name, fn) {
  const repo = makeTempRepo();
  try {
    fn(repo);
    console.log(`ok - ${name}`);
  } finally {
    cleanup(repo);
  }
}

const tests = [
  [
    "placeholder input fails",
    (repo) => {
      const result = runGenerator(repo, "evals/inputs/chatgpt-smoke.template.json");
      expectFailure("placeholder input fails", result, "still contains placeholder");
    }
  ],
  [
    "missing smoke case fails",
    (repo) => {
      const input = validInput(repo);
      input.cases.pop();
      const inputPath = writeInput(repo, "missing.input.json", input);
      const result = runGenerator(repo, inputPath);
      expectFailure("missing smoke case fails", result, "exactly 5 cases");
    }
  ],
  [
    "duplicate case id fails",
    (repo) => {
      const input = validInput(repo);
      input.cases[1] = { ...input.cases[0] };
      const inputPath = writeInput(repo, "duplicate.input.json", input);
      const result = runGenerator(repo, inputPath);
      expectFailure("duplicate case id fails", result, "duplicate case_id");
    }
  ],
  [
    "case input mismatch fails",
    (repo) => {
      const input = validInput(repo);
      input.cases[0].input = "mismatched input";
      const inputPath = writeInput(repo, "mismatch.input.json", input);
      const result = runGenerator(repo, inputPath);
      expectFailure("case input mismatch fails", result, "must exactly match");
    }
  ],
  [
    "empty assistant output fails",
    (repo) => {
      const input = validInput(repo);
      input.cases[0].assistant_output = " ";
      const inputPath = writeInput(repo, "empty-output.input.json", input);
      const result = runGenerator(repo, inputPath);
      expectFailure("empty assistant output fails", result, "assistant_output");
    }
  ],
  [
    "invalid source commit fails",
    (repo) => {
      const input = validInput(repo, { sourceCommit: "abc" });
      const inputPath = writeInput(repo, "bad-sha.input.json", input);
      const result = runGenerator(repo, inputPath);
      expectFailure("invalid source commit fails", result, "40-character");
    }
  ],
  [
    "source commit not HEAD fails",
    (repo) => {
      const input = validInput(repo, { sourceCommit: "0".repeat(40) });
      const inputPath = writeInput(repo, "not-head.input.json", input);
      const result = runGenerator(repo, inputPath);
      expectFailure("source commit not HEAD fails", result, "must match current HEAD");
    }
  ],
  [
    "dirty worktree fails",
    (repo) => {
      const inputPath = writeInput(repo, "dirty.input.json", validInput(repo));
      fs.appendFileSync(path.join(repo.dir, "README.md"), "\nDirty test line.\n", "utf8");
      const result = runGenerator(repo, inputPath);
      expectFailure("dirty worktree fails", result, "worktree must be clean");
    }
  ],
  [
    "output path outside repo fails",
    (repo) => {
      const inputPath = writeInput(repo, "outside.input.json", validInput(repo));
      const result = runGenerator(repo, inputPath, ["--output", "../bad.json"]);
      expectFailure("output path outside repo fails", result, "inside this repository");
    }
  ],
  [
    "output adapter mismatch fails",
    (repo) => {
      const inputPath = writeInput(repo, "adapter-mismatch.input.json", validInput(repo));
      const result = runGenerator(repo, inputPath, ["--output", "evals/results/other/adapter-mismatch.json"]);
      expectFailure("output adapter mismatch fails", result, "evals/results/smoke-test");
    }
  ],
  [
    "target exists fails",
    (repo) => {
      const target = path.join(repo.dir, "evals", "results", "smoke-test", "existing.json");
      fs.mkdirSync(path.dirname(target), { recursive: true });
      fs.writeFileSync(target, "{}\n", "utf8");
      repo.head = commitAll(repo.dir, "add existing target");
      const inputPath = writeInput(repo, "target-exists.input.json", validInput(repo));
      const result = runGenerator(repo, inputPath, ["--output", "evals/results/smoke-test/existing.json"]);
      expectFailure("target exists fails", result, "already exists");
    }
  ],
  [
    "legal synthetic input generates recomputed report",
    (repo) => {
      const inputPath = writeInput(repo, "legal.input.json", validInput(repo));
      const outputPath = "evals/results/smoke-test/legal.json";
      const result = runGenerator(repo, inputPath, ["--output", outputPath]);
      expectSuccess("legal synthetic input generates recomputed report", result);
      const report = readJson(path.join(repo.dir, outputPath));
      if (report.verification_level !== "recomputed" || report.cases.length !== requiredSmokeCaseIds.length) {
        throw new Error("legal report should be recomputed and include all smoke cases");
      }
    }
  ],
  [
    "runner exit 1 still saves report",
    (repo) => {
      const input = validInput(repo, { assistantOutput: "x" });
      const inputPath = writeInput(repo, "runner-fail.input.json", input);
      const outputPath = "evals/results/smoke-test/runner-fail.json";
      const result = runGenerator(repo, inputPath, ["--output", outputPath]);
      expectSuccess("runner exit 1 still saves report", result);
      const report = readJson(path.join(repo.dir, outputPath));
      if (report.cases.every((item) => item.deterministic_pass)) {
        throw new Error("expected at least one deterministic failure in runner-fail report");
      }
    }
  ],
  [
    "runner exit 2 does not save report",
    (repo) => {
      fs.writeFileSync(
        path.join(repo.dir, "scripts", "run-deterministic-eval.mjs"),
        "console.error('forced runner schema error'); process.exit(2);\n",
        "utf8"
      );
      repo.head = commitAll(repo.dir, "force runner exit 2");
      const inputPath = writeInput(repo, "runner-error.input.json", validInput(repo));
      const outputPath = "evals/results/smoke-test/runner-error.json";
      const result = runGenerator(repo, inputPath, ["--output", outputPath]);
      expectFailure("runner exit 2 does not save report", result, "runner input/schema error");
      if (fs.existsSync(path.join(repo.dir, outputPath))) {
        throw new Error("runner exit 2 should not save a report");
      }
    }
  ],
  [
    "check-evals failure deletes created report",
    (repo) => {
      fs.writeFileSync(path.join(repo.dir, "scripts", "check-evals.mjs"), "process.exit(1);\n", "utf8");
      repo.head = commitAll(repo.dir, "force check failure");
      const inputPath = writeInput(repo, "check-fail.input.json", validInput(repo));
      const outputPath = "evals/results/smoke-test/check-fail.json";
      const result = runGenerator(repo, inputPath, ["--output", outputPath]);
      expectFailure("check-evals failure deletes created report", result, "removed evals/results/smoke-test/check-fail.json");
      if (fs.existsSync(path.join(repo.dir, outputPath))) {
        throw new Error("check-evals failure should delete the just-created report");
      }
    }
  ]
];

const initialOfficialResults = officialResultsSignature();

for (const [name, fn] of tests) {
  withRepo(name, fn);
}

if (officialResultsSignature() !== initialOfficialResults) {
  throw new Error("official evals/results changed during smoke generator tests");
}

console.log("ok - official eval results unchanged");
console.log(`smoke report generator tests ok: ${tests.length + 1}`);
