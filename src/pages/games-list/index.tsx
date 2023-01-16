import { useCallback, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Button, MenuProps, Typography } from 'antd';

import type { Filter, Game } from '@entities';
import { List } from '@entities';
import { filterCallback, filterCriteria, capitalize } from '@shared';
import styles from './styles.module.scss';
import { DropdownWidget } from '../../widgets/dropdown';
import { useStore } from 'effector-react';
import { $filter, $games, setFilter } from 'entities/game/models';

const ListBody = ({
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
                listItemClass={styles['ba-gameslist--item']}
              />
            );
          })}
        </>
      ) : (
        <List
          listItems={filteredGames}
          listClass={styles['ba-gameslist']}
          listItemClass={styles['ba-gameslist--item']}
        />
      )}
    </>
  );
};

const dropdownFilters: MenuProps['items'] = [
  {
    label: 'All',
    key: 'all',
  },
  {
    label: 'Backlog',
    key: 'backlog',
  },
  {
    label: 'In Progress',
    key: 'in-progress',
  },
  {
    label: 'Completed',
    key: 'completed',
  },
];

const GamesList = (): JSX.Element => {
  const filter = useStore($filter);
  const games = useStore($games);

  const onFilter = useCallback((filterType: Filter) => {
    setFilter(filterType);
  }, []);

  const filteredGames = useMemo(() => {
    if (filter === 'all') {
      return games;
    }

    return games.filter((game) => game.status === filter);
  }, [filter, games]);

  const handleDropdownItemClick: MenuProps['onClick'] = (e) => {
    onFilter(e.key as Filter);
  };

  return (
    <>
      <nav className={styles['ba-gameslist-page__nav']}>
        <div className={styles['ba-gameslist-page__nav-filters']}>
          <Button disabled={filter === 'all'} onClick={() => onFilter('all')}>
            All
          </Button>
          <Button disabled={filter === 'backlog'} onClick={() => onFilter('backlog')}>
            Backlog
          </Button>
          <Button disabled={filter === 'in-progress'} onClick={() => onFilter('in-progress')}>
            In progress
          </Button>
          <Button disabled={filter === 'completed'} onClick={() => onFilter('completed')}>
            Completed
          </Button>
        </div>
        <div className={styles['ba-gameslist-page__nav-filters--mobile']}>
          <DropdownWidget
            items={dropdownFilters}
            onClick={handleDropdownItemClick}
            label="Filters"
          />
        </div>
        <Link to="/add-game">
          <Button type="primary">Add Game</Button>
        </Link>
      </nav>
      {games.length === 0 ? (
        <div className={styles['ba-gameslist--no-games']}>
          <Typography>There are no games. Let&apos;s add first!</Typography>
        </div>
      ) : (
        <ListBody games={games} filteredGames={filteredGames} filter={filter} />
      )}
    </>
  );
};

export default GamesList;
