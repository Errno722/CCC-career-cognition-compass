# Project State Field Focused Regression

Status: `passed`

This is a four-turn real Codex model regression using synthetic inputs. It verifies the narrow `CF-001` fix and is not an automated Smoke Report.

## Metadata

```text
date: 2026-08-19
platform: Codex subagent executor
model: inherited Codex model
base_commit: 7617df4
entrypoint: prompts/copy-paste-prompt-cn.md
turn_count: 4
materials: synthetic only
full outputs: current local Codex task transcript; not committed
agent_id: 01a015ee-c953-7882-b01c-1dda894f83ec
```

## Turns

| Turn | Input cue | Result | Observation |
| ---: | --- | --- | --- |
| 1 | Employed user considering Product Operations, project coordination, and AI roles | passed with unrelated P2 candidate | Selected Product Operations as the main validation line and kept other directions provisional. The reply was longer than needed, but this was not part of `CF-001`. |
| 2 | `继续补项目吧` | passed | Recovered the project branch without onboarding again, requested rough project fragments, and did not expose internal persistence fields. |
| 3 | Coordinated three teams to launch an internal tool; memory is fragmented | passed | Used the visible readiness label `DISCOVERED（已识别）`, then showed only project name, confirmed facts, and missing facts. No raw project keys or database-style table appeared. No capability or resume packaging was added. |
| 4 | Only this project; continue mining it | passed | Reused the same project and asked three fact-recovery questions about background, team boundaries, and the user's actions. It preserved unknowns and did not lengthen into an internal-state explanation. |

## Regression Checks

| Check | Result |
| --- | --- |
| No `project_id`, `project_type`, `missing_fields`, `eligible_for_downstream`, or `last_updated` in ordinary output | passed |
| Readiness labels remain available when useful | passed |
| Project fact gate remains active | passed |
| No premature capability, resume bullet, or project-success packaging | passed |
| Context continues across all four turns | passed |
| Hiding fields does not create a longer technical explanation | passed |

## Conclusion

`CF-001` is resolved for this focused Codex regression. This single-model pass does not establish cross-model or WorkBuddy-platform compatibility. Other single-occurrence P2 observations remain unchanged and were not addressed in this fix.
