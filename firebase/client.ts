// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA5ayxMgNcOMxZW0eoR0eOq3beWfXfzn58",
  authDomain: "ai-chat-f4a0c.firebaseapp.com",
  projectId: "ai-chat-f4a0c",
  storageBucket: "ai-chat-f4a0c.firebasestorage.app",
  messagingSenderId: "107167798064",
  appId: "1:107167798064:web:6c03cb19b4d5241003eef5",
  measurementId: "G-E266DEN0DL"
};

// Initialize Firebase
const app = !getApps.length ? initializeApp(firebaseConfig) : getApp();
// const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);