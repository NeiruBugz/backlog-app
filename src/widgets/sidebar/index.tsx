import classnames from 'classnames';
import { NavLink } from 'react-router-dom';
import { useStore } from '@nanostores/react';
import { useEffect, useState } from 'react';

import type { FC, MouseEventHandler, ChangeEventHandler } from 'react';
import { User, nanoLogout, user } from '@entities';
import { firebaseAuth } from '@shared';
import { useSignOut } from 'react-firebase-hooks/auth';
import { useTranslation } from 'react-i18next';
import { LANGUAGE_ITEMS, STATUS_NAV, createThemeOptions } from './utils';
import { setModal } from 'widgets/modal/modal';

interface SidebarProps {
  status: string;
  onFilter: MouseEventHandler<HTMLLIElement>;
}

const Sidebar: FC<SidebarProps> = ({ status, onFilter }) => {
  const { t, i18n } = useTranslation();
  const [signOut, error] = useSignOut(firebaseAuth);
  const [theme, setTheme] = useState<string>('light');
  const currentUser = useStore(user);

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

  const onSearchClick = () => setModal({ id: 'search', isVisible: true });

  return (
    <aside className="w-96 p-4 box-border">
      <h4 className="text-[2.5rem] font-bold mb-4">
        <span className="text-accent">Play</span>
        <span className="text-primary">Later</span>
      </h4>
      <div className="flex flex-col justify-end">
        <User {...currentUser} onLogout={onLogout} />
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
      <ul className="mt-4">
        <li className="font-medium py-2 text-[1.4rem] hover:text-primary">
          <NavLink className={({ isActive }) => (isActive ? 'underline' : '')} to="/library">
            Library
          </NavLink>
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
              tabIndex={0}
            >
              {nav.label}
            </li>
          ))}
        </ul>
        <li className="cursor-pointer py-2 font-medium text-[1.4rem] hover:text-primary">
          <NavLink className={({ isActive }) => (isActive ? 'underline' : '')} to="/add-game">
            Add Game
          </NavLink>
        </li>
        {/* <li className="cursor-pointer py-2 font-medium text-[1.4rem] hover:text-primary">
          <NavLink className={({ isActive }) => (isActive ? 'underline' : '')} to="/roulette">
            Backlog Roulette
          </NavLink>
        </li> */}
        <li
          className="cursor-pointer py-2 font-medium text-[1.4rem] hover:text-primary flex items-center gap-2"
          onClick={onSearchClick}
        >
          Search
          <kbd className='kbd kbd-sm'>/</kbd>
        </li>
      </ul>
    </aside>
  );
};

export { Sidebar };
