# CCC Evals

这里保存 CCC 的行为测试合约。它们不是模型输出结果，也不是自动化模型行为测试，而是用来定义“什么算稳定行为”的最小检查标准。

目前包含：

- `cases.json`：从 WorkBuddy 36 个手工测试用例整理出的机器可读合约。
- `schema.json`：Eval suite 的结构说明。
- `result-schema.json`：已执行结果报告的结构说明。
- `rubrics.json`：语义断言的评分口径。
- `inputs/`：真实平台 Smoke Report 的输入模板，填写后的 `.input.json` 默认不提交。
- `fixtures/`：用于验证确定性 runner 的示例助手输出，不代表真实平台测试结果。

当前状态：

| 类型 | 数量 | 说明 |
| --- | ---: | --- |
| 手工测试场景 | 36 | 来源：[workbuddy/test-cases.md](../workbuddy/test-cases.md) |
| 机器可读合约 | 36 | 当前文件：[cases.json](cases.json) |
| 已登记语义断言 | 208 | 当前文件：[rubrics.json](rubrics.json) |
| 已人工细化核心 Rubric | 101 | 当前文件：[rubrics.json](rubrics.json) |
| 确定性 Runner | 0.2.0 | 当前文件：[scripts/lib/deterministic-eval.mjs](../scripts/lib/deterministic-eval.mjs) |
| 结果报告 Schema | 0.2.0 | 当前文件：[result-schema.json](result-schema.json) |
| 结果报告 | 0 | 暂未保存真实平台执行报告 |
| 总执行次数 | 0 | 由 `evals/results/` 中的报告动态计算 |
| 声明唯一覆盖 | 0/36 | 包含结构合法但不可复算的 `schema_only` 报告 |
| Runner 执行覆盖 | 0/36 | 只统计 `runner_generated` 和 `recomputed` 报告 |
| 公开平台覆盖 | 0/36 | 只统计非本地 adapter 的 Runner 执行结果 |
| Runner 唯一通过 | 0/36 | Runner 执行结果中至少一次确定性通过才计入 |
| 公开唯一通过 | 0/36 | 公开平台中至少一次确定性通过才计入 |
| 已验证 Runner 通过 | 0/36 | 只有 `recomputed` 结果计入 |
| 公开已验证通过 | 0/36 | 公开平台中只有 `recomputed` 结果计入 |
| 语义已审次数 | 0 | 暂未调用模型，也没有 LLM Judge |

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
- 按 [schema.json](schema.json) 校验 suite 结构，包括 `required`、`type`（含 `boolean`）、`const`、`enum`、`pattern`、`minItems` 和 `additionalProperties: false`；
- 按 [result-schema.json](result-schema.json) 校验已保存结果报告；
- suite schema 为 `0.3.0`；
- `evaluation_target` 为 `assistant_output_only`；
- case 数量与 `manual_case_count` 一致；
- case id 唯一；
- `manual_case_id` 必填、不重复，并且覆盖 `1...manual_case_count`；
- 必填字段存在；
- `routing.primary` 和 `routing.allowed_secondary` 都是本地真实存在的 skill；
- `literal_all_of`、`literal_any_of`、`literal_not_contains`、`regex_not_contains`、`semantic_assertions`、`semantic_must_not` 类型正确；
- 所有数组元素都是非空字符串；
- `regex_not_contains` 可以被编译为正则；
- `structural_assertions.max_questions` 在 0-4；
- 可选的 `max_characters` 为正整数；
- 每个 semantic id 都能在 [rubrics.json](rubrics.json) 找到评分说明；
- 所有 rubric，包括暂未引用的 draft rubric，都必须具备合法 `type`、`severity`、`description`、`pass_criteria` 和 `fail_signals`；
- Rubric 正反向类型与 `semantic_assertions` / `semantic_must_not` 一致；
- 未被 case 引用的 rubric 必须显式标为 `draft`；
- 被 case 引用的 rubric 不能标为 `draft`；
- `core_refined_rubrics` 中的 ID 必须存在、被引用且不重复；
- `evals/results/` 中的结果报告必须匹配 suite、引用真实 case，`cases` 不能为空，`run_id` 不能重复，并保持 `deterministic_pass`、`deterministic_status`、`checks` 和 `check_details` 一致；
- 结果报告必须保存到 `evals/results/<adapter>/`，且目录名必须等于报告内的 `adapter`；
- `evals/results/fixtures/` 会被忽略；`evals/results/local/` 可用于本地调试，但不进入公开平台覆盖；
- `runner_generated` 和 `recomputed` 报告必须使用当前支持的 `runner_version`；
- 结果报告中的 `suite_sha256` 必须等于当前 [cases.json](cases.json) 的 SHA-256；
- 当结果报告包含 `assistant_output` 时，`check-evals.mjs` 会重新计算 Hash、metrics 和全部确定性断言。

