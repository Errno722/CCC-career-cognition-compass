# CCC Usability Test Scenarios

这 6 个场景是连续测试，不是独立样例。目标是观察 CCC 能否从混乱输入一路推进到项目事实、JD 材料补丁和面试复盘。

## Scenario 1：混乱开场

**用户输入**

```text
我现在很乱 gap 8个月 之前做内容运营和用户运营 三年左右 也自己弄过一个shopify网站 学过一点ai工具 但不是ai岗位 不知道现在投运营 产品助理还是项目执行 面试的时候我又很容易讲太多细节 每天大概能拿出2小时 现在想尽快找个相对匹配的工作
```

**expected active thread**

先整理当前求职状态和本轮主线；主线应是“先判断可投方向和下一步”，不是立刻写完整简历。

**allowed required gate**

最多问 1-3 个问题，可围绕过去运营偏向、Shopify 项目做到什么程度、最想优先验证哪个方向。

**main output**

- 我听到的重点。
- 当前卡住的问题。
- 本轮主线。
- 暂存分支。
- 一个 5-20 分钟小动作。

**parked branches**

- 继续补项目。
- 继续看 JD。
- 继续准备面试表达。

**continuation label**

`继续补项目`

**completion condition**

用户知道本轮先做什么，并能用一个短标签继续下一轮。

## Scenario 2：恢复暂存分支

**用户输入**

```text
继续补项目
```

**expected active thread**

恢复 Scenario 1 暂存的项目分支，不重新做完整 onboarding。先给极简项目总表，再选择 Shopify 进入单项目深挖。

**allowed required gate**

最多问 1-3 个项目事实问题，例如项目目标、用户亲自负责部分、最终产出。

**main output**

- 说明正在进入“项目经历盘点与深挖”。
- 给出极简项目总表：
  - 已识别：Shopify 独立站。
  - 待补：运营工作中的活动 / 社群项目。
  - 待确认：AI 工具学习或个人产出。
- 本轮选择 Shopify，不要求用户一次讲完所有经历。
- 明确先补事实，不急着包装能力。
- 给出项目事实卡的空位或待补字段。

**parked branches**

- 继续看 JD。
- 继续准备面试表达。

**continuation label**

`继续补 Shopify`

**completion condition**

用户看到一个轻量项目全景，并被引导进入 Shopify 单项目深挖，而不是被要求一次列完所有经历。

## Scenario 3：Shopify 项目事实

**用户输入**

```text
这个shopify项目是我gap期间做的，想试一个小的海外独立站。我自己搭了网站，改主题，整理商品结构，写政策页面，配置了GA4和GSC，也用ai帮我想页面文案和学习怎么设置。最后网站能打开，但没有真正卖出去，也没有用户数据。
```

**expected active thread**

建立 Shopify 项目事实卡，判断单个项目状态。

**allowed required gate**

可以问 1-2 个关键缺口，例如商品类别、项目暂停原因、可展示证据；不能逼用户提供不存在的销售数据。

**main output**

- 项目事实卡。
- 个人贡献边界。
- 可用证据。
- 不能夸大的内容。
- 项目状态：`PARTIALLY_MAPPED`。
- 升级到 `EVIDENCE_READY` 还缺：
  - 可展示截图或页面。
  - 项目时间范围。
  - 暂停或未继续运营的原因。

**parked branches**

- 继续看 JD。
- 继续整理简历补丁。

**continuation label**

`继续看 JD`

**completion condition**

项目被还原为事实资产，状态使用 `DISCOVERED` / `PARTIALLY_MAPPED` / `EVIDENCE_READY` 中的离散值，且没有被写成商业成功。

## Scenario 4：合成 JD 拆解

**用户输入**

```text
这是一个产品运营JD：
负责用户运营和内容活动执行，跟进活动排期、用户反馈和数据看板；协同产品、设计、研发推进需求上线；能用Excel整理数据，有基础SQL更好；需要英文邮件沟通能力；希望候选人做事细致，有跨部门沟通和项目推进能力。
请帮我看这个岗位是什么类型，我该怎么改简历。
```

**expected active thread**

先判断 JD 岗位类型，再给简历补丁思路。

**allowed required gate**

如果已有项目事实卡足够，可以不继续追问；如果缺少简历基础结构，最多问 1 个问题。

**main output**

- JD 岗位类型：产品运营 / 用户运营 / 项目执行混合岗。
- 核心能力 2-3 条。
- 与测试用户经历的匹配点。
- 简历补丁：只给替换方向和 bullet 框架，不重写整份简历。
- 硬技能缺口与短期提升动作。

**parked branches**

- 继续准备面试。
- 继续补项目证据。

**continuation label**

`继续准备面试`

**completion condition**

用户知道这份 JD 不是纯产品经理，也不是纯内容运营，而是偏执行推进的产品运营 / 项目协调型岗位。

## Scenario 5：面试准备，不给逐字稿

**用户输入**

```text
继续准备面试。我自我介绍总是讲太多，帮我准备一下，但不要给我大段逐字稿。
```

**expected active thread**

面试表达结构训练，聚焦岗位卖点和可记忆框架。

**allowed required gate**

无需追问，除非缺少目标岗位。已有 JD 和项目事实足够进入框架输出。

**main output**

- 主卡片：自我介绍一二级框架。
- 聚焦 2 个岗位契合能力。
- 每个能力只配 1 条简单验证。
- 辅助提醒：回答过长时使用“观点 → 3 个要点 → 收束”。
- 下一步：选择一个项目问题继续练习。

**parked branches**

- 继续练项目回答。
- 继续准备反问。
- 继续补英文表达。
- 继续复盘面试。

**continuation label**

`继续练项目回答`

**completion condition**

输出只围绕自我介绍主卡片展开，是可记忆框架，不是难背的一大段话，也不是一次性完成全部面试准备。

## Scenario 6：面试复盘与 HR 反馈

**用户输入**

```text
我面完了，HR说我项目推进经验可能还不够，业务面试官觉得我回答有点散。我记不清完整问题，大概是问如果需求变更、用户反馈很多、研发排期冲突怎么办。
```

**expected active thread**

面试复盘，形成候选人面试资料卡补丁，并转向下一次机会或查缺补漏。

**allowed required gate**

最多问 1-2 个问题，例如反馈来自谁、是否重复出现、下一轮是否同类岗位；不能要求用户提供完整面试录音或真实公司信息。

**main output**

- 面试反馈拆解：来源、可信度、是否重复、影响范围。
- 候选人面试资料卡补丁。
- 下次面试改进重点。
- 针对“需求变更 / 用户反馈多 / 研发排期冲突”的回答框架。
- 提醒不要停留在已经发生的事太久，转向下一次机会或一个查缺补漏动作。

**parked branches**

- 继续补项目推进证据。
- 继续准备二面。

**continuation label**

`继续准备二面`

**completion condition**

用户得到可复用的复盘资料卡和下一步，不把一次反馈扩大成长期否定。
