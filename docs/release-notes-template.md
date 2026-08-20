# CCC Beta Release

Use this template when preparing a GitHub Release. Do not publish a release until the included files are checked and no private job-search material is present.

## What CCC can do

- Career direction clarification
- Project evidence mining
- Judgment Trace / Methodology Trace
- JD and resume patching
- Search friction and feedback diagnosis
- Interview preparation / review
- Offer decision support

## Ways to use

- CCC Chinese Prompt
- CCC English Prompt
- Codex / Claude Code Skills
- WorkBuddy (Chinese-first documentation)

## Current limitations

- Still under usability testing
- Model behavior differs by platform
- No guarantee of interview or Offer outcomes
- Public real-platform Smoke Report coverage is currently 0

## Release files

```text
CCC-prompt-pack.zip
CCC-workbuddy-pack.zip
CCC-full-pack.zip
```

For netdisk mirrors, upload the generated mirror folder:

```text
dist/mirror/CCC-vX.Y.Z/
├─ 先看我.txt
├─ latest.txt
├─ 更新指南.md
├─ 版本更新说明.txt
├─ CCC-prompt-pack-vX.Y.Z.zip
├─ CCC-workbuddy-pack-vX.Y.Z.zip
└─ CCC-full-pack-vX.Y.Z.zip
```

Version chain: `VERSION` defines the build version; GitHub Release is the official distribution channel; netdisk folders are download mirrors only.

## Pre-release checks

```bash
node scripts/check-markdown-links.mjs
node scripts/check-evals.mjs
node scripts/check-shared-rules.mjs
node scripts/package-release.mjs
git status --short
```
