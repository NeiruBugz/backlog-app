import type { ReactNode } from 'react';

import styles from './styles.module.scss';

const Divider = ({ children }: { children: ReactNode }) => (
  <div className={styles['ba-divider']}>{children}</div>
);

export { Divider };
