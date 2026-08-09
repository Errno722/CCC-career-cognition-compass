import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";

const repoRoot = process.cwd();
const distDir = path.join(repoRoot, "dist");
const stagingDir = path.join(distDir, "release-staging");
const outputDir = path.join(distDir, "release");
const versionFile = path.join(repoRoot, "VERSION");

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
      "VERSION",
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
      "VERSION",
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

function readReleaseVersion() {
  if (!fs.existsSync(versionFile)) {
    throw new Error("Missing VERSION file.");
  }

  const version = fs.readFileSync(versionFile, "utf8").trim();

  if (!/^v?[0-9]+\.[0-9]+\.[0-9]+(?:-[0-9A-Za-z.-]+)?$/.test(version)) {
    throw new Error(`Invalid VERSION value: ${version}`);
  }

  return version;
}

function toVersionTag(version) {
  return version.startsWith("v") ? version : `v${version}`;
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

function copyVersionedZip(zipPath, packageName, versionTag) {
  const versionedZipPath = path.join(outputDir, `${packageName}-${versionTag}.zip`);
  fs.copyFileSync(zipPath, versionedZipPath);
  return versionedZipPath;
}

function writeDistributionNotes(versionTag) {
  const latestPath = path.join(outputDir, "latest.txt");
  const readmePath = path.join(outputDir, "先看我.txt");
  const today = new Date().toISOString().slice(0, 10);

  fs.writeFileSync(
    latestPath,
    [
      `Current version: ${versionTag}`,
      `Updated: ${today}`,
      "",
      "Recommended for most users:",
      `CCC-lite-pack-${versionTag}.zip`,
      "",
      "Official source of truth:",
      "GitHub - Errno722/CCC-career-cognition-compass",
      "",
      "Netdisk files are download mirrors of the GitHub Release packages."
    ].join("\n") + "\n",
    "utf8"
  );

  fs.writeFileSync(
    readmePath,
    [
      "CCC — Career Cognition Compass",
      "",
      `当前版本：${versionTag}`,
      "",
      "如果你只是想马上试用：",
      `下载 CCC-lite-pack-${versionTag}.zip`,
      "",
      "如果你使用 WorkBuddy：",
      `下载 CCC-workbuddy-pack-${versionTag}.zip`,
      "",
      "如果你想研究完整项目、Skills、Evals 和脚本：",
      `下载 CCC-full-pack-${versionTag}.zip`,
      "",
      "项目仍处于 Beta / Active Development。",
      "",
      "官方最新版本和更新记录：",
      "GitHub: Errno722/CCC-career-cognition-compass",
      "",
      "注意：",
      "请不要向 CCC 上传身份证、护照、签证文件号、完整 Offer、",
      "合同、薪资截图、私人联系方式或公司内部资料。",
      "",
      "English:",
      `Current version: ${versionTag}`,
      "",
      "If you just want to try CCC, download:",
      `CCC-lite-pack-${versionTag}.zip`,
      "",
      "If you use WorkBuddy, download:",
      `CCC-workbuddy-pack-${versionTag}.zip`,
      "",
      "If you want the full public project, download:",
      `CCC-full-pack-${versionTag}.zip`,
      "",
      "Please use only synthetic or fully redacted materials."
    ].join("\n") + "\n",
    "utf8"
  );

  return [latestPath, readmePath];
}

function packageRelease() {
  const zipCheck = spawnSync("zip", ["-v"], { stdio: "ignore" });
  if (zipCheck.error || zipCheck.status !== 0) {
    throw new Error("The `zip` command is required to build release packages.");
  }

  const version = readReleaseVersion();
  const versionTag = toVersionTag(version);

  fs.rmSync(stagingDir, { recursive: true, force: true });
  fs.rmSync(outputDir, { recursive: true, force: true });
  fs.mkdirSync(stagingDir, { recursive: true });
  fs.mkdirSync(outputDir, { recursive: true });

  const outputs = [];
  const versionedOutputs = [];

  for (const releasePackage of packages) {
    const packageRoot = path.join(stagingDir, releasePackage.name);
    fs.mkdirSync(packageRoot, { recursive: true });

    for (const file of releasePackage.files) {
      copyEntry(file, packageRoot);
    }

    const zipPath = zipPackage(releasePackage.name);
    outputs.push(zipPath);
    versionedOutputs.push(copyVersionedZip(zipPath, releasePackage.name, versionTag));
  }

  const distributionNotes = writeDistributionNotes(versionTag);

  fs.rmSync(stagingDir, { recursive: true, force: true });

  console.log(`release packages created for ${versionTag}:`);
  for (const output of [...outputs, ...versionedOutputs, ...distributionNotes]) {
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
