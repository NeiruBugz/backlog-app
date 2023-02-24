import classNames from 'classnames';
import { createPlatformClassName, preparePlatform } from '@shared';

import type { CSSProperties, ReactNode } from 'react';

import styles from './styles.module.scss';

const Tag = ({
  platform,
  style,
  type,
  children,
}: {
  type: 'platform' | 'common';
  platform?: string;
  style?: CSSProperties;
  children?: ReactNode;
}) => {
  const platformClassName = createPlatformClassName(platform ?? '');
  const className =
    type === 'platform'
      ? classNames(styles['ba-tag__platform'], styles[platformClassName])
      : styles['ba-tag__common'];

  return (
    <span style={style} className={className}>
      {preparePlatform(platform ?? '') || children}
    </span>
  );
};

export { Tag };
