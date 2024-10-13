import { auth, googleprovider } from '../config/firebase-config';
import { signInWithPopup, signOut } from 'firebase/auth';
import React, { useState } from 'react';
import { Route } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Image from '../components/Uploadimage';

export const Openderm = () => {
  

  return (
    <div>
    <h1>Openderm</h1>
    <Image></Image>
    </div>
  );
};

export default Openderm;