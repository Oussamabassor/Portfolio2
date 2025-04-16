import React from 'react';
import './LoadingScreen.css';

const LoadingScreen = () => {
  return (
    <div className="loading-overlay">
      <div className="loading-content">
        <div className="loading-terminal">
          <span className="prompt">&gt;</span>
          <span className="loading-text">Launching DevOS_Portfolio</span>
          <span className="cursor">_</span>
        </div>
        {/* Optional: Add some abstract visual elements */}
        <div className="loading-visuals">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
