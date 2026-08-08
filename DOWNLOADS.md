# CCC Downloads

这页给不熟悉 GitHub 或不想翻目录的用户准备。你可以直接复制单个文件，也可以从 GitHub Release 下载打包好的 zip。

## 先选这个

| 你想做什么 | 推荐 |
| --- | --- |
| 只想马上试用 | `CCC-lite-pack.zip` 或直接复制 [Lite Prompt](prompts/copy-paste-prompt-lite-cn.md) |
| 想部署 WorkBuddy | `CCC-workbuddy-pack.zip` 或复制 [WorkBuddy Lite Prompt](workbuddy/system-prompt-lite.md) |
| 想研究完整项目 | `CCC-full-pack.zip` |

## Release 下载

如果仓库已经发布 Release，可以在 GitHub 的 `Releases` 页面下载这些文件包：

```text
CCC-lite-pack.zip
CCC-workbuddy-pack.zip
CCC-full-pack.zip
```

常用直链格式：

```text
https://github.com/Errno722/CCC-career-cognition-compass/releases/latest/download/CCC-lite-pack.zip
https://github.com/Errno722/CCC-career-cognition-compass/releases/latest/download/CCC-workbuddy-pack.zip
https://github.com/Errno722/CCC-career-cognition-compass/releases/latest/download/CCC-full-pack.zip
```

如果还没有 Release，先使用 GitHub 页面中的单文件复制方式，或点击仓库绿色 `Code` 按钮下载 `Download ZIP`。

## 也可以直接复制

| 你想做什么 | 推荐文件 |
| --- | --- |
| 在 ChatGPT、Claude、DeepSeek、通义千问、Kimi 等普通聊天模型里试用 | [prompts/copy-paste-prompt-lite-cn.md](prompts/copy-paste-prompt-lite-cn.md) |
| English users / international job search | [prompts/copy-paste-prompt-lite-en.md](prompts/copy-paste-prompt-lite-en.md) |
| 普通 LLM 需要完整规则 | [prompts/copy-paste-prompt-cn.md](prompts/copy-paste-prompt-cn.md) |
| 在 WorkBuddy 部署轻量版智能体 | [workbuddy/system-prompt-lite.md](workbuddy/system-prompt-lite.md) |
| WorkBuddy 需要完整规则 | [workbuddy/system-prompt.md](workbuddy/system-prompt.md) |
| 不知道从哪里开始 | [QUICKSTART.md](QUICKSTART.md) |

## English users

Start with:

- [README.en.md](README.en.md)
- [QUICKSTART.en.md](QUICKSTART.en.md)
- [prompts/copy-paste-prompt-lite-en.md](prompts/copy-paste-prompt-lite-en.md)

## 三个包分别包含什么

### CCC-lite-pack.zip

适合第一次试用和普通用户。

```text
README.md
README.en.md
QUICKSTART.md
QUICKSTART.en.md
DOWNLOADS.md
prompts/copy-paste-prompt-lite-cn.md
prompts/copy-paste-prompt-lite-en.md
SECURITY.md
SUPPORT.md
LICENSE
```

### CCC-workbuddy-pack.zip

适合部署 WorkBuddy 或飞书入口。

```text
README.md
README.en.md
QUICKSTART.md
QUICKSTART.en.md
DOWNLOADS.md
workbuddy/README.md
workbuddy/mainland-user-guide.md
workbuddy/system-prompt-lite.md
workbuddy/system-prompt.md
workbuddy/test-cases.md
workbuddy/feishu-config.md
SECURITY.md
LICENSE
```

### CCC-full-pack.zip

适合维护者、开发者和想研究完整项目结构的人。它包含公开仓库中的主要文档、skills、prompts、evals、examples、Roadmap、英文入口和脚本，但不包含未脱敏求职材料、私有文件、填写后的 Smoke input 或本地生成结果。

## 维护者如何打包

在仓库根目录运行：

```bash
node scripts/package-release.mjs
```

生成结果：

```text
dist/release/CCC-lite-pack.zip
dist/release/CCC-workbuddy-pack.zip
dist/release/CCC-full-pack.zip
```

上传到 GitHub Release 前，请确认：

```bash
node scripts/check-markdown-links.mjs
git status --short
```

不要把真实简历、真实联系方式、Offer、合同、薪资截图、未脱敏面试记录或公司内部资料放进任何下载包。
