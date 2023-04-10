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
        'text-md flex h-8 max-h-10 max-w-fit items-center justify-center rounded px-4 py-2 text-secondary-content',
        'duration-300 ease-in-out hover:z-10 hover:scale-110',
        platformClassName
      )}
    >
      {preparePlatform(platform ?? '') || children}
    </span>
  );
};

export { Tag };
