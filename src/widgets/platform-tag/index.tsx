import { Tag } from 'antd';
import classNames from 'classnames';
import { createPlatformClassName, preparePlatform } from '@shared';
import styles from './styles.module.scss';

const PlatformTag = ({ platform }: { platform: string }) => {
  const platformClassName = createPlatformClassName(platform);

  return (
    <Tag className={classNames(styles['ba-tag__platform'], styles[platformClassName])}>
      {preparePlatform(platform)}
    </Tag>
  );
};

export { PlatformTag };
