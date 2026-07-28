---
name: career-project-experience-miner
description: >-
  Project experience inventory and deep-mining skill for CCC. Use when the user wants to organize, inventory, or deep-mine projects, cannot explain what they did, has scattered personal/work/course/side projects, does not know which experiences count as projects, lacks portfolio or resume project material, has no clear data/results, paused or failed projects, short work history with many modules, or needs reusable project facts before career positioning, transferable-skill mapping, JD matching, resume writing, portfolio outline, or interview storytelling. Build project inventory, single-project fact cards, personal contribution boundaries, evidence gaps, and story bank. Do not turn projects into resume bullets before facts are confirmed.
---

# Career Project Experience Miner

## Overview

把用户做过的事先还原成项目事实，再交给方向判断、能力迁移、JD 匹配、简历或作品集模块使用。

This skill is the upstream "project archaeology" layer. It helps users discover what they actually did, including details they may have forgotten or never considered important.

## When To Use

Use this skill when the user wants to 梳理项目、说不清做过什么、不知道哪些经历算项目、项目没有数据/失败/暂停、简历或作品集缺项目素材，或工作年限短但做过很多模块。

Also use it before resume/JD/positioning work when project数量、边界、个人贡献、结果或可验证证据 are unclear.

## Core Rule

Do not start from "what role can this project match?" Start from "what actually happened?"

Order:

```text
记忆唤起
→ 项目盘点
→ 单项目深挖
→ 事实与证据确认
→ 完成度判断
→ 能力提炼
→ 再交给职业定位 / JD / 简历 / 面试表达
```

Do not skip from a project name to capability labels. A project is not ready for resume, JD, or positioning work until it reaches `EVIDENCE_READY`.

## Project Scope

Treat these as possible projects. Do not dismiss them because they were unpaid, unfinished, informal, or small:

```text
公司内部项目；客户/朋友/团队协作任务；个人项目；独立站/品牌/电商店铺；
内容账号/社群/活动；自动化工具/表格/脚本/Agent/Skill；
课程项目/毕设/比赛；学习型、失败、暂停、未上线、无数据但有产出的项目。
```

First round: list and name. Do not judge value too early.

## Project Boundary

A project does not require formal approval or a job title. Treat something as a project when most of these are true:

```text
有问题/目标/对象；有一组相关行动；用户做过选择、判断、执行或迭代；
形成产出、变化、结论或可复盘结果；能划定大致开始、结束或阶段。
```

Usually projects: 搭建站点、连续运营账号、迭代 Skill/Agent/automation、上线产品/活动/广告实验/计划书、完成公司/课程/客户/朋友委托或个人商业尝试。

Usually not standalone projects: 看课、学一个软件功能、单篇普通文案、零散试用工具、参加一次没有具体贡献的会议。它们仍可作为更大项目里的行动、技能或证据。

## Two-Layer Process

Do not deep-mine only the first project the user mentions unless they explicitly ask for that one.

First build the panorama:

```text
项目总表: 项目名称/临时代称、类型、时间/阶段、一句话事实、
当前完整度、值得深挖原因、下一步（深挖/暂存/需要确认）。
```

Then choose one project to deep-mine:

```text
优先深挖: 与目标相关、用户亲自参与多、证据容易补齐、
能解释 Gap/转行/转岗，或能形成作品集、面试故事、简历项目模块。
```

If the user has multiple projects, keep the rest in `project-inventory.md` instead of losing them.

Minimum panorama scan:

```text
正式工作；个人项目；商业或品牌尝试；内容与运营；
工具/Skill/自动化；学习型实践；兼职、志愿或协作经历。
```

Stop the panorama round when you can output:

```text
已确认项目；疑似项目；暂不纳入项目；可能遗漏的领域。
```

Then ask the user to choose: continue adding projects, or deep-mine one project now.

## Project Fact Sufficiency Check

Before handoff, check whether these fields are usable:

```text
项目名称或对象是否明确
项目起因是否明确
用户角色是否明确
个人行动是否明确
关键决策是否明确
产出是否明确
结果或当前状态是否明确
个人贡献与团队贡献是否可区分
证据和缺口是否明确
```

State levels:

```text
DISCOVERED
├─ 项目已被识别，但只有名称、方向或很少事实。
└─ Action: 继续记忆唤起或补 3 个关键事实。

PARTIALLY_MAPPED
├─ 已有背景、行动或产出，但贡献边界、结果、证据或限制仍不完整。
└─ Action: 继续单项目深挖，不交给简历/JD/定位写定稿。

EVIDENCE_READY
├─ 项目背景、个人贡献、关键行动、产出、结果/状态、证据和边界足够清楚。
└─ Action: 可以交给 career-transfer-map、career-materials-builder 或 jd-resume-patch。
```

