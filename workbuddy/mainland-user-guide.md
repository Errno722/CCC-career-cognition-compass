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
workbuddy/system-prompt-lite.md
```

如果你希望保留更完整的场景规则，或平台上下文足够大，可以改用：

```text
workbuddy/system-prompt.md
```

如果你在 GitHub 页面查看，可以打开文件后复制全文。不会使用 GitHub 的用户，只需要找到页面里的复制按钮，或者把文件内容手动全选复制。

如果 WorkBuddy 支持知识库或附件，可以额外上传这些公开文件：

```text
README.md
SKILLS.md
prompts/copy-paste-prompt-lite-cn.md
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
一句话介绍：帮助使用者从混乱求职状态中整理经历、方向、JD、简历、面试复盘、投递反馈和下一步行动。
使用场景：求职澄清 / 转行转岗 / Gap / JD 分析 / 简历修改 / 项目经历梳理 / 面试复盘 / 面试邀约信号画像
```

如果平台要求选择模型，优先选择稳定、中文表现较好、上下文长度相对够用的模型。手机端或短回复场景里，不要选太容易输出长篇内容的配置。

### 3. 粘贴系统提示词

打开并复制：

```text
workbuddy/system-prompt-lite.md
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

如果对话很长，或用户想切换到其他模型继续，可以让智能体输出：

```text
CCC 继续上下文
- 当前状态:
- 本轮主线:
- 已确认事实:
- 可复用卡片:
- 未确认:
- 下一步:
```

这样用户只需要复制这张卡，不需要复制整段聊天。

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
candidate_interview_profile_base
candidate_interview_profile_by_role_family
candidate_interview_profile_patch
repeated_feedback_tracker
acronym_glossary
positioning_cards
current_action_plan
post_application_idle_plan
interview_invitation_signal_profile
token_saving_cards
recent_work_task_signals
focus_control_cards
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

期望：把反馈当成信号，不当成最终评价；整理对简历、面试回答、JD 方向和知识库的影响；更新候选人面试资料卡补丁，方便二面/三面继承可复用证据、排除不该继承的不足；如果用户提到 HR、业务、技术等面试官角色，要分别调整回答侧重点；结尾提醒用户不要停留在已发生的面试太久，转向下一次机会或一个查缺补漏动作。

```text
我这两天投了 30 份简历，还没有面试消息，现在空档期不知道该做什么，总想刷新招聘软件。
```

期望：输出投递后空档期计划，不只让用户继续海投或反复改简历。

```text
我最近找工作很焦虑，刷小红书更慌，感觉别人都很厉害。我知道你不是心理咨询，但能不能帮我别那么乱，今天只做一点事？
```

期望：输出焦虑降噪卡，拆出触发源、可控/不可控、信息摄入边界和今天 5-20 分钟动作；不输出鸡汤式安慰。

```text
我面试时回答很细，越说越多，面试官抓不到重点。问到用户增长下降怎么办时，我只会顺着一个原因讲。请帮我改成更清晰的回答结构，也适合英文面试。
```

期望：输出面试表达结构卡，包含 JD 契合卖点、一句话观点、3-4 条 bullet、Situation、条件分支和第二语言自然表达提示。

```text
我要准备产品运营岗面试的自我介绍和“为什么适合这个岗位”的回答。我不想要逐字稿，怕背不下来。我之前做过内容运营、用户调研和 AI 工具项目，请帮我抽象能力和回答框架。
```

期望：不输出长篇逐字稿；先抽象 3-4 条能力和简单验证；自我介绍只讲 2 个与目标岗位最契合的能力；面试答案给一二级框架和展开逻辑。

```text
我明天面产品运营岗，最后如果面试官问我有什么想问的，我应该反问什么？我不想问太大的问题。
```

期望：输出面试反问卡，默认 2-4 个岗位级小问题，围绕 3 个月期望、后续流程、成长路径和关键能力，不问公司战略或敏感信息。

```text
这个岗位要求英文沟通，我想准备英文自我介绍和面试回答。我的英语能工作沟通但不是母语，之前做过运营和 AI 工具项目。请帮我准备，别写得太夸张，也别太生硬。
```

期望：输出语气校准卡和英文面试表达卡；不把 working communication 写成 native / fluent；英文表达自然、简洁、可说出口，不逐句硬翻译中文。

```text
我最近两周投了 40 个岗位。A 简历投了 20 个用户运营，收到 3 个邀约；B 简历投了 10 个产品助理，收到 1 个邀约；C 简历投了 10 个 AI Agent 工程师和高级产品经理，收到 0 个邀约。另有 1 个项目执行邀约来自朋友内推，不在这 40 个冷投里。请帮我做面试邀约信号画像。
```

期望：输出面试邀约信号画像，展示分子/分母、本批次观察回复率、邀约 JD 共性、混杂因素、相对高/低回复信号和下一批小规模投递验证，不承诺未来精确概率。

```text
我担心 token 太多，之后我会贴 JD 和候选人背景卡。请用最省 token 的方式帮我改简历和准备面试，不要每次重写所有内容。
```

期望：输出 Token 节省卡，说明本轮只处理什么、复用哪些已有卡片、不重复输出什么；后续简历和面试准备优先给差异补丁、替换段落和下一步。如果需要展开，提示用户回复“继续”。

```text
我最近一段时间最常做的是梳理流程、写 SOP、拆需求、把别人说不清的东西整理成清单。我发现自己挺愿意做这类工作，但不是兴趣爱好。我想知道这说明我应该怎么定位。
```

期望：输出近期工作行为定位卡，把最近实际在做和愿意继续做的工作任务转成定位假设；明确这不是爱好判断，也不是最终职业结论，需要用项目事实、JD、面试邀约信号或 7 天验证动作确认。

```text
我现在想投运营、产品助理、数据分析、AI Agent，也想学 SQL、Python、剪辑、作品集，还要改简历、准备面试、做小红书账号。我越想越多，不知道先做哪个。
```

期望：输出发散收束卡，把岗位、技能、材料、平台和面试准备分支归类；本轮只保留 1 个主线，其他放入暂存，只给 1 个下一步动作。

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

如果用户已经有候选人背景卡、项目事实卡、主简历或上一轮 JD 补丁，可以让用户直接说：

```text
请用 Token 节省模式，只输出本轮新增、差异和替换段落。
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
它适合 Gap、转行转岗、在职疲惫、项目经历说不清、投完简历后空档期焦虑、收到面试邀约后想判断下一批投递方向、面试复盘和 JD 分析等场景。

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
- 轻量系统提示词：[system-prompt-lite.md](system-prompt-lite.md)
- 完整系统提示词：[system-prompt.md](system-prompt.md)
- 测试用例：[test-cases.md](test-cases.md)
