import { createApi, createEvent, createStore } from 'effector';
import { Game } from '@/types/data/game';

const auth = createStore(false);

const gamesList = createStore<Game[]>([]);

const { login, logout } = createApi(auth, {
  login: state => state = true,
  logout: state => state = false,
});

const addGame = createEvent<Game>('add game');
const removeGame = createEvent<string>('remove game');

gamesList
  .on(addGame, (state, game: Game) => [...state, game])
  .on(removeGame, (state, title) => state.filter((game) => game.title !== title));

export { auth, login, logout, gamesList, addGame, removeGame };
