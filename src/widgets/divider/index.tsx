import type { FC, ReactNode } from 'react';

const Divider: FC<{ children: ReactNode }> = ({ children }) => (
  <div className="divider">{children}</div>
);

export { Divider };
