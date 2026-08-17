# Longitudinal Job Search Usability Plan

This is a manual longitudinal usability plan. It is not an Eval case, does not change the Eval case count, and does not generate a Smoke Report.

Goal: test whether CCC behaves like a continuous job-search state system rather than a collection of isolated features.

Core loop:

```text
Current Career State
+ New Event
+ Evidence
+ User Judgment
→ State Update
→ Next Best Action
```

## What Must Persist

Each day should inherit the previous day's confirmed context without asking the user to reintroduce their full background.

Track only what is needed:

```text
当前状态
当前主线
当前判断
判断依据
已确认事实
近期关键事件
可复用材料 / 卡片
未确认
暂存
下一步
重新判断触发条件
```

Do not require the tester or user to understand internal fields such as `career_event`, `current_career_state`, or `action_outcome`.

## Fourteen-Day Flow

| Day | User event | Expected CCC behavior |
| --- | --- | --- |
| 1 | Messy direction input | Identify one main thread, park the rest, and give one next action. |
| 2 | Role family exploration | Reuse Day 1 context; narrow to one primary Role Family and one validation action. |
| 3 | Project notes | Build a project inventory first, then choose one project to deepen. |
| 4 | Role Family resume request | Use existing facts and project status; avoid rewriting every fixed section. |
| 5 | Small batch applications | Treat application count as baseline data, not a conclusion. |
| 6 | HR screening question | Reply to the HR question directly; do not restart onboarding. |
| 7 | Interview invitation | Update priority toward interview prep; do not rewrite the whole resume. |
| 8 | Limited interview prep time | Pick one highest-value prep action with a clear stop condition. |
| 9 | Interview happens | Capture fresh questions, follow-ups, stuck points, and feedback. |
| 9 evening | Interview review | Turn feedback into a signal and candidate profile patch, then move attention to the next opportunity or one gap-filling action. |
| 10 | Anxiety or direction doubt | Treat emotion as state information; do not reset direction from one interview. |
| 11 | Feedback judgment | Decide whether feedback is a data point, signal, pattern, or reason to review direction. |
| 12 | Second interview | Reuse candidate profile and role-family context; change emphasis, not facts. |
| 13 | Offer or waiting | Separate confirmed opportunity, pending opportunity, and waiting state. |
| 14 | Current job / offer / continue search | Update current judgment and next screening conditions without replacing the whole profile. |

## Daily Observation Record

For each day, record:

```text
New event:
CCC current judgment:
Inherited old facts:
Repeated questions:
Direction reset:
Main thread:
Next step:
Why now:
Stop condition:
User executed:
Observed result:
State update:
Revisit if:
```

## Longitudinal Friction Log Fields

Use these when a problem repeats or affects the core flow:

```text
friction_type:
severity:
example:
impact:
possible_fix:
```

Common friction types:

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
```

## Usability Dimensions

Score only when helpful. Do not turn this into a complex automated rubric.

- Naturalness: the reply sounds like a useful career-support conversation.
- Brevity: the reply is short enough to act on.
- Speakability: interview or outreach wording can be said or sent naturally.
- Actionability: the user knows the next step.
- Context Reuse: CCC reuses confirmed facts instead of asking again.
- Unnecessary Structure: the reply avoids showing internal templates too often.
- Repeated Questions: CCC does not ask for facts already present.
- Premature Conclusion: CCC does not over-conclude from one event.

## Pass Signals

- The user can continue by saying short labels such as `继续补项目`, `继续看 JD`, or `继续复盘`.
- CCC can explain what changed after a new event.
- CCC can keep a main direction while adjusting the immediate priority.
- CCC can say "not enough evidence to reset direction yet".
- CCC can shrink an action if the previous action was not completed.

## Non-Goals

- Do not add new Skills for this test.
- Do not add Eval cases for this test by default.
- Do not generate or publish a Smoke Report from this plan.
- Do not use real private job-search materials in public records.
