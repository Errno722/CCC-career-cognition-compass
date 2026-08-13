---
name: interview-review-miner
description: >-
  Interview review and feedback-mining skill for CCC. Use when the user just finished an interview, remembers keywords or partial questions, received interviewer/recruiter feedback such as "experience in X is insufficient", wants to infer likely business or technical questions from keywords, update the hard-skill knowledge base, build/update a candidate interview profile for later rounds, count repeated feedback signals, classify why an answer failed, create next-interview answer cards, improve interview answer structure, mine judgment depth or methodology from interview answers, adjust resume/JD positioning after feedback, evaluate interview/company signals, or decide what to improve before the next interview. Always close reviews by helping the user stop over-focusing on the past interview and shift to the next opportunity or a small gap-closing action. For pure waiting, HR follow-up timing, or wording without interview content, use job-search-plan-review. Preserve uncertainty, do not invent exact questions, and do not promise outcomes.
---

# Interview Review Miner

## Overview

Turn messy interview memories into usable learning assets: likely question types, tested skills, interviewer feedback signals, resume/interview-direction changes, and small next actions.

This skill is not for emotional comfort or full interview coaching by default. It helps the user learn from one interview without over-interpreting every signal.

Core boundary:

```text
做了什么 ≠ 为什么这样判断
模型 / 数据 / 老板结论 ≠ 用户本人判断
一次面试追问 ≠ 用户没有能力
```

## Shared Rule Versions

- SHARED_RULE focus-control v1.1
- SHARED_RULE certainty-calibration v1
- SHARED_RULE profile-persistence v1.1

Use `core/focus-control.md` to keep the current review narrow, `core/certainty-calibration.md` to avoid turning feedback into fixed identity, and `core/profile-persistence.md` for profile scope and storage claims.

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

After each interview review, update a compact user-facing `候选人面试资料卡补丁`. Raw keys such as `candidate_interview_profile_patch` and persistence fields are for templates, configuration, or knowledge-base variables only. The card must separate stable cross-role evidence from role-family-specific concerns, keep source/reliability, and avoid turning one interviewer's comment into the user's fixed identity. In ordinary prompts, WorkBuddy, ChatGPT, Claude, or Codex conversations, explain in natural language that the card only exists in this reply unless the runtime actually writes to a file, database, knowledge base, or long-term memory.

After each interview review, also close with a compact `forward_focus_reminder`. The reminder should be practical, not sentimental: acknowledge that the review is enough for now, warn the user not to stay too long inside what already happened, and point attention to the next possible opportunity or one gap-closing action.

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

If the user just interviewed and has only 30-60 minutes, prioritize saving fresh signal before packaging:

```text
有限时间面试复盘
├─ 面试关键词:
├─ 被追问 / 卡住:
├─ 当时怎么回答:
├─ 面试官反馈:
├─ 需要补的证据:
└─ 今天到这里停:
```

Do not immediately generate a full answer bank, complete standard answers, or a broad interview-prep plan. The first value is preserving what the user may forget.

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
- If the question tests business judgment, ownership, seniority, strategy, product sense, data interpretation, or "why did you choose this", check whether the relevant project has a usable Judgment Trace. If not, ask one judgment-recovery question or route to `career-project-experience-miner` before producing a polished answer.

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

## Candidate Interview Profile

Create or update this asset after interview feedback, repeated feedback, or next-round preparation. It has two layers:

```text
candidate_interview_profile_base
├─ profile_id:
├─ profile_version:
├─ stable_background:
├─ cross_role_strengths:
├─ reusable_evidence:
├─ general_expression_risks:
├─ persistence_mode:
└─ last_updated:
```

```text
candidate_interview_profile_by_role_family
├─ profile_id:
├─ profile_version:
├─ role_family:
├─ role_specific_strengths:
├─ role_specific_concerns:
├─ recent_feedback:
├─ next_round_focus:
├─ reusable_evidence:
├─ missing_evidence:
├─ excluded_feedback:
├─ persistence_mode:
└─ last_updated:
```

