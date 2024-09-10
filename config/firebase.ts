// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.VITE_KEY_FIREBASE,
  authDomain: "m25-project.firebaseapp.com",
  projectId: "m25-project",
  storageBucket: "m25-project.appspot.com",
  messagingSenderId: "254580967758",
  appId: "1:254580967758:web:940d2034d893611b1bf61f",
  measurementId: "G-86FCFDMY7N",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);

// const analytics = getAnalytics(app);
