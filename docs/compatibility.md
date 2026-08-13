# 适配器与运行环境状态

CCC 不声称“适用于所有模型”。不同平台的上下文长度、文件能力、联网能力、回复限制和发布方式不同，所以这里按实际使用状态记录。

## 状态定义

| 状态 | 含义 |
| --- | --- |
| Maintainer-used | 维护者实际使用或配置过该环境，但不代表完整跑完测试集 |
| Contract-ready | 已有机器可读 eval 合约，但尚未自动调用模型 |
| Community testing needed | 理论可用，但需要外部用户反馈确认 |
| Experimental | 可迁移，尚未形成稳定说明 |
| Not tested | 暂未测试 |

## 当前测试口径

| 类型 | 当前状态 |
| --- | --- |
| 手工测试场景 | 44 个，见 [workbuddy/test-cases.md](../workbuddy/test-cases.md) |
| 机器可读合约 | 44 个，见 [evals/cases.json](../evals/cases.json) |
| 已登记语义断言 | 242 条，见 [evals/rubrics.json](../evals/rubrics.json) |
| 已人工细化核心 Rubric | 135 条，见 [evals/rubrics.json](../evals/rubrics.json) |
| 确定性输出 Runner | `0.2.0`，可对已有助手回复执行字面、正则和结构检查 |
| 结果报告 Schema | `0.2.0` |
| 结果报告 | 0 份，尚未保存真实平台执行报告 |
| 总执行次数 | 0 次，由 `evals/results/` 中的报告动态计算 |
| 声明唯一覆盖 | 0/44，包含结构合法但不可复算的 `schema_only` 报告 |
| Runner 执行覆盖 | 0/44，只统计 `runner_generated` 和 `recomputed` 报告 |
| 公开平台覆盖 | 0/44，只统计非本地 adapter 的 Runner 执行结果 |
| 公开唯一通过 | 0/44，公开平台中至少一次确定性通过才计入 |
| 公开已验证通过 | 0/44，公开平台中只有 `recomputed` 结果计入 |
| 语义评审 | 0 次，尚未接入 LLM Judge |
| 评估对象 | `assistant_output_only`，不对完整对话记录做字符串断言 |
| 本地检查 | `node scripts/check-evals.mjs`、`node scripts/check-shared-rules.mjs`、`node scripts/check-markdown-links.mjs`、`node scripts/test-deterministic-runner.mjs`、`node scripts/test-generate-smoke-report.mjs` |
| GitHub Actions | 暂未启用；当前推送凭证缺少 `workflow` scope |

## 真实 Smoke Report 流程

兼容性矩阵只接受真实平台输出生成的报告，不把 fixture 或模板当作平台结果。

当前已经提供 ChatGPT Smoke 输入模板：

```bash
cp evals/inputs/chatgpt-smoke.template.json \
  evals/inputs/chatgpt-smoke.input.json

# 先提交当前合约，再用完整 HEAD 替换 source_commit
git status --short
git rev-parse HEAD

# 手动填入真实平台模型名称、source_commit 和五个真实助手回复

node scripts/generate-smoke-report.mjs \
  evals/inputs/chatgpt-smoke.input.json
```

脚本会生成：

```text
evals/results/<adapter>/<YYYY-MM-DD>-smoke.json
```

生成前会检查 5 个必测 case、原始输入、占位符、模型名称、40 位 `source_commit`、干净工作区、`source_commit === HEAD`、提交内 `evals/cases.json` 与结果 `suite_sha256` 匹配，以及助手回复完整性；生成后会自动运行 `node scripts/check-evals.mjs`。

在没有真实模型输出前，公开统计继续保持：

```text
结果报告：0
公开平台覆盖：0/44
公开唯一通过：0/44
公开已验证通过：0/44
```

## 兼容性矩阵

