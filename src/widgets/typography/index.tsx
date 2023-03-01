import { createElement } from 'react';
import type { FC, ReactNode, HTMLAttributes } from 'react';

type TypographyAttributes = HTMLHeadingElement | HTMLParagraphElement;

interface TypographyProps extends HTMLAttributes<TypographyAttributes>{
  children: ReactNode;
  heading?: boolean;
  level?: number;
}

const titleLevels = [1, 2, 3, 4, 5];

const Text: FC<TypographyProps> = ({ children, heading, level, ...rest }) => {
  const detectTitleElement = () => {
    let el = 'p';

    if (heading && level) {
      if (level && titleLevels.includes(level)) {
        el = `h${level}`;
      }
    };

    return el;
  };

  const tag = detectTitleElement();

  return createElement(`${tag}`, { ...rest }, children);
};

Text.displayName = 'Text';

export { Text };