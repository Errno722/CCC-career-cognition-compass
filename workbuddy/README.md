# CCC WorkBuddy Deployment

这是 CCC（Career Cognition Compass）在 WorkBuddy 一类低代码智能体平台中的部署说明。

当前公开资料里，WorkBuddy 的具体 skill 导入格式并不稳定，因此本目录采用“通用智能体适配包”的方式：把 CCC 配成一个求职澄清与行动辅导智能体，而不是依赖某个私有文件格式。

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
workbuddy/system-prompt.md
```

如果平台支持知识库或附件，可以补充上传这些公开文件：

```text
README.md
SKILLS.md
prompts/copy-paste-prompt-cn.md
prompts/career-cognition-compass-prompt.md
skills/career-cognition-compass/SKILL.md
skills/career-materials-builder/SKILL.md
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
hard_skill_kb
acronym_glossary
positioning_cards
current_action_plan
```

变量用途：

- `current_status`：Gap、在职、离职、校招、转行、海外求职等；
- `input_type`：混乱输入、JD、简历片段、面试复盘、行动计划；
- `confirmed_facts`：已经确认的经历事实；
- `needs_confirmation`：不能直接当事实的推断；
- `hard_skill_kb`：技能、工具、证据、缺口；
- `positioning_cards`：职业定位 / 候选人叙事；
- `current_action_plan`：不超过 14 天的小计划。

## 更新流程

每次仓库更新后，按这个顺序同步 WorkBuddy：

```text
1. 查看 SKILLS.md 的更新记录
2. 更新 workbuddy/system-prompt.md
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
- 是否会主动保护隐私；
- 是否能处理 JD、面试复盘、在职疲惫和 Gap；
- 是否不会编造经历、证书、数据或陌生身份。

## 边界

CCC 在 WorkBuddy 中仍然不做：

- 自动投递；
- 自动私信 HR；
- 编造简历；
- 心理诊断或治疗；
- 法律、医疗、签证结论；
- 替用户做离职、裸辞、offer 或薪资决定。
