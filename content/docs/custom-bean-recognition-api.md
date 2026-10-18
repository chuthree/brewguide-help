---
title: 自定义识别咖啡豆 API
date: 2026-02-11
module: 咖啡豆
---

![自定义识别咖啡豆 API 封面](/brewguide-help/bean/custom-bean-recognition-api.webp)

该功能可以让 `图片识别咖啡豆` 使用你的 API，识别更安全、更准确、更个性化。

---

在此之前，需要准备四项信息，分别为 `API URL` `API Key` `Mode` `System Prompt` 。

其中 `API URL` `API Key` `Mode` 需要在大模型平台中获取，这里建议使用以下平台：

- [七牛云: 免费额度够用，速度够快](https://s.qiniu.com/U3aQjy)
- [阿里云](https://bailian.console.aliyun.com/cn-beijing/?tab=model#/model-market/all?capabilities=VU)
- [OpenAI](https://openai.com/index/openai-api/)

`Mode` 这边建议使用：

- 七牛云：`doubao-seed-2.0-mini`
- 阿里云：`qwen3-vl-flash`
- OpenAI：`gpt-5-nano-2025-08-07`

如使用其他模型，需确认支持 `图像理解` 或 `图像输入` 。

---

接下来，需要在 Brew Guide APP 中进行相关配置，依次点击 `设置` - `实验性设置` - 开启 `自定义识别咖啡豆 API`。

![自定义识别咖啡豆 API 开启流程](/brewguide-help/bean/custom-bean-recognition-api-enable.webp)

将上述配置信息填入后，点击 `测试连接` 按钮，成功后即完成所有操作。

---

关于 `System Prompt` 部分，也是该功能的重点，你可在默认模板上微调，比如要求风味标签以中文输出等。

也欢迎各位在群内分享好用的提示词，后续会补充到文档中～
