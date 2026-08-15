# CCC 更新指南

这页说明的是：你已经在用 CCC 了，后面项目更新时，应该怎么换到新版。

CCC 的不同使用方式，更新方法不一样。先看你属于哪一种。

## 我只是复制 Lite Prompt 使用

适合：ChatGPT、Claude、DeepSeek、通义千问、Kimi、豆包、Gemini 等普通聊天模型。

你需要更新的是这一份文件：

```text
prompts/copy-paste-prompt-lite-cn.md
```

如果你使用英文入口，更新：

```text
prompts/copy-paste-prompt-lite-en.md
```

更新步骤：

1. 打开最新版 Lite Prompt。
2. 复制全文。
3. 到你正在使用的大模型里，新开一个对话，粘贴新版 Prompt。
4. 如果你之前已经有职业画像卡、项目卡、候选人面试资料卡或 Offer 决策卡，把上一版卡片一起发给新对话。

注意：旧对话不会自动变成新版。普通聊天模型通常不会知道你已经换了新版本。

## 我使用 WorkBuddy

适合：把 CCC 做成一个国内可访问的对话型 Agent。

最常用更新文件：

```text
workbuddy/system-prompt-lite.md
```

如果你使用完整版，再更新：

```text
workbuddy/system-prompt.md
```

更新步骤：

1. 下载或打开最新版本的 WorkBuddy Prompt。
2. 进入 WorkBuddy 后台，找到系统提示词 / System Prompt / 角色设定一类位置。
3. 用新版内容替换旧版内容。
4. 保存并重新测试。
5. 用 2-3 个你常用场景确认回复是否正常。

建议测试：

```text
我现在很乱，gap 一年多，之前做过运营，也学过一点 AI，不知道还能投什么。

我在职，但下班后很累，只想小规模看看市场，不知道要不要重写简历。

我刚面试完，只记得几个关键词，帮我做复盘。
```

如果你自己配置了知识库、变量或记忆字段，更新系统提示词不会自动更新这些内容。需要你手动检查是否还适合新版规则。

## 我从 GitHub Release 下载 ZIP

适合：想拿到打包好的文件，不想逐个复制。

常见文件：

```text
CCC-lite-pack-vX.Y.Z.zip
CCC-workbuddy-pack-vX.Y.Z.zip
CCC-full-pack-vX.Y.Z.zip
```

更新步骤：

1. 查看最新版本号。
2. 下载最新版本 ZIP。
3. 解压后使用新版文件。
4. 不要把旧版 Prompt 和新版 Prompt 混在同一个 Agent 里。

普通用户优先下载 Lite Pack。WorkBuddy 用户下载 WorkBuddy Pack。开发者或想研究完整项目的人再下载 Full Pack。

## 我从网盘下载

网盘是 GitHub Release 的国内下载镜像。版本以项目里的 `VERSION` 和 GitHub Release 为准。

更新步骤：

1. 打开网盘文件夹。
2. 先看 `latest.txt`。
3. 下载最新版本号的 ZIP。
4. 如果你只是普通用户，优先下载 `CCC-lite-pack-vX.Y.Z.zip`。
5. 如果你部署 WorkBuddy，下载 `CCC-workbuddy-pack-vX.Y.Z.zip`。

不要只看文件修改时间，优先看版本号。

## 我使用 Codex / Claude Code 里的 Skills

适合：你想使用可拆分的 `skills/` 目录，而不是只复制一个 Prompt。

更新步骤：

1. 获取仓库最新版本。
2. 替换或同步 `skills/`、`prompts/`、`core/` 和需要的平台目录。
3. 查看 [SKILLS.md](../SKILLS.md) 和 [CHANGELOG.md](../CHANGELOG.md) 了解新增能力。
4. 如果你只使用某几个 Skill，至少同步对应 Skill 和它依赖的共享规则。

共享规则在：

```text
core/
```

不要只复制单个 Skill 文件，却漏掉共享规则更新。

## 更新后，旧材料怎么办

已经生成过的简历、项目卡、面试资料卡、Offer 决策卡不会自动更新。

你可以把旧材料发给新版 CCC，并说：

```text
这是我之前用旧版 CCC 生成的资料卡。
请按新版规则检查哪些可以保留，哪些需要更新。
不要重写全部，只给差异补丁。
```

如果材料里包含真实公司、电话、邮箱、薪资、Offer、合同、面试记录或公司内部信息，先脱敏再发送。

## 怎么知道我已经更新成功

可以用一个很短的测试：

```text
你好，请用一句话介绍 CCC，并告诉我可以直接发什么内容开始。
```

如果是 WorkBuddy，再测试一个具体场景：

```text
我在职，但直属领导突然要离职，我有点不知道要不要留下。
```

新版 CCC 应该先区分情绪冲击、已确认变化和实际工作条件变化，而不是直接劝你离职。

## 什么时候需要更新

建议在这些情况更新：

- 发布了新的 GitHub Release；
- `VERSION` 发生变化；
- 你想使用 CHANGELOG 中的新功能；
- WorkBuddy 回复明显不符合当前 README / 文档描述；
- 你发现旧版经常输出过长、过度模板化或漏掉新场景。

如果当前版本已经稳定满足你的使用，不需要每次仓库有小文档改动都马上更新。

