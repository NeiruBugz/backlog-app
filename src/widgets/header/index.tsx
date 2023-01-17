import { Link } from 'react-router-dom';
import { User } from '@entities';
import styles from './styles.module.scss';
import { useStore } from 'effector-react';
import { $user, logoutUserFx } from 'entities/user/models';

const Header = (): JSX.Element => {
  const user = useStore($user);
  

  const logout = () => {
    logoutUserFx({ authorized: false, username: '' });
  };

  return (
    <header className={styles['ba-header']}>
      <nav className={styles['ba-header-navigation']}>
        <Link to="/">Backlog App</Link>
        {'  '}
        {user.authorized ? <Link to="/list">Games</Link> : <Link to="/auth">Login</Link>}
      </nav>
      {user.authorized ? <User {...user} onLogout={logout} /> : null}
    </header>
  );
};

export { Header };
