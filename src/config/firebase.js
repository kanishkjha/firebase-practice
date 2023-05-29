import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyD1VKbDrx9bxKDQUZVxQvezZzqwr0lpeV0",
  authDomain: "fir-course-ae39b.firebaseapp.com",
  projectId: "fir-course-ae39b",
  storageBucket: "fir-course-ae39b.appspot.com",
  messagingSenderId: "225605058535",
  appId: "1:225605058535:web:2dc8c0276b66145e8b0742",
  measurementId: "G-2XYN39VKQ4",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);
