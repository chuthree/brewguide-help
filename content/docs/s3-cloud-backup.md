---
title: S3 云备份（数据胶囊）
module: 数据与备份
---

使用中国科技云数据胶囊进行手动云备份，注册并实名认证后可免费使用 20G 空间，适合想零成本备份数据的用户。

---

首先，打开[中国科技云数据胶囊](https://data.cstcloud.cn/)并完成注册：

1. 使用邮箱或手机号注册账号
2. 登录后按页面提示完成实名认证
3. 进入数据胶囊控制台

![中国科技云数据胶囊](/brewguide-help/s3-cloud-backup/01-register-and-verify.webp)

进入 `我的数据` 界面（可新建一个存储空间，或直接使用已有空间），点击 `客户端访问`。

![客户端访问](/brewguide-help/s3-cloud-backup/02-client-access.webp)

在 `客户端访问` 中创建访问密钥：

1. 应用选择 `Obsidian`（这里借用它的 S3 访问通道，直接选这项即可）
2. 点击 `+ 新增 AccessKey`
3. 保存页面显示的 `Endpoint`、`Bucket`、`AccessKey ID` 和 `AccessKey Secret`

![数据胶囊信息](/brewguide-help/s3-cloud-backup/03-create-access-key.webp)

---

接下来，打开 Brew Guide，进入 `设置` - `数据与备份`，在云同步中选择 `S3 对象存储`。将上图中用颜色标出的信息填入下图同色输入框，`区域 (Region)` 填写 `us-east-1`。

![Brew Guide S3 配置](/brewguide-help/s3-cloud-backup/04-s3-config.webp)

填写完成后，点击 `测试连接`。连接成功后，即可使用上传与下载完成云备份。

首次配置建议先在已有数据的设备上上传备份，再到其他设备下载，避免空数据或旧数据覆盖新数据。
