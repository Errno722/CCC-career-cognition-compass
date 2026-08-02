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
8. **Adjust by interviewer role.** If the user knows the interviewer type, tailor answer focus by role; if not, provide a compact role-focus map.

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

## Interviewer Role Prep

When preparing for interviews, separate the question topic from the interviewer role. The same answer should keep the same facts but change what is emphasized.

Use this role map as a preparation heuristic, not a fact about the exact interviewer. If the interview invitation, interviewer title, JD, previous feedback, or company stage gives stronger signals, use those signals first.

```text
HR / Recruiter
├─ 重点: 动机、稳定性、薪资/入职时间、沟通风险、基础匹配
└─ 准备: 30 秒自我介绍、为什么换/转、当前状态、期望与边界

用人经理 / 直属 leader
├─ 重点: 能否上手、项目证据、协作方式、短期交付
└─ 准备: 1-2 个 EVIDENCE_READY 项目、个人贡献、关键判断、30 天入职计划

业务负责人 / 业务面试官
├─ 重点: 业务理解、用户/客户、指标、优先级和商业判断
└─ 准备: 业务场景拆解、指标理解、取舍逻辑、竞品或行业观察

技术面试官 / 工具面试官
├─ 重点: 工具、方法、实现细节、边界、排错和学习能力
└─ 准备: 工具清单、实际做过的步骤、限制条件、不会的部分如何补

高管 / Executive
├─ 重点: 方向判断、业务敏感度、跨团队影响、公司阶段理解
└─ 准备: 关键选择、业务判断、学习速度、对团队目标的理解

Founder
├─ 重点: 长期动机、抗压、业务敏感度、是否能承担不确定性
└─ 准备: 为什么是这个方向、为什么是这家公司、你能带来的确定性

跨部门协作方 / 同级成员
├─ 重点: 配合成本、沟通方式、冲突处理、日常交付习惯
└─ 准备: 协作案例、对齐机制、需求变更和反馈处理方式
```

Output when relevant:

```text
面试官角色准备卡
├─ 角色:
├─ 对方最关心:
├─ 应该前置的证据:
├─ 少说或后置:
├─ 可能追问:
└─ 练习动作:
```

Rules:

- Do not invent different facts for different interviewer roles.
- If the user's projects are not `EVIDENCE_READY`, keep project examples provisional or route to `career-project-experience-miner`.
- If interviewer roles are unknown, prioritize HR, hiring manager, business, and technical lenses for role preparation.
- Do not claim an interviewer will definitely care about a topic based only on role title.

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
├─ 技术/工具面试可能问题:
└─ 面试官角色准备卡:
```

## Boundaries

- Do not promise interview success.
- Do not invent company facts, tool requirements, metrics, or culture claims.
- If using online information, cite sources and treat social media as anecdotal unless verified.
- Do not generate a full resume unless the user asks; provide resume angles or bullet ideas first.
- Do not use vague project descriptions as role-fit proof. If project facts are incomplete, mark them as evidence gaps or route to career-project-experience-miner.

## Version Record

```text
v0.1.1 / 2026-08-02
- Added interviewer-role prep cards so HR, hiring manager, business, technical, executive, founder, cross-functional, and peer interviewers get different answer emphasis.
- Clarified role mappings are preparation heuristics, not facts about the exact interviewer.

v0.1.0 / 2026-07-28
- Added project evidence gate for fit evaluation, project-case selection, interview answers, and resume angles.
- Pure JD/company requirement analysis can still proceed without project mining.
```
