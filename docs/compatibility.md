# 适配器与运行环境状态

CCC 不声称“适用于所有模型”。不同平台的上下文长度、文件能力、联网能力、回复限制和发布方式不同，所以这里按实际使用状态记录。

## 状态定义

| 状态 | 含义 |
| --- | --- |
| Maintainer-used | 维护者实际使用或配置过该环境，但不代表完整跑完测试集 |
| Contract-ready | 已有机器可读 eval 合约，但尚未自动调用模型 |
| Community testing needed | 理论可用，但需要外部用户反馈确认 |
| Experimental | 可迁移，尚未形成稳定说明 |
| Not tested | 暂未测试 |

## 当前测试口径

| 类型 | 当前状态 |
| --- | --- |
| 手工测试场景 | 23 个，见 [workbuddy/test-cases.md](../workbuddy/test-cases.md) |
| 机器可读合约 | 23 个，见 [evals/cases.json](../evals/cases.json) |
| 已登记语义断言 | 122 条，见 [evals/rubrics.json](../evals/rubrics.json) |
| 已人工细化核心 Rubric | 15 条，见 [evals/rubrics.json](../evals/rubrics.json) |
| 确定性输出 Runner | `0.2.0`，可对已有助手回复执行字面、正则和结构检查 |
| 结果报告 Schema | `0.2.0` |
| 结果报告 | 0 份，尚未保存真实平台执行报告 |
| 总执行次数 | 0 次，由 `evals/results/` 中的报告动态计算 |
| 声明唯一覆盖 | 0/23，包含结构合法但不可复算的 `schema_only` 报告 |
| Runner 执行覆盖 | 0/23，只统计 `runner_generated` 和 `recomputed` 报告 |
| 公开平台覆盖 | 0/23，只统计非本地 adapter 的 Runner 执行结果 |
| 公开唯一通过 | 0/23，公开平台中至少一次确定性通过才计入 |
| 公开已验证通过 | 0/23，公开平台中只有 `recomputed` 结果计入 |
| 语义评审 | 0 次，尚未接入 LLM Judge |
| 评估对象 | `assistant_output_only`，不对完整对话记录做字符串断言 |
| 本地检查 | `node scripts/check-evals.mjs`、`node scripts/check-markdown-links.mjs`、`node scripts/test-deterministic-runner.mjs` |
| GitHub Actions | 暂未启用；当前推送凭证缺少 `workflow` scope |

## 兼容性矩阵

| 平台 / 环境 | 状态 | 测试计划 | 公开覆盖 | 公开通过 | 公开验证 | 模型 / 版本 | 证据 | 推荐入口 |
| --- | --- | ---: | ---: | ---: | ---: | --- | --- | --- |
| Codex | Maintainer-used | 23 | 0 | - | - | 未记录 | 本地结构检查通过，尚无真实平台结果报告 | `skills/` |
| WorkBuddy | Maintainer-used | 23 | 0 | - | - | 未记录 | 有部署与人工冒烟经验，尚无 23 例正式执行记录 | `workbuddy/system-prompt.md` |
| 飞书 + WorkBuddy | Community testing needed | 23 | 0 | - | - | 未记录 | 只有配置模板，尚未形成公开测试记录 | `workbuddy/feishu-config.md` |
| ChatGPT / 普通 LLM | Contract-ready | 23 | 0 | - | - | 未记录 | 有 23 个机器可读合约和确定性输出 runner，尚无真实执行报告 | `prompts/copy-paste-prompt-cn.md` |
| Claude Code | Community testing needed | 23 | 0 | - | - | 未记录 | 目录结构可迁移，需社区测试触发规则 | `skills/` |
| DeepSeek | Community testing needed | 23 | 0 | - | - | 未记录 | 建议使用精简输入和分轮对话，尚无执行报告 | `prompts/copy-paste-prompt-cn.md` |
| Kimi | Community testing needed | 23 | 0 | - | - | 未记录 | 适合长文本整理，但需要人工确认是否过早生成材料 | `prompts/copy-paste-prompt-cn.md` |
| 通义千问 | Experimental | 23 | 0 | - | - | 未记录 | 可迁移，尚未建立稳定测试记录 | `prompts/copy-paste-prompt-cn.md` |
| 豆包 | Experimental | 23 | 0 | - | - | 未记录 | 可迁移，建议使用短轮次和明确脱敏提醒 | `prompts/copy-paste-prompt-cn.md` |

## 迁移原则

- 不要求用户先写结构化表格；允许混乱输入。
- 首轮回复要短，最多问 1-3 个问题。
- 不要一上来生成完整简历。
- 涉及项目表达时，先检查项目事实是否足够。
- 涉及英文简历时，不要逐句翻译中文简历。
- 涉及隐私、offer、合同、薪资、签证、医疗、法律时，只做提醒和风险边界。

## 待补

- 公开 15-30 秒 Demo GIF。
- 记录每个平台的完整测试日期、模型版本和通过数量。
- 保存各平台助手输出，用确定性 runner 生成真实行为测试报告。
- 后续再接入 LLM Judge 或人工语义评审。
- 在拥有 `workflow` 权限后启用 GitHub Actions。
