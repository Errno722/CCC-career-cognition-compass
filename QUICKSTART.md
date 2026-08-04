# CCC Quickstart

这份文件帮助你快速选择 CCC 的使用入口。CCC 是 Career Cognition Compass 的缩写，它不是单纯的简历生成器，而是帮助使用者从混乱求职状态中整理经历、方向、JD、简历、面试复盘和下一步行动。

使用前请先脱敏，不要提交电话、邮箱、身份证、薪资截图、offer、合同、公司内部资料或完整面试记录。

## 我只想马上试用

适合：不想部署、不想看完整仓库，只想把 CCC 放进常用大模型里试一下。

步骤：

1. 打开你常用的大模型。
2. 复制 [prompts/copy-paste-prompt-cn.md](prompts/copy-paste-prompt-cn.md) 的内容。
3. 粘贴到新对话里。
4. 继续发送你的求职状态，可以很乱。

示例：

```text
我现在很乱，gap 一年多，之前做过运营，也学过一点 AI，不知道还能投什么。
```

## 我想用 Codex / Claude Code

适合：想把 CCC 当成可迁移的 skill / agent 工作流，或者想继续维护这个项目。

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

如果任务很明确，可以用拆分 skill：

```text
Use $career-project-experience-miner.

我做过一些项目，但说不清它们有什么价值。请先帮我做项目总表，再选 1 个项目深挖成事实卡。
```

```text
Use $interview-review-miner.

我刚面试完，只记得几个关键词。面试官反馈说我业务经验不足，请帮我复盘。
```

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

## 我想接入飞书

适合：想把飞书作为 CCC 的聊天入口。

推荐架构：

```text
CCC System Prompt
↓
WorkBuddy Agent
↓
飞书机器人 / 飞书群 / 飞书私聊
```

配置模板见：[workbuddy/feishu-config.md](workbuddy/feishu-config.md)。

## 我不知道选哪个入口

可以这样判断：

| 情况 | 推荐入口 |
| --- | --- |
| 我只是自己试一下 | 普通大模型 + `copy-paste-prompt-cn.md` |
| 我想维护和改造这个项目 | Codex / Claude Code + `skills/` |
| 我想给国内用户一个手机可用入口 | WorkBuddy |
| 我想在飞书里用 | WorkBuddy + 飞书配置 |
| 我只想看效果 | [DEMO.md](DEMO.md) |
| 我想知道平台差异 | [docs/compatibility.md](docs/compatibility.md) |

## 我想分享这个项目

适合：想把 CCC 发到 GitHub、社交平台、公众号、社群或个人主页。

可以直接复制 [SHARE.md](SHARE.md) 里的：

- 一句话介绍；
- GitHub About 描述；
- Topics；
- 小红书 / 公众号短文案；
- 群聊转发版；
- 社交预览图文案。

## 最小测试

无论使用哪个入口，都可以先测这 5 句话：

```text
你好
```

```text
gap 一年 运营 ai 转行 不知道投什么
```

```text
我搭过一个 Shopify 网站，但没有销售，也不知道这算不算项目。
```

```text
我刚面试完，面试官反馈说我 B 端产品经验不足。
```

```text
我这两天投了 30 份简历，还没有面试消息，现在空档期不知道该做什么，总想刷新招聘软件。
```

好的结果应该是：先整理事实和缺口，不编造经历，不一上来生成完整简历，并给出少量下一步动作。

如果你在维护仓库，可以运行机器可读合约检查：

```bash
node scripts/check-evals.mjs
node scripts/check-shared-rules.mjs
node scripts/check-markdown-links.mjs
node scripts/test-deterministic-runner.mjs
node scripts/test-generate-smoke-report.mjs
```
