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

- Lite Prompt
- English Lite Prompt
- Full Prompt
- Codex / Claude Code Skills
- WorkBuddy (Chinese-first documentation)

## Current limitations

- Still under usability testing
- Model behavior differs by platform
- No guarantee of interview or Offer outcomes
- Public real-platform Smoke Report coverage is currently 0

## Release files

```text
CCC-lite-pack.zip
CCC-workbuddy-pack.zip
CCC-full-pack.zip
```

For netdisk mirrors, upload the generated mirror folder:

```text
dist/mirror/CCC-v0.1.1-beta/
├─ 先看我.txt
├─ latest.txt
├─ 更新指南.md
├─ 版本更新说明.txt
├─ CCC-lite-pack-v0.1.1-beta.zip
├─ CCC-workbuddy-pack-v0.1.1-beta.zip
└─ CCC-full-pack-v0.1.1-beta.zip
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
