import { Link } from 'react-router-dom';
import { useAuth } from '@shared';
import { User } from '@entities';
import { user } from '@mocks';
import styles from './styles.module.scss';

const Header = (): JSX.Element => {
  const { checkAuth, logout } = useAuth();

  return (
    <header className={styles['ba-header']}>
      <nav className={styles['ba-header-navigation']}>
        <Link to="/">Backlog App</Link>
        {'  '}
        {checkAuth() ? <Link to="/list">Games</Link> : <Link to="/auth">Login</Link>}
      </nav>
      {checkAuth() ? <User {...user} onClick={logout} /> : null}
    </header>
  );
};

export { Header };
