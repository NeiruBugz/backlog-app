import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { User } from '@entities';
import styles from './styles.module.scss';
import { useStore } from 'effector-react';
import { $user, logoutUserFx } from 'entities/user/models';
import { DropdownWidget } from 'widgets/dropdown';
import { useEffect } from 'react';

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
    await logoutUserFx({ authorized: false, username: '' });
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
      <DropdownWidget
        label={t('home.header.language.label')}
        items={LanguageItems}
        onClick={onLanguageSelect}
      />
      {user.authorized ? <User {...user} onLogout={logout} /> : null}
    </header>
  );
};

export { Header };
