import { auth, googleprovider } from '../config/firebase-config';
import { signInWithPopup, signOut } from 'firebase/auth';
import React, { useState } from 'react';
import { Route } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export const LoginForm = ({ onLogin }) => {

  const navigate = useNavigate();
  const user = auth.currentUser;
  if (user) {
    console.log(user.email);
  } else {
    console.log("No user is logged in");
  }

  const signIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleprovider);
      await next(result.user.email, result.user);
    } catch (err) {
      console.error(err);
    }
  };
  const next = async (email, user) => {
    try {
      if (email.endsWith("@ufl.edu")) {
        console.log("success");
        const uid = user.uid; 
        navigate("/openderm");
      }
      else {
        alert('Invalid email or password');
        await signOut(auth);
      }
    } catch (err) {
      console.error(err);
    }
  };
  const signout = async () => {
    try {
      await signOut(auth);
      console.log("signed out");
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