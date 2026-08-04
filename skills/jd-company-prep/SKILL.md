---
name: jd-company-prep
description: >-
  JD and target-company preparation for job seekers. Use when the user provides a job description, target company, role page, recruiter message, interview invitation, or asks what role type, hard skills, tools, business topics, technical questions, interview answer structure, candidate reverse questions, short-term improvements, resume angles, or company-specific preparation are needed. Browse or request current JD/company materials when requirements may have changed.
---

# JD Company Prep

## Overview

Turn a JD or target company into a concise preparation card. Use current source material when possible; do not rely on vague role stereotypes.

## Shared Rule Versions

- SHARED_RULE focus-control v1
- SHARED_RULE certainty-calibration v1
- SHARED_RULE profile-persistence v1

Use `core/focus-control.md` to answer the requested JD/company deliverable first, `core/certainty-calibration.md` to avoid overstating fit, and `core/profile-persistence.md` when next-round interview profile context is supplied.

## Workflow

1. **Confirm source.** Prefer the user's JD, company page, recruiter message, or recent role page. If current requirements matter and no material is provided, browse or ask for the latest source.
2. **Classify role type.** Before extracting skills, decide what kind of role the JD is actually describing: execution-heavy, operations-heavy, product-heavy, project-coordination-heavy, data/analytics, technical/build, sales/BD, customer success, marketing/brand, functional support, hybrid, or unclear.
3. **Extract requirements.** Separate hard skills, tools/software, domain knowledge, soft requirements, seniority signals, and hidden expectations.
4. **Decide scope.** If the user only wants JD/company requirements, continue without project mining. If they want fit evaluation, project-case selection, project interview answers, or resume angles using their projects, run the project evidence gate first.
5. **Match evidence.** Compare with the user's existing evidence without exaggeration.
6. **Identify gaps.** Mark gaps as `must_fix`, `can_explain`, `not_required_now`, or `needs_confirmation`.
7. **Plan practice.** Suggest 7-14 day practice actions based on available time.
8. **Prepare questions.** Generate business interview questions and technical/tool questions separately.
9. **Prepare answer structure.** Convert JD requirements into 1-3 selling points, concise bullet answers, STAR context setup, and conditional problem-solving frames.
10. **Calibrate tone and English wording.** If the output includes resume angles, interview prep notes, English answers, English self-introduction, LinkedIn wording, or an English-required role, check for over-certain claims and stiff translated English.
11. **Prepare candidate reverse questions.** Give practical, role-level questions the user can ask the interviewer without sounding grandiose.
12. **Adjust by interviewer role.** If the user knows the interviewer type, tailor answer focus by role; if not, provide a compact role-focus map.
13. **Keep output focused.** Use one main card based on the user's requested deliverable. Do not output every JD, resume, interview, reverse-question, and profile section unless the user asks to expand.

## Role Type Classification

Always classify the JD before telling the user what to prepare. Do not rely on the title alone; responsibilities and deliverables are stronger evidence than title wording.

Use two axes:

```text
JD 岗位类型判断卡
├─ 岗位族群: 产品 / 运营 / 项目 / 执行 / 数据 / 技术 / 销售BD / 客户成功 / 市场品牌 / 职能支持 / 混合 / 不明确
├─ 工作重心: 执行交付 / 运营增长 / 产品需求 / 项目协调 / 数据分析 / 技术实现 / 商务拓展 / 客户服务 / 内容传播 / 流程支持
├─ 判断依据: 从 JD 原文抽取 2-4 条职责或交付物
├─ 置信度: high / medium / low
├─ 容易误判:
└─ 用户准备重点:
```

Preparation focus by role type:

```text
执行岗 / 执行交付
└─ 准备: 任务拆解、流程细节、交付质量、跟进记录、工具熟练度、如何处理重复但重要的工作。

运营岗 / 运营增长
└─ 准备: 用户/内容/活动/社群/增长场景、指标意识、复盘方法、数据看板、运营工具和案例。

产品岗 / 产品需求
└─ 准备: 用户需求、PRD、需求池、优先级、原型工具、验收、上线复盘、跨部门协作。

项目岗 / 项目协调
└─ 准备: 时间线、风险、资源协调、stakeholder 管理、会议纪要、推进机制、变更处理。

数据岗 / 数据分析
└─ 准备: 指标口径、SQL/Excel、数据清洗、分析框架、结论表达、业务建议。

技术岗 / 技术实现
└─ 准备: 技术栈、实现过程、排错、边界、代码/系统证据、不会的部分如何补。
```

If the JD is hybrid, name the mix instead of forcing one label:

```text
判断: 产品助理 + 产品执行 + 需求协作
不是: 纯策略型产品经理
准备重点: PRD / 需求优先级 / 验收 / Excel 或 SQL / Figma 或 Axure / 飞书或 Jira 协作
```

If the JD is too vague, output `不明确` and ask for one clarifying item such as complete responsibilities, reporting line, team type, or interview focus.

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

## Interview Answer Structure Prep

Use this when the user asks how to answer likely interview questions, when the JD includes problem-solving responsibilities, or when the user says they tend to answer too much, too scattered, or too mechanically.

Output:

```text
面试表达准备卡
├─ JD 契合卖点: 1-3 个
├─ 能力 + 简单验证: 3-4 条
├─ 自我介绍框架: 2 个能力点 + 与目标岗位的契合逻辑
├─ 可能被问的问题:
├─ 一句话观点:
├─ 3-4 条 bullet points: 展开逻辑，不是逐字稿
├─ Situation 要讲清的背景:
├─ 条件分支回答:
├─ 不能夸大的地方:
├─ 英文 / 第二语言表达提示:
└─ 5-20 分钟练习:
```

