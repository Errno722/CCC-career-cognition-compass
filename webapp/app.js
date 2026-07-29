const STORAGE_KEY = "ccc-local-webapp-v1";

const SAMPLE_INPUT = `我现在很乱，gap 一年多，之前做过运营，也学过一点 AI。
我不知道还能投什么岗位，感觉简历写出来不像目标岗位。
最近看到一些 JD 偏项目管理，但我又担心上一版简历会影响我投研发或 AI 应用方向。
每天大概能花 2 小时找工作，刷社交媒体越看越焦虑。
请先帮我整理，不要一上来生成一大堆材料。`;

const elements = {
  mode: document.querySelector("#mode"),
  status: document.querySelector("#status"),
  target: document.querySelector("#target"),
  timeBudget: document.querySelector("#timeBudget"),
  platform: document.querySelector("#platform"),
  constraints: document.querySelector("#constraints"),
  rawInput: document.querySelector("#rawInput"),
  diagnosisText: document.querySelector("#diagnosisText"),
  promptText: document.querySelector("#promptText"),
  summaryText: document.querySelector("#summaryText"),
  kbText: document.querySelector("#kbText"),
  saveButton: document.querySelector("#saveButton"),
  clearButton: document.querySelector("#clearButton"),
  exampleButton: document.querySelector("#exampleButton"),
  exportButton: document.querySelector("#exportButton"),
  toast: document.querySelector("#toast"),
};

const modeLabels = {
  auto: "自动判断",
  clarify: "混乱整理",
  project: "项目挖掘",
  positioning: "职业定位 / 候选人叙事",
  resume: "简历材料",
  jd: "JD 分析",
  review: "面试复盘",
  plan: "行动计划",
};

const modeOutputs = {
  clarify: [
    "我听到的重点",
    "还缺的关键信息",
    "初版硬技能知识库",
    "初版术语/缩写表",
    "下一步最该补充的 1-3 件事",
  ],
  project: [
    "项目总表",
    "项目事实完整度检查",
    "单项目事实卡",
    "单项目状态记录",
    "个人贡献边界",
    "证据缺口",
    "临时草稿边界",
    "下一步补证据动作",
  ],
  positioning: [
    "真实事实 / 可迁移证据 / 目标岗位语言",
    "2-3 个职业定位 / 候选人叙事卡",
    "需要弱化的内容",
    "面试中必须解释清楚的风险点",
    "确认定位后再改材料",
  ],
  resume: [
    "简历修改边界",
    "最值得改的 1-3 个位置",
    "通用简历是否需要市场语言转译",
    "可替换段落或 bullet",
    "不能编造的内容",
  ],
  jd: [
    "JD 核心任务",
    "硬技能 / 工具要求",
    "已有匹配证据",
    "短期补强动作",
    "业务 / 技术面试可能问题",
  ],
  review: [
    "面试关键词还原",
    "可能题型",
    "答题证据",
    "面试官反馈卡",
    "反馈可信度判断",
    "重复反馈统计",
    "回答卡点分类",
    "简历 / 面试方向调整",
    "JD / 方向选择调整",
    "下次面试回答卡",
    "面试体验评估",
    "知识库更新项",
    "下次面试准备动作",
  ],
  plan: [
    "当前阶段判断",
    "可用时间安排",
    "投递后空档期计划",
    "投递质量复盘",
    "JD 共性整理",
    "可复用资产补充",
    "信息摄入边界",
    "不超过 14 天行动计划",
    "每天 5-20 分钟小动作",
    "复盘问题",
  ],
};

function getState() {
  return {
    mode: elements.mode.value,
    status: elements.status.value,
    target: elements.target.value.trim(),
    timeBudget: elements.timeBudget.value.trim(),
    platform: elements.platform.value,
    constraints: elements.constraints.value.trim(),
    rawInput: elements.rawInput.value.trim(),
    kbText: elements.kbText.value.trim(),
  };
}

function setState(state) {
  Object.entries(state || {}).forEach(([key, value]) => {
    if (elements[key] && typeof value === "string") {
      elements[key].value = value;
    }
  });
}

