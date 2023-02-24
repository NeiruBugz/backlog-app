import { useTranslation } from 'react-i18next';
import { DropdownWidget } from '@widgets';

import styles from './styles.module.scss';

const dropdownFilters = [
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

  const handleDropdownItemClick = (e: unknown) => {
    if (e !== null && typeof e === 'object' && 'key' in e) {
      onFilter(e.key as string);
    }
  };

  return (
    <>
      <div className={styles['ba-gameslist-page__nav-filters']}>
        <button
          disabled={filter === 'all'}
          onClick={() => onFilter('all')}
          className={styles['ba-filter__button']}
        >
          {t('games-list.filters.all')}
        </button>
        <button
          disabled={filter === 'backlog'}
          onClick={() => onFilter('backlog')}
          className={styles['ba-filter__button']}
        >
          {t('games-list.filters.backlog')}
        </button>
        <button
          disabled={filter === 'in-progress'}
          onClick={() => onFilter('in-progress')}
          className={styles['ba-filter__button']}
        >
          {t('games-list.filters.inProgress')}
        </button>
        <button
          disabled={filter === 'completed'}
          onClick={() => onFilter('completed')}
          className={styles['ba-filter__button']}
        >
          {t('games-list.filters.completed')}
        </button>
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
