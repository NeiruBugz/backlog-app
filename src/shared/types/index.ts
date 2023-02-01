import type { User } from 'entities/user/types';

export interface UserProps extends User {
  onLogout?: () => void;
}

export interface NeccessaryCredentialSupport {
  name: string;
  picture: string;
}
