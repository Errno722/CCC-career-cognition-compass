# CCC Evals

这里保存 CCC 的行为测试合约。它们不是模型输出结果，也不是自动化模型行为测试，而是用来定义“什么算稳定行为”的最小检查标准。

目前包含：

- `cases.json`：从 WorkBuddy 22 个手工测试用例整理出的机器可读合约。
- `schema.json`：Eval suite 的结构说明。
- `rubrics.json`：语义断言的评分口径。

当前状态：

| 类型 | 数量 | 说明 |
| --- | ---: | --- |
| 手工测试场景 | 22 | 来源：[workbuddy/test-cases.md](../workbuddy/test-cases.md) |
| 机器可读合约 | 22 | 当前文件：[cases.json](cases.json) |
| 自动化模型行为测试 | 0 | 暂未调用模型，也没有 LLM Judge |

评估对象：

```text
assistant_output_only
```

也就是说，后续执行器只能对“助手回复内容”做断言，不能把用户输入、系统提示、完整对话记录和路由日志混在一起做字符串匹配。隐私测试尤其依赖这个边界。

本地检查：

```bash
node scripts/check-evals.mjs
```

当前检查会验证：

- JSON 可解析；
- suite schema 为 `0.2.0`；
- `evaluation_target` 为 `assistant_output_only`；
- case 数量与 `manual_case_count` 一致；
- case id 唯一；
- `manual_case_id` 必填、不重复，并且覆盖 `1...22`；
- 必填字段存在；
- `routing.primary` 和 `routing.allowed_secondary` 都是本地真实存在的 skill；
- `literal_all_of`、`literal_any_of`、`literal_not_contains`、`regex_not_contains`、`semantic_assertions`、`semantic_must_not` 类型正确；
- 所有数组元素都是非空字符串；
- `regex_not_contains` 可以被编译为正则；
- `structural_assertions.max_questions` 在 0-3；
- 可选的 `max_characters` 为正整数；
- 每个 semantic id 都能在 [rubrics.json](rubrics.json) 找到评分说明。

## 断言类型

`cases.json` 将断言拆成三层：

| 字段 | 检查方式 | 说明 |
| --- | --- | --- |
| `literal_all_of` | 程序字符串检查 | 所有指定文本都应出现在助手输出中，只放真正必须出现的文本 |
| `literal_any_of` | 程序字符串检查 | 每组同义表达中至少出现一个，降低固定措辞导致的误判 |
| `literal_not_contains` | 程序字符串检查 | 未来可检查是否复述手机号、邮箱或敏感信息 |
| `regex_not_contains` | 程序正则检查 | 未来可检查手机号、邮箱等模式化敏感信息 |
| `structural_assertions` | 程序统计 | 例如最多追问数、最大回复长度 |
| `semantic_assertions` | LLM Judge 或人工检查 | 判断是否识别状态、给出小动作、正确路由等 |
| `semantic_must_not` | LLM Judge 或人工检查 | 判断是否编造经历、过早写简历、替用户做决定等 |

不要把 `semantic_assertions` 当成字符串。它们是行为概念，需要模型评审、路由日志或人工抽检确认。

## 路由语义

`routing.mode = primary_required` 表示：

- `primary` 是预期主处理 skill；
- `allowed_secondary` 是允许的辅助 skill，不代表每次都必须调用；
- 普通 LLM 或复制 prompt 场景通常没有可观察路由日志，此时只能从助手输出做语义判断；
- Codex、WorkBuddy 等 Agent 场景如果能导出 `routing_trace`，后续可单独验证真实路由。

后续执行器建议保存：

```text
input
raw_assistant_output
normalized_assistant_output
routing_trace
judge_result
```

后续可以扩展：

- 确定性文本检查；
- LLM judge；
- 每个平台的人工抽检记录；
- Release 前 eval 报告。
