import { auth, googleprovider } from '../config/firebase-config';
import { signInWithPopup, signOut } from 'firebase/auth';
import React, { useState } from 'react';

export const LoginForm = ({ onLogin }) => {

  
  const user = auth.currentUser;
  if (user) {
    console.log(user.email);
  } else {
    console.log("No user is logged in");
  }

  const signIn = async () => {
    try {
      await signInWithPopup(auth, googleprovider);
      
      if (onLogin) {
        onLogin(auth.currentUser);
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
