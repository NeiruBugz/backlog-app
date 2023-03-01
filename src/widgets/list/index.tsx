import { List } from '@entities';
import { filterCriteria, filterCallback, capitalize } from '@shared';

import type { Game } from '@entities';

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
          />
        ))}
      </>
    ) : (
      <List
        listItems={filteredGames}
      />
    )}
  </>
);

export { ListsBody };
