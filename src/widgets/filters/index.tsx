import { Button } from 'antd';
import { useTranslation } from 'react-i18next';
import { DropdownWidget } from '@widgets';

import type { MenuProps } from 'antd';

import styles from './styles.module.scss';

const dropdownFilters: MenuProps['items'] = [
  {
    label: 'All',
    key: 'all',
  },
  {
    label: 'Backlog',
    key: 'backlog',
  },
  {
    label: 'In Progress',
    key: 'in-progress',
  },
  {
    label: 'Completed',
    key: 'completed',
  },
];

const Filters = ({
  filter,
  onFilter,
}: {
  filter: string;
  onFilter: (filterType: string) => void;
}) => {
  const { t } = useTranslation();

  const handleDropdownItemClick: MenuProps['onClick'] = (e) => {
    onFilter(e.key);
  };

  return (
    <>
      <div className={styles['ba-gameslist-page__nav-filters']}>
        <Button
          disabled={filter === 'all'}
          onClick={() => onFilter('all')}
          className={styles['ba-filter__button']}
        >
          {t('games-list.filters.all')}
        </Button>
        <Button
          disabled={filter === 'backlog'}
          onClick={() => onFilter('backlog')}
          className={styles['ba-filter__button']}
        >
          {t('games-list.filters.backlog')}
        </Button>
        <Button
          disabled={filter === 'in-progress'}
          onClick={() => onFilter('in-progress')}
          className={styles['ba-filter__button']}
        >
          {t('games-list.filters.inProgress')}
        </Button>
        <Button
          disabled={filter === 'completed'}
          onClick={() => onFilter('completed')}
          className={styles['ba-filter__button']}
        >
          {t('games-list.filters.completed')}
        </Button>
      </div>
      <div className={styles['ba-gameslist-page__nav-filters--mobile']}>
        <DropdownWidget
          items={dropdownFilters}
          onClick={handleDropdownItemClick}
          label={t('games-list.filters.label')}
        />
      </div>
    </>
  );
};

export { Filters };
