import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './About.css';
import { FaTimes, FaCode, FaTerminal, FaDownload, FaCoffee, FaGamepad, FaTv } from 'react-icons/fa';

const About = ({ closeModule }) => {
  const [activeTab, setActiveTab] = useState('profile');
  const [typedText, setTypedText] = useState('');
  const [typingComplete, setTypingComplete] = useState(false);

  // Bio text for terminal animation
  const bioText = "Hey there! I'm Oussama (aka Thorfinn), a passionate full-stack web developer who loves building modern and interactive digital experiences. I turn creative ideas into real-world applications with a unique visual and functional flair.";
  
  // Terminal typing animation
  useEffect(() => {
    if (activeTab === 'terminal') {
      let currentIndex = 0;
      const typingInterval = setInterval(() => {
        if (currentIndex < bioText.length) {
          setTypedText(prev => prev + bioText.charAt(currentIndex));
          currentIndex++;
        } else {
          clearInterval(typingInterval);
          setTypingComplete(true);
        }
      }, 30);
      
      return () => clearInterval(typingInterval);
    }
  }, [activeTab]);

  // Reset typing when tab changes
  useEffect(() => {
    if (activeTab !== 'terminal') {
      setTypedText('');
      setTypingComplete(false);
    }
  }, [activeTab]);

  // Person object for code view
  const personObject = {
    name: "Oussama Bassor",
    nickname: "Thorfinn",
    title: "Full Stack Web Developer",
    education: {
      institution: "OFPPT",
      program: "Full-Stack Web Development",
      status: "Currently studying"
    },
    internship: {
      company: "ORMVAH",
      role: "Technical Intern",
      work: ["Web Development", "Networking", "IT Support"]
    },
    skills: {
      frontend: ["React.js", "Tailwind CSS", "HTML5", "CSS3", "Framer Motion", "Typed.js"],
      backend: ["Laravel", "Express.js", "MySQL"],
      tools: ["Docker", "Git", "phpMyAdmin", "Firebase"],
      design: ["Modern UI/UX", "Responsive Design", "Neomorphism", "Glassmorphism"]
    },
    projects: [
      {
        name: "PayTrack",
        description: "A modern salary management tool"
      },
      {
        name: "Eldoria Games",
        description: "A Fantasy RPG-style online game store"
      },
      {
        name: "Real Estate Booking System",
        description: "A property & bungalow booking platform"
      }
    ],
    funFacts: [
      "I love designing beautiful interfaces with stylish animations",
      "Big fan of RPG games (that's where my nickname \"Thorfinn\" comes from)",
      "I often get UI inspiration from anime and movies",
      "Coffee is the secret sauce behind my code"
    ],
    contact: {
      email: "oussamabassor@gmail.com"
    }
  };

  // Variants for staggering children
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 100, damping: 12 },
    },
  };

  // Render JSON with syntax highlighting
  const renderJSONWithHighlighting = (obj) => {
    const json = JSON.stringify(obj, null, 2);
    return json.split('\n').map((line, index) => {
      // Highlight keys, values, and punctuation
      const highlightedLine = line
        .replace(/(".*?"):/g, '<span class="json-key">$1</span>:')
        .replace(/:\s*(".*?")([,]?)/g, ': <span class="json-string">$1</span>$2')
        .replace(/:\s*(\d+)([,]?)/g, ': <span class="json-number">$1</span>$2')
        .replace(/true|false/g, '<span class="json-boolean">$&</span>')
        .replace(/null/g, '<span class="json-null">null</span>');
        
      return <div key={index} dangerouslySetInnerHTML={{ __html: highlightedLine }} />;
    });
  };

  return (
    <motion.section
      id="about"
      className="about-module"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="module-header">
        <motion.h2 variants={itemVariants} className="module-title">About Me</motion.h2>
        <button onClick={closeModule} className="close-module-btn">
          <FaTimes />
        </button>
      </div>

      <div className="module-content-area">
        {/* VSCode-style tabs */}
        <div className="vscode-tabs">
          <button
            className={`vscode-tab ${activeTab === 'profile' ? 'active' : ''}`}
            onClick={() => setActiveTab('profile')}
          >
            <span className="tab-icon">📋</span> Profile
          </button>
          <button
            className={`vscode-tab ${activeTab === 'terminal' ? 'active' : ''}`}
            onClick={() => setActiveTab('terminal')}
          >
            <FaTerminal className="tab-icon" /> Terminal
          </button>
          <button
            className={`vscode-tab ${activeTab === 'code' ? 'active' : ''}`}
            onClick={() => setActiveTab('code')}
          >
            <FaCode className="tab-icon" /> oussama.json
          </button>
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          {activeTab === 'profile' && (
            <motion.div 
              key="profile"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="tab-content profile-content"
            >
              <div className="about-content">
                {/* Profile image */}
                <motion.div variants={itemVariants} className="about-image">
                  <div className="hexagon-wrapper">
                    <div className="hexagon">
                      <img src="https://via.placeholder.com/300x300/282c34/abb2bf?text=Oussama" alt="Profile" />
                    </div>
                  </div>
                  <div className="status-indicator">
                    <span className="status-dot"></span>
                    <span className="status-text">Ready for Opportunities</span>
                  </div>
                </motion.div>

                <motion.div variants={itemVariants} className="about-text">
                  <motion.div 
                    className="content-card"
                    whileHover={{ scale: 1.02, boxShadow: "0 8px 15px rgba(0,0,0,0.2)" }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    <h3>
                      <span className="accent-icon">👋</span> Quick Intro
                    </h3>
                    <p>
                      Hey there! I'm Oussama (aka Thorfinn), a passionate full-stack web developer who loves building modern and interactive digital experiences. I turn creative ideas into real-world applications with a unique visual and functional flair.
                    </p>
                  </motion.div>

                  <motion.div 
                    className="content-card"
                    whileHover={{ scale: 1.02, boxShadow: "0 8px 15px rgba(0,0,0,0.2)" }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    <h3>
                      <span className="accent-icon">💼</span> Who I Am
                    </h3>
                    <p>
                      I'm currently studying Full-Stack Web Development at OFPPT, and growing every day in this ever-evolving tech world. I specialize in creating modern UI/UX designs, with smooth animations, performance, and clean code at the core.
                    </p>
                    <p>
                      I also completed a technical internship at ORMVAH, where I worked not only on web projects but also handled some networking and IT support tasks within the company.
                    </p>
                  </motion.div>

                  <motion.div 
                    className="content-card skills-card"
                    whileHover={{ scale: 1.02, boxShadow: "0 8px 15px rgba(0,0,0,0.2)" }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    <h3>
                      <span className="accent-icon">⚙️</span> My Main Skills
                    </h3>
                    <div className="skills-grid">
                      <div className="skill-category">
                        <h4>Front-end</h4>
                        <div className="skill-tags">
                          <span className="skill-tag">React.js</span>
                          <span className="skill-tag">Tailwind CSS</span>
                          <span className="skill-tag">HTML5</span>
                          <span className="skill-tag">CSS3</span>
                          <span className="skill-tag">Framer Motion</span>
                          <span className="skill-tag">Typed.js</span>
                        </div>
                      </div>
                      <div className="skill-category">
                        <h4>Back-end</h4>
                        <div className="skill-tags">
                          <span className="skill-tag">Laravel</span>
                          <span className="skill-tag">Express.js</span>
                          <span className="skill-tag">MySQL</span>
                        </div>
                      </div>
                      <div className="skill-category">
                        <h4>Tools & Design</h4>
                        <div className="skill-tags">
                          <span className="skill-tag">Docker</span>
                          <span className="skill-tag">Git</span>
                          <span className="skill-tag">phpMyAdmin</span>
                          <span className="skill-tag">Firebase</span>
                          <span className="skill-tag">UI/UX</span>
                          <span className="skill-tag">Responsive</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div 
                    className="content-card"
                    whileHover={{ scale: 1.02, boxShadow: "0 8px 15px rgba(0,0,0,0.2)" }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    <h3>
                      <span className="accent-icon">🎯</span> My Vision
                    </h3>
                    <p>
                      My goal is to become a professional full-stack developer, capable of building elegant, high-performance, and user-friendly web applications. I love learning new technologies and solving real-world problems creatively.
                    </p>
                  </motion.div>

                  <motion.div 
                    className="content-card fun-facts"
                    whileHover={{ scale: 1.02, boxShadow: "0 8px 15px rgba(0,0,0,0.2)" }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    <h3>
                      <span className="accent-icon">🎉</span> Fun Facts
                    </h3>
                    <ul className="fun-facts-list">
                      <li><span className="fun-icon">🎨</span> I love designing beautiful interfaces with stylish animations.</li>
                      <li><span className="fun-icon"><FaGamepad /></span> Big fan of RPG games (that's where my nickname "Thorfinn" comes from)</li>
                      <li><span className="fun-icon"><FaTv /></span> I often get UI inspiration from anime and movies</li>
                      <li><span className="fun-icon"><FaCoffee /></span> Coffee is the secret sauce behind my code 😄</li>
                    </ul>
                  </motion.div>

                  <motion.div variants={itemVariants} className="about-buttons">
                    <motion.button
                      whileHover={{ scale: 1.05, backgroundColor: "var(--accent-primary)" }}
                      whileTap={{ scale: 0.95 }}
                      className="glow-button"
                      onClick={() => window.location.href = "#contact"}
                    >
                      Contact Me
                    </motion.button>
                    
                    <motion.a
                      href="resume.pdf" download
                      className="download-button-link"
                    >
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="secondary download-button"
                      >
                        <FaDownload className="button-icon" /> Download CV
                      </motion.button>
                    </motion.a>
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          )}

          {activeTab === 'terminal' && (
            <motion.div 
              key="terminal"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="tab-content terminal-content"
            >
              <div className="terminal-window">
                <div className="terminal-header">
                  <span>bash ~ oussama-portfolio</span>
                </div>
                <div className="terminal-body">
                  <div className="terminal-line">
                    <span className="prompt">$</span> whoami
                  </div>
                  <div className="terminal-response">Oussama Bassor - Full Stack Web Developer (aka Thorfinn)</div>
                  
                  <div className="terminal-line">
                    <span className="prompt">$</span> cat introduction.txt
                  </div>
                  <div className="terminal-response typing-text">
                    {typedText}
                    {!typingComplete && <span className="cursor">|</span>}
                  </div>
                  
                  {typingComplete && (
                    <>
                      <div className="terminal-line">
                        <span className="prompt">$</span> ls -l education/
                      </div>
                      <div className="terminal-response">
                        <span className="file institution">OFPPT</span> full-stack-web-development.edu
                      </div>

                      <div className="terminal-line">
                        <span className="prompt">$</span> ls -l projects/
                      </div>
                      <div className="terminal-response">
                        <span className="file project">PayTrack/</span> modern_salary_management_tool.app<br/>
                        <span className="file project">EldoriaGames/</span> fantasy_rpg_game_store.app<br/>
                        <span className="file project">RealEstateBooking/</span> property_booking_platform.app
                      </div>
                      
                      <div className="terminal-line">
                        <span className="prompt">$</span> ls -l skills/
                      </div>
                      <div className="terminal-response">
                        <span className="file frontend">frontend/</span> react.js tailwind.css html5.jsx css3.css framer-motion.js typed.js<br/>
                        <span className="file backend">backend/</span> laravel.php express.js mysql.db<br/>
                        <span className="file tools">tools/</span> docker.yml git.config firebase.json phpMyAdmin.php
                      </div>
                      
                      <div className="terminal-line">
                        <span className="prompt">$</span> cat fun_facts.md
                      </div>
                      <div className="terminal-response">
                        - RPG gaming enthusiast (nickname "Thorfinn" comes from here)<br/>
                        - UI inspiration from anime & movies<br/>
                        - Coffee-powered developer<br/>
                        - Animation & interface design lover
                      </div>
                      
                      <div className="terminal-line">
                        <span className="prompt">$</span> echo $CONTACT_EMAIL
                      </div>
                      <div className="terminal-response">oussamabassor@gmail.com</div>
                      
                      <div className="terminal-line">
                        <span className="prompt">$</span> <span className="cursor-line">|</span>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'code' && (
            <motion.div 
              key="code"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="tab-content code-content"
            >
              <div className="code-window">
                <div className="line-numbers">
                  {Array.from({ length: 35 }, (_, i) => (
                    <div key={i} className="line-number">{i + 1}</div>
                  ))}
                </div>
                <div className="code-block">
                  <div className="code-comment">// About Oussama - Developer Information</div>
                  <div className="code-declaration">const developer = </div>
                  <div className="json-container">
                    {renderJSONWithHighlighting(personObject)}
                  </div>
                  
                  <div className="code-comment">// Function to contact me</div>
                  <div className="code-function">
                    <span className="function-keyword">function</span> <span className="function-name">contactOussama</span>() {'{'}
                  </div>
                  <div className="code-function-body">
                    &nbsp;&nbsp;console.<span className="method-call">log</span>(<span className="string-literal">"Send me an email at: "</span> + developer.contact.email);
                  </div>
                  <div className="code-function-body">
                    &nbsp;&nbsp;<span className="return-statement">return</span> <span className="string-literal">"Let's collaborate on something amazing!"</span>;
                  </div>
                  <div className="code-function">{'}'}</div>
                  
                  <div className="code-execution">
                    <span className="code-comment">// Ready to work together?</span>
                  </div>
                  <div className="code-execution">
                    contactOussama();
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.section>
  );
};

export default About;