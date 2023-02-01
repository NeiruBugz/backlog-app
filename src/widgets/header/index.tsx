import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { User } from '@entities';
import styles from './styles.module.scss';
import { useStore } from 'effector-react';
import { $user, authUserFx, logoutUserFx } from 'entities/user/models';
import { DropdownWidget } from 'widgets/dropdown';
import { useEffect } from 'react';
import { CredentialResponse, GoogleLogin } from '@react-oauth/google';
import jwtDecode from 'jwt-decode';

const LanguageItems = [
  {
    key: 'ru',
    label: 'RU',
  },
  {
    key: 'en',
    label: 'EN',
  },
];

const Header = (): JSX.Element => {
  const { t, i18n } = useTranslation();
  const user = useStore($user);
  const navigate = useNavigate();

  useEffect(() => {
    if ('navigator' in window) {
      const lng = navigator.language.substring(0, 2);
      i18n.changeLanguage(lng);
    }
  }, [i18n]);

  const onLanguageSelect = ({ key }: { key: string }) => {
    i18n.changeLanguage(key);
  };

  const logout = async () => {
    localStorage.removeItem('token');
    await logoutUserFx({ authorized: false, username: '', avatarUrl: '' });
  };

  const onAuthSuccess = (resp: CredentialResponse) => {
    if (resp.credential) {
      const { name, picture } = jwtDecode(resp.credential) satisfies {
        name: string;
        picture: string;
      };
      localStorage.setItem('token', resp.credential);
      authUserFx({ authorized: true, username: name, avatarUrl: picture });
      navigate('/list');
    }
  };

  return (
    <header className={styles['ba-header']}>
      <nav className={styles['ba-header__navigation']}>
        <Link to="/">Backlog App</Link>
        {'  '}
        {user.authorized ? (
          <Link to="/list">{t('home.header.navigation.games')}</Link>
        ) : (
          <Link to="/auth">{t('home.header.navigation.login')}</Link>
        )}
      </nav>
      <div className={styles['ba-header__controls']}>
        {user.authorized ? (
          <>
            <User {...user} onLogout={logout} />
            <DropdownWidget
              label={t('home.header.language.label')}
              items={LanguageItems}
              onClick={onLanguageSelect}
              classname={styles['ba-header__language-select']}
            />
          </>
        ) : (
          <>
            <DropdownWidget
              label={t('home.header.language.label')}
              items={LanguageItems}
              onClick={onLanguageSelect}
              classname={styles['ba-header__language-select']}
            />
            <GoogleLogin type="icon" onSuccess={onAuthSuccess} locale={i18n.language} />
          </>
        )}
      </div>
    </header>
  );
};

export { Header };
