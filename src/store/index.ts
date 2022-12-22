import { createApi, createStore } from 'effector';

const $auth = createStore(false);

const { login, logout } = createApi($auth, {
  login: state => state = true,
  logout: state => state = false,
});

export { $auth, login, logout };
