import { atom } from 'nanostores';

interface SearchAtom {
  name: string;
  imageUrl: string;
}

const initialValue: SearchAtom = {
  name: '',
  imageUrl: '',
};

const search = atom(initialValue);

const savePayload = function savePayload(payload: SearchAtom) {
  search.set(payload);
};

const resetPayload = function resetPayload() {
  search.set(initialValue);
};

export {
  search,
  savePayload,
  resetPayload,
};
