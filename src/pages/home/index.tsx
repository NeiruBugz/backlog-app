import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';

import { SearchResultsList, SearchInput, Loader } from '@widgets';
import { api, firebaseAuth } from '@shared';

import type { HowLongToBeatEntry } from 'howlongtobeat';
import { setUser } from 'entities/user/slice/index';

const Home = (): JSX.Element => {
  const [user, loading] = useAuthState(firebaseAuth);

  const [searchResults, setSearchResults] = useState<HowLongToBeatEntry[]>([]);

  useEffect(() => {
    if (user) {
      const { uid, photoURL, displayName } = user;
      if (displayName && uid) {
        setUser({ authorized: true, uid: uid, username: displayName, avatarUrl: photoURL ?? '' });
      }
    }
  }, [user, loading]);

  useEffect(() => {
    const currentTheme = document.querySelector('html')?.getAttribute('data-theme');
    const storedTheme = localStorage.getItem('theme') ?? 'light';

    if (currentTheme !== storedTheme) {
      document.querySelector('html')?.setAttribute('data-theme', storedTheme);
    }
  }, []);

  const onGameSearch = (value: string) => {
    if (!value.length) {
      setSearchResults([]);
      return;
    }

    api
      .search(value)
      .then((result) => {
        setSearchResults(result);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <main className={loading ? 'flex justify-center items-center' : ''}>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="relative flex justify-center items-center w-full h-full">
            <SearchInput onSearch={onGameSearch} />
          </div>
          <SearchResultsList results={searchResults} />
        </>
      )}
    </main>
  );
};

export { Home };
