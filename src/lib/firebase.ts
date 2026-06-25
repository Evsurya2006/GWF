import { initializeApp } from 'firebase/app';
import { initializeFirestore, getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  projectId: "articulate-starlight-mw1xt",
  appId: "1:193161966560:web:904e77cceab1b26ff07185",
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyDsD6TJq3q7q5CjOZkvvvFjxIckb-7scfk",
  authDomain: "articulate-starlight-mw1xt.firebaseapp.com",
  storageBucket: "articulate-starlight-mw1xt.firebasestorage.app",
  messagingSenderId: "193161966560",
};

const app = initializeApp(firebaseConfig);

export const db = initializeFirestore(app, { experimentalForceLongPolling: true }, "ai-studio-841e49c8-87d1-474b-abe1-e38fe3f04406");
export const auth = getAuth(app);
export const storage = getStorage(app);
