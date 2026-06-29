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
3. **Match evidence.** Compare with the user's existing evidence without exaggeration.
4. **Identify gaps.** Mark gaps as `must_fix`, `can_explain`, `not_required_now`, or `needs_confirmation`.
5. **Plan practice.** Suggest 7-14 day practice actions based on available time.
6. **Prepare questions.** Generate business interview questions and technical/tool questions separately.

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
