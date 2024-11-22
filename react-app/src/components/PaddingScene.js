import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import '../styles/LoadingStyles.css';

const PaddingScene = ({ onComplete }) => {
  const containerRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current || !textRef.current) {
      console.error("Refs not attached properly!");
      return;
    }

    const tl = gsap.timeline({
      onComplete: () => {
        console.log("Animation complete");
        onComplete();
      },
    });

    tl.to(containerRef.current, {
      duration: 2, // Slow fade-in duration
      opacity: 1,
      ease: "sine.inOut",
    })
      .to(
        textRef.current,
        {
          duration: 2, // Smooth text fade-in
          opacity: 1,
          y: 0,
          ease: "power1.out",
        },
        "-=1.5" // Slight overlap with container fade-in
      )
      .to({}, { duration: 2 }) // Hold the scene for 5 seconds
      .to(containerRef.current, {
        duration: 2,
        opacity: 0,
        ease: "sine.inOut",
      })
      .to(
        textRef.current,
        {
          duration: 1,
          opacity: 0,
          y: -20,
          ease: "power1.in",
        },
        "-=1" // Overlap text fade-out with container fade-out
      );

    return () => {
      tl.kill(); // Clean up animation to prevent memory leaks
    };
  }, [onComplete]);

  return (
    <div ref={containerRef} className="padding-scene" style={{ opacity: 0 }}>
      <h1 ref={textRef} style={{ opacity: 0, transform: "translateY(50px)" }}>
        OPENDERM
      </h1>
    </div>
  );
};

export default PaddingScene;
