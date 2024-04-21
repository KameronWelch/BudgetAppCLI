// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBeYdJG2GI0uo10747sxjawIeVSrg_Hu_0",
  authDomain: "budgetapp-4ff22.firebaseapp.com",
  projectId: "budgetapp-4ff22",
  storageBucket: "budgetapp-4ff22.appspot.com",
  messagingSenderId: "816149159641",
  appId: "1:816149159641:web:a31a8f3735d883da9368c8",
  measurementId: "G-HTGG5LKDKT"
};

// Initialize Firebase
//const app = initializeApp(firebaseConfig);
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);