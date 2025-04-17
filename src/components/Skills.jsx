import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Skills.css';
import { 
  FaTimes, FaReact, FaLaravel, FaNodeJs, FaDatabase, 
  FaTools, FaCode, FaPalette, FaServer, FaSearch,
  FaMobile, FaBrain, FaRegFolderOpen, FaRegFolder,
  FaGithub, FaLinkedin
} from 'react-icons/fa';

const Skills = ({ closeModule }) => {
  const [activeTab, setActiveTab] = useState('frontend');
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
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

  // Skill categories
  const skillCategories = [
    {
      id: 'frontend',
      title: "Frontend Development",
      icon: <FaReact className="category-icon" />,
      skills: [
        { name: "React.js", level: 90 },
        { name: "JavaScript ES6+", level: 85 },
        { name: "HTML5", level: 95 },
        { name: "CSS3", level: 90 },
        { name: "Tailwind CSS", level: 85 },
        { name: "Framer Motion", level: 80 },
        { name: "Responsive Design", level: 90 },
      ],
    },
    {
      id: 'backend',
      title: "Backend Development",
      icon: <FaServer className="category-icon" />,
      skills: [
        { name: "Laravel", level: 85 },
        { name: "Express.js", level: 75 },
        { name: "RESTful APIs", level: 80 },
        { name: "Node.js", level: 70 },
        { name: "PHP", level: 75 },
      ],
    },
    {
      id: 'database',
      title: "Database",
      icon: <FaDatabase className="category-icon" />,
      skills: [
        { name: "MySQL", level: 85 },
        { name: "MongoDB", level: 70 },
        { name: "Firebase", level: 75 },
        { name: "SQL", level: 80 },
      ],
    },
    {
      id: 'tools',
      title: "Tools & Deployment",
      icon: <FaTools className="category-icon" />,
      skills: [
        { name: "Git & GitHub", level: 85 },
        { name: "Docker", level: 65 },
        { name: "Webpack", level: 70 },
        { name: "npm/yarn", level: 85 },
        { name: "VS Code", level: 90 },
      ],
    },
    {
      id: 'design',
      title: "UI/UX Design",
      icon: <FaPalette className="category-icon" />,
      skills: [
        { name: "Figma", level: 75 },
        { name: "Adobe XD", level: 70 },
        { name: "Wireframing", level: 80 },
        { name: "User Research", level: 75 },
        { name: "Color Theory", level: 75 },
      ],
    }
  ];

  return (
    <motion.section
      id="skills"
      className="skills-module"
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
                  <FaRegFolderOpen /> SKILLS
                </div>
                <div className="file-list">
                  <div className={`file ${activeTab === 'frontend' ? 'active' : ''}`} 
                       onClick={() => setActiveTab('frontend')}>
                    <FaReact className="file-icon" /> Frontend.jsx
                  </div>
                  <div className={`file ${activeTab === 'backend' ? 'active' : ''}`} 
                       onClick={() => setActiveTab('backend')}>
                    <FaServer className="file-icon" /> Backend.jsx
                  </div>
                  <div className={`file ${activeTab === 'database' ? 'active' : ''}`} 
                       onClick={() => setActiveTab('database')}>
                    <FaDatabase className="file-icon" /> Database.jsx
                  </div>
                  <div className={`file ${activeTab === 'tools' ? 'active' : ''}`} 
                       onClick={() => setActiveTab('tools')}>
                    <FaTools className="file-icon" /> Tools.jsx
                  </div>
                  <div className={`file ${activeTab === 'design' ? 'active' : ''}`} 
                       onClick={() => setActiveTab('design')}>
                    <FaPalette className="file-icon" /> Design.jsx
                  </div>
                  <div className={`file ${activeTab === 'all' ? 'active' : ''}`} 
                       onClick={() => setActiveTab('all')}>
                    <FaCode className="file-icon" /> AllSkills.jsx
                  </div>
                </div>
              </div>
              
              <div className="folder">
                <div className="folder-name">
                  <FaRegFolder /> ABOUT
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
            <div className={`editor-tab ${activeTab === 'frontend' ? 'active' : ''}`} 
                 onClick={() => setActiveTab('frontend')}>
              <FaReact className="tab-icon" /> Frontend.jsx
              {activeTab === 'frontend' && <span className="close-tab">×</span>}
            </div>
            <div className={`editor-tab ${activeTab === 'backend' ? 'active' : ''}`} 
                 onClick={() => setActiveTab('backend')}>
              <FaServer className="tab-icon" /> Backend.jsx
              {activeTab === 'backend' && <span className="close-tab">×</span>}
            </div>
            <div className={`editor-tab ${activeTab === 'database' ? 'active' : ''}`} 
                 onClick={() => setActiveTab('database')}>
              <FaDatabase className="tab-icon" /> Database.jsx
              {activeTab === 'database' && <span className="close-tab">×</span>}
            </div>
            <div className={`editor-tab ${activeTab === 'all' ? 'active' : ''}`} 
                 onClick={() => setActiveTab('all')}>
              <FaCode className="tab-icon" /> AllSkills.jsx
              {activeTab === 'all' && <span className="close-tab">×</span>}
            </div>
          </div>
          
          {/* Tab Content */}
          <div className="editor-content">
            <AnimatePresence mode="wait">
              {(activeTab === 'frontend' || activeTab === 'backend' || activeTab === 'database' || 
                activeTab === 'tools' || activeTab === 'design') && (
                <motion.div 
                  key={activeTab}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="tab-content skill-category-content"
                >
                  {skillCategories
                    .filter(category => category.id === activeTab)
                    .map(category => (
                      <div key={category.id} className="skill-category-detail">
                        <div className="skill-category-header">
                          <div className="category-icon-large">{category.icon}</div>
                          <h2 className="category-title">{category.title}</h2>
                        </div>
                        
                        <div className="skill-category-description">
                          <p>Here are my skills and expertise level in {category.title.toLowerCase()}:</p>
                        </div>
                        
                        <div className="skills-list">
                          {category.skills.map((skill, idx) => (
                            <div key={idx} className="skill-item">
                              <div className="skill-info">
                                <span className="skill-name">{skill.name}</span>
                                <span className="skill-level">{skill.level}%</span>
                              </div>
                              <div className="skill-bar-container">
                                <motion.div 
                                  className="skill-bar"
                                  initial={{ width: 0 }}
                                  animate={{ width: `${skill.level}%` }}
                                  transition={{ delay: 0.2 + (idx * 0.1), duration: 1, ease: "easeOut" }}
                                >
                                  <div className="skill-bar-highlight"></div>
                                </motion.div>
                              </div>
                            </div>
                          ))}
                        </div>
                        
                        <div className="skill-category-footer">
                          <div className="skill-experience-info">
                            <h3>Related Experience</h3>
                            <ul className="experience-list">
                              <li>Built multiple projects using these technologies</li>
                              <li>Constantly learning and staying updated with latest trends</li>
                              <li>Solved complex problems using this tech stack</li>
                            </ul>
                          </div>
                          
                          <div className="skill-projects">
                            <h3>Projects Using These Skills</h3>
                            <div className="skill-project-tags">
                              <span className="project-tag">PayTrack</span>
                              <span className="project-tag">Eldoria Games</span>
                              <span className="project-tag">Real Estate Booking</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="terminal-snippet">
                          <div className="terminal-header">Terminal</div>
                          <div className="terminal-code">
                            <div className="code-line"><span className="prompt">$</span> analyze-skills --category="{category.title}"</div>
                            <div className="code-response">Running skill analysis for {category.title}...</div>
                            <div className="code-response">Found {category.skills.length} skills with an average proficiency of {Math.round(category.skills.reduce((sum, skill) => sum + skill.level, 0) / category.skills.length)}%</div>
                            <div className="code-response highlight">Ready to implement {category.title} in your next project!</div>
                          </div>
                        </div>
                      </div>
                    ))
                  }
                </motion.div>
              )}

              {activeTab === 'all' && (
                <motion.div 
                  key="all"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="tab-content all-skills-content"
                >
                  <div className="all-skills-header">
                    <h2>My Complete Skill Set</h2>
                    <p>Here's a comprehensive overview of my technical capabilities and expertise.</p>
                  </div>
                  
                  <div className="skills-grid">
                    {skillCategories.map(category => (
                      <motion.div 
                        key={category.id}
                        className="skill-category-card"
                        variants={itemVariants}
                        whileHover={{ scale: 1.02 }}
                      >
                        <div className="category-header">
                          {category.icon}
                          <h3>{category.title}</h3>
                        </div>
                        <div className="skills-list">
                          {category.skills.map((skill, idx) => (
                            <div key={idx} className="skill-item">
                              <div className="skill-info">
                                <span className="skill-name">{skill.name}</span>
                                <span className="skill-level">{skill.level}%</span>
                              </div>
                              <div className="skill-bar-container">
                                <motion.div 
                                  className="skill-bar"
                                  initial={{ width: 0 }}
                                  animate={{ width: `${skill.level}%` }}
                                  transition={{ delay: 0.2 + (idx * 0.1), duration: 1, ease: "easeOut" }}
                                >
                                  <div className="skill-bar-highlight"></div>
                                </motion.div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                  
                  <div className="soft-skills-section">
                    <h2>Soft Skills</h2>
                    <div className="soft-skills-grid">
                      <div className="soft-skill">
                        <div className="soft-skill-icon">
                          <FaSearch />
                        </div>
                        <h3>Problem Solving</h3>
                        <p>Analytical approach to debugging and developing solutions</p>
                      </div>
                      <div className="soft-skill">
                        <div className="soft-skill-icon">
                          <FaBrain />
                        </div>
                        <h3>Critical Thinking</h3>
                        <p>Evaluating situations from multiple perspectives</p>
                      </div>
                      <div className="soft-skill">
                        <div className="soft-skill-icon">
                          <FaMobile />
                        </div>
                        <h3>Adaptability</h3>
                        <p>Quick to learn new technologies and frameworks</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          {/* Editor Status Bar */}
          <div className="status-bar">
            <div className="status-item">Skills</div>
            <div className="status-item">Ln 42, Col 18</div>
            <div className="status-item">Spaces: 2</div>
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

export default Skills;