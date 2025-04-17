import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Projects.css';
import { 
  FaTimes, FaGithub, FaExternalLinkAlt, FaReact, FaLaravel, 
  FaNodeJs, FaJs, FaCss3, FaRegFolderOpen, FaRegFolder, 
  FaLinkedin, FaCode, FaDatabase
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
            <div className={`editor-tab ${activeTab === 'all' ? 'active' : ''}`} 
                 onClick={() => setActiveTab('all')}>
              <FaCode className="tab-icon" /> AllProjects.jsx
              {activeTab === 'all' && <span className="close-tab">×</span>}
            </div>
            {activeTab !== 'all' && (
              <div className="editor-tab active">
                <FaReact className="tab-icon" /> {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}Projects.jsx
                <span className="close-tab">×</span>
              </div>
            )}
            {selectedProject && (
              <div className="editor-tab active">
                <FaCode className="tab-icon" /> {selectedProject.title}.jsx
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
                  <div className="projects-header">
                    <h2>My Projects</h2>
                    <p>Interactive applications and websites I've developed</p>
                  </div>
                  
                  <div className="projects-grid">
                    {filteredProjects.map(project => (
                      <motion.div 
                        key={project.id}
                        className={`project-card ${project.featured ? 'featured' : ''}`}
                        variants={itemVariants}
                        whileHover={{ y: -5, boxShadow: "0 10px 25px rgba(0,0,0,0.2)" }}
                        onClick={() => setSelectedProject(project)}
                      >
                        <div className="project-image">
                          <img src={project.image} alt={project.title} />
                          {project.featured && <div className="featured-tag">Featured</div>}
                        </div>
                        <div className="project-content">
                          <h3>{project.title}</h3>
                          <p className="project-subtitle">{project.subtitle}</p>
                          <div className="project-description">{project.description}</div>
                          <div className="project-tech">
                            {project.techIcons.map((icon, i) => (
                              <span key={i} className="tech-icon">{icon}</span>
                            ))}
                          </div>
                          <button className="view-project-btn">View Details</button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ) : (
                <motion.div 
                  key={selectedProject.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="tab-content project-detail-content"
                >
                  <div className="project-detail-header">
                    <button 
                      className="back-button"
                      onClick={() => setSelectedProject(null)}
                    >
                      ← Back to Projects
                    </button>
                  </div>
                  
                  <div className="project-hero">
                    <img src={selectedProject.image} alt={selectedProject.title} className="project-hero-image" />
                    <div className="project-hero-overlay">
                      <h1>{selectedProject.title}</h1>
                      <p>{selectedProject.subtitle}</p>
                    </div>
                  </div>
                  
                  <div className="project-detail-content">
                    <div className="project-section">
                      <h2>Overview</h2>
                      <p>{selectedProject.longDescription}</p>
                    </div>
                    
                    <div className="project-section technologies">
                      <h2>Technologies Used</h2>
                      <div className="tech-tags">
                        {selectedProject.technologies.map((tech, i) => (
                          <span key={i} className="tech-tag">{tech}</span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="project-columns">
                      <div className="project-section features">
                        <h2>Key Features</h2>
                        <ul className="feature-list">
                          {selectedProject.features.map((feature, i) => (
                            <li key={i}>{feature}</li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="project-section challenges">
                        <h2>Challenges & Solutions</h2>
                        <div className="challenge">
                          <h3>Challenge:</h3>
                          <p>{selectedProject.challenges}</p>
                        </div>
                        <div className="solution">
                          <h3>Solution:</h3>
                          <p>{selectedProject.solutions}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="project-links">
                      <a href={selectedProject.liveLink} target="_blank" rel="noopener noreferrer" className="project-link live">
                        <FaExternalLinkAlt /> Live Demo
                      </a>
                      <a href={selectedProject.repoLink} target="_blank" rel="noopener noreferrer" className="project-link repo">
                        <FaGithub /> View Code
                      </a>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          {/* Editor Status Bar */}
          <div className="status-bar">
            <div className="status-item">Projects</div>
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