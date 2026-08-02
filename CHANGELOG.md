# Changelog

CCC 使用日期型版本记录。这里记录面向使用者能感知到的主要变化；更细的 skill 内部变化见 [SKILLS.md](SKILLS.md)。

## 2026-08-02

### 产品化与可验证性

- 将 README 改成更短的产品落地页，保留价值主张、快速开始、Before / After、核心能力和文档导航。
- 将原长版说明迁移到 [docs/full-guide.md](docs/full-guide.md)，避免 README 首屏过载。
- 新增 [docs/compatibility.md](docs/compatibility.md)，按 Maintainer-used / Contract-ready / Community testing needed / Experimental 记录平台适配状态。
- 新增 [evals/cases.json](evals/cases.json)，把核心手工测试整理成机器可读行为合约，并升级为 `schema_version: 0.3.0` 的 suite 结构。
- 新增 [evals/schema.json](evals/schema.json) 和 [evals/rubrics.json](evals/rubrics.json)，明确合约结构、评估对象和语义断言评分口径。
- 将 Eval 断言拆成 `literal_all_of`、`literal_any_of`、`literal_not_contains`、`regex_not_contains`、`structural_assertions`、`semantic_assertions` 和 `semantic_must_not`，避免把语义行为误写成脆弱字符串检查。
- 明确 Eval 的 `evaluation_target` 为 `assistant_output_only`，避免隐私测试误判完整对话记录。
- 将 JD 分析案例中的占位符替换成完整虚构 JD，避免模型因缺少 JD 内容而被错误判定失败。
- 新增 `scripts/check-evals.mjs` 和 `scripts/check-markdown-links.mjs`，用于本地验证 eval 合约和 Markdown 本地链接。
- `scripts/check-evals.mjs` 开始真正按 [evals/schema.json](evals/schema.json) 校验 suite 结构，并检查重复断言、正负向 rubric 类型、orphan rubric 和结果报告统计。
- 将面试反馈复盘与面试官角色回答侧重点拆成两个独立测试场景，当前手工测试和机器可读合约均为 23 个。
- 将公开测试口径调整为“已登记语义断言 122 / 已人工细化核心 Rubric 15”，避免把模板 rubric 夸大为全部精修评分标准。
- 新增 [evals/result-schema.json](evals/result-schema.json)，用于约束真实平台执行结果报告。
- 新增 `scripts/run-deterministic-eval.mjs`，可以对已有助手回复执行 `literal_all_of`、`literal_any_of`、`literal_not_contains`、`regex_not_contains`、`max_questions` 和 `max_characters` 检查，不调用模型。
- 新增 `scripts/test-deterministic-runner.mjs` 和 `evals/fixtures/`，提供通过与预期失败示例，用于验证确定性 runner 本身。
- 明确确定性 runner 退出码：全部通过为 `0`，确定性断言失败为 `1`，输入或 schema 错误为 `2`。
- 确定性结果报告新增 `runner_version`、`adapter`、`model`、`created_at`、`assistant_output_sha256` 和 metrics；默认不保存完整助手输出，避免把敏感内容写入公开结果。
- 确定性结果报告新增 `suite_sha256`、`source_commit` 和 `verification_level`，用于绑定执行时的合约来源和结果可信度。
- 抽出 `scripts/lib/schema-validator.mjs` 和 `scripts/lib/deterministic-eval.mjs`，让 runner、fixture 测试和 eval 检查共用同一套校验逻辑。
- runner 输出前会用 [evals/result-schema.json](evals/result-schema.json) 自检；fixture 测试也会验证 runner 输出 schema。
- `scripts/check-evals.mjs` 增加 `run_id` 唯一性、空结果报告拒绝、suite hash 匹配、有 `assistant_output` 时复算确定性结果，以及“总执行次数 / 唯一覆盖 / 唯一通过”统计。
- 修正隐私正则误放在 `greeting-001` 的问题，移动到 `privacy-001`。
- fixture 支持 `expected_failed_checks`，避免“因为别的断言失败”也被误判为负向 fixture 有效。
- 结果统计按 `schema_only`、`runner_generated` 和 `recomputed` 拆分，并新增已验证唯一通过计数。
- 非本地 adapter 默认生成唯一 `run_id`；真实平台结果需要提供 `source_commit` 和 `model`。
- 字面匹配增加 Unicode / 空白 / 大小写标准化；隐私禁止项同时检查原始输出和标准化输出。
- 隐私 case 增加手机号和邮箱正则检查，并新增混淆手机号 / 邮箱的预期失败 fixture。
- 将 case 23 补充为带 Shopify 最小事实卡的输入，避免只测试面试官角色框架而无法检查事实一致性。
- 将 suite schema 升级为 `0.3.0`，从 suite 中移除手填的自动化结果数量，改为从 `evals/results/` 的报告动态计算。
- 强化 `scripts/check-evals.mjs`：检查 schema 未支持关键字、全量 rubric 基础结构、被引用 draft rubric、结果报告结构和确定性通过状态一致性。
- 暂不启用 GitHub Actions；当前推送凭证需要额外 `workflow` 权限才能创建 workflow 文件。

### 面试准备

- 新增面试官角色回答侧重点：同一个事实可以按 HR、用人经理、业务、技术、高管、Founder、跨部门或同级面试官调整前置重点，但不能改变事实或编造经历。
- `interview-review-miner` 增加面试官角色回答卡，用于面试复盘和下一轮准备。
- `jd-company-prep` 增加面试官角色准备卡，用于 JD / 公司面试前准备。

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
