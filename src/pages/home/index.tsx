import { message } from 'antd';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { SearchResultsList, SearchInput } from '@widgets';
import { api, useAppSelector } from '@shared';
import { getAuthState } from '@entities';

import type { HowLongToBeatEntry } from 'howlongtobeat';

import styles from './styles.module.scss';

const Home = (): JSX.Element => {
  const [isLoading, setLoading] = useState<boolean>(false);
  const [searchResults, setSearchResults] = useState<HowLongToBeatEntry[]>([]);
  const authorized = useAppSelector(getAuthState);
  const { t } = useTranslation();

  const onGameSearch = (value: string) => {
    if (!value.length) {
      message.info(t('systemMessages.inputParameter'), 1);
      setSearchResults([]);
      return;
    }
    message.info(`${t('systemMessages.searchingFor')}: ${value}`, 1);
    setLoading(true);

    api
      .search(value)
      .then((result) => {
        setSearchResults(result);
      })
      .catch(() => {
        message.error(`${t('systemMessages.searchErorr')} ${value}`, 1);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div>
      <div className={styles['ba-home']}>
        <SearchInput onSearch={onGameSearch} isLoading={isLoading} disabled={!authorized} />
      </div>
      <SearchResultsList results={searchResults} />
    </div>
  );
};

export { Home };
