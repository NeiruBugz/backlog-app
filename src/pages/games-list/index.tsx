import { useEffect, useMemo } from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';
import { collection, query, where } from 'firebase/firestore';
import { useStore } from '@nanostores/react';

import { firebaseStore } from '@shared';
import { nanoGames, nanoSet, nanoFilters, user, filterByPlatform, filterByStatus } from '@entities';
import { Filters, ListsBody, Loader } from '@widgets';

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
  const { uid } = useStore(user);
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

  const onFilter: MouseEventHandler<HTMLLIElement> = (event) => {
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
    let result: Game[] = [];

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

  return (
    <>
      {nanoList.length !== 0 ? (
        <>
          <header className="sticky">
            <h3 className="font-bold text-[3rem] text-accent capitalize">{status}</h3>
            <Filters platformFilter={platform} onFilter={onFilter} />
          </header>
          <ListsBody games={filteredGames} filter={status} filteredGames={filteredGames} />
        </>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default GamesList;
