import { useTranslation } from 'react-i18next';
import { useMemo } from 'react';
import type { Game as GameProps } from '@entities';
import { PlatformTag } from '@widgets';
import { updateGameFx } from '@entities';
import styles from './styles.module.scss';

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

const GameCard = ({ id, title, platform, img }: GameProps): JSX.Element => {
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
    <div className={styles['ba-card-alt']}>
      <img src={img} className={styles['ba-card-alt__image']} />
      <div className={styles['ba-card-alt__info']}>
        <PlatformTag platform={platform}/>
        <h3 className={styles['ba-card-alt__title']}>{title}</h3>
      </div>
    </div>
  );
};

export { GameCard };