function detectSignals(text) {
  const lower = text.toLowerCase();
  const has = (...words) => words.some((word) => lower.includes(word.toLowerCase()));

  const signals = [];
  const privacy = [];
  const positioning = [];
  const project = [];
  const review = [];
  const plan = [];

  if (has("gap", "空窗", "一年没工作", "长期没工作")) signals.push("Gap / 空窗");
  if (has("转行", "转岗", "换方向", "行业下行")) signals.push("转行 / 转岗");
  if (has("在职", "下班", "很累", "恢复不过来", "裸辞")) signals.push("在职压力");
  if (has("简历", "resume", "cv", "优化简历", "改简历")) signals.push("简历需求");
  if (has("jd", "岗位职责", "任职要求", "职位描述")) signals.push("JD 分析");
  if (has("面试", "复盘", "hr", "反馈", "继续等")) signals.push("面试 / 跟进");
  if (has("投完", "已投", "投了", "投递后", "没消息", "没有面试", "没有反馈", "等初筛", "等邀约", "空档期", "刷新招聘软件", "刷新软件")) {
    signals.push("投递后空档期");
    plan.push("需要投递后空档期计划");
  }
  if (has("一直刷新", "反复刷新", "刷招聘软件", "没有回复", "没人回", "还没回复", "还没反馈")) {
    plan.push("需要信息摄入 / 刷新边界");
  }
  if (has("投递质量", "海投", "投了很多", "投了好多", "投了 30", "投了30", "投了一批", "下一批")) {
    plan.push("需要复盘投递质量和下一批策略");
  }
  if (has("刚面试", "面试完", "面试复盘", "只记得", "不记得完整问题", "面试官", "hr反馈", "hr 反馈", "recruiter反馈", "反馈说", "经验不足", "没通过原因")) {
    review.push("需要面试复盘 / 反馈挖掘");
  }
  if (has("项目不够深入", "业务理解不够", "技术深度不足", "经验不足", "不够匹配")) {
    review.push("面试官反馈可能影响简历 / 面试方向");
  }
  if (has("hr说", "hr 说", "hr反馈", "hr 反馈", "recruiter", "拒信", "面试官说", "自己感觉", "我感觉")) {
    review.push("需要区分反馈来源类型和可信度");
  }
  if (has("几次面试", "连续", "每次都", "又被说", "重复", "多次", "三次", "两次")) {
    review.push("需要判断 first_signal / repeated_signal / pattern");
  }
  if (has("答得不好", "没答好", "卡住", "没说出来", "不知道怎么答", "紧张")) {
    review.push("需要回答卡点分类和下次面试回答卡");
  }
  if (has("兼职", "临时工作", "过渡")) signals.push("兼职 / 过渡");
  if (has("英文简历", "linkedin", "海外", "open to work")) signals.push("海外 / 英文材料");
  if (has("项目", "作品集", "portfolio", "独立站", "shopify", "网站", "小程序", "agent", "skill")) {
    signals.push("项目经历");
    project.push("提到项目或作品素材");
  }
  if (has("说不清", "有什么价值", "算不算项目", "没有数据", "没有销售", "失败", "暂停", "写不出来")) {
    project.push("项目边界 / 结果 / 价值不清晰");
  }
  if (has("我做了什么", "亲自", "参与", "协助", "团队", "贡献")) {
    project.push("需要确认个人贡献边界");
  }
  if (has("临时版本", "临时草稿", "赶着投", "先写一个", "保守版本")) {
    project.push("可能需要临时草稿模式");
  }
  if (has("英文", "english", "linkedin", "海外")) {
    project.push("英文 / LinkedIn 项目表达也需要事实门禁");
  }

  if (has("经历很散", "很散", "不知道怎么介绍", "不知道我算什么")) {
    positioning.push("经历叙事不清");
  }
  if (has("不像目标岗位", "不贴合", "投多个方向", "互相污染", "上一版简历")) {
    positioning.push("材料定位可能互相污染");
  }
  if (has("转行", "转岗", "行业下行", "不想继续原行业")) {
    positioning.push("过往身份和目标方向可能不匹配");
  }
  if (has("gap", "空窗", "一年多", "解释")) {
    positioning.push("Gap 解释需要纳入定位");
  }
  if (has("重新做人设", "人设", "重新定位", "包装自己", "职业叙事")) {
    positioning.push("用户主动提出定位重建");
  }

  if (/\b1[3-9]\d{9}\b/.test(text)) privacy.push("疑似手机号");
  if (/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i.test(text)) privacy.push("疑似邮箱");
  if (has("身份证", "护照", "offer", "合同", "薪资截图", "内部", "客户信息")) {
    privacy.push("可能包含敏感材料");
  }

  return { signals, privacy, positioning, project, review, plan };
}

