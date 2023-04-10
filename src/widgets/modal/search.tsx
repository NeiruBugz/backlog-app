import { useCallback, useEffect, useState, forwardRef, useRef } from 'react';
import { useTranslation } from 'react-i18next';

import type { ChangeEventHandler } from 'react';
import type { HowLongToBeatEntry } from 'howlongtobeat';
import { api } from '@shared';
import { SearchResultsList } from '@widgets';

const SearchModal = forwardRef<HTMLDivElement, unknown>((_, ref) => {
  const { t } = useTranslation();
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState<HowLongToBeatEntry[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const onGameSearch = useCallback((value: string) => {
    if (!value.length) {
      setSearchResults([]);
      return;
    }

    api
      .search(value)
      .then((result) => {
        setSearchResults(result);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  useEffect(() => {
    const onEnterPress = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && query !== '') {
        onGameSearch(query);
      }
    };

    document.addEventListener('keypress', onEnterPress);

    return () => {
      document.removeEventListener('keypress', onEnterPress);
    };
  }, [onGameSearch, query]);

  const onInputChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setQuery(event.currentTarget.value);
  };

  const onButtonPress = () => {
    onGameSearch(query);
  };

  return (
    <div className="w-1/2 h-1/2 md:w-[90%] md:h-3/4" ref={ref}>
      <div className="flex">
        <input
          ref={inputRef}
          type="search"
          className="input input-bordered input-primary w-full mr-2"
          placeholder={t('home.search.inputPlaceholder') || ''}
          value={query}
          onChange={onInputChange}
        />
        <button className="btn btn-primary" onClick={onButtonPress} disabled={query.length === 0}>
          {t('home.search.button')}
        </button>
      </div>
      <SearchResultsList results={searchResults} />
    </div>
  );
});

SearchModal.displayName = 'SearchModal';

export { SearchModal };
