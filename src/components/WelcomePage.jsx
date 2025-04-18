import React, { useState, useEffect, useRef } from 'react';
import './WelcomePage.css';
import { motion, AnimatePresence } from 'framer-motion';
import { FaUser, FaCode, FaLaptopCode, FaEnvelope, FaGithub, FaLinkedin, FaTwitter, FaDownload, FaPlay, FaPause } from 'react-icons/fa';
import NavigationMenu from './NavigationMenu';

const WelcomePage = ({ setActiveModule }) => {
  const [typedGreeting, setTypedGreeting] = useState('');
  const [typedName, setTypedName] = useState('');
  const [typedRole, setTypedRole] = useState('');
  const [showPrompt, setShowPrompt] = useState(false);
  const [showNavigation, setShowNavigation] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [commandInput, setCommandInput] = useState('');
  const [commandHistory, setCommandHistory] = useState([]);
  const [isMatrixPaused, setIsMatrixPaused] = useState(false);
  const [showEasterEgg, setShowEasterEgg] = useState(false);
  
  const terminalBodyRef = useRef(null);
  const commandInputRef = useRef(null);
  const canvasRef = useRef(null);

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    
    return () => clearInterval(timer);
  }, []);

  // Type greeting effect
  useEffect(() => {
    const greeting = "Hello, World! I'm";
    let index = 0;
    
    const typingInterval = setInterval(() => {
      setTypedGreeting((prev) => prev + greeting[index]);
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
        setTypedName((prev) => prev + name[nameIndex]);
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
        setTypedRole((prev) => prev + role[roleIndex]);
        roleIndex++;
        
        if (roleIndex === role.length) {
          clearInterval(roleInterval);
          setTimeout(() => {
            setShowPrompt(true);
            setTimeout(() => {
              setShowNavigation(true);
              initializeMatrix();
              
              // Auto-focus command input after intro completes
              if (commandInputRef.current) {
                commandInputRef.current.focus();
              }
            }, 800);
          }, 500);
        }
      }, 70);
      
      return () => clearInterval(roleInterval);
    }, 300);
  };

  // Matrix code rain effect
  const initializeMatrix = () => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    
    const fontSize = 12;
    const columns = Math.floor(canvas.width / fontSize);
    
    // Characters to display (more tech-oriented)
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789{}[]()<>$#@!+-*/=&|~;:,.?';
    
    // Array to track the y position of each column
    const drops = Array(columns).fill(1);
    
    let animationFrame;
    
    function draw() {
      if (isMatrixPaused) return;
      
      // Semi-transparent background to create fade effect
      context.fillStyle = 'rgba(30, 30, 46, 0.05)';
      context.fillRect(0, 0, canvas.width, canvas.height);
      
      context.fillStyle = '#50fa7b'; // Matrix green
      context.font = `${fontSize}px Consolas, monospace`;
      
      for(let i = 0; i < drops.length; i++) {
        // Random character
        const text = chars[Math.floor(Math.random() * chars.length)];
        
        // x = i*fontSize, y = drops[i]*fontSize
        context.fillText(text, i * fontSize, drops[i] * fontSize);
        
        // Randomly change character brightness for some characters
        if (Math.random() > 0.975) {
          context.fillStyle = '#8be9fd'; // Light blue for variation
          context.fillText(text, i * fontSize, drops[i] * fontSize);
          context.fillStyle = '#50fa7b'; // Back to green
        }
        
        // Send the drop back to the top randomly after it has crossed the screen
        // Adding randomness to the reset to avoid uniform streams
        if(drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        
        // Increment y coordinate
        drops[i]++;
      }
      
      animationFrame = requestAnimationFrame(draw);
    }
    
    draw();
    
    return () => cancelAnimationFrame(animationFrame);
  };
  
  // Handle command input
  const handleCommandSubmit = (e) => {
    e.preventDefault();
    
    if (!commandInput.trim()) return;
    
    const newCommand = commandInput.trim().toLowerCase();
    setCommandHistory([...commandHistory, { command: newCommand, response: getCommandResponse(newCommand) }]);
    setCommandInput('');
    
    // Auto-scroll to bottom of terminal
    if (terminalBodyRef.current) {
      setTimeout(() => {
        terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
      }, 100);
    }
  };
  
  // Generate response based on command
  const getCommandResponse = (command) => {
    if (command === 'help' || command === 'h') {
      return (
        <div className="command-help">
          <p>Available commands:</p>
          <ul>
            <li><span className="command-keyword">about</span> - Show information about me</li>
            <li><span className="command-keyword">skills</span> - List my technical skills</li>
            <li><span className="command-keyword">projects</span> - View my portfolio projects</li>
            <li><span className="command-keyword">contact</span> - Get my contact information</li>
            <li><span className="command-keyword">matrix</span> - Toggle matrix animation</li>
            <li><span className="command-keyword">clear</span> - Clear the terminal</li>
            <li><span className="command-keyword">--egg</span> - Find the easter egg</li>
          </ul>
        </div>
      );
    } else if (command === 'about') {
      return (
        <div className="command-about">
          <p>Hey there! I'm Oussama (aka Thorfinn), a passionate full-stack web developer who loves building modern and interactive digital experiences. I turn creative ideas into real-world applications with a unique visual and functional flair.</p>
        </div>
      );
    } else if (command === 'skills') {
      return (
        <div className="command-skills">
          <div className="skill-category">
            <span className="category-name">Frontend:</span>
            <div className="skill-bars">
              <div className="skill-bar">
                <span>React.js</span>
                <div className="bar-container">
                  <div className="bar-fill" style={{width: '90%'}}></div>
                </div>
              </div>
              <div className="skill-bar">
                <span>Tailwind CSS</span>
                <div className="bar-container">
                  <div className="bar-fill" style={{width: '85%'}}></div>
                </div>
              </div>
              <div className="skill-bar">
                <span>HTML5/CSS3</span>
                <div className="bar-container">
                  <div className="bar-fill" style={{width: '95%'}}></div>
                </div>
              </div>
            </div>
          </div>
          <div className="skill-category">
            <span className="category-name">Backend:</span>
            <div className="skill-bars">
              <div className="skill-bar">
                <span>Laravel</span>
                <div className="bar-container">
                  <div className="bar-fill" style={{width: '85%'}}></div>
                </div>
              </div>
              <div className="skill-bar">
                <span>Express.js</span>
                <div className="bar-container">
                  <div className="bar-fill" style={{width: '80%'}}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    } else if (command === 'projects') {
      setActiveModule('projects');
      return "Loading projects module...";
    } else if (command === 'contact') {
      setActiveModule('contact');
      return "Loading contact module...";
    } else if (command === 'clear') {
      setCommandHistory([]);
      return null;
    } else if (command === 'matrix') {
      setIsMatrixPaused(!isMatrixPaused);
      return `Matrix animation ${isMatrixPaused ? 'resumed' : 'paused'}.`;
    } else if (command === '--egg') {
      setShowEasterEgg(true);
      return "🥚 Easter egg found! You're a true developer!";
    } else if (command === 'exit' || command === 'quit') {
      return "You can't exit - you're in my portfolio now! 😉";
    } else {
      return `Command not found: ${command}. Type 'help' for available commands.`;
    }
  };

  // Motion variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="welcome-container">
      <div className="welcome-content">
        {/* Hero Terminal Card */}
        <section className="hero-terminal-section">
          <motion.div 
            className="hero-terminal"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <div className="matrix-container">
              <canvas ref={canvasRef} className="matrix-canvas"></canvas>
              <div className="matrix-overlay"></div>
            </div>
            
            {/* Terminal Header */}
            <div className="terminal-header">
              <div className="terminal-controls">
                <span className="control red"></span>
                <span className="control yellow"></span>
                <span className="control green"></span>
              </div>
              <div className="terminal-title">portfolio ~ bash</div>
              <div className="terminal-right">
                <button onClick={() => setIsMatrixPaused(!isMatrixPaused)} className="matrix-toggle">
                  {isMatrixPaused ? <FaPlay /> : <FaPause />}
                </button>
                <span className="time-display">{currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
              </div>
            </div>
            
            {/* Terminal Body */}
            <div className="terminal-hero-body" ref={terminalBodyRef}>
              <div className="terminal-welcome-container">
                <motion.div 
                  className="terminal-line welcome-greeting"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <span className="prompt">$</span>
                  <span className="command">{typedGreeting}</span>
                </motion.div>
                
                {typedGreeting.length === "Hello, World! I'm".length && (
                  <motion.div 
                    className="terminal-output name-output"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <span className="name">{typedName}</span>
                    {typedName && !typedRole && <span className="cursor"></span>}
                  </motion.div>
                )}
                
                {typedName.length > 0 && (
                  <motion.div 
                    className="terminal-output role-output"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <span className="role">{typedRole}</span>
                    {typedRole && !showPrompt && <span className="cursor"></span>}
                  </motion.div>
                )}
                
                {showPrompt && (
                  <motion.div 
                    className="terminal-line prompt-line"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    <span className="prompt">$</span>
                    <span className="command">ls -la ./skills</span>
                  </motion.div>
                )}
                
                {showPrompt && (
                  <motion.div 
                    className="terminal-output skills-output"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                  >
                    <div className="skill-item frontend">
                      <span className="skill-type">drwxr-xr-x</span>
                      <span className="skill-name">frontend/</span>
                      <span className="skill-details">React.js, Tailwind CSS, HTML5, CSS3</span>
                    </div>
                    <div className="skill-item backend">
                      <span className="skill-type">drwxr-xr-x</span>
                      <span className="skill-name">backend/</span>
                      <span className="skill-details">Laravel, Express.js, Node.js</span>
                    </div>
                    <div className="skill-item database">
                      <span className="skill-type">drwxr-xr-x</span>
                      <span className="skill-name">database/</span>
                      <span className="skill-details">MySQL, MongoDB, Firebase</span>
                    </div>
                  </motion.div>
                )}
                
                {showNavigation && (
                  <motion.div 
                    className="terminal-actions"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7 }}
                    variants={containerVariants}
                  >
                    <motion.div className="cta-container" variants={itemVariants}>
                      <div className="cta-buttons">
                        <motion.button 
                          className="cta-button primary" 
                          onClick={() => setActiveModule('projects')}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <FaLaptopCode /> View My Work
                        </motion.button>
                        <motion.a 
                          href="/resume.pdf" 
                          download
                          className="cta-button secondary"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <FaDownload /> Download CV
                        </motion.a>
                      </div>
                    </motion.div>
                    
                    <motion.div className="social-links-container" variants={itemVariants}>
                      <a href="https://github.com/oussamabassor" target="_blank" rel="noopener noreferrer" className="social-link">
                        <FaGithub /> GitHub
                      </a>
                      <a href="https://linkedin.com/in/oussamabassor" target="_blank" rel="noopener noreferrer" className="social-link">
                        <FaLinkedin /> LinkedIn
                      </a>
                      <a href="https://twitter.com/oussamabassor" target="_blank" rel="noopener noreferrer" className="social-link">
                        <FaTwitter /> Twitter
                      </a>
                    </motion.div>
                  </motion.div>
                )}
                
                {showNavigation && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.9 }}
                    className="interactive-command-section"
                  >
                    <div className="command-history">
                      <AnimatePresence>
                        {commandHistory.map((item, index) => (
                          <motion.div 
                            key={index}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, height: 0 }}
                            className="command-entry"
                          >
                            <div className="command-input">
                              <span className="prompt">$</span>
                              <span className="command">{item.command}</span>
                            </div>
                            {item.response && (
                              <div className="command-response">
                                {item.response}
                              </div>
                            )}
                          </motion.div>
                        ))}
                      </AnimatePresence>
                    </div>
                    
                    <form onSubmit={handleCommandSubmit} className="command-form">
                      <div className="terminal-line interactive-prompt">
                        <span className="prompt">$</span>
                        <input
                          type="text"
                          value={commandInput}
                          onChange={(e) => setCommandInput(e.target.value)}
                          placeholder="Type 'help' for commands..."
                          className="command-input"
                          ref={commandInputRef}
                          autoComplete="off"
                          spellCheck="false"
                        />
                      </div>
                    </form>
                  </motion.div>
                )}
                
                {/* Easter egg animation */}
                <AnimatePresence>
                  {showEasterEgg && (
                    <motion.div
                      className="easter-egg"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1, rotate: [0, 10, -10, 0] }}
                      exit={{ scale: 0 }}
                      transition={{ type: "spring", stiffness: 260, damping: 20 }}
                    >
                      🚀 Congrats! You found the easter egg! 🚀
                      <motion.div 
                        className="egg-rain"
                        animate={{ y: [0, 100], opacity: [1, 0] }}
                        transition={{ duration: 2, repeat: 2 }}
                      >
                        {'🥚 '.repeat(30)}
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
            
            {/* Terminal Footer */}
            <div className="terminal-footer">
              <span className="footer-item">Node v16.14.0</span>
              <span className="footer-item">npm 8.5.5</span>
              <span className="footer-item">main ✓</span>
            </div>
          </motion.div>
        </section>
        
        {/* Navigation Menu will be displayed below the hero */}
        <NavigationMenu setActiveModule={setActiveModule} activeModule={null} />
      </div>
    </div>
  );
};

export default WelcomePage;
