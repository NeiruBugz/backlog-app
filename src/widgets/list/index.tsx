import { List } from '@entities';
import { filterCriteria, filterCallback, capitalize } from '@shared';

import type { Game } from '@entities';

import styles from './styles.module.scss';

const ListsBody = ({
  games,
  filter,
  filteredGames,
}: {
  games: Game[];
  filter: string;
  filteredGames: Game[];
}) => (
  <>
    {filter === 'all' ? (
      <>
        {filterCriteria.map((criteria) => (
          <List
            listItems={games.filter((game) => filterCallback(game, criteria, filter === 'all'))}
            dividerText={capitalize(criteria)}
            key={criteria}
            listClass={styles['ba-gameslist']}
            listItemClass={styles['ba-gameslist__item']}
          />
        ))}
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

export { ListsBody };
