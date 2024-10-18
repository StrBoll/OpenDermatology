import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, googleprovider } from '../config/firebase-config';
import { signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';
import '../styles/ResnStyle.css';

const LoginForm = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        if (!currentUser.email.endsWith('@ufl.edu')) {
          alert('Invalid email domain. Only @ufl.edu is allowed.');
          signOut(auth);
        } else {
          navigate('/openderm');
        }
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const signIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleprovider);
      const email = result.user.email;
      if (!email.endsWith('@ufl.edu')) {
        alert('Only UFL email addresses are allowed.');
        await signOut(auth);
      }
      // No need to navigate here, the onAuthStateChanged will handle it
    } catch (err) {
      console.error('Sign-in error:', err);
      alert('Failed to sign in. Please try again.');
    }
  };

  const signout = async () => {
    try {
      await signOut(auth);
      console.log('User signed out');
    } catch (err) {
      console.error('Sign-out error:', err);
    }
  };

  return (
    <div className="login-container">
      {user ? (
        <div>
          <h2>Welcome</h2>
          <p>{user.email}</p>
          <button onClick={signout}>Logout</button>
        </div>
      ) : (
        <div>
          <h2>OpenDerm</h2>
          <button onClick={signIn}>Sign in with UFL email</button>
        </div>
      )}
    </div>
  );
};

export default LoginForm;