import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

import { PLATFORM_OPTIONS } from 'pages/add-game/constants';

import type { MouseEventHandler } from 'react';

const Filters = ({
  platformFilter,
  onFilter,
}: {
  statusFilter?: string;
  platformFilter: string;
  onFilter: MouseEventHandler<HTMLLIElement>;
}) => {
  const { t } = useTranslation();

  return (
    <ul className="tabs items-center mt-4">
      <label className="text-lg text-secondary-content">{t('games-list.platformFilter')}: </label>
      <li
        key="all"
        data-field="platform"
        data-value="all"
        onClick={onFilter}
        className={classNames('tab text-lg text-secondary-content hover:text-primary-focus', {
          'tab-active font-bold': platformFilter === 'all',
        })}
      >
        {t('games-list.filters.all')}
      </li>
      {PLATFORM_OPTIONS.map((filterType) => (
        <li
          key={filterType.value}
          data-field="platform"
          data-value={filterType.value}
          onClick={onFilter}
          className={classNames('tab text-lg text-secondary-content hover:text-primary-focus', {
            'tab-active font-bold': platformFilter === filterType.value,
          })}
        >
          {filterType.label}
        </li>
      ))}
    </ul>
  );
};

export { Filters };
