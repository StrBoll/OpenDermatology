import React, { useState, useEffect, useRef } from 'react';
import NET from 'vanta/dist/vanta.net.min';
import * as THREE from 'three';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './config/firebase-config';
import LoginForm from './components/loginForm';
import Openderm from './pages/openderm';
import PaddingScene from './components/PaddingScene';
import HistoryPage from './pages/history';

const App = () => {
  const [isAuthChecked, setIsAuthChecked] = useState(false);
  const [isLoadingComplete, setIsLoadingComplete] = useState(false);
  const [user, setUser] = useState(null);
  const vantaRef = useRef(null);
  const [vantaEffect, setVantaEffect] = useState(null);

  // Authentication state check
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log("User state changed:", currentUser);
      setUser(currentUser);
      setIsAuthChecked(true);
    });

    return () => unsubscribe();
  }, []);

  // Vanta.js effect setup
  useEffect(() => {
    if (!vantaEffect && vantaRef.current) {
      const effect = NET({
        el: vantaRef.current,
        THREE: THREE,
        color: 0x3fa9f5,
        backgroundColor: 0x23153c,
        points: 10,
        maxDistance: 20,
        spacing: 15,
      });
      setVantaEffect(effect);
    }

    return () => {
      if (vantaEffect) {
        vantaEffect.destroy();
      }
    };
  }, [vantaEffect]);

  const handleLoadingComplete = () => {
    console.log("Loading animation complete");
    setIsLoadingComplete(true);
  };

  // Show actual content only when both auth is checked AND loading animation is complete
  const showContent = isAuthChecked && isLoadingComplete;

  return (
    <Router>
      <div style={{ width: '100vw', height: '100vh', position: 'fixed', top: 0, left: 0 }}>
        <div
          ref={vantaRef}
          style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }}
        />
        {!showContent ? (
          <PaddingScene onComplete={handleLoadingComplete} />
        ) : (
          <div style={{ position: 'relative', width: '100%', height: '100%', zIndex: 1 }}>
            <Routes>
              <Route path="/login" element={<LoginForm />} />
              <Route
                path="/openderm"
                element={user ? <Openderm /> : <Navigate to="/login" replace />}
              />
              <Route
                path="/history"
                element={user ? <HistoryPage /> : <Navigate to="/login" replace />}
              />
              <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
          </div>
        )}
      </div>
    </Router>
  );
};

export default App;