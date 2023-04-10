import { useTranslation } from 'react-i18next';

import type { FC } from 'react';
import type { UserProps } from '@shared';

const User: FC<Omit<UserProps, 'uid'>> = ({ username, onLogout }) => {
  const { t } = useTranslation();

  return (
    <>
      <div className="dropdown-start dropdown">
        <label tabIndex={0} className="btn-ghost btn pl-0 pr-1">
          <div className="avatar">
            <div className="mask mask-hexagon w-10">
              <div className="placeholder avatar">
                <div className="w-10 rounded-full bg-neutral-focus text-neutral-content">
                  <span>{username.charAt(0)}</span>
                </div>
              </div>
            </div>
          </div>
          <span className="ml-2">{username}</span>
        </label>
        <ul
          tabIndex={0}
          className="dropdown-content menu rounded-box w-32 bg-primary-content p-2 text-primary shadow"
        >
          <li>{username}</li>
          <li>
            <button
              className="btn-ghost btn hover:bg-primary-focus hover:text-neutral-focus"
              onClick={onLogout}
            >
              {t('home.header.user.dropdown.options.logout')}
            </button>
          </li>
        </ul>
      </div>
    </>
  );
};

export { User };
