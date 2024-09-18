import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAr-gAXB8No8oC4rg5iDbAL0q8dPYNDZd4",
  authDomain: "miniblog-d2eed.firebaseapp.com",
  projectId: "miniblog-d2eed",
  storageBucket: "miniblog-d2eed.appspot.com",
  messagingSenderId: "377220200381",
  appId: "1:377220200381:web:381bcfa35dae55aeb944d4",
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };
