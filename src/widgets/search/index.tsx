import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import type { FC, ChangeEvent } from 'react';

interface SearchInputProps {
  onSearch: (searchQuery: string) => void;
}

const SearchInput: FC<SearchInputProps> = ({ onSearch }) => {
  const { t } = useTranslation();
  const [query, setQuery] = useState('');

  useEffect(() => {
    const onEnterPress = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && query !== '') {
        onSearch(query);
      }
    };

    document.addEventListener('keypress', onEnterPress);

    return () => {
      document.removeEventListener('keypress', onEnterPress);
    };
  }, [onSearch, query]);

  const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.currentTarget.value);
  };

  const onButtonPress = () => {
    onSearch(query);
  };

  return (
    <>
      <input
        type="search"
        className="input input-bordered input-primary w-full mr-2"
        placeholder={t('home.search.inputPlaceholder') || ''}
        value={query}
        onChange={onInputChange}
      />
      <button className="btn btn-primary" onClick={onButtonPress} disabled={query.length === 0}>
        {t('home.search.button')}
      </button>
    </>
  );
};

export { SearchInput };
