import { ReactNode } from 'react';
import ReactDOM from 'react-dom';

const Portal = ({ children }: { children: ReactNode }) => {
  const createOverlay = (): Element => {
    const overlay = document.createElement('div');
    overlay.setAttribute('id', 'overlay');
    document.body.appendChild(overlay);
    return overlay;
  };

  const overlay: Element = document.getElementById('overlay')
    ? document.getElementById('overlay') as Element
    : createOverlay();

  return ReactDOM.createPortal(children, overlay);
};

export { Portal };