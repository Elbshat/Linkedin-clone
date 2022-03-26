// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { getFirestore, serverTimestamp } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDayOOmS_oGNWpBzrKOGi-5TvhC9v1cgG4",
  authDomain: "linkedin-test-clone.firebaseapp.com",
  projectId: "linkedin-test-clone",
  storageBucket: "linkedin-test-clone.appspot.com",
  messagingSenderId: "603792504840",
  appId: "1:603792504840:web:54782d2415043c68ef39bd",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

const provider = new GoogleAuthProvider(app);

export {
  auth,
  signInWithPopup,
  onAuthStateChanged,
  signOut,
  provider,
  storage,
  db,
  serverTimestamp,
};
