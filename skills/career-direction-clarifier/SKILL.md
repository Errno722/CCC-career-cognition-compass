---
name: career-direction-clarifier
description: >-
  Career intention and direction clarification. Use when the user is unsure what the job search is really solving, says they do not know what they want, is branching into too many directions at once, sees many JDs and does not know what to apply for, needs Role Family clustering or a 7-day direction experiment, wants to understand positioning from recent work tasks or work-task preferences, feels overwhelmed by social media, wants to understand job-search pain points, uses MBTI/zodiac/personality labels to describe themselves, or needs to choose a mode such as direction clarity, fast employment, career transition, target-company preparation, review, or restabilization. Not for resume-only optimization or clinical counseling.
---

# Career Direction Clarifier

## Overview

Clarify what the user is actually trying to solve before recommending jobs. Treat "finding a job" as a possible surface request, not the whole diagnosis.

## Shared Rule Versions

- SHARED_RULE focus-control v1.2
- SHARED_RULE certainty-calibration v1
- SHARED_RULE profile-persistence v1.2

Use `core/focus-control.md` to keep one active thread, park extra branches, and avoid turning direction clarification into a full materials package.

## Workflow

1. **Name the real problem.** Check whether the user is seeking income, safety, direction, identity, confidence recovery, escape from current work, visa/graduation timing, or fast employment.
2. **Choose the mode.** Select one primary mode for the next step: `clarify_direction`, `quick_job`, `career_change`, `target_company`, `interview_review`, `low_energy`, or `bridge_work`.
3. **Translate self-description.** If the user mentions MBTI, zodiac, Enneagram, or personality labels, convert them into work preferences, collaboration style, energy sources, pressure triggers, and examples to verify.
4. **Read recent work behavior.** If the user mentions what they have recently been doing or what work tasks they like, treat this as positioning evidence only when it is work-related, not a hobby label.
5. **Contain over-divergence.** If the user brings too many roles, skills, materials, tools, or plans at once, group them and choose one main thread.
6. **Reduce noise.** If the user is overloaded by social media or advice, separate useful signal from anxiety-generating content.
7. **Avoid premature certainty.** Offer hypotheses and validation actions, not life conclusions.
8. **Keep focus.** Output the requested clarification first, then one necessary support card and one next action. Park resume, skill, platform, or long-term plan branches unless the user asks to expand.

## Four Types Of "I Don't Know What To Apply For"

When the user says they do not know what to apply for, first identify which problem is active:

```text
A. 真正方向未知
没有稳定 Role Family，需要从经历、近期工作行为和市场 JD 建立 1-3 个假设。

B. 已经缩小，但不敢放弃其他可能
不是没有方向，而是不愿承担暂时选择的机会成本；需要 7 天验证，不需要终身结论。

C. 岗位标题相同，但 JD 实际工作差异很大
需要按 Role Family / Job Archetype 聚类，不按标题做决定。

D. 求职耗竭 / 决策疲劳
看到 JD、改材料、重新判断方向本身已经造成摩擦；需要降低选择和改材料成本。
```

Rules:

- Do not answer these four situations with a bigger job list.
- If the user has saved many JDs, cluster first; do not deeply analyze every JD.
- If the user is exhausted, reduce the decision surface before giving any new recommendation.
- If the user already has a possible direction, call it a short-term experiment, not a final identity.

## Role Family Clustering

Use this when the user provides 10-20 saved JDs, many job titles, or a messy list of roles.

Cluster by:

```text
工作内容
核心任务
要求的证据
工具
seniority
交付物
```

Do not cluster only by title. For example, "产品运营", "项目执行", "产品助理", and "增长运营" may overlap or separate depending on what the JD asks the person to deliver.

Output:

```text
Role Family 聚类
├─ Role Family A:
│  ├─ 代表 JD:
│  ├─ 核心任务:
│  ├─ 需要的证据:
│  ├─ 适合用户的证据:
│  └─ 当前缺口:
├─ Role Family B:
└─ 先验证:
```

