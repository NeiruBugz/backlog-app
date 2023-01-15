export type GameStatus = 'backlog' | 'in-progress' | 'completed';

export type Game = {
  id: string;
  title: string;
  platform: string;
  status: string;
  img?: string;
};

export type Filter = GameStatus | 'all';
