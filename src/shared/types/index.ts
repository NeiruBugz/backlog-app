import type { User } from 'entities/user/types';

export type UserProps = User & {
  onLogout?: () => void;
};