function inferMode(state, signals) {
  if (state.mode !== "auto") return state.mode;
  if (signals.review.length >= 1) return "review";
  if (signals.project.length >= 1) return "project";
  if (signals.positioning.length >= 2) return "positioning";
  if (signals.plan.length >= 1) return "plan";
  if (signals.signals.includes("JD 分析")) return "jd";
  if (signals.signals.includes("简历需求")) return "resume";
  if (signals.signals.includes("面试 / 跟进")) return "review";
  if (state.timeBudget || signals.signals.includes("兼职 / 过渡")) return "plan";
  return "clarify";
}

function lineOrEmpty(label, value) {
  return value ? `${label}：${value}` : `${label}：未填写`;
}

function buildDiagnosis(state, signals, inferredMode) {
  const privacyText = signals.privacy.length
    ? `发现可能需要脱敏：${signals.privacy.join("、")}。复制给外部模型前请替换成 [已脱敏]。`
    : "未发现明显手机号/邮箱等格式，但仍建议手动检查公司、薪资、offer、合同和内部信息。";

  const positioningText = signals.positioning.length
    ? signals.positioning.map((item) => `- ${item}`).join("\n")
    : "- 暂未看到明显定位重建信号";
  const projectText = signals.project.length
    ? signals.project.map((item) => `- ${item}`).join("\n")
    : "- 暂未看到明显项目深挖信号";
  const reviewText = signals.review.length
    ? signals.review.map((item) => `- ${item}`).join("\n")
    : "- 暂未看到明显面试复盘信号";
  const planText = signals.plan.length
    ? signals.plan.map((item) => `- ${item}`).join("\n")
    : "- 暂未看到明显投递后空档期信号";
  const projectState = signals.project.length >= 2
    ? "DISCOVERED / PARTIALLY_MAPPED"
    : signals.project.length === 1
      ? "DISCOVERED"
      : "未判断";

  return `本地诊断

当前建议任务：${modeLabels[inferredMode]}

我听到的线索
${signals.signals.length ? signals.signals.map((item) => `- ${item}`).join("\n") : "- 信息还比较少，先做混乱整理"}

是否可能需要职业定位 / 候选人叙事重建
${positioningText}

是否可能需要项目经历盘点 / 深挖
${projectText}

是否可能需要面试复盘 / 面试官反馈挖掘
${reviewText}

是否可能需要投递后空档期计划
${planText}

项目事实初步状态
- ${projectState}

隐私检查
- ${privacyText}

下一步
- 如果信息很乱：先复制“任务包”给 LLM / Agent。
- 如果项目事实不清：先让模型做项目总表、完整度检查和单项目事实卡，不要直接写简历 bullet、作品集案例或岗位匹配结论。
- 如果刚面试完或收到反馈：先让模型做面试关键词复盘、面试官反馈卡、反馈可信度判断、重复反馈统计、知识库更新和简历/面试/JD 方向调整。
- 如果投完简历但没有消息：先做投递后空档期计划，复盘投递质量、整理 JD 共性、补一个可复用资产，并设置信息摄入边界。
- 如果定位信号较多：先让模型给 2-3 个定位卡，不要直接改简历。
- 如果只是快速处理材料：让模型只输出 1-3 个修改点或可替换段落。`;
}

