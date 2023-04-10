import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

import { PLATFORM_OPTIONS } from 'pages/add-game/constants';

import type { MouseEventHandler } from 'react';
import { Tag } from 'widgets/tag';

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
    <ul className="tabs my-6 items-center">
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
        <Tag>{t('games-list.filters.all')}</Tag>
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
          <Tag platform={filterType.label}>{filterType.label}</Tag>
        </li>
      ))}
    </ul>
  );
};

export { Filters };
