import React from 'react';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from '../config/firebase-config';
import Image from '../components/Uploadimage';
import Input from '../components/firestore';

import '../styles/ResnStyle.css';  

const Openderm = () => {
  const navigate = useNavigate();



  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  return (
    <div className="openderm-container">
      <h1>Openderm Dashboard</h1>
      <button className="logout-button" onClick={handleLogout}>Logout</button>
      <Image />

    </div>
  );
};

export default Openderm;