import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

import { PLATFORM_OPTIONS } from 'pages/add-game/constants';

import type { MouseEvent } from 'react';

const FILTERS = ['all', 'backlog', 'in-progress', 'completed'];

const translatableString = (filter: string): string => {
  switch (filter) {
  case 'all':
    return 'games-list.filters.all';
  case 'backlog':
    return 'games-list.filters.backlog';
  case 'in-progress':
    return 'games-list.filters.inProgress';
  case 'completed':
    return 'games-list.filters.completed';
  default:
    return '';
  }
};

const Filters = ({
  statusFilter,
  platformFilter,
  onFilter,
}: {
  statusFilter: string;
  platformFilter: string;
  onFilter: (event: MouseEvent<HTMLButtonElement>) => void;
}) => {
  const { t } = useTranslation();

  return (
    <div>
      <h4 className="text-xl">{t('games-list.filters.label')}</h4>
      <div className="tabs items-center">
        <label className="text-lg">{t('games-list.statusFilter')}: </label>
        {FILTERS.map((filterType) => (
          <button
            key={filterType}
            data-field="status"
            data-value={filterType}
            onClick={onFilter}
            className={classNames('tab text-lg', { 'tab-active font-bold': statusFilter === filterType })}
          >
            {t(translatableString(filterType))}
          </button>
        ))}
      </div>
      <div className="tabs items-center">
        <label className="text-lg">{t('games-list.platformFilter')}: </label>
        <button
          key="all"
          data-field="platform"
          data-value="all"
          onClick={onFilter}
          className={classNames('tab text-lg', { 'tab-active font-bold': platformFilter === 'all' })}
        >
          {t('games-list.filters.all')}
        </button>
        {PLATFORM_OPTIONS.map((filterType) => (
          <button
            key={filterType.value}
            data-field="platform"
            data-value={filterType.value}
            onClick={onFilter}
            className={classNames('tab text-lg', { 'tab-active font-bold': platformFilter === filterType.value })}
          >
            {filterType.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export { Filters };
