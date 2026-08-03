# CCC WorkBuddy 大陆用户部署说明

这份说明面向想在 WorkBuddy 上使用或部署 CCC 的大陆用户。CCC 是 Career Cognition Compass 的缩写，它不是单纯的简历生成器，而是帮助使用者把混乱的求职状态、经历证据、项目事实、岗位方向和下一步行动整理清楚。

如果你不熟悉 GitHub，也可以只复制本页提到的提示词内容，不需要会 git。

## 适合谁

- 想在国内可访问的平台上使用 CCC；
- 想把 CCC 做成一个自己的求职智能体；
- 想给朋友、社群或小范围用户提供一个低门槛入口；
- 不想让用户一开始上传完整简历或填长表格；
- 希望用户可以直接发送一句话、几个词、JD、简历片段、面试回忆或语音转文字。

## 你需要准备什么

最小版本只需要一个文件：

```text
workbuddy/system-prompt.md
```

如果你在 GitHub 页面查看，可以打开文件后复制全文。不会使用 GitHub 的用户，只需要找到页面里的复制按钮，或者把文件内容手动全选复制。

如果 WorkBuddy 支持知识库或附件，可以额外上传这些公开文件：

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
```

不要上传：

```text
private/
career-materials/
真实简历
offer / 合同 / 薪资截图
公司内部资料
未脱敏面试记录
任何用户隐私材料
```

## 推荐部署方式

优先把 CCC 做成一个对话型智能体，而不是复杂工作流。

推荐信息：

```text
名称：CCC Career Cognition Compass
定位：求职澄清与行动辅导
入口：用户直接发送混乱文字、语音转文字、JD、简历片段或面试回忆
输出：少量判断、下一步动作、可复制材料，不默认生成大报告
```

## 部署步骤

不同版本的 WorkBuddy 页面名称可能会变化，以下按常见低代码智能体后台写法说明。实际按钮名称以平台页面为准。

如果使用的是 WorkBuddy Enterprise，官方快速开始流程大致是：使用分配了企业坐席的个人账号登录企业后台，进入「企业智能体」创建 Agent，填写基础配置和 System Prompt，先用 Test Run 测试，再按需要接入企微 AIBot、QQ 机器人、飞书或钉钉。

如果你准备接入飞书，可以参考：[feishu-config.md](feishu-config.md)。

### 1. 新建智能体

进入 WorkBuddy 后台，找到类似这些入口：

```text
Agent
智能体
应用
创建智能体
新建 Agent
```

选择新建一个对话型智能体。

### 2. 填基础信息

建议这样填写：

```text
智能体名称：CCC Career Cognition Compass
一句话介绍：帮助使用者从混乱求职状态中整理经历、方向、JD、简历、面试复盘和下一步行动。
使用场景：求职澄清 / 转行转岗 / Gap / JD 分析 / 简历修改 / 项目经历梳理 / 面试复盘
```

如果平台要求选择模型，优先选择稳定、中文表现较好、上下文长度相对够用的模型。手机端或短回复场景里，不要选太容易输出长篇内容的配置。

### 3. 粘贴系统提示词

打开并复制：

```text
workbuddy/system-prompt.md
```

粘贴到 WorkBuddy 的类似位置：

```text
系统提示词
System Prompt
角色设定
智能体指令
Prompt
```

粘贴后保存。

### 4. 设置开场白

建议开场白：

```text
你好，我是 CCC，Career Cognition Compass。
你可以直接发一段很乱的话、语音转文字、JD、简历片段或面试回忆。
我会先帮你整理当前状态、经历证据、可能方向和下一步，不会默认生成一大包材料。
请先脱敏，不要发送电话、邮箱、身份证、offer、合同、薪资截图或公司内部信息。
```

### 5. 设置回复长度

如果平台支持回复长度或输出风格，建议：

```text
每轮 300-600 字
最多 3 个判断
最多 3 个问题
最多 3 个下一步动作
复杂内容分轮输出
```

如果用户是在手机上使用，回复要更短。第一轮尽量只给：

```text
1 个当前判断
1 个下一步小动作
最多 2 个追问
```

### 6. 可选：配置变量或记忆

如果 WorkBuddy 支持变量、记忆或知识库，可以使用这些字段：

```text
current_status
target_role
input_type
daily_time_budget
confirmed_facts
needs_confirmation
project_inventory
project_cards
project_state_records
hard_skill_kb
interview_question_bank
interviewer_feedback_signals
candidate_interview_profile
repeated_feedback_tracker
acronym_glossary
positioning_cards
current_action_plan
post_application_idle_plan
```

如果你不确定这些是什么，可以先跳过。CCC 的最小版本只靠系统提示词也能跑。

### 7. 测试

部署后先用以下几句话测试，不要使用真实隐私材料。

```text
你好
```

期望：介绍 CCC，提醒可以直接发送混乱文字、JD、简历片段或面试回忆，并提醒脱敏。

```text
我现在很乱，gap 一年多，之前做过运营，也学过一点 AI，不知道还能投什么。
```

期望：先整理重点，不直接生成简历，最多问 3 个问题，并给一个下一步小动作。

```text
我搭过一个 Shopify 网站，但没有销售，也不知道这算不算项目。
```

期望：先做项目事实盘点，不急着写简历，不把没有销售写成商业成功。

```text
我刚面试完，面试官反馈说我 B 端产品经验不足。
```

期望：把反馈当成信号，不当成最终评价；整理对简历、面试回答、JD 方向和知识库的影响；更新候选人面试背景卡，方便二面/三面继承改进；如果用户提到 HR、业务、技术等面试官角色，要分别调整回答侧重点。

```text
我这两天投了 30 份简历，还没有面试消息，现在空档期不知道该做什么，总想刷新招聘软件。
```

期望：输出投递后空档期计划，不只让用户继续海投或反复改简历。

更多测试见：

```text
workbuddy/test-cases.md
```

## 用户怎么开始

你可以告诉用户，不需要整理成正式材料。可以直接发：

```text
我现在很乱，gap 一年多，不知道还能投什么。
```

也可以发几个词：

```text
gap 一年 运营 ai 转行 不知道投什么
```

也可以用语音转文字：

```text
我先对着手机录音，把自己的情况说 5-10 分钟。
转成文字后，把电话、邮箱、公司名、薪资、offer、合同等敏感内容删掉或替换成 [已脱敏]，再发给 CCC。
```

## 常见问题

### 1. 回复太长怎么办

把系统提示词里的短回复规则放在更靠前的位置，或在平台配置中降低回复长度。也可以让用户回复：

```text
请只给 3 条判断和 1 个今天能做的小动作。
```

### 2. 一上来就生成简历怎么办

检查系统提示词是否完整粘贴。CCC 的核心规则是：

```text
用户明确要求改简历时，才进入简历任务。
用户没有提到简历时，不要主动把问题导向简历。
```

### 3. 项目经历被过早包装怎么办

测试项目经历场景。正确做法是：

```text
先做项目总表
再做单项目事实卡
区分个人贡献和团队成果
达到 EVIDENCE_READY 后再进入简历、JD 或作品集表达
```

### 4. 用户只发一句话怎么办

不要要求用户补完整表格。先整理一句话里的状态、经历、痛点和缺口，再问最多 2-3 个问题。

### 5. 可以给别人用吗

可以，但需要明确边界：

```text
CCC 只提供整理、分析和建议。
最终投递、离职、裸辞、offer、薪资、法律、医疗或签证决定仍由使用者自己做。
```

### 6. 需要会 GitHub 吗

不需要。会复制文字就可以使用最小版本。GitHub 只是公开展示和更新入口。

## 发布时可以这样介绍

```text
CCC 是一个求职澄清与行动辅导智能体，可以部署到 WorkBuddy。
它适合 Gap、转行转岗、在职疲惫、项目经历说不清、投完简历后空档期焦虑、面试复盘和 JD 分析等场景。

它不是一上来帮你包装简历，而是先帮你把混乱的信息整理成事实、选择和下一步小动作。
```

## 边界提醒

CCC 不做：

- 自动投递；
- 自动私信 HR；
- 编造简历；
- 承诺面试、offer 或薪资；
- 心理诊断或治疗；
- 法律、医疗、签证结论；
- 替用户做离职、裸辞、offer 或薪资决定。

使用前请先脱敏，不要提交电话、邮箱、身份证、offer、合同、薪资截图、公司内部资料或未公开项目。

## 参考

- 腾讯云 WorkBuddy Enterprise 快速开始：[快速开始](https://cloud.tencent.com/document/product/1831/134527)
- CodeBuddy WorkBuddy 企业智能体说明：[企业智能体](https://www.codebuddy.cn/docs/workbuddy/From-Beginner-to-Expert-Guide/Function-Description/CloudAgent)
- 本项目 WorkBuddy 部署材料：[README.md](README.md)
- 系统提示词：[system-prompt.md](system-prompt.md)
- 测试用例：[test-cases.md](test-cases.md)
