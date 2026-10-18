import Link from 'next/link';
import SearchButton from '@/components/SearchButton';

export default function NotFound() {
  return (
    <main className="mx-auto w-full max-w-[560px] px-6 py-12 text-sm leading-[1.8]">
      <h1 className="mb-4 font-medium text-neutral-900">找不到这篇教程</h1>
      <p className="mb-6 text-neutral-600">地址可能有误，或页面已移动。可以搜索使用问题，或返回首页按分类查找。</p>
      <SearchButton full />
      <Link className="mt-6 inline-block text-neutral-600 underline underline-offset-4" href="/">返回帮助首页</Link>
    </main>
  );
}
