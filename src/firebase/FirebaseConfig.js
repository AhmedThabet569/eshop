// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAyMIZPh5YCN-S6gGF1prm_jKXD0Mx08q0",
  authDomain: "e-bharat-51e02.firebaseapp.com",
  projectId: "e-bharat-51e02",
  storageBucket: "e-bharat-51e02.firebasestorage.app",
  messagingSenderId: "97456141718",
  appId: "1:97456141718:web:6cffa691d8e641cc2559b7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const fireDB = getFirestore(app);
const auth = getAuth(app)
export {fireDB,auth } ;