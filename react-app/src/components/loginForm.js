import React, { useState, useEffect } from 'react';
import { auth, googleprovider } from '../config/firebase-config';
import { signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import '../styles/ResnStyle.css';

const LoginForm = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();  // Hook for navigating

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        if (!currentUser.email.endsWith('@ufl.edu')) {
          alert('Invalid email domain. Only @ufl.edu is allowed.');
          signOut(auth);  // Sign the user out
          navigate('/login');  // Redirect to login page
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
        navigate('/login');  // Redirect to login after sign-out
      } else {
        navigate('/openderm');  // Redirect to Openderm if login is successful
      }
    } catch (err) {
      console.error('Sign-in error:', err);
      alert('Failed to sign in. Please try again.');
    }
  };

  const signout = async () => {
    try {
      await signOut(auth);
      console.log('User signed out');
      navigate('/login');  // Redirect to login after signout
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
