---
name: interview-review-miner
description: >-
  Interview review and feedback-mining skill for CCC. Use when the user just finished an interview, remembers interview keywords or partial questions, received interviewer/recruiter feedback such as "experience in X is insufficient", wants to infer likely business or technical questions from keywords, update the hard-skill knowledge base, count repeated feedback signals, classify why an answer failed, create next-interview answer cards, adjust resume/JD positioning after interview feedback, evaluate interview/company signals, or decide what to improve before the next interview. For pure waiting, HR follow-up timing, or follow-up wording without interview content, use job-search-plan-review. Preserve uncertainty, do not invent exact interview questions, and do not promise interview outcomes.
---

# Interview Review Miner

## Overview

Turn messy interview memories into usable learning assets: likely question types, tested skills, interviewer feedback signals, resume/interview-direction changes, and small next actions.

This skill is not for emotional comfort or full interview coaching by default. It helps the user learn from one interview without over-interpreting every signal.

## Core Rule

Start from what the user actually remembers. Separate:

```text
confirmed: 用户明确记得的问题、关键词、反馈原话
inference: 根据关键词推测的可能题型
needs_confirmation: 需要 JD、岗位或用户补充才能判断的部分
action: 下一次可以准备或修改的内容
```

Do not claim the interviewer "must have meant" something. Interview feedback is a signal, not a final truth about the user.

Every feedback item must keep its source:

```text
source_type: interviewer_direct / recruiter_summary / rejection_email / user_self_review / unknown
source_role:
source_company_or_type:
source_jd_family:
interview_round:
feedback_date:
related_resume_version:
```

Do not let feedback from one JD automatically rewrite the neutral resume or contaminate another role family. Reuse facts; reset role-specific emphasis for each new JD.

Also judge source reliability before deciding the action level:

```text
feedback_reliability
├─ directness: direct / secondhand / inferred
├─ specificity: specific / broad / vague
├─ evidence_match: supported_by_user_evidence / conflicts_with_evidence / unknown
└─ action_level: record_only / prepare_answer / patch_material / reconsider_scope
```

Vague or secondhand feedback should usually stay at `record_only` or `prepare_answer` unless it repeats across comparable JDs.

## Intake

Accept fragmented input:

```text
面试关键词
不完整问题
面试官反馈
HR / recruiter 反馈
拒信或没有通过的原因
用户自己的回答感受
目标岗位 / JD / 公司信息
下一轮面试时间
```

If the user shares sensitive content, remind them to desensitize company names, interviewer names, emails, phone numbers, salary, offer, contracts, internal documents, and full interview transcripts.

Ask at most 3 missing facts:

```text
1. 这是哪个岗位/方向？
2. 你记得的关键词或反馈原话是什么？
3. 你当时大概怎么回答的？
```

## Interview Memory Reconstruction

When the user only remembers keywords, produce a cautious reconstruction:

```text
面试关键词复盘
├─ 关键词:
├─ 可能题型:
├─ 考察能力:
├─ 可能追问:
├─ 用户已有证据:
├─ 当前缺口:
└─ 下次准备动作:
```

Rules:

- Label reconstructed questions as `可能题型`, not exact questions.
- If online search is available and the user asks for likely answers, search current reliable sources or ask the user to provide JD/company context. Treat social media posts as anecdotal clues.
- Do not paste long external answers. Summarize answer patterns and adapt them to the user's evidence.
- If the question is technical/tool-based, route updates to `career-hard-skill-kb`.
- If the question depends on a project case and the project is vague, route to `career-project-experience-miner` before writing a polished answer.

## Interviewer Feedback Mining

Use this when the user receives feedback such as:

```text
xx 方面经验不足
业务理解不够
项目经验不够贴合
行业经验不足
技术深度不足
表达不够结构化
稳定性 / Gap / 转行风险
和岗位不够匹配
```

Convert feedback into a feedback signal card:

```text
面试官反馈卡
├─ 反馈原话:
├─ 来源类型: interviewer_direct / recruiter_summary / rejection_email / user_self_review / unknown
├─ 来源岗位 / JD:
├─ 反馈类型: hard_skill / domain / project_depth / business_understanding / seniority / communication / stability / role_fit
├─ 反馈可信度: high / medium / low / unknown
├─ repeated_count: first_signal / repeated_signal / pattern
├─ confirmed:
├─ inference:
├─ 可能影响:
├─ 可补证据:
├─ 简历需要调整:
├─ 面试回答需要调整:
├─ 方向/JD 选择需要调整:
└─ 下一步 1-3 个动作:
```

