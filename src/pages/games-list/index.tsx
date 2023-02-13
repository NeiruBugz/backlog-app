import { useCallback, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Button, MenuProps, Typography } from 'antd';
import { useTranslation } from 'react-i18next';

import { Filter, Game, games } from '@entities';
import { List } from '@entities';
import { filterCallback, filterCriteria, capitalize } from '@shared';
import styles from './styles.module.scss';
import { DropdownWidget } from '../../widgets/dropdown';
import { setStatusFilter } from '@entities';
import { dropdownFilters } from './constants';
import { useAppDispatch, useAppSelector } from 'app/providers/with-store';

const ListsBody = ({
  games,
  filter,
  filteredGames,
}: {
  games: Game[];
  filter: string;
  filteredGames: Game[];
}) => {
  return (
    <>
      {filter === 'all' ? (
        <>
          {filterCriteria.map((criteria) => {
            return (
              <List
                listItems={games.filter((game) => filterCallback(game, criteria, filter === 'all'))}
                dividerText={capitalize(criteria)}
                key={criteria}
                listClass={styles['ba-gameslist']}
                listItemClass={styles['ba-gameslist__item']}
              />
            );
          })}
        </>
      ) : (
        <List
          listItems={filteredGames}
          listClass={styles['ba-gameslist']}
          listItemClass={styles['ba-gameslist__item']}
        />
      )}
    </>
  );
};

const GamesList = (): JSX.Element => {
  const filter = useAppSelector((state) => state.filterReducer.status);
  const gamesList = useAppSelector(games);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const onFilter = useCallback((filterType: string) => {
    dispatch(setStatusFilter(filterType));
  }, [dispatch]);

  const filteredGames = useMemo(() => {
    if (filter === 'all') {
      return gamesList;
    }

    return gamesList.filter((game) => game.status === filter);
  }, [filter, gamesList]);

  const handleDropdownItemClick: MenuProps['onClick'] = (e) => {
    onFilter(e.key as Filter);
  };

  return (
    <>
      {gamesList.length !== 0 ? (
        <nav className={styles['ba-gameslist-page__nav']}>
          <div className={styles['ba-gameslist-page__nav-filters']}>
            <Button disabled={filter === 'all'} onClick={() => onFilter('all')}>
              {t('games-list.filters.all')}
            </Button>
            <Button disabled={filter === 'backlog'} onClick={() => onFilter('backlog')}>
              {t('games-list.filters.backlog')}
            </Button>
            <Button disabled={filter === 'in-progress'} onClick={() => onFilter('in-progress')}>
              {t('games-list.filters.inProgress')}
            </Button>
            <Button disabled={filter === 'completed'} onClick={() => onFilter('completed')}>
              {t('games-list.filters.completed')}
            </Button>
          </div>
          <div className={styles['ba-gameslist-page__nav-filters--mobile']}>
            <DropdownWidget
              items={dropdownFilters}
              onClick={handleDropdownItemClick}
              label={t('games-list.filters.label')}
            />
          </div>
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
