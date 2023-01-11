import { useEffect, useState } from 'react';
import { getGames } from '@shared';
import type { Game } from '@entities';
import { GameCard } from 'entities/game/ui';
import styles from './styles.module.scss';

const GamesList = (): JSX.Element => {
  const [games, setGames] = useState<Game[]>([]);

  useEffect(() => {
    getGames().then((result) => setGames(result));
  }, []);

  return (
    <div>
      <ul className={styles['ba-gameslist']}>
        {games.length !== 0 ? games.map((game) => {
          return (
            <li className={styles['ba-gameslist--item']} key={game.title}>
              <GameCard {...game} />
            </li>
          );}
        ) : 'Loading...'}
      </ul>
    </div>
  );
};

export default GamesList;
