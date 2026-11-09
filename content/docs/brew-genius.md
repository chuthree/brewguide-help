---
title: brew genius agent
module: AI
---

![brew genius 封面](/brewguide-help/brew-genie/brew-genius-cover.webp)

brew genius 可以和你聊咖啡，也能结合已有记录，帮你整理咖啡豆、记录冲煮、调整方案。

该功能从 `1.8.0-beta.1` 开始提供。找不到入口时，请先安装[预发布版本](https://github.com/chuthree/brew-guide/releases/tag/v1.8.0-beta.1)。

---

该项目注重本地数据管理和用户隐私，因此由你自行配置 AI 服务商。建议在[七牛云](https://s.qiniu.com/U3aQjy)领取免费 AI Token，并创建 [API Key](https://portal.qiniu.com/ai-inference/api-key)。

![brew genius 在实验性功能中的 API 配置，示例使用七牛云](/brewguide-help/brew-genie/api-settings.webp)

进入 `设置` - `实验性功能`，开启 `brew genius`，填写：

- 🔴 `API URL`：`https://api.qnaigc.com/v1`
- 🟠 `API Key`：七牛云 [API Key](https://portal.qiniu.com/ai-inference/api-key)。
- 🔵 `Model`：推荐 `deepseek/deepseek-v4.1-flash-1017`

点击 `测试连接`，显示响应时间即为成功。

---

使用其他平台时，在 `服务商` 中选择对应平台并按文档配置，桌面版也可用 `ChatGPT 账号` 登录。想把对话和相关记录留在本机，可以选择 `Ollama` 运行本地模型。

模型需要支持工具调用。如果要在对话里发照片，模型还需要支持图像输入。

---

![手机上滑前后的界面：左图蓝框标出底部操作栏，右图显示展开后的 brew genius 对话](/brewguide-help/brew-genie/mobile-chat-panel.webp)

在手机上，从底部操作栏向上滑动，即可打开 brew genius 对话。

![咖啡豆库存页面右侧的 brew genius 对话面板](/brewguide-help/brew-genie/chat-panel.webp)

在电脑上，点击右侧入口，或按 `⌘ + Shift + 空格`（macOS）／`Ctrl + Shift + 空格`（Windows / Linux）打开对话。

打开对话后，直接告诉它你想做什么。例如：

- “根据我的磨豆机和冲煮记录，推荐这支豆的研磨度。”
- “帮我找出重复或信息不全的咖啡豆，整理一下。”
- “记录这次冲煮：15 克豆、240 克水，口感偏酸。”

---

![brew genius 审批模式菜单：请求批准、帮我批准和完全访问](/brewguide-help/brew-genie/approval-modes.webp)

点击 `+`，再点击 `请求批准`，即可切换模式：

- `请求批准`：默认模式，改动前先由你确认。
- `帮我批准`：新增或修改单条记录时，部分操作无需确认。
- `完全访问`：更多操作无需逐项确认。

批量改动或涉及关联记录的删除仍需确认。
