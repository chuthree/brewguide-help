'use client';

import { useStaticSearch } from 'fumadocs-core/search/client/orama-static';
import {
  SearchDialog,
  SearchDialogContent,
  SearchDialogHeader,
  SearchDialogInput,
  SearchDialogList,
  SearchDialogOverlay,
  type SharedProps,
} from 'fumadocs-ui/components/dialog/search';
import SearchGlyph from './SearchGlyph';

export default function HelpSearchDialog(props: SharedProps) {
  const search = useStaticSearch({ from: '/search.json', locale: 'zh' });

  return (
    <SearchDialog {...search} {...props}>
      <SearchDialogOverlay />
      <SearchDialogContent>
        <SearchDialogHeader>
          <SearchGlyph className={search.isLoading ? 'animate-pulse' : undefined} />
          <SearchDialogInput />
        </SearchDialogHeader>
        <SearchDialogList />
      </SearchDialogContent>
    </SearchDialog>
  );
}