`check-evals.mjs` 只实现了 [schema.json](schema.json) 与 [result-schema.json](result-schema.json) 当前使用到的 JSON Schema 子集。不要在 schema 中新增 `oneOf`、`anyOf`、`allOf`、`if/then/else`、`format`、`unevaluatedProperties` 等关键字，除非同步扩展检查脚本。

## 真实平台 Smoke Report

Smoke Report 用来记录某个平台在 5 个核心 case 上的真实助手回复。当前仓库还没有正式真实报告：

```text
结果报告：0
公开平台覆盖：0/36
公开唯一通过：0/36
公开已验证通过：0/36
```

生成流程：

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

模板中的每个 case 都包含来自 [cases.json](cases.json) 的原始 `input`。测试时应逐条把这些 `input` 发送给正在运行 CCC 的平台，再把平台回复填回 `assistant_output`。

`generate-smoke-report.mjs` 会检查：

- 模板占位符已替换；
- `adapter`、`model` 和 40 位 `source_commit` 已填写；
- 工作区必须干净；
- `source_commit` 必须等于当前 `HEAD`；
- `source_commit` 对应提交中的 `evals/cases.json` 必须和 runner 报告中的 `suite_sha256` 匹配；
- 5 个必测 case 全部存在且不重复；
- 每个 case 的 `input` 与 [cases.json](cases.json) 完全一致；
- 每个 `assistant_output` 都是非空字符串；
- 报告不会静默覆盖已有文件。

脚本会强制 `include_assistant_output: true`，因此生成的报告为 `verification_level: recomputed`。Runner 退出码为 `1` 时仍会保存报告，因为真实平台可能存在部分确定性失败；退出码为 `2` 时不会保存报告。

默认输出：

```text
evals/results/<adapter>/<YYYY-MM-DD>-smoke.json
```

如果当天同名报告已经存在，指定新文件名：

```bash
node scripts/generate-smoke-report.mjs \
  evals/inputs/chatgpt-smoke.input.json \
  --output evals/results/chatgpt/2026-08-04-smoke-2.json
```

安全边界：

- `*.template.json` 可以提交；
- 填写后的 `*.input.json` 默认被 `.gitignore` 忽略；
- Result Report 可以提交，但必须只包含合成、脱敏测试数据；
- 不允许使用真实求职材料、真实联系方式、真实 offer、合同、薪资截图或完整面试记录。

生成后运行：

```bash
node scripts/check-evals.mjs
node scripts/check-shared-rules.mjs
node scripts/check-markdown-links.mjs
node scripts/test-deterministic-runner.mjs
node scripts/test-generate-smoke-report.mjs
git diff --check
```

## 确定性 Runner

对一份已有助手回答运行确定性检查：

```bash
node scripts/run-deterministic-eval.mjs evals/fixtures/greeting-pass.input.json
```

输入格式：

```json
{
  "case_id": "greeting-001",
  "assistant_output": "助手实际回复"
}
```

fixture 可以额外包含：

```json
{
  "expected_runner_status": "fail",
  "expected_failed_checks": ["regex_not_contains"]
}
```

这些字段只供 `test-deterministic-runner.mjs` 验证 runner 自身，不会进入结果报告。`expected_failed_checks` 用来确认 fixture 是因为指定断言失败，而不是因为别的原因失败。失败 fixture 必须提供非空且不重复的 `expected_failed_checks`。

也可以一次传入多份输入文件，生成一个结果报告：

```bash
node scripts/run-deterministic-eval.mjs \
  evals/fixtures/greeting-pass.input.json \
  evals/fixtures/interviewer-role-focus-pass.input.json
```

runner 会检查：

- `literal_all_of`
- `literal_any_of`
- `literal_not_contains`
- `regex_not_contains`
- `max_questions`
- `max_characters`

