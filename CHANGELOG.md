# Changelog

CCC 使用日期型版本记录。这里记录面向使用者能感知到的主要变化；更细的 skill 内部变化见 [SKILLS.md](SKILLS.md)。

## 2026-08-07

### Offer 决策支持

- 新增 `offer-decision-support` skill，用于单 Offer vs 继续求职、多 Offer 对比、新 Offer vs 当前工作、Offer deadline、风险识别、谈薪 / 谈条件和接受 / 拒绝 / 继续求职后的闭环。
- Offer 决策先检查信息完整度、红线、关键未知项和用户当前优先级，再进行比较；不使用机械总分，不替用户做最终选择。
- 薪酬分析要求区分固定收入、有条件收入、不确定收入、股权、补贴和口头承诺，不把不确定奖金或未写入书面的条件当固定收入。
- 谈薪 / 谈条件流程只基于真实条件、职责范围、deadline 和用户偏好，不虚构竞品 offer 或市场薪资，不承诺谈判结果。
- 接受、拒绝或继续求职后，输出当前求职周期的下一批 JD 筛选条件，避免下一轮继续被同类不合适机会消耗。
- 机器可读 Eval 增加 `single-offer-decision-001`、`multi-offer-comparison-001` 和 `offer-negotiation-closure-001`；当前手工测试和机器可读合约为 36 个，已登记语义断言为 208 条，核心细化 Rubric 为 101 条。

### 轻量入口与省 token

- 新增 [prompts/copy-paste-prompt-lite-cn.md](prompts/copy-paste-prompt-lite-cn.md)，作为普通 LLM、手机端和第一次试用的轻量复制版。
- 新增 [workbuddy/system-prompt-lite.md](workbuddy/system-prompt-lite.md)，作为 WorkBuddy 默认部署入口；完整 [workbuddy/system-prompt.md](workbuddy/system-prompt.md) 继续保留给需要完整规则的场景。
- 新增 [DOWNLOADS.md](DOWNLOADS.md) 和 `scripts/package-release.mjs`，用于生成轻量包、WorkBuddy 包和完整公开包，方便上传到 GitHub Release。
- README、Quickstart、WorkBuddy 部署说明和兼容性矩阵改为优先推荐轻量入口，降低首次使用 token 成本。
- 将跨模型继续统一为 `CCC 继续上下文`，只保留当前状态、本轮主线、已确认事实、可复用卡片、未确认信息和下一步，避免复制整段聊天。
- 共享规则检查加入轻量 prompt 和 WorkBuddy lite prompt，防止轻量入口与完整版规则漂移。

## 2026-08-04

### 共享规则与输出收束

- 新增 `core/focus-control.md`、`core/certainty-calibration.md` 和 `core/profile-persistence.md`，把发散收束、确定性表达校准和资料卡持久化边界作为共享规则维护。
- 新增 `scripts/check-shared-rules.mjs`，检查核心 skills、通用 prompt 和 WorkBuddy prompt 是否声明同一组共享规则版本。
- `career-cognition-compass`、`career-direction-clarifier`、`career-materials-builder`、`jd-company-prep`、`interview-review-miner`、通用 prompt 和 WorkBuddy prompt 对齐输出优先级：用户请求的交付物、必要门禁、一个主卡片、最多一个辅助补丁/提醒、一个下一步，其余暂存。
- 纵向体验小修：普通用户回复优先使用“本轮主线 / 暂存 / 下一步 / 如果要继续”等自然标签，不直接暴露 `focus_control`、`candidate_interview_profile_patch` 等内部字段名；暂存分支增加可继续的短标签。
- `focus-control` 和 `profile-persistence` 共享规则升级到 v1.1；Eval 新增内部字段泄露负向 Rubric，确保普通回复不因用户体验修正而被旧断言误判。

### 真实平台测试流程

- 新增 `evals/inputs/`，提供真实平台 Smoke Report 输入模板和安全说明。
- 新增 `scripts/generate-smoke-report.mjs`，用于把手动收集的真实平台助手回复转换为 `verification_level: recomputed` 的结果报告。
- Smoke 生成流程会检查占位符、5 个必测 case、原始输入一致性、非空助手回复、40 位 `source_commit`、干净工作区、`source_commit === HEAD`、提交内 `evals/cases.json` 与结果 `suite_sha256` 匹配和输出路径，避免把模板或错误输入当作真实报告。
- 新增 `scripts/test-generate-smoke-report.mjs`，在临时 Git 仓库中验证模板占位符、缺失/重复 case、输入不一致、空回复、非法 commit、脏工作区、路径错误、runner 失败和 check 失败删除等路径。
- `.gitignore` 默认忽略 `evals/inputs/*.input.json`，防止完整助手回复被误提交。
- 当前尚未生成正式真实平台报告，公开平台覆盖、公开唯一通过和公开已验证通过仍为 0/36。

### 投递复盘

- `job-search-plan-review` 增加面试邀约信号画像：根据用户已收到的面试邀请、邀约 JD、无回复岗位、投递基数、渠道和简历版本，总结哪些岗位族群和 JD 特征更容易得到回复。
- 面试邀约信号画像现在区分邀约构成、本批次观察回复率和下一批未来假设；必须展示分子/分母、样本量等级、混杂因素和简历版本边界，不把观察回复率写成未来概率。
- 机器可读 Eval 更新 `interview-invitation-signals-001`，增加分母、混杂因素、简历版本隔离和未来概率边界相关语义断言。

