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
    <main className="flex w-full h-full">
      <aside className="w-96 p-3 box-border">
        <h4 className="text-xl mb-4">PlayLater</h4>
        <ul>
          <li className="font-medium text-md">
            <Link to="/library">Library</Link>
          </li>
          <ul className="ml-2">
            <li>Backlog</li>
            <li>In Progress</li>
            <li>Completed</li>
            <li>Abandoned</li>
          </ul>
        </ul>
      </aside>
      <section className="container mx-auto w-full h-full p-4 bg-current">
        <h3 className="font-bold text-[3rem] text-accent">{status}</h3>
        <ListsBody games={filteredGames} filter={status} filteredGames={filteredGames} />
      </section>
    </main>
  );
};

// export { GamesList };

export default GamesList;