Keep at most 3 active families. Put low-signal or high-cost families into parking.

## Seven-Day Direction Experiment

Do not ask the user to decide their final career direction when the evidence is still thin. Use a 7-day experiment:

```text
7 天方向验证
├─ 主验证方向:
├─ 次方向:
├─ 探索方向:
├─ 本周不验证:
├─ 观察:
│  ├─ 投递回复:
│  ├─ 面试邀请:
│  ├─ JD 共性:
│  ├─ 修改材料时是否抗拒:
│  └─ 项目证据是否自然匹配:
└─ 7 天后再判断:
```

Rules:

- Say explicitly: this is short-term validation, not a lifetime decision.
- Prefer small batches and observable signals over broad career conclusions.
- If the user is in Gap, low energy, or decision fatigue, make the experiment smaller.
- If the user gets no result, hand off to `job-search-plan-review` for funnel and sample-size diagnosis before resetting direction.

## Divergence Control

Use this when the user says many things at once, such as:

```text
我想投运营/产品/数据/AI，也想学 SQL/Python/剪辑，还想改简历、做作品集、准备面试
我看了很多教程，不知道先做什么
我一会想转行，一会想考证，一会想做兼职
```

Output:

```text
发散收束卡
├─ 我看到的分支:
├─ 本轮主线:
├─ 暂存分支:
├─ 本轮先不处理:
├─ 选择主线的理由:
└─ 下一步 1 个动作:
```

Rules:

- Do not expand every branch.
- Select at most one main thread for the current reply; if two are truly coupled, explain the coupling.
- Preserve secondary branches in a parking lot so the user does not feel they are lost.
- Choose based on urgency, evidence, deadline, energy, and which step unlocks the next decision.
- Do not create a giant roadmap or multi-week study plan unless the user explicitly asks after the main thread is clear.

## Recent Work-Task Positioning

Use this when the user says things like:

```text
最近总在做...
我发现自己挺喜欢做...
我做某类工作比较顺
我不知道这说明我适合什么定位
```

Only count work or project tasks, not hobbies. Examples:

```text
counts:
流程梳理、SOP、需求拆解、用户访谈、数据分析、写方案、跨部门推进、客户沟通、工具搭建、测试排错、内容策划、培训新人

does not count by itself:
喜欢画画、喜欢星座、喜欢聊天、喜欢刷内容、喜欢游戏
```

Output a small positioning hypothesis:

```text
近期工作行为定位卡
├─ 最近实际在做:
├─ 愿意继续做 / 做完更有掌控感:
├─ 消耗或不想长期做:
├─ 暂时显示的能力信号:
├─ 可能定位假设:
├─ 还不能下结论的部分:
└─ 7 天验证动作:
```

Rules:

- Do not equate liking a task with being suitable for a job family.
- Connect preference to evidence: frequency, context, audience, deliverable, feedback, and whether the user can repeat it.
- If evidence is thin, ask for one recent work episode instead of recommending roles.
- Compare work-task preference with market/JD signals before turning it into resume or profile positioning.

## Output Shape

```text
你现在可能在解决的不是一个问题
├─ 表层问题:
├─ 更深层需求:
└─ 当前最优先:

建议先进入的模式
├─ mode:
└─ 为什么:

如果正在发散
├─ 本轮主线:
├─ 暂存分支:
└─ 下一步 1 个动作:

需要验证的假设
├─ 假设 1:
├─ 假设 2:
└─ 需要你补一个例子:

下一步 1-3 个动作
```

## Style Rules

- Use the user's own words; do not create a polished persona.
- Do not say "your type is suited to X" based on MBTI or zodiac.
- Do not produce a large job list. If direction is still unclear, ask for one concrete example of energizing and draining work.
- Do not treat hobbies as job positioning. If the user gives hobbies, ask for the closest work-task version.
- Do not reward over-divergence by producing everything requested in one reply.
