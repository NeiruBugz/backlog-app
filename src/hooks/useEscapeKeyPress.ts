import { useEffect } from 'react';

const useEscapeKeyPress = (callback: () => void): void => {
  useEffect(() => {
    const onEscapePress = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === 'escape') {
        callback();
      }
    };

    document.addEventListener('keydown', onEscapePress);

    return () => {
      document.removeEventListener('keydown', onEscapePress);
    };
  }, [callback]);
};

export { useEscapeKeyPress };
