import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { User } from '@entities';
import styles from './styles.module.scss';
import { useStore } from 'effector-react';
import { $user, logoutUserFx } from 'entities/user/models';
import { DropdownWidget } from 'widgets/dropdown';
import { useEffect, useMemo } from 'react';

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

  const languageLabel = useMemo(() => {
    if (i18n.language === 'ru') {
      return '🇷🇺';
    }

    if (i18n.language === 'en') {
      return '🇺🇸';
    }

    return '';
  }, [i18n.language]);

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

  return (
    <header className={styles['ba-header']}>
      <nav className={styles['ba-header__navigation']}>
        <Link to="/" className={styles['ba-header__navigation-link']}>
          Backlog App
        </Link>
        {'  '}
        {user.authorized ? (
          <Link to="/list" className={styles['ba-header__navigation-link']}>
            {t('home.header.navigation.games')}
          </Link>
        ) : (
          <Link to="/auth" className={styles['ba-header__navigation-link']}>
            {t('home.header.navigation.login')}
          </Link>
        )}
      </nav>
      <div className={styles['ba-header__controls']}>
        {user.authorized ? (
          <>
            <User {...user} onLogout={logout} />
          </>
        ) : null}
        <DropdownWidget
          label={languageLabel}
          items={LanguageItems}
          onClick={onLanguageSelect}
          classname={styles['ba-header__language-select']}
        />
      </div>
    </header>
  );
};

export { Header };
