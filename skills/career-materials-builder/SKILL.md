---
name: career-materials-builder
description: >-
  Editable job-search materials builder. Use when the user asks for Chinese or English resume drafts/templates, neutral/general resume structure, professional positioning/persona rebuild, candidate narrative, market-language adaptation of specialized skills, resume section structure, English resume bullets, campus versus experienced resume adjustments, status wording such as resigned/open to work/gap, LinkedIn or platform wording, recruiter outreach/greeting messages, job-platform opening messages, recruiter pre-interview screening replies, HR screening-question replies, self-introduction frameworks, portfolio outline, mind map, interview notes, judgment/methodology-based interview material, expression strategy such as interview-rate-first versus truthful-fit-first positioning, or concise job-search materials after intake. Keep outputs editable and evidence-based; do not fabricate facts, judgment, methodology, or produce full portfolios by default.
---

# Career Materials Builder

## Overview

Produce small, editable job-search materials after enough intake exists. Materials are outcomes of clarification, not the default starting point.

## Focus Rule

- SHARED_RULE focus-control v1.1
- SHARED_RULE certainty-calibration v1
- SHARED_RULE profile-persistence v1.1

Use the user's requested material as the active deliverable. Output one material patch or one template first, then at most one support reminder or next action. Park resume, portfolio, LinkedIn, greeting, interview, and persona branches that the user did not ask to expand.

## Explicit Resume Requests

If the user starts with "改简历", "优化简历", "生成简历", "帮我看简历", or similar wording, respond to that request immediately. Do not route them back to broad career clarification first.

Do this:

1. Say that resume editing is possible.
2. Ask for the smallest safe input: desensitized resume excerpt, target role/JD, and what they want improved.
3. If enough content is already present, give 1-3 concrete edits or replacement text.
4. If content is missing, ask at most 3 questions; do not require a full resume form.

Short reply pattern:

```text
可以，我先按“可修改简历”处理。请先脱敏后发：
1. 简历片段或经历 bullet
2. 目标岗位或 JD
3. 你最想改的点：更像目标岗位 / 更简洁 / 更容易拿面试 / 更真实稳妥
```

## Preconditions

Before drafting, confirm the minimum usable picture:

```text
current status
target direction or JD
education / work / project evidence
core skills
constraints and available time
```

If the picture is missing, ask for up to 3 key facts instead of forcing a full form.

If project evidence is only a project name or a vague label, do not immediately turn it into resume bullets, candidate narrative, portfolio outline, or platform copy. Ask for or route to a project fact card first:

```text
项目背景
你的个人贡献
工具 / 方法
产出
结果 / 证据
待确认信息
```

Use `career-project-experience-miner` when the user needs to remember, inventory, or deep-mine projects before writing materials.

If the material would claim judgment, ownership, trade-off reasoning, decision making, strategy, product sense, business judgment, or methodology, check for a usable Judgment Trace or Methodology Trace first.

```text
Judgment Trace missing
└─ Do not write "我综合判断..." or "I decided..." as if the user made that judgment. Ask for the user's reasoning or write a conservative boundary.

Methodology Trace missing
└─ Do not write "形成了一套方法论" from one execution example. Use "初步经验" or ask for repeated evidence.
```

Completion gate:

```text
DISCOVERED / PARTIALLY_MAPPED
└─ Do not create final resume bullets, portfolio cases, candidate narrative, or JD-specific project wording.

EVIDENCE_READY
└─ Safe to create editable wording while preserving boundaries.
```

Judgment / Methodology gate:

```text
J0 / J1
└─ Can describe execution and result interpretation. Do not claim independent decision ownership.

J2 / J3
└─ Can write judgment and trade-off wording if the user's reasoning is explicit.

J4
└─ Can include retrospective learning.

M0 / M1
└─ Can say "初步经验 / early working rule".

M2 / M3 / M4
└─ Can write reusable methodology, with applicable contexts and exceptions.
```

If the user asks "帮我把过去做过的项目整理成作品集" and the project facts are incomplete, first route to `career-project-experience-miner`. Do not start with portfolio themes.

