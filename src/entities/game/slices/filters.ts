import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  status: 'all',
  platform: 'all'
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setStatusFilter: (state, action: PayloadAction<string>) => {
      const { payload } = action;
      state.status = payload;
    },
  },
});

export const { setStatusFilter } = filterSlice.actions;
export const filterReducer = filterSlice.reducer;