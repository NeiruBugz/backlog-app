import type { User } from 'entities/user/types';

export type UserProps = Omit<User, 'authorized'> & {
  onLogout?: () => void;
};
