// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA9-EsM7RvHkJzf9ShQExuyZ0cVo7zZ8g8",
  authDomain: "tripplanner-e423a.firebaseapp.com",
  projectId: "tripplanner-e423a",
  storageBucket: "tripplanner-e423a.appspot.com",
  messagingSenderId: "207651666514",
  appId: "1:207651666514:web:bdf7a2be5cf4f0df813d8b",
  measurementId: "G-10NPK3392S"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP)
export const FIREBASE_DB = getFirestore(FIREBASE_APP)