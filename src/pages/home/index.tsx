import { SearchInput } from '@widgets';
import { message } from 'antd';
import { useHowLongToBeat } from 'entities/game/services/useHowLongToBeat';
import { useState } from 'react';
import styles from './styles.module.scss';

const Home = (): JSX.Element => {
  const [isLoading, setLoading] = useState<boolean>(false);
  const { nativeSearch } = useHowLongToBeat();

  const onGameSearch = (value: string) => {
    if (!value.length) {
      return;
    }
    message.info(`Searching for: ${value}`, 1);
    setLoading(true);

    nativeSearch(value).then((result: any) => {
      console.log(result);
    }).catch((error: any) => {
      console.log(error);
      message.info(`Error while searching ${value}`, 1);
    }).finally(() => {
      setLoading(false);
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles['ba-home']}>
        <SearchInput onSearch={onGameSearch} isLoading={isLoading} />
      </div>
    </div>
  );
};

export default Home;