Each profile item keeps source:

```text
item_id:
content:
source_type:
source_role:
source_jd_family:
interview_round:
reliability:
evidence:
applies_to_role_families:
status: open / mitigated / resolved / role_specific / retired
first_seen:
last_seen:
```

Default output after one review is a patch, not the full profile:

```text
候选人面试资料卡补丁
├─ profile_id:
├─ previous_version:
├─ new_version:
├─ role_family:
├─ fields_added:
├─ fields_updated:
├─ fields_resolved:
├─ fields_retired:
├─ unchanged:
├─ source:
├─ confidence:
└─ persistence_mode:
```

Rules:

- It is a working memory asset, not a long report or fixed identity.
- Trace each concern to feedback, JD signals, or self-review; label source and reliability.
- Carry forward reusable evidence and repeated comparable patterns, not wording bias from one JD or one interview.
- Keep role-specific feedback inside that role family. Do not inherit technical-depth feedback into a business round, or product/operations feedback into a technical round, unless evidence shows it is cross-role.
- For second/third interviews, compare the new round with this card and output: `本轮继承 / 本轮不继承 / 需要重置的侧重点 / 面试前最小补强动作`.
- If the current platform cannot write persistent state, record output_only internally and tell the user in natural language: `这张卡目前只存在于本轮回复中；下次使用时请把上一版资料卡重新发给我`. Do not show raw persistence keys in ordinary replies, and do not say `已保存`, `我会记住`, or `下次自动继承`.
- Full profile output is only needed for first creation, user request, entering second/third/new round, merging multiple updates, or scope migration.
- If missing, create a first draft from known facts and mark unknowns. Do not ask for a long form.

## Forward Focus Reminder

Use this after every interview feedback review, repeated feedback review, or answer-failure review:

```text
复盘收束提醒 / forward_focus_reminder
├─ 已经足够复盘的部分:
├─ 不建议继续反复纠结:
├─ 下一次机会要带走:
├─ 需要查缺补漏:
└─ 今天 5-20 分钟动作:
```

Rules:

- Do not scold the user for thinking about the interview; simply mark the review boundary.
- Do not say "move on" in a dismissive way. Say that the interview is now a data point, not a verdict.
- If the user has a next interview, point the action toward that round.
- If the user has no next interview, point the action toward one reusable asset, such as a project fact card, one answer card, one hard-skill drill, or one better-targeted JD search.
- Keep the reminder short. It should help the user exit the loop, not become another long reflection task.

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

## Five-Level Interview Deepening

Use this when the interviewer deep-dives, the user says their answer felt empty, or the target role requires business judgment, ownership, strategy, product sense, data interpretation, or seniority.

Do not force every answer through all five levels. Move one level deeper only when the prior level has enough facts.

```text
Level 1 — Execution
你做了什么？

Level 2 — Reasoning
为什么这么做？

Level 3 — Judgment
你本人认为应该怎么做？

Level 4 — Trade-off
为什么不是另一个方案？
什么情况下你会改变判断？

Level 5 — Methodology
类似问题以后，你有没有形成一套可以复用的判断方式？
```

If the user reaches Level 5, ask one boundary question when useful:

```text
这个方法什么时候不适用？
```

If the user only repeats a model result, data result, AI analysis, or manager instruction, do not package it as independent judgment. Ask:

```text
这个结果出来以后，你本人当时认为应该怎么做？为什么？
```

## Interview Expression Structure

Use this when feedback or self-review suggests the user answered with too many details, lacked a clear point, used STAR mechanically, became nervous and filled space, or needs to answer in English / a second language without sounding memorized.

Before choosing an answer frame, identify the question type: self-introduction, motivation, project/behavior, judgment/decision, problem-solving/case, open opinion, skill/professional knowledge, trade-off, failure/conflict/review, or another type. STAR is only one option for project/behavior answers.

Output:

