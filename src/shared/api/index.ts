import { gamesList } from 'mocks/card';

export const getGames = () => {
  return Promise.resolve(gamesList);
};

export const getGame = (id: number) => {
  if (gamesList.length < id) {
    return Promise.reject('Cannot find this game');
  }

  return Promise.resolve(gamesList[id]);
};