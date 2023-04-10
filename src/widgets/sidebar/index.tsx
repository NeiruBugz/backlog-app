import classnames from 'classnames';
import { NavLink, useLocation } from 'react-router-dom';
import { useStore } from '@nanostores/react';
import { useEffect, useState } from 'react';

import type { FC, MouseEventHandler, ChangeEventHandler } from 'react';
import { User, nanoLogout, user } from '@entities';
import { firebaseAuth } from '@shared';
import { useSignOut } from 'react-firebase-hooks/auth';
import { useTranslation } from 'react-i18next';
import { STATUS_NAV, createThemeOptions } from './utils';
import { setModal } from 'widgets/modal/modal';

interface SidebarProps {
  status: string;
  onFilter: MouseEventHandler<HTMLLIElement>;
}

const Sidebar: FC<SidebarProps> = ({ status, onFilter }) => {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const [signOut, error] = useSignOut(firebaseAuth);
  const [theme, setTheme] = useState<string>('light');
  const currentUser = useStore(user);

  useEffect(() => {
    i18n.changeLanguage('en');
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

  // const onLanguageSelect: ChangeEventHandler<HTMLSelectElement> = ({
  //   currentTarget: { value },
  // }) => {
  //   i18n.changeLanguage(value);
  // };

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
    <aside className="box-border w-96 p-4">
      <h4 className="mb-4 text-[2.5rem] font-bold">
        <span className="text-accent">Play</span>
        <span className="text-primary">Later</span>
      </h4>
      <div className="flex flex-col justify-end">
        <User {...currentUser} onLogout={onLogout} />
        <div>
          {/* <select className="select mr-1" onChange={onLanguageSelect} value={i18n.language}>
            {LANGUAGE_ITEMS.map((option) => (
              <option data-value={option.key} key={option.key} value={option.key}>
                {option.label}
              </option>
            ))}
          </select> */}
          <select className="select" onChange={onThemeSelect} value={theme}>
            {createThemeOptions(t).map((option) => (
              <option data-value={option.key} key={option.key} value={option.key}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>
      <ul className="mt-4">
        <li className="py-2 text-[1.4rem] font-medium hover:text-primary">
          <NavLink className={({ isActive }) => (isActive ? 'underline' : '')} to="/library">
            Library
          </NavLink>
        </li>
        <ul className={classnames('ml-2 mt-1', { hidden: location.pathname !== '/library' })}>
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
        <li className="cursor-pointer py-2 text-[1.4rem] font-medium hover:text-primary">
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
          className="flex cursor-pointer items-center gap-2 py-2 text-[1.4rem] font-medium hover:text-primary"
          onClick={onSearchClick}
        >
          Search
          <kbd className="kbd kbd-sm">/</kbd>
        </li>
      </ul>
    </aside>
  );
};

export { Sidebar };
