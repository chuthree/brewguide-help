'use client';

import { useSearchContext } from 'fumadocs-ui/contexts/search';
import SearchGlyph from './SearchGlyph';
import { iconButtonClass } from './iconButtonClass';

export default function SearchButton({ full = false }: { full?: boolean }) {
  const { setOpenSearch } = useSearchContext();
  return (
    <button
      type="button"
      onClick={() => setOpenSearch(true)}
      aria-label="搜索问题"
      aria-haspopup="dialog"
      className={full
        ? 'help-search-bar w-full cursor-pointer text-left transition-colors duration-150 ease-out'
        : iconButtonClass}
    >
      <SearchGlyph />
      {full && <span>搜索问题</span>}
    </button>
  );
}
