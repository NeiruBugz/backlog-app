import { createEffect, createEvent, createStore } from 'effector';
import { Filter, Game, UpdateGamePayload } from '../types';
import { HowLongToBeatEntry } from 'howlongtobeat';

const $games = createStore<Game[]>([]);
const addGame = createEvent<Game>('addGame');
const updateGameFx = createEffect<UpdateGamePayload, UpdateGamePayload, Error>();

const $filter = createStore<Filter>('all');
const setFilter = createEvent<Filter>('setFilter');

const $addPayload = createStore<HowLongToBeatEntry | null>(null);
const savePayload = createEvent<HowLongToBeatEntry>('savePayload');
const resetPayload = createEvent<null>('resetPayload');

$addPayload
  .on(savePayload, (state, payload) => ({ ...state, ...payload }))
  .on(resetPayload, (state) => {
    state = null;
    return state;
  });

$games
  .on(addGame, (state, payload) => [...state, payload])
  .on(updateGameFx, (state, { id, field }) => {
    const { key, value } = field;
    const gameIndex = state.findIndex((game) => game.id === id);
    if (gameIndex !== -1) {
      const game = state[gameIndex];
      game[key] = value;
      state[gameIndex] = game;
    }

    return [...state];
  });

$filter.on(setFilter, (state, payload) => (state = payload));

export { $games, $filter, setFilter, updateGameFx, $addPayload, resetPayload, savePayload };
