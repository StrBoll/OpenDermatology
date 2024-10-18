import React, { useEffect, useState } from 'react';
import '../styles/LoadingScene.css';

const LoadingScene = ({ onLoadingComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((oldProgress) => {
        const newProgress = Math.min(oldProgress + Math.random() * 10, 100);
        if (newProgress === 100) {
          clearInterval(interval);
          setTimeout(() => onLoadingComplete(), 500); // Delay to show 100% briefly
        }
        return newProgress;
      });
    }, 200);

    return () => clearInterval(interval);
  }, [onLoadingComplete]);

  return (
    <div className="loading-scene">
      <div className="loading-content">
        <h1>OPENDERM</h1>
        <div className="loading-bar">
          <div className="loading-progress" style={{ width: `${progress}%` }}></div>
        </div>
        <p>{Math.round(progress)}%</p>
      </div>
    </div>
  );
};

export default LoadingScene;