If the user wants to revise materials based on interviewer feedback such as "X experience is insufficient", "project depth is not enough", or "business understanding is weak", first route through `interview-review-miner` to separate feedback原话, source type, source role/JD, repeated count, feedback reliability, inference, resume impact, interview-answer impact, and JD/direction impact. Do not rewrite the resume from one interview comment without this check.

Post-interview material changes must choose a level:

```text
answer_prep_only
└─ 简历不改，只准备下次回答卡。

small_resume_patch
└─ 只前移、补证据或重排相关表达。

reposition_scope
└─ 多次相似反馈后，重新检查投递方向或候选人叙事。
```

Use reliability before applying changes:

```text
low / unknown feedback
└─ 不改简历，只记录或准备回答卡。

medium feedback
└─ 只在目标 JD 版本中做小补丁。

high repeated feedback
└─ 才考虑调整主简历、候选人叙事或投递范围。
```

For employed users with limited after-work energy, prefer the smallest material path:

```text
Master Resume
└─ Role Family Resume
   └─ JD Patch
```

Do not ask them to rebuild all materials for early market exploration. If one Role Family is already producing replies or interviews and there is no repeated resume-level negative feedback, suggest a temporary Resume Freeze and only patch the current JD.

If the user gives a limited time budget and asks what to fix in materials, choose one patch:

```text
有限时间材料补丁
├─ 现在只改:
├─ 为什么:
├─ 替换 / 调整:
└─ 到这里停:
```

Rules:

- Do not rebuild the full resume, portfolio, LinkedIn, self-introduction, and greeting in one time box.
- If an interview is soon, material work should support the interview: one project explanation, one self-intro frame, or 1-2 likely questions. Do not start a full resume rewrite.
- If the Role Family is stable and receiving replies, prefer Resume Freeze plus JD Patch over rewriting the main resume.
- If project facts are incomplete, use the time to clarify one project fact gap rather than polish unsupported bullets.

## Resume Scope

Include these common sections when creating a resume draft or template:

```text
姓名
现居地
电话
邮箱
目前状态
教育背景
工作经历
项目经历
核心技能
```

For campus recruiting, optionally add GPA, coursework, internships, awards, competitions, club work, papers, certificates, and campus projects when relevant.

For experienced candidates, prioritize role-relevant work/project evidence, tools, measurable but truthful outcomes, and status wording such as:

```text
离职，随时入职
Gap 中，随时入职
在职，考虑合适机会
Currently employed and open to suitable opportunities
Open to Work
```

## General Resume Market Language

When the user asks for a 通用简历, 中性主简历, general resume, or resume template without a specific JD, ask whether specialized skills that are strongly tied to the user's major, academic background, license, or prior industry should be translated into broader market language.

Use a short question:

```text
这份通用简历要更偏专业领域，还是更方便跨行业/市场岗位理解？
如果选择后者，我会保留原专业词，同时加一层市场语言，方便 HR 或业务岗位快速看懂。
```

Translate specialized skills without erasing the original expertise:

```text
原专业词 / 专业技能
├─ 市场语言：更通用的业务、数据、运营、产品、项目、合规、客户或流程表达
└─ 可投场景：这项能力可能对应的岗位任务或行业场景
```

Rules:

- Keep the original technical or academic term when it is a keyword for the target field.
- Do not make the resume vague by replacing all professional terms with generic words.
- Do not force market language when the user is applying to a highly specialized role where the original term matters more.
- If the user is unsure, provide two editable versions: `专业保留版` and `市场转译版`.

## Professional Positioning / Persona Rebuild

When the user says `重新做人设`, `换个求职人设`, `包装自己`, `重新定位`, `职业定位`, or `候选人叙事`, translate this into professional positioning. Do not invent a fake persona.

Also infer this need from experience signals. Users often will not say `重新做人设` directly.

Trigger a positioning diagnosis when several signals appear:

```text
经历很散，简历像多个方向拼在一起
目标岗位和过往行业 / 岗位身份不匹配
长期 Gap 后不知道怎么解释自己
原行业下行，用户不想继续用原行业身份求职
工作年限短但模块很多，重点被稀释
用户说“不知道怎么介绍自己 / 不知道我算什么 / 简历不像目标岗位”
用户同时想投多个方向，但材料会互相污染
用户的专业背景很强，但目标岗位需要更市场化的表达
用户最近反复做、愿意继续做或做完更有掌控感的工作任务，与简历当前定位不一致
```

