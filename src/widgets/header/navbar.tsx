import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import type { FC } from 'react';

const Navbar: FC<{ authorized: boolean }> = ({ authorized }) => {
  const { t } = useTranslation();
  return (
    <nav role="navbar">
      <div>
        <ul tabIndex={0} className="mt-3 py-2 w-52 bg-primary-content text-primary flex gap-3">
          <li className="hover:bg-primary-focus hover:text-primary-content rounded-none">
            <Link to="/">{t('home.header.navigation.main')}</Link>
          </li>
          {authorized ? (
            <li className="hover:bg-primary-focus hover:text-primary-content rounded-none">
              <Link to="/library">{t('home.header.navigation.games')}</Link>
            </li>
          ) : (
            <li className="hover:bg-primary-focus hover:text-primary-content rounded-none">
              <Link to="/auth">{t('home.header.navigation.login')}</Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export { Navbar };