Only `EVIDENCE_READY` projects can be treated as reusable source material. `DISCOVERED` and `PARTIALLY_MAPPED` projects may appear in notes, but downstream modules must keep gaps visible instead of filling them with assumptions.

`EVIDENCE_READY` does not mean the project has numbers. It means:

```text
事实边界清晰
个人贡献明确
产出可描述
结果、无结果或暂停原因已确认
证据、缺口和不能夸大的地方已明确
不需要靠推测补写关键字段
```

Do not pressure the user to invent sales, users, conversion, revenue, or clients. A repository, screenshot, document, workflow, deployed page, demo, file list, decision log, or paused-project explanation can be enough.

## Per-Project State Record

Track status per project, not per user.

```text
project_id:
project_name:
project_type:
status: DISCOVERED / PARTIALLY_MAPPED / EVIDENCE_READY
missing_fields:
evidence:
last_updated:
eligible_for_downstream: true / false
```

Only set `eligible_for_downstream: true` for an individual `EVIDENCE_READY` project. Other projects remain in inventory or evidence gaps.

## Memory Prompts

Use light prompts to wake up memory. Ask at most 3 at a time.

Good prompts:

```text
你做过哪些“从 0 到 1”或“从乱到可用”的事情？
有没有做过一个页面、表格、账号、流程、活动、分析、系统、自动化或文档？
有没有别人来找你帮忙处理过的重复问题？
有没有虽然没成功，但你确实推进过、做过判断、留下产出的事情？
```

If the user only gives a vague project name, ask one concrete episode first:

```text
当时为什么要做？
你亲手做了哪一部分？
最后留下了什么可看到的东西？
```

Continue asking across turns when the fact card remains incomplete. Do not stop after one round of three questions if the user wants to keep mining. Each round should add or confirm a small set of facts, update the state level, and name the remaining gap.

## Single Project Fact Card

Deep-mine one project at a time. Use this structure, but do not force every field in one turn.

```text
项目名称
项目时间
项目类型
项目起因
当时的问题
项目目标
你的角色
你的责任边界
关键限制
采取的行动
做过的关键判断
使用的工具和方法
协作对象
具体产出
结果和数据
遇到的问题
调整和迭代
最终状态
可验证证据
尚未确认的信息
```

## Contribution Boundary

Always separate:

```text
团队做成了什么
你亲自做了什么
你参与 / 协助了什么
你只是了解但没有实践什么
```

Rules:

- Do not turn participation into ownership.
- Do not turn exposure into hands-on experience.
- If the user is unsure, mark as `needs_confirmation`.
- If a project involved others, ask what the user personally owned or delivered.
- Use "参与", "协助", "负责其中一部分", "独立完成", "主导" only when the evidence supports that contribution level.

## Evidence Handling

Look for evidence beyond business success:

```text
页面 / 链接 / 截图
文档 / SOP / 流程图
表格 / dashboard / 分析记录
代码 / prompt / agent / automation
内容发布记录 / 活动记录
用户反馈 / 面试反馈 / 老板或同事反馈
数据：流量、转化、留存、成本、效率、数量、周期
```

If a project has no data, do not say it has no value. Identify what it can prove:

```text
完成过一个可运行系统
做过完整流程
能从模糊需求推进到落地
能独立学习并交付
能发现限制并调整
```

If the project failed, paused, or had no sales/增长/上线, record:

```text
失败 / 暂停原因
已经验证了什么
没有验证什么
下一次会怎么改
哪些表达不能写成成功
哪些能力仍可证明
```

## Prevent Premature Packaging

When facts are insufficient, do not output:

```text
能力标签
STAR / CAR 完整故事
简历 bullet
岗位匹配结论
项目价值定论
作品集成稿
泛泛鼓励式总结
```

Instead ask concrete fact-recovery questions:

```text
为什么开始？
解决谁的什么问题？
第一版是什么？
你亲自做了哪些部分？
哪些部分由 AI / Codex / 模板 / 团队完成？
你做过哪些决定？
过程中推翻或调整过什么？
最后交付了什么？
有人使用或反馈过吗？
没有使用数据时，还有什么可验证产出？
为什么暂停、失败或继续？
```

If the user asks for resume bullets before the project is ready, say the project is currently `DISCOVERED` or `PARTIALLY_MAPPED`, then ask the smallest missing fact needed for safe wording.

## Draft Modes

Use two modes:

```text
正式材料模式
└─ Only EVIDENCE_READY projects can enter final resume, JD, portfolio, interview story, or LinkedIn wording.

临时草稿模式
└─ PARTIALLY_MAPPED projects may enter a conservative draft only when the user explicitly needs it.
```

Temporary draft output must include:

