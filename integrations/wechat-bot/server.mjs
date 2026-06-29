import http from "node:http";
import { createHash } from "node:crypto";

const port = Number(process.env.PORT || 3000);
const host = process.env.HOST || "127.0.0.1";
const token = process.env.WECHAT_TOKEN || "ccc_test_2026";

function sha1(value) {
  return createHash("sha1").update(value).digest("hex");
}

function verifySignature(params) {
  const signature = params.get("signature");
  const timestamp = params.get("timestamp");
  const nonce = params.get("nonce");

  if (!signature || !timestamp || !nonce) {
    return false;
  }

  const expected = sha1([token, timestamp, nonce].sort().join(""));
  return expected === signature;
}

function xmlValue(xml, tagName) {
  const cdataPattern = new RegExp(`<${tagName}>\\s*<!\\[CDATA\\[([\\s\\S]*?)\\]\\]>\\s*</${tagName}>`);
  const cdataMatch = xml.match(cdataPattern);
  if (cdataMatch) {
    return cdataMatch[1];
  }

  const textPattern = new RegExp(`<${tagName}>([\\s\\S]*?)</${tagName}>`);
  const textMatch = xml.match(textPattern);
  return textMatch ? textMatch[1].trim() : "";
}

function cdata(value) {
  return `<![CDATA[${String(value).replaceAll("]]>", "]]]]><![CDATA[>")}]]>`;
}

function textReply({ toUser, fromUser, content }) {
  const now = Math.floor(Date.now() / 1000);
  return `<xml>
<ToUserName><![CDATA[${toUser}]]></ToUserName>
<FromUserName><![CDATA[${fromUser}]]></FromUserName>
<CreateTime>${now}</CreateTime>
<MsgType><![CDATA[text]]></MsgType>
<Content>${cdata(content)}</Content>
</xml>`;
}

function hasAny(text, keywords) {
  return keywords.some((keyword) => text.includes(keyword.toLowerCase()));
}

function numbered(items) {
  return items.map((item, index) => `${index + 1}. ${item}`).join("\n");
}

