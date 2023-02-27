import { Tag } from '@widgets';

import type { FC } from 'react';
import type { Game as GameProps } from '@entities';

import styles from './styles.module.scss';

const GameCard: FC<GameProps> = ({ title, platform, img }) => (
  <>
    <div className={styles['ba-card-alt']}>
      <img src={img} className={styles['ba-card-alt__image']} />
      <div className={styles['ba-card-alt__info']}>
        <Tag platform={platform} type="platform" />
        <h3 className={styles['ba-card-alt__title']}>{title}</h3>
      </div>
    </div>
  </>
);

export { GameCard };
