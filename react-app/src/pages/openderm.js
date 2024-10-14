import { auth } from '../config/firebase-config';
import { signInWithPopup, signOut } from 'firebase/auth';
import React, { useState } from 'react';
import { Route } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Image from '../components/Uploadimage';


export const Openderm = () => {
  
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
    <h1>Openderm</h1>
    <button onClick={signout}>Logout</button>
    <Image></Image>
    </div>
  );
};

export default Openderm;