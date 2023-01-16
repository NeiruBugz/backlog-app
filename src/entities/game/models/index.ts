import { createEffect, createEvent, createStore } from 'effector';
import { Filter, Game, UpdateGamePayload } from '../types';

const $games = createStore<Game[]>([]);
const addGame = createEvent<Game>('addGame');
const updateGameFx = createEffect<UpdateGamePayload, UpdateGamePayload, Error>();

const $filter = createStore<Filter>('all');
const setFilter = createEvent<Filter>('setFilter');

$games
  .on(addGame, (state, payload) => [...state, payload])
  .on(updateGameFx, (state, { id, field }) => {
    const { key, value } = field;
    const gameIndex = state.findIndex((game) => game.id === id);
    if (gameIndex !== -1) {
      const game = state[gameIndex];
      game[key] = value;
      console.log('after', game);
      state[gameIndex] = game;
    }

    return [...state];
  });

$filter.on(setFilter, (state, payload) => (state = payload));

export { $games, addGame, $filter, setFilter, updateGameFx };
