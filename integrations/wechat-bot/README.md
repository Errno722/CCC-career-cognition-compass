# CCC 微信测试号 Bot 后端

这个目录用于先跑通微信测试号的消息链路，并提供一个不接大模型的规则版 CCC 回复：

```text
用户发消息
→ 微信测试号转发到本地后端
→ 后端按关键词返回简短 CCC 回复
```

第一版先不接大模型。等 URL / Token 验证和消息回复成功后，再接入真正的大模型回复。

## 1. 启动本地服务

在项目根目录运行：

```bash
cd integrations/wechat-bot
WECHAT_TOKEN=ccc_test_2026 npm start
```

看到类似输出即可：

```text
CCC WeChat test bot is running at http://127.0.0.1:3000
Wechat path: /wechat
Token: ccc_test_2026
```

## 2. 生成公网 URL

微信不能访问你电脑上的 `localhost`，所以需要一个临时公网地址。

你可以用 ngrok、cpolar、cloudflared 这类工具，把本地 `3000` 端口转成公网 HTTPS 地址。

生成后，假设你拿到：

```text
https://example-tunnel.ngrok-free.app
```

那么微信测试号里要填：

```text
URL: https://example-tunnel.ngrok-free.app/wechat
Token: ccc_test_2026
```

Token 必须和你启动服务时的 `WECHAT_TOKEN` 完全一样。

## 3. 在微信测试号里填写

打开微信公众平台测试号：

```text
https://mp.weixin.qq.com/debug/cgi-bin/sandbox?t=sandbox/login
```

找到：

```text
接口配置信息
```

填写：

```text
URL: 你的公网地址 + /wechat
Token: ccc_test_2026
```

点击提交。通过后，就可以扫码关注测试号并发送文字消息。

## 4. 测试规则版 CCC

你给测试号发：

```text
我现在很乱，gap 一年多，不知道能投什么。
```

测试号应该回复：

```text
CCC 只提供整理和建议，最终决定仍由你自己做。

我听到的重点：你现在更需要先理清状态和方向，不是马上写简历。
...
```

这说明微信链路和规则版回复都已经跑通。

可以继续测试这些句子：

```text
我想转行，但不知道经历能迁移到哪里。
```

```text
这是一个产品经理 JD，帮我看硬技能和面试可能问什么。
```

```text
我刚面试完，只记得 SQL、留存、用户分层。
```

```text
我在职，但是每天很累，下班后恢复不过来。
```

```text
我现在很想裸辞，不知道该不该离职。
```

## 5. 下一步

跑通后再做：

```text
1. 接入大模型 API
2. 增加更稳定的用户状态摘要
3. 增加短回复限制和分段回复
4. 增加隐私脱敏提醒和日志清理
```

## 注意

- 不要把真实 `WECHAT_TOKEN` 发到公开文档或截图里。
- 临时公网地址可能会变，变了就要重新填测试号 URL。
- 电脑关机或服务停止后，测试号就不能回复。
