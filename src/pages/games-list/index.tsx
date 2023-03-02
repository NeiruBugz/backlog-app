import { useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useCollection } from 'react-firebase-hooks/firestore';
import { collection, query, where } from 'firebase/firestore';

import { games, getUserInfo, setGames, setStatusFilter } from '@entities';
import { useAppDispatch, useAppSelector, firebaseStore } from '@shared';
import { Filters, ListsBody, Text, Loader } from '@widgets';

import type { DocumentData } from 'firebase/firestore';
import type { Game } from '@entities';

const gamesConverter = (doc: DocumentData, id: string): Game => {
  const game = {
    id,
    ...doc,
  } as Game;

  return game;
};

const GamesList = (): JSX.Element => {
  const { t } = useTranslation();
  const { uid } = useAppSelector(getUserInfo);
  const [value, loading, error] = useCollection(
    query(collection(firebaseStore, 'games'), where('user', '==', uid)),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );

  const filter = useAppSelector((state) => state.filterReducer.status);
  const gamesList = useAppSelector(games);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!loading) {
      const g = value?.docs.map((doc) => gamesConverter(doc.data(), doc.id));
      if (g) {
        dispatch(setGames(g));
      }
    }

    if (error) {
      alert(error);
    }
  }, [value, loading, error, dispatch]);

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
      {loading ? (
        <div className="flex justify-center items-center">
          <Loader />
        </div>
      ) : (
        <>
          {gamesList.length === 0 ? (
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
                <Filters onFilter={onFilter} filter={filter} />
                <Link to="/add-game">
                  <button type="button" className="btn btn-primary">
                    {t('games-list.addButton')}
                  </button>
                </Link>
              </nav>
              <ListsBody games={gamesList} filteredGames={filteredGames} filter={filter} />
            </>
          )}
        </>
      )}
    </>
  );
};

export { GamesList };
