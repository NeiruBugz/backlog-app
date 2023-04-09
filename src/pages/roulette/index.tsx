import { nanoGames } from '@entities';
import { useStore } from '@nanostores/react';

const Roulette = (): JSX.Element => {
  const library = useStore(nanoGames).filter((game) => game.status === 'backlog');
  console.log(library);
  return <>Roulette</>;
};

export default Roulette;
