import { defineConfig, defineDocs } from 'fumadocs-mdx/config';
import { z } from 'zod';
import { pageSchema } from 'fumadocs-core/source/schema';

export const docs = defineDocs({
  // Fumadocs discovers both .md and .mdx; keep their slugs unique.
  dir: 'content/docs',
  docs: {
    schema: pageSchema.extend({
      status: z.enum(['published', 'draft']).default('published'),
      module: z.enum(['入门', '冲煮', '咖啡豆', '笔记', '数据与备份']).optional(),
    }),
  },
});
export default defineConfig();
