import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Button, Typography } from 'antd';
import { useTranslation } from 'react-i18next';

import { games, setStatusFilter } from '@entities';
import { useAppDispatch, useAppSelector } from '@shared';
import { Filters, ListsBody } from '@widgets';

import styles from './styles.module.scss';

const GamesList = (): JSX.Element => {
  const { t } = useTranslation();

  const filter = useAppSelector((state) => state.filterReducer.status);
  const gamesList = useAppSelector(games);
  const dispatch = useAppDispatch();

  const onFilter = (filterType: string) => {
    dispatch(setStatusFilter(filterType));
  };

  const filteredGames = useMemo(() => {
    if (filter === 'all') {
      return gamesList;
    }

    return gamesList.filter((game) => game.status === filter);
  }, [filter, gamesList]);

  return (
    <>
      {gamesList.length !== 0 ? (
        <nav className={styles['ba-gameslist-page__nav']}>
          <Filters onFilter={onFilter} filter={filter} />
          <Link to="/add-game">
            <Button type="primary">{t('games-list.addButton')}</Button>
          </Link>
        </nav>
      ) : null}
      <div>
        {gamesList.length === 0 ? (
          <div className={styles['ba-gameslist--no-games']}>
            <Typography.Title level={4}>
              {t('games-list.motto')} <Link to="/add-game">{t('games-list.mottoLink')}</Link>
            </Typography.Title>
          </div>
        ) : (
          <ListsBody games={gamesList} filteredGames={filteredGames} filter={filter} />
        )}
      </div>
    </>
  );
};

export { GamesList };
