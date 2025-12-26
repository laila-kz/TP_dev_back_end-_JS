// Import the functions you need from the SDKs you need
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDiLpFJ4LIh9Hp27Tf7vKtGU-7Hxn4ohco",
  authDomain: "forum-communautaire-32884.firebaseapp.com",
  projectId: "forum-communautaire-32884",
  storageBucket: "forum-communautaire-32884.firebasestorage.app",
  messagingSenderId: "905259083792",
  appId: "1:905259083792:web:5c3bb5464f620ee837c295"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig)
const auth = getAuth(firebaseApp)
const db = getFirestore(firebaseApp)

export { auth, db }