Rules:

- Prepare around JD-aligned selling points instead of memorizing long scripts.
- If no JD is available, use only the target role or job family as provisional anchors, mark them as assumptions, and ask for the JD before finalizing answer frames.
- Do not produce full verbatim scripts by default. Give first-level structure and second-level expansion logic so the user can remember and adapt in the interview.
- For self-introduction, choose only 2 strongest role-fit abilities, then attach one simple evidence point to each. Do not turn it into a full resume summary.
- Abstract the user's experience into 3-4 ability + evidence pairs before building answer frames.
- Keep answers concise: one clear claim, then 3-4 bullets, normally no more than 5 supporting sentences.
- In STAR answers, do not skip context. Clarify situation, stakes, constraints, and priority before action.
- For "what if A happens" questions, avoid one-size-fits-all answers. Use a conditional frame: if the cause is B, do C; if the cause is D, do E.
- For English or second-language interviews, prioritize clear, truthful, natural wording over native-like phrasing. Let the user keep their real personality and professional boundaries.
- Do not turn this into a long question bank. Give 1-3 high-impact answer frames.

## Confidence And English Tone Prep

Use this whenever JD prep touches resume angles, interview prep documents, self-introduction, English interview, LinkedIn wording, or a JD that asks for English communication.

```text
语气校准卡
├─ 可确定表达:
├─ 需要降级表达:
├─ 不能过度肯定的地方:
├─ 英文能力边界:
└─ 更自然的英文表达:
```

Rules:

- Do not write the user as a `perfect fit`, `guaranteed match`, `expert`, `native-level`, or `fluent` candidate unless the evidence is explicit.
- Avoid piling up absolute Chinese claims such as `完全匹配`, `一定能胜任`, `精通`, `显著提升`, or `主导全部`.
- Keep role-fit claims evidence-calibrated: `有经验`, `接触过`, `参与过`, `负责其中一部分`, `可解释`, `needs evidence`, or `[待确认]`.
- For English interviews, give speakable English frameworks and phrases. Do not translate Chinese interview answers line by line.
- Prefer natural English such as `I have worked with...`, `I can explain...`, `I used ... in a project context`, `I am comfortable discussing ... in English`, and avoid stiff textbook sentences.

## Candidate Reverse Questions

Use this when preparing what the user can ask at the end of an interview. Keep questions small, practical, and tied to the role.

Output:

```text
面试反问卡
├─ 优先问 2-3 个:
├─ 团队对这个岗位 3 个月的期望:
├─ 后续面试流程:
├─ 岗位未来成长路径:
├─ 这个岗位最关键的能力:
└─ 不建议问:
```

Recommended question directions:

```text
团队对这个岗位前 3 个月最希望看到什么结果？
后续面试流程大概是怎样的？
这个岗位未来可能的成长路径是什么？
您觉得这个岗位最关键的能力是什么？
```

Rules:

- Give 2-4 questions, not a long list.
- Choose 2-4 from the recommended directions; do not force all four directions into every answer.
- Do not make reverse questions too big, such as company strategy, market vision, organization politics, or abstract industry judgment, unless the role level and interview context justify it.
- Prefer questions that help the user understand expectations, process, growth, and capability priorities.
- If the interviewer is HR, prioritize process, team expectations, and role basics. If the interviewer is the hiring manager, prioritize 3-month expectations and key capability. If the interviewer is business/technical, prioritize capability and work context.
- Avoid questions that sound like testing the interviewer, challenging the company, or asking for confidential information.
- Salary, benefits, overtime, and offer details can be asked at the appropriate HR stage, but do not make them the default reverse questions.

## Output Shape

Default to only the sections needed for the requested deliverable. Use the full structure below only when the user asks for complete JD/company prep:

```text
JD / 公司准备卡
├─ JD 岗位类型判断:
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
├─ 面试表达准备卡:
├─ 语气校准卡:
├─ 英文面试表达卡:
├─ 面试反问卡:
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
v0.1.6 / 2026-08-04
- Added shared rule markers and focus-control output priority.
- Clarified reverse questions should choose 2-4 useful role-level questions from the four recommended directions, not force every direction each time.

v0.1.5 / 2026-08-04
- Added confidence and English tone prep so JD-based resume angles and interview materials avoid over-certain claims.
- Added natural, speakable English guidance for English interviews and English-required roles.

v0.1.4 / 2026-08-04
- Added practical candidate reverse-question cards focused on 3-month expectations, next interview process, role growth path, and the role's most critical capability.
- Clarified reverse questions should stay role-level and not become grandiose company-strategy questions.

v0.1.3 / 2026-08-04
- Added interview answer structure prep: JD-aligned selling points, concise bullet answers, stronger STAR situation setup, conditional problem-solving, and second-language interview expression.
- Added self-introduction framework guidance: use 2 role-fit abilities and simple evidence instead of a verbatim script or compressed resume.

v0.1.2 / 2026-08-04
- Added JD role-type classification so users know whether a JD is execution-heavy, operations-heavy, product-heavy, project-coordination-heavy, or hybrid before preparing skills and interview answers.

v0.1.1 / 2026-08-02
- Added interviewer-role prep cards so HR, hiring manager, business, technical, executive, founder, cross-functional, and peer interviewers get different answer emphasis.
- Clarified role mappings are preparation heuristics, not facts about the exact interviewer.

v0.1.0 / 2026-07-28
- Added project evidence gate for fit evaluation, project-case selection, interview answers, and resume angles.
- Pure JD/company requirement analysis can still proceed without project mining.
```
