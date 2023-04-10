import { useEffect, useState } from 'react';

import { SearchResultsList, SearchInput } from '@widgets';
import { api } from '@shared';

import type { HowLongToBeatEntry } from 'howlongtobeat';

const Home = (): JSX.Element => {
  const [searchResults, setSearchResults] = useState<HowLongToBeatEntry[]>([]);

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
    <main className={'flex items-center justify-center'}>
      <>
        <div className="relative flex h-full w-full items-center justify-center">
          <SearchInput onSearch={onGameSearch} />
        </div>
        <SearchResultsList results={searchResults} />
      </>
    </main>
  );
};

// export { Home };

export default Home;
