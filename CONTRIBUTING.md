# Contributing

感谢你愿意改进 CCC。CCC 是 Career Cognition Compass 的缩写，它关注求职之前的混乱阶段：状态、经历证据、项目事实、方向判断、JD、简历、面试复盘和下一步行动。

这个项目欢迎小而具体的贡献。越贴近真实使用场景，越有价值。

## 可以贡献什么

- 某个求职场景的测试用例；
- 某个 skill 的触发条件改进；
- 某个行业、岗位或缩写的歧义补充；
- WorkBuddy 或飞书部署中的实际失败案例；
- README、Quickstart、Prompt 的措辞改进；
- 面试复盘、项目经历深挖、投递后空档期等流程的边界补充。

## 不要提交什么

请不要提交：

- 真实简历；
- 电话、邮箱、身份证、护照、签证号码；
- offer、合同、薪资截图；
- 完整面试逐字稿；
- 公司内部信息、客户信息或未公开项目；
- 任何未经同意的他人求职材料。

如果需要举例，请使用虚构材料或彻底脱敏后的片段。

## 提交反馈前

建议先说明：

```text
使用入口：普通 LLM / Codex Skill / Claude Code / WorkBuddy / 飞书 / 其他
使用场景：混乱开局 / 项目经历 / JD 分析 / 简历修改 / 面试复盘 / 投递后空档期 / 其他
你期待它怎么回应：
实际回应哪里不合适：
是否包含隐私：已脱敏 / 不涉及
```

## 修改原则

CCC 的核心原则是：

- 先澄清人，再处理岗位；
- 先还原经历事实，再提炼能力；
- 不把推断写成事实；
- 不编造学历、公司、岗位、项目、证书、客户或数据；
- 不把参与写成主导，不把了解写成熟练；
- 少输出可收藏的大材料，多给能行动的小步骤；
- AI 只提供整理、分析和建议，最终决定由使用者自己做。

如果一个改动会让 CCC 变成“更会包装简历但更少帮助用户理解自己”，需要谨慎。

## Pull Request 建议

一个 PR 尽量只做一类改动：

```text
docs: improve quickstart
skill: refine project mining gate
prompt: reduce template-like opening
workbuddy: add deployment test case
```

提交前建议检查：

```text
node scripts/check-evals.mjs
node scripts/check-shared-rules.mjs
node scripts/check-markdown-links.mjs
node scripts/test-deterministic-runner.mjs
node scripts/test-generate-smoke-report.mjs
git diff --check
```

如果改了 `skills/`，建议用 Codex Skill Creator 的 `quick_validate.py` 检查每个 skill。

## Issue 类型

如果你不想提交 PR，可以开 issue：

- 使用反馈；
- skill 改进；
- 部署问题；
- 文档问题；
- 隐私或安全边界问题。

请尽量提供最小复现输入，不要提交真实求职材料。
