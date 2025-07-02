// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "realnext-7b536.firebaseapp.com",
  projectId: "realnext-7b536",
  storageBucket: "realnext-7b536.firebasestorage.app",
  messagingSenderId: "264052356012",
  appId: "1:264052356012:web:d72c370a52b9e2b0d30009"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);