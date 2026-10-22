# 站点维护

站点使用 Next.js + Fumadocs，文章位于 `content/docs/`。日常编辑方法见 [贡献指南](../CONTRIBUTING.md)。

## 本地预览

使用 Node.js 24.22.1（版本见 `.nvmrc`），在项目根目录运行：

```sh
corepack enable
corepack prepare pnpm@12.11.2 --activate
pnpm install --frozen-lockfile
pnpm dev
```

打开 `http://localhost:3000` 即可预览。

## 常用文件

- `content/docs/`：普通文章为 `.md`，带交互组件的文章为 `.mdx`；`meta.json` 管理分类和顺序。
- `public/brewguide-help/`：教程图片。
- `app/`、`components/`：页面、样式和交互组件。
- `lib/site.ts`：站点域名和 GitHub 编辑地址。

两种文章格式共用页面、搜索和图片样式。文件名不含扩展名的部分决定文章地址；同名的 `.md` 和 `.mdx` 不要同时保留。GitHub 编辑入口会使用文章的实际文件名。

## 待发布文章

文章 frontmatter 的 `status` 支持 `draft` 和 `published`，省略时默认为 `published`。待发布文章可以只保留 `title`、`module` 和 `status: draft`，不需要占位正文或日期。

首页主题列表统一使用 `<HelpTopic slug="文件名（不含扩展名）" />`，标题与状态从文章读取；分类与顺序仍需在首页和 `meta.json` 中对应维护。待发布主题仅显示浅灰色标题，鼠标悬停时使用禁止指针，没有链接地址，也不进入键盘 Tab 顺序。

`lib/source.ts` 在公共数据源入口排除草稿，页面路由、搜索索引和站点地图共用这一规则。补齐正文后将 `status` 改为 `published`（或移除该字段），首页入口会自动变为链接，并恢复页面、搜索和站点地图收录。

## 构建与发布

```sh
pnpm typecheck
pnpm build
```

构建结果在 `out/`，可直接用于静态托管。EdgeOne 配置保存在 `edgeone.json`，已连接 GitHub，推送可能触发部署。
