import React, { useState } from "react";
import styles from "./Auth.module.css";
import { auth, googleProvider } from "../config/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";

function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err) {
      console.error(err);
    }
  };

  const logOut = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error(err);
    }
  };

  const signIn = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className={styles.signUp}>
      <input
        type="email"
        name=""
        id=""
        placeholder="Enter your email"
        className={styles.inputField}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        name=""
        id=""
        placeholder="Enter your password"
        className={styles.inputField}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <div className={styles["button-container"]}>
        <button className={styles.singUpButton} onClick={signIn}>
          Sign up
        </button>
        <button className={styles.singUpButton} onClick={logOut}>
          Sign out
        </button>
        <button className={styles.singUpButton} onClick={signInWithGoogle}>
          Sign in with Google
        </button>
      </div>
    </div>
  );
}

export default Auth;
