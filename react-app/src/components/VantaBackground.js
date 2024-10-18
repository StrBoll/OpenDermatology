// src/components/VantaBackground.js
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three'; // Import Three.js
import WAVES from 'vanta/dist/vanta.waves.min';

const VantaBackground = () => {
  const vantaRef = useRef(null);

  useEffect(() => {
    // Pass Three.js explicitly to Vanta
    const effect = WAVES({
      el: vantaRef.current,
      THREE: THREE,  // Explicitly pass the THREE object here
      mouseControls: true,
      touchControls: true,
      color: 0x1a1a1a,
      shininess: 50,
    });

    return () => {
      if (effect) effect.destroy();
    };
  }, []);

  return <div ref={vantaRef} style={{ height: '100vh', width: '100%' }} />;
};

export default VantaBackground;
