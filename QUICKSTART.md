# CCC Quickstart

这份文件帮助你快速选择 CCC 的使用入口。CCC 是 Career Cognition Compass 的缩写，它不是单纯的简历生成器，而是帮助使用者从混乱求职状态中整理经历、方向、JD、面试复盘、Offer 决策和下一步行动。

使用前请先脱敏，不要提交电话、邮箱、身份证、薪资截图、Offer、合同、公司内部资料或完整面试记录。

如果你只想下载文件包，不想翻目录，可以看：[DOWNLOADS.md](DOWNLOADS.md)。

## 我只想马上试用

适合：不想部署、不想看完整仓库，只想把 CCC 放进常用大模型里试一下。

步骤：

1. 打开你常用的大模型。
2. 复制 [CCC 中文 Prompt](prompts/copy-paste-prompt-cn.md) 的内容。
3. 粘贴到新对话里。
4. 继续发送你的求职状态，可以很乱。

英文使用者可以复制 [CCC English Prompt](prompts/copy-paste-prompt-en.md)。

## 我想用 Codex / Claude Code

适合：想把 CCC 当成可迁移的 Skill / Agent 工作流，或者想继续维护这个项目。

入口：

```text
skills/
SKILLS.md
```

推荐先用完整流程：

```text
Use $career-cognition-compass.

我现在很乱，gap 一年多，之前做过运营，也学过一点 AI，不知道还能投什么。
```

如果任务很明确，可以再调用拆分 Skill。完整说明见：[SKILLS.md](SKILLS.md)。

## 我想部署到 WorkBuddy

适合：想做一个国内可访问、手机端也能用的求职智能体。

最小部署只需要复制：

```text
workbuddy/system-prompt.md
```

步骤：

1. 在 WorkBuddy 新建对话型 Agent。
2. 名称填：`CCC Career Cognition Compass`。
3. 把 [workbuddy/system-prompt.md](workbuddy/system-prompt.md) 全文复制到系统提示词。
4. 设置开场白。
5. 用 [workbuddy/test-cases.md](workbuddy/test-cases.md) 测试。

完整说明见：[workbuddy/mainland-user-guide.md](workbuddy/mainland-user-guide.md)。

## 我不知道选哪个入口

| 情况 | 推荐入口 |
| --- | --- |
| 我只是自己试一下 | 普通大模型 + [CCC 中文 Prompt](prompts/copy-paste-prompt-cn.md) |
| 我想用英文 | 普通大模型 + [CCC English Prompt](prompts/copy-paste-prompt-en.md) |
| 我想维护和改造这个项目 | Codex / Claude Code + [skills/](skills/) |
| 我想给国内用户一个手机可用入口 | [WorkBuddy](workbuddy/README.md) |
| 我想看效果 | [DEMO.md](DEMO.md) |
| 我想知道平台差异 | [docs/compatibility.md](docs/compatibility.md) |

## 快速体验场景

只保留 4 个代表场景。完整测试见 [workbuddy/test-cases.md](workbuddy/test-cases.md) 和 [usability/](usability/)。

### 1. 混乱开局

```text
我现在很乱，gap 一年多，之前做过运营，也学过一点 AI，不知道还能投什么。
```

### 2. 项目经历

```text
我搭过一个 Shopify 网站，但没有销售，也不知道这算不算项目。
```

### 3. 投递 / 面试没结果

```text
我投了 12 个产品运营和项目执行岗位，有 3 个 HR 回复，面了 2 个都没到二面。请先看漏斗和样本量，不要直接说方向错了。
```

### 4. Offer 决策

```text
我收到一个 Offer，但不确定要不要接。base、奖金、通勤和 deadline 都有点纠结，请先帮我拆关键未知项。
```

好的结果应该是：先整理事实和缺口，不编造经历，不一上来生成完整简历，并给出少量下一步动作。

## 继续上下文

如果一轮对话很长，或者你想换到另一个模型继续，可以让 CCC 输出：

```text
请给我一份 CCC 继续上下文。
```

这样只需要复制当前状态、主线、已确认事实、可复用卡片、未确认信息和下一步，不必复制完整聊天记录。

## 维护者检查

如果你在维护仓库，可以运行：

```bash
node scripts/check-evals.mjs
node scripts/check-shared-rules.mjs
node scripts/check-markdown-links.mjs
node scripts/test-deterministic-runner.mjs
node scripts/test-generate-smoke-report.mjs
```
