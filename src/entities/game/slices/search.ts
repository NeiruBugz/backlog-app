import { createSlice } from '@reduxjs/toolkit';

import type { HowLongToBeatEntry } from 'howlongtobeat';

type PayloadFromSearchState = Pick<HowLongToBeatEntry, 'name'> | '';

const searchInitialState: PayloadFromSearchState = '';

const searchSlice = createSlice({
  name: 'search',
  initialState: searchInitialState,
  reducers: {
    changePayload: (state, action) => {
      state = action.payload;
    },
  },
});

export const searchReducer = searchSlice.reducer;
export const { changePayload } = searchSlice.actions;
