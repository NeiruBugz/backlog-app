import { useSyncExternalStore } from 'react';
import { useNavigate } from 'react-router';

const getWindowWidthSnapshot = () => window.innerWidth;
const widthSubscription = (callback: () => void) => {
  window.addEventListener('resize', callback);
  return () => window.removeEventListener('resize', callback);
};

const useWindowWidth = () => {
  const navigate = useNavigate();
  const width = useSyncExternalStore(widthSubscription, getWindowWidthSnapshot);

  const goToDev = () => {
    if (width < 768) {
      navigate('/in-dev');
    }
  };

  return { width, goToDev };
};

export { useWindowWidth };
