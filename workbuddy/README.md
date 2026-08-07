# CCC WorkBuddy Deployment

这是 CCC（Career Cognition Compass）在 WorkBuddy 一类低代码智能体平台中的部署说明。

当前公开资料里，WorkBuddy 的具体 skill 导入格式并不稳定，因此本目录采用“通用智能体适配包”的方式：把 CCC 配成一个求职澄清与行动辅导智能体，而不是依赖某个私有文件格式。

如果需要面向大陆普通用户发布或讲解部署方式，请使用：[mainland-user-guide.md](mainland-user-guide.md)。

## 推荐部署形态

优先做成一个对话型智能体：

```text
名称：CCC Career Cognition Compass
定位：求职澄清与行动辅导
入口：用户直接发送混乱文字、语音转文字、JD、简历片段或面试回忆
输出：少量判断、下一步动作、可复制材料，不默认生成大报告
```

如果 WorkBuddy 支持工作流，可以增加 4 个节点：

```text
1. 隐私提醒
2. 场景识别
3. CCC 分析回应
4. 本轮摘要 / 知识库更新
```

## 部署材料

最小部署只需要复制：

```text
workbuddy/system-prompt-lite.md
```

如果平台上下文足够、你想保留更完整的场景规则和变量说明，可以改用：

```text
workbuddy/system-prompt.md
```

