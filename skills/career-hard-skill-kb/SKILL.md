---
name: career-hard-skill-kb
description: >-
  Hard-skill knowledge base and glossary builder for job search. Use when organizing role-specific hard skills, tools/software, technical or business interview questions, user evidence, skill gaps, interviewer feedback signals, ambiguous acronyms such as SP/PM/AI/LLM, or comparing requirements for roles such as Product Manager, Project Manager, SAS Programmer, AI Agent Engineer, data analyst, operations, design, sales, support, and other job families.
---

# Career Hard Skill KB

## Overview

Build a lightweight living knowledge base of role skills, tools, evidence, gaps, acronyms, and interview questions. The user should not need to provide many documents first.

## Knowledge Base Shape

```text
硬技能知识库
├─ 目标岗位/方向
├─ 技能分类
│  ├─ 技能名:
│  ├─ 常用工具/软件:
│  ├─ 用户已有证据:
│  ├─ 缺口:
│  ├─ 面试反馈:
│  ├─ 14 天内可补动作:
│  └─ 面试可能问题:
└─ 术语/缩写表
```

## Workflow

1. **Start from available clues.** Use messy notes, courses, tools, projects, JD snippets, interview memories, and user-defined abbreviations.
2. **Separate skill from evidence.** Do not mark a skill as strong unless the user has a concrete project, task, tool use, result, or interview answer.
3. **Capture tools.** List software and tool expectations by role, such as Excel, SQL, Tableau/Power BI, Figma, Jira, Axure, SAS, Python, Git, APIs, RAG tools, CRM, CMS, or analytics platforms when relevant.
4. **Organize questions.** Put business and technical questions under the skill they test.
5. **Update continuously.** Add new interview questions, JD requirements, interviewer feedback, and gaps after each review.

## Interview Feedback Updates

When `interview-review-miner` hands off feedback such as "X 经验不足", record it without overgeneralizing:

```text
技能 / 领域:
反馈原话:
反馈类型:
来源类型:
来源岗位 / JD:
重复次数:
反馈可信度:
动作等级: record_only / prepare_answer / patch_material / reconsider_scope
当前证据:
缺口:
简历是否需要补证据:
下次面试回答思路:
7-14 天可补动作:
source: interviewer_feedback
```

Do not mark a skill as weak only because one interviewer said so. Treat it as a signal to verify against JD requirements, repeated feedback, source role family, and the user's actual evidence.

If feedback is vague, secondhand, or only comes from one source, keep it as `record_only` or `prepare_answer`. Only use `patch_material` when the feedback is specific and supported by the user's actual evidence. Only consider `reconsider_scope` after repeated comparable signals.

Repeated feedback states:

```text
first_signal: 记录线索，不急着改方向
repeated_signal: 第二次出现，进入重点补强
pattern: 多次跨相似 JD 出现，考虑调整简历定位或岗位范围
```

## Acronym Rules

- Maintain a tiny glossary.
- Do not silently normalize `SP`, `PM`, `AI`, `LLM`, `BA`, `DA`, `DS`, `QA`, `BD`, `AE`, `AM`, `CRM`, `BI`, or `SAS`.
- If the user says `SP = SAS Programmer`, record it as `user_defined / confirmed`.
- Treat `AI` as ambiguous between Artificial Intelligence and Adobe Illustrator until context resolves it.
- Treat `LLM` as ambiguous between large language model and LL.M. until context resolves it.
- Treat broad product, industry, and role terms as possible ambiguity too. For example, `断路器` may refer to low-voltage, medium-voltage, high-voltage, distribution, R&D, sales, testing, after-sales, or project contexts. Do not create a hard-skill list for one branch until the user or JD confirms it.

## Output Rules

- Keep the knowledge base compact; do not create a large encyclopedia.
- Mark uncertain items as `needs_confirmation` or `needs_evidence`.
- Recommend short practice actions only within 14 days.

## Version Record

```text
v0.1.2 / 2026-07-29
- Added feedback reliability and action level fields for hard-skill updates.

v0.1.1 / 2026-07-29
- Added feedback source role/JD and repeated feedback states to avoid overreacting to one interview.

v0.1.0 / 2026-07-29
- Added interviewer feedback signals as a knowledge-base source.
- Added compact handoff fields for feedback such as "X experience is insufficient".
```
