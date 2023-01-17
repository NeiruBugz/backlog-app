import type { Game } from '@entities';

const cardProps: Game = {
  id: 'some-id-3',
  title: 'Persona 5 Royal',
  img: 'https://assets1.ignimgs.com/2020/02/14/persona-5-royal---button-fin-1581716582492.jpg',
  platform: 'Nintendo Switch',
  status: 'in-progress',
};

const gamesList: Game[] = [
  {
    id: 'some-id-0',
    title: 'God of War: Ragnarök',
    img: '',
    platform: 'PlayStation 5',
    status: 'completed',
  },
  {
    id: 'some-id-1',
    title: 'The Last Of Us Part I',
    img: '',
    platform: 'PlayStation 5',
    status: 'completed',
  },
  {
    id: 'some-id-2',
    title: 'Forza Horizon 5',
    img: '',
    platform: 'Xbox',
    status: 'backlog',
  },
  cardProps,
];

const user = {
  username: 'NeiruBugz',
  avatarUrl: '',
};

export { cardProps, gamesList, user };
