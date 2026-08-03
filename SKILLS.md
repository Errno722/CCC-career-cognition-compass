# CCC Skills

CCC 的 skills 是一组 `SKILL.md` 风格的可迁移能力模块，用于 Codex、Claude Code 或其他支持本地技能/项目指令的 agent。

## 推荐使用方式

如果你只想使用完整流程，优先使用：

```text
career-cognition-compass
```

如果任务很明确，可以直接使用拆分 skill：

```text
career-intake-clarifier       混乱输入整理
career-project-experience-miner 项目经历盘点与深挖
career-direction-clarifier    方向澄清
career-transfer-map           可迁移能力和职业族群
career-hard-skill-kb          硬技能知识库和术语表
jd-company-prep               JD / 目标公司准备
jd-resume-patch               JD 简历修改补丁
career-materials-builder      中英文简历、作品集、平台材料
interview-review-miner        面试关键词、面试官反馈、候选人面试背景卡、角色化回答侧重点和后续修改
job-search-plan-review        14 天计划、复盘、投递记录
career-stability-bridge       Gap、低能量、在职疲惫、离职犹豫、兼职过渡
```

如果部署到 WorkBuddy，可以参考：[workbuddy/](workbuddy/)。

## 在 Codex 中使用

把 `skills/` 目录作为项目的一部分保留。使用时可以直接说：

```text
Use $career-cognition-compass.

我现在很乱，gap 一年多，之前做过运营，也学过一点 AI，不知道还能投什么。
```

或者使用更精确的模块：

```text
Use $jd-resume-patch.

我有一份 JD 和一份已有简历，不想整份重写，只想知道哪些段落要改。
```

```text
Use $jd-resume-patch.

我上一份简历是按项目管理 JD 改过的，现在要投研发 JD。请先做版本隔离检查，不要把上一版偏向带进来。
```

```text
Use $jd-resume-patch.

别人反馈我的简历模块太多、个人总结太泛，和目标 JD 不够贴合。请先提炼 JD 最核心的 2-3 个能力，再帮我判断哪些经历应该保留、前移、弱化或删除。
```

```text
Use $interview-review-miner.

我刚面试完，只记得关键词：留存、SQL join、用户分层。面试官反馈说我 B 端经验不足。请帮我复盘可能题型，并判断简历和下次面试要怎么调整。
```

```text
Use $interview-review-miner.

下一轮可能有 HR、业务负责人和技术面试官。请根据不同面试官角色，帮我调整同一个项目案例的回答侧重点。
```

## 在 Claude Code 中使用

这些 skills 的核心是标准的 `SKILL.md` 文件。你可以把需要的 skill 文件夹复制到 Claude Code 当前支持的技能目录或项目上下文中。

如果你的 Claude Code 环境暂时不支持自动加载 `SKILL.md`，也可以把对应 `SKILL.md` 的内容复制到项目说明或本轮对话中使用。

建议先只放 1-3 个最常用 skill，避免一次加载太多上下文：

```text
career-cognition-compass
jd-company-prep
jd-resume-patch
```

## 选择哪个 skill

```text
用户只说很乱、不知道怎么开始
→ career-intake-clarifier 或 career-cognition-compass

用户想梳理项目经历、说不清自己做过什么、不知道哪些经历算项目、项目没有数据或结果不清晰、简历/作品集缺项目素材
→ career-project-experience-miner

用户不知道自己到底想找什么
→ career-direction-clarifier

用户想转行、转岗、判断能力迁移
→ career-transfer-map；如果项目事实不清晰，先用 career-project-experience-miner

用户有 JD 或目标公司，只分析岗位/公司要求
→ jd-company-prep

用户有 JD 或目标公司，并需要判断自身匹配度、选择项目案例、准备项目回答或简历角度
→ jd-company-prep；如果涉及项目且项目事实未达到 EVIDENCE_READY，先用 career-project-experience-miner

用户想根据 JD 改已有简历，但不想整份重写
→ jd-resume-patch；如果项目经历只有模糊名称，先补项目事实卡

用户收到简历反馈，例如“模块太多”“个人总结太泛”“与 JD 不贴合”“工作年限短但经历堆太满”
→ jd-resume-patch

用户要简历模板、通用简历、重新做人设、职业定位、候选人叙事、专业技能市场语言转译、作品集思路、平台表达、招聘软件打招呼语，或用户经历显示可能需要重新定位
→ career-materials-builder；如果项目事实未达到 EVIDENCE_READY，先用 career-project-experience-miner

用户要英文简历模板、英文 bullet 改写、海外求职材料或 LinkedIn 简历表达
→ career-materials-builder；如果涉及项目表达且项目事实未达到 EVIDENCE_READY，先用 career-project-experience-miner

用户刚面试完、只记得面试关键词、不完整问题、面试官反馈，想把“xx 经验不足”等反馈用于后续简历/面试方向调整，或想根据 HR、用人经理、业务、技术等面试官角色调整回答侧重点
→ interview-review-miner

用户要行动计划、投递记录、投递后空档期计划、纯面试等待、询问 HR 进度/反馈话术和求职节奏复盘
→ job-search-plan-review

用户长期 Gap、低能量、在职疲惫、离职犹豫、需要兼职过渡
→ career-stability-bridge
```

