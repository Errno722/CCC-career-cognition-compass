---
name: career-transfer-map
description: >-
  Transferable-skill and role-family mapping. Use when the user asks where existing skills can transfer, what roles/industries/company types to consider, how recent work tasks or preferred work tasks suggest positioning, how to move across roles or industries, or how campus, project, operations, sales, product, data, AI, design, support, education, interview-invitation signals, or bridge-work evidence can map to job families; recommend at most 1-3 role families with evidence, gaps, and validation actions.
---

# Career Transfer Map

## Overview

Translate messy experience into transferable capabilities and nearby role families. Start from evidence, not identity labels or wishful matching.

## Mapping Workflow

1. **Extract evidence.** Pull out tasks, tools, audiences, decisions, deliverables, constraints, and results.
2. **Check project facts.** If the evidence is mostly vague project names, unclear ownership, unclear output, or missing results, assign `DISCOVERED` or `PARTIALLY_MAPPED` and hand off to `career-project-experience-miner` before mapping roles.
3. **Translate capability.** Convert evidence into capabilities such as analysis, coordination, customer communication, process ownership, writing, research, tool use, QA, teaching, or automation.
4. **Read work-task preference.** If the user says they recently do or like certain work tasks, treat it as a role signal only when it is work-related and repeatable.
5. **Map role signals.** Connect capabilities to role families without overclaiming seniority.
6. **Filter by reality.** Consider urgency, energy, location, language, salary floor, market demand, interview-invitation signals, and whether the user needs bridge income.
7. **Control branching.** If the user lists many role families, group them and keep only 1-3 validation directions.
8. **Choose 1-3 directions.** Recommend only a few directions to validate.

If a field has sub-directions, do not pick one silently. Show candidate branches and mark them as `needs_confirmation` before recommending validation actions. For example, "断路器" should not be automatically treated as low-voltage; ask whether the target is low voltage, medium voltage, high voltage, distribution, R&D, sales, testing, after-sales, or project work.

If the user is over-diverging across many roles, skills, or industries, do not map everything. First group them:

```text
方向收束
├─ 可合并为一类:
├─ 当前证据最强:
├─ 暂存方向:
└─ 本周只验证:
```

Use the evidence threshold to choose: confirmed work/project evidence, recent work-task signal, interview invitation signal, JD match, urgency, and energy. Do not create a giant role map.

When evidence is not yet visible, say "specific evidence has not been stated yet" instead of implying the user has none. Ask for one concrete task or project episode first:

```text
你服务过谁 / 面向谁
你具体做了什么
用过什么工具
产出了什么
遇到什么限制
结果或反馈是什么
```

This often reveals transferable signals faster than asking only about interests.

Recent work-task signals can help clarify positioning:

```text
近期工作行为信号
├─ 最近反复做:
├─ 主动愿意做:
├─ 做完更有掌控感:
├─ 消耗或不想长期做:
├─ 对应能力:
└─ 可验证岗位信号:
```

Rules:

- Count work tasks such as writing SOPs, coordinating stakeholders, analyzing data, breaking down requirements, handling users/customers, testing tools, preparing training, or turning messy input into clear docs.
- Do not count hobbies by themselves. If the user says they "like chatting" or "like design", ask for a work example such as customer calls, user interviews, workshop facilitation, UX layout, or visual production.
- Do not recommend a job family from preference alone. Pair preference with evidence, market/JD needs, interview invitation signals, and a small validation action.

If the user has already received interview invitations, treat them as market feedback:

```text
面试邀约信号
├─ 收到回复的岗位族群 / JD:
├─ 无回复或低回复岗位:
├─ 被市场识别到的能力:
├─ 相对更容易回复的方向:
└─ 仍需验证:
```

Do not treat reply likelihood as the same thing as long-term fit. Use invitation signals to rank validation priorities, then compare with user preference, energy, skill evidence, and cashflow deadline. If the invitation sample is small, label it `early_signal`.

When the user has several projects but cannot explain value, do not reduce them to capability labels too early. First build a project fact card:

```text
项目背景
个人贡献
工具 / 方法
产出
结果 / 证据
待确认
```

Only map projects marked `EVIDENCE_READY`. If a project is `DISCOVERED` or `PARTIALLY_MAPPED`, keep it in the evidence gap list:

```text
暂不做能力迁移的项目
├─ 项目:
├─ 当前状态:
└─ 需要补的事实:
```

## Role-Family Scan

Use these as a scanning map, not a giant list:

```text
Operations / Growth / Community / Content
Sales / BD / Customer Success
Product / Project / Business Coordination
Data / Analytics / BI
AI Tools / AI Agent / Automation
Marketing / Brand / Content / Media
Design / UX / Creative
HR / Admin / Finance / Office Functions
Education / Training / Coaching
QA / Testing / Technical Support
Supply Chain / E-commerce / Retail Operations
Bridge / Part-time / Low-risk Restart
```

## Output Shape

```text
可迁移能力地图
├─ 经历证据:
├─ 可迁移能力:
└─ 岗位信号:

优先验证的方向
├─ 方向 1:
│  ├─ 已有证据:
│  ├─ 近期工作行为信号:
│  ├─ 最大缺口:
│  └─ 7 天验证动作:
└─ 暂不优先:
```

## Boundaries

- Do not recommend more than 3 directions unless the user explicitly asks for broad exploration.
- Do not produce a giant role map when the user is already scattered; group and park branches first.
- Do not equate interest with evidence; mark weak matches as `needs_evidence`.
- Do not equate work-task preference with final fit; mark it as `positioning_hypothesis` until validated.
- Do not convert unfinished project facts into role-family evidence. Project evidence must be `EVIDENCE_READY` or explicitly marked as a gap.
- Do not describe the user's evidence as "blank" when the user has simply not provided details yet.
- Do not collapse a broad industry/product term into a specific specialization without user or JD evidence.
- Use current JDs or company pages when market requirements matter.
