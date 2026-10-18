---
title: WedDAV 云备份
date: 2026-03-17
module: 数据与备份
---

使用 WebDAV 轻松进行备份数据，只需两步即可搞定。

---

首先，在[坚果云](https://www.jianguoyun.com/)中创建一个应用密码。

1. 在坚果云 APP 中，点击 `第三方应用管理`
2. 点击 `添加应用密码`
3. 在 `名称` 输入框中填写 `Brew Guide`
4. 点击 `生成密码` 完成创建

![创建应用密码](/brewguide-help/webdav/01-create-app-password.webp)

---

然后，将坚果云的连接信息填入 Brew Guide。

打开 Brew Guide，进入 `设置` → `数据管理` → `WebDAV 云同步配置`，按照下图中的颜色对应关系填写：

|  颜色   | 坚果云信息 | 填入 Brew Guide   |
| :-----: | ---------- | ----------------- |
| 🔴 红色 | 服务器地址 | WebDAV 服务器地址 |
| 🟢 绿色 | 账号       | 用户名            |
| 🔵 蓝色 | 应用密码   | 密码              |

![配置对照](/brewguide-help/webdav/02-config-map.webp)

填写完成后：

1. 点击 `测试连接` 验证配置
2. 连接成功后，点击 `上传` 完成同步
