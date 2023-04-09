import classnames from 'classnames';
import { Link } from 'react-router-dom';
import { useStore } from '@nanostores/react';
import { useEffect, useState } from 'react';

import type { FC, MouseEventHandler, ChangeEventHandler } from 'react';
import { User, nanoLogout, nanoUser } from '@entities';
import { firebaseAuth } from '@shared';
import { useSignOut } from 'react-firebase-hooks/auth';
import { useTranslation } from 'react-i18next';
import { LANGUAGE_ITEMS, STATUS_NAV, createThemeOptions } from './utils';

interface SidebarProps {
  status: string;
  onFilter: MouseEventHandler<HTMLLIElement>;
}

const Sidebar: FC<SidebarProps> = ({ status, onFilter }) => {
  const { t, i18n } = useTranslation();
  const [signOut, error] = useSignOut(firebaseAuth);
  const [theme, setTheme] = useState<string>('light');
  const user = useStore(nanoUser);

  useEffect(() => {
    if ('navigator' in window) {
      const lng = navigator.language.substring(0, 2);
      i18n.changeLanguage(lng);
    }
  }, [i18n]);

  useEffect(() => {
    const key = localStorage.getItem('theme');
    if (key) {
      setTheme(key);
    }
  }, []);

  const onThemeSelect: ChangeEventHandler<HTMLSelectElement> = ({ currentTarget: { value } }) => {
    document.querySelector('html')?.setAttribute('data-theme', value);
    localStorage.setItem('theme', value);
    setTheme(value);
  };

  const onLanguageSelect: ChangeEventHandler<HTMLSelectElement> = ({
    currentTarget: { value },
  }) => {
    i18n.changeLanguage(value);
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
    <aside className="w-96 p-3 box-border">
      <h4 className="text-xl mb-4">
        <span className="text-accent">Play</span>
        <span className="text-primary">Later</span>
      </h4>
      <div className="flex flex-col justify-end">
        <User {...user} onLogout={onLogout} />
        <div>
          <select onChange={onLanguageSelect} value={i18n.language} className="mr-1">
            {LANGUAGE_ITEMS.map((option) => (
              <option data-value={option.key} key={option.key} value={option.key}>
                {option.label}
              </option>
            ))}
          </select>
          <select onChange={onThemeSelect} value={theme}>
            {createThemeOptions(t).map((option) => (
              <option data-value={option.key} key={option.key} value={option.key}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>
      <ul>
        <li className="font-medium text-md hover:text-primary">
          <Link to="/library">Library</Link>
        </li>
        <ul className="ml-2 mt-1">
          {STATUS_NAV.map((nav) => (
            <li
              key={nav.key}
              className={classnames('cursor-pointer hover:text-accent', {
                'font-bold': status === nav.key,
              })}
              data-field="status"
              data-value={nav.key}
              onClick={onFilter}
            >
              {nav.label}
            </li>
          ))}
        </ul>
        <li className="cursor-pointer font-medium text-md hover:text-primary">
          <Link to="/add-game">Add Game</Link>
        </li>
        <li className="cursor-pointer font-medium text-md hover:text-primary">Search</li>
      </ul>
    </aside>
  );
};

export { Sidebar };