## 边界

这些 skills 不用于：

- 自动投递职位；
- 自动私信 HR；
- 编造学历、公司、项目、数据、证书或技术能力；
- 为了所谓“人设”虚构陌生身份；
- 替用户做离职、裸辞、offer 选择等最终决定；
- 心理诊断、治疗、危机干预、法律建议、医疗建议或签证结论。

使用前请先脱敏，不要公开真实简历、电话、邮箱、offer、合同、薪资截图、完整面试记录或公司内部信息。

## 更新记录

```text
2026-08-04 / interview-review-miner v0.2.4
- 新增候选人面试背景卡：每次面试复盘后沉淀已验证优势、高频被质疑点、最近反馈、已做改进和下一轮面试重点，方便二面/三面继承前一次不足。

2026-08-02 / interview-review-miner v0.2.3
- 新增面试官角色回答卡：按 HR、用人经理、业务、技术、高管、Founder、跨部门和同级面试官区分回答侧重点，同时保持事实不变。

2026-08-02 / jd-company-prep v0.1.1
- 新增面试官角色准备卡：面试前可按不同面试官角色准备关心点、前置证据和练习动作。

2026-07-29 / job-search-plan-review v0.2.4
- 新增投递后空档期计划：投完简历但还没反馈时，复盘投递质量、整理 JD 共性、补可复用资产和安排 5-20 分钟动作。

2026-07-29 / interview-review-miner v0.2.2
- 将来源类型、可信度、重复状态和动作等级写入改简历前的门禁；明确纯等待和 HR 跟进话术交给 job-search-plan-review。

2026-07-29 / job-search-plan-review v0.2.3
- 明确纯面试等待、HR 进度确认和跟进话术保留在本模块，并增加短回复形状。

2026-07-29 / interview-review-miner v0.2.1
- 新增面试反馈来源类型、可信度和动作等级，避免模糊反馈直接改主简历或投递方向。

2026-07-29 / career-materials-builder v0.3.8
- 新增面试反馈可信度检查，低可信反馈只记录或准备回答卡。

2026-07-29 / jd-resume-patch v0.2.4
- 新增面试反馈来源类型、可信度和动作等级映射，再决定是否生成简历补丁。

2026-07-29 / career-hard-skill-kb v0.1.2
- 新增硬技能反馈可信度和动作等级字段。

2026-07-29 / job-search-plan-review v0.2.2
- 新增模糊反馈或转述反馈的可信度检查转交规则。

2026-07-29 / interview-review-miner v0.2.0
- 新增面试反馈来源岗位和重复反馈计数，避免单次反馈污染所有简历版本。
- 新增回答失败原因分类、下次面试回答卡和面试体验评估。

2026-07-29 / career-materials-builder v0.3.7
- 新增面试后材料修改等级：answer_prep_only、small_resume_patch、reposition_scope。

2026-07-29 / jd-resume-patch v0.2.3
- 新增面试反馈来源隔离和重复反馈状态，决定反馈只影响某个 JD 版本还是进入中性主简历。

2026-07-29 / career-hard-skill-kb v0.1.1
- 新增反馈来源岗位/JD 和重复反馈状态，避免根据一次面试把技能直接标弱。

2026-07-29 / job-search-plan-review v0.2.1
- 新增面试体验信号，用于等待期岗位评估。

2026-07-29 / interview-review-miner v0.1.0
- 新增面试复盘独立模块：支持面试关键词还原、可能题型、考察能力和回答思路。
- 新增面试官反馈挖掘：例如“xx 方面经验不足”，用于后续简历、面试回答、JD/方向选择和硬技能知识库更新。

2026-07-29 / career-materials-builder v0.3.6
- 新增面试官反馈门禁：根据“xx 经验不足”等反馈改材料前，先用 interview-review-miner 拆解反馈原话、推断、简历影响和面试影响。

2026-07-29 / jd-resume-patch v0.2.2
- 新增面试官反馈处理：将“xx 经验不足”“项目不够深入”“业务理解不够”等反馈转成证据顺序、缺口标记、面试风险或 JD 范围调整。

2026-07-29 / job-search-plan-review v0.2.0
- 明确面试等待和 HR 询问话术仍归本模块；面试关键词、题目回忆和面试官反馈转交 interview-review-miner。

2026-07-29 / career-hard-skill-kb v0.1.0
- 新增面试官反馈作为知识库来源，记录反馈原话、反馈类型、当前证据、缺口、下次面试回答和 7-14 天补强动作。

2026-07-28 / career-project-experience-miner v0.1.2
- 新增项目与普通任务的判断边界。
- 新增全景盘点停止条件，避免无限枚举项目。
- 明确 EVIDENCE_READY 不等于必须有量化数据，而是事实边界、个人贡献、产出和结果状态足够清楚。
- 新增单项目状态记录格式和临时草稿模式。

2026-07-28 / career-project-experience-miner v0.1.1
- 新增项目事实完整度检查和三档状态：DISCOVERED、PARTIALLY_MAPPED、EVIDENCE_READY。
- 明确先做项目全景盘点，再选择单项目深挖，避免只抓住用户最先提到的项目。
- 增加下游门禁：只有 EVIDENCE_READY 项目才能进入能力迁移、JD 简历补丁、作品集或最终材料表达。

2026-07-28 / career-materials-builder v0.3.5
- 英文简历、英文 bullet、LinkedIn 和海外材料也统一使用项目事实门禁。

2026-07-28 / career-materials-builder v0.3.4
- 增加项目事实门禁：项目未达到 EVIDENCE_READY 时，不直接生成项目 bullet、作品集案例、候选人叙事或 JD 定制表达。

2026-07-28 / jd-company-prep v0.1.0
- 新增 JD / 公司准备中的项目证据门禁：纯 JD 分析不强制项目挖掘，但涉及用户匹配度、项目案例和项目回答时需要先确认项目事实。

2026-07-28 / jd-resume-patch v0.2.1
- 新增项目事实卡检查：项目只有模糊名称、个人贡献不清或缺少产出/证据时，先补事实卡，再写 JD 定制项目 bullet。
- 明确复杂项目缺口应先交给 career-project-experience-miner，而不是在简历补丁里强行包装。

2026-07-28 / career-project-experience-miner v0.1.0
- 新增项目经历盘点与深挖模块：先做记忆唤起、项目总表、单项目事实卡、个人贡献边界和证据缺口，再进入职业定位、JD 匹配或简历表达。
- 明确失败、暂停、无数据、学习型和个人项目也可以被整理成事实资产，但不能夸大为商业成功。
- 主流程增加“项目事实层”，避免直接从用户说过的内容跳到岗位标签或简历 bullet。

2026-07-07 / career-materials-builder v0.3.3
- 新增隐性定位判断：用户不主动说“重新做人设”时，也可根据经历散、Gap、转行、行业下行、目标岗位不匹配等信号判断是否需要职业定位重建。
- 明确命中多个信号时先提示“可能是定位问题”，再给定位卡，不直接重写材料。

2026-07-07 / career-materials-builder v0.3.2
- 新增职业定位 / 候选人叙事规则：将“重新做人设”处理为基于真实证据的定位重建。
- 明确不为所谓人设虚构学历、公司、岗位、项目、数据或陌生身份。

2026-07-07 / career-materials-builder v0.3.1
- 新增通用简历规则：询问是否将专业强相关技能转成更容易被市场岗位理解的语言。
- 明确保留原专业词，不把专业能力全部泛化。

2026-07-06 / career-materials-builder v0.3.0
- 新增英文简历模板能力：按英文简历结构重组内容，不逐句照搬中文简历。
- 新增英文 bullet 动词规则：可使用 led、owned、analyzed、built、mastered 等表达，但必须匹配真实贡献度。

2026-07-06 / career-materials-builder v0.2.1
- 更新招聘软件打招呼语默认骨架：工作年限、学历按情况、过往行业/岗位、当前状态、岗位兴趣和简历已附上。
- 明确学历和“简历已附上”是条件字段，不需要每次硬塞。

2026-07-06 / career-materials-builder v0.2.0
- 新增招聘软件打招呼语规则：先介绍求职者是谁、有什么相关经历，再说明和岗位的连接。
- 明确打招呼语不是简历的简写版本，不把教育、技能、项目和状态全部压成一段。

2026-07-01 / jd-resume-patch v0.2.0
- 新增能力聚焦检查：先提炼 JD 最核心的 2-3 个能力，再选择用户最匹配的 2-3 个能力。
- 新增简历反馈处理：模块太多、个人总结太泛、岗位贴合度不足时，优先做删减和聚焦。
- 新增短工作年限规则：不把“做得多”当作优势，避免经历堆叠削弱重点。
```
