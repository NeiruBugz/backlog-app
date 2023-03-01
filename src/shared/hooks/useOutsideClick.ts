/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from 'react';
import type { RefObject } from 'react';

const useOutsideClick = (ref: RefObject<HTMLElement>, handler: (event: any) => void) => {
  useEffect(() => {
    const eventListener = (event: any) => {
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }

      handler(event);
    };

    document.addEventListener('mousedown', eventListener);
    document.addEventListener('touchstart', eventListener);

    return () => {
      document.removeEventListener('mousedown', eventListener);
      document.removeEventListener('touchstart', eventListener);
    };
  }, [ref, handler]);
};

export { useOutsideClick };
