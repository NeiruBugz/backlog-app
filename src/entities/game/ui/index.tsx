import { Card, Tag } from 'antd';
import type { Game as GameProps } from '@entities';
import styles from './styles.module.scss';
import classnames from 'classnames';

const createPlatformClassName = (platform: string) => {
  const lowercasedPlatform = platform.toLowerCase();
  if (lowercasedPlatform.includes('nintendo')) {
    return 'ba-card__platform--nintendo';
  }

  if (lowercasedPlatform.includes('playstation')) {
    return 'ba-card__platform--playstation';
  }

  if (lowercasedPlatform.includes('xbox')) {
    return 'ba-card__platform--xbox';
  }

  return '';
};

const GameCard = ({ title, platform }: GameProps): JSX.Element => { 
  return (
    <Card className={styles['ba-card']}>
      <h4>{title}</h4>
      <div>
        <Tag className={classnames(styles['ba-card__platform'], styles[createPlatformClassName(platform)])}>{platform}</Tag>
      </div>
    </Card>
  );
};

export { GameCard };
