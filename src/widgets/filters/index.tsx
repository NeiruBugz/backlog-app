import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

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
  filter,
  onFilter,
}: {
  filter: string;
  onFilter: (filterType: string) => void;
}) => {
  const { t } = useTranslation();

  return (
    <>
      <div className="tabs">
        {FILTERS.map((filterType) => (
          <button
            key={filterType}
            onClick={() => onFilter(filterType)}
            className={classNames('tab text-lg', { 'tab-active': filter === filterType })}
          >
            {t(translatableString(filterType))}
          </button>
        ))}
      </div>
    </>
  );
};

export { Filters };
