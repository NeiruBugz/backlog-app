import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSignOut } from 'react-firebase-hooks/auth';
import { useStore } from '@nanostores/react';

import { User, nanoLogout, nanoUser } from '@entities';
import { DropdownWidget } from '@widgets';
import { getLanguageLabel, firebaseAuth, capitalize } from '@shared';
import { Navbar } from './navbar';

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

const createThemeOptions = (
  translateCb: (key: string) => string
): { key: string; label: string }[] => {
  const themesOptions: { key: string; label: string }[] = [];
  themes.map((theme) =>
    themesOptions.push({ key: theme, label: capitalize(translateCb(`themes.${theme}`)) })
  );
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
      <Navbar authorized={user.authorized} />
      <div className="flex">
        {user.authorized ? <User {...user} onLogout={onLogout} /> : null}
        <DropdownWidget
          label={getLanguageLabel(i18n.language)}
          items={LanguageItems}
          onClick={onLanguageSelect}
        />
        <DropdownWidget
          label={t('common.theme')}
          items={createThemeOptions(t)}
          onClick={onThemeChange}
        />
      </div>
    </header>
  );
};

export { Header };
