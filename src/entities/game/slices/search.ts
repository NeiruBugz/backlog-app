import { createSlice } from '@reduxjs/toolkit';

import type { HowLongToBeatEntry } from 'howlongtobeat';
import type { PayloadAction } from '@reduxjs/toolkit';

type PayloadFromSearchState = Pick<HowLongToBeatEntry, 'name' | 'imageUrl'>;

const searchInitialState: PayloadFromSearchState = {
  name: '',
  imageUrl: '',
};

const searchSlice = createSlice({
  name: 'search',
  initialState: searchInitialState,
  reducers: {
    changePayload: (state, action: PayloadAction<PayloadFromSearchState>) => action.payload,
  },
});

export const searchReducer = searchSlice.reducer;
export const { changePayload } = searchSlice.actions;
