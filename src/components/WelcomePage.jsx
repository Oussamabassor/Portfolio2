import React, { useState, useEffect, useRef } from 'react';
import './WelcomePage.css';
import { motion } from 'framer-motion';
import { FaUser, FaCode, FaLaptopCode, FaEnvelope, FaGithub, FaLinkedin, FaSun, FaMoon } from 'react-icons/fa';
import BackgroundEffect from './BackgroundEffect';

const WelcomePage = ({ setActiveModule }) => {
  const [typedGreeting, setTypedGreeting] = useState('');
  const [typedName, setTypedName] = useState('');
  const [typedRole, setTypedRole] = useState('');
  const [showPrompt, setShowPrompt] = useState(false);
  const [showNavigation, setShowNavigation] = useState(false);
  const [darkMode, setDarkMode] = useState(true); // Default to dark mode
  const terminalRef = useRef(null);

  // Set theme on component mount and when darkMode changes
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  // Toggle theme function
  const toggleTheme = () => {
    setDarkMode(prevMode => !prevMode);
  };

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
      <BackgroundEffect darkMode={darkMode} />
      <div className="welcome-content">
        <div className="terminal-with-profile">
          <motion.div
            className="terminal-card dev-edition"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            ref={terminalRef}
          >
            {/* VS Code inspired terminal header */}
            <div className="terminal-header">
              <div className="terminal-controls">
                <span className="control red" title="Close"></span>
                <span className="control yellow" title="Minimize"></span>
                <span className="control green" title="Expand"></span>
              </div>
              
              <div className="editor-tabs">
                <div className="editor-tab active">
                  <span className="tab-icon">
                    <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none">
                      <path d="M20 7L12 3L4 7M20 7V17L12 21M20 7L12 11M12 21L4 17V7M12 21V11M4 7L12 11" />
                    </svg>
                  </span>
                  <span className="tab-text">portfolio.js</span>
                  <span className="tab-close">×</span>
                </div>
                <div className="editor-tab">
                  <span className="tab-icon">
                    <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none">
                      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3.3.67-4.47 2.7C10.85 3.67 9.3 3 7.54 3A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                    </svg>
                  </span>
                  <span className="tab-text">about.md</span>
                  <span className="tab-close">×</span>
                </div>
              </div>
              
              <div className="terminal-toolbar">
                <button 
                  className="theme-toggle" 
                  onClick={toggleTheme} 
                  aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
                >
                  {darkMode ? <FaSun /> : <FaMoon />}
                </button>
                
                <div className="toolbar-info">
                  <span className="git-branch">
                    <svg viewBox="0 0 16 16" width="12" height="12" fill="currentColor">
                      <path d="M5 3.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm0 2.122a2.25 2.25 0 10-1.5 0V9.25c0 .966.784 1.75 1.75 1.75h3.5a.75.75 0 000-1.5h-3.5a.25.25 0 01-.25-.25v-3.128a2.25 2.25 0 10-1.5 0v3.128a1.75 1.75 0 001.75 1.75h3.5a2.25 2.25 0 000-4.5h-3.5v-.878z"></path>
                    </svg>
                    <span>main</span>
                  </span>
                  <span className="status-indicator online" title="Online"></span>
                  <span className="line-col">Ln 12, Col 5</span>
                </div>
              </div>
            </div>
            
            {/* Terminal Content with line numbers and syntax highlighting */}
            <div className="terminal-content">
              <div className="line-numbers">
                <span>1</span>
                <span>2</span>
                <span>3</span>
                <span>4</span>
                <span>5</span>
                <span>6</span>
                <span>7</span>
                <span>8</span>
                <span>9</span>
                <span>10</span>
                <span>11</span>
                <span>12</span>
              </div>
              
              <div className="code-content">
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
                      <span className="command keyword">ls</span>
                      <span className="command param">-la</span>
                      <span className="command">./navigation</span>
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
                      <span className="command keyword">cat</span>
                      <span className="command">social_links.txt</span>
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
            </div>
            
            {/* VSCode-style footer */}
            <div className="vscode-footer">
              <div className="footer-left">
                <div className="footer-item with-icon">
                  <svg viewBox="0 0 16 16" width="14" height="14" fill="currentColor">
                    <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0ZM1.5 8a6.5 6.5 0 1 0 13 0 6.5 6.5 0 0 0-13 0Zm7-3.25v2.992l2.028.812a.75.75 0 0 1-.557 1.392l-2.5-1A.751.751 0 0 1 7 8.25v-3.5a.75.75 0 0 1 1.5 0Z"></path>
                  </svg>
                  <span>Portfolio ready</span>
                </div>
                <div className="footer-item">ES6+</div>
                <div className="footer-item">UTF-8</div>
              </div>
              <div className="footer-right">
                <div className="footer-item">JavaScript</div>
                <div className="footer-item">React 18.2.0</div>
              </div>
            </div>
          </motion.div>
          
          {/* Enhanced Profile Card */}
          <motion.div 
            className="profile-container"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
          >
            <div className="dev-profile-card">
              <div className="profile-header">
                <div className="profile-frame">
                  <img 
                    src="/images/profile.jpg" 
                    alt="Oussama Bassor" 
                    className="profile-image" 
                  />
                  <div className="profile-glow"></div>
                </div>
                <div className="profile-status-badge">
                  <span className="status-dot"></span>
                  <span className="status-text">Open to Work</span>
                </div>
              </div>
              
              <div className="profile-body">
                <div className="profile-name">Oussama Bassor</div>
                <div className="profile-title">
                  <span className="tag-icon">👨‍💻</span> Full Stack Web Developer
                </div>
                
                <div className="tech-stack">
                  <div className="tech-stack-label">TECH STACK</div>
                  <div className="tech-tags">
                    <span className="tech-tag">React</span>
                    <span className="tech-tag">Node.js</span>
                    <span className="tech-tag">Laravel</span>
                    <span className="tech-tag">MySQL</span>
                    <span className="tech-tag">MongoDB</span>
                    <span className="tech-tag">+5</span>
                  </div>
                </div>
              </div>
              
              <div className="profile-actions">
                <button className="profile-action-btn primary">
                  <FaEnvelope /> Contact
                </button>
                <button className="profile-action-btn secondary">
                  <FaGithub /> GitHub
                </button>
              </div>
            </div>
            
            {/* Quick Stats Card */}
            <div className="stats-card">
              <div className="stats-header">Quick Stats</div>
              <div className="stats-content">
                <div className="stat-item">
                  <div className="stat-number">3+</div>
                  <div className="stat-label">Years Experience</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">20+</div>
                  <div className="stat-label">Projects</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">15+</div>
                  <div className="stat-label">Technologies</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
