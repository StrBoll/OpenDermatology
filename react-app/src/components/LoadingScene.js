import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';
import '../styles/LoadingScene.css';

const LoadingScene = ({ onLoadingComplete }) => {
  const canvasRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    let scene, camera, renderer, particles;

    const init = () => {
      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current, alpha: true });
      renderer.setSize(window.innerWidth, window.innerHeight);

      // Create particles
      const geometry = new THREE.BufferGeometry();
      const vertices = [];
      for (let i = 0; i < 10000; i++) {
        vertices.push(
          Math.random() * 2000 - 1000,
          Math.random() * 2000 - 1000,
          Math.random() * 2000 - 1000
        );
      }
      geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
      const material = new THREE.PointsMaterial({ color: 0xffffff, size: 2 });
      particles = new THREE.Points(geometry, material);
      scene.add(particles);

      camera.position.z = 1000;
    };

    const animate = () => {
      requestAnimationFrame(animate);
      particles.rotation.x += 0.001;
      particles.rotation.y += 0.002;
      renderer.render(scene, camera);
    };

    init();
    animate();

    // Text animation
    gsap.to(textRef.current, {
      duration: 2,
      opacity: 1,
      y: 0,
      ease: "power4.out",
    });

    // Simulate loading
    gsap.to({}, {
      duration: 4,
      onComplete: () => {
        gsap.to(canvasRef.current, {
          duration: 1,
          opacity: 0,
          onComplete: onLoadingComplete
        });
      }
    });

    return () => {
      renderer.dispose();
    };
  }, [onLoadingComplete]);

  return (
    <div className="loading-scene">
      <canvas ref={canvasRef} />
      <div className="loading-text" ref={textRef}>
        <h1>OPENDERM</h1>
        <p>Initializing...</p>
      </div>
    </div>
  );
};

export default LoadingScene;