function buildPrompt(state, signals, inferredMode) {
  const outputs = modeOutputs[inferredMode] || modeOutputs.clarify;
  const positioningHint = signals.positioning.length >= 2
    ? "我可能需要先做职业定位 / 候选人叙事重建。请先判断这是不是定位问题，再决定是否改材料。"
    : "如果你发现我的经历叙事很散、目标岗位和过往身份不匹配，请提醒我先做职业定位，而不是直接改材料。";
  const platformHint = ["WorkBuddy", "Coze / Bot", "公众号短输入"].includes(state.platform)
    ? "我会把这段内容发给容易超时或适合短回复的平台。请默认短回复：1 个当前判断、1 个下一步小动作、最多 2 个追问；如果内容较多，请分轮输出并提示我回复“继续”。"
    : "";

  return `请你作为 CCC（Career Cognition Compass），一个求职澄清与辅导助手。

请先提醒我：你只提供整理、分析和建议，最终决定仍由我自己结合现实情况做。

本轮任务：${modeLabels[inferredMode]}
使用出口：${state.platform}
${lineOrEmpty("当前状态", state.status)}
${lineOrEmpty("目标方向 / JD", state.target)}
${lineOrEmpty("可用时间", state.timeBudget)}
${lineOrEmpty("限制条件", state.constraints)}
${platformHint ? `平台提醒：${platformHint}` : ""}

请遵守：
1. 接受混乱输入，不要求我整理成表格。
2. 每轮最多问 3 个关键问题。
3. 不要默认生成大报告。
4. 不编造学历、公司、岗位、项目、数据、证书、奖项或陌生身份。
5. ${positioningHint}
6. 如果涉及项目经历，请先做项目总表和项目事实完整度检查，按单个项目标记 DISCOVERED / PARTIALLY_MAPPED / EVIDENCE_READY；EVIDENCE_READY 不等于必须有量化数据。
7. 只有 EVIDENCE_READY 项目才能进入正式简历 bullet、英文 bullet、LinkedIn、作品集案例、JD 定制表达或能力迁移。
8. 如果我明确要求临时版本，可以用 PARTIALLY_MAPPED 项目写保守临时草稿，但必须列出事实依据、未知字段、不能使用的强表述和后续需要补充的内容。
9. 如果涉及面试复盘，请区分 confirmed / inference / needs_confirmation / action；记录反馈来源类型、来源岗位 / JD / 面试轮次。单次反馈是 first_signal，第二次类似反馈是 repeated_signal，多次跨相似 JD 出现才视为 pattern。
10. 面试反馈需要判断可信度：directness、specificity、evidence_match，以及 action_level。模糊、转述或泛化拒信默认只记录或准备回答卡，不直接修改主简历或投递方向。
11. 如果我说答得不好，请先判断卡点类型：没听懂题、没有结构、没有案例、有案例但没说成岗位语言、项目事实不清、技术/工具不会、紧张表达断裂，或题目和 JD 不匹配。
12. 面试复盘后最多生成 1-3 张下次面试回答卡，并评估面试体验；不要把所有问题都归因到我身上。
13. 如果涉及简历，请先提醒脱敏；如果材料足够，只给 1-3 个最重要的修改建议。
14. 如果是投递后空档期，请输出当前阶段、暂时不建议做的事、投递质量复盘、JD 共性整理、一个可补硬技能 / 项目证据 / 回答卡 / 投递记录等可复用资产、信息摄入边界和今天 5-20 分钟动作；不要只建议继续海投、反复刷新或无限大改简历。

请优先输出：
${outputs.map((item, index) => `${index + 1}. ${item}`).join("\n")}

我的原始输入：
${state.rawInput || "[这里粘贴我的混乱输入 / JD / 简历片段 / 面试回忆]"}

本地检测到的信号：
${signals.signals.length ? signals.signals.join("、") : "暂无明显信号"}

可能的定位重建信号：
${signals.positioning.length ? signals.positioning.join("、") : "暂无明显信号"}

可能的项目深挖信号：
${signals.project.length ? signals.project.join("、") : "暂无明显信号"}

可能的面试复盘信号：
${signals.review.length ? signals.review.join("、") : "暂无明显信号"}

可能的投递后空档期信号：
${signals.plan.length ? signals.plan.join("、") : "暂无明显信号"}`;
}

