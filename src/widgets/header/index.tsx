import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { User } from '@entities';
import styles from './styles.module.scss';
import { useStore } from 'effector-react';
import { $user, logoutUserFx } from 'entities/user/models';

const Header = (): JSX.Element => {
  const { t } = useTranslation();
  const user = useStore($user);

  const logout = async () => {
    await logoutUserFx({ authorized: false, username: '' });
  };

  return (
    <header className={styles['ba-header']}>
      <nav className={styles['ba-header__navigation']}>
        <Link to="/">Backlog App</Link>
        {'  '}
        {user.authorized ? <Link to="/list">Games</Link> : <Link to="/auth">{t('home.header.navigation.login')}</Link>}
      </nav>
      {user.authorized ? <User {...user} onLogout={logout} /> : null}
    </header>
  );
};

export { Header };
