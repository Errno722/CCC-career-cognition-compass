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
    "知识库更新项",
    "下次面试准备动作",
  ],
  plan: [
    "当前阶段判断",
    "可用时间安排",
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

  if (has("gap", "空窗", "一年没工作", "长期没工作")) signals.push("Gap / 空窗");
  if (has("转行", "转岗", "换方向", "行业下行")) signals.push("转行 / 转岗");
  if (has("在职", "下班", "很累", "恢复不过来", "裸辞")) signals.push("在职压力");
  if (has("简历", "resume", "cv", "优化简历", "改简历")) signals.push("简历需求");
  if (has("jd", "岗位职责", "任职要求", "职位描述")) signals.push("JD 分析");
  if (has("面试", "复盘", "hr", "反馈", "继续等")) signals.push("面试 / 跟进");
  if (has("兼职", "临时工作", "过渡")) signals.push("兼职 / 过渡");
  if (has("英文简历", "linkedin", "海外", "open to work")) signals.push("海外 / 英文材料");

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

  return { signals, privacy, positioning };
}

function inferMode(state, signals) {
  if (state.mode !== "auto") return state.mode;
  if (signals.positioning.length >= 2) return "positioning";
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

  return `本地诊断

当前建议任务：${modeLabels[inferredMode]}

我听到的线索
${signals.signals.length ? signals.signals.map((item) => `- ${item}`).join("\n") : "- 信息还比较少，先做混乱整理"}

是否可能需要职业定位 / 候选人叙事重建
${positioningText}

隐私检查
- ${privacyText}

下一步
- 如果信息很乱：先复制“任务包”给 LLM / Agent。
- 如果定位信号较多：先让模型给 2-3 个定位卡，不要直接改简历。
- 如果只是快速处理材料：让模型只输出 1-3 个修改点或可替换段落。`;
}

function buildPrompt(state, signals, inferredMode) {
  const outputs = modeOutputs[inferredMode] || modeOutputs.clarify;
  const positioningHint = signals.positioning.length >= 2
    ? "我可能需要先做职业定位 / 候选人叙事重建。请先判断这是不是定位问题，再决定是否改材料。"
    : "如果你发现我的经历叙事很散、目标岗位和过往身份不匹配，请提醒我先做职业定位，而不是直接改材料。";
  const platformHint = state.platform === "WorkBuddy"
    ? "我会把这段内容发给 WorkBuddy 智能体。请控制回复长度，优先给清晰分段；如果内容较多，请分轮输出并提示我回复“继续”。"
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
6. 如果涉及简历，请先提醒脱敏；如果材料足够，只给 1-3 个最重要的修改建议。

请优先输出：
${outputs.map((item, index) => `${index + 1}. ${item}`).join("\n")}

我的原始输入：
${state.rawInput || "[这里粘贴我的混乱输入 / JD / 简历片段 / 面试回忆]"}

本地检测到的信号：
${signals.signals.length ? signals.signals.join("、") : "暂无明显信号"}

可能的定位重建信号：
${signals.positioning.length ? signals.positioning.join("、") : "暂无明显信号"}`;
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

下一步最小动作：
1. 先确认当前最重要任务：方向 / 简历 / JD / 面试 / 行动计划。
2. 补充 1 个最能证明自己的经历证据。
3. 如果要复制给 LLM，使用“任务包”标签页。`;
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
