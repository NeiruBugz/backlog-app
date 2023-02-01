export type GameStatus = 'backlog' | 'in-progress' | 'completed';
export type Filter = GameStatus | 'all';

export interface Game {
  id: string;
  title: string;
  platform: string;
  status: string;
  img?: string;
};

export interface UpdateGamePayload {
  id: string;
  field: {
    key: keyof Game;
    value: string;
  };
};
