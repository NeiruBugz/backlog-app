import { createSlice } from '@reduxjs/toolkit';

import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '@shared';
import type { User } from '../types';

const initialState: User = {
  uid: '',
  username: '',
  authorized: false,
  avatarUrl: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<User>) => {
      const { username, avatarUrl, uid } = action.payload;
      state.username = username;
      state.authorized = true;
      state.avatarUrl = avatarUrl;
      state.uid = uid;
    },
    logout: (state) => {
      state.authorized = false;
      state.username = '';
      state.avatarUrl = '';
      state.uid = '';
    },
  },
});

export const { login, logout } = userSlice.actions;
export const userReducer = userSlice.reducer;
export const getAuthState = (state: RootState) => state.userReducer.authorized;
export const getUserInfo = (state: RootState) => ({
  username: state.userReducer.username,
  avatarUrl: state.userReducer.avatarUrl,
  uid: state.userReducer.uid,
});