```text
面试表达结构卡
├─ 这个问题在考察什么:
├─ 建议结构: 先回答 / 2-3 个支撑点 / 证据或例子 / 收回问题
├─ JD 契合卖点: 1-3 个，与岗位核心能力对应
├─ 能力 + 简单验证: 3-4 条，每条只放一个事实证据
├─ 一句话观点: 先总后分
├─ 证据 bullet points: 2-3 条，最多 5 句，不写成逐字稿
├─ Situation 放大: 背景 / 目标 / 限制 / 轻重缓急
├─ Action 精简: 只讲关键判断和动作，不讲流水账
├─ 判断追问: 你的判断 / 为什么 / 关键证据 / 不确定性 / 替代方案 / 取舍 / 改变判断条件 / 后验结果
├─ 方法沉淀: 适用场景 / 不适用场景 / 证据项目（如真实存在）
├─ 条件分支: 如果 A 因为 B，用 C；如果 A 因为 D，用 E
├─ Result / Learning: 结果、边界或学到的判断
├─ 可以留给追问:
├─ 自我介绍框架: 2 个能力点 + 与目标岗位的契合逻辑
├─ 第二语言表达: 用自己的关键词和短句，不追求母语者腔调
└─ 练习动作: 5-20 分钟
```

Rules:

- Start from JD-aligned selling points. Do not let the user answer every question with all details they remember.
- If no JD is available, do not invent exact JD selling points. Use the target role or job family as provisional anchors, label them as provisional, and ask the user to add the JD when they have it.
- Do not output full verbatim scripts for self-introduction or interview answers by default. Give a one/two-level framework and expansion logic that the user can remember.
- If the user gives a scattered answer, first extract the main thread and reorder known facts. Do not invent missing ownership, scale, data, business result, or project outcome to make the answer smoother.
- Use `可以留给追问` to reduce first-answer overload. The first answer should answer the question clearly; secondary details can wait.
- For self-introduction, focus on 2 abilities that match the target role. Do not over-expand education, timeline, tools, or all past experiences unless the user asks.
- Abstract the user's experience into 3-4 ability claims with simple verification: one concrete task, project, tool, audience, result boundary, or repeated behavior per ability.
- Use "claim first, evidence second": one clear conclusion, then 2-3 supporting bullets. Keep the supporting part under 5 sentences unless the user asks for a long answer.
- Do not invent judgment or methodology to make the interview answer sound senior. If the user only has execution evidence, keep the answer at execution/result-interpretation level and ask for the missing judgment.
- STAR is not a template to recite. Make `Situation` useful by clarifying context, goal, constraint, urgency, or trade-off before `Action`.
- For judgment or "why did you do this" questions, do not accept action as judgment. If the draft only has execution, say: `这里现在只有执行过程，还缺你本人当时的判断。`
- For problem-solving questions, use conditional thinking instead of one fixed answer: diagnose possible causes, then map each cause to a different action.
- Do not overcorrect into fake confidence. If the user lacks evidence, say what can be framed conservatively and what should be marked as a gap.
- For English or second-language interviews, help the user internalize meaning first, then express it in simple natural wording. Do not require native-like expression or a memorized script.
- If the English answer sounds like a direct translation, too formal, or too certain, output a compact English expression card with `Plain English version`, `Natural phrases`, `Avoid stiff literal translation`, `English ability boundary`, and one 5-20 minute speaking practice.
- Apply certainty calibration to any resume patch, interview answer frame, self-introduction, or English interview note. Do not turn one feedback signal or one project into claims such as `完全匹配`, `一定能胜任`, `精通`, `native-level`, `fluent`, `guaranteed`, or `perfect fit` unless the user has evidence.
- If the user is nervous, reduce the answer to a short anchor structure: `观点 -> 3 bullets -> 1 closing sentence`.

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
├─ 候选人面试资料卡补丁:
├─ 语气校准:
├─ 英文面试表达调整:
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

## Interviewer Role Answer Focus

