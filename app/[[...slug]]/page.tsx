import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import SearchButton from '@/components/SearchButton';
import CopyLinkButton from '@/components/CopyLinkButton';
import DocParagraph from '@/components/DocParagraph';
import DocImage from '@/components/DocImage';
import DocCodeBlock from '@/components/DocCodeBlock';
import { repositoryUrl, editBranch } from '@/lib/site';
import { source } from '@/lib/source';
import { iconButtonClass } from '@/components/iconButtonClass';
import BeforeAfterCompare from '@/components/BeforeAfterCompare';
import InlineImagePreviewTag from '@/components/InlineImagePreviewTag';
import { InlineTextPreviewTag } from '@/components/sql-preview';

type Props = { params: Promise<{ slug?: string[] }> };
export const dynamicParams = false;
export function generateStaticParams() { return source.generateParams(); }
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const page = source.getPage((await params).slug);
  if (!page) notFound();
  const description = page.slugs.length === 0
    ? undefined
    : page.data.description ?? `${page.data.title} — Brew Guide 使用教程`;
  return {
    title: page.slugs.length === 0 ? { absolute: page.data.title } : page.data.title,
    description,
    alternates: { canonical: page.url },
    openGraph: {
      title: page.data.title,
      description,
      url: page.url,
      siteName: 'Brew Guide Help',
      locale: 'zh_CN',
      type: 'website',
      images: [{ url: '/icon.png', width: 512, height: 512, alt: 'Brew Guide Help' }],
    },
    twitter: { card: 'summary' },
  };
}
export default async function Page({ params }: Props) {
  const page = source.getPage((await params).slug);
  if (!page) notFound();
  const Content = page.data.body;
  const isHome = page.slugs.length === 0;
  return (
    <main className="mx-auto w-full max-w-[560px] px-6 pt-6 pb-12 font-sans antialiased">
      <nav aria-label="帮助导航" className={`${isHome ? 'mb-6' : 'mb-8'} flex items-center justify-between gap-4`}>
        {!isHome && (
          <Link href="/" className={iconButtonClass} aria-label="返回帮助首页">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <polyline points="9 14 4 9 9 4" />
              <path d="M20 20v-7a4 4 0 0 0-4-4H4" />
            </svg>
          </Link>
        )}
        {isHome ? <SearchButton full /> : (
          <div className="relative flex items-center gap-3">
            <SearchButton />
            <CopyLinkButton />
          </div>
        )}
      </nav>
      {!isHome && <header className="mb-6 text-sm leading-relaxed text-black">
        <h1 className="font-normal">
          {page.data.title}
        </h1>
      </header>}
      <article className={`markdown-body max-w-none${isHome ? ' home-body' : ''}`}>
          <Content components={{
            p: DocParagraph,
            img: DocImage,
            pre: DocCodeBlock,
            BeforeAfterCompare,
            InlineImagePreviewTag,
            InlineTextPreviewTag,
          }} />
      </article>
      <footer className="mt-12 text-sm leading-[1.8]">
        <a className="inline-flex items-center gap-2 text-neutral-500 transition-colors hover:text-neutral-800 focus-visible:outline-2 focus-visible:outline-offset-4" href={`${repositoryUrl}/edit/${editBranch}/content/docs/${page.path}`} target="_blank" rel="noreferrer" aria-label="在 GitHub 编辑此页（新窗口打开）">
          <svg className="shrink-0 translate-y-[2px]" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="m15 10 5 5-5 5" />
            <path d="M4 4v7a4 4 0 0 0 4 4h12" />
          </svg>
          在 GitHub 编辑此页
        </a>
      </footer>
    </main>
  );
}
