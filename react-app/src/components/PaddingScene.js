import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import '../styles/LoadingStyles.css';

const PaddingScene = ({ onComplete }) => {
  const containerRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ onComplete });

    tl.to(containerRef.current, { duration: 1, opacity: 1 })
      .to(textRef.current, { duration: 1, opacity: 1, y: 0, ease: "power3.out" }, "-=0.5")
      .to(containerRef.current, { duration: 1, opacity: 0 }, "+=1")
      .to(textRef.current, { duration: 0.5, opacity: 0, y: -20 }, "-=0.5");

  }, [onComplete]);

  return (
    <div ref={containerRef} className="padding-scene">
      <h1 ref={textRef}>OPENDERM</h1>
    </div>
  );
};

export default PaddingScene;