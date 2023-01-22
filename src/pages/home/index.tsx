import { message } from 'antd';
import { useState } from 'react';
import { HowLongToBeatEntry } from 'howlongtobeat';
import { SearchResultsList, SearchInput } from '@widgets';
import { api } from '@shared';
import styles from './styles.module.scss';

const Home = (): JSX.Element => {
  const [isLoading, setLoading] = useState<boolean>(false);
  const [searchResults, setSearchResults] = useState<HowLongToBeatEntry[]>([]);

  const onGameSearch = (value: string) => {
    if (!value.length) {
      setSearchResults([]);
      return;
    }
    message.info(`Searching for: ${value}`, 1);
    setLoading(true);

    api
      .search(value)
      .then((result) => {
        setSearchResults(result);
      })
      .catch((error) => {
        console.log(error);
        message.error(`Error while searching ${value}`, 1);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div>
      <div className={styles['ba-home']}>
        <SearchInput onSearch={onGameSearch} isLoading={isLoading} />
      </div>
      <SearchResultsList results={searchResults} />
    </div>
  );
};

export default Home;
