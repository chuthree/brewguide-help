# 贡献指南

欢迎修正文章、补充步骤或添加教程。也可以在 Brew Guide 用户群中反馈问题、分享草稿。

## 修改文章

1. 点击文章底部的「在 GitHub 编辑此页」，登录 GitHub。
2. 修改文字，点击 `Commit changes` 或 `Propose changes` 保存，并简要说明原因。提示创建副本（Fork）或分支时，按页面指引操作。
3. 创建 `Pull Request`（修改申请），提交到 `chuthree/brewguide-help` 的 `main` 分支。

我们会审核修改并更新文档。文字修改无需安装开发环境，可先用 GitHub 的 `Preview` 检查排版。

## 添加教程

在 `content/docs/` 新建 `.md` 文件，也可以复制相近的文章修改。文件名决定地址，例如 `example.md` 对应 `/example/`。

```markdown
---
title: 教程标题
module: 咖啡豆
---

说明用途和必要的准备，再按操作顺序写清步骤。

![与操作有关的截图](/brewguide-help/example/step.webp)
```

`module` 使用「入门、冲煮、咖啡豆、笔记、AI、数据与备份」之一，不添加日期。图片放在 `public/brewguide-help/<文件名>/` 下，引用时省略 `public`。

完成后，在首页 `content/docs/index.mdx` 和目录 `content/docs/meta.json` 的对应分类中添加入口，再提交修改申请。

普通文章使用 `.md`；图片对比、SQL 预览等需要交互组件时使用 `.mdx`，可联系我们协助。图片放大和代码块复制由站点提供，无需额外配置。

## 文案与格式

一篇文章围绕一个任务，写清在哪里操作、填什么，以及如何确认结果。使用 App 中的实际名称，必要条件紧跟对应步骤。

用短段落自然叙述，主题或设备分支切换时用 `---` 分隔。不使用加粗，不为短教程强加标题和编号。截图放在相关步骤附近，并遮住个人信息和密钥。

菜单、按钮和输入值用行内代码，例如 `设置` - `实验性设置`。完整命令用带语言标记的代码块：macOS 和 Linux 用 `bash`，PowerShell 用 `powershell`，纯文本用 `text`。

````markdown
```bash
brew install --cask chuthree/brew-guide/brew-guide
```
````

代码块显示一行，超出时省略，复制会保留完整内容和换行。命令块不混入 `$` 提示符、说明或执行结果；输出示例另用 `text` 代码块，并在前文说明。

修改旧文时，保留原有地址、分类、事实和来源链接。

## 本地预览

操作方法见 [站点维护](docs/maintenance.md)。无法本地检查也可以提交，并说明需要协助预览。

写作约定参考 [Microsoft 操作步骤规范](https://learn.microsoft.com/en-us/style-guide/procedures-instructions/writing-step-by-step-instructions)、[Diátaxis](https://diataxis.fr/how-to-guides/)；代码块语法见 [CommonMark](https://spec.commonmark.org/0.30/#fenced-code-blocks)。
