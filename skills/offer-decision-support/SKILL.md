---
name: offer-decision-support
description: >-
  Offer decision support for CCC. Use when the user has received one or more offers, asks whether an offer is worth accepting, compares offers, compares a new offer with staying in the current job or continuing the search, has an offer deadline, wants to distinguish formal offers from pending opportunities, identify offer red flags, clarify missing offer information, compare employment types such as direct hire, outsourced, contractor, agency, or fixed-term roles, prepare questions for HR or a future manager, decide whether to negotiate salary or conditions, draft concise negotiation wording, accept or reject an offer, or convert the decision result into future job-search screening preferences. Reuse existing career profile, JD, interview profile, and project evidence; do not rerun full career positioning by default. Do not provide legal conclusions, tax calculations, salary market predictions, or final life decisions.
---

# Offer Decision Support

## Overview

Help the user make a grounded offer decision without turning it into a mechanical scorecard. Start from the offer facts, offer status, employment type, hard constraints, major risks, user priorities, trade-offs, and reversible/irreversible costs. Reuse existing CCC context when available.

This skill is for decision support, not for promising outcomes, legal advice, tax calculation, or telling the user what they must choose.

Do not rerun full career positioning by default. Reuse existing `职业画像卡`, JD notes, interview profile, project evidence, resume direction, and current job-search preferences if the user brings them back.

## Shared Rule Versions

- SHARED_RULE focus-control v1.1
- SHARED_RULE certainty-calibration v1
- SHARED_RULE profile-persistence v1.1

Use `core/focus-control.md` to keep the current offer thread narrow, `core/certainty-calibration.md` to avoid over-certainty, and `core/profile-persistence.md` when writing current-cycle preference updates.

## Core Rule

Do not start with a total score. First separate:

```text
已确认
还不确定
Offer 状态
雇佣关系
硬性限制 / 重大风险 / 可权衡项
真正的冲突
用户当前优先级
接受 / 拒绝 / 继续求职的机会成本
```

If key information may change the choice, ask only the most important 1-3 missing items before comparing. Do not force the user into a long offer form.

## Offer Status And Employment Type

Distinguish opportunity certainty before comparing:

```text
interview_in_progress
verbal_interest
verbal_offer
written_conditional
written_final
accepted
declined
withdrawn
expired
```

A pending opportunity can be an opportunity-cost signal, but it is not as certain as a written offer. Do not present "HR said they are interested" or "another process is still moving" as a confirmed competing offer.

Track employment type separately from company size:

```text
direct hire
outsourced
contractor
agency
fixed-term
other
```

When the user compares "大厂外包" with "小公司正式岗", do not collapse the decision into "big company vs small company". Check the actual employer, benefits, contract duration, conversion possibility, project-end arrangement, stability, reporting line, and how the employer/client should be represented on a resume.

## Supported Modes

Use the mode that matches the user's real decision:

```text
Mode A: 多 Offer
Offer A vs Offer B vs Offer C

Mode B: 单 Offer
接受 Offer vs 继续求职

Mode C: 在职跳槽
新 Offer vs 当前工作 vs 继续寻找其他机会
```

Treat "not choosing yet", "continue interviewing", and "wait until deadline after asking clarifying questions" as valid options.

If the user only asks "这家公司怎么样" or wants company/JD research without a real offer decision, use `jd-company-prep` instead.

## Offer Information Check

Before comparing, check whether the known facts are sufficient:

