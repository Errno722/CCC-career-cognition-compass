---
name: jd-company-prep
description: >-
  JD and target-company preparation for job seekers. Use when the user provides a job description, target company, role page, recruiter message, interview invitation, or asks what hard skills, tools, business topics, technical questions, short-term improvements, resume angles, or company-specific preparation are needed. Browse or request current JD/company materials when requirements may have changed.
---

# JD Company Prep

## Overview

Turn a JD or target company into a concise preparation card. Use current source material when possible; do not rely on vague role stereotypes.

## Workflow

1. **Confirm source.** Prefer the user's JD, company page, recruiter message, or recent role page. If current requirements matter and no material is provided, browse or ask for the latest source.
2. **Extract requirements.** Separate hard skills, tools/software, domain knowledge, soft requirements, seniority signals, and hidden expectations.
3. **Decide scope.** If the user only wants JD/company requirements, continue without project mining. If they want fit evaluation, project-case selection, project interview answers, or resume angles using their projects, run the project evidence gate first.
4. **Match evidence.** Compare with the user's existing evidence without exaggeration.
5. **Identify gaps.** Mark gaps as `must_fix`, `can_explain`, `not_required_now`, or `needs_confirmation`.
6. **Plan practice.** Suggest 7-14 day practice actions based on available time.
7. **Prepare questions.** Generate business interview questions and technical/tool questions separately.

## Project Evidence Gate

Do not require project mining for a pure JD/company analysis.

Use `career-project-experience-miner` first when the task involves:

```text
判断用户与 JD 的匹配度
选择最适合讲的项目案例
准备项目面试回答
把项目转成岗位证据
为目标公司准备候选人叙事或简历角度
```

Rules:

- Only use `EVIDENCE_READY` projects as fit evidence or interview cases.
- Keep `DISCOVERED` and `PARTIALLY_MAPPED` projects in evidence gaps.
- If the user needs a quick temporary answer, label it as temporary and include unknown fields and weak claims.

## Specialization Disambiguation

When a role, product, industry, or business line has multiple specializations, do not choose one by default. List plausible branches, mark them `needs_confirmation`, and ask one clarifying question before tailoring hard skills or interview questions.

Examples:

```text
断路器
├─ 可能分支: 低压 / 中压 / 高压 / 配电 / 研发 / 销售 / 测试 / 售后 / 项目
└─ 需要确认: 目标岗位或 JD 具体指哪一类？
```

Do not turn an upper-level term into a specific branch such as low-voltage circuit breakers unless the JD or user explicitly says so.

If the user references a JD but has not pasted the actual content, do not hallucinate the requirements. Ask the user to paste the JD and remove sensitive information such as company name, recruiter name, email, salary range, or internal details. If the user cannot paste it yet, provide a generic temporary role framework and label it clearly as provisional.

If the user is already interviewing or waiting after an interview, also evaluate role fit and waiting strategy:

```text
岗位评估
├─ 匹配度:
├─ 风险信号:
├─ 面试体验:
├─ 等待成本:
└─ 是否继续投入:
```

## Output Shape

```text
JD / 公司准备卡
├─ 岗位核心任务:
├─ 硬技能:
├─ 必备工具/软件:
├─ 用户已有证据:
├─ 可用于匹配的项目:
├─ 暂不可用于匹配的项目:
├─ 最大缺口:
├─ 7-14 天补强动作:
├─ 业务面试可能问题:
└─ 技术/工具面试可能问题:
```

## Boundaries

- Do not promise interview success.
- Do not invent company facts, tool requirements, metrics, or culture claims.
- If using online information, cite sources and treat social media as anecdotal unless verified.
- Do not generate a full resume unless the user asks; provide resume angles or bullet ideas first.
- Do not use vague project descriptions as role-fit proof. If project facts are incomplete, mark them as evidence gaps or route to career-project-experience-miner.

## Version Record

```text
v0.1.0 / 2026-07-28
- Added project evidence gate for fit evaluation, project-case selection, interview answers, and resume angles.
- Pure JD/company requirement analysis can still proceed without project mining.
```
