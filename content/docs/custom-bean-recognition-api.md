---
title: 自定义识别咖啡豆 API
module: 咖啡豆
---

![自定义识别咖啡豆 API 封面](/brewguide-help/bean/custom-bean-recognition-api.webp)

该功能可以让 `图片识别咖啡豆` 使用你自己的大模型 API，识别更安全、更准确，也能按自己的习惯定制输出内容。

---

开始前，需要先在大模型平台获取 3 项信息：`API URL`（接口地址）、`API Key`（密钥）和 `Model`（模型名称）。提示词 `System Prompt` 已内置默认模板，直接用即可，不用自己写。

可以使用以下平台获取：

- [七牛云：免费额度够用，速度较快](https://s.qiniu.com/U3aQjy)
- [阿里云](https://bailian.console.aliyun.com/cn-beijing/?tab=model#/model-market/all?capabilities=VU)
- [OpenAI](https://openai.com/index/openai-api/)

`Model` 建议填写：

- 七牛云：`doubao-seed-2.0-mini`
- 阿里云：`qwen3.8-flash`
- OpenAI：`gpt-5.4-nano`

如使用其他模型，需确认支持 `图像理解` 或 `图像输入`。

---

接下来，在 Brew Guide 中完成配置：依次点击 `设置` - `实验性功能`，开启 `自定义识别咖啡豆 API`。

![自定义识别咖啡豆 API 开启流程](/brewguide-help/bean/custom-bean-recognition-api-enable.webp)

将上述信息填入后，点击 `测试连接`，提示成功即完成配置。

---

如果想让识别结果更贴合个人习惯（比如要求风味标签统一用中文输出），可以在 `System Prompt` 默认模板的基础上微调。也欢迎在群里分享好用的提示词，后续会补充到文档中。
