import type { FC, ReactNode } from 'react';

import styles from './styles.module.scss';

const Divider: FC<{ children: ReactNode }> = ({ children }) => (
  <div className={styles['ba-divider']}>{children}</div>
);

export { Divider };
