import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import type { FC, ChangeEvent } from 'react';

import styles from './styles.module.scss';

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
        className={styles['ba-search__input']}
        placeholder={t('home.search.inputPlaceholder') || ''}
        value={query}
        onChange={onInputChange}
      />
      <button
        className={styles['ba-search__button']}
        onClick={onButtonPress}
        disabled={query.length === 0}
      >
        {t('home.search.button')}
      </button>
    </>
  );
};

export { SearchInput };
