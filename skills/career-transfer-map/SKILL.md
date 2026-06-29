---
name: career-transfer-map
description: >-
  Transferable-skill and role-family mapping. Use when the user asks where existing skills can transfer, what roles/industries/company types to consider, how to move across roles or industries, or how campus, project, operations, sales, product, data, AI, design, support, education, or bridge-work evidence can map to job families; recommend at most 1-3 role families with evidence, gaps, and validation actions.
---

# Career Transfer Map

## Overview

Translate messy experience into transferable capabilities and nearby role families. Start from evidence, not identity labels or wishful matching.

## Mapping Workflow

1. **Extract evidence.** Pull out tasks, tools, audiences, decisions, deliverables, constraints, and results.
2. **Translate capability.** Convert evidence into capabilities such as analysis, coordination, customer communication, process ownership, writing, research, tool use, QA, teaching, or automation.
3. **Map role signals.** Connect capabilities to role families without overclaiming seniority.
4. **Filter by reality.** Consider urgency, energy, location, language, salary floor, market demand, and whether the user needs bridge income.
5. **Choose 1-3 directions.** Recommend only a few directions to validate.

If a field has sub-directions, do not pick one silently. Show candidate branches and mark them as `needs_confirmation` before recommending validation actions. For example, "断路器" should not be automatically treated as low-voltage; ask whether the target is low voltage, medium voltage, high voltage, distribution, R&D, sales, testing, after-sales, or project work.

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
│  ├─ 最大缺口:
│  └─ 7 天验证动作:
└─ 暂不优先:
```

## Boundaries

- Do not recommend more than 3 directions unless the user explicitly asks for broad exploration.
- Do not equate interest with evidence; mark weak matches as `needs_evidence`.
- Do not describe the user's evidence as "blank" when the user has simply not provided details yet.
- Do not collapse a broad industry/product term into a specific specialization without user or JD evidence.
- Use current JDs or company pages when market requirements matter.