When signals are present, do not immediately rewrite materials. First say that the current issue may be positioning rather than wording, then offer a small positioning diagnosis.

First separate:

```text
真实事实
可迁移证据
近期工作行为信号
目标岗位语言
需要弱化或暂不主动强调的内容
面试中必须能解释清楚的风险点
```

Then offer 2-3 positioning cards:

```text
定位名称
适合岗位 / 行业
一句话叙事
支撑证据
近期工作行为依据
可强调的技能
需要弱化的内容
风险与面试解释点
下一步可改的材料
```

Rules:

- Keep the user's real background visible enough that the positioning can survive interviews.
- Do not fabricate education, company, title, project, data, client, tool, certificate, award, or personality traits.
- Do not turn a support role into a lead role unless the user can prove ownership.
- Do not turn analysis output, model output, AI advice, or manager instruction into the user's own judgment unless the user has explained their decision reasoning.
- Do not turn retrospective learning into "当时我就是按这套成熟方法论执行" unless the project record says `used_at_time`.
- If the user wants a more aggressive positioning, treat it as `平衡策略`: strengthen evidence and order, but mark weak claims as `[待确认]`.
- Do not build positioning from hobbies. If the user says they like something, ask what recent work task shows it: audience, deliverable, tool, context, result, or feedback.
- Treat recent work-task preference as `positioning_hypothesis` until it is supported by project facts, JD needs, interview invitations, or repeated work evidence.
- Ask the user to choose or reject a positioning before rewriting resume/profile/greeting text.
- If the user only needs a quick resume patch, keep the diagnosis short and continue with the requested material.

## English Resume Templates

When the user asks for an English resume template, English resume rewrite, overseas application materials, LinkedIn-oriented resume wording, or bilingual resume adaptation, do not translate the Chinese resume sentence by sentence.

If English bullets or LinkedIn content involve a project, apply the same project fact gate:

```text
DISCOVERED / PARTIALLY_MAPPED
└─ Do not write final English project bullets. Use temporary draft mode only if the user explicitly needs a conservative version.

EVIDENCE_READY
└─ Safe to write English bullets or LinkedIn project wording.
```

Restructure content for English resume conventions:

```text
Name
City, Country | Email | Phone optional | LinkedIn / Portfolio optional
Target Role or Headline
Professional Summary (2-3 lines)
Core Skills
Professional Experience
Selected Projects
Education
Additional: Certifications / Awards / Publications / Languages when relevant
```

Prefer concise bullets:

```text
- [Action verb] [task/scope] for [audience/business/process], using [tools/methods], resulting in [truthful outcome/evidence].
```

Use stronger ownership verbs when the evidence supports them:

```text
主导/负责: led, owned, drove, managed, spearheaded
分析/判断: analyzed, evaluated, synthesized, diagnosed
搭建/交付: built, implemented, launched, delivered, automated
协同/支持: coordinated, collaborated, supported, contributed
掌握/熟练: mastered, developed proficiency in, applied
```

Rules:

- Use `led`, `owned`, `drove`, or `spearheaded` only when the user actually had ownership or a leading role.
- Use `analyzed` freely when the user really compared data, users, markets, processes, or problems.
- Use `mastered` only when the user can defend advanced skill in an interview; otherwise prefer `developed proficiency in`, `applied`, or `used`.
- Do not copy Chinese resume order mechanically. English resumes usually need shorter summaries, stronger action verbs, fewer adjectives, and clearer scope/outcome.
- Do not keep long Chinese-style self-evaluation paragraphs. Convert them into a focused `Professional Summary` or remove them.
- Keep uncertain outcomes editable with markers such as `[confirm metric]`, `[scope]`, or `[tool]`.

## Certainty Tone Calibration

Use this for Chinese or English resumes, profiles, recruiter messages, interview prep notes, self-introduction frames, LinkedIn wording, and platform materials.

