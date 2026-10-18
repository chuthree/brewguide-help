# 站点维护

站点使用 Next.js + Fumadocs，文章位于 `content/docs/`。日常编辑方法见 [贡献指南](../CONTRIBUTING.md)。

## 本地预览

使用 Node.js 24.18.0（版本见 `.nvmrc`），在项目根目录运行：

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

## 构建与发布

```sh
pnpm typecheck
pnpm build
```

构建结果在 `out/`，可直接用于静态托管。EdgeOne 配置保存在 `edgeone.json`，已连接 GitHub，推送可能触发部署。
