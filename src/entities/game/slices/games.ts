import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'app/providers/with-store';
import type { Game, UpdateGamePayload } from '../types';

type GameSliceState = Game[];

const initialState: GameSliceState = [];

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    addGame: (state, action: PayloadAction<Game>) => {
      state.push(action.payload);
      console.log(state, action);
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
    },
    deleteGame: (state, action: PayloadAction<Pick<Game, 'id'>>) => {
      state = state.filter((game) => game.id !== action.payload.id);
    },
  },
});

export const gameReducer = gameSlice.reducer;
export const { addGame, updateGame, deleteGame } = gameSlice.actions;
export const games = (state: RootState) => state.gameReducer;
