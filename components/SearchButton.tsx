'use client';

import { useSearchContext } from 'fumadocs-ui/contexts/search';
import SearchGlyph from './SearchGlyph';
import { iconButtonClass } from './iconButtonClass';
import { searchLabel } from '@/lib/translations';

export default function SearchButton({ full = false }: { full?: boolean }) {
  const { setOpenSearch } = useSearchContext();
  return (
    <button
      type="button"
      onClick={() => setOpenSearch(true)}
      aria-label={searchLabel}
      aria-haspopup="dialog"
      className={full
        ? 'help-search-bar w-full cursor-pointer text-left transition-colors duration-150 ease-out'
        : iconButtonClass}
    >
      <SearchGlyph />
      {full && <span>{searchLabel}</span>}
    </button>
  );
}
