---
title: MCP
module: AI
---

![AI 根据咖啡豆库存回答问题的对话示例](/brewguide-help/mcp-connection/conversation.webp)

通过 MCP 连接，可以让同一台电脑上的 Codex、WorkBuddy 或 Hermes 等 AI 助手直接查看和记录 Brew Guide 中的咖啡豆与冲煮数据。该功能仅支持 Brew Guide 桌面版。

---

在 Brew Guide 桌面版中，进入 `设置` - `实验性功能`，开启 `启用 MCP 连接`。使用期间请保持 Brew Guide 运行。

![实验性功能中的 MCP 连接设置](/brewguide-help/mcp-connection/enable.webp)

点击 `MCP 配置` - `更多设置`，选择允许 AI 访问的数据范围和权限。其中 `查看与编辑` 包含新增、修改和删除操作。

![MCP 数据范围和权限选择](/brewguide-help/mcp-connection/permissions.webp)

返回后，点击 `连接配置` - `复制配置`。配置中包含密钥，请只发给信任的工具。

---

打开同一台电脑上的 Codex、WorkBuddy 或 Hermes，将复制的配置发给它，让它帮你完成 MCP 连接。

![向 AI 询问今天喝什么意式豆](/brewguide-help/mcp-connection/question-example.webp)

配置完成后，你可以试着对它说：

- “帮我添加并画一个 Chemex 咖啡壶”
- “帮我整理一下咖啡豆的信息”
- “帮我记录这次冲煮”
- “这支咖啡豆适合什么研磨度？”
- “这支咖啡豆怎么冲合适？”

---

建议搭配[Supabase 实时云同步](/realtime-cloud-sync/)使用，在手机和电脑间保持数据一致。