Examples of interpretation:

```text
"B 端经验不足"
├─ 不是结论: 你不能做 B 端
├─ 可能信号: 简历/回答没有证明 B 端用户、流程、业务场景或协作经验
└─ 后续动作: 补 B 端相关证据；若没有证据，调整投递方向或准备转译解释

"项目经验不够深"
├─ 可能信号: 项目事实、个人贡献、结果边界或关键决策没有讲清
└─ 后续动作: 回到 career-project-experience-miner 补项目事实卡
```

## Repeated Feedback Count

Do not overreact to one comment. Track repeated signals:

```text
first_signal
└─ 记录为线索，只做小修正或准备 1 个回答。

repeated_signal
└─ 第二次出现同类反馈，升级为重点补强项，检查简历证据和面试回答。

pattern
└─ 第三次或多次出现，重新评估目标 JD 范围、简历定位、项目证据和短期补强计划。
```

Record:

```text
feedback_theme:
count:
source_type:
source_roles:
source_jds:
latest_example:
feedback_reliability: high / medium / low / unknown
current_decision: record_only / prepare_answer / patch_material / reconsider_scope
```

Only treat repeated feedback as a pattern when it appears across comparable roles or JDs. If one feedback is from Product Manager and another from R&D, keep the source contexts separate.

## Feedback Reliability

Before changing materials or direction, decide how much weight the feedback deserves:

```text
high
└─ Direct, specific, tied to this JD, and consistent with the user's evidence or repeated comparable feedback.

medium
└─ Somewhat specific, but missing context or only from one source.

low
└─ Vague, secondhand, generic rejection wording, or inconsistent with the JD/interview content.

unknown
└─ Too little information; ask one small question or record without changing materials.
```

Action mapping:

```text
record_only
└─ Save the signal. Do not change resume or direction.

prepare_answer
└─ Prepare one answer card or one evidence example for the next interview.

patch_material
└─ Make a small, source-scoped resume/profile/JD patch only when evidence exists.

reconsider_scope
└─ Only after repeated comparable signals, check whether target JD scope, seniority, or role family should change.
```

## Answer Failure Classification

When the user says they answered badly, classify the failure before giving practice:

```text
没听懂题
理解了但没有结构
有结构但没有案例
有案例但没有岗位语言
项目事实不够清楚
技术/工具确实不会
紧张导致表达断裂
题目和 JD 不匹配
```

Output:

```text
回答卡点
├─ 题目/关键词:
├─ 卡点类型:
├─ 当时回答状态:
├─ 可用证据:
├─ 缺口:
└─ 下次改法:
```

## Resume And Interview Direction Updates

Feedback must become small, reviewable changes. Do not rewrite the whole resume unless the user asks.

Output:

```text
后续修改建议
├─ 简历:
│  ├─ 需要前移:
│  ├─ 需要弱化:
│  ├─ 需要补证据:
│  └─ 可替换表达:
├─ 面试:
│  ├─ 下次必须准备的问题:
│  ├─ 回答结构:
│  └─ 需要补的案例:
├─ JD / 方向:
│  ├─ 更适合继续投:
│  ├─ 需要谨慎投:
│  └─ 需要验证:
└─ 知识库更新:
```

Before changing resume wording, apply version isolation:

```text
面试反馈来源检查
├─ 来源类型: interviewer_direct / recruiter_summary / rejection_email / user_self_review / unknown
├─ 来源 JD / 岗位:
├─ 反馈主题:
├─ 反馈可信度: high / medium / low / unknown
├─ 重复状态: first_signal / repeated_signal / pattern
├─ 动作等级: record_only / prepare_answer / patch_material / reconsider_scope
├─ 这条反馈是否只适用于该岗位:
├─ 是否适用于中性主简历:
├─ 是否适用于其他方向:
└─ 不应继承到哪些简历版本:
```

Only `patch_material` can create resume wording changes. `record_only` and `prepare_answer` must not change resume text. `reconsider_scope` checks target scope or role family after repeated comparable signals; it still must not invent experience.

