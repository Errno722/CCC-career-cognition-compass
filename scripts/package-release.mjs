import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";

const repoRoot = process.cwd();
const distDir = path.join(repoRoot, "dist");
const stagingDir = path.join(distDir, "release-staging");
const outputDir = path.join(distDir, "release");

const packages = [
  {
    name: "CCC-lite-pack",
    files: [
      "README.md",
      "README.en.md",
      "QUICKSTART.md",
      "QUICKSTART.en.md",
      "DEMO.en.md",
      "DOWNLOADS.md",
      "prompts/copy-paste-prompt-lite-cn.md",
      "prompts/copy-paste-prompt-lite-en.md",
      "SECURITY.md",
      "SUPPORT.md",
      "LICENSE"
    ]
  },
  {
    name: "CCC-workbuddy-pack",
    files: [
      "README.md",
      "README.en.md",
      "QUICKSTART.md",
      "QUICKSTART.en.md",
      "DEMO.en.md",
      "DOWNLOADS.md",
      "workbuddy/README.md",
      "workbuddy/mainland-user-guide.md",
      "workbuddy/system-prompt-lite.md",
      "workbuddy/system-prompt.md",
      "workbuddy/test-cases.md",
      "workbuddy/feishu-config.md",
      "SECURITY.md",
      "LICENSE"
    ]
  },
  {
    name: "CCC-full-pack",
    files: [
      "README.md",
      "README.en.md",
      "QUICKSTART.md",
      "QUICKSTART.en.md",
      "DOWNLOADS.md",
      "ROADMAP.md",
      "VERSION",
      "SKILLS.md",
      "CHANGELOG.md",
      "CONTRIBUTING.md",
      "FEEDBACK.md",
      "SECURITY.md",
      "SUPPORT.md",
      "SHARE.md",
      "DEMO.md",
      "DEMO.en.md",
      "LICENSE",
      "core",
      "docs",
      "evals",
      "examples",
      "prompts",
      "scripts",
      "skills",
      "usability",
      "workbuddy"
    ]
  }
];

const excludedPathParts = new Set([
  ".git",
  "node_modules",
  "dist",
  "private",
  "career-materials",
  "portable",
  "marketing",
  "sponsors-repo",
  "integrations",
  "personal-data",
  "resumes",
  "resume-drafts",
  "interview-notes",
  "jd-notes",
  "offers",
  "contracts",
  "screenshots"
]);

function ensureExists(relativePath) {
  const absolutePath = path.join(repoRoot, relativePath);
  if (!fs.existsSync(absolutePath)) {
    throw new Error(`Missing release source: ${relativePath}`);
  }
}

function shouldExclude(relativePath) {
  const normalized = relativePath.split(path.sep).join("/");
  const parts = normalized.split("/");

  if (parts.some((part) => excludedPathParts.has(part))) {
    return true;
  }

  if (normalized.endsWith(".zip")) {
    return true;
  }

  if (normalized.startsWith("evals/inputs/") && normalized.endsWith(".input.json")) {
    return true;
  }

  if (normalized.startsWith("evals/results/")) {
    return true;
  }

  return false;
}

function copyEntry(relativePath, packageRoot) {
  ensureExists(relativePath);
  const sourcePath = path.join(repoRoot, relativePath);
  const targetPath = path.join(packageRoot, relativePath);
  const stats = fs.statSync(sourcePath);

  if (shouldExclude(relativePath)) {
    return;
  }

  if (stats.isDirectory()) {
    copyDirectory(sourcePath, targetPath);
    return;
  }

  fs.mkdirSync(path.dirname(targetPath), { recursive: true });
  fs.copyFileSync(sourcePath, targetPath);
}

function copyDirectory(sourceDir, targetDir) {
  for (const entry of fs.readdirSync(sourceDir, { withFileTypes: true })) {
    const sourcePath = path.join(sourceDir, entry.name);
    const relativePath = path.relative(repoRoot, sourcePath);
    const targetPath = path.join(targetDir, entry.name);

    if (shouldExclude(relativePath)) {
      continue;
    }

    if (entry.isDirectory()) {
      copyDirectory(sourcePath, targetPath);
    } else if (entry.isFile()) {
      fs.mkdirSync(path.dirname(targetPath), { recursive: true });
      fs.copyFileSync(sourcePath, targetPath);
    }
  }
}

function zipPackage(packageName) {
  const zipPath = path.join(outputDir, `${packageName}.zip`);
  fs.rmSync(zipPath, { force: true });

  const result = spawnSync("zip", ["-qr", zipPath, packageName], {
    cwd: stagingDir,
    stdio: "pipe"
  });

  if (result.status !== 0) {
    const stderr = result.stderr.toString().trim();
    throw new Error(`zip failed for ${packageName}${stderr ? `: ${stderr}` : ""}`);
  }

  return zipPath;
}

function packageRelease() {
  const zipCheck = spawnSync("zip", ["-v"], { stdio: "ignore" });
  if (zipCheck.error || zipCheck.status !== 0) {
    throw new Error("The `zip` command is required to build release packages.");
  }

  fs.rmSync(stagingDir, { recursive: true, force: true });
  fs.mkdirSync(stagingDir, { recursive: true });
  fs.mkdirSync(outputDir, { recursive: true });

  const outputs = [];

  for (const releasePackage of packages) {
    const packageRoot = path.join(stagingDir, releasePackage.name);
    fs.mkdirSync(packageRoot, { recursive: true });

    for (const file of releasePackage.files) {
      copyEntry(file, packageRoot);
    }

    outputs.push(zipPackage(releasePackage.name));
  }

  fs.rmSync(stagingDir, { recursive: true, force: true });

  console.log("release packages created:");
  for (const output of outputs) {
    const relativePath = path.relative(repoRoot, output);
    const sizeKb = Math.ceil(fs.statSync(output).size / 1024);
    console.log(`- ${relativePath} (${sizeKb} KB)`);
  }
}

try {
  packageRelease();
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
}
