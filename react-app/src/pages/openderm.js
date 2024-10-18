import React from 'react';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../config/firebase-config';
import Image from '../components/Uploadimage';  // Ensure this path is correct

const Openderm = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/login');
  };

  return (
    <div className="openderm-container">
      <h1>Openderm Page</h1>
      <button className="logout-button" onClick={handleLogout}>Logout</button>

      {/* Render the Image Upload Component */}
      <Image />
    </div>
  );
};

export default Openderm;
