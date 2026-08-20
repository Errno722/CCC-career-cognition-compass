# Friction Log

这里是 CCC 唯一的体验摩擦登记表。先用 [observation-template.md](observation-template.md) 记录真实使用，再把 P0 / P1 或需要继续观察的 P2 candidate 登记到这里。单次 P2 只观察，不直接触发产品修改。

## Observation Baseline

```text
observation_baseline_commit: 23515c819e6c81de270cdcec4b1227563057cad9
branch: main
version: 0.1.2-beta
observation_phase_started: 2026-08-21
eval_cases: 48
public_smoke_reports: 0
real_workbuddy_status: not_run
prompt_compression_evidence: insufficient
```

观察期默认冻结：

```text
prompts/copy-paste-prompt-cn.md
prompts/copy-paste-prompt-en.md
workbuddy/system-prompt.md
core/
skills/
evals/
```

只有 P0、可复现的 P1、重复 2-3 次的同类 P2，或跨入口 / 模型重复的问题，才进入产品修改。任何修复都遵循：Observed friction -> Smallest responsible rule -> Narrow change -> Focused regression。

## Frictions

### CF-001

```text
id: CF-001
date: 2026-08-19
entrypoint: prompts/copy-paste-prompt-cn.md
platform: Codex subagent executor
model: inherited Codex model (gpt-5.6-sol configuration; exact model ID not returned)
source_commit: 401e9bda8147794f7a0a7b09867588784a88792f
scenario: Chinese Canonical Turn 3; user supplied one fragmented project description
friction_type: unnecessary_template / internal_state_exposure
severity: P1
what_happened: Reply exposed project_id, status, missing_fields, eligible_for_downstream and other implementation-style fields in an eight-column table.
expected: Preserve project state internally; explain confirmed facts, gaps and the next 1-3 questions in natural language.
impact: Increased comprehension burden and turned project recollection into filling a system record, although no facts were invented.
repeat_count: 1
status: regression_passed
```

Narrow fix: internal project persistence fields remain available to the system but are hidden from ordinary user output. `DISCOVERED` / `PARTIALLY_MAPPED` / `EVIDENCE_READY` may still appear when they help explain readiness.

Regression evidence: [2026-08-19-project-state-field-regression.md](runs/2026-08-19-project-state-field-regression.md).

### CF-002

```text
id: CF-002
date: 2026-08-19
entrypoint: prompts/copy-paste-prompt-cn.md
platform: Codex subagent executor
model: inherited Codex model (gpt-5.6-sol configuration; exact model ID not returned)
source_commit: 401e9bda8147794f7a0a7b09867588784a88792f
scenario: Chinese Canonical Turn 1; employed operations user named three possible directions and four hours of weekly availability
friction_type: overlong_reply / too_many_actions
severity: P2
what_happened: Reply chose one main direction but also opened a seven-day plan, a six-JD task and three questions in the first turn.
expected: Select one immediate validation line, park the alternatives and give only the smallest next action or necessary question.
impact: The answer remained usable, but its initial workload could make an already overwhelmed user less likely to act.
repeat_count: 1
status: candidate
```

Observation needed: record problem complexity, actual character count, removable content and whether length prevents action. Do not compress the Canonical Prompt based on this single occurrence.

### CF-003

```text
id: CF-003
date: 2026-08-19
entrypoint: workbuddy/system-prompt.md
platform: Codex prompt proxy; not the WorkBuddy platform
model: inherited Codex model (gpt-5.6-sol configuration; exact model ID not returned)
source_commit: 401e9bda8147794f7a0a7b09867588784a88792f
scenario: WorkBuddy proxy Turn 9; user asked how to answer frequent requirement changes
friction_type: unnatural_wording / insufficient_evidence_grounding
severity: P2
what_happened: Reply was bounded and useful but became a generic first-person script rather than a compact framework grounded in confirmed experience.
expected: Give a short answer structure and identify which facts the user should insert, without fabricating a ready-made personal story.
impact: User could repeat language that sounds generic or does not fully match their experience.
repeat_count: 1
status: candidate
```

Observation needed: verify on a real platform or another model before treating this as a shared-rule problem.

### CF-004

```text
id: CF-004
date: 2026-08-19
entrypoint: workbuddy/system-prompt.md
platform: Codex prompt proxy; not the WorkBuddy platform
model: inherited Codex model (gpt-5.6-sol configuration; exact model ID not returned)
source_commit: 401e9bda8147794f7a0a7b09867588784a88792f
scenario: WorkBuddy proxy Turn 12; user asked what to do after an interview and critical feedback
friction_type: incomplete_closure
severity: P2
what_happened: Reply selected one review action but did not explicitly time-box the review or remind the user to move toward the next opportunity afterward.
expected: Bound the review, capture one improvement target and then redirect attention to the next opportunity or evidence gap.
impact: A user may stay with a completed interview longer than is useful, although the immediate action remained valid.
repeat_count: 1
status: candidate
```

Observation needed: check whether the same closure gap appears in real interview-review sessions. No product change is justified yet.

## Status Definitions

```text
candidate          observed but not yet confirmed as a system problem
confirmed          repeated or reproducible and attributed to CCC behavior
fixed              narrow product correction completed
regression_passed  focused regression passed after the fix
closed             no further monitoring required for the current version
```

## Severity

```text
P0  core flow blocked or seriously incorrect judgment
P1  materially harms trust, understanding or the primary task
P2  usability friction; user can continue
P3  minor wording, formatting or ordering issue
```

## Friction Types

```text
repeated_question
context_loss
overlong_reply
premature_direction_reset
too_many_actions
unnatural_wording
unnecessary_template
wrong_priority
stale_state
contradictory_advice
rule_interference
internal_state_exposure
insufficient_evidence_grounding
incomplete_closure
```

## Observation Priorities

### Verbosity

Record the user's task complexity, actual reply length, content removable without losing value and whether the length prevented action. Escalate only after 2-3 similar observations.

### Rule Interference

Record `requested_task`, `actual_main_thread`, unnecessary triggered behaviors, impact and severity. Small requests such as an HR reply should not reopen career direction, resignation analysis, resume work and emotional support.

### Context Reuse / State Drift

Observe whether CCC retains role direction, employment status, projects, interview feedback and the current resume baseline; avoids asking for confirmed facts again; and prevents one new event or one JD from resetting the whole state.

## Candidate Scenarios

Ideas alone do not enter development. Record them here only when they come from use, feedback or a credible recurring pattern.

```text
- scenario:
  source:
  observed_count:
  affects_core_flow:
  action: watch / ignore / consider
```

## Pre-registered Checks

- 用户说“继续补项目”时，是否能恢复暂存分支。
- CCC 是否反复重新介绍自己。
- 隐私提醒是否过多，影响任务推进。
- 必要门禁是否扩展成完整 onboarding。
- 输出是否一次给太多卡片。
- 是否重复询问已经出现过的背景。
- 普通用户回复是否出现内部英文键名。
- 项目状态是否清楚，用户能否理解为什么还不能包装。
- 暂存分支是否在后续对话中被遗忘。
- 是否能区分“本轮任务完成”和“整个求职还没有结束”。
- 新事件是否被误当成最终结论。
- 用户没执行上次动作时，是否被责备或继续收到同样的大动作。
- 当前判断是否过期但没有被更新。
- 不同轮次建议是否互相矛盾。
