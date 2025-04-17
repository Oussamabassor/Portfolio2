import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './LoadingScreen.css';

const LoadingScreen = () => {
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [loadingText, setLoadingText] = useState('Initializing');
  const [currentDot, setCurrentDot] = useState(0);

  // Simulate loading progress
  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingProgress(prev => {
        const next = prev + Math.random() * 15;
        return next > 100 ? 100 : next;
      });
    }, 200);

    return () => clearInterval(interval);
  }, []);

  // Loading text animation
  useEffect(() => {
    const texts = ['Initializing', 'Loading modules', 'Starting services', 'Almost there'];
    let currentTextIndex = 0;
    
    const textInterval = setInterval(() => {
      currentTextIndex = (currentTextIndex + 1) % texts.length;
      setLoadingText(texts[currentTextIndex]);
    }, 2000);
    
    return () => clearInterval(textInterval);
  }, []);

  // Animated dots
  useEffect(() => {
    const dotInterval = setInterval(() => {
      setCurrentDot(prev => (prev + 1) % 4);
    }, 300);
    
    return () => clearInterval(dotInterval);
  }, []);

  const dots = '.'.repeat(currentDot);

  return (
    <div className="loading-overlay">
      <motion.div 
        className="loading-content"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="loading-logo">
          <motion.div 
            className="logo-element"
            animate={{ 
              rotate: [0, 360],
              borderRadius: ["20%", "40%", "20%"]
            }}
            transition={{ 
              duration: 3, 
              repeat: Infinity,
              repeatType: "loop" 
            }}
          >
            <span>&lt;/&gt;</span>
          </motion.div>
        </div>
        
        <div className="loading-terminal">
          <div className="terminal-header">
            <div className="terminal-buttons">
              <span className="terminal-button"></span>
              <span className="terminal-button"></span>
              <span className="terminal-button"></span>
            </div>
            <span className="terminal-title">loading.sh</span>
          </div>
          <div className="terminal-body">
            <div className="terminal-line">
              <span className="prompt">&gt;</span>
              <span className="loading-command">init Oussama_Portfolio</span>
            </div>
            <div className="terminal-line">
              <span className="prompt">&gt;</span>
              <span className="loading-status">{loadingText}{dots}</span>
            </div>
          </div>
        </div>
        
        <div className="loading-progress-container">
          <motion.div 
            className="loading-progress-bar"
            initial={{ width: "0%" }}
            animate={{ width: `${loadingProgress}%` }}
            transition={{ type: "spring", stiffness: 50, damping: 10 }}
          />
          <div className="loading-percentage">{Math.floor(loadingProgress)}%</div>
        </div>
      </motion.div>
    </div>
  );
};

export default LoadingScreen;
