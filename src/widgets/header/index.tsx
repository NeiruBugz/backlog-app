import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getAuthState, getUserInfo, User, logout } from '@entities';
import styles from './styles.module.scss';
import { DropdownWidget } from 'widgets/dropdown';
import { useEffect } from 'react';
import { getLanguageLabel } from '@shared';
import { useAppDispatch, useAppSelector } from 'app/providers/with-store';

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

  const onLanguageSelect = ({ key }: { key: string }) => {
    i18n.changeLanguage(key);
  };

  const onLogout = async () => {
    dispatch(logout());
  };
  

  return (
    <header className={styles['ba-header']}>
      <nav className={styles['ba-header__navigation']}>
        <Link to="/">Backlog App</Link>
        {'  '}
        {authorized ? (
          <Link to="/list">{t('home.header.navigation.games')}</Link>
        ) : (
          <Link to="/auth">{t('home.header.navigation.login')}</Link>
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
