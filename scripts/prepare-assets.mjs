import { copyFile, mkdir } from 'node:fs/promises';

const path = 'brewguide-help/sql/realtime-cloud-sync-init.sql';
await mkdir('public/brewguide-help/sql', { recursive: true });
await copyFile(`content/${path}`, `public/${path}`);
