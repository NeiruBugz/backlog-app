import { useEffect, useState } from 'react';
import { getGames } from '@shared';
import type { Game } from '@entities';

const GamesList = (): JSX.Element => {
  const [games, setGames] = useState<Game[]>([]);

  useEffect(() => {
    getGames().then((result) => setGames(result));
  }, []);

  return (
    <div>
      <ul>
        {games.length !== 0 ? games.map((game) => <li key={game.title}>
          <span>{game.title}</span>
          {' '}
          <span>{game.platform}</span>
        </li>) : 'Loading...'}
      </ul>
    </div>
  );
};

export default GamesList;