如果平台支持知识库或附件，可以补充上传这些公开文件：

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
career-materials/
private/
真实简历
offer / 合同 / 薪资截图
公司内部资料
未脱敏面试记录
```

## 建议配置

### 开场白

```text
你好，我是 CCC，Career Cognition Compass。
你可以直接发一段很乱的话、语音转文字、JD、简历片段或面试回忆。
我会先帮你整理当前状态、经历证据、可能方向和下一步，不会默认生成一大包材料。
请先脱敏，不要发送电话、邮箱、身份证、offer、合同、薪资截图或公司内部信息。
```

### 用户输入建议

不要要求用户填写长表格。可以引导用户直接说：

```text
我现在很乱，gap 一年多，之前做过运营，也学过一点 AI，不知道还能投什么。
```

或者：

```text
这是一个 JD，帮我看硬技能、工具要求和面试可能问什么。
```

### 回复长度

建议默认控制在：

```text
每轮 300-600 字
最多 3 个判断
最多 3 个问题
最多 3 个下一步动作
```

复杂材料分轮输出，不要一次生成完整大报告。

如果用户提到 token、额度、上下文太长、回复太长或手机端超时，进入 Token 节省模式：复用已有卡片，只输出本轮差异、替换段落和下一步。

如果用户需要跨模型继续，输出 `CCC 继续上下文`，只保留当前状态、本轮主线、已确认事实、可复用卡片、未确认信息和下一步，避免复制整段聊天。

## 工作流变量

如果 WorkBuddy 支持变量，可以使用：

```text
current_status
target_role
input_type
daily_time_budget
privacy_checked
confirmed_facts
needs_confirmation
project_inventory
project_cards
project_evidence_gaps
project_state_records
temporary_draft_mode
hard_skill_kb
interview_question_bank
interviewer_feedback_signals
candidate_interview_profile_base
candidate_interview_profile_by_role_family
candidate_interview_profile_patch
interviewer_role_focus_cards
repeated_feedback_tracker
interview_answer_cards
interview_expression_cards
interview_experience_signals
acronym_glossary
recent_work_task_signals
focus_control_cards
positioning_cards
current_action_plan
post_application_idle_plan
interview_invitation_signal_profile
```

变量用途：

- `current_status`：Gap、在职、离职、校招、转行、海外求职等；
- `input_type`：混乱输入、JD、简历片段、面试复盘、行动计划；
- `confirmed_facts`：已经确认的经历事实；
- `needs_confirmation`：不能直接当事实的推断；
- `project_inventory`：所有项目总表；
- `project_cards`：单项目事实卡和个人贡献边界；
- `project_evidence_gaps`：缺失数据、缺失证据和待确认信息；
- `project_state_records`：按单个项目记录 DISCOVERED、PARTIALLY_MAPPED 或 EVIDENCE_READY，避免只给用户一个整体项目状态；
- `temporary_draft_mode`：用户赶投递时是否允许保守临时表达；
- `jd_role_type_cards`：JD 岗位类型判断卡，记录岗位族群、工作重心、判断依据、置信度、容易误判和准备重点；
- `hard_skill_kb`：技能、工具、证据、缺口；
- `interview_question_bank`：面试关键词、可能题型、考察能力、回答状态和下次准备动作；
- `interviewer_feedback_signals`：面试官/HR 反馈原话、反馈类型、可能影响和后续简历/面试/JD 调整；
- `candidate_interview_profile_base`：候选人稳定背景层，沉淀跨岗位可复用的背景、优势、证据和通用表达风险；
- `candidate_interview_profile_by_role_family`：岗位族群层，记录该岗位族群的优势、担忧、最近反馈、下一轮重点、缺失证据和不应继承的反馈；
- `candidate_interview_profile_patch`：每次面试复盘后的更新补丁，普通 WorkBuddy 对话默认 `persistence_mode: output_only`；
- `forward_focus_reminder`：面试复盘收束提醒，把已发生的面试当作数据点，转向下一次机会或一个查缺补漏动作；
- `interviewer_role_focus_cards`：按 HR、用人经理、业务、技术、高管、Founder、跨部门或同级面试官区分回答侧重点；
- `feedback_reliability_records`：反馈来源类型、可信度和动作等级，避免模糊反馈直接改主简历；
- `repeated_feedback_tracker`：同类反馈出现次数、来源岗位/JD、是否升级为 pattern；
- `interview_answer_cards`：下次面试回答卡，最多保留 1-3 个高影响问题；
- `interview_expression_cards`：面试表达结构卡，记录 JD 契合卖点、自我介绍框架、2 个岗位契合能力、3-4 条能力验证、先总后分结构、STAR 的 Situation、条件分支和第二语言表达练习；
- `tone_calibration_cards`：语气校准卡，记录简历、profile、平台材料和面试准备中可以确定说、需要降级说、待确认和不建议使用的过度肯定表达；
- `english_interview_expression_cards`：英文面试表达卡，记录 Plain English version、Natural phrases、English ability boundary 和可说出口的练习提示；
- `interview_reverse_question_cards`：面试反问卡，记录 2-4 个岗位级反问问题，例如 3 个月期望、后续流程、成长路径和关键能力；
- `interview_experience_signals`：面试问题是否匹配 JD、职责是否清楚、是否有模糊职责或过度要求；
- `recent_work_task_signals`：近期工作行为定位卡，记录用户最近实际在做、愿意继续做、做完更有掌控感或消耗的工作任务，并转成定位假设；
- `focus_control_cards`：发散收束卡，记录当前分支、本轮主线、暂存分支、本轮不处理事项和下一步动作；
- `positioning_cards`：职业定位 / 候选人叙事；
- `current_action_plan`：不超过 14 天的小计划。
- `post_application_idle_plan`：投完简历但未收到反馈时的空档期计划，包括投递质量复盘、JD 共性、可复用资产、信息摄入边界和当天 5-20 分钟动作。
- `anxiety_noise_reduction_cards`：焦虑降噪卡，记录焦虑触发源、可控/不可控、暂停继续做的事、信息摄入边界和当天 5-20 分钟动作；
- `token_saving_cards`：Token 节省卡，记录本轮只处理什么、复用哪些已有卡片、不重复输出什么、哪些是本轮新增/差异；
- `interview_invitation_signal_profile`：面试邀约信号画像，记录时间窗口、渠道、简历版本、岗位族群、投递数、邀约数、本批次观察回复率、样本量等级、混杂因素和下一批小规模验证。

## 更新流程

每次仓库更新后，按这个顺序同步 WorkBuddy：

```text
1. 查看 SKILLS.md 的更新记录
2. 优先更新 workbuddy/system-prompt-lite.md；如果使用完整版，再更新 workbuddy/system-prompt.md
3. 如果涉及新功能，补充 workbuddy/test-cases.md
4. 在 WorkBuddy 后台替换系统提示词
5. 用测试用例跑一遍
6. 记录平台上实际失败的回复，再回到 skill 里修
```

## 测试

使用 [test-cases.md](test-cases.md) 做回归测试。重点看：

- 是否一上来就生成简历；
- 是否能处理很乱的输入；
- 是否会自动判断职业定位需求；
- 是否能根据用户最近实际在做或愿意继续做的工作任务，输出近期工作行为定位卡，而不是把爱好直接当职业结论；
- 是否能在项目事实不清晰时先做项目盘点和单项目深挖；
- 是否会标记 DISCOVERED / PARTIALLY_MAPPED / EVIDENCE_READY，并阻止未完成项目进入最终材料；
- 是否知道 EVIDENCE_READY 不等于必须有量化成绩；
- 是否能在用户明确要求时输出保守临时草稿，并标出未知字段；
- 是否会主动保护隐私；
- 是否能处理 JD、面试复盘、在职疲惫和 Gap；
- 是否能处理投完简历后的空档期，不把等待变成反复刷新、无目的刷社媒或无限改简历；
- 是否能在用户焦虑、比较别人或刷社媒更慌时，输出焦虑降噪卡，而不是鸡汤式安慰；
- 是否能在用户要求省 token 或手机端容易超时时，复用已有状态卡，只输出差异补丁和下一步；
- 是否能在用户同时发散到多个岗位、技能、材料、平台或计划时，先收束到 1 个本轮主线，而不是展开所有分支；
- 是否能根据已收到的面试邀约、JD 和无回复样本总结回复信号，并用相对高/中/低而不是精确概率判断下一批投递方向；
- 是否能把“xx 方面经验不足”等面试官反馈转成简历、面试回答、JD 方向和知识库更新；
- 是否能根据 HR、用人经理、业务、技术等不同面试官角色调整回答侧重点，同时保持事实不变；
- 是否能在用户回答太散、细节太多、STAR 用不好或英文表达不自然时，输出面试表达结构卡；
- 是否能在生成简历、profile 或面试准备时避免过度肯定，并在英文面试/英文能力岗位中给自然、不直译的英文表达；
- 是否能在用户准备面试反问时，输出岗位级小问题，而不是宏大的公司战略问题；
- 是否能把 HR 转述、泛化拒信或用户自我感觉先降级为低/未知可信度，不直接改主简历；
- 是否在 WorkBuddy / 手机端短回复场景下保持短回复，不一次输出过长内容；
- 是否不会编造经历、证书、数据或陌生身份。

## 边界

CCC 在 WorkBuddy 中仍然不做：

- 自动投递；
- 自动私信 HR；
- 编造简历；
- 心理诊断或治疗；
- 法律、医疗、签证结论；
- 替用户做离职、裸辞、offer 或薪资决定。
