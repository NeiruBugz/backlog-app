export type GameStatus = 'backlog' | 'in-progress' | 'completed';

export type Game = {
  id: string;
  title: string;
  platform: string;
  status: string;
  img?: string;
  createdAt?: number;
};

export type UpdateGamePayload = {
  id: string;
  field: {
    key: keyof Game;
    value: string;
  };
};

export type Filter = GameStatus | 'all';
