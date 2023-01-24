import { Card, MenuProps, Typography } from 'antd';
import type { Game as GameProps } from '@entities';
import { DropdownWidget, PlatformTag } from '@widgets';
import { updateGameFx } from '@entities';
import styles from './styles.module.scss';

const dropdownFilters: MenuProps['items'] = [
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
  const onGameStatusChange = (payload: string) => {
    updateGameFx({ id: id, field: { key: 'status', value: payload } });
  };

  return (
    <Card className={styles['ba-card']} bodyStyle={{ padding: '18px 12px' }}>
      <Typography.Title level={5}>{title}</Typography.Title>
      <div className={styles['ba-card__info']}>
        <PlatformTag platform={platform} />
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