| 平台 / 环境 | 状态 | 测试计划 | 公开覆盖 | 公开通过 | 公开验证 | 模型 / 版本 | 证据 | 推荐入口 |
| --- | --- | ---: | ---: | ---: | ---: | --- | --- | --- |
| Codex | Maintainer-used | 44 | 0 | - | - | 未记录 | 本地结构检查通过，尚无真实平台结果报告 | `skills/` |
| WorkBuddy | Maintainer-used | 44 | 0 | - | - | 未记录 | 有部署与人工冒烟经验，尚无 44 例正式执行记录 | `workbuddy/system-prompt-lite.md` |
| 飞书 + WorkBuddy | Community testing needed | 44 | 0 | - | - | 未记录 | 只有配置模板，尚未形成公开测试记录 | `workbuddy/feishu-config.md` |
| ChatGPT / 普通 LLM | Contract-ready | 44 | 0 | - | - | 未记录 | 有 44 个机器可读合约和确定性输出 runner，尚无真实执行报告 | CN: `prompts/copy-paste-prompt-lite-cn.md`; EN: `prompts/copy-paste-prompt-lite-en.md` |
| Claude Code | Community testing needed | 44 | 0 | - | - | 未记录 | 目录结构可迁移，需社区测试触发规则 | `skills/` |
| DeepSeek | Community testing needed | 44 | 0 | - | - | 未记录 | 建议使用精简输入和分轮对话，尚无执行报告 | CN: `prompts/copy-paste-prompt-lite-cn.md`; EN: `prompts/copy-paste-prompt-lite-en.md` |
| Kimi | Community testing needed | 44 | 0 | - | - | 未记录 | 适合长文本整理，但需要人工确认是否过早生成材料 | CN: `prompts/copy-paste-prompt-lite-cn.md`; EN: `prompts/copy-paste-prompt-lite-en.md` |
| 通义千问 | Experimental | 44 | 0 | - | - | 未记录 | 可迁移，尚未建立稳定测试记录 | CN: `prompts/copy-paste-prompt-lite-cn.md`; EN: `prompts/copy-paste-prompt-lite-en.md` |
| 豆包 | Experimental | 44 | 0 | - | - | 未记录 | 可迁移，建议使用短轮次和明确脱敏提醒 | CN: `prompts/copy-paste-prompt-lite-cn.md`; EN: `prompts/copy-paste-prompt-lite-en.md` |

## 迁移原则

- 不要求用户先写结构化表格；允许混乱输入。
- 首轮回复要短，最多问 1-3 个问题。
- 不要一上来生成完整简历。
- 用户同时发散到多个岗位、技能、材料、平台、教程或计划时，先归类分支，只保留 1 个本轮主线，其他暂存；不要把所有分支都展开成大清单。
- 涉及项目表达时，先检查项目事实是否足够。
- 涉及英文简历时，不要逐句翻译中文简历。
- 涉及简历、profile 或面试准备时，避免过度肯定；涉及英文面试或英文能力岗位时，优先自然、可说出口的英文表达。
- 涉及 token、上下文长度、手机端超时或跨模型复制时，复用已有卡片，优先输出差异补丁、替换段落和分轮展开。
- 涉及很多 JD、不知道投什么或岗位标题混乱时，先做 Role Family 聚类和 7 天验证，不继续输出岗位大清单。
- 涉及反复改简历、看到 JD 就烦或多份相近简历时，使用 Master Resume → Role Family Resume → JD Patch 和 Minimal Tailoring Mode，不恢复一 JD 一整份简历。
- 涉及投递/面试无结果时，先看漏斗、样本量和重复信号，区分 data point、signal、pattern 和 conclusion，不因少量失败推翻方向。
- 涉及最近在做或喜欢做的工作任务时，只把它作为定位假设；必须区分工作任务和爱好，并用项目事实、JD 或小验证确认。
- 涉及 Offer、谈薪、合同、薪资或高影响决策时，先区分正式 Offer、口头 Offer、进行中机会、雇佣关系、固定条件和不确定条件，只给整理、分析和建议，不替用户做最终选择。
- 涉及隐私、offer、合同、薪资、签证、医疗、法律时，只做提醒和风险边界。
- English-language entry 使用 [prompts/copy-paste-prompt-lite-en.md](../prompts/copy-paste-prompt-lite-en.md)；WorkBuddy 文档当前仍以中文为主。
- 对话语言不决定求职市场；只有当地区 / 市场上下文会改变当前判断时，才确认 target market、work authorization / sponsorship、location / remote eligibility、local resume convention 或 second-language communication。
- International / cross-market does not mean US-only；也不因为用户使用中文就默认 China-only。
- Remote 不等于 work from anywhere；不知道目标地区时，不给固定国家简历规则，不把 CV 自动当 academic CV。

## 待补

- 公开 15-30 秒 Demo GIF。
- 记录每个平台的完整测试日期、模型版本和通过数量。
- 保存各平台助手输出，用确定性 runner 生成真实行为测试报告。
- 后续再接入 LLM Judge 或人工语义评审。
- 在拥有 `workflow` 权限后启用 GitHub Actions。
