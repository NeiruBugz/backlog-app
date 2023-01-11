import { useEffect, useState } from 'react';
import { Button } from 'antd';
import { getGames } from '@shared';
import type { Game } from '@entities';
import { GameCard } from '@entities';
import styles from './styles.module.scss';

const GamesList = (): JSX.Element => {
  const [games, setGames] = useState<Game[]>([]);

  useEffect(() => {
    getGames().then((result) => setGames(result));
  }, []);

  return (
    <div>
      <Button>Add Game</Button>
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