Output a short card when wording risk is visible:

```text
语气校准卡
├─ 可以确定说:
├─ 需要降级说:
├─ 待确认:
├─ 不建议使用的过度肯定词:
└─ 更稳妥替代表达:
```

Rules:

- Do not fill materials with absolute claims such as `完全匹配`, `一定能胜任`, `精通`, `显著提升`, `主导全部`, `guaranteed`, `perfect fit`, `expert`, `native-level`, or `fluent` unless the user has evidence.
- Use strong ownership words only when ownership is proven. If the user participated, use `参与`, `协助`, `contributed`, `supported`, or `worked on`.
- If evidence is weak, use calibrated language such as `有经验`, `接触过`, `参与过`, `负责其中一部分`, `可解释`, `[待确认]`, `[需要补证据]`, `experience with`, `working knowledge of`, or `used in project context`.
- A resume or interview-prep document should sound confident enough to be readable, but not so certain that it becomes hard to defend in an interview.

## English Interview And English-Required Role Wording

Use this when the user asks for English interview preparation, English self-introduction, English answers, LinkedIn expression, overseas role wording, or a JD explicitly requires English communication.

Output:

```text
英文面试表达卡
├─ Role-fit message:
├─ Plain English version:
├─ Natural phrases:
├─ Avoid stiff literal translation:
├─ English ability boundary:
└─ Practice cue:
```

Rules:

- Do not translate Chinese wording sentence by sentence. Rebuild the meaning in simple, natural professional English.
- Prefer short sentences and speakable phrases. The user should be able to say the answer aloud without sounding like a memorized article.
- Do not claim `native speaker`, `native-level`, `fluent`, or `bilingual` unless the user explicitly says so and can support it.
- For non-native but usable English, prefer calibrated phrases such as `I can use English for day-to-day work communication`, `I can discuss project context and next steps in English`, or `I am comfortable reading documentation and writing concise updates in English`.
- When preparing answers, give a framework, keywords, and 2-4 replaceable phrases before any short example.

## Resume Version Hygiene

When the user has multiple resume versions, keep these separate:

```text
中性主简历
├─ fixed facts, education, dates, companies, real projects
└─ reusable experience and skill modules

JD 定制简历
├─ role-specific order, wording, profile, and keyword emphasis
└─ reference_only for future JDs
```

Before creating or editing a resume for a new role, check whether the source is the neutral master resume or a previous JD-tailored version. If the previous version was biased toward a different role family, such as project management, product, operations, or R&D, reset the emphasis before drafting.

Use a short warning when useful:

```text
注意：上一版可能带有 [项目管理] 偏向。本次会保留事实，但按 [研发] JD 重新排序和取舍。
```

## Three-Level Resume Architecture

Use this structure when the user has many JDs, many similar resume versions, or fatigue from repeated tailoring:

```text
Master Resume
└─ fixed facts, education, dates, companies, real projects, reusable modules

Role Family Resume
└─ one stable version per role family, such as 产品运营 / 项目执行, 用户运营 / 内容运营, 数据 / 分析支持

JD Patch
└─ small changes for one JD only
```

Do not create:

```text
JD A → 全新简历 A
JD B → 全新简历 B
JD C → 全新简历 C
```

unless the user explicitly needs a separate role family version and the evidence supports it.

## Tailoring Level

Classify the effort before editing:

```text
Level 0 — No Tailoring
低优先级、顺手投或同一 Role Family，直接使用 Role Family Resume。

Level 1 — Light Tailoring
同一 Role Family，只调关键词、顺序、2-3 个 bullet。
目标 5-10 分钟。

Level 2 — Targeted Tailoring
非常想要且证据较匹配，允许 15-25 分钟深度定制。

Level 3 — Do Not Force Fit
如果必须重写大量材料、改变事实或重新塑造身份才能匹配，提示暂时不值得投入。
```

Core rule:

```text
不是每一个 JD 都值得一次新的自我定义。
```

## Minimal Tailoring Mode

Trigger this when the user says:

```text
看到 JD 就烦
不想再改简历
已经反复改很多次
每投一个岗位都像重新包装自己
回复太少导致不停重写
```

