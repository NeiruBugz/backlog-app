import { useState } from 'react';

import { SearchResultsList, SearchInput } from '@widgets';
import { api } from '@shared';

import type { HowLongToBeatEntry } from 'howlongtobeat';

import styles from './styles.module.scss';

const Home = (): JSX.Element => {
  const [searchResults, setSearchResults] = useState<HowLongToBeatEntry[]>([]);

  const onGameSearch = (value: string) => {
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
  };

  return (
    <div>
      <div className={styles['ba-home']}>
        <SearchInput onSearch={onGameSearch} />
      </div>
      <SearchResultsList results={searchResults} />
    </div>
  );
};

export { Home };