```text
状态与雇佣关系: offer_status, employment_type, actual employer, client, contract term
现金与总包: base, guaranteed cash, bonus, sign-on, equity, subsidies
福利: social insurance / benefits, leave, remote/hybrid, medical, training
试用期: length, salary, evaluation, termination risk
通勤与生活成本: one-way minutes, weekly hours, cost, relocation, late-night return
工作时间: normal hours, overtime, weekend, on-call, travel, flexibility
岗位内容: daily work, execution/strategy mix, ownership, core business access
Career Capital: future project evidence, tools, business exposure, transferable skills
平台 / 公司: brand signal, industry position, resources, stability, core business
直属经理: reporting line, expectations, management style, ownership, respect
团队: size, turnover, role split, collaboration, hiring reason
成长与晋升: skill growth, project complexity, promotion path, transfer space
稳定性: business state, department stability, new role risk, layoff/reorg signal
工作体验信号: hiring process consistency, respect, clarity, changing conditions
生活影响: sleep, exercise, family, city, personal rhythm
可逆性: exit cost after 6 months, explainability, relocation, non-compete
机会成本: interviews given up, current job stability, transition time, geography
Option Value: future role families, stronger evidence, new industry, management path
```

For compensation, always separate:

```text
guaranteed
conditional
uncertain
```

Do not count conditional bonus, verbal promises, or uncertain equity as guaranteed income.

Optional derived facts can help the user see cost, but do not turn them into a score:

```text
guaranteed annual cash = confirmed monthly fixed cash * confirmed months
commute hours/week = one-way commute minutes * 2 * workdays / 60
commute hours/month = commute hours/week * 4
fixed relocation cost difference = confirmed one-time relocation cost delta
```

Only do deterministic arithmetic from user-provided facts. Do not predict tax, market salary, probabilities, or bonus payout unless the user provides written conditions.

## Offer Fact Assets

Internally structure offer facts as:

```text
offer_fact_card
├─ offer_id
├─ offer_version
├─ offer_status
├─ employment_type
├─ guaranteed_compensation
├─ variable_compensation
├─ benefits
├─ commute
├─ working_hours
├─ role_scope
├─ manager
├─ team
├─ deadline
├─ contingencies
├─ confirmed
├─ unknown
├─ source
└─ last_updated
```

When offer conditions change, produce an internal patch:

```text
offer_terms_patch
├─ previous_version
├─ new_version
├─ changed_terms
├─ newly_confirmed
├─ unresolved
└─ decision_impact
```

User-facing output should use natural language, such as "这次 HR 更新了 3 个条件：base、远程政策和 deadline；其中年终奖仍未写清楚。" Do not expose internal keys unless the user explicitly asks for a machine-readable template.

## Risk Triage First

Check risks before weighted comparison, but separate them:

```text
hard constraint
├─ the user explicitly cannot accept this condition

major risk
├─ must confirm or proceed cautiously

trade-off
└─ can be weighed against other gains
```

Examples:

```text
岗位实际职责与 JD 明显不一致
薪资结构极不透明
不合理合同条款
用户无法接受的工作时长
严重影响健康 / 基本生活的通勤
高风险业务或明显不稳定团队
关键条件只有口头承诺
试用期 / 奖金 / 调岗 / 竞业存在重大不确定
Offer 条件反复变化
```

If legal, labor, tax, non-compete, visa, contract, or medical risk is material, identify the clause or question to confirm, then tell the user to consult a local professional. Do not make a legal conclusion.

## User Priority Lenses

Do not use one default weighting system. Infer or ask for the user's current priority:

```text
稳妥优先
├─ fixed income, stability, benefits, working hours, commute, cash flow

成长优先
├─ role scope, manager, Career Capital, project quality, skill growth, Option Value

生活优先
└─ commute, remote/hybrid, hours, leave, city, life rhythm
```

If the user says cash pressure is high, raise cash flow, guaranteed income, stability, and start date. If the user is using the offer for transition, raise Career Capital, actual role scope, transferable evidence, and manager quality.

## Decision-Flipping Unknowns

Name the missing information that could change the answer. Examples:

```text
A 的真实加班强度
B 的奖金兑现方式
直属经理是否给 ownership
试用期工资是否打折
Offer deadline 是否可延长
竞业或调岗条款
```

If the decision-flipping unknowns are unresolved, the correct recommendation can be:

