import { initializeApp, getApps, getApp } from 'firebase/app';
import { initializeFirestore, getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: "uber-clone-cda95.firebaseapp.com",
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: "uber-clone-cda95.firebasestorage.app",
  messagingSenderId: "880237567422",
  appId: "1:880237567422:web:bdd062659bfe69d3c12def"
};

const isFirstInit = getApps().length === 0;
const app = isFirstInit ? initializeApp(firebaseConfig) : getApp();

export const db = isFirstInit
    ? initializeFirestore(app, { experimentalForceLongPolling: true})
    : getFirestore(app);