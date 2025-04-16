import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue } from 'framer-motion';
import './WelcomePage.css';
import { 
  FaUserAstronaut, 
  FaCode, 
  FaEnvelope, 
  FaProjectDiagram, 
  FaRedo,
  FaArrowsAlt 
} from 'react-icons/fa';

const WelcomePage = ({ setActiveModule }) => {
  // Terminal animation state
  const [typedText, setTypedText] = useState('');
  const [typingComplete, setTypingComplete] = useState(false);
  const [currentServiceIndex, setCurrentServiceIndex] = useState(0);
  const [serviceText, setServiceText] = useState('');
  const [animationPhase, setAnimationPhase] = useState('idle'); // idle, typing, pause, deleting
  const [showingStatus, setShowingStatus] = useState(false);
  const [cursorVisible, setCursorVisible] = useState(true);
  
  // Motion values for draggable functionality
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const [showResetButton, setShowResetButton] = useState(false);
  const terminalRef = useRef(null);

  // Define animation variants
  const titleContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.2,
      },
    },
  };

  const titleCharVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 100, damping: 12 },
    },
  };

  // Services data - only titles
  const services = [
    { title: "Custom Website Development" },
    { title: "Full-Stack Web Applications" },
    { title: "UI/UX Design & Animation" },
    { title: "Landing Page Creation" },
    { title: "Portfolio & Personal Branding Websites" },
    { title: "E-Commerce Website Development" },
    { title: "Dashboard & Admin Panel Interfaces" },
    { title: "Website Redesign & Optimization" },
    { title: "API Integration & Backend Services" },
    { title: "Maintenance & Technical Support" }
  ];

  // Reset position function
  const resetPosition = () => {
    x.set(0);
    y.set(0);
    setShowResetButton(false);
  };
  
  // Monitor position changes
  useEffect(() => {
    const unsubscribeX = x.onChange(latest => {
      if (Math.abs(latest) > 50) setShowResetButton(true);
    });
    const unsubscribeY = y.onChange(latest => {
      if (Math.abs(latest) > 50) setShowResetButton(true);
    });
    return () => {
      unsubscribeX();
      unsubscribeY();
    };
  }, [x, y]);

  // Cursor blink effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setCursorVisible(v => !v);
    }, 530);
    return () => clearInterval(cursorInterval);
  }, []);

  // Auto-scroll terminal
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [typedText, serviceText, showingStatus]);

  // Initial typing animation
  useEffect(() => {
    const introText = "Hey there! I'm Oussama, a passionate full-stack web developer.";
    let i = 0;
    
    const typingInterval = setInterval(() => {
      if (i < introText.length) {
        setTypedText(prev => prev + introText.charAt(i));
        i++;
      } else {
        clearInterval(typingInterval);
        setTypingComplete(true);
      }
    }, 20);
    
    return () => clearInterval(typingInterval);
  }, []);

  // SPLIT INTO SEPARATE ANIMATION EFFECTS FOR RELIABILITY

  // 1. Effect to start typing the next service
  useEffect(() => {
    if (!typingComplete) return;
    
    if (animationPhase === 'idle' && currentServiceIndex < services.length) {
      setAnimationPhase('typing');
    } else if (currentServiceIndex >= services.length && !showingStatus) {
      setShowingStatus(true);
    }
  }, [typingComplete, animationPhase, currentServiceIndex, services.length, showingStatus]);

  // 2. Effect to handle typing animation
  useEffect(() => {
    if (!typingComplete || animationPhase !== 'typing') return;
    
    const currentService = services[currentServiceIndex];
    if (!currentService) return;
    
    const titleToType = `${currentServiceIndex + 1}. ${currentService.title}`;
    
    if (serviceText.length < titleToType.length) {
      const timer = setTimeout(() => {
        setServiceText(prev => prev + titleToType.charAt(prev.length));
      }, 40);
      return () => clearTimeout(timer);
    } else {
      setAnimationPhase('pause');
    }
  }, [typingComplete, animationPhase, currentServiceIndex, serviceText, services]);

  // 3. Effect to handle pause before deletion
  useEffect(() => {
    if (animationPhase !== 'pause') return;
    
    const timer = setTimeout(() => {
      setAnimationPhase('deleting');
    }, 1500);
    
    return () => clearTimeout(timer);
  }, [animationPhase]);

  // 4. Effect to handle deletion animation
  useEffect(() => {
    if (animationPhase !== 'deleting') return;
    
    if (serviceText.length > 0) {
      const timer = setTimeout(() => {
        setServiceText(prev => prev.slice(0, -1));
      }, 20);
      return () => clearTimeout(timer);
    } else {
      // Move to the next service
      setCurrentServiceIndex(prev => prev + 1);
      setAnimationPhase('idle');
    }
  }, [animationPhase, serviceText]);

  return (
    <div className="welcome-container">
      <div className="welcome-header">
        <motion.h1
          className="welcome-title"
          variants={titleContainerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.span variants={titleCharVariants} className="title-bracket">[</motion.span>
          {"DevOS_Portfolio".split("").map((char, index) => (
            <motion.span key={`${char}-${index}`} variants={titleCharVariants}>
              {char}
            </motion.span>
          ))}
          <motion.span variants={titleCharVariants} className="title-bracket">]</motion.span>
        </motion.h1>
        
        <motion.p
          className="welcome-subtitle"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 0.8, y: 0 }}
          transition={{ delay: 1.0, duration: 0.5 }}
        >
          Your Personal Developer Dashboard
        </motion.p>
      </div>

      <motion.div
        className="welcome-intro"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.5 }}
      >
        <p>Welcome to my digital workspace! I'm a full stack developer passionate about building complete, scalable applications from frontend to backend. Explore my projects and skills to see how I can help bring your ideas to life.</p>
      </motion.div>

      {/* Terminal Animation */}
      <motion.div 
        className="terminal-container minimal-terminal"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.5 }}
        drag
        dragConstraints={{ left: -100, right: 100, top: -50, bottom: 50 }}
        dragElastic={0.05}
        dragMomentum={false}
        style={{ x, y }}
        whileDrag={{ scale: 1.02 }}
      >
        {/* Reset position button */}
        {showResetButton && (
          <motion.button 
            className="reset-position-btn"
            onClick={resetPosition}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.1 }}
          >
            <FaRedo />
          </motion.button>
        )}
        
        <div className="terminal-header">
          <div className="terminal-buttons">
            <span className="terminal-button close"></span>
            <span className="terminal-button minimize"></span>
            <span className="terminal-button maximize"></span>
          </div>
          <div className="terminal-title">
            <span className="drag-handle"></span>
            <span>services.sh</span>
          </div>
        </div>
        
        <div className="terminal-body" ref={terminalRef}>
          <div className="terminal-content">
            <div className="terminal-line">
              <span className="prompt">$</span> whoami
            </div>
            <div className="terminal-response">Oussama Bassor - Full Stack Web Developer</div>
            
            <div className="terminal-line">
              <span className="prompt">$</span> cat intro.txt
            </div>
            <div className="terminal-response typing-text">
              {typedText}
              {!typingComplete && <span className={`cursor ${cursorVisible ? 'visible' : ''}`}>|</span>}
            </div>
            
            {typingComplete && (
              <>
                <div className="terminal-line">
                  <span className="prompt">$</span> list-services --titles
                </div>
                
                {/* Service counter */}
                {!showingStatus && currentServiceIndex < services.length && (
                  <div className="service-counter">
                    <span className="counter-text">{currentServiceIndex + 1}/{services.length}</span>
                  </div>
                )}
                
                {/* Service Title Display Area */}
                <div className="service-display">
                  {serviceText && (
                    <div className="service-title">
                      {serviceText}
                      {animationPhase === 'typing' && (
                        <span className={`cursor ${cursorVisible ? 'visible' : ''}`}>|</span>
                      )}
                    </div>
                  )}
                </div>
                
                {showingStatus && (
                  <>
                    <div className="terminal-line">
                      <span className="prompt">$</span> availability --status
                    </div>
                    <div className="terminal-response">
                      <span className="status-label">Status:</span> 
                      <span className="status-value">Available for new projects</span>
                    </div>
                    <div className="terminal-response">
                      <span className="status-label">Contact:</span> 
                      <span className="email-value">oussamabassor@gmail.com</span>
                    </div>
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </motion.div>

      <motion.div
        className="quick-actions"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.0, duration: 0.5 }}
      >
        <button onClick={() => setActiveModule('about')} className="action-button">
          <FaUserAstronaut className="action-icon" />
          <span>About Me</span>
        </button>
        <button onClick={() => setActiveModule('projects')} className="action-button">
          <FaProjectDiagram className="action-icon" />
          <span>View Projects</span>
        </button>
        <button onClick={() => setActiveModule('skills')} className="action-button">
          <FaCode className="action-icon" />
          <span>My Skills</span>
        </button>
        <button onClick={() => setActiveModule('contact')} className="action-button">
          <FaEnvelope className="action-icon" />
          <span>Contact</span>
        </button>
      </motion.div>
    </div>
  );
};

export default WelcomePage;
