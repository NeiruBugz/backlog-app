import { gamesList } from 'mocks';
import type { Game } from '@entities';

export const getGames = (): Promise<Game[]> => {
  return Promise.resolve(gamesList);
};

export const getGame = (id: number): Promise<string | Game> => {
  if (gamesList.length < id) {
    return Promise.reject('Cannot find this game');
  }

  return Promise.resolve(gamesList[id]);
};