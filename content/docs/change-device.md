---
title: 数据迁移
module: 数据与备份
---

更换设备时，如果不想配置云同步，可以直接通过导出和导入文件，把 Brew Guide 的全部数据一次性迁移到新设备。

---

在旧设备中，进入 `设置` - `数据与备份`，点击 `导出数据`。

![数据与备份页面中的导出数据入口](/brewguide-help/change-device/export-data-settings.webp)

导出后会生成一个名为 `brew-guide-data-YYYY-MM-DD_HH-mm-ss.json` 的文件，里面包含 Brew Guide 的完整数据。

![保存到文件中的 Brew Guide 数据文件](/brewguide-help/change-device/exported-data-file.webp)

保存方式因设备而异：

- iOS 网页版（Web App）：在系统分享菜单中选择 `存储到文件` 等方式，并选择保存位置。
- Android 原生 App：在系统文件保存窗口中选择保存位置。
- 电脑浏览器：文件会下载到浏览器的下载目录。
- 电脑桌面 App：在保存窗口中选择保存位置。

---

将这个文件发送到新设备（例如通过微信、隔空投送或网盘）。在新设备上安装 Brew Guide 后，进入 `设置` - `数据与备份`，点击 `导入数据` 并选择该文件即可。
