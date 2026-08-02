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
| 自动化模型行为测试 | 0 个，尚未接入模型执行器或 LLM Judge |
| 评估对象 | `assistant_output_only`，不对完整对话记录做字符串断言 |
| 本地结构检查 | `node scripts/check-evals.mjs`、`node scripts/check-markdown-links.mjs` |
| GitHub Actions | 暂未启用；当前推送凭证缺少 `workflow` scope |

## 兼容性矩阵

| 平台 / 环境 | 状态 | 测试计划 | 已记录执行 | 已记录通过 | 模型 / 版本 | 证据 | 推荐入口 |
| --- | --- | ---: | ---: | ---: | --- | --- | --- |
| Codex | Maintainer-used | 23 | 0 | - | 未记录 | 本地结构检查通过，尚无完整模型行为报告 | `skills/` |
| WorkBuddy | Maintainer-used | 23 | 0 | - | 未记录 | 有部署与人工冒烟经验，尚无 23 例正式执行记录 | `workbuddy/system-prompt.md` |
| 飞书 + WorkBuddy | Community testing needed | 23 | 0 | - | 未记录 | 只有配置模板，尚未形成公开测试记录 | `workbuddy/feishu-config.md` |
| ChatGPT / 普通 LLM | Contract-ready | 23 | 0 | - | 未记录 | 有 23 个机器可读合约，尚未接入模型执行器 | `prompts/copy-paste-prompt-cn.md` |
| Claude Code | Community testing needed | 23 | 0 | - | 未记录 | 目录结构可迁移，需社区测试触发规则 | `skills/` |
| DeepSeek | Community testing needed | 23 | 0 | - | 未记录 | 建议使用精简输入和分轮对话，尚无执行报告 | `prompts/copy-paste-prompt-cn.md` |
| Kimi | Community testing needed | 23 | 0 | - | 未记录 | 适合长文本整理，但需要人工确认是否过早生成材料 | `prompts/copy-paste-prompt-cn.md` |
| 通义千问 | Experimental | 23 | 0 | - | 未记录 | 可迁移，尚未建立稳定测试记录 | `prompts/copy-paste-prompt-cn.md` |
| 豆包 | Experimental | 23 | 0 | - | 未记录 | 可迁移，建议使用短轮次和明确脱敏提醒 | `prompts/copy-paste-prompt-cn.md` |

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
- 接入模型执行器，生成真实行为测试报告。
- 在拥有 `workflow` 权限后启用 GitHub Actions。
