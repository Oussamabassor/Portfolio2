import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Projects.css';
import { 
  FaTimes, FaGithub, FaExternalLinkAlt, FaReact, FaLaravel, 
  FaNodeJs, FaJs, FaCss3, FaRegFolderOpen, FaRegFolder, 
  FaLinkedin, FaCode, FaDatabase, FaArrowLeft
} from 'react-icons/fa';

const Projects = ({ closeModule }) => {
  const [activeTab, setActiveTab] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);
  
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

  // Projects data
  const projects = [
    {
      id: 1,
      title: "PayTrack",
      subtitle: "Salary Management Platform",
      description: "A modern salary management application designed to help businesses track employee payments, generate reports, and manage payroll efficiently.",
      longDescription: "PayTrack is a comprehensive salary management tool designed to streamline payroll processes for small to medium-sized businesses. The application features an intuitive dashboard that provides real-time financial insights, automated tax calculations, and advanced reporting tools. With role-based access control, data encryption, and audit logs, PayTrack ensures sensitive financial data remains secure while simplifying complex payroll operations.",
      category: ["web", "app"],
      image: "https://via.placeholder.com/800x500?text=PayTrack+Preview",
      technologies: ["React", "Laravel", "MySQL", "Tailwind CSS"],
      techIcons: [<FaReact />, <FaLaravel />, <FaDatabase />],
      features: [
        "Intuitive dashboard with financial insights",
        "Automated payroll processing",
        "Advanced reporting and analytics",
        "Employee self-service portal",
        "Tax calculation automation"
      ],
      challenges: "Implementing a secure authentication system with role-based permissions while maintaining an intuitive user interface.",
      solutions: "Used Laravel Sanctum for API authentication combined with React Context API for state management, resulting in a secure and responsive application.",
      liveLink: "https://paytrack.example.com",
      repoLink: "https://github.com/username/paytrack",
      featured: true
    },
    {
      id: 2,
      title: "Eldoria Games",
      subtitle: "Fantasy Game Store",
      description: "A fantasy RPG-style online game store with immersive UI, user accounts, shopping cart, and payment processing.",
      longDescription: "Eldoria Games transforms online game shopping into an immersive experience with a fantasy RPG-inspired interface. The platform features animated product listings, interactive category navigation, and personalized user accounts that track game preferences. The shopping system includes wishlists, gift options, and a streamlined checkout process with multiple payment methods. A review system with gameplay videos helps users make informed purchases.",
      category: ["web", "ecommerce"],
      image: "https://via.placeholder.com/800x500?text=Eldoria+Games+Preview",
      technologies: ["Next.js", "Node.js", "MongoDB", "Firebase Auth"],
      techIcons: [<FaReact />, <FaNodeJs />, <FaJs />],
      features: [
        "Fantasy RPG-inspired UI design",
        "User authentication system",
        "Interactive product catalog",
        "Shopping cart and wishlist functionality",
        "Secure payment integration"
      ],
      challenges: "Creating an immersive fantasy theme while maintaining usability and fast performance across all devices.",
      solutions: "Implemented lazy loading, code splitting, and optimized assets to ensure the visually rich interface maintains performance. Used Next.js for server-side rendering critical content.",
      liveLink: "https://eldoria-games.example.com",
      repoLink: "https://github.com/username/eldoria-games",
      featured: true
    },
    {
      id: 3,
      title: "Real Estate Booking",
      subtitle: "Property Reservation System",
      description: "A property booking platform for vacation homes and bungalows with search filters, booking management, and payment processing.",
      longDescription: "This Real Estate Booking System offers a seamless experience for property owners and vacationers. The platform features advanced search filters, virtual property tours, and an intelligent recommendation engine based on user preferences. For property owners, it provides booking management tools, performance analytics, and automated messaging systems. The integrated payment system handles security deposits, staged payments, and refund processing while maintaining security and compliance.",
      category: ["web", "app"],
      image: "https://via.placeholder.com/800x500?text=Real+Estate+Booking+Preview",
      technologies: ["React", "Express.js", "MySQL", "Stripe API"],
      techIcons: [<FaReact />, <FaNodeJs />, <FaDatabase />],
      features: [
        "Advanced property search filters",
        "Interactive maps integration",
        "Booking management system",
        "Secure payment processing",
        "Owner and guest portals"
      ],
      challenges: "Developing a reliable booking system that prevents double bookings while handling complex calendar logic and timezone differences.",
      solutions: "Created a custom calendar management system with server validation and implemented real-time availability updates using WebSockets for instantaneous feedback.",
      liveLink: "https://realestate-booking.example.com",
      repoLink: "https://github.com/username/realestate-booking",
      featured: false
    }
  ];

  // Filter projects based on active tab
  const filteredProjects = activeTab === 'all' 
    ? projects 
    : projects.filter(project => project.category.includes(activeTab));
  
  return (
    <motion.section
      id="projects"
      className="projects-module"
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
                  <FaRegFolderOpen /> PROJECTS
                </div>
                <div className="file-list">
                  <div className={`file ${activeTab === 'all' ? 'active' : ''}`} 
                       onClick={() => setActiveTab('all')}>
                    <FaCode className="file-icon" /> AllProjects.jsx
                  </div>
                  <div className={`file ${activeTab === 'web' ? 'active' : ''}`} 
                       onClick={() => setActiveTab('web')}>
                    <FaReact className="file-icon" /> WebProjects.jsx
                  </div>
                  <div className={`file ${activeTab === 'app' ? 'active' : ''}`} 
                       onClick={() => setActiveTab('app')}>
                    <FaNodeJs className="file-icon" /> AppProjects.jsx
                  </div>
                  <div className={`file ${activeTab === 'ecommerce' ? 'active' : ''}`} 
                       onClick={() => setActiveTab('ecommerce')}>
                    <FaDatabase className="file-icon" /> EcommerceProjects.jsx
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
            <div className={`editor-tab ${activeTab === 'all' && !selectedProject ? 'active' : ''}`} 
                 onClick={() => {setActiveTab('all'); setSelectedProject(null);}}>
              <FaCode className="tab-icon" /> AllProjects.jsx
            </div>
            {activeTab !== 'all' && !selectedProject && (
              <div className="editor-tab active">
                <FaReact className="tab-icon" /> {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}Projects.jsx
                <span className="close-tab" onClick={() => setActiveTab('all')}>×</span>
              </div>
            )}
            {selectedProject && (
              <div className="editor-tab active">
                <FaCode className="tab-icon" /> {selectedProject.title.replace(/\s+/g, '')}.jsx
                <span className="close-tab" onClick={() => setSelectedProject(null)}>×</span>
              </div>
            )}
          </div>
          
          {/* Tab Content */}
          <div className="editor-content">
            <AnimatePresence mode="wait">
              {!selectedProject ? (
                <motion.div 
                  key={activeTab}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="tab-content projects-content"
                >
                  <div className="project-filters">
                    <div className={`filter-button ${activeTab === 'all' ? 'active' : ''}`} 
                         onClick={() => setActiveTab('all')}>
                      All Projects
                    </div>
                    <div className={`filter-button ${activeTab === 'web' ? 'active' : ''}`}
                         onClick={() => setActiveTab('web')}>
                      Web
                    </div>
                    <div className={`filter-button ${activeTab === 'app' ? 'active' : ''}`}
                         onClick={() => setActiveTab('app')}>
                      Applications
                    </div>
                    <div className={`filter-button ${activeTab === 'ecommerce' ? 'active' : ''}`}
                         onClick={() => setActiveTab('ecommerce')}>
                      E-Commerce
                    </div>
                  </div>

                  <div className="projects-grid">
                    {filteredProjects.map(project => (
                      <motion.div 
                        key={project.id}
                        className={`project-card ${project.featured ? 'featured' : ''}`}
                        variants={itemVariants}
                        whileHover={{ 
                          y: -5,
                          boxShadow: "0 8px 20px rgba(0, 0, 0, 0.2)"
                        }}
                        onClick={() => setSelectedProject(project)}
                      >
                        <div className="project-image">
                          <img src={project.image} alt={project.title} />
                          {project.featured && (
                            <div className="featured-badge">Featured</div>
                          )}
                        </div>
                        <div className="project-info">
                          <div className="project-header">
                            <h3>{project.title}</h3>
                            <div className="project-subtitle">{project.subtitle}</div>
                          </div>
                          <p className="project-desc">{project.description}</p>
                          <div className="project-tech-stack">
                            {project.techIcons.map((icon, idx) => (
                              <span key={idx} className="tech-icon">{icon}</span>
                            ))}
                          </div>
                          <div className="project-footer">
                            <button className="view-details-btn">
                              View Details
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ) : (
                <motion.div 
                  key="project-detail"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="tab-content project-detail-content"
                >
                  <button className="back-button" onClick={() => setSelectedProject(null)}>
                    <FaArrowLeft /> Back to Projects
                  </button>
                  
                  <div className="project-detail">
                    <div className="project-detail-header">
                      <div className="project-detail-image">
                        <img src={selectedProject.image} alt={selectedProject.title} />
                        <div className="image-overlay"></div>
                      </div>
                      <div className="project-detail-title-area">
                        <h1>{selectedProject.title}</h1>
                        <div className="project-detail-subtitle">{selectedProject.subtitle}</div>
                        <div className="project-links">
                          <a href={selectedProject.liveLink} target="_blank" rel="noopener noreferrer" className="project-link live">
                            <FaExternalLinkAlt /> Live Preview
                          </a>
                          <a href={selectedProject.repoLink} target="_blank" rel="noopener noreferrer" className="project-link repo">
                            <FaGithub /> View Code
                          </a>
                        </div>
                      </div>
                    </div>
                    
                    <div className="project-detail-body">
                      <div className="detail-section overview">
                        <h2>Overview</h2>
                        <p>{selectedProject.longDescription}</p>
                      </div>
                      
                      <div className="detail-section techs">
                        <h2>Technologies</h2>
                        <div className="tech-tags">
                          {selectedProject.technologies.map((tech, idx) => (
                            <span key={idx} className="tech-tag">{tech}</span>
                          ))}
                        </div>
                      </div>
                      
                      <div className="detail-columns">
                        <div className="detail-section features">
                          <h2>Key Features</h2>
                          <ul className="feature-list">
                            {selectedProject.features.map((feature, idx) => (
                              <li key={idx}>{feature}</li>
                            ))}
                          </ul>
                        </div>
                        
                        <div className="detail-section challenges">
                          <h2>Challenges & Solutions</h2>
                          <div className="challenge-block">
                            <h3>The Challenge</h3>
                            <p>{selectedProject.challenges}</p>
                          </div>
                          <div className="solution-block">
                            <h3>My Solution</h3>
                            <p>{selectedProject.solutions}</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="detail-section code-preview">
                        <h2>Code Snippet</h2>
                        <div className="code-block">
                          <div className="code-header">
                            <span>App.jsx</span>
                          </div>
                          <pre className="code-content">
                            <code>
{`import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Auth from './components/Auth';
import { AuthProvider } from './contexts/AuthContext';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Auth />} />
          <Route path="/dashboard/*" element={<Dashboard />} />
          <Route path="*" element={<Navigate to="/dashboard" />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}`}
                            </code>
                          </pre>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          {/* Editor Status Bar */}
          <div className="status-bar">
            <div className="status-item">Portfolio</div>
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

export default Projects;