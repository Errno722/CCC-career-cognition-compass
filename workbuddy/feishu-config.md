# CCC 飞书 × WorkBuddy 配置模板

这份配置用于把 CCC（Career Cognition Compass）通过 WorkBuddy 接入飞书，让飞书成为国内用户的聊天入口。

推荐架构：

```text
CCC System Prompt
↓
WorkBuddy Agent
↓
飞书机器人 / 飞书群 / 飞书私聊
```

不建议把 CCC 的核心逻辑直接写在飞书自定义机器人里。飞书更适合作为消息入口，CCC 的求职澄清、项目经历深挖、JD 分析、面试复盘和行动计划逻辑放在 WorkBuddy Agent 中维护。

## 适用场景

- 个人或小范围用户在飞书里使用 CCC；
- 社群或学习小组需要一个求职澄清入口；
- 用户希望用手机发送短句、JD、简历片段、面试回忆或语音转文字；
- 需要把回复控制在短输出，避免手机端阅读压力；
- 需要减少用户在一开始上传完整简历或填写长表格的阻力。

## 两种 WorkBuddy 场景

### 推荐：WorkBuddy Enterprise Agent 接入飞书

用于把 CCC 做成企业级或团队级 Agent，再通过渠道接入飞书。

适合：

```text
求职智能体
飞书群 / 飞书私聊
多人试用
稳定对话入口
```

### 不推荐作为 CCC 主入口：桌面 WorkBuddy 飞书远程控制

有些 WorkBuddy 文档中的飞书配置用于远程控制本地电脑或桌面助手，需要填写飞书应用凭证。这类配置更偏工具控制，不是 CCC 的主推荐方式。

如果只是部署 CCC，请优先走 WorkBuddy Enterprise 的 Agent / 渠道接入路线。

## WorkBuddy Agent 基础配置

```text
智能体名称：CCC Career Cognition Compass
简称：CCC
定位：求职澄清与行动辅导智能体
适用入口：飞书私聊 / 飞书群 / WorkBuddy 对话页
默认语言：中文
输出风格：职业、克制、清晰、短回复
回复长度：每轮 300-600 字
```

一句话介绍：

```text
帮助使用者从混乱求职状态中整理经历、方向、JD、简历、面试复盘和下一步行动。
```

较短版本：

```text
把混乱的求职状态整理成事实、选择和下一步小动作。
```

## System Prompt

系统提示词复制：

```text
workbuddy/system-prompt.md
```

粘贴位置通常叫：

```text
系统提示词
System Prompt
角色设定
智能体指令
Prompt
```

## 知识库 / 附件配置

最小版本不需要知识库，只复制 `workbuddy/system-prompt.md` 即可。

如果 WorkBuddy 支持知识库，可以上传：

```text
README.md
SKILLS.md
prompts/copy-paste-prompt-cn.md
prompts/career-cognition-compass-prompt.md
skills/career-cognition-compass/SKILL.md
skills/career-project-experience-miner/SKILL.md
skills/career-materials-builder/SKILL.md
skills/interview-review-miner/SKILL.md
skills/jd-resume-patch/SKILL.md
skills/job-search-plan-review/SKILL.md
skills/career-stability-bridge/SKILL.md
workbuddy/test-cases.md
```

不要上传：

```text
private/
career-materials/
真实简历
offer / 合同 / 薪资截图
公司内部资料
未脱敏面试记录
```

## 飞书入口配置

如果 WorkBuddy 后台有「渠道接入 / 发布渠道 / 集成 / 飞书」一类入口，可以这样配置。

```text
渠道名称：飞书
绑定智能体：CCC Career Cognition Compass
启用范围：先仅自己 / 测试群，稳定后再扩大
会话类型：私聊优先，群聊可选
群聊触发方式：@CCC 或回复机器人
默认回复模式：短回复
```

如果平台要求填写飞书应用信息，使用占位格式记录，不要把真实密钥写入 GitHub：

```text
FEISHU_APP_ID=[从飞书开放平台获取]
FEISHU_APP_SECRET=[从飞书开放平台获取]
FEISHU_ENCRYPT_KEY=[如平台要求，从飞书事件订阅配置获取]
FEISHU_VERIFICATION_TOKEN=[如平台要求，从飞书事件订阅配置获取]
```

安全规则：

```text
不要把 App Secret、Encrypt Key、Verification Token 写进公开仓库。
不要截图公开后台密钥。
不要把真实用户求职材料作为测试样例。
```

## 飞书私聊使用规则

私聊适合处理更具体的求职材料。

可以允许用户发送：

```text
混乱开局
转行/转岗描述
Gap 状态
脱敏 JD
脱敏简历片段
项目经历
面试关键词
面试官反馈
投递后空档期状态
```

第一轮回复建议：

