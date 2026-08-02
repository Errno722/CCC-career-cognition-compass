# 适配器与运行环境状态

CCC 不声称“适用于所有模型”。不同平台的上下文长度、文件能力、联网能力、回复限制和发布方式不同，所以这里按实际使用状态记录。

## 状态定义

| 状态 | 含义 |
| --- | --- |
| Maintainer-tested | 维护者做过人工冒烟测试或真实配置验证 |
| Contract-ready | 已有机器可读 eval 合约，但尚未自动调用模型 |
| Community testing needed | 理论可用，但需要外部用户反馈确认 |
| Experimental | 可迁移，尚未形成稳定说明 |
| Not tested | 暂未测试 |

## 当前测试口径

| 类型 | 当前状态 |
| --- | --- |
| 手工测试场景 | 22 个，见 [workbuddy/test-cases.md](../workbuddy/test-cases.md) |
| 机器可读合约 | 22 个，见 [evals/cases.json](../evals/cases.json) |
| 自动化模型行为测试 | 0 个，尚未接入模型执行器或 LLM Judge |
| 本地结构检查 | `node scripts/check-evals.mjs`、`node scripts/check-markdown-links.mjs` |
| GitHub Actions | 暂未启用；当前推送凭证缺少 `workflow` scope |

## 兼容性矩阵

| 平台 / 环境 | 状态 | 最后测试 | 覆盖 | 推荐入口 | 说明 |
| --- | --- | --- | ---: | --- | --- |
| Codex | Maintainer-tested | 2026-08-02 | 本地结构检查 | `skills/` | 适合维护 skill、prompt、文档、eval 和模板。不要放入未脱敏真实求职材料。 |
| WorkBuddy | Maintainer-tested | 2026-08-02 | 人工冒烟 + 22 个手工测试清单 | `workbuddy/system-prompt.md` | 适合国内用户作为手机和网页端 Agent 入口；完整自动行为测试尚未接入。 |
| 飞书 + WorkBuddy | Community testing needed | 2026-07-29 | 配置模板 | `workbuddy/feishu-config.md` | 推荐作为 WorkBuddy 的聊天入口，而不是单独承载完整 CCC 逻辑。 |
| ChatGPT / 普通 LLM | Contract-ready | 2026-08-02 | 22 个合约，0 个自动行为执行 | `prompts/copy-paste-prompt-cn.md` | 适合粘贴长文本、语音转文字、JD、面试回忆；需人工抽检输出质量。 |
| Claude Code | Community testing needed | - | 0/22 | `skills/` | 适合按 skill 方式迁移，目录和触发规则需按本地环境调整。 |
| DeepSeek | Community testing needed | - | 0/22 | `prompts/copy-paste-prompt-cn.md` | 建议使用精简输入和分轮对话，避免一次粘贴过长材料。 |
| Kimi | Community testing needed | - | 0/22 | `prompts/copy-paste-prompt-cn.md` | 适合长文本整理，但需要人工确认是否过早生成材料。 |
| 通义千问 | Experimental | - | 0/22 | `prompts/copy-paste-prompt-cn.md` | 可迁移，尚未建立稳定测试记录。 |
| 豆包 | Experimental | - | 0/22 | `prompts/copy-paste-prompt-cn.md` | 可迁移，建议使用短轮次和明确脱敏提醒。 |

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
