---
name: jd-resume-patch
description: >-
  JD-driven resume adaptation patch workflow. Use when the user has a job description, target role, company role page, recruiter message, interview invitation, or resume-review feedback and wants to adapt an existing resume without regenerating the whole resume every time. Use especially when feedback says the resume has too many modules, weak role fit, broad personal summary, unclear core strengths, or previous JD bias. Produce JD analysis, core-capability focus check, matching matrix, reusable resume-module guidance, and concise resume update patches for only the sections that should change. Do not fabricate experience or rewrite fixed resume fields by default.
---

# JD Resume Patch

## Overview

Adapt a stable master resume to a new JD by producing small, reviewable patches instead of a full new resume. Keep fixed information stable, change only the sections that improve role fit, and preserve truthfulness. Prioritize focused relevance over covering everything the user has done.

## Immediate Response

When the user explicitly asks to adapt, optimize, rewrite, or check a resume for a JD, respond immediately to the resume request. Do not force a broad career-intake step first.

- If the user already provided a JD and resume excerpt, produce the patch.
- If only one side is provided, ask for the missing side and offer what can be done now.
- If the user provides resume-review feedback, convert the feedback into patch rules before rewriting.
- Ask for desensitized content only.
- Keep the first response short, especially in chat or WeChat contexts.

Minimum request:

```text
可以，我按“JD 简历修改补丁”处理。请先脱敏后发：
1. JD 或目标岗位
2. 简历片段
3. 你希望偏向：面试率优先 / 真实匹配优先 / 平衡策略
```

## Core Model

Use this model:

```text
主简历档案
├─ 基本信息: fixed
├─ 教育背景: mostly_fixed
├─ 工作经历时间线: mostly_fixed
├─ 项目/经历模块库: reusable_blocks
├─ 核心技能库: reusable_skills
└─ 中性主档案: source_of_truth

上一份 JD 定制版本
└─ 只作为 reference_only，不作为新 JD 的默认来源

新 JD
↓
版本隔离检查
↓
JD 分析
↓
能力聚焦检查
↓
匹配矩阵
↓
简历修改补丁
↓
用户确认
↓
只输出需要替换的段落
```

## Fixed Versus Variable

Do not regenerate these by default:

```text
姓名
现居地
电话
邮箱
教育背景
基础时间线
公司/学校/日期
已确认的证书、奖项和项目事实
```

Only adapt these when relevant:

```text
求职状态表达
简历标题 / 目标岗位
核心技能顺序
工作经历 bullet 的顺序和措辞
项目经历的选取和排序
项目 bullet 的关键词
个人简介 / profile
作品集入口说明
平台投递文字
```

## Version Isolation

Prevent role bias from one tailored resume version leaking into the next one.

- Treat the neutral master resume as the source of truth.
- Treat any previous JD-specific resume as `reference_only`, not as the base for a new JD.
- If the user provides only a previously tailored resume, ask one question: `这份简历是中性主档案，还是上一份按某个 JD 改过的版本？`
- Keep facts, dates, companies, projects, education, and real tasks stable.
- Re-evaluate headline, profile, skills order, keywords, bullet order, and emphasis for each new JD.
- When switching role families, such as project management to R&D, run a bias reset before writing.

Bias reset output:

```text
版本隔离检查
├─ 本次 JD 偏向:
├─ 上一版可能带入的偏向:
├─ 继续继承的事实:
├─ 本次需要重置的表达:
└─ 不建议沿用:
```

## Workflow

1. **Confirm inputs.** Prefer the JD plus a master resume summary or reusable experience blocks. If the user only provides a JD, analyze it first and ask for the minimum resume context.
2. **Desensitize.** Remind the user not to paste phone, email, ID, salary screenshots, offer, contracts, recruiter names, or internal company details.
3. **Identify resume source.** Decide whether the input is a neutral master resume, a module library, or a previous JD-specific version. If unclear, ask before adapting.
4. **Run version isolation.** Name the current JD bias and reset any previous role emphasis that should not carry over.
5. **Analyze JD.** Extract core tasks, hard skills, tools/software, domain requirements, hidden expectations, seniority signals, and keywords.
6. **Run capability focus check.** Identify the JD's 2-3 core capabilities, then select the user's 2-3 strongest matching abilities. Do not try to prove every possible ability.
7. **Build matching matrix.** Compare JD requirements with confirmed resume evidence. Mark each item as `strong_match`, `partial_match`, `gap`, `do_not_claim`, or `needs_evidence`.
8. **Select resume modules.** Decide which existing blocks should be kept, moved forward, rewritten lightly, weakened, removed, or held for another role.
9. **Create patch.** Output only the proposed changes, not the whole resume.
10. **Ask for confirmation.** Generate replacement bullets or sections only after the user agrees, unless the user explicitly asks for direct text.
11. **Synthesize full resume only on request.** Do this only when the user says to merge the confirmed patches into a complete version.

## Output Shape

Default output:

