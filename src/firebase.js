import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBXrA2NEW6SwzQyY3ol0HPrXJNsqY1bWNc",
  authDomain: "glamgemsstore-f7f88.firebaseapp.com",
  projectId: "glamgemsstore-f7f88",
  storageBucket: "glamgemsstore-f7f88.firebasestorage.app",
  messagingSenderId: "414729155434",
  appId: "1:414729155434:web:7722df5405170f0d706b13"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);