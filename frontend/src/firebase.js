// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDjnr0c1TYFIZaHh9Zl3n9e86pYRTbkcWA",
  authDomain: "hc-2-f264e.firebaseapp.com",
  projectId: "hc-2-f264e",
  storageBucket: "hc-2-f264e.firebasestorage.app",
  messagingSenderId: "869965902491",
  appId: "1:869965902491:web:74300dd53d69c24395cc3e",
  measurementId: "G-50ZSMRWVX7"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
