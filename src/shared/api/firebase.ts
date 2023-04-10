import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore';

import type { FirebaseOptions } from 'firebase/app';
import type { Game, UpdateGamePayload } from '@entities';

interface FirebaseAddGamePayload extends Omit<Game, 'id'> {
  user: string;
}

const firebaseConfig: FirebaseOptions = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const firebaseApp = initializeApp(firebaseConfig);

const firebaseAuth = getAuth(firebaseApp);
const firebaseStore = getFirestore(firebaseApp);

const addGame = async (data: FirebaseAddGamePayload, collectionName: string) =>
  await addDoc(collection(firebaseStore, collectionName), { ...data });

const deleteGameDocument = async (id: string, collectionName: string) =>
  await deleteDoc(doc(firebaseStore, collectionName, id));

const updateGameDocument = async (payload: UpdateGamePayload, collectionName: string) => {
  const docRef = doc(firebaseStore, collectionName, payload.id);
  await updateDoc(docRef, {
    [payload.field.key]: payload.field.value,
  });
};

export {
  firebaseAuth,
  firebaseStore,
  addGame as addDocument,
  deleteGameDocument,
  updateGameDocument,
};
