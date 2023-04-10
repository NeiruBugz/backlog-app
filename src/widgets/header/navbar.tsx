import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import type { FC } from 'react';

const Navbar: FC<{ authorized: boolean }> = ({ authorized }) => {
  const { t } = useTranslation();
  return (
    <nav role="navbar">
      <div>
        <ul tabIndex={0} className="mt-3 flex w-52 gap-3 bg-primary-content py-2 text-primary">
          <li className="rounded-none hover:bg-primary-focus hover:text-primary-content">
            <Link to="/">{t('home.header.navigation.main')}</Link>
          </li>
          {authorized ? (
            <li className="rounded-none hover:bg-primary-focus hover:text-primary-content">
              <Link to="/library">{t('home.header.navigation.games')}</Link>
            </li>
          ) : (
            <li className="rounded-none hover:bg-primary-focus hover:text-primary-content">
              <Link to="/auth">{t('home.header.navigation.login')}</Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export { Navbar };
