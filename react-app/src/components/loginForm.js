// src/components/LoginForm.js
import { auth, googleprovider } from '../config/firebase-config';
import { signInWithPopup, signOut} from 'firebase/auth'
import React, { useState } from 'react';

export const LoginForm = ({ onLogin }) => {
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");


const signIn = async () => {
  try{
    await signInWithPopup(auth, googleprovider);
  } catch (err){
    console.error(err);
  }
 

};

const signout = async () => {
  try{
    await signOut(auth);
  } catch (err){
    console.error(err);
  }
 

};


  return (
    <div>
      <input placeholder='Email...'
      onChange={(e) => setEmail(e.target.value)}/>
      <input placeholder='Password...'
      onChange={(e) => setPassword(e.target.value)}/>
      <button onClick={signIn}>Sign in</button>
      <button onClick={signout}>Logout</button>

</div>
  );
};

export default LoginForm;
