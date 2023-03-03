import { List } from '@entities';
import { filterCriteria, filterCallback } from '@shared';

import type { Game } from '@entities';
import { useTranslation } from 'react-i18next';

const ListsBody = ({
  games,
  filter,
  filteredGames,
}: {
  games: Game[];
  filter: string;
  filteredGames: Game[];
}) => { 
  const { t } = useTranslation();
  return (
    <>
      {filter === 'all' ? (
        <>
          {filterCriteria.map((criteria) => (
            <List
              listItems={games.filter((game) => filterCallback(game, criteria, filter === 'all'))}
              dividerText={t(`common.${criteria}`) ?? ''}
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
  );};

export { ListsBody };