function cccReply(rawContent) {
  const content = rawContent.trim();
  const text = content.toLowerCase();

  if (!content) {
    return [
      "CCC 收到了。",
      "",
      "你可以直接发一段很乱的话，不用整理格式。",
      "例如：我现在很乱，gap 一年多，之前做过运营，不知道还能投什么。"
    ].join("\n");
  }

  if (hasAny(text, ["帮助", "菜单", "怎么用", "使用说明"])) {
    return [
      "CCC 可以先帮你把求职混乱信息整理清楚。",
      "",
      "你可以直接发：",
      numbered([
        "一段很乱的个人情况",
        "一个 JD 或岗位要求",
        "面试后记得的关键词",
        "在职很累/离职犹豫的状态"
      ]),
      "",
      "请先脱敏，不要发电话、身份证、offer、合同或完整简历。"
    ].join("\n");
  }

  if (hasAny(text, ["隐私", "脱敏", "身份证", "电话", "邮箱", "offer", "合同", "薪资"])) {
    return [
      "隐私提醒：请先脱敏。",
      "",
      "不要在对话里发送：",
      numbered(["身份证/护照/签证号码", "电话、邮箱、完整住址", "offer、合同、薪资截图", "公司内部信息或完整面试记录"]),
      "",
      "可以用：[城市]、[公司A]、[岗位B]、[数据已脱敏]。"
    ].join("\n");
  }

  if (hasAny(text, ["裸辞", "离职", "辞职", "要不要走", "要不要辞"])) {
    return [
      "CCC 只提供整理和建议，最终决定仍由你自己做。",
      "",
      "我听到的重点：你在考虑离职/裸辞，但还需要先判断风险。",
      "",
      "先补充 3 件事：",
      numbered(["现金流能撑多久？", "现在最想逃离的是工作内容、人、强度，还是方向？", "最近 2 周有没有投递或面试反馈？"]),
      "",
      "今天先不要急着做决定，先把上面 3 点写清楚。"
    ].join("\n");
  }

  if (hasAny(text, ["在职", "很累", "焦虑", "恢复不过来", "撑不住", "消耗", "下班"])) {
    return [
      "CCC 只提供整理和建议，最终决定仍由你自己做。",
      "",
      "我听到的重点：你现在可能不是先缺简历，而是需要先拆清楚消耗来源。",
      "",
      "先做一个 5 分钟记录：",
      numbered(["今天最消耗你的 1 件事是什么？", "它来自工作量、关系、绩效压力，还是方向不合？", "今晚能先暂停哪一件让你更焦虑的事？"]),
      "",
      "如果涉及严重健康、安全、骚扰或欠薪，请优先找可信的人或专业支持。"
    ].join("\n");
  }

  if (hasAny(text, ["jd", "职位描述", "岗位描述", "招聘要求", "岗位要求", "任职要求"])) {
    return [
      "可以，把 JD 直接贴过来，先脱敏公司名、HR 名字、邮箱和薪资细节。",
      "",
      "我会先拆 4 件事：",
      numbered(["岗位核心任务", "硬技能和工具要求", "你已有经历里可匹配的证据", "短期最该补的 1-3 个缺口"]),
      "",
      "如果你已经有简历，我会先给“简历修改补丁”，不默认重写整份简历。"
    ].join("\n");
  }

  if (hasAny(text, ["面试", "复盘", "追问", "反馈", "sql", "dashboard", "留存", "用户分层"])) {
    return [
      "我先按面试复盘处理。",
      "",
      "如果你记不清完整问题，可以只发关键词。",
      "",
      "请补充：",
      numbered(["岗位名称或方向", "你记得的关键词", "哪一题答得卡住了"]),
      "",
      "我会帮你整理成：可能题型、考察能力、下次回答思路。"
    ].join("\n");
  }

  if (hasAny(text, ["转行", "转岗", "迁移", "换方向", "行业下行", "不知道能迁移"])) {
    return [
      "我听到的重点：你想判断经历能迁移到哪里。",
      "",
      "现在先不列一堆岗位，先补 3 个证据：",
      numbered(["你之前主要服务谁？用户、客户、内部团队还是管理层？", "你具体做过哪些动作？执行、协调、分析、销售、内容、项目？", "有没有一个结果或反馈能证明你做成过什么？"]),
      "",
      "补完后，我会帮你筛最多 1-3 个可验证方向。"
    ].join("\n");
  }

  if (hasAny(text, ["gap", "空窗", "待业", "失业", "很乱", "不知道", "迷茫", "焦虑"])) {
    return [
      "CCC 只提供整理和建议，最终决定仍由你自己做。",
      "",
      "我听到的重点：你现在更需要先理清状态和方向，不是马上写简历。",
      "",
      "先补充 3 件事：",
      numbered(["Gap/空窗这段时间主要发生了什么？可以很概括", "之前最完整的一段经历是什么？", "你现在每天大概能花多少时间求职？"]),
      "",
      "你可以直接用很乱的话回答，不用整理成表格。"
    ].join("\n");
  }

  return [
    "我先按“混乱输入整理”处理。",
    "",
    "我已经收到的信息：",
    numbered([`你提到：${content.slice(0, 60)}${content.length > 60 ? "..." : ""}`, "目前还缺岗位方向、经历证据和可用时间"]),
    "",
    "下一步请补充 1-3 点：",
    numbered(["你之前做过什么岗位/项目？", "你现在最想解决的是方向、简历、面试，还是情绪/节奏？", "每天或每周能花多少时间推进？"])
  ].join("\n");
}

function buildReply(incomingXml) {
  const fromUser = xmlValue(incomingXml, "FromUserName");
  const toUser = xmlValue(incomingXml, "ToUserName");
  const msgType = xmlValue(incomingXml, "MsgType");
  const content = xmlValue(incomingXml, "Content");

  let reply = "CCC 已收到你的消息。请先发送文字内容，我会帮你整理求职状态和下一步。";

  if (msgType === "text" && content) {
    reply = cccReply(content);
  }

  return textReply({
    toUser: fromUser,
    fromUser: toUser,
    content: reply
  });
}

async function readBody(request) {
  const chunks = [];
  for await (const chunk of request) {
    chunks.push(chunk);
  }
  return Buffer.concat(chunks).toString("utf8");
}

const server = http.createServer(async (request, response) => {
  const url = new URL(request.url, `http://${request.headers.host}`);

  if (url.pathname === "/health") {
    response.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
    response.end("ok");
    return;
  }

  if (url.pathname !== "/wechat") {
    response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    response.end("not found");
    return;
  }

  if (!verifySignature(url.searchParams)) {
    response.writeHead(403, { "Content-Type": "text/plain; charset=utf-8" });
    response.end("invalid signature");
    return;
  }

  if (request.method === "GET") {
    const echo = url.searchParams.get("echostr") || "";
    response.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
    response.end(echo);
    return;
  }

  if (request.method === "POST") {
    const incomingXml = await readBody(request);
    const replyXml = buildReply(incomingXml);
    response.writeHead(200, { "Content-Type": "application/xml; charset=utf-8" });
    response.end(replyXml);
    return;
  }

  response.writeHead(405, { "Content-Type": "text/plain; charset=utf-8" });
  response.end("method not allowed");
});

server.listen(port, host, () => {
  console.log(`CCC WeChat test bot is running at http://${host}:${port}`);
  console.log(`Wechat path: /wechat`);
  console.log(`Token: ${token}`);
});
