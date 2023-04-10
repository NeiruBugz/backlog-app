import { useState } from 'react';

const useModal = () => {
  const [isVisible, setVisible] = useState(false);

  const toggle = () => {
    setVisible((prev) => !prev);
  };

  return { isVisible, toggle };
};

export { useModal };
