import { docs } from '@/.source/server';
import { loader } from 'fumadocs-core/source';

const content = docs.toFumadocsSource();
const catalog = loader({ baseUrl: '/', source: content });

// Filter at the source boundary so routes, search and sitemap share one policy.
export const source = loader({
  baseUrl: '/',
  source: {
    ...content,
    files: content.files.filter((file) => file.type !== 'page' || file.data.status !== 'draft'),
  },
});

// Only the topic list can read drafts; keep the full catalog private.
export function getHelpTopic(slug: string) {
  const page = catalog.getPage(slug.split('/'));
  if (!page) throw new Error(`Unknown help topic: ${slug}`);

  return { title: page.data.title, url: page.url, status: page.data.status };
}
