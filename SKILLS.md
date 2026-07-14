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
career-direction-clarifier    方向澄清
career-transfer-map           可迁移能力和职业族群
career-hard-skill-kb          硬技能知识库和术语表
jd-company-prep               JD / 目标公司准备
jd-resume-patch               JD 简历修改补丁
career-materials-builder      中英文简历、作品集、平台材料
job-search-plan-review        14 天计划、复盘、投递记录
career-stability-bridge       Gap、低能量、在职疲惫、离职犹豫、兼职过渡
```

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

用户不知道自己到底想找什么
→ career-direction-clarifier

用户想转行、转岗、判断能力迁移
→ career-transfer-map

用户有 JD 或目标公司
→ jd-company-prep

用户想根据 JD 改已有简历，但不想整份重写
→ jd-resume-patch

用户收到简历反馈，例如“模块太多”“个人总结太泛”“与 JD 不贴合”“工作年限短但经历堆太满”
→ jd-resume-patch

用户要简历模板、通用简历、重新做人设、职业定位、候选人叙事、专业技能市场语言转译、作品集思路、平台表达、招聘软件打招呼语，或用户经历显示可能需要重新定位
→ career-materials-builder

用户要英文简历模板、英文 bullet 改写、海外求职材料或 LinkedIn 简历表达
→ career-materials-builder

用户要行动计划、投递记录、面试后等待和复盘
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
2026-07-01 / jd-resume-patch v0.2.0
- 新增能力聚焦检查：先提炼 JD 最核心的 2-3 个能力，再选择用户最匹配的 2-3 个能力。
- 新增简历反馈处理：模块太多、个人总结太泛、岗位贴合度不足时，优先做删减和聚焦。
- 新增短工作年限规则：不把“做得多”当作优势，避免经历堆叠削弱重点。

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
```
