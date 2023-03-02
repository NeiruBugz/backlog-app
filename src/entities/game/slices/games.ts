import { createSlice } from '@reduxjs/toolkit';

import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '@shared';
import type { Game, UpdateGamePayload } from '../types';

type GameSliceState = Game[];

const initialState: GameSliceState = [];

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setGames: (state, action: PayloadAction<Game[]>) => action.payload,
    addGame: (state, action: PayloadAction<Game>) => {
      state.push(action.payload);
    },
    updateGame: (state, action: PayloadAction<UpdateGamePayload>) => {
      const { id, field } = action.payload;
      const gameIndex = state.findIndex((stateGame) => stateGame.id === id);
      if (gameIndex !== -1) {
        const { key, value } = field;
        const game: Game = state[gameIndex];
        game[key] = value;
        state[gameIndex] = game;
      }

      return state;
    },
    deleteGame: (state, action: PayloadAction<string>) => state.filter((game) => game.id !== action.payload),
  },
});

export const gameReducer = gameSlice.reducer;
export const { addGame, updateGame, deleteGame, setGames } = gameSlice.actions;
export const games = (state: RootState) => state.gameReducer;
