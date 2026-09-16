// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from "firebase/auth"

const firebaseConfig = {
  apiKey:import.meta.env.VITE_FIREBASE_APIKEY ,
  authDomain: "authexamnotesai-ff020.firebaseapp.com",
  projectId: "authexamnotesai-ff020",
  storageBucket: "authexamnotesai-ff020.firebasestorage.app",
  messagingSenderId: "495551128091",
  appId: "1:495551128091:web:d568ef666e203f529c8ebe"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider =new GoogleAuthProvider()
export {auth,provider};