import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';
import '../styles/LoadingStyles.css';

const MainLoadingScene = ({ onLoadingComplete }) => {
  const canvasRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    let scene, camera, renderer, geometry, material, points;

    const init = () => {
      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current, alpha: true });
      renderer.setSize(window.innerWidth, window.innerHeight);

      // Create custom geometry
      geometry = new THREE.BufferGeometry();
      const positions = new Float32Array(10000 * 3);
      const sizes = new Float32Array(10000);
      
      for (let i = 0; i < 10000 * 3; i += 3) {
        positions[i] = (Math.random() - 0.5) * 10;
        positions[i + 1] = (Math.random() - 0.5) * 10;
        positions[i + 2] = (Math.random() - 0.5) * 10;
        sizes[i / 3] = Math.random() * 0.1;
      }

      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

      // Custom shader material
      material = new THREE.ShaderMaterial({
        uniforms: {
          time: { value: 0 },
          color: { value: new THREE.Color(0x00ffff) },
        },
        vertexShader: `
          uniform float time;
          attribute float size;
          void main() {
            vec3 pos = position;
            pos.y += sin(time + position.x * 10.0) * 0.1;
            pos.x += cos(time + position.z * 10.0) * 0.1;
            vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
            gl_PointSize = size * (300.0 / -mvPosition.z);
            gl_Position = projectionMatrix * mvPosition;
          }
        `,
        fragmentShader: `
          uniform vec3 color;
          void main() {
            if (length(gl_PointCoord - vec2(0.5, 0.5)) > 0.475) discard;
            gl_FragColor = vec4(color, 1.0);
          }
        `,
      });

      points = new THREE.Points(geometry, material);
      scene.add(points);

      camera.position.z = 5;
    };

    const animate = (time) => {
      requestAnimationFrame(animate);
      material.uniforms.time.value = time * 0.001;
      renderer.render(scene, camera);
    };

    init();
    animate(0);

    // Text animation
    gsap.to(textRef.current, {
      duration: 2,
      opacity: 1,
      y: 0,
      ease: "power4.out",
    });

    // Simulate loading
    gsap.to({}, {
      duration: 6,
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
        <h2>Initializing Experience</h2>
        <p>Please wait...</p>
      </div>
    </div>
  );
};

export default MainLoadingScene;