import React, { useState, useEffect, useRef } from 'react';
import NET from 'vanta/dist/vanta.net.min';
import * as THREE from 'three';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginForm from './components/loginForm';
import Openderm from './pages/openderm';
import LoadingScene from './components/LoadingScene';

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const vantaRef = useRef(null);

  const handleLoadingComplete = () => {
    console.log("Loading complete");
    setIsLoading(false);
  };

  useEffect(() => {
    const vantaEffect = NET({
      el: vantaRef.current,
      THREE: THREE,
      color: 0x3fa9f5,
      backgroundColor: 0x23153c,
      points: 10,
      maxDistance: 20,
      spacing: 15,
    });

    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, []);

  return (
    <Router>
      <div ref={vantaRef} style={{ width: '100vw', height: '100vh', position: 'fixed', top: 0, left: 0 }}>
        {/* Overlay container for the rest of the app */}
        <div style={{ position: 'relative', width: '100%', height: '100%' }}>
          {isLoading ? (
            <LoadingScene onLoadingComplete={handleLoadingComplete} />
          ) : (
            <Routes>
              <Route path="/" element={<Navigate to="/login" />} />
              <Route path="/login" element={<LoginForm />} />
              <Route path="/openderm" element={<Openderm />} />
            </Routes>
          )}
        </div>
      </div>
    </Router>
  );
};

export default App;
