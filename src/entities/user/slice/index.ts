import { atom } from 'nanostores';

import type { User } from '../types';

const initialValue: User = {
  uid: '',
  username: '',
  authorized: false,
  avatarUrl: '',
};

const user = atom(initialValue);

const setUser = function setUser(payload: User) {
  user.set(payload);
};

const logout = function logout() {
  setUser(initialValue);
};

export { user, setUser, logout as nanoLogout };
