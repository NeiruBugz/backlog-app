import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { games, setStatusFilter } from '@entities';
import { useAppDispatch, useAppSelector } from '@shared';
import { Filters, ListsBody, Text } from '@widgets';

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
        <nav className="flex justify-between">
          <Filters onFilter={onFilter} filter={filter} />
          <Link to="/add-game">
            <button type="button" className="btn btn-primary">{t('games-list.addButton')}</button>
          </Link>
        </nav>
      ) : null}
      <>
        {gamesList.length === 0 ? (
          <div className="mt-6 text-center">
            <Text heading level={4} className="text-lg">
              {t('games-list.motto')} <Link to="/add-game" className="link link-accent">{t('games-list.mottoLink')}</Link>
            </Text>
          </div>
        ) : (
          <ListsBody games={gamesList} filteredGames={filteredGames} filter={filter} />
        )}
      </>
    </>
  );
};

export { GamesList };
