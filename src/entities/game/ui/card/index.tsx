import { Card, MenuProps, Typography } from 'antd';
import type { Game as GameProps } from '@entities';
import { DropdownWidget, PlatformTag } from '@widgets';
import { updateGameFx } from '@entities';
import styles from './styles.module.scss';
import { useTranslation } from 'react-i18next';
import { useMemo } from 'react';

const dropdownFilters = [
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
  const { t } = useTranslation();

  const onGameStatusChange = (payload: string) => {
    updateGameFx({ id: id, field: { key: 'status', value: payload } });
  };

  const translatedFilters = useMemo(() => {
    return dropdownFilters.map((filter) => {
      const trFilter = { ...filter };
      if ('label' in trFilter && 'key' in trFilter) {
        trFilter.label =
          trFilter.key === 'in-progress' ? t('common.inProgress') : t(`common.${trFilter.key}`);
      }
      return trFilter;
    });
  }, [t]);

  return (
    <Card className={styles['ba-card']} bodyStyle={{ padding: '18px 12px' }}>
      <Typography.Title level={5}>{title}</Typography.Title>
      <div className={styles['ba-card__info']}>
        <PlatformTag platform={platform} />
        <DropdownWidget
          items={translatedFilters}
          label={t('games-list.gameCard.moveTo')}
          onClick={({ key }) => onGameStatusChange(key)}
        />
      </div>
    </Card>
  );
};

export { GameCard };