```text
现在信息不足，不应该立即选择。先补问这些问题，再决定。
```

## Negotiation Flow

Support this loop:

```text
收到 Offer
→ 判断是否值得谈
→ 谈薪 / 谈条件
→ 条件更新
→ 再比较
→ 接受 / 拒绝 / 继续求职
```

Before drafting negotiation wording, check:

```text
用户是否真的更喜欢该 offer
是否有其他正式 offer、口头 offer 或正在进行机会
差距是现金、title、remote、年假、入职时间还是职责
哪些条件最可能改变决定
deadline 是否足够
```

Negotiable items can include base salary, sign-on bonus, bonus structure, remote days, leave, title, start date, and written scope. Do not invent competing offers or market data.

## Clarification Questions

For ordinary offer decisions, ask at most 3 questions, prioritized by decision impact.

Only when the user explicitly asks for an HR / manager question list, give 3-5 questions. Keep questions small and practical.

HR questions:

```text
固定薪资和奖金分别如何计算？
试用期薪资是否变化？
福利 / 年假 / 远程政策如何落到书面？
Offer 最晚确认时间是否可以延长？
竞业 / 调岗 / 奖金兑现条件是否能提前确认？
```

Manager questions:

```text
入职前三个月最重要的结果是什么？
这个岗位为什么现在招聘？
日常执行和策略大约是什么比例？
这个角色有哪些实际 ownership？
团队目前最需要解决的问题是什么？
```

## User-Facing Output Shapes

For multiple offers:

```text
Offer 对比
├─ 已确认:
├─ 还不确定:
├─ Offer 状态 / 雇佣关系:
├─ A 的主要优势:
├─ B 的主要优势:
├─ 硬性限制 / 重大风险 / 可权衡项:
├─ 真正的冲突:
├─ 稳妥 / 成长 / 生活视角:
├─ 当前建议:
└─ 下一步:
```

For one offer:

```text
单 Offer 决策
├─ Offer 状态 / 雇佣关系:
├─ 接受它的收益:
├─ 接受它的代价:
├─ 继续找的收益:
├─ 继续找的代价:
├─ 最大未知项:
├─ 当前建议:
└─ 下一步:
```

For negotiation:

```text
谈薪 / 谈条件判断
├─ 真正冲突:
├─ 已确认 vs 仍未确认:
├─ 值不值得谈:
├─ 可以谈什么:
├─ 简短表达:
├─ 谈不成后的回到决策:
└─ 下一步:
```

Do not output every section every time. Focus Control wins.

## Closure

After the user accepts:

```text
确认书面条件
停止或取消哪些投递 / 面试
准备入职
```

Before advising the user to withdraw other processes or resign, confirm:

```text
正式书面 offer
核心薪资 / 岗位 / 入职条件
背景调查 / 背调 / 审批 / 签证等前置条件
明确 start date
```

Mention that a future 30/60/90 day onboarding observation flow could be useful, but do not create it here.

After the user rejects:

```text
为什么拒绝
以后哪些条件直接降级或筛掉
下一批 JD 筛选条件
```

After the user continues searching:

```text
为什么暂时不接
最长继续搜索多久
下一批重点验证什么
当前 Offer 是否保留到 deadline
```

Reflect the decision into a user-facing current-cycle preference card:

```text
下一批 JD 筛选条件
├─ 更看重:
├─ 直接降级:
├─ 需要提前确认:
└─ 只适用于当前求职周期:
```

If the runtime has no real storage, say the card only exists in this reply and the user should bring it back next time. Do not claim persistent memory.

## Boundaries

- Do not choose for the user.
- Do not use "A 82 / B 79" as the decision.
- Do not treat big company, higher salary, or famous brand as automatic winner.
- Do not count uncertain bonus/equity/verbal promises as guaranteed income.
- Do not make legal, labor, tax, visa, contract, or medical conclusions.
- Do not add unrelated resume, interview, onboarding, resignation, or web automation features.
