import { createEffect, createStore } from 'effector';
import { User } from '../types';

const $user = createStore<User>({
  authorized: false,
  username: '',
});

const authUserFx = createEffect<User, User, Error>();
const logoutUserFx = createEffect<User, User, Error>();

$user.on([authUserFx, logoutUserFx], (state, payload) => ({ ...state, ...payload }));

export { $user, authUserFx, logoutUserFx };