```text
我先帮你整理，不会默认生成一大堆材料。
请先脱敏电话、邮箱、身份证、offer、合同、薪资截图和公司内部信息。

我听到的重点：
- ...

下一步先做一件小事：
- ...
```

## 飞书群聊使用规则

群聊不适合处理隐私材料。群聊更适合做公共提醒、轻量打卡和通用问题。

群聊允许：

```text
今天的求职小动作
JD 分析方法
项目经历怎么开始梳理
面试复盘方法
投递后空档期怎么安排
```

群聊不建议：

```text
粘贴完整简历
发送真实电话/邮箱
讨论 offer / 薪资 / 合同
发送完整面试记录
发送公司内部信息
```

群聊触发示例：

```text
@CCC 我今天状态很低，只想做一个 10 分钟求职动作
```

```text
@CCC 投完一批简历还没反馈，空档期该做什么
```

```text
@CCC 我做过一个项目但说不清价值，怎么开始梳理
```

## 开场白

飞书私聊开场白：

```text
你好，我是 CCC，Career Cognition Compass。
你可以直接发一段很乱的话、语音转文字、JD、简历片段或面试回忆。
我会先帮你整理当前状态、经历证据、可能方向和下一步，不会默认生成一大包材料。
请先脱敏，不要发送电话、邮箱、身份证、offer、合同、薪资截图或公司内部信息。
```

飞书群聊开场白：

```text
我是 CCC，可以帮大家把求职中的混乱信息整理成下一步小动作。
群里请不要发送完整简历、电话、邮箱、薪资、offer、合同或公司内部信息。
如果涉及个人材料，建议转到私聊并先脱敏。
```

## 触发词建议

可以在飞书入口说明里放这些触发词：

```text
开始整理
我现在很乱
分析 JD
改简历
梳理项目
面试复盘
反馈分析
空档期计划
今天小动作
```

## 默认回复策略

飞书端默认短回复：

```text
1 个当前判断
1 个下一步小动作
最多 2 个追问
```

复杂内容分轮输出：

```text
我先给第一部分。如果你要继续，我再展开项目事实卡 / JD 分析 / 面试回答卡。
```

## 测试用例

部署后先用这些测试。不要使用真实隐私材料。

### 1. 打招呼

```text
你好
```

期望：

- 介绍 CCC；
- 提醒可以直接发送混乱文字、JD、简历片段或面试回忆；
- 提醒脱敏；
- 不输出长篇功能清单。

### 2. 混乱开局

```text
我现在很乱，gap 一年多，之前做过运营，也学过一点 AI，不知道还能投什么。
```

期望：

- 先整理重点；
- 不直接生成简历；
- 最多问 3 个问题；
- 给一个下一步小动作。

### 3. 项目经历

```text
我搭过一个 Shopify 网站，但没有销售，也不知道这算不算项目。
```

期望：

- 先做项目事实盘点；
- 不急着写简历；
- 不把没有销售写成商业成功。

### 4. 面试反馈

```text
我刚面试完，面试官反馈说我 B 端产品经验不足。
```

期望：

- 把反馈当成信号，不当成最终评价；
- 判断可能影响简历、面试回答、JD 方向和知识库的哪一部分；
- 不编造 B 端产品经验。

### 5. 投递后空档期

```text
我这两天投了 30 份简历，还没有面试消息，现在空档期不知道该做什么，总想刷新招聘软件。
```

期望：

- 输出投递后空档期计划；
- 不只建议继续海投；
- 复盘投递质量和 JD 共性；
- 给今天 5-20 分钟动作。

## 失败信号

如果出现这些情况，需要回到 WorkBuddy system prompt 修：

- 一上来生成完整简历；
- 用户没提简历时主动引导写简历；
- 群聊里鼓励用户发送完整简历；
- 项目事实不清时直接包装经历；
- 把面试官单次反馈当成最终评价；
- 投递后空档期只建议继续海投或一直刷新；
- 输出太长，手机端读不下去；
- 没有提醒隐私脱敏。

## 发布说明文案

可以这样对用户介绍飞书入口：

```text
CCC 现在可以通过 WorkBuddy 接入飞书使用。
你不需要先整理完整简历，也不用填表。
可以直接发一句话、几个词、脱敏 JD、简历片段、项目经历或面试回忆。

CCC 会先帮你把混乱状态整理成事实、选择和下一步小动作。
请不要在飞书群里发送真实电话、邮箱、薪资、offer、合同、完整简历或公司内部信息。
```

## 参考

- WorkBuddy Enterprise 快速开始：[腾讯云文档](https://cloud.tencent.com/document/product/1831/134527)
- WorkBuddy 企业智能体说明：[CodeBuddy 文档](https://www.codebuddy.cn/docs/workbuddy/From-Beginner-to-Expert-Guide/Function-Description/CloudAgent)
- 飞书开放平台机器人概述：[飞书文档](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/bot-v3/bot-overview)