### 面试表达

- 新增发散收束模式：用户同时发散到多个岗位、技能、材料、平台、教程或计划时，先归类分支，只推进 1 个本轮主线，其他暂存，避免输出巨大清单。
- 新增近期工作行为定位：当用户提到最近实际在做、愿意继续做或做完更有掌控感的工作任务时，输出定位假设；明确这看的是工作任务，不是兴趣爱好，也不是最终职业结论。
- `interview-review-miner` 增加面试表达结构卡：从 JD 契合卖点出发，训练一句话观点、3-4 条 bullet、清楚的 Situation、条件分支式问题解决和第二语言自然表达。
- `jd-company-prep` 增加面试表达准备卡：拆 JD 后不仅给面试问题，也给对应卖点和短回答结构，避免候选人面试时越说越散。
- `career-materials-builder`、`jd-company-prep` 和 `interview-review-miner` 增加自我介绍 / 面试答案框架规则：默认给一二级框架和展开逻辑，不给逐字稿；自我介绍聚焦 2 个岗位契合能力，并先抽象 3-4 条“能力 + 简单验证”。
- `jd-company-prep` 增加面试反问卡：默认给 2-4 个岗位级小问题，围绕岗位前 3 个月期望、后续流程、成长路径和关键能力，不默认问公司战略或行业大问题。
- `career-materials-builder`、`jd-company-prep`、`interview-review-miner`、WorkBuddy 和通用 Prompt 增加语气校准：简历、profile、面试准备和英文材料避免过度肯定，只把有证据的能力写成确定表达。
- 英文面试和英文能力岗位准备新增自然表达规则：不逐句硬翻译中文，不把 working communication 包装成 native / fluent，优先给 Plain English、Natural phrases 和可说出口的短框架。
- 新增焦虑降噪规则：用户焦虑、刷社媒更慌、反复刷新或比较别人时，输出触发源、可控/不可控、信息摄入边界和一个 5-20 分钟动作，不用鸡汤式安慰替代行动。
- 新增 Token 节省模式：用户提到 token、上下文太长、手机端超时、跨模型复制或回复太长时，复用已有卡片，只输出差异补丁、替换段落和下一步。
- 机器可读 Eval 增加 `interview-expression-structure-001`、`self-intro-framework-001`、`interview-reverse-questions-001`、`english-interview-tone-calibration-001`、`anxiety-noise-reduction-001`、`token-saving-mode-001`、`recent-work-task-positioning-001` 和 `over-divergence-focus-001` 用例；该轮手工测试和机器可读合约为 33 个，已登记语义断言为 193 条，核心细化 Rubric 为 86 条。

### 面试复盘

- `interview-review-miner` 将候选人面试资料卡升级为 base / role_family / patch 三层结构；普通用户回复默认展示“候选人面试资料卡补丁”。
- 候选人面试资料卡新增持久化边界：普通 LLM / WorkBuddy 对话默认说明卡片只存在于本轮回复，不声称已保存；跨轮使用时由用户带回上一版资料卡。
- 二面、三面或新岗位族群准备时，区分本轮继承、不继承、需要重置的侧重点，避免把上一轮岗位特有反馈带入新岗位。
- `interview-review-miner` 增加复盘收束提醒：每次面试反馈复盘后，提醒用户不要停留在已发生的事太久，而是转向下一次机会或一个查缺补漏动作。
- 机器可读 Eval 增加 `candidate-profile-inheritance-001`，验证资料卡继承、角色族群隔离、来源保留、`output_only` 标记和单次反馈边界。

### JD 拆解

- `jd-company-prep` 增加 JD 岗位类型判断卡，先判断 JD 是偏执行、运营、产品、项目协调、数据、技术还是混合岗，再给准备重点。
- `jd-resume-patch` 的 JD 分析卡同步增加岗位类型判断，避免只按岗位标题改简历或准备面试。
- 机器可读 Eval 增加 `classifies_jd_role_type` 语义断言。

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
- 将面试反馈复盘与面试官角色回答侧重点拆成两个独立测试场景，该轮手工测试和机器可读合约均为 23 个。
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
- 结果统计按 `schema_only`、`runner_generated` 和 `recomputed` 拆分，并新增已验证 Runner 通过计数。
- 非本地 adapter 默认生成唯一 `run_id`；真实平台结果需要提供 `source_commit` 和 `model`。
- 修复单 case 真实平台输入仍默认使用 `local-deterministic-eval` 的问题，统一由 runner 按 adapter 生成默认 `run_id`。
- `scripts/check-evals.mjs` 会校验结果报告目录 adapter 与报告内 adapter 一致，并要求 `runner_generated` / `recomputed` 使用当前 runner 版本。
- 统计口径新增声明覆盖、Runner 执行覆盖和公开平台覆盖；`schema_only` 与 `local` 不再抬高公开平台兼容性数据。
- 失败 fixture 必须声明非空且不重复的 `expected_failed_checks`。
- 将确定性 runner 和结果报告 schema 升级到 `0.2.0`，避免新版报告结构继续沿用旧版 `0.1.0` 标识。
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
