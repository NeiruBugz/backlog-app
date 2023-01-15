import { Card, MenuProps, Tag } from 'antd';
import classnames from 'classnames';
import type { Game as GameProps } from '@entities';
import { api, capitalize, createPlatformClassName } from '@shared';
import styles from './styles.module.scss';
import { DropdownWidget } from '../../../../widgets/dropdown';
import { useCallback } from 'react';

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

const GameCard = ({ id, title, platform }: GameProps): JSX.Element => {
  const platformClassName = createPlatformClassName(platform);

  const onGameStatusChange = useCallback(
    async (payload: string) => {
      await api.updateGame(id, { id, status: payload });
    },
    [id]
  );

  return (
    <Card className={styles['ba-card']}>
      <h4>{title}</h4>
      <div>
        <Tag className={classnames(styles['ba-card__platform'], styles[platformClassName])}>
          {capitalize(platform)}
        </Tag>
        <DropdownWidget
          items={dropdownFilters}
          label="Move to"
          onClick={({ key }) => onGameStatusChange(key)}
        />
      </div>
    </Card>
  );
};

export { GameCard };
