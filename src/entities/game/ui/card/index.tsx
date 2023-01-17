import { Card, MenuProps, Tag, Typography } from 'antd';
import classnames from 'classnames';
import type { Game as GameProps } from '@entities';
import { capitalize, createPlatformClassName } from '@shared';
import { DropdownWidget } from '@widgets';
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
  const platformClassName = createPlatformClassName(platform);

  const onGameStatusChange = (payload: string) => {
    updateGameFx({ id: id, field: { key: 'status', value: payload } });
  };

  return (
    <Card className={styles['ba-card']} bodyStyle={{ padding: '18px 12px' }}>
      <Typography.Title level={5}>{title}</Typography.Title>
      <div className={styles['ba-card__info']}>
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
