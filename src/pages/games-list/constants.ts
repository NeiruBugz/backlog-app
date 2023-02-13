import type { MenuProps } from 'antd';

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

export { dropdownFilters };
