---
name: career-materials-builder
description: >-
  Editable job-search materials builder. Use when the user asks for resume drafts/templates, resume section structure, campus versus experienced resume adjustments, status wording such as resigned/open to work/gap, LinkedIn or platform wording, portfolio outline, mind map, interview notes, expression strategy such as interview-rate-first versus truthful-fit-first positioning, or concise job-search materials after intake. Keep outputs editable and evidence-based; do not fabricate facts or produce full portfolios by default.
---

# Career Materials Builder

## Overview

Produce small, editable job-search materials after enough intake exists. Materials are outcomes of clarification, not the default starting point.

## Explicit Resume Requests

If the user starts with "改简历", "优化简历", "生成简历", "帮我看简历", or similar wording, respond to that request immediately. Do not route them back to broad career clarification first.

Do this:

1. Say that resume editing is possible.
2. Ask for the smallest safe input: desensitized resume excerpt, target role/JD, and what they want improved.
3. If enough content is already present, give 1-3 concrete edits or replacement text.
4. If content is missing, ask at most 3 questions; do not require a full resume form.

Short reply pattern:

```text
可以，我先按“可修改简历”处理。请先脱敏后发：
1. 简历片段或经历 bullet
2. 目标岗位或 JD
3. 你最想改的点：更像目标岗位 / 更简洁 / 更容易拿面试 / 更真实稳妥
```

## Preconditions

Before drafting, confirm the minimum usable picture:

```text
current status
target direction or JD
education / work / project evidence
core skills
constraints and available time
```

If the picture is missing, ask for up to 3 key facts instead of forcing a full form.

## Resume Scope

Include these common sections when creating a resume draft or template:

```text
姓名
现居地
电话
邮箱
目前状态
教育背景
工作经历
项目经历
核心技能
```

For campus recruiting, optionally add GPA, coursework, internships, awards, competitions, club work, papers, certificates, and campus projects when relevant.

For experienced candidates, prioritize role-relevant work/project evidence, tools, measurable but truthful outcomes, and status wording such as:

```text
离职，随时入职
Gap 中，随时入职
在职，考虑合适机会
Currently employed and open to suitable opportunities
Open to Work
```

## Resume Version Hygiene

When the user has multiple resume versions, keep these separate:

```text
中性主简历
├─ fixed facts, education, dates, companies, real projects
└─ reusable experience and skill modules

JD 定制简历
├─ role-specific order, wording, profile, and keyword emphasis
└─ reference_only for future JDs
```

Before creating or editing a resume for a new role, check whether the source is the neutral master resume or a previous JD-tailored version. If the previous version was biased toward a different role family, such as project management, product, operations, or R&D, reset the emphasis before drafting.

Use a short warning when useful:

```text
注意：上一版可能带有 [项目管理] 偏向。本次会保留事实，但按 [研发] JD 重新排序和取舍。
```

## Output Options

Choose one small material unless the user asks for a package:

```text
可编辑简历草稿
简历模板和写作思路
作品集主题和大纲
平台投递文字
LinkedIn / Open to Work 表达
简短思维导图
面试复盘卡
表达策略建议
```

## Expression Strategy

Some users want to maximize interview chances; others prefer to present a more transparent picture to screen for better-fit companies. Ask or infer the preference when it affects wording.

If the user says they want the resume to get more interviews but not be fully untrue, treat this as `平衡策略` by default. Do not moralize or only warn. Give a short boundary card before asking for facts:

```text
可以做
├─ 重排经历顺序，让最相关证据靠前
├─ 把用户真实做过的事翻译成目标岗位语言
├─ 强化可证明的工具、任务、对象、结果和约束
├─ 用“参与/协助/负责其中一部分/独立完成”准确标注贡献度
└─ 对不确定数据使用“约/范围/频次/规模”，或先标记待确认

不能做
├─ 编造公司、岗位、学历、项目、客户、证书、奖项或数据
├─ 把没做过写成做过
├─ 把了解写成熟练，把参与写成主导
└─ 写出用户面试时无法解释的经历
```

Use three strategy labels:

```text
面试率优先
真实匹配优先
平衡策略
```

Rules:

- `面试率优先`: strengthen relevant evidence, reorder sections, mirror JD keywords, and emphasize outcomes, but do not invent facts.
- `真实匹配优先`: keep constraints, preferences, current level, and boundaries visible enough to filter mismatched companies.
- `平衡策略`: default; keep facts truthful while translating them into role-relevant language.

For this scenario, ask for at most 3 facts:

```text
1. 你之前做过什么岗位/行业/任务？
2. 想投什么方向或 JD？不确定也可以说 1-3 个方向。
3. 你最有把握解释清楚的 1-2 件事是什么？
```

## Style Rules

- Use restrained career language.
- Do not turn participation into ownership.
- Do not turn familiarity into mastery.
- Do not invent data, clients, awards, tools, certificates, or job titles.
- Keep materials easy for the user to edit; avoid final-sounding claims when evidence is weak.