Behavior:

```text
Minimal Tailoring Mode
├─ 不重写完整简历:
├─ 不新增第 3/4/5 份相近简历:
├─ 每个 JD 最多改 3 个位置:
├─ 默认 5-10 分钟结束:
├─ 超过成本时判断这份 JD 是否值得投:
└─ 输出 JD Patch:
```

Patch locations usually include:

```text
Summary / 标题
关键词
2-3 个 bullet 的顺序或表述
1-2 个项目强调点
招聘软件打招呼语
```

If the resume is already getting recruiter replies or interviews for a stable Role Family and no repeated resume-level feedback appears, suggest `Resume Freeze` and hand off to `job-search-plan-review` for funnel tracking.

## Output Options

Choose one small material unless the user asks for a package:

```text
可编辑简历草稿
简历模板和写作思路
职业定位 / 候选人叙事卡
英文简历模板和英文 bullet 改写
自我介绍框架
作品集主题和大纲
平台投递文字
招聘软件打招呼语
LinkedIn / Open to Work 表达
简短思维导图
面试复盘卡
表达策略建议
```

## Self-Introduction And Answer Frameworks

When the user asks for a self-introduction, interview answer, "tell me about yourself", "why are you suitable", or similar material, do not default to a full script.

Output framework:

```text
自我介绍 / 面试答案框架卡
├─ 目标岗位:
├─ 能力抽象: 3-4 条能力 + 简单验证
├─ 自我介绍主线:
│  ├─ 能力 1: 与岗位契合 + 一个验证事实
│  └─ 能力 2: 与岗位契合 + 一个验证事实
├─ 面试答案一级框架: 观点 / 判断 / 选择
├─ 二级展开逻辑: 3-4 条 bullet，不超过 5 句支撑内容
├─ 可替换关键词:
└─ 不要展开的内容:
```

Rules:

- Give a first-level structure and second-level expansion logic, not a paragraph for the user to memorize.
- Keep self-introduction focused on 2 role-fit abilities. Do not compress the full resume into the introduction.
- Abstract experience into 3-4 ability claims with simple verification such as a task, project, tool, user group, process, output, result boundary, or repeated behavior.
- If the user explicitly asks for a final script, give a short editable draft after the framework, and mark it as optional.
- Do not over-expand education, full timeline, tool lists, personality claims, or unrelated projects.
- Keep claims evidence-based and interview-defensible.

## Platform Greeting Rules

When creating recruiter outreach, BOSS/招聘软件打招呼语, LinkedIn first messages, or application opening text, do not write a compressed resume.

The message should introduce the job seeker as a person:

```text
我是谁 / 当前状态
与岗位相关的 1-2 段经历
为什么这段经历和岗位有关
希望沟通什么
```

Do not cram every resume section into one paragraph:

```text
教育背景 + 工作经历 + 项目经历 + 技能列表 + 求职状态
```

Default structure:

```text
你好，我有 [X 年相关/全职/实习/项目] 经历，学历是 [学历/专业/学校可选]。
之前在 [行业/公司类型] 做过 [岗位/任务]，主要涉及 [1-2 个与岗位相关的经历或能力]。
目前状态是 [离职随时到岗 / 在职看机会 / Gap 中 / 应届 / 可到岗时间]。
我对这个岗位比较感兴趣，简历已附上，期待进一步沟通。
```

Rules:

- Keep it closer to a human opening message than a resume summary.
- Use 3-5 short sentences for Chinese job platforms unless the user asks for email length.
- Mention only 1-2 strongest relevant experiences.
- Mention education only when it helps the role, platform, or user request; otherwise omit it.
- Mention `简历已附上` only when the resume is actually attached or the platform profile is available.
- Name a real connection to the role, such as users served, task type, tool, workflow, domain, or project evidence.
- If fit is indirect, say the connection is transferable rather than pretending direct experience.
- Avoid generic lines such as `本人学习能力强`, `对贵司岗位非常感兴趣`, or `附件是我的简历请查收` unless the platform context requires them.
- Do not over-polish into sales copy. The message should sound like a real candidate starting a conversation.

