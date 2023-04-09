import classNames from 'classnames';
import { createPlatformClassName, preparePlatform } from '@shared';

import type { CSSProperties, ReactNode } from 'react';

const Tag = ({
  platform,
  style,
  children,
}: {
  platform?: string;
  style?: CSSProperties;
  children?: ReactNode;
}) => {
  const platformClassName = createPlatformClassName(platform ?? '');

  return (
    <span
      style={style}
      className={classNames(
        'py-2 px-4 h-8 max-w-fit max-h-10 flex justify-center items-center text-secondary-content text-md rounded',
        platformClassName
      )}
    >
      {preparePlatform(platform ?? '') || children}
    </span>
  );
};

export { Tag };
