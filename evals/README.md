# CCC Evals

这里保存 CCC 的行为测试合约。它们不是模型输出结果，而是用来定义“什么算稳定行为”的最小检查标准。

目前包含：

- `cases.json`：从 WorkBuddy 手工测试用例整理出的机器可读合约。

本地检查：

```bash
node scripts/check-evals.mjs
```

当前检查只验证：

- JSON 可解析；
- case id 唯一；
- 必填字段存在；
- `expected.route`、`must_include`、`must_not` 等字段类型正确；
- `max_questions` 在合理范围内。

后续可以扩展：

- 确定性文本检查；
- LLM judge；
- 每个平台的人工抽检记录；
- Release 前 eval 报告。