```text
版本隔离检查
├─ 本次 JD 偏向:
├─ 上一版可能带入的偏向:
├─ 继续继承的事实:
└─ 本次重置的表达:

JD 分析卡
├─ 岗位核心任务:
├─ 硬技能:
├─ 工具/软件:
├─ 隐性要求:
└─ 高频关键词:

能力聚焦检查
├─ JD 最核心的 2-3 个能力:
├─ 用户最匹配的 2-3 个能力:
├─ 不建议展开的经历/模块:
├─ 岗位贴合度判断:
└─ 个人总结应聚焦:

匹配矩阵
├─ 已有强匹配:
├─ 可强化匹配:
├─ 缺口:
├─ 不建议硬写:
└─ 需要补证据:

简历修改补丁
├─ 保留:
├─ 前移:
├─ 强化:
├─ 弱化/删除:
├─ 本次只建议改的 3 个地方:
└─ 需要用户确认:
```

If the user asks for text that can be pasted into the resume, output only changed sections:

```text
可直接替换文本
├─ 核心技能:
├─ 工作经历 bullet:
├─ 项目经历 bullet:
└─ 求职状态 / profile:
```

## Resume Module Library

When the user has no module library yet, help create a small one from existing resume or messy notes:

```text
经历模块
├─ 模块名称:
├─ 适合岗位:
├─ 相关技能:
├─ 证据强度: strong / medium / needs_evidence
├─ 可用表达:
└─ 不应夸大的边界:
```

Keep the module library compact. Do not turn it into a huge portfolio or a full career archive.

## Capability Focus Rules

Use resume-review feedback as constraints. Common feedback and the required response:

```text
涉及模块太多
→ 减少模块数量，只保留最能证明 JD 核心能力的经历。

工作年限较短但经历很多
→ 不把“做得多”当作优势。优先证明清晰定位、稳定贡献和可解释的成长线。

整体经验与目标岗位不贴合
→ 明确提示贴合度不足，不强行包装。必要时指出更可能通过的相邻方向，例如媒介类、运营类、项目执行类或其他更贴近的岗位族群。

个人总结泛、字数多
→ 压缩到 2-4 行，围绕 JD 相关能力写，不写空泛形容词和大而全标签。

用人部门阅读时间短
→ 默认按 1-2 分钟扫读优化，把最重要的匹配点放在标题、profile、核心技能和第一段经历前半部分。
```

Before writing any profile or bullets:

1. Name the JD's core capability requirements.
2. Pick the user's strongest 2-3 matching abilities.
3. Use those abilities to decide which experiences and projects deserve space.
4. Cut, weaken, or move down anything that is impressive but not relevant to this JD.

If the target role is specific, such as IMC, do not assume adjacent media or operations experience is enough. Decide whether the resume evidence supports IMC directly. If not, say that media or operations roles may be a higher-probability path unless the user can add stronger IMC evidence.

## Patch Rules

- Keep facts unchanged. Change order, emphasis, and wording, not reality.
- Start each new JD patch from the neutral master resume or confirmed reusable modules, not from the last tailored version.
- Do not carry over previous role emphasis such as project-management wording into an R&D JD unless the new JD also asks for it.
- Do not include many modules just because the user has done many things; more coverage can weaken focus, especially for short work histories.
- Prefer a focused 2-3 capability story over a broad list of skills, tasks, and projects.
- Prefer deleting irrelevant detail over adding unsupported claims.
- Use JD language only when it matches real experience.
- Use accurate contribution words such as `参与`, `协助`, `负责其中一部分`, `独立完成`, or `主导` only when supported.
- If metrics are uncertain, use `约`, `范围`, `频次`, `规模`, or mark `待确认`.
- If the user wants interview-rate-first wording, strengthen relevance without fabricating facts.
- If the user wants truthful-fit-first wording, preserve constraints and real ability boundaries.
- If the user's preference is unclear, default to `平衡策略`.

## Personal Summary Rules

The profile / personal summary must pass these checks:

- It should be short enough for a 1-2 minute resume scan.
- It should name the target role or role family only when the evidence supports it.
- It should focus on the user's 2-3 JD-relevant strengths, not all experience.
- It should not use broad claims such as `综合能力强`, `学习能力强`, `沟通能力强`, `结果导向`, or `有丰富经验` unless immediately supported by concrete evidence.
- It should not repeat every module in the resume.
- If role fit is weak, write a restrained summary that emphasizes adjacent evidence rather than pretending direct fit.

## Boundaries

- Do not rewrite the whole resume by default.
- Do not repeat fixed fields unless they need correction.
- Do not invent companies, titles, projects, clients, awards, certificates, metrics, tools, or outcomes.
- Do not turn familiarity into proficiency or participation into ownership.
- Do not create a resume version the user cannot defend in an interview.
- Do not promise interviews or offers.

## Version Record

```text
v0.2.0 / 2026-07-01
- Added capability focus check before matching matrix.
- Added rules for short work histories where too many modules can dilute role fit.
- Added personal summary focus rules based on JD core capabilities.
- Added weak-fit handling for cases where adjacent media/operations experience does not fully support roles such as IMC.
```
