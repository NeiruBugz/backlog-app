import { Tag } from 'antd';
import classNames from 'classnames';
import { createPlatformClassName, preparePlatform } from '@shared';

import type { CSSProperties } from 'react';

import styles from './styles.module.scss';

const PlatformTag = ({ platform, style }: { platform: string; style?: CSSProperties }) => {
  const platformClassName = createPlatformClassName(platform);

  return (
    <Tag
      style={style}
      className={classNames(styles['ba-tag__platform'], styles[platformClassName])}
    >
      {preparePlatform(platform)}
    </Tag>
  );
};

export { PlatformTag };
