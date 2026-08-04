---
name: job-search-plan-review
description: >-
  Short job-search planning and review. Use when the user needs a plan based on available time, daily/weekly review, application tracking, post-application idle-period planning after submitting resumes, pure interview waiting structure, HR follow-up timing or wording, role evaluation while waiting, rejection recovery, next 1-3 actions, social-media information control, or a habit-building job-search rhythm. For interview keywords, partial questions, interviewer feedback such as "X experience is insufficient", and resume/interview-direction updates after an interview, use interview-review-miner instead. Keep plans within 14 days and adapt to energy, cashflow, deadlines, and current job constraints.
  Also use when the user wants to summarize interview invitations received, compare invited roles/JDs with no-response applications, build an interview-invitation signal profile, and decide which role families or JD traits are more likely to get replies. For detailed JD skill analysis, use jd-company-prep as a helper.
---

# Job Search Plan Review

## Overview

Create short, usable plans and reviews that help the user keep momentum without collecting unused materials.

## Planning Rules

- Default to a maximum of 14 days.
- Ask for available time if missing: hours per day/week, weekdays/weekends, interview dates, current job/class constraints, cashflow deadline, and energy level.
- If the user is low energy, give one 5-20 minute action instead of a full plan.
- Prefer 1-3 actions per day or review cycle.
- If the user is trying to pursue many branches at once, set an active-track limit: 1 main track, 1 optional secondary track, and a parking lot for the rest.
- If the user is anxious, do not respond with motivational slogans. Use anxiety as a planning signal: identify the trigger, separate controllable from uncontrollable items, set an information-intake boundary, and give one small action.

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
面试邀约信号画像
```

If the user is over-diverging, output this before any plan:

```text
发散收束卡
├─ 本周只推进:
├─ 暂存:
├─ 暂停:
└─ 今天 5-20 分钟动作:
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

## Anxiety Noise Reduction

Use this when the user says they are anxious, panicking, comparing themselves with others, refreshing apps repeatedly, doom-scrolling job content, or feeling unable to start.

Output:

```text
焦虑降噪卡
├─ 当前焦虑触发源:
├─ 现在可控:
├─ 现在不可控:
├─ 暂停继续做:
├─ 信息摄入边界:
└─ 今天 5-20 分钟动作:
```

Rules:

- Acknowledge one concrete detail from the user's words, then move to sorting. Do not write long comfort paragraphs.
- Do not say generic lines such as "相信自己", "一切都会好", "你已经很棒了", or "不要焦虑".
- Do not treat anxiety as a personal flaw or productivity problem.
- Do not turn normal job-search anxiety into diagnosis, therapy, or crisis counseling. If the user describes self-harm, inability to stay safe, severe loss of function, abuse, or medical/legal risk, pause job-search coaching and suggest local professional or emergency support.
- For social media overwhelm, set a stopping rule such as `看 10 分钟只记录 1 条可验证信息，然后关闭`.
- For waiting anxiety, make the action observable: update application tracker, extract JD patterns, prepare one answer card, or choose the next small batch.

## Interview Invitation Signal Profile

Use this when the user has already received one or more interview invitations and wants to understand which roles, JDs, industries, company types, channels, or resume versions seem to be getting replies.

Examples:

```text
最近收到的面试邀请主要是运营和项目执行，帮我判断接下来投什么更容易有回复
我投了 40 个岗位，5 个邀约都偏用户运营，没回复的是产品经理和 AI 工程师
帮我总结收到面试的岗位画像，根据 JD 看我下一批该投什么
哪些岗位回复概率比较大
```

Ask for missing minimum data only if needed:

```text
收到邀约的岗位 / JD 要点
大概投递数量和时间窗口
无回复或拒绝较多的岗位方向
投递渠道 / 简历版本（如有）
用户本人仍然想优先验证的方向
```

Output:

```text
面试邀约信号画像
├─ 样本边界: 投递数量 / 时间窗口 / 渠道 / 简历版本 / 数据缺口
├─ 已收到邀约的岗位族群:
├─ JD 工作重心: 执行 / 运营 / 产品 / 项目协调 / 数据 / 技术 / 混合 / 不明确
├─ 共同关键词与交付物:
├─ 市场正在识别到的用户信号:
├─ 相对高回复信号:
├─ 相对低回复或暂未验证信号:
├─ 下一批优先投递:
├─ 小规模验证组合:
└─ 今天 5-20 分钟动作:
```

Rules:

- Treat invitation data as a market signal, not a final career decision.
- Do not promise exact reply probability such as "80%". Use relative levels like higher / medium / lower confidence, and explain sample size.
- Do not overfit one or two invitations. Mark them as `early_signal`; only repeated invitations from similar JDs become a stronger pattern.
- Compare invitations against no-response applications when available. If the user only provides invitations, state that the profile is biased toward positive signals.
- Classify JD role type by responsibilities and deliverables, not only title. If needed, use `jd-company-prep` as helper.
- Separate "more likely to get replies" from "better long-term fit". Include the user's own preference, energy, cashflow deadline, and skill evidence before suggesting priority.
- Recommend small-batch experiments, for example 5-10 applications per role family or resume version, rather than unlimited mass application.
- Preserve version isolation: do not let a high-reply operations profile automatically contaminate product, technical, or research resume versions.
- If results suggest the user is being invited mostly by a role they do not want, frame it as leverage or bridge option, not as a forced direction.

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
v0.2.6 / 2026-08-04
- Added anxiety noise-reduction cards for waiting, repeated refreshing, social-media overwhelm, and job-search comparison spirals.
- Clarified that anxious users should receive controllable/uncontrollable sorting, information-intake boundaries, and one 5-20 minute action instead of motivational slogans.

v0.2.5 / 2026-08-04
- Added interview invitation signal profiling for summarizing received interview invitations, JD role types, reply signals, and next small-batch application experiments.

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