function buildSummary(state, signals, inferredMode) {
  return `本轮求职摘要

当前状态：${state.status || "待确认"}
目标方向 / JD：${state.target || "待确认"}
当前任务：${modeLabels[inferredMode]}
可用时间：${state.timeBudget || "待确认"}
限制条件：${state.constraints || "待确认"}

已识别线索：
${signals.signals.length ? signals.signals.map((item) => `- ${item}`).join("\n") : "- 待补充"}

定位重建判断：
${signals.positioning.length ? signals.positioning.map((item) => `- ${item}`).join("\n") : "- 暂不明显"}

项目深挖判断：
${signals.project.length ? signals.project.map((item) => `- ${item}`).join("\n") : "- 暂不明显"}

面试复盘判断：
${signals.review.length ? signals.review.map((item) => `- ${item}`).join("\n") : "- 暂不明显"}

投递后空档期判断：
${signals.plan.length ? signals.plan.map((item) => `- ${item}`).join("\n") : "- 暂不明显"}

项目事实状态：
${signals.project.length ? "- 先按 DISCOVERED / PARTIALLY_MAPPED 处理，补齐后再判断是否 EVIDENCE_READY" : "- 未判断"}

下一步最小动作：
1. 先确认当前最重要任务：方向 / 简历 / JD / 面试 / 行动计划。
2. 如果项目事实不清，先做项目总表，再选 1 个项目补成事实卡。
3. 如果有面试官反馈，先记录来源类型、来源岗位、可信度和重复次数，再转成简历 / 面试 / JD 方向 / 知识库更新项。
4. 如果投完简历但没有消息，先复盘投递质量和 JD 共性，再补一个可复用资产，不要一直刷新软件。
5. 如果赶着投递，只做临时草稿并标出未知字段。
6. 如果要复制给 LLM，使用“任务包”标签页。`;
}

function render() {
  const state = getState();
  const signals = detectSignals([state.rawInput, state.target, state.constraints].join("\n"));
  const inferredMode = inferMode(state, signals);

  elements.diagnosisText.textContent = buildDiagnosis(state, signals, inferredMode);
  elements.promptText.textContent = buildPrompt(state, signals, inferredMode);
  elements.summaryText.textContent = buildSummary(state, signals, inferredMode);
}

function persist(showMessage = false) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(getState()));
  if (showMessage) showToast("已保存在本机浏览器");
}

function restore() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
    setState(saved);
  } catch {
    localStorage.removeItem(STORAGE_KEY);
  }
}

function showToast(message) {
  elements.toast.textContent = message;
  elements.toast.classList.add("show");
  window.setTimeout(() => elements.toast.classList.remove("show"), 1800);
}

async function copyText(id) {
  const node = document.querySelector(`#${id}`);
  const value = node.value ?? node.textContent;
  try {
    await navigator.clipboard.writeText(value);
    showToast("已复制");
  } catch {
    const helper = document.createElement("textarea");
    helper.value = value;
    document.body.appendChild(helper);
    helper.select();
    document.execCommand("copy");
    helper.remove();
    showToast("已复制");
  }
}

function exportMarkdown() {
  const state = getState();
  const content = [
    "# CCC Local Export",
    "",
    "## 任务包",
    "",
    elements.promptText.textContent,
    "",
    "## 本轮摘要",
    "",
    elements.summaryText.textContent,
    "",
    "## 本地知识库",
    "",
    state.kbText || "暂无",
  ].join("\n");
  const blob = new Blob([content], { type: "text/markdown;charset=utf-8" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = `ccc-local-export-${new Date().toISOString().slice(0, 10)}.md`;
  link.click();
  URL.revokeObjectURL(link.href);
  showToast("已导出 Markdown");
}

document.querySelectorAll("input, select, textarea").forEach((node) => {
  node.addEventListener("input", () => {
    render();
    persist(false);
  });
});

document.querySelectorAll("[data-copy]").forEach((button) => {
  button.addEventListener("click", () => copyText(button.dataset.copy));
});

document.querySelectorAll(".tab").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".tab").forEach((tab) => tab.classList.remove("active"));
    document.querySelectorAll(".output-panel").forEach((panel) => panel.classList.remove("active"));
    button.classList.add("active");
    document.querySelector(`[data-panel="${button.dataset.tab}"]`).classList.add("active");
  });
});

elements.saveButton.addEventListener("click", () => persist(true));
elements.exportButton.addEventListener("click", exportMarkdown);
elements.exampleButton.addEventListener("click", () => {
  elements.rawInput.value = SAMPLE_INPUT;
  render();
  persist(true);
});
elements.clearButton.addEventListener("click", () => {
  if (!window.confirm("确认清空本地输入和知识库？")) return;
  localStorage.removeItem(STORAGE_KEY);
  setState({
    mode: "auto",
    status: "",
    target: "",
    timeBudget: "",
    platform: "普通 LLM",
    constraints: "",
    rawInput: "",
    kbText: "",
  });
  render();
  showToast("已清空本地数据");
});

restore();
render();
