import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useSignOut } from 'react-firebase-hooks/auth';
import { useStore } from '@nanostores/react';

import { User } from '@entities';
import { DropdownWidget } from '@widgets';
import { getLanguageLabel, firebaseAuth } from '@shared';
import { nanoLogout, nanoUser } from 'entities/user/slice/index';

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

const themes = [
  'light',
  'dark',
  'emerald',
  'corporate',
  'synthwave',
  'cyberpunk',
  'pastel',
  'fantasy',
];

const createThemeOptions = (): { key: string; label: string }[] => {
  const themesOptions: { key: string; label: string }[] = [];
  themes.map((theme) => themesOptions.push({ key: theme, label: theme }));
  return themesOptions;
};

const Header = (): JSX.Element => {
  const { t, i18n } = useTranslation();
  const [signOut, error] = useSignOut(firebaseAuth);
  const user = useStore(nanoUser);

  useEffect(() => {
    if ('navigator' in window) {
      const lng = navigator.language.substring(0, 2);
      i18n.changeLanguage(lng);
    }
  }, [i18n]);

  const onThemeChange = (key: string) => {
    document.querySelector('html')?.setAttribute('data-theme', key);
    localStorage.setItem('theme', key);
  };

  const onLanguageSelect = (key: string) => {
    i18n.changeLanguage(key);
  };

  const onLogout = async () => {
    signOut().then((result) => {
      if (result) {
        nanoLogout();
      } else {
        alert(error);
      }
    });
  };

  return (
    <header className="flex justify-between mb-6">
      <nav className="navbar flex items-center">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-compact dropdown-content mt-3 p-2 shadow rounded-box w-52 bg-primary-content text-primary"
            >
              <li className="hover:bg-primary-focus hover:text-primary-content rounded-none">
                <Link to="/">
                  Backlog App
                </Link>
              </li>
              {user.authorized ? (
                <li className="hover:bg-primary-focus hover:text-primary-content rounded-none">
                  <Link to="/list">
                    {t('home.header.navigation.games')}
                  </Link>
                </li>
              ) : (
                <li className="hover:bg-primary-focus hover:text-primary-content rounded-none">
                  <Link to="/auth">
                    {t('home.header.navigation.login')}
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
      <div className="flex">
        {user.authorized ? <User {...user} onLogout={onLogout} /> : null}
        <DropdownWidget
          label={getLanguageLabel(i18n.language)}
          items={LanguageItems}
          onClick={onLanguageSelect}
        />
        <DropdownWidget label="Theme" items={createThemeOptions()} onClick={onThemeChange} />
      </div>
    </header>
  );
};

export { Header };
