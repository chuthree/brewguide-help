---
title: S3 云备份（七牛云）
module: 数据与备份
---

使用七牛云对象存储进行手动云备份，连接速度更快、更稳定。七牛云按量计费，由于 Brew Guide 的备份数据量很小，充值 1 元就能用很久。

---

首先，在七牛云创建存储空间并开启跨域访问。打开[七牛云 Kodo 空间管理](https://portal.qiniu.com/kodo/bucket)：

1. 点击 `+ 新建空间`
2. `存储空间名称` 可自定义，建议用好记的英文名
3. 存储区域选择 `华南-广东`
4. 访问控制选择 `公开`
5. 点击 `创建`

如弹出测试域名有效期提示，点击 `好的，我知道了` 即可，不影响云备份使用。

![新建七牛云存储空间](/brewguide-help/s3-cloud-backup-qiniu/01-create-bucket.webp)

进入新建的空间，点击 `空间设置`，找到 `跨域设置` 并点击 `设置`（用于允许 Brew Guide 正常读写备份数据）。

![打开跨域设置](/brewguide-help/s3-cloud-backup-qiniu/02-open-cors-settings.webp)

点击 `+ 新增规则`，按图中内容填写后确认。

![新增跨域规则](/brewguide-help/s3-cloud-backup-qiniu/03-add-cors-rule.webp)

---

接下来，获取配置所需的域名和密钥。

返回 `空间概览`，复制空间域名中的 `S3 域名`（稍后填入 Brew Guide 的 `服务地址（Endpoint）`）。

![复制 S3 域名](/brewguide-help/s3-cloud-backup-qiniu/04-copy-bucket-domain.webp)

点击右上角头像，进入 `密钥管理`，创建一组密钥，保存 `AccessKey` 和 `SecretKey`（稍后分别填入 `Access Key ID` 和 `Secret Access Key`）。

![创建访问密钥](/brewguide-help/s3-cloud-backup-qiniu/05-create-access-key.webp)

---

回到 Brew Guide，进入 `设置` - `数据与备份`，选择 `S3 云同步配置`，按对照表填写：

| Brew Guide 字段      | 七牛云信息               |
| -------------------- | ------------------------ |
| 服务地址（Endpoint） | 空间概览中的 `S3 域名`   |
| 区域（Region）       | `cn-south-1`             |
| Access Key ID        | 七牛云 `AccessKey`       |
| Secret Access Key    | 七牛云 `SecretKey`       |
| 存储桶（Bucket）     | 空间概览中的 `S3 空间名` |

![填写 S3 云同步配置](/brewguide-help/s3-cloud-backup-qiniu/06-enter-s3-config.webp)

填写完成后，点击 `测试连接`。连接成功后，即可使用上传与下载完成云备份。

首次配置建议先在已有数据的设备上上传备份，再到其他设备下载，避免空数据或旧数据覆盖新数据。
