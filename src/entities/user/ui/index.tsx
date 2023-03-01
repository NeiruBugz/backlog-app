import { useTranslation } from 'react-i18next';

import type { FC } from 'react';
import type { UserProps } from '@shared';

const User: FC<UserProps> = ({ username, avatarUrl, onLogout }) => {
  const { t } = useTranslation();

  return (
    <>
      <div className="dropdown dropdown-end">
        <label tabIndex={0} className="btn btn-ghost m-1">
          <div className="avatar">
            <div className="mask mask-hexagon w-10">
              {avatarUrl ? (
                <img src={avatarUrl} alt={`${username}'s avatar`} />
              ) : (
                <>
                  <div className="avatar placeholder">
                    <div className="bg-neutral-focus text-neutral-content rounded-full w-10">
                      <span>{username.charAt(0)}</span>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </label>
        <ul tabIndex={0} className="dropdown-content menu p-2 shadow rounded-box w-32 bg-primary-content text-primary">
          <li>{username}</li>
          <li>
            <button className="btn btn-ghost hover:bg-primary-focus hover:text-neutral-focus" onClick={onLogout}>
              {t('home.header.user.dropdown.options.logout')}
            </button>
          </li>
        </ul>
      </div>
    </>
  );
};

export { User };
