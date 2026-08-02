# CCC Evals

这里保存 CCC 的行为测试合约。它们不是模型输出结果，也不是自动化模型行为测试，而是用来定义“什么算稳定行为”的最小检查标准。

目前包含：

- `cases.json`：从 WorkBuddy 22 个手工测试用例整理出的机器可读合约。

当前状态：

| 类型 | 数量 | 说明 |
| --- | ---: | --- |
| 手工测试场景 | 22 | 来源：[workbuddy/test-cases.md](../workbuddy/test-cases.md) |
| 机器可读合约 | 22 | 当前文件：[cases.json](cases.json) |
| 自动化模型行为测试 | 0 | 暂未调用模型，也没有 LLM Judge |

本地检查：

```bash
node scripts/check-evals.mjs
```

当前检查只验证：

- JSON 可解析；
- case id 唯一；
- 必填字段存在；
- `expected.route` 不为空；
- `literal_contains`、`literal_not_contains`、`semantic_assertions`、`semantic_must_not` 类型正确；
- `structural_assertions.max_questions` 在 0-3；
- 可选的 `max_characters` 为正整数。

## 断言类型

`cases.json` 将断言拆成三层：

| 字段 | 检查方式 | 说明 |
| --- | --- | --- |
| `literal_contains` | 程序字符串检查 | 未来可直接匹配输出中是否出现指定文本 |
| `literal_not_contains` | 程序字符串检查 | 未来可检查是否复述手机号、邮箱或敏感信息 |
| `structural_assertions` | 程序统计 | 例如最多追问数、最大回复长度 |
| `semantic_assertions` | LLM Judge 或人工检查 | 判断是否识别状态、给出小动作、正确路由等 |
| `semantic_must_not` | LLM Judge 或人工检查 | 判断是否编造经历、过早写简历、替用户做决定等 |

不要把 `semantic_assertions` 当成字符串。它们是行为概念，需要模型评审、路由日志或人工抽检确认。

后续可以扩展：

- 确定性文本检查；
- LLM judge；
- 每个平台的人工抽检记录；
- Release 前 eval 报告。
