import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './About.css';
import { 
  FaTimes, FaCode, FaTerminal, FaDownload, 
  FaCoffee, FaGamepad, FaTv, FaTools, FaCheck, FaUser,
  FaGithub, FaLinkedin, FaRegFolderOpen, FaRegFolder
} from 'react-icons/fa';

const About = ({ closeModule }) => {
  const [imageError, setImageError] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');
  const [typedText, setTypedText] = useState('');
  const [typingComplete, setTypingComplete] = useState(false);
  const [cursorVisible, setCursorVisible] = useState(true);

  const profileImagePath = '/profile.jpg';
  const bioText = "Hey there! I'm Oussama (aka Thorfinn), a passionate full-stack web developer who loves building modern and interactive digital experiences. I turn creative ideas into real-world applications with a unique visual and functional flair.";
  
  // Services data
  const services = [
    {
      id: 1,
      title: "Custom Website Development",
      description: "I build responsive, SEO-friendly websites from scratch using modern technologies like React, Laravel, and Tailwind CSS. Perfect for businesses, startups, and personal brands."
    },
    {
      id: 2,
      title: "Full-Stack Web Applications",
      description: "I create fully functional web apps with both front-end and back-end integration, using React, Express/Laravel, and MySQL. From dashboards to booking systems, I've got it covered."
    },
    {
      id: 3,
      title: "UI/UX Design & Animation",
      description: "I design sleek, user-focused interfaces with modern aesthetics like neomorphism and glassmorphism, enhanced by smooth animations using Framer Motion and custom hover effects."
    },
    {
      id: 4,
      title: "Landing Page Creation",
      description: "I build stunning, high-converting landing pages optimized for marketing campaigns, product launches, or personal branding — fast-loading and mobile-first."
    },
    {
      id: 5,
      title: "Portfolio & Personal Branding",
      description: "I develop interactive, visually engaging portfolios for developers, designers, or creatives who want to stand out online."
    },
    {
      id: 6,
      title: "E-Commerce Website Development",
      description: "I create scalable e-commerce platforms with product pages, cart systems, user authentication, and payment integrations. Built to perform and convert."
    }
  ];

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
  
  // Cursor blink effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setCursorVisible(prev => !prev);
    }, 530);
    return () => clearInterval(cursorInterval);
  }, []);

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

  // Animation variants
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
  
  const serviceItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: item => ({
      opacity: 1,
      y: 0,
      transition: { 
        type: 'spring', 
        stiffness: 80, 
        damping: 12,
        delay: item.id * 0.1
      }
    }),
    hover: {
      y: -5,
      x: 5,
      backgroundColor: "rgba(97, 218, 251, 0.08)",
      boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
      transition: { type: 'spring', stiffness: 300, damping: 10 }
    }
  };

  // Enhanced JSON rendering with line numbers and better highlighting
  const renderJSONWithHighlighting = (obj) => {
    const json = JSON.stringify(obj, null, 2);
    return json.split('\n').map((line, index) => {
      // Improved syntax highlighting with better color distinction
      const highlightedLine = line
        .replace(/(".*?"):/g, '<span class="json-key">$1</span>:')
        .replace(/:\s*(".*?")([,]?)/g, ': <span class="json-string">$1</span>$2')
        .replace(/:\s*(\d+)([,]?)/g, ': <span class="json-number">$1</span>$2')
        .replace(/:\s*(\[)/g, ': <span class="json-bracket">$1</span>')
        .replace(/(\])([,]?)/g, '<span class="json-bracket">$1</span>$2')
        .replace(/(\{|\})/g, '<span class="json-brace">$1</span>')
        .replace(/true|false/g, '<span class="json-boolean">$&</span>')
        .replace(/null/g, '<span class="json-null">null</span>');
        
      return <div key={index} className="code-line" data-line-number={index + 1} dangerouslySetInnerHTML={{ __html: highlightedLine }} />;
    });
  };

  return (
    <motion.section
      id="about"
      className="about-module"
      variants={containerVariants}
      initial="hidden"
      animate="visible">
      
      {/* VSCode-style layout with Explorer and Editor */}
      <div className="vscode-layout">
        {/* Explorer Sidebar */}
        <div className="explorer-sidebar">
          <div className="sidebar-section">
            <div className="section-title">
              EXPLORER
            </div>
            
            <div className="folder-tree">
              <div className="folder">
                <div className="folder-name">
                  <FaRegFolderOpen /> ABOUT ME
                </div>
                <div className="file-list">
                  <div className={`file ${activeTab === 'profile' ? 'active' : ''}`} 
                       onClick={() => setActiveTab('profile')}>
                    <span className="file-icon">📋</span> Profile
                  </div>
                  <div className={`file ${activeTab === 'services' ? 'active' : ''}`} 
                       onClick={() => setActiveTab('services')}>
                    <FaTools className="file-icon" /> Services
                  </div>
                  <div className={`file ${activeTab === 'terminal' ? 'active' : ''}`} 
                       onClick={() => setActiveTab('terminal')}>
                    <FaTerminal className="file-icon" /> Terminal
                  </div>
                  <div className={`file ${activeTab === 'code' ? 'active' : ''}`} 
                       onClick={() => setActiveTab('code')}>
                    <FaCode className="file-icon" /> oussama.json
                  </div>
                </div>
              </div>
              
              <div className="folder">
                <div className="folder-name">
                  <FaRegFolder /> CONTACT
                </div>
              </div>
              
              <div className="folder">
                <div className="folder-name">
                  <FaRegFolder /> LINKS
                </div>
                <div className="file-list">
                  <a href="https://github.com/username" target="_blank" rel="noopener noreferrer" className="file">
                    <FaGithub className="file-icon" /> GitHub
                  </a>
                  <a href="https://linkedin.com/in/username" target="_blank" rel="noopener noreferrer" className="file">
                    <FaLinkedin className="file-icon" /> LinkedIn
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Main Editor Area */}
        <div className="editor-area">
          {/* Editor Tabs */}
          <div className="editor-tabs">
            <div className={`editor-tab ${activeTab === 'profile' ? 'active' : ''}`} 
                 onClick={() => setActiveTab('profile')}>
              <span className="tab-icon">📋</span> Profile.jsx
              {activeTab === 'profile' && <span className="close-tab">×</span>}
            </div>
            <div className={`editor-tab ${activeTab === 'services' ? 'active' : ''}`} 
                 onClick={() => setActiveTab('services')}>
              <FaTools className="tab-icon" /> Services.jsx
              {activeTab === 'services' && <span className="close-tab">×</span>}
            </div>
            <div className={`editor-tab ${activeTab === 'terminal' ? 'active' : ''}`} 
                 onClick={() => setActiveTab('terminal')}>
              <FaTerminal className="tab-icon" /> Terminal
              {activeTab === 'terminal' && <span className="close-tab">×</span>}
            </div>
            <div className={`editor-tab ${activeTab === 'code' ? 'active' : ''}`} 
                 onClick={() => setActiveTab('code')}>
              <FaCode className="tab-icon" /> oussama.json
              {activeTab === 'code' && <span className="close-tab">×</span>}
            </div>
          </div>
          
          {/* Tab Content */}
          <div className="editor-content">
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
                    <div className="profile-section">
                      <div className="profile-image">
                        {!imageError ? (
                          <img 
                            src={profileImagePath} 
                            alt="Profile" 
                            onError={() => setImageError(true)}
                          />
                        ) : (
                          <div className="profile-fallback">
                            <FaUser className="fallback-icon" />
                          </div>
                        )}
                      </div>
                      <div className="profile-info">
                        <h2 className="profile-name">Oussama Bassor</h2>
                        <p className="profile-title">Full Stack Web Developer</p>
                        <div className="status-pill">
                          <span className="status-dot"></span>
                          <span>Available for opportunities</span>
                        </div>
                        <div className="profile-buttons">
                          <button 
                            className="contact-btn primary-btn"
                            onClick={() => window.location.href = "#contact"}
                          >
                            Contact Me
                          </button>
                          <a 
                            href="resume.pdf" 
                            download
                            className="cv-btn secondary-btn"
                          >
                            <FaDownload className="btn-icon" /> Download CV
                          </a>
                        </div>
                      </div>
                    </div>
                    
                    {/* About me content */}
                    <div className="about-sections">
                      <div className="about-section">
                        <h3 className="section-title">
                          <span className="accent-icon">👋</span> Hello World
                        </h3>
                        <p>
                          Hey there! I'm Oussama (aka Thorfinn), a passionate full-stack web developer 
                          who loves building modern and interactive digital experiences. I turn creative ideas 
                          into real-world applications with a unique visual and functional flair.
                        </p>
                      </div>
                      
                      <div className="about-section">
                        <h3 className="section-title">
                          <span className="accent-icon">💼</span> Experience
                        </h3>
                        <p>
                          I'm currently studying Full-Stack Web Development at OFPPT, and growing every day 
                          in this ever-evolving tech world. I specialize in creating modern UI/UX designs, 
                          with smooth animations, performance, and clean code at the core.
                        </p>
                        <p>
                          I also completed a technical internship at ORMVAH, where I worked not only on web projects 
                          but also handled some networking and IT support tasks within the company.
                        </p>
                      </div>
                      
                      <div className="skills-section">
                        <h3 className="section-title">
                          <span className="accent-icon">⚙️</span> Tech Stack
                        </h3>
                        <div className="skill-groups">
                          <div className="skill-group">
                            <h4>Frontend</h4>
                            <div className="skill-pills">
                              <span className="skill-pill">React.js</span>
                              <span className="skill-pill">Tailwind CSS</span>
                              <span className="skill-pill">HTML5</span>
                              <span className="skill-pill">CSS3</span>
                              <span className="skill-pill">Framer Motion</span>
                            </div>
                          </div>
                          
                          <div className="skill-group">
                            <h4>Backend</h4>
                            <div className="skill-pills">
                              <span className="skill-pill">Laravel</span>
                              <span className="skill-pill">Express.js</span>
                              <span className="skill-pill">MySQL</span>
                              <span className="skill-pill">Node.js</span>
                            </div>
                          </div>
                          
                          <div className="skill-group">
                            <h4>Tools</h4>
                            <div className="skill-pills">
                              <span className="skill-pill">Git</span>
                              <span className="skill-pill">Docker</span>
                              <span className="skill-pill">VS Code</span>
                              <span className="skill-pill">Firebase</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="about-section">
                        <h3 className="section-title">
                          <span className="accent-icon">🎯</span> Vision
                        </h3>
                        <p>
                          My goal is to become a professional full-stack developer, capable of building elegant, 
                          high-performance, and user-friendly web applications. I love learning new technologies 
                          and solving real-world problems creatively.
                        </p>
                      </div>
                      
                      <div className="fun-facts-section">
                        <h3 className="section-title">
                          <span className="accent-icon">✨</span> Fun Facts
                        </h3>
                        <ul className="fun-facts-list">
                          <li><span className="fun-icon">🎨</span> I love designing beautiful interfaces with stylish animations</li>
                          <li><span className="fun-icon"><FaGamepad /></span> Big fan of RPG games (that's where my nickname "Thorfinn" comes from)</li>
                          <li><span className="fun-icon"><FaTv /></span> I often get UI inspiration from anime and movies</li>
                          <li><span className="fun-icon"><FaCoffee /></span> Coffee is the secret sauce behind my code</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'services' && (
                <motion.div 
                  key="services"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="tab-content services-content"
                >
                  <div className="services-container">
                    <motion.div 
                      className="services-header"
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <h3 className="services-title">My Services</h3>
                      <p className="services-subtitle">Here's what I can do for you</p>
                    </motion.div>

                    <div className="services-grid">
                      {services.map(service => (
                        <motion.div 
                          key={service.id}
                          className="service-card"
                          custom={service}
                          variants={serviceItemVariants}
                          initial="hidden"
                          animate="visible"
                          whileHover="hover"
                        >
                          <div className="service-card-header">
                            <span className="service-number">{String(service.id).padStart(2, '0')}</span>
                            <h4 className="service-title">{service.title}</h4>
                          </div>
                          <p className="service-description">{service.description}</p>
                        </motion.div>
                      ))}
                    </div>
                    
                    <motion.div 
                      className="services-cta"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.8 }}
                    >
                      <div className="services-availability">
                        <FaCheck className="availability-icon" />
                        <span>Available for new projects</span>
                      </div>
                      
                      <motion.button
                        className="contact-cta-button"
                        onClick={() => window.location.href = "#contact"}
                        whileHover={{ scale: 1.05, y: -3 }}
                        whileTap={{ scale: 0.97 }}
                      >
                        Discuss Your Project
                      </motion.button>
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
                        {cursorVisible && <span className="cursor">|</span>}
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
                  <div className="code-editor">
                    <div className="line-numbers">
                      {Array.from({ length: 35 }, (_, i) => (
                        <div key={i} className="line-number">{i + 1}</div>
                      ))}
                    </div>
                    <div className="code-content">
                      <div className="code-line comment">// About Oussama - Developer Information</div>
                      <div className="code-line">const developer = {'{'}</div>
                      <div className="code-block">
                        <div className="code-line"><span className="property">name:</span> <span className="string">"Oussama Bassor"</span>,</div>
                        <div className="code-line"><span className="property">nickname:</span> <span className="string">"Thorfinn"</span>,</div>
                        <div className="code-line"><span className="property">title:</span> <span className="string">"Full Stack Web Developer"</span>,</div>
                        <div className="code-line"><span className="property">education:</span> {'{'}</div>
                        <div className="code-block">
                          <div className="code-line"><span className="property">institution:</span> <span className="string">"OFPPT"</span>,</div>
                          <div className="code-line"><span className="property">program:</span> <span className="string">"Full-Stack Web Development"</span>,</div>
                          <div className="code-line"><span className="property">status:</span> <span className="string">"Currently studying"</span></div>
                        </div>
                        <div className="code-line">{'},'},</div>
                        <div className="code-line"><span className="property">skills:</span> {'{'}</div>
                        <div className="code-block">
                          <div className="code-line"><span className="property">frontend:</span> [<span className="string">"React.js"</span>, <span className="string">"Tailwind CSS"</span>, <span className="string">"HTML5"</span>, <span className="string">"CSS3"</span>],</div>
                          <div className="code-line"><span className="property">backend:</span> [<span className="string">"Laravel"</span>, <span className="string">"Express.js"</span>, <span className="string">"MySQL"</span>],</div>
                          <div className="code-line"><span className="property">tools:</span> [<span className="string">"Docker"</span>, <span className="string">"Git"</span>, <span className="string">"Firebase"</span>]</div>
                        </div>
                        <div className="code-line">{'}'}</div>
                      </div>
                      <div className="code-line">{'};'}</div>
                      <div className="code-line"></div>
                      <div className="code-line comment">// Function to contact me</div>
                      <div className="code-line"><span className="keyword">function</span> <span className="function">contactOussama</span>() {'{'}</div>
                      <div className="code-block">
                        <div className="code-line">console.<span className="method">log</span>(<span className="string">"Send me an email at: "</span> + developer.contact.email);</div>
                        <div className="code-line"><span className="keyword">return</span> <span className="string">"Let's collaborate on something amazing!"</span>;</div>
                      </div>
                      <div className="code-line">{'}'}</div>
                      <div className="code-line"></div>
                      <div className="code-line comment">// Ready to work together?</div>
                      <div className="code-line">contactOussama();</div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          {/* Editor Status Bar */}
          <div className="status-bar">
            <div className="status-item">Ln 42, Col 18</div>
            <div className="status-item">Spaces: 2</div>
            <div className="status-item">UTF-8</div>
            <div className="status-item">JavaScript React</div>
            <div className="status-item branch">main</div>
          </div>
        </div>
      </div>
      
      {/* Close button for mobile */}
      <button onClick={closeModule} className="mobile-close-btn">
        <FaTimes />
      </button>
    </motion.section>
  );
};

export default About;