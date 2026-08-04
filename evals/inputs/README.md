# Eval Inputs

这里放真实平台 Smoke Report 的输入模板。

## 文件规则

- `*.template.json` 可以提交，用来说明需要收集哪些平台回复。
- `*.input.json` 默认被 `.gitignore` 忽略，因为它可能包含完整助手回答。
- `evals/results/<adapter>/*.json` 可以提交，但必须只包含合成、脱敏的测试数据。
- 不要使用真实电话、邮箱、简历、offer、合同、薪资截图、完整面试记录或公司内部信息。

## 生成第一份真实 Smoke Report

复制模板：

```bash
cp evals/inputs/chatgpt-smoke.template.json \
  evals/inputs/chatgpt-smoke.input.json
```

然后打开 `evals/inputs/chatgpt-smoke.input.json`：

1. 将 `model` 改成真实平台显示的模型名称。
2. 逐个复制每个 case 的 `input` 字段，发送给正在运行 CCC 的平台。
3. 将平台返回的完整回复填入对应 `assistant_output`。
4. 确认所有内容都是合成测试数据，并且已经脱敏。

生成报告：

```bash
node scripts/generate-smoke-report.mjs \
  evals/inputs/chatgpt-smoke.input.json
```

脚本会强制保存 `assistant_output`，因此生成的报告是 `verification_level: recomputed`，可以被 `check-evals.mjs` 重新计算。

如果当天同名报告已经存在，脚本不会覆盖文件。可以指定新文件名：

```bash
node scripts/generate-smoke-report.mjs \
  evals/inputs/chatgpt-smoke.input.json \
  --output evals/results/chatgpt/2026-08-04-smoke-2.json
```

提交前至少运行：

```bash
node scripts/check-evals.mjs
node scripts/check-markdown-links.mjs
node scripts/test-deterministic-runner.mjs
git diff --check
```

如果没有真实模型输出，不要生成或提交 Smoke Report。