When the user asks how to answer in the next interview, or when the user mentions the interviewer type, adjust the answer focus by interviewer role. Do not give one generic answer for every interviewer.

First identify the role if possible:

```text
HR / Recruiter
用人经理 / 直属 leader
业务负责人 / 业务面试官
技术面试官 / 工具面试官
高管 / Executive
Founder
跨部门协作方
同级成员
unknown
```

If the role is unknown, ask one small question or provide a role-neutral answer plus a short role-focus table.

Use these common focus heuristics. They are not facts about a specific interviewer. If the invitation, interviewer title, previous-round feedback, JD, or company stage gives stronger signals, prioritize those signals.

```text
HR / Recruiter
├─ 关心: 动机、稳定性、沟通风险、薪资/入职时间、基础匹配
├─ 强调: 当前状态、求职动机、岗位兴趣、真实边界、可入职节奏
└─ 少说: 过深技术细节、未经证实的项目结果

用人经理 / 直属 leader
├─ 关心: 能否上手、过去证据、协作方式、风险点
├─ 强调: 相关项目、个人贡献、关键判断、复盘能力、入职后 30 天能做什么
└─ 少说: 泛泛热情、过多求职背景故事

业务负责人 / 业务面试官
├─ 关心: 业务理解、用户/客户场景、指标、商业判断、优先级
├─ 强调: 你如何理解问题、取舍逻辑、业务指标、用户或客户证据
└─ 少说: 纯工具清单、脱离业务的技能堆叠

技术面试官 / 工具面试官
├─ 关心: 方法、工具熟练度、实现过程、边界、排错能力
├─ 强调: 使用过的工具、技术过程、限制条件、如何验证、不会的部分如何补
└─ 少说: 把了解说成熟练、把参与说成主导

高管 / Executive
├─ 关心: 判断力、业务敏感度、跨团队影响、长期潜力、是否能理解公司阶段
├─ 强调: 关键选择、业务判断、学习速度、对团队目标的理解
└─ 少说: 细碎执行流水账

Founder
├─ 关心: 判断力、长期动机、抗压、业务敏感度、是否能承担不确定性
├─ 强调: 为什么选这个方向、为什么是这家公司、你能带来的确定性
└─ 少说: 细碎执行流水账

跨部门协作方
├─ 关心: 沟通成本、推进方式、冲突处理、是否能对齐目标
├─ 强调: 对齐机制、信息同步、需求变更处理、协作案例
└─ 少说: 只强调个人成果而忽略协作边界

同级成员
├─ 关心: 是否好合作、工作方式、交付习惯、压力下沟通
├─ 强调: 日常协作方式、反馈习惯、如何处理卡点
└─ 少说: 过度上位叙事
```

Output:

```text
面试官角色回答卡
├─ 面试官角色:
├─ 这个角色最可能关心:
├─ 回答时要前置:
├─ 可以使用的证据:
├─ 需要少说或后置:
├─ 风险点:
└─ 30-60 秒回答结构:
```

Rules:

- Keep role-specific emphasis separate from facts. The same project can be explained differently, but the facts cannot change.
- If a question may be asked by multiple roles, provide 2-3 role variants instead of one long script.
- If the user lacks evidence for a role's concern, mark it as a gap and give a conservative explanation or practice action.
- Do not claim an interviewer will definitely care about a topic based only on role title.

## Knowledge Base Update

Update the user's interview knowledge base and candidate interview profile in compact form:

