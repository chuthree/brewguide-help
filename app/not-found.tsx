import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-[560px] flex-col items-center justify-center gap-7 px-6 py-6 text-center text-sm antialiased">
      <h1 className="flex items-center justify-center gap-2 font-medium leading-[1.4] text-neutral-800">
        找不到这篇教程 :/
      </h1>
      <Link className="flex min-h-9 items-center rounded-md bg-neutral-50 px-3 py-1.5 leading-[1.6] text-neutral-600 hover:bg-[#f7f7f7] active:bg-neutral-200 focus-visible:outline-offset-[-3px]" href="/">
        返回首页
      </Link>
    </main>
  );
}
