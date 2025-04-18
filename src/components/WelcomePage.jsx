import React, { useState, useEffect, useRef } from 'react';
import './WelcomePage.css';
import { motion } from 'framer-motion';
import { FaUser, FaCode, FaLaptopCode, FaEnvelope, FaGithub, FaLinkedin } from 'react-icons/fa';
import BackgroundEffect from './BackgroundEffect';

const WelcomePage = ({ setActiveModule }) => {
  const [typedGreeting, setTypedGreeting] = useState('');
  const [typedName, setTypedName] = useState('');
  const [typedRole, setTypedRole] = useState('');
  const [showPrompt, setShowPrompt] = useState(false);
  const [showNavigation, setShowNavigation] = useState(false);
  const terminalRef = useRef(null);

  // Type greeting effect
  useEffect(() => {
    const greeting = "Hello, World! I'm";
    let index = 0;

    const typingInterval = setInterval(() => {
      setTypedGreeting(greeting.substring(0, index + 1));
      index++;

      if (index === greeting.length) {
        clearInterval(typingInterval);
        typeNameSequence();
      }
    }, 70);

    return () => clearInterval(typingInterval);
  }, []);

  // Type name and role in sequence
  const typeNameSequence = () => {
    const name = "Oussama Bassor";
    let nameIndex = 0;

    setTimeout(() => {
      const nameInterval = setInterval(() => {
        setTypedName(name.substring(0, nameIndex + 1));
        nameIndex++;

        if (nameIndex === name.length) {
          clearInterval(nameInterval);
          typeRoleSequence();
        }
      }, 90);

      return () => clearInterval(nameInterval);
    }, 300);
  };

  const typeRoleSequence = () => {
    const role = "Full Stack Web Developer";
    let roleIndex = 0;

    setTimeout(() => {
      const roleInterval = setInterval(() => {
        setTypedRole(role.substring(0, roleIndex + 1));
        roleIndex++;

        if (roleIndex === role.length) {
          clearInterval(roleInterval);
          setTimeout(() => {
            setShowPrompt(true);
            setTimeout(() => {
              setShowNavigation(true);
            }, 800);
          }, 500);
        }
      }, 70);

      return () => clearInterval(roleInterval);
    }, 300);
  };

  return (
    <div className="welcome-container">
      <BackgroundEffect />
      <div className="welcome-content">
        <motion.div
          className="terminal-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          ref={terminalRef}
        >
          {/* Terminal Header */}
          <div className="terminal-header">
            <div className="terminal-controls">
              <span className="control red"></span>
              <span className="control yellow"></span>
              <span className="control green"></span>
            </div>
            <div className="terminal-title">portfolio@oussama ~ bash</div>
          </div>
          
          {/* Terminal Content */}
          <div className="terminal-content">
            <div className="terminal-line">
              <span className="prompt">$</span>
              <span className="command">{typedGreeting}</span>
            </div>
            
            {typedName && (
              <motion.div 
                className="name-display"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <div className="name">{typedName}</div>
                {typedRole && <div className="role">{typedRole}</div>}
                {typedRole && !showPrompt && <span className="cursor"></span>}
              </motion.div>
            )}
            
            {showPrompt && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <div className="terminal-line">
                  <span className="prompt">$</span>
                  <span className="command">ls -la ./navigation</span>
                </div>
                
                <div className="terminal-output">
                  <div className="file-list">
                    <div className="file" onClick={() => setActiveModule('about')}>
                      <span className="file-info">drwxr-xr-x</span>
                      <span className="file-name">about/</span>
                      <span className="file-desc">Learn more about me</span>
                    </div>
                    <div className="file" onClick={() => setActiveModule('skills')}>
                      <span className="file-info">drwxr-xr-x</span>
                      <span className="file-name">skills/</span>
                      <span className="file-desc">My technical skills</span>
                    </div>
                    <div className="file" onClick={() => setActiveModule('projects')}>
                      <span className="file-info">drwxr-xr-x</span>
                      <span className="file-name">projects/</span>
                      <span className="file-desc">View my portfolio</span>
                    </div>
                    <div className="file" onClick={() => setActiveModule('contact')}>
                      <span className="file-info">drwxr-xr-x</span>
                      <span className="file-name">contact/</span>
                      <span className="file-desc">Get in touch</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
            
            {showNavigation && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <div className="terminal-line">
                  <span className="prompt">$</span>
                  <span className="command">cat social_links.txt</span>
                </div>
                
                <div className="social-links">
                  <a href="https://github.com/oussamabassor" target="_blank" rel="noreferrer">
                    <FaGithub /> github.com/oussamabassor
                  </a>
                  <a href="https://linkedin.com/in/oussamabassor" target="_blank" rel="noreferrer">
                    <FaLinkedin /> linkedin.com/in/oussamabassor
                  </a>
                </div>
                
                <div className="terminal-line prompt-line">
                  <span className="prompt">$</span>
                  <span className="cursor-blink"></span>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default WelcomePage;
