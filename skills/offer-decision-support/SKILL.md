---
name: offer-decision-support
description: >-
  Offer decision support for CCC. Use when the user has received one or more offers, asks whether an offer is worth accepting, compares offers, compares a new offer with staying in the current job or continuing the search, has an offer deadline, wants to identify offer red flags, clarify missing offer information, prepare questions for HR or a future manager, decide whether to negotiate salary or conditions, draft concise negotiation wording, accept or reject an offer, or convert the decision result into future job-search screening preferences. Reuse existing career profile, JD, interview profile, and project evidence; do not rerun full career positioning by default. Do not provide legal conclusions, tax calculations, salary market predictions, or final life decisions.
---

# Offer Decision Support

## Overview

Help the user make a grounded offer decision without turning it into a mechanical scorecard. Start from the offer facts, red flags, user priorities, trade-offs, and reversible/irreversible costs. Reuse existing CCC context when available.

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
一票否决项
真正的冲突
用户当前优先级
接受 / 拒绝 / 继续求职的机会成本
```

If key information may change the choice, ask only the most important 1-3 missing items before comparing. Do not force the user into a long offer form.

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

## Red Flags First

Check one-vote veto items before weighted comparison:

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
是否有其他 offer 或正在进行机会
差距是现金、title、remote、年假、入职时间还是职责
哪些条件最可能改变决定
deadline 是否足够
```

Negotiable items can include base salary, sign-on bonus, bonus structure, remote days, leave, title, start date, and written scope. Do not invent competing offers or market data.

## Clarification Questions

Give at most 3-5 questions, prioritized by decision impact.

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
├─ A 的主要优势:
├─ B 的主要优势:
├─ 一票否决项:
├─ 真正的冲突:
├─ 稳妥 / 成长 / 生活视角:
├─ 当前建议:
└─ 下一步:
```

For one offer:

```text
单 Offer 决策
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
