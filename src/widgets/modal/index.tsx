import { useRef, useEffect, useCallback } from 'react';
import { useStore } from '@nanostores/react';
import ReactDOM from 'react-dom';

import { modal, setModal } from './modal';
import { SearchModal } from './search';

import type { ReactPortal } from 'react';
import { useOutsideClick } from '@shared';

const Modal = (): ReactPortal | null => {
  const { isVisible, id } = useStore(modal);
  const modalBodyRef = useRef<HTMLDivElement>(null);

  const onModalClose = useCallback(() => setModal({ id: null, isVisible: false }), []);

  useEffect(() => {
    const onEscapePress = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onModalClose();
      }
    };

    document.addEventListener('keydown', onEscapePress);

    return () => {
      document.removeEventListener('keydown', onEscapePress);
    };
  }, [onModalClose]);

  useOutsideClick(modalBodyRef, onModalClose);

  const modalComponent = () => {
    if (id === 'search') {
      return <SearchModal ref={modalBodyRef} />;
    }

    return <div ref={modalBodyRef}>Modal</div>;
  };

  if (!isVisible) {
    return null;
  }

  return ReactDOM.createPortal(
    <div id="modalOverlay">
      <div
        className="w-[100vw] h-[100vh] z-50 bg-slate-300/75 absolute top-0 left-0 flex items-center justify-center"
        ref={modalBodyRef}
      >
        {modalComponent()}
      </div>
    </div>,
    document.body
  );
};

export { Modal };
