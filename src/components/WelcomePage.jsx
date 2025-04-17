import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import './WelcomePage.css';
import { 
  FaUserAstronaut, 
  FaCode, 
  FaEnvelope, 
  FaProjectDiagram,
  FaRocket,
  FaArrowRight
} from 'react-icons/fa';

const WelcomePage = ({ setActiveModule }) => {
  // If you're not actually using useMotionValue, remove these lines
  // const x = useMotionValue(0);
  // const y = useMotionValue(0);
  
  // State to track if terminal has been moved
  const [showResetButton, setShowResetButton] = useState(false);
  
  // State for cursor blinking
  const [cursorVisible, setCursorVisible] = useState(true);
  
  // Reset terminal position function
  const resetPosition = () => {
    x.set(0);
    y.set(0);
    setShowResetButton(false);
  };
  
  // Show reset button when terminal is dragged
  const handleDrag = () => {
    if (Math.abs(x.get()) > 10 || Math.abs(y.get()) > 10) {
      setShowResetButton(true);
    }
  };
  
  // Cursor blink effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCursorVisible(prev => !prev);
    }, 530);
    return () => clearInterval(interval);
  }, []);
  

  return (
    <div className="welcome-container">
      <div className="welcome-content">
        {/* Hero Section */}
        <section className="hero-section">
          <div className="hero-content">
            <motion.h1 
              className="hero-title"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              Creating <span className="gradient-text">digital experiences</span> with code & passion
            </motion.h1>
            
            <motion.p 
              className="hero-description"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              I'm <span className="highlight-text">Oussama</span>, a passionate full-stack web developer focused on building beautiful, functional, and user-centered digital experiences.
            </motion.p>
            
            <motion.div 
              className="hero-cta"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              <motion.button 
                className="primary-btn"
                onClick={() => setActiveModule('projects')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View My Work <FaArrowRight className="btn-icon" />
              </motion.button>
              
              <motion.button 
                className="secondary-btn"
                onClick={() => setActiveModule('contact')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Get In Touch
              </motion.button>
            </motion.div>
          </div>
        </section>

        {/* Services Section - Optional, can be moved to About page */}
        {/* <section className="services-section">
          ...services content...
        </section> */}

        {/* Navigation Menu */}
        <nav className="nav-menu">
          <motion.button 
            onClick={() => setActiveModule('about')} 
            className="nav-item"
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="nav-icon about-icon">
              <FaUserAstronaut />
            </div>
            <span>About Me</span>
          </motion.button>
          
          <motion.button 
            onClick={() => setActiveModule('skills')} 
            className="nav-item"
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="nav-icon skills-icon">
              <FaCode />
            </div>
            <span>My Skills</span>
          </motion.button>
          
          <motion.button 
            onClick={() => setActiveModule('projects')} 
            className="nav-item"
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="nav-icon projects-icon">
              <FaProjectDiagram />
            </div>
            <span>My Projects</span>
          </motion.button>
          
          <motion.button 
            onClick={() => setActiveModule('contact')} 
            className="nav-item"
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="nav-icon contact-icon">
              <FaEnvelope />
            </div>
            <span>Contact Me</span>
          </motion.button>
        </nav>
      </div>
    </div>
  );
};

export default WelcomePage;
