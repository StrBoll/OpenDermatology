import { auth, googleprovider } from '../config/firebase-config';
import { signInWithPopup, signOut } from 'firebase/auth';
import React, { useState } from 'react';

export const LoginForm = ({ onLogin }) => {
  const [name, setName] = useState("");
  
  const user = auth.currentUser;
  if (user) {
    console.log(user.email);
  } else {
    console.log("No user is logged in");
  }

  const signIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleprovider);
      const name = result.user;
      setName(name);
      if (onLogin) {
        onLogin(auth.currentUser);
        next();
      }
    } catch (err) {
      console.error(err);
    }
  };
  const next = async () => {
    try {
      if (name.email.endsWith("@ufl.edu")) {
      }
      else {
        await signOut(auth);
      }
    } catch (err) {
      console.error(err);
    }
  };
  const signout = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
    
      <button onClick={signIn}>Sign in with ufl email</button>
      <button onClick={signout}>Logout</button>
    </div>
  );
};

export default LoginForm;
