import { readFileSync } from 'node:fs';
import InlineTextPreviewTagClient from './InlineTextPreviewTagClient';

const sqlPath = 'brewguide-help/sql/realtime-cloud-sync-init.sql';
const content = readFileSync(`${process.cwd()}/content/${sqlPath}`, 'utf8');

export function InlineTextPreviewTag(props: { label: string; src: string; collapsedHeight?: number }) {
  if (props.src !== sqlPath) throw new Error(`未知 SQL 文件：${props.src}`);
  return <InlineTextPreviewTagClient {...props} content={content} downloadUrl={`/${sqlPath}`} />;
}
