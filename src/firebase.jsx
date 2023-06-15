// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyA7burEYTPYKwOR7DGGNyGZNuK-scOiVoM",
  authDomain: "project-playnet.firebaseapp.com",
  projectId: "project-playnet",
  storageBucket: "project-playnet.appspot.com",
  messagingSenderId: "48539552373",
  appId: "1:48539552373:web:9f6f33ce08939b97b1063c"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export default app;