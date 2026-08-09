# CCC Usability Workflow

这里记录 CCC 的纵向体验测试流程。它不替代 `evals/`，也不新增行为合约；它用于观察一个使用者从混乱输入到下一步行动的真实体验摩擦。

## 测试目的

- 验证 CCC 是否真的先收束主线，而不是一次展开所有任务。
- 验证用户说“继续补项目”等短标签时，是否能恢复暂存分支。
- 验证项目事实卡、JD 拆解、简历补丁和面试准备是否能串成一个工作流。
- 观察回复是否过长、门禁是否过重、是否重复介绍背景、是否泄露内部字段。

## 测试材料

- [synthetic-user-profile.md](synthetic-user-profile.md)：完全虚构的测试用户背景。
- [test-scenarios.md](test-scenarios.md)：6 个连续使用场景。
- [english-edition-usability-plan.md](english-edition-usability-plan.md)：英文版人工连续体验测试计划。
- [observation-template.md](observation-template.md)：单轮观察记录模板。
- [friction-log.md](friction-log.md)：体验摩擦登记表。
- [demo-script.md](demo-script.md)：30-60 秒演示脚本。

## 使用方法

1. 选择一个入口：普通 LLM、Codex / Claude Code、WorkBuddy 或其他平台。
2. 使用项目中的 CCC prompt / skill / agent 配置启动对话。
3. 按 [test-scenarios.md](test-scenarios.md) 的顺序发送用户输入。
4. 每一轮都用 [observation-template.md](observation-template.md) 记录实际输出。
5. 只有当同一类问题重复出现，或影响主流程完成时，才写入 [friction-log.md](friction-log.md)。

## 观察原则

- 只使用合成材料，不使用真实简历、真实公司、真实联系方式或真实面试记录。
- 不要因为一次模型输出不好就立刻改规则；先区分是模型波动、平台限制，还是 CCC 规则本身的问题。
- 不要求每轮输出都完美；重点看用户是否能继续往前走。
- 普通用户输出不应出现 `focus_control`、`active_thread`、`parked_threads`、`candidate_interview_profile_patch` 等内部字段。
- 记录“本轮是否完成”，不要把“整个求职还没结束”误判成本轮失败。

## 通过信号

- 用户第一段很乱时，CCC 能抓住一个本轮主线。
- 其他分支被暂存，并有可继续的短标签。
- 用户说“继续补项目”时，不重新做完整 onboarding。
- 项目事实不足时，先补事实，不急着包装能力。
- JD 拆解能判断岗位类型和准备重点。
- 面试准备给框架和展开逻辑，不给难记的逐字稿。
- 面试复盘后能形成资料卡补丁，并提醒用户转向下一次机会或查缺补漏。

## 暂不观察

本目录不验证：

- 真实平台通过率。
- 模型语义评分。
- GitHub Actions。
- 用户是否最终拿到面试或 offer。
- 长期记忆是否真的由平台保存。