Routing:

```text
简历表达或 JD 简历补丁
└─ hand off to jd-resume-patch or career-materials-builder

硬技能、工具、题型、短期补强
└─ hand off to career-hard-skill-kb

项目深度、案例讲不清、个人贡献不清
└─ hand off to career-project-experience-miner

等待反馈、何时问 HR、下一周行动计划
└─ hand off to job-search-plan-review
```

## Knowledge Base Update

Update the user's interview knowledge base in compact form:

```text
interview_question_bank
├─ question_or_keywords:
├─ likely_question_type:
├─ tested_skill:
├─ my_answer_status: answered_well / partial / weak / not_answered / unknown
├─ evidence_to_use_next_time:
├─ gap:
├─ practice_action:
└─ source: interview_memory / interviewer_feedback / JD / online_reference
```

If feedback points to a missing skill, add it to the hard-skill KB with:

```text
技能名
岗位相关性
反馈来源类型
反馈可信度
当前证据
缺口
7-14 天可补动作
下次面试回答思路
```

## Next Interview Answer Cards

Create at most 1-3 answer cards after each review:

```text
下次面试回答卡
├─ 高频问题 / 可能题型:
├─ 考察能力:
├─ 我的可用案例:
├─ 回答结构:
├─ 不能夸大的地方:
├─ 还要补的证据:
└─ 练习动作:
```

Prefer one useful card over a large question bank.

## Interview Experience Evaluation

Review the company/interview, not only the user's performance:

```text
面试体验信号
├─ 问题是否和 JD 一致:
├─ 是否尊重候选人:
├─ 岗位职责是否清楚:
├─ 是否存在压价 / 模糊职责 / 过度要求:
├─ 值不值得继续投入:
└─ 是否需要同步推进其他机会:
```

Do not make a final decision for the user. Provide signals and a suggested next action.

## Response Shape

For keyword-only review:

```text
我先按“可能题型”还原，不把它当成原问题。

1. 你记得的关键词
2. 可能被考察的能力
3. 可能题型与回答思路
4. 知识库更新
5. 下次面试前 1-3 个动作
```

For interviewer feedback:

```text
我先把这条反馈当作信号，不直接当成对你的最终评价。

1. 反馈原话
2. 反馈来源和可信度
3. 反馈可能指向的缺口
4. 简历需要怎么调
5. 面试回答需要怎么调
6. 之后投 JD / 方向要注意什么
```

For repeated feedback:

```text
这条反馈已经第 N 次出现，我会把它从“单次信号”升级/不升级为模式。

1. 重复反馈主题
2. 来源岗位是否相似
3. 是否需要改简历
4. 是否需要改投递范围
5. 下次面试回答卡
```

## Boundaries

- Do not invent exact interview questions from vague keywords.
- Do not treat one interviewer's feedback as universal truth.
- Do not overfit the entire resume to one rejection or one interviewer comment.
- Do not merge feedback from different role families without labeling source roles.
- Do not tell the user to abandon a direction from one weak signal; suggest validation.
- Do not create long answer banks by default; prepare 1-3 highest-impact questions.
- Do not ask for full interview transcripts or internal company question banks.
- Do not handle pure waiting or HR follow-up wording here; route those to job-search-plan-review unless the user also provides interview content or feedback signals.
- Do not promise that changes will lead to interviews, offers, or pass results.

## Version Record

```text
v0.2.2 / 2026-07-29
- Added feedback source type, reliability, repeated state, and action level to the resume-change gate.
- Clarified that pure interview waiting and HR follow-up wording should route to job-search-plan-review.

v0.2.1 / 2026-07-29
- Added feedback reliability and action-level mapping before resume or direction changes.

v0.2.0 / 2026-07-29
- Added source-role tracking and version isolation for interview feedback.
- Added repeated feedback count: first_signal, repeated_signal, pattern.
- Added answer failure classification and next-interview answer cards.
- Added interview experience evaluation so users do not over-attribute every outcome to themselves.

v0.1.0 / 2026-07-29
- Added interview keyword reconstruction.
- Added interviewer feedback mining, including "X experience is insufficient" signals.
- Added resume, interview-answer, JD/direction, and hard-skill knowledge-base update flow after interview feedback.
```