If the user only provides a resume and no JD, ask what role family the greeting is for. If they want a general version, write one neutral greeting and mark the parts that should change for each role.

## Recruiter Pre-Interview Replies

Use this when the user pastes or summarizes a recruiter / HR screening question before the formal interview and asks how to reply.

Triggers include:

```text
HR 问我...
HR 这样问怎么回
面试前 HR 问...
Recruiter asked me...
How should I reply to the recruiter?
```

This is different from recruiter outreach:

```text
候选人 -> HR
└─ 招聘软件打招呼语 / recruiter outreach

HR -> 候选人 -> HR
└─ HR 面试前回复 / HR 筛选问题回复
```

Default behavior:

- Give one recommended sendable reply by default.
- Match the recruiter's tone: casual, neutral, or formal.
- Answer only what was asked.
- Use known facts from the current context.
- Do not restart onboarding, request a full resume, or give broad career coaching.
- Do not explain the whole strategy unless the user asks.
- If a missing fact materially changes the reply, ask one necessary question instead of inventing.

Default output:

```text
可以直接回：
"..."
```

For chat platforms such as BOSS, WeChat, or LinkedIn DM, keep the reply human:

- 1-3 short sentences.
- No full self-introduction unless HR asks for it.
- No long numbered analysis unless HR asked in a table-like format.
- No generic corporate filler such as `感谢您的关注`, `非常荣幸`, `贵司`, `十分契合`, `期待进一步深入沟通`, or `相信我能为贵司创造价值` by default.
- Preserve the user's original voice when editing their draft; only fix stiffness, length, order, risk, over-commitment, and obvious AI tone.

Fact boundaries:

- Current status / notice period: distinguish employed, resigned, gap, contract notice, actual handover time, and negotiable timing.
- Why looking: use the user's real reason; do not attack the current employer or use empty growth-platform wording.
- Experience: if direct experience is missing, say `直接经验不算多`, `接触过`, `做过相关项目`, or `有部分可迁移经验`; do not upgrade to `丰富经验`, `精通`, or `深度参与`.
- Salary expectation: use only the user's stated range or ask once. Do not invent salary numbers, market averages, or raise percentages.
- Current salary: do not encourage false reporting. If the user prefers not to disclose, help shift to expected range, package scope, or role fit.
- English ability: keep to evidence such as daily email, meetings, project communication, or working communication. Do not write fluent/native-level without evidence.
- Work authorization / sponsorship: ask only minimum eligibility-level facts when relevant. Do not request passport, visa number, ID number, or document scans.
- Travel, commute, onsite, remote, weekends, or working style: do not answer `可以` just to increase interview odds. Reflect the user's real boundary or use a conditional reply such as `短期可以，长期高频想再了解频率`.

If HR asks multiple screening questions at once, answer them in one compact chat reply unless HR used a form-like format. Do not turn it into a resume, cover letter, or HR communication guide.

## Expression Strategy

Some users want to maximize interview chances; others prefer to present a more transparent picture to screen for better-fit companies. Ask or infer the preference when it affects wording.

If the user says they want the resume to get more interviews but not be fully untrue, treat this as `平衡策略` by default. Do not moralize or only warn. Give a short boundary card before asking for facts:

```text
可以做
├─ 重排经历顺序，让最相关证据靠前
├─ 把用户真实做过的事翻译成目标岗位语言
├─ 强化可证明的工具、任务、对象、结果和约束
├─ 用“参与/协助/负责其中一部分/独立完成”准确标注贡献度
└─ 对不确定数据使用“约/范围/频次/规模”，或先标记待确认

不能做
├─ 编造公司、岗位、学历、项目、客户、证书、奖项或数据
├─ 把没做过写成做过
├─ 把了解写成熟练，把参与写成主导
└─ 写出用户面试时无法解释的经历
```

Use three strategy labels:

```text
面试率优先
真实匹配优先
平衡策略
```

Rules:

- `面试率优先`: strengthen relevant evidence, reorder sections, mirror JD keywords, and emphasize outcomes, but do not invent facts.
- `真实匹配优先`: keep constraints, preferences, current level, and boundaries visible enough to filter mismatched companies.
- `平衡策略`: default; keep facts truthful while translating them into role-relevant language.

