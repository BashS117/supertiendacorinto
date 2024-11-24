// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from 'firebase/firestore';
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCGGLSqwWsNACQtJx62aesHtsrKSqNMgaQ",
  authDomain: "supertienda-corinto.firebaseapp.com",
  projectId: "supertienda-corinto",
  storageBucket: "supertienda-corinto.firebasestorage.app",
  messagingSenderId: "684246390758",
  appId: "1:684246390758:web:e36eb3638a141112bca827",
  measurementId: "G-WNBHSG6LZQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);