import React, { useState, useEffect, useRef } from 'react';
import NET from 'vanta/dist/vanta.net.min';
import * as THREE from 'three';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './config/firebase-config';
import LoginForm from './components/loginForm';
import Openderm from './pages/openderm';
import PaddingScene from './components/PaddingScene';
import MainLoadingScene from './components/MainLoadingScene';

const App = () => {
  const [loadingStage, setLoadingStage] = useState('padding');
  const [user, setUser] = useState(null);
  const [isAuthChecked, setIsAuthChecked] = useState(false);
  const vantaRef = useRef(null);
  const [vantaEffect, setVantaEffect] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setIsAuthChecked(true);
    });

    return () => unsubscribe();
  }, []);

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
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect]);

  const handlePaddingComplete = () => setLoadingStage('loading');
  const handleMainLoadingComplete = () => setLoadingStage('main');

  return (
    <Router>
      <div style={{ width: '100vw', height: '100vh', position: 'fixed', top: 0, left: 0 }}>
        <div ref={vantaRef} style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }} />
        
        {!isAuthChecked && <PaddingScene onComplete={handlePaddingComplete} />}
        
        {isAuthChecked && loadingStage === 'padding' && <PaddingScene onComplete={handlePaddingComplete} />}
        {isAuthChecked && loadingStage === 'loading' && <MainLoadingScene onLoadingComplete={handleMainLoadingComplete} />}
        
        {isAuthChecked && loadingStage === 'main' && (
          <div style={{ position: 'relative', width: '100%', height: '100%', zIndex: 1 }}>
            <Routes>
              <Route path="/login" element={<LoginForm />} />
              <Route 
                path="/openderm" 
                element={user ? <Openderm /> : <Navigate to="/login" replace />} 
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