For this scenario, ask for at most 3 facts:

```text
1. 你之前做过什么岗位/行业/任务？
2. 想投什么方向或 JD？不确定也可以说 1-3 个方向。
3. 你最有把握解释清楚的 1-2 件事是什么？
```

## Style Rules

- Use restrained career language.
- Do not turn participation into ownership.
- Do not turn familiarity into mastery.
- Do not invent data, clients, awards, tools, certificates, or job titles.
- Keep materials easy for the user to edit; avoid final-sounding claims when evidence is weak.

## Version Record

```text
v0.3.13 / 2026-08-13
- Added recruiter pre-interview screening replies for HR questions before formal interviews.
- Default to one natural, sendable reply that answers only what was asked and does not invent salary, availability, experience, English ability, or work authorization details.

v0.3.12 / 2026-08-08
- Added Master Resume -> Role Family Resume -> JD Patch architecture, Tailoring Level, Minimal Tailoring Mode, and Resume Freeze handoff.

v0.3.11 / 2026-08-08
- Added Judgment / Methodology gate for resumes, interview materials, profiles, and English bullets.
- Clarified that materials can structure verified judgment and early methodology, but must not invent decision ownership or mature methods.

v0.3.10 / 2026-08-04
- Added shared focus rule so materials generation starts from the user's requested deliverable and parks unrelated resume, portfolio, LinkedIn, greeting, interview, or persona branches.

v0.3.9 / 2026-08-04
- Added certainty tone calibration for resumes, profiles, platform materials, and interview prep documents.
- Added natural English interview and English-required-role wording rules so English output is speakable, calibrated, and not a direct translation of Chinese materials.

v0.3.8 / 2026-07-29
- Added feedback reliability checks before turning interview feedback into material changes.
- Added self-introduction and interview-answer framework guidance: 2 role-fit abilities, 3-4 ability/evidence pairs, and no default verbatim script.

v0.3.7 / 2026-07-29
- Added post-interview material change levels: answer_prep_only, small_resume_patch, reposition_scope.
- Require source role/JD and repeated feedback count before applying interviewer feedback to materials.

v0.3.6 / 2026-07-29
- Added interviewer-feedback gate before revising materials from comments such as "X experience is insufficient".
- Route post-interview material changes through interview-review-miner before rewriting resume/profile wording.

v0.3.5 / 2026-07-28
- Applied the same project fact gate to English resume bullets, LinkedIn wording, and overseas materials.
- Added temporary draft allowance for conservative English wording from PARTIALLY_MAPPED projects.

v0.3.4 / 2026-07-28
- Added project fact completion gate.
- Do not create project bullets, portfolio cases, candidate narrative, or JD-specific project wording until project evidence is EVIDENCE_READY.

v0.3.3 / 2026-07-07
- Added implicit positioning diagnosis.
- Infer possible professional positioning/persona rebuild needs from scattered experience, gap, career change, industry downturn, short work history, or mismatch between past identity and target roles.

v0.3.2 / 2026-07-07
- Added professional positioning/persona rebuild guidance.
- Treat `重新做人设` as evidence-based candidate narrative work, not fabrication or a fake identity.

v0.3.1 / 2026-07-07
- Added general resume market-language adaptation.
- For neutral/general resumes, ask whether specialized major- or industry-specific skills should be translated into broader market language while preserving original terms.

v0.3.0 / 2026-07-06
- Added English resume template support.
- Added English bullet structure and action verb guidance, including led, mastered, analyzed, and ownership-level checks.
- Clarified that English resumes should be adapted to English resume conventions, not translated from Chinese resumes line by line.

v0.2.1 / 2026-07-06
- Updated platform greeting default skeleton to include work years, optional education, prior industry/task, current status, resume attachment, and communication intent.
- Clarified that education and resume attachment wording are conditional fields.

v0.2.0 / 2026-07-06
- Added platform greeting rules.
- Clarified that recruiter greeting messages should introduce who the job seeker is and the most relevant experiences, not compress the whole resume.
- Added default structure for BOSS/招聘软件/LinkedIn first messages.
```
