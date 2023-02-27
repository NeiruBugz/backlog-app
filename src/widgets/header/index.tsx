import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getAuthState, getUserInfo, User, logout } from '@entities';
import { DropdownWidget } from '@widgets';
import { useAppDispatch, useAppSelector, getLanguageLabel } from '@shared';

import styles from './styles.module.scss';

const LanguageItems = [
  {
    key: 'ru',
    label: '🇷🇺',
  },
  {
    key: 'en',
    label: '🇺🇸',
  },
];

const Header = (): JSX.Element => {
  const { t, i18n } = useTranslation();
  const dispatch = useAppDispatch();
  const authorized = useAppSelector(getAuthState);
  const user = useAppSelector(getUserInfo);

  useEffect(() => {
    if ('navigator' in window) {
      const lng = navigator.language.substring(0, 2);
      i18n.changeLanguage(lng);
    }
  }, [i18n]);

  const onLanguageSelect = (key: string) => {
    i18n.changeLanguage(key);
  };

  const onLogout = async () => {
    dispatch(logout());
  };

  return (
    <header className={styles['ba-header']}>
      <nav className={styles['ba-header__navigation']}>
        <Link to="/" className={styles['ba-header__navigation-link']}>
          Backlog App
        </Link>
        &nbsp;&nbsp;
        {authorized ? (
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
        {authorized ? <User {...user} onLogout={onLogout} /> : null}
        <DropdownWidget
          label={getLanguageLabel(i18n.language)}
          items={LanguageItems}
          onClick={onLanguageSelect}
          classname={styles['ba-header__language-select']}
        />
      </div>
    </header>
  );
};

export { Header };
