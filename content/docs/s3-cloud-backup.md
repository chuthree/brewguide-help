---
title: S3 云备份（数据胶囊）
module: 数据与备份
---

使用 S3 对象存储进行云备份。这里以中国科技云数据胶囊为例，注册并完成实名认证后，可使用免费 20G 空间保存数据。

---

首先，打开[中国科技云数据胶囊](https://data.cstcloud.cn/)并完成注册。

1. 使用邮箱或手机号注册账号
2. 登录后按页面提示完成实名认证
3. 进入数据胶囊控制台

![中国科技云数据胶囊](/brewguide-help/s3-cloud-backup/01-register-and-verify.webp)

---

接下来，创建用于备份的存储空间。

可以新建一个空间，也可以使用已有空间。在我的数据界面，点击 `客户端访问`。

![客户端访问](/brewguide-help/s3-cloud-backup/02-client-access.webp)

---

在 `客户端访问` 中创建访问密钥。

1. 应用选择 `Obsidian`
2. 点击 `+ 新增 AccessKey`
3. 创建完成后，保存页面中显示的 `Endpoint`、`Bucket`、`AccessKey ID` 和 `AccessKey Secret`

![数据胶囊信息](/brewguide-help/s3-cloud-backup/03-create-access-key.webp)

---

打开 Brew Guide，进入 `设置` - `数据与备份`，在云同步中选择 `S3 对象存储`，把上图中用颜色标出的数据胶囊信息，填入下图同色输入框即可；`区域 (Region)` 填写 `us-east-1`。

![Brew Guide S3 配置](/brewguide-help/s3-cloud-backup/04-s3-config.webp)

---

填写完成后，先点击 `测试连接` 验证配置。连接成功后，即可使用上传与下载功能完成云备份。

首次配置建议先在已有数据的一台设备中上传备份，再到其他设备下载，避免旧数据覆盖新数据。