```text
interview_question_bank
├─ question_or_keywords:
├─ likely_question_type:
├─ interviewer_role:
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

If the feedback changes what the user should remember before the next round, output `候选人面试资料卡补丁`: new facts, new feedback, repeated-signal changes, next priority, and materials/directions it should not affect.

If the platform has no explicit storage, output only a user-facing `候选人面试资料卡补丁`; keep raw keys and persistence fields internal unless the user asks for a template or configuration. Tell the user they can paste the previous card into the next session to continue versioning.

## Next Interview Answer Cards

Create at most 1-3 answer cards after each review:

```text
下次面试回答卡
├─ 高频问题 / 可能题型:
├─ 面试官角色:
├─ 考察能力:
├─ JD 契合卖点:
├─ 我的可用案例:
├─ 回答结构:
├─ 条件分支:
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
5. 如果知道面试官角色，给角色化回答侧重点
6. 下次面试前 1-3 个动作
```

For interviewer feedback:

```text
我先把这条反馈当作信号，不直接当成对你的最终评价。

1. 反馈原话
2. 反馈来源和可信度
3. 反馈可能指向的缺口
4. 简历需要怎么调
5. 面试回答需要怎么调
6. 面试表达结构卡：JD 卖点、先总后分、2-3 个支撑点、Situation 和条件分支
7. 不同面试官角色下应该怎么调整侧重点
8. 候选人面试资料卡补丁
9. 之后投 JD / 方向要注意什么
10. 复盘收束提醒：不要停留在已发生的事太久，把注意力转向下一个机会或今天一个查缺补漏动作
```

For repeated feedback:

```text
这条反馈已经第 N 次出现，我会把它从“单次信号”升级/不升级为模式。

1. 重复反馈主题
2. 来源岗位是否相似
3. 是否需要改简历
4. 是否需要改投递范围
5. 候选人面试资料卡补丁
6. 下次面试回答卡，包括面试官角色侧重点
7. 面试表达结构卡：把高频卡点改成可练习的短回答结构
8. 语气校准 / 英文表达调整：避免过度肯定和生硬直译
9. 复盘收束提醒：这几次反馈是数据点，不是最终判决；下一步只做一个最小补强动作
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
v0.2.11 / 2026-08-13
- Strengthened structured interview expression: classify question type before choosing answer structure.
- Added rambling-answer reordering, speakable short samples, and `可以留给追问` boundaries without inventing facts.

v0.2.10 / 2026-08-13
- Added limited-time post-interview review guidance: save fresh interview signals first, then package later.

v0.2.9 / 2026-08-08
- Added five-level interview deepening: execution, reasoning, judgment, trade-off, methodology.
- Added Judgment Trace checks for project answers that test ownership, business judgment, strategy, or data interpretation.
- Clarified that model/data/manager outputs cannot be packaged as the user's independent judgment without user reasoning.

v0.2.8 / 2026-08-04
- Split `candidate_interview_profile` into base and role-family layers.
- Default ordinary prompt/runtime profile updates to user-facing `候选人面试资料卡补丁`; keep raw persistence fields internal unless the user asks for templates or configuration.
- Added source item fields, role-specific inheritance rules, and resolved/retired feedback statuses.

v0.2.7 / 2026-08-04
- Added certainty tone calibration for post-interview resume patches, answer frames, self-introductions, and English interview notes.
- Added natural English expression cards for English-required roles and second-language interview feedback.

v0.2.6 / 2026-08-04
- Added interview expression structure cards: JD-aligned selling points, concise bullet-point answers, stronger Situation setup in STAR, conditional problem-solving, and second-language expression practice.
- Clarified that self-introductions and interview answers should default to memorable one/two-level frameworks, not verbatim scripts.

v0.2.5 / 2026-08-04
- Added `forward_focus_reminder` after every interview review so users do not stay too long inside the past interview and can shift to the next opportunity or one gap-closing action.

v0.2.4 / 2026-08-04
- Added `candidate_interview_profile` as a reusable background card for second/third interviews and later interview prep.
- Clarified that interview feedback updates stable background, recurring concerns, next-round priorities, and non-inherited biases separately.

v0.2.3 / 2026-08-02
- Added interviewer-role answer focus cards for HR, hiring manager, business, technical, executive, founder, cross-functional, and peer interviewers.
- Added role-specific emphasis to interview answer cards without changing the underlying facts.
- Clarified role mappings are preparation heuristics, not facts about the exact interviewer.

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
