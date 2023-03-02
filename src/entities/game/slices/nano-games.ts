import { atom } from 'nanostores';

import type { EditableGameKeys, Game } from '@entities';

const initialValue: Game[] = [];

const games = atom(initialValue);

const setGames = function setGames(payload: Game[]) {
  games.set(payload);
};

const addGame = function addGame(game: Game) {
  games.set([...games.get(), game]);
};

const deleteGame = function deleteGame(id: string) {
  games.set([...games.get().filter((game) => game.id !== id)]);
};

const updateGame = function updateGame({
  id,
  field,
}: {
  id: string;
  field: { key: EditableGameKeys; value: string };
}) {
  const current = [...games.get()];
  const index = current.findIndex((game) => game.id === id);
  if (index !== -1) {
    const { key, value } = field;
    const game = current[index];
    game[key] = value;
    current[index] = game;
  }
};

export {
  games as nanoGames,
  setGames as nanoSet,
  addGame as nanoAdd,
  deleteGame as nanoDelete,
  updateGame as nanoUpdate,
};
