'use client';

import { useSearchContext } from 'fumadocs-ui/contexts/search';
import { iconButtonClass } from './iconButtonClass';

export default function SearchButton({ full = false }: { full?: boolean }) {
  const { setOpenSearch } = useSearchContext();
  return (
    <button
      type="button"
      onClick={() => setOpenSearch(true)}
      aria-label="搜索使用教程"
      className={full
        ? 'help-search-bar w-full cursor-pointer rounded-xl text-left transition-colors duration-150 ease-out hover:bg-black/10 active:bg-black/15'
        : iconButtonClass}
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
        <circle cx="10.5" cy="10.5" r="6.5" />
        <path d="m16 16 4 4" />
      </svg>
      {full && <span>搜索使用问题</span>}
    </button>
  );
}