退出码：

| 退出码 | 含义 |
| ---: | --- |
| `0` | 输入合法，且所有确定性断言通过 |
| `1` | 输入合法，但至少一个确定性断言失败 |
| `2` | 输入 JSON、case id 或 runner/schema 处理错误 |

不要把预期失败 fixture 直接放进普通 CI 命令。请使用：

```bash
node scripts/test-deterministic-runner.mjs
```

它会读取 `expected_runner_status`，把预期失败当作 runner 自测通过。

runner 不会检查：

- `semantic_assertions`
- `semantic_must_not`
- 真实 skill 路由日志
- 模型版本质量

当 `literal_not_contains` 或 `regex_not_contains` 失败时，runner 只输出命中数量，不回显具体 forbidden literal 或正则命中的文本，避免把敏感内容写入结果报告。

字面匹配会先进行标准化：

- Unicode `NFKC`
- 英文大小写归一
- 连续空白压缩
- 首尾空白清理

隐私禁止项会同时检查原始输出和标准化输出。字符数使用 `Array.from(output).length` 统计 Unicode 字符，包含 Markdown 符号、换行和空白；问号数确定性统计中英文 `?` / `？`。`estimated_follow_up_question_count` 暂时标记为 `semantic_pending`，因为引用用户原话、示例话术和真实追问需要语义判断。

语义断言会在输出中保留为：

```json
{
  "semantic_status": "pending"
}
```

结果报告默认不保存完整 `assistant_output`，只保存 `assistant_output_sha256`、计数字段和检查结果，避免把敏感内容写入公开文件。只有在本地调试且确认脱敏时，才使用 `include_assistant_output: true`。

结果报告会记录：

- `suite_sha256`：执行时对应的 [cases.json](cases.json) 内容哈希；
- `source_commit`：可选，运行时可通过输入字段或 `SOURCE_COMMIT` 环境变量提供；真实平台结果必须填写 7-40 位 Git SHA；
- `verification_level`：`schema_only`、`runner_generated` 或 `recomputed`。

验证等级含义：

| 等级 | 含义 |
| --- | --- |
| `schema_only` | 只确认报告结构合法，不声称结果可复算 |
| `runner_generated` | 由 runner 生成，默认不保存助手原文 |
| `recomputed` | 报告包含 `assistant_output`，检查器可重新计算确定性结果 |

计数规则：

- `schema_only` 可以计入声明覆盖，但不计入 Runner 执行覆盖、唯一通过或公开平台覆盖；
- `runner_generated` 可以计入 Runner 执行覆盖和唯一通过，但不是独立复算；
- `recomputed` 可以计入已验证 Runner 通过；
- `local` 结果可以用于本地调试和普通执行统计，但不计入公开平台覆盖；
- 公开平台覆盖只统计非本地 adapter 中的 `runner_generated` 和 `recomputed` 结果；
- 如果报告包含 `assistant_output`，`verification_level` 必须是 `recomputed`；
- 真实平台结果需要 `source_commit` 和 `model` 非空；`fixture` / `local` 临时结果允许为空。

默认 `run_id`：

- `fixture` / `local` 默认使用固定 `local-deterministic-eval`；
- 其他 adapter 默认生成 `${adapter}-${ISO_TIME}-${UUID}`，避免多份真实报告冲突；
- 保存到 `evals/results/` 的报告仍会被 `check-evals.mjs` 检查全局 `run_id` 唯一。

如果未来保存真实平台执行结果，放入：

```text
evals/results/<adapter>/
```

不要把 fixture 自测结果混入真实平台结果。若需要临时保存 fixture 输出，放在 `evals/results/fixtures/`；兼容性矩阵只统计真实平台目录，例如 `evals/results/workbuddy/`、`evals/results/chatgpt/`。结果报告需要符合 [result-schema.json](result-schema.json)。`check-evals.mjs` 会按报告中的 `cases` 数组动态统计总执行次数、声明唯一覆盖、Runner 执行覆盖、公开平台覆盖和通过情况，而不是按 JSON 文件数量计数。

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
assistant_output_sha256
character_count
question_mark_count
routing_trace
judge_result
```

后续可以扩展：

- 确定性文本检查；
- LLM judge；
- 每个平台的人工抽检记录；
- Release 前 eval 报告。
