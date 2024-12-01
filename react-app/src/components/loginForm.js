import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, googleprovider } from '../config/firebase-config';
import { signInWithPopup, signOut } from 'firebase/auth';
import '../styles/ResnStyle.css';

const LoginForm = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Sign the user out on initial load to enforce re-login
  React.useEffect(() => {
    const logoutOnLoad = async () => {
      try {
        await signOut(auth); // Sign out any existing user
        setUser(null); // Clear the user state
      } catch (err) {
        console.error('Error signing out on load:', err);
      }
    };

    logoutOnLoad();
  }, []);

  const signIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleprovider);
      const email = result.user.email;

      if (email.endsWith("@ufl.edu")) {
        setUser(result.user);
        console.log("Login successful");
        navigate("/openderm");
      } else {
        alert("Invalid email domain. Only @ufl.edu is allowed.");
        await signOut(auth);
      }
    } catch (err) {
      console.error("Sign-in error:", err);
    }
  };

  const signout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      console.log("User signed out");
    } catch (err) {
      console.error("Sign-out error:", err);
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
