---
name: job-search-plan-review
description: >-
  Short job-search planning and review. Use when the user needs a plan based on available time, daily or weekly review, application tracking, post-application idle-period planning after submitting resumes, pure interview waiting structure, HR follow-up timing or wording, role evaluation while waiting, rejection recovery, next 1-3 actions, social-media information control, or a habit-building job-search rhythm. For interview keywords, partial questions, interviewer feedback such as "X experience is insufficient", and resume/interview-direction updates after an interview, use interview-review-miner instead. Keep plans within 14 days and adapt to energy, cashflow, deadlines, and current job constraints.
---

# Job Search Plan Review

## Overview

Create short, usable plans and reviews that help the user keep momentum without collecting unused materials.

## Planning Rules

- Default to a maximum of 14 days.
- Ask for available time if missing: hours per day/week, weekdays/weekends, interview dates, current job/class constraints, cashflow deadline, and energy level.
- If the user is low energy, give one 5-20 minute action instead of a full plan.
- Prefer 1-3 actions per day or review cycle.

## Plan Shape

```text
接下来 14 天
├─ 今天:
├─ 3 天内:
├─ 7 天内:
└─ 14 天内:
```

Use modes:

```text
方向澄清
快速就业
转行验证
目标公司准备
面试等待
投递后空档期
复盘修正
低能量恢复
兼职/过渡
```

## Post-Application Idle Period

Use this when the user has submitted resumes/applications and is waiting for screening, interview invitations, or early feedback.

Examples:

```text
简历投完了，但还没有面试消息
今天投了 20 份，接下来不知道该干什么
投递后空档期很焦虑，总想刷新消息
等初筛的时候要不要继续改简历
```

Output:

```text
投递后空档期计划
├─ 当前阶段: 已投递 / 等初筛 / 等邀约 / 等反馈
├─ 不建议做:
├─ 应该继续做:
├─ 投递质量复盘:
├─ JD 共性整理:
├─ 可补硬技能 / 项目证据:
├─ 下一批投递策略:
├─ 信息摄入边界:
└─ 今天 5-20 分钟动作:
```

Rules:

- Do not let the user fill the empty period with endless social media scrolling, repeated refreshes, or rewriting the whole resume every day.
- Do not assume the only answer is "apply more". Check whether the last batch had clear role family, JD fit, resume version, and tracking.
- Use the idle period to improve one reusable asset: JD pattern notes, one project fact card, one hard-skill practice, one interview answer card, or one application tracker update.
- If the user is anxious or low energy, give one 5-20 minute action and one stopping rule.
- Follow-up is usually for recruiter conversations or active processes. For cold applications with no interaction, prefer improving pipeline quality and continuing small-batch applications over chasing every company.

## Interview Waiting And Feedback

Use this when the user has interviewed and is waiting, wants to ask for feedback, or needs to decide whether a role is worth waiting for.

If the user already has interview keywords, partial questions, or interviewer feedback that should change resume wording, project storytelling, hard-skill preparation, or future JD direction, hand off to `interview-review-miner`.

Pure waiting examples stay here:

```text
面试完一周没有消息，要不要问 HR
HR 说还在流程中，接下来怎么安排
想礼貌确认进度
等结果期间怎么同步推进其他机会
```

```text
面试等待卡
├─ 当前阶段:
├─ 岗位仍值得等吗:
├─ 等待成本:
├─ 面试体验信号:
├─ 同步推进动作:
├─ 何时询问反馈:
└─ 询问反馈话术:
```

Guidelines:

- Help the user plan the waiting period instead of obsessively checking messages.
- Keep the first answer short: one status judgment, one suggested timing, one follow-up wording, and one parallel action.
- Compare role fit, company/team signals, interview experience, compensation/location/growth, waiting time, and alternative opportunities.
- Interview experience signals include whether questions matched the JD, whether responsibilities were clear, whether the interview respected the candidate, and whether there were vague duties, pressure, or excessive requirements.
- Feedback follow-up wording should be short, polite, and low-pressure. Prefer asking for hiring progress or expected timeline rather than detailed evaluation.
- If the interviewer gave a timeline, recommend following up after that date. If the user has another offer deadline or scheduling conflict, allow an earlier polite note that explains the constraint.
- If the user only received vague or secondhand feedback, treat it as a waiting/review signal, not a final judgment. Ask `interview-review-miner` to classify source type and reliability before using it to change materials or direction.
- Do not imply the user is entitled to detailed feedback; many employers may not provide it.

## Review Shape

```text
3 分钟复盘
├─ 今天做了什么:
├─ 有效的动作:
├─ 卡住的地方:
├─ 明天 1-3 个动作:
└─ 是否需要暂停信息摄入:
```

For weekly review:

```text
15 分钟周复盘
├─ 本周反馈:
├─ 材料问题:
├─ 方向问题:
├─ 面试/表达问题:
└─ 下周调整:
```

## Boundaries

- Do not create 30/60/90 day plans unless explicitly requested.
- Do not treat more applications as always better; adjust based on feedback quality.
- Include privacy reminders for application trackers and interview notes.
- Provide options and suggested next actions, but do not make final decisions for the user about follow-ups, applications, offers, resignation, or negotiation.

## Version Record

```text
v0.2.4 / 2026-07-29
- Added post-application idle-period planning for the gap after submitting resumes but before interviews or feedback.
- Added rules to use waiting time for JD pattern notes, project facts, hard-skill practice, answer cards, or application tracking instead of endless refreshes.

v0.2.3 / 2026-07-29
- Clarified pure interview waiting and HR follow-up wording should stay in this skill.
- Added short-response shape for waiting scenarios.

v0.2.2 / 2026-07-29
- Added handoff guidance for vague or secondhand feedback reliability checks.

v0.2.1 / 2026-07-29
- Added interview experience signals to waiting-period role evaluation so users do not over-attribute every outcome to themselves.

v0.2.0 / 2026-07-29
- Clarified that interview keywords, partial questions, interviewer feedback, and post-interview resume/interview-direction changes should route to interview-review-miner.
- Kept this skill focused on waiting, follow-up wording, planning, application tracking, and review rhythm.
```
