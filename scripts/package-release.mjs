import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";

const repoRoot = process.cwd();
const distDir = path.join(repoRoot, "dist");
const stagingDir = path.join(distDir, "release-staging");
const outputDir = path.join(distDir, "release");
const mirrorDir = path.join(distDir, "mirror");
const versionFile = path.join(repoRoot, "VERSION");

const packages = [
  {
    name: "CCC-prompt-pack",
    files: [
      "README.md",
      "README.en.md",
      "QUICKSTART.md",
      "QUICKSTART.en.md",
      "DEMO.md",
      "DEMO.en.md",
      "DOWNLOADS.md",
      "VERSION",
      "docs/update-guide.md",
      "prompts/copy-paste-prompt-cn.md",
      "prompts/copy-paste-prompt-en.md",
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
      "docs/update-guide.md",
      "workbuddy/README.md",
      "workbuddy/mainland-user-guide.md",
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

function zipDirectory(directoryName, outputDirectory, zipName) {
  const zipPath = path.join(outputDirectory, zipName);
  fs.rmSync(zipPath, { force: true });

  const result = spawnSync("zip", ["-qr", zipPath, directoryName], {
    cwd: stagingDir,
    stdio: "pipe"
  });

  if (result.status !== 0) {
    const stderr = result.stderr.toString().trim();
    throw new Error(`zip failed for ${zipName}${stderr ? `: ${stderr}` : ""}`);
  }

  return zipPath;
}

function buildVersionNotes(versionTag) {
  return [
    "CCC Version Update Notes",
    "",
    `Version: ${versionTag}`,
    "",
    "Main changes in this package:",
    "",
    "- Project-mining replies no longer expose internal persistence fields such as project_id, missing_fields, eligible_for_downstream, or last_updated to end users.",
    "- Project readiness and evidence gates remain available, but user-facing output now explains confirmed facts, gaps, material boundaries, and the next step in natural language.",
    "- Removed Lite as a separately maintained product tier. CCC now uses one canonical Chinese prompt, one canonical English prompt, and one canonical WorkBuddy system prompt.",
    "- Release packaging now uses `CCC-prompt-pack` instead of `CCC-lite-pack`; short replies, token saving, and staged expansion are response modes, not separate prompt files.",
    "- Added post-update handoff support: after replacing a Prompt, redeploying WorkBuddy, downloading a new ZIP / mirror package, or bringing back old CCC cards, CCC should first ask whether the previous issue was resolved and, if not, where the user is stuck.",
    "- The update flow avoids restarting full onboarding when the user brings back an old CCC continuation card or old materials.",
    "- Canonical Chinese Prompt, canonical English Prompt, WorkBuddy Prompt, update guide, and eval contracts are aligned with this behavior.",
    "- Evaluation status: 48 behavior contracts, 255 semantic rubrics, 148 core refined rubrics, 0 public real-platform smoke reports.",
    "",
    "How to update:",
    "",
    "- General LLM users: replace the old prompt or legacy lite entry with `prompts/copy-paste-prompt-cn.md` or `prompts/copy-paste-prompt-en.md`.",
    "- WorkBuddy users: replace the old WorkBuddy system prompt with the latest `workbuddy/system-prompt.md`.",
    "- If you already have CCC cards, paste the previous card / CCC continuation context into the new conversation and ask for a delta instead of restarting.",
    "",
    "中文说明：",
    "",
    `当前版本：${versionTag}`,
    "",
    "本版本主要更新：",
    "",
    "- 修复项目梳理中的内部字段泄露：普通回复不再展示 project_id、missing_fields、eligible_for_downstream、last_updated 等持久化字段。",
    "- 项目状态和事实门禁继续保留，但用户侧改用自然语言说明已确认事实、仍缺内容、材料可用边界和下一步。",
    "- 取消 Lite 作为单独维护的产品层：CCC 现在使用一个中文正式 Prompt、一个 English Prompt 和一个 WorkBuddy System Prompt。",
    "- 发布包从 `CCC-lite-pack` 改为 `CCC-prompt-pack`；短回复、省 token、分轮展开变成运行模式，而不是单独 Prompt 文件。",
    "- 新增更新后旧问题接续：用户替换 Prompt、重新部署 WorkBuddy、下载新版 ZIP / 网盘包，或带回旧版资料卡时，CCC 应先问“之前的问题解决了吗？如果没有，卡在哪？”。",
    "- 更新后不要重新完整 onboarding；如果用户带回旧版资料卡或 CCC 继续上下文，只基于这些内容输出差异、卡点和下一步。",
    "- 中文正式 Prompt、English Prompt、WorkBuddy Prompt、更新指南和 Eval 合约已同步该行为。",
    "- 当前测试状态：48 个行为合约，255 条语义断言，148 条核心细化 Rubric，公开真实平台 Smoke Report 仍为 0。",
    "",
    "更新方式：",
    "",
    "- 普通 LLM 用户：用本包里的 `prompts/copy-paste-prompt-cn.md` 或 `prompts/copy-paste-prompt-en.md` 替换旧 prompt / 旧轻量入口。",
    "- WorkBuddy 用户：用最新版 `workbuddy/system-prompt.md` 替换旧系统提示词。",
    "- 如果之前已有 CCC 资料卡，把旧卡片 / CCC 继续上下文复制到新对话里，请它只给差异补丁，不要从头开始。",
    "",
    "Privacy:",
    "Do not include identity document numbers, private contact details, full offer letters, contracts, salary screenshots, complete interview transcripts, or confidential employer information in CCC conversations."
  ].join("\n") + "\n";
}

function writePackageVersionNotes(packageRoot, versionTag) {
  fs.writeFileSync(
    path.join(packageRoot, "VERSION_NOTES.txt"),
    buildVersionNotes(versionTag),
    "utf8"
  );
}

function zipVersionedPackage(packageName, versionTag, mirrorPackageDir) {
  const versionedPackageName = `${packageName}-${versionTag}`;
  const sourceRoot = path.join(stagingDir, packageName);
  const versionedRoot = path.join(stagingDir, versionedPackageName);

  fs.rmSync(versionedRoot, { recursive: true, force: true });
  fs.cpSync(sourceRoot, versionedRoot, { recursive: true });

  return zipDirectory(
    versionedPackageName,
    mirrorPackageDir,
    `${versionedPackageName}.zip`
  );
}

function writeDistributionNotes(versionTag, mirrorPackageDir) {
  const latestPath = path.join(mirrorPackageDir, "latest.txt");
  const readmePath = path.join(mirrorPackageDir, "先看我.txt");
  const updateGuidePath = path.join(mirrorPackageDir, "更新指南.md");
  const versionNotesPath = path.join(mirrorPackageDir, "版本更新说明.txt");
  const today = new Date().toISOString().slice(0, 10);

  fs.writeFileSync(
    latestPath,
    [
      `Current version: ${versionTag}`,
      `Updated: ${today}`,
      "",
      "Recommended for most users:",
      `CCC-prompt-pack-${versionTag}.zip`,
      "",
      "Read before updating:",
      "更新指南.md",
      "版本更新说明.txt",
      "",
      "Build version source:",
      `VERSION -> ${versionTag}`,
      "",
      "Official source of truth:",
      "GitHub Release - Errno722/CCC-career-cognition-compass",
      "",
      "Netdisk files are download mirrors of the same release packages."
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
      "更新前先看：",
      "1. 版本更新说明.txt",
      "2. 更新指南.md",
      "",
      "如果你在 ChatGPT、Claude、DeepSeek、Kimi、通义千问、Gemini 等普通聊天模型使用 CCC：",
      `下载 CCC-prompt-pack-${versionTag}.zip`,
      "",
      "如果你使用 WorkBuddy：",
      `下载 CCC-workbuddy-pack-${versionTag}.zip`,
      "",
      "如果你想研究完整项目、Skills、Evals 和脚本：",
      `下载 CCC-full-pack-${versionTag}.zip`,
      "",
      "项目仍处于 Beta / Active Development。",
      "",
      "版本关系：",
      `VERSION 决定构建版本：${versionTag}`,
      "GitHub Release 是官方公开发行渠道。",
      "百度网盘是同一批 Release 文件的国内下载镜像。",
      "",
      "注意：",
      "请不要向 CCC 上传身份证、护照、签证文件号、完整 Offer、",
      "合同、薪资截图、私人联系方式或公司内部资料。",
      "你可以使用自己的真实经历，但请先删除敏感个人信息和雇主机密信息。",
      "",
      "English:",
      `Current version: ${versionTag}`,
      "",
      "If you use CCC in ChatGPT, Claude, Gemini, DeepSeek, Kimi, Qwen, or another general chat model, download:",
      `CCC-prompt-pack-${versionTag}.zip`,
      "",
      "If you use WorkBuddy, download:",
      `CCC-workbuddy-pack-${versionTag}.zip`,
      "",
      "If you want the full public project, download:",
      `CCC-full-pack-${versionTag}.zip`,
      "",
      "Version chain:",
      `VERSION defines the build version: ${versionTag}`,
      "GitHub Release is the official distribution channel.",
      "Netdisk is a download mirror of the same release files.",
      "",
      "You may use your real experience with CCC, but redact sensitive personal and employer information first.",
      "Do not share identity document numbers, private contact details, full offer letters, contracts, salary screenshots, or confidential company information."
    ].join("\n") + "\n",
    "utf8"
  );

  fs.copyFileSync(path.join(repoRoot, "docs", "update-guide.md"), updateGuidePath);
  fs.writeFileSync(versionNotesPath, buildVersionNotes(versionTag), "utf8");

  return [latestPath, readmePath, updateGuidePath, versionNotesPath];
}

function packageRelease() {
  const zipCheck = spawnSync("zip", ["-v"], { stdio: "ignore" });
  if (zipCheck.error || zipCheck.status !== 0) {
    throw new Error("The `zip` command is required to build release packages.");
  }

  const version = readReleaseVersion();
  const versionTag = toVersionTag(version);
  const mirrorPackageDir = path.join(mirrorDir, `CCC-${versionTag}`);

  fs.rmSync(stagingDir, { recursive: true, force: true });
  fs.rmSync(outputDir, { recursive: true, force: true });
  fs.rmSync(mirrorDir, { recursive: true, force: true });
  fs.mkdirSync(stagingDir, { recursive: true });
  fs.mkdirSync(outputDir, { recursive: true });
  fs.mkdirSync(mirrorPackageDir, { recursive: true });

  const outputs = [];
  const versionedOutputs = [];

  for (const releasePackage of packages) {
    const packageRoot = path.join(stagingDir, releasePackage.name);
    fs.mkdirSync(packageRoot, { recursive: true });

    for (const file of releasePackage.files) {
      copyEntry(file, packageRoot);
    }

    writePackageVersionNotes(packageRoot, versionTag);

    const zipPath = zipPackage(releasePackage.name);
    outputs.push(zipPath);
    versionedOutputs.push(
      zipVersionedPackage(releasePackage.name, versionTag, mirrorPackageDir)
    );
  }

  const distributionNotes = writeDistributionNotes(versionTag, mirrorPackageDir);

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
