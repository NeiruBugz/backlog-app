import { useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useCollection } from 'react-firebase-hooks/firestore';
import { collection, query, where } from 'firebase/firestore';
import { useStore } from '@nanostores/react';

import { firebaseStore } from '@shared';
import { Filters, ListsBody, Text, Loader } from '@widgets';

import type { DocumentData } from 'firebase/firestore';
import type { Game } from '@entities';
import { nanoGames, nanoSet } from 'entities/game/slices/nano-games';
import { nanoUser } from 'entities/user/slice/index';
import { filterByStatus, nanoFilters } from 'entities/game/slices/nano-filters';

const gamesConverter = (doc: DocumentData, id: string): Game => {
  const game = {
    id,
    ...doc,
  } as Game;

  return game;
};

const GamesList = (): JSX.Element => {
  const { t } = useTranslation();
  const { uid } = useStore(nanoUser);
  const { status } = useStore(nanoFilters);
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

  const onFilter = (filterType: string) => {
    filterByStatus(filterType);
  };

  const filteredGames = useMemo(() => {
    if (status === 'all') {
      return nanoList;
    }

    return nanoList.filter((game) => game.status === status);
  }, [nanoList, status]);

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
                <Filters onFilter={onFilter} filter={status} />
                <Link to="/add-game">
                  <button type="button" className="btn btn-primary">
                    {t('games-list.addButton')}
                  </button>
                </Link>
              </nav>
              <ListsBody games={nanoList} filteredGames={filteredGames} filter={status} />
            </>
          )}
        </>
      )}
    </>
  );
};

export { GamesList };
