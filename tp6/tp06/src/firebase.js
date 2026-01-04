// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBz-5Jri_DAodcYh_xY4Uv1-V-Vn13tUd4",
  authDomain:  "voteapp-b714f.firebaseapp.com",
  projectId: "voteapp-b714f",
  storageBucket: "voteapp-b714f.firebasestorage.app",
  messagingSenderId:  "515736292272",
  appId:"1:515736292272:web:be3934a23fc0dfaec82475",
  measurementId: "G-MFJL0CK2HY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export { app, analytics };