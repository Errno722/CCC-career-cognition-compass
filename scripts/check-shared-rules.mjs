import fs from "node:fs";

const ruleVersions = {
  "focus-control": "v1.1",
  "certainty-calibration": "v1",
  "profile-persistence": "v1.1"
};

const coreFiles = {
  "focus-control": "core/focus-control.md",
  "certainty-calibration": "core/certainty-calibration.md",
  "profile-persistence": "core/profile-persistence.md"
};

const requiredEntries = {
  "skills/career-cognition-compass/SKILL.md": Object.keys(ruleVersions),
  "skills/career-direction-clarifier/SKILL.md": Object.keys(ruleVersions),
  "skills/career-materials-builder/SKILL.md": Object.keys(ruleVersions),
  "skills/interview-review-miner/SKILL.md": Object.keys(ruleVersions),
  "skills/jd-company-prep/SKILL.md": Object.keys(ruleVersions),
  "skills/job-search-plan-review/SKILL.md": Object.keys(ruleVersions),
  "skills/offer-decision-support/SKILL.md": Object.keys(ruleVersions),
  "prompts/career-cognition-compass-prompt.md": Object.keys(ruleVersions),
  "prompts/copy-paste-prompt-lite-cn.md": Object.keys(ruleVersions),
  "prompts/copy-paste-prompt-lite-en.md": Object.keys(ruleVersions),
  "prompts/copy-paste-prompt-cn.md": Object.keys(ruleVersions),
  "workbuddy/system-prompt-lite.md": Object.keys(ruleVersions),
  "workbuddy/system-prompt.md": Object.keys(ruleVersions)
};

const errors = [];

function read(filePath) {
  try {
    return fs.readFileSync(filePath, "utf8");
  } catch (error) {
    errors.push(`${filePath}: cannot read file`);
    return "";
  }
}

for (const [ruleId, filePath] of Object.entries(coreFiles)) {
  const content = read(filePath);
  if (!content.includes(`rule_id: ${ruleId}`)) {
    errors.push(`${filePath}: missing rule_id: ${ruleId}`);
  }
  if (!content.includes(`version: ${ruleVersions[ruleId]}`)) {
    errors.push(`${filePath}: missing version: ${ruleVersions[ruleId]}`);
  }
}

for (const [filePath, ruleIds] of Object.entries(requiredEntries)) {
  const content = read(filePath);
  for (const ruleId of ruleIds) {
    const marker = `SHARED_RULE ${ruleId} ${ruleVersions[ruleId]}`;
    if (!content.includes(marker)) {
      errors.push(`${filePath}: missing ${marker}`);
    }
  }
}

if (errors.length > 0) {
  console.error(errors.join("\n"));
  process.exitCode = 1;
} else {
  console.log(`shared rule markers: ${Object.keys(requiredEntries).length} entries checked`);
}