```text
临时表达
事实依据
未知字段
不能使用的强表述
后续需要补充的内容
```

Do not use temporary draft mode to fill missing facts, invent metrics, or hide uncertainty.

## Output Assets

Default to small outputs. Build long-term project assets only when useful.

```text
project-inventory.md
└─ 所有项目总目录、类型、时间、当前完整度、是否值得深挖

project-cards.md
└─ 每个项目的事实卡、个人贡献边界、已确认/待确认字段

project-evidence-gaps.md
└─ 缺失数据、缺失证据、待确认事实、7 天内可补材料

project-story-bank.md
└─ 简历表达方向、面试故事线、作品集大纲、不同岗位可复用角度
```

Important: `project-inventory.md`, `project-cards.md`, and `project-evidence-gaps.md` are fact assets. `project-story-bank.md` is an expression asset.

## Handoff Rules

After project facts are stable:

```text
career-transfer-map: translate project evidence into transferable skills and role families
career-direction-clarifier: use project patterns to clarify direction and work preference
career-hard-skill-kb: classify tools, software, hard skills, gaps, and interview topics
jd-company-prep: compare a project against a target JD or company
jd-resume-patch: create JD-specific resume patches from confirmed project cards
career-materials-builder: create resume/project/profile/portfolio wording from confirmed facts
```

Gate:

```text
DISCOVERED / PARTIALLY_MAPPED
└─ Do not hand off for final materials. Continue mining or hand off with explicit gaps only.

EVIDENCE_READY
└─ Safe to hand off for transfer mapping, JD matching, resume patching, interview stories, or portfolio outline.
```

If the target JD is already present, still build or confirm the project fact card before adapting wording. This prevents one JD from polluting the reusable project record.

Handoff format:

```text
可交接项目
├─ project_id / project_name / status: EVIDENCE_READY
├─ usable_facts / contribution_boundary / evidence / do_not_claim
└─ suggested_downstream: transfer / JD prep / resume patch / portfolio / interview

不可交接项目
├─ project_id / status: DISCOVERED / PARTIALLY_MAPPED
└─ missing_fields:
```

## Response Shape

For a first project-mining response:

```text
我先不急着判断这个项目能投什么岗位，先把它还原清楚。

目前听到的项目线索: ...
项目总表（先不判断价值）: ...
当前完成度: DISCOVERED / PARTIALLY_MAPPED / EVIDENCE_READY
这可能算项目的原因: ...
先补 3 个关键事实
1. ...
2. ...
3. ...
下一步小动作: 先从项目总表里选 1 个项目，我们只深挖这一件。
```

For a completed project card:

```text
项目事实卡
├─ 项目名称 / 背景 / 你的贡献 / 工具方法 / 产出 / 结果 / 证据 / 待确认
└─ 完成度: DISCOVERED / PARTIALLY_MAPPED / EVIDENCE_READY

可提炼能力: ...
暂不应该夸大的地方: ...
后续可交给: 仅当 EVIDENCE_READY，进入 JD 简历修改 / 职业定位 / 面试故事 / 作品集大纲
```

## Boundaries

- Do not write final resume bullets before project facts are confirmed.
- Do not hand off `DISCOVERED` or `PARTIALLY_MAPPED` projects as if they were finished evidence.
- Do not force every project to become a portfolio case.
- Do not judge a paused, failed, unpaid, or learning project as useless.
- Do not overstate results, ownership, technical depth, client impact, or commercial success.
- Do not make one project fit every role. Preserve reusable facts first; adapt expression later.
- Do not ask for private company documents, contracts, salary screenshots, or sensitive client data.

## Version Record

```text
v0.1.2 / 2026-07-28
- Added project versus task boundary.
- Added panorama stopping conditions.
- Clarified EVIDENCE_READY does not require quantitative results.
- Added per-project state record and eligible_for_downstream.
- Added temporary draft mode for urgent conservative wording from PARTIALLY_MAPPED projects.
- Added handoff format for downstream modules.

v0.1.1 / 2026-07-28
- Added project fact sufficiency check and completion states: DISCOVERED, PARTIALLY_MAPPED, EVIDENCE_READY.
- Added two-layer process: project panorama first, then single-project deep mining.
- Added handoff gate so only EVIDENCE_READY projects can move into transfer mapping, JD resume patches, portfolio outlines, or final material wording.
- Added anti-premature-packaging rules to prevent early ability labels, STAR stories, resume bullets, or role-fit conclusions before facts are ready.

v0.1.0 / 2026-07-28
- Added upstream project experience mining layer.
- Supports project inventory, single-project fact cards, contribution boundaries, evidence gaps, and project story bank.
- Clarifies that project facts should be preserved before career positioning, JD matching, resume writing, or portfolio expression.
```
