export type GameStatus = 'backlog' | 'in-progress' | 'completed';

export type Game = {
  id: string;
  title: string;
  platform: string;
  status: string;
  img?: string;
  createdAt?: number;
  review?: string;
  rating?: unknown;
};

export type EditableGameKeys = 'platform' | 'status' | 'review' | 'rating';

export type UpdateGamePayload = {
  id: string;
  field: {
    key: EditableGameKeys;
    value: string;
  };
};

export type Filter = GameStatus | 'all';
