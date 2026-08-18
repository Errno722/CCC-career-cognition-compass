# Friction Log

这里记录重复出现或影响主流程的体验摩擦。不要登记单次偶发的模型波动；先用 [observation-template.md](observation-template.md) 观察，再决定是否进入本表。

| ID | 日期 | 场景 | friction_type | 摩擦描述 | 等级 | 重复次数 | 影响入口 | 影响 | 临时处理 | possible_fix | 是否需要修复 |
| --- | --- | --- | --- | --- | --- | ---: | --- | --- | --- | --- | --- |
| CF-001 | 2026-08-19 | Chinese Canonical Turn 3：一句零散项目描述 | unnecessary_template / internal_state_exposure | 回复直接展示 `project_id`、`status`、`missing_fields`、`eligible_for_downstream` 等八列表格，并在事实很少时对用户展示 `PARTIALLY_MAPPED`。 | P1 | 1 | 中文 Prompt | 未编造事实，但增加理解负担，暴露实现式字段，并把“继续回忆项目”变成填写系统档案。 | 忽略字段名，只继续补项目目标、本人行动和结果。 | 保留内部项目状态；用户侧改成已确认事实、还缺什么、下一步最多 1-3 个问题。单独下一轮修，不在本次观察中改 Prompt。 | yes |

## Friction Types

常用类型：

```text
repeated_question
context_loss
overlong_reply
premature_direction_reset
too_many_actions
unnatural_wording
unnecessary_template
wrong_priority
stale_state
contradictory_advice
```

## 预留观察项

- 用户说“继续补项目”时，是否能恢复暂存分支。
- CCC 是否反复重新介绍自己。
- 隐私提醒是否过多，影响任务推进。
- 必要门禁是否扩展成完整 onboarding。
- 输出是否一次给太多卡片。
- 是否重复询问已经出现过的背景。
- 普通用户回复是否出现内部英文键名。
- 项目状态是否清楚，用户能否理解为什么还不能包装。
- 暂存分支是否在后续对话中被遗忘。
- 是否能区分“本轮任务完成”和“整个求职还没有结束”。
- 新事件是否被误当成最终结论。
- 用户没执行上次动作时，是否被责备或继续收到同样的大动作。
- 当前判断是否过期但没有被更新。
- 不同轮次建议是否互相矛盾。
