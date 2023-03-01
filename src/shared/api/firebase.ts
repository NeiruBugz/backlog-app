import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

import type { FirebaseOptions } from 'firebase/app';
import type { Game } from '@entities';

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

const addDocument = async (data: FirebaseAddGamePayload, collectionName: string) => 
  await addDoc(collection(firebaseStore, collectionName), { ...data });

export {
  firebaseAuth,
  firebaseStore,
  addDocument,
};
