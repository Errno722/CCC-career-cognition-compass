---
name: career-hard-skill-kb
description: >-
  Hard-skill knowledge base and glossary builder for job search. Use when organizing role-specific hard skills, tools/software, technical or business interview questions, user evidence, skill gaps, ambiguous acronyms such as SP/PM/AI/LLM, or comparing requirements for roles such as Product Manager, Project Manager, SAS Programmer, AI Agent Engineer, data analyst, operations, design, sales, support, and other job families.
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
│  ├─ 14 天内可补动作:
│  └─ 面试可能问题:
└─ 术语/缩写表
```

## Workflow

1. **Start from available clues.** Use messy notes, courses, tools, projects, JD snippets, interview memories, and user-defined abbreviations.
2. **Separate skill from evidence.** Do not mark a skill as strong unless the user has a concrete project, task, tool use, result, or interview answer.
3. **Capture tools.** List software and tool expectations by role, such as Excel, SQL, Tableau/Power BI, Figma, Jira, Axure, SAS, Python, Git, APIs, RAG tools, CRM, CMS, or analytics platforms when relevant.
4. **Organize questions.** Put business and technical questions under the skill they test.
5. **Update continuously.** Add new interview questions, JD requirements, and gaps after each review.

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
