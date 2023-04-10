import { atom } from 'nanostores';

interface ModalStore {
  id: string | null;
  isVisible: boolean;
  modalProps?: unknown;
}

const initialValue: ModalStore = {
  id: '',
  isVisible: false,
};

const modal = atom(initialValue);

const setModal = function setModalId(payload: ModalStore) {
  modal.set(payload);
};

export { modal, setModal };
