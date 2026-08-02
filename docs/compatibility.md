# 平台兼容性

CCC 不声称“适用于所有模型”。不同平台的上下文长度、文件能力、联网能力、回复限制和发布方式不同，所以这里按实际使用状态记录。

## 状态定义

| 状态 | 含义 |
| --- | --- |
| Tested | 已按仓库测试用例跑过基础场景 |
| Partial | 可使用，但需要压缩 prompt 或人工调整 |
| Experimental | 理论可迁移，尚未形成稳定说明 |
| Not tested | 暂未测试 |

## 兼容性矩阵

| 平台 | 状态 | 推荐入口 | 说明 |
| --- | --- | --- | --- |
| Codex | Tested | `skills/` | 适合维护 skill、prompt、文档、eval 和模板。不要放入未脱敏真实求职材料。 |
| Claude Code | Partial | `skills/` | 适合按 skill 方式迁移，需按本地规则调整目录结构。 |
| 普通 LLM | Tested | `prompts/copy-paste-prompt-cn.md` | 适合粘贴长文本、语音转文字、JD、面试回忆。 |
| WorkBuddy | Tested | `workbuddy/system-prompt.md` | 适合国内用户作为手机和网页端 Agent 入口。 |
| 飞书 | Partial | `workbuddy/feishu-config.md` | 推荐作为 WorkBuddy 的聊天入口，而不是单独承载完整 CCC 逻辑。 |
| DeepSeek | Partial | `prompts/copy-paste-prompt-cn.md` | 建议使用精简输入和分轮对话，避免一次粘贴过长材料。 |
| Kimi | Partial | `prompts/copy-paste-prompt-cn.md` | 适合长文本整理，但需要人工确认是否过早生成材料。 |
| 通义千问 | Experimental | `prompts/copy-paste-prompt-cn.md` | 可迁移，尚未建立稳定测试记录。 |
| 豆包 | Experimental | `prompts/copy-paste-prompt-cn.md` | 可迁移，建议使用短轮次和明确脱敏提醒。 |

## 迁移原则

- 不要求用户先写结构化表格；允许混乱输入。
- 首轮回复要短，最多问 1-3 个问题。
- 不要一上来生成完整简历。
- 涉及项目表达时，先检查项目事实是否足够。
- 涉及英文简历时，不要逐句翻译中文简历。
- 涉及隐私、offer、合同、薪资、签证、医疗、法律时，只做提醒和风险边界。

## 待补

- 公开 60 秒 Demo GIF。
- 记录每个平台的测试日期。
- 把 `evals/cases.json` 的核心案例映射到各平台测试结果。
