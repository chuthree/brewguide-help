---
title: Brew Genie Agent
module: AI
---

![Brew Genie 封面](/brewguide-help/brew-genie/cover.png)

Brew Genie 可以和你聊咖啡，也能结合已有记录，帮你整理咖啡豆、记录冲煮、调整方案。

该功能从 `1.8.0-beta.1` 开始提供。找不到入口时，请先安装[预发布版本](https://github.com/chuthree/brew-guide/releases/tag/v1.8.0-beta.1)。

---

建议在[七牛云](https://s.qiniu.com/U3aQjy)领取免费 AI Token，并创建 API Key。

![Brew Genie 在实验性功能中的 API 配置，示例使用七牛云](/brewguide-help/brew-genie/api-settings.png)

进入 `设置` - `实验性功能`，开启 `Agent` 下的 `brew genie`。按图选择 `自定义服务` 和 `OpenAI Chat Completions`，填写：

- 红色 `API URL`：`https://api.qnaigc.com/v1`
- 橙色 `API Key`：七牛云密钥。
- 蓝色 `Model`：推荐 `deepseek/deepseek-v4.1-flash-1017`，可选择或手动填写。

点击 `测试连接`，显示响应时间即为成功；失败时核对配置和可用额度。

---

其他平台选择对应的 `服务商` 或 `自定义服务`，按平台文档配置即可；模型需支持工具调用，发照片还需支持图像输入。桌面安装版也可直接使用 `ChatGPT 账号` 登录。消息及所需的照片、记录会发送给模型服务商。

---

![咖啡豆库存页面右侧的 Brew Genie 对话面板](/brewguide-help/brew-genie/chat-panel.png)

手机从底部上滑，电脑点击右侧入口或按 `⌘ + Shift + 空格`（macOS）／`Ctrl + Shift + 空格`（Windows / Linux）打开对话，直接告诉它你想做什么即可。

例如：

- “根据我的磨豆机和冲煮记录，推荐这支豆的研磨度。”
- “帮我找出重复或信息不全的咖啡豆，整理一下。”
- “记录这次冲煮：15 克豆、240 克水，口感偏酸。”

---

![Brew Genie 审批模式菜单：请求批准、帮我批准和完全访问](/brewguide-help/brew-genie/approval-modes.png)

点击 `+`，再点击 `请求批准`，即可切换模式：

- `请求批准`：默认模式，改动前先由你确认。
- `帮我批准`：新增或修改单条记录时，部分操作无需确认。
- `完全访问`：更多操作无需逐项确认。

批量改动或涉及关联记录的删除仍需确认。
