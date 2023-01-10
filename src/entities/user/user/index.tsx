import type { UserProps } from '@shared';
import user from 'shared/assets/user.png';
import styles from './styles.module.scss';

const User = ({ username, avatarUrl, onClick }: UserProps): JSX.Element => {
  return (
    <div className={styles['ba-user']} onClick={onClick}>
      <img src={avatarUrl ? avatarUrl : user} alt={`${username}'s avatar`} className={styles['ba-user-avatar']} />
      <p>{username}</p>
    </div>
  );
};

export { User };
