export type GameStatus = 'backlog' | 'in-progress' | 'completed';
export type EditableGameKeys = 'platform' | 'status' | 'review' | 'rating';
export type Filter = GameStatus | 'all';

export interface Game {
  id: string;
  title: string;
  platform: string;
  status: string;
  img?: string;
  createdAt?: number;
  review?: string;
  rating?: unknown;
};


export interface UpdateGamePayload {
  id: string;
  field: {
    key: EditableGameKeys;
    value: string;
  };
};
