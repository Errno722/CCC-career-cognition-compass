# Changelog

CCC 使用日期型版本记录。这里记录面向使用者能感知到的主要变化；更细的 skill 内部变化见 [SKILLS.md](SKILLS.md)。

## 2026-08-02

### 产品化与可验证性

- 将 README 改成更短的产品落地页，保留价值主张、快速开始、Before / After、核心能力和文档导航。
- 将原长版说明迁移到 [docs/full-guide.md](docs/full-guide.md)，避免 README 首屏过载。
- 新增 [docs/compatibility.md](docs/compatibility.md)，按 Maintainer-tested / Contract-ready / Community testing needed / Experimental 记录平台适配状态。
- 新增 [evals/cases.json](evals/cases.json)，把 22 个核心手工测试整理成机器可读行为合约。
- 将 Eval 断言拆成 `literal_contains`、`literal_not_contains`、`structural_assertions`、`semantic_assertions` 和 `semantic_must_not`，避免把语义行为误写成字符串检查。
- 新增 `scripts/check-evals.mjs` 和 `scripts/check-markdown-links.mjs`，用于本地验证 eval 合约和 Markdown 本地链接。
- 暂不启用 GitHub Actions；当前推送凭证需要额外 `workflow` 权限才能创建 workflow 文件。

## 2026-07-29

### 传播与开源包装

- 新增 [SHARE.md](SHARE.md)，集中整理一句话介绍、GitHub About、Topics、社交平台文案和预览图文案。
- 优化 README 顶部信息，让第一次打开仓库的人更快理解 CCC 的定位。
- 在 Quickstart 中增加分享入口，方便使用者直接复制传播素材。

### WorkBuddy / 飞书入口

- 将国内 Agent 入口聚焦到 WorkBuddy。
- 新增 [WorkBuddy 大陆用户部署说明](workbuddy/mainland-user-guide.md)。
- 新增 [飞书 × WorkBuddy 配置模板](workbuddy/feishu-config.md)。
- 移除不再维护的 Coze / 公众号公开说明。
- 移除不再需要的本地 Web App。

### 求职节奏

- 新增投递后空档期计划：投完简历但还没有面试或反馈时，复盘投递质量、整理 JD 共性、补一个可复用资产，并设置 5-20 分钟小动作。
- 明确纯面试等待、询问 HR 进度和跟进话术属于 `job-search-plan-review`。

### 面试复盘

- 新增 `interview-review-miner`，支持面试关键词、不完整问题和面试官反馈整理。
- 将“xx 经验不足”等反馈拆成来源类型、可信度、重复状态和动作等级，避免单次反馈直接污染主简历或投递方向。

### 项目经历深挖

- 新增 `career-project-experience-miner`，把项目经历作为一级对象处理。
- 增加项目状态：`DISCOVERED`、`PARTIALLY_MAPPED`、`EVIDENCE_READY`。
- 明确 `EVIDENCE_READY` 不等于必须有量化数据；仓库、截图、文档、运行结果、暂停原因和边界说明也可以成为证据。
- 增加临时草稿模式：赶投递时可输出保守表达，但必须标明事实依据、未知字段和不能夸大的内容。

### 简历与材料

- 新增 JD 简历修改补丁，避免每次重写整份简历。
- 增加版本隔离检查，避免上一份 JD 定制简历的偏向污染下一份简历。
- 增加通用简历中的专业技能市场语言转译。
- 增加英文简历模板和英文 bullet 改写规则，不逐句翻译中文简历。

## 2026-07-28

### 初始公开版本

- 发布 CCC 核心 README、skills、通用 prompt 和 demo。
- 明确 CCC 不是单纯简历生成工具，而是求职澄清与行动辅导流程。
- 覆盖混乱输入、Gap、转行转岗、校招、在职换工作、目标公司准备、JD 分析、简历思路、行动计划和复盘。
