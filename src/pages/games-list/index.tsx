import { useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useCollection } from 'react-firebase-hooks/firestore';
import { collection, query, where } from 'firebase/firestore';
import { useStore } from '@nanostores/react';

import { firebaseStore } from '@shared';
import {
  nanoGames,
  nanoSet,
  nanoFilters,
  nanoUser,
  filterByPlatform,
  filterByStatus,
} from '@entities';
import { Filters, ListsBody, Text, Loader } from '@widgets';

import type { MouseEventHandler } from 'react';
import type { DocumentData } from 'firebase/firestore';
import type { Game } from '@entities';

const gamesConverter = (doc: DocumentData, id: string): Game => {
  const game = {
    id,
    ...doc,
  } as Game;

  return game;
};

const dateComparator = (first: Game, second: Game) => {
  if (second.createdAt && first.createdAt) {
    return second?.createdAt - first?.createdAt;
  }

  return 0;
};

const GamesList = (): JSX.Element => {
  const { t } = useTranslation();
  const { uid } = useStore(nanoUser);
  const { status, platform } = useStore(nanoFilters);
  const nanoList = useStore(nanoGames);

  const [value, loading, error] = useCollection(
    query(collection(firebaseStore, 'games'), where('user', '==', uid)),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );

  useEffect(() => {
    if (!loading) {
      const g = value?.docs.map((doc) => gamesConverter(doc.data(), doc.id));
      if (g) {
        nanoSet(g);
      }
    }

    if (error) {
      alert(error);
    }
  }, [value, loading, error]);

  const onFilter: MouseEventHandler<HTMLButtonElement> = (event) => {
    const { field, value } = event.currentTarget.dataset;

    if (value) {
      if (field === 'platform') {
        filterByPlatform(value);
      } else if (field === 'status') {
        filterByStatus(value);
      }
    }
  };

  const filteredGames = useMemo(() => {
    console.log(status, platform);

    let result: Game[] = [];
    console.log('beforeFiltering: ', result);

    if (status === 'all') {
      result = [...nanoList];
    } else {
      result = nanoList.filter((game) => game.status === status);
    }

    if (platform === 'all') {
      result = [...result];
    } else {
      result = result.filter((game) => game.platform === platform);
    }

    return result.sort(dateComparator);
  }, [nanoList, status, platform]);

  console.log('memo: ', filteredGames);

  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center">
          <Loader />
        </div>
      ) : (
        <>
          {nanoList.length === 0 ? (
            <div className="mt-6 text-center">
              <Text heading level={4} className="text-lg">
                {t('games-list.motto')}{' '}
                <Link to="/add-game" className="link link-accent">
                  {t('games-list.mottoLink')}
                </Link>
              </Text>
            </div>
          ) : (
            <>
              <nav className="flex justify-between">
                <Filters onFilter={onFilter} statusFilter={status} platformFilter={platform} />
                <Link to="/add-game">
                  <button type="button" className="btn btn-primary">
                    {t('games-list.addButton')}
                  </button>
                </Link>
              </nav>
              <ListsBody games={filteredGames} filteredGames={filteredGames} filter={status} />
            </>
          )}
        </>
      )}
    </>
  );
};

// export { GamesList };

export default GamesList;
