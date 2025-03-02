// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDOBXrspB_4Pv99CQdzKHUcRUBIPyTRKls",
  authDomain: "dswt-sharable-auth.firebaseapp.com",
  projectId: "dswt-sharable-auth",
  storageBucket: "dswt-sharable-auth.firebasestorage.app",
  messagingSenderId: "651880013484",
  appId: "1:651880013484:web:f3cec3505494a824074909",
  measurementId: "G-742SQKRGWL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const analytics = getAnalytics(app);

export { app, auth, analytics };