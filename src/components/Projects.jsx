import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaGithub, FaExternalLinkAlt, FaReact, FaLaravel, FaNodeJs, FaJs, FaCss3 } from 'react-icons/fa';
import './Projects.css';

const Projects = ({ closeModule }) => {
  const [filter, setFilter] = useState('all');
  const [activeProject, setActiveProject] = useState(null);

  // Projects data
  const projects = [
    {
      id: 1,
      title: "PayTrack",
      description: "A modern salary management application designed to help businesses track employee payments, generate reports, and manage payroll efficiently.",
      longDescription: "PayTrack is a comprehensive salary management tool designed to streamline payroll processes for small to medium-sized businesses. The application features an intuitive dashboard that provides real-time financial insights, automated tax calculations, and advanced reporting tools. With role-based access control, data encryption, and audit logs, PayTrack ensures sensitive financial data remains secure while simplifying complex payroll operations.",
      category: ["web", "app"],
      image: "https://via.placeholder.com/800x500?text=PayTrack+Preview",
      technologies: ["React", "Laravel", "MySQL", "Tailwind CSS"],
      techIcons: [<FaReact />, <FaLaravel />, <FaJs />],
      liveLink: "https://paytrack.example.com",
      repoLink: "https://github.com/username/paytrack",
      featured: true
    },
    {
      id: 2,
      title: "Eldoria Games",
      description: "A fantasy RPG-style online game store with immersive UI, user accounts, shopping cart, and payment processing.",
      longDescription: "Eldoria Games transforms online game shopping into an immersive experience with a fantasy RPG-inspired interface. The platform features animated product listings, interactive category navigation, and personalized user accounts that track game preferences. The shopping system includes wishlists, gift options, and a streamlined checkout process with multiple payment methods. A review system with gameplay videos helps users make informed purchases.",
      category: ["web", "ecommerce"],
      image: "https://via.placeholder.com/800x500?text=Eldoria+Games+Preview",
      technologies: ["Next.js", "Node.js", "MongoDB", "Firebase Auth"],
      techIcons: [<FaReact />, <FaNodeJs />, <FaJs />],
      liveLink: "https://eldoria-games.example.com",
      repoLink: "https://github.com/username/eldoria-games",
      featured: true
    },
    {
      id: 3,
      title: "Real Estate Booking System",
      description: "A property booking platform for vacation homes and bungalows with search filters, booking management, and payment processing.",
      longDescription: "This Real Estate Booking System offers a seamless experience for property owners and vacationers. The platform features advanced search filters, virtual property tours, and an intelligent recommendation engine based on user preferences. For property owners, it provides booking management tools, performance analytics, and automated messaging systems. The integrated payment system handles security deposits, staged payments, and refund processing while maintaining security and compliance.",
      category: ["web", "app"],
      image: "https://via.placeholder.com/800x500?text=Real+Estate+Booking+Preview",
      technologies: ["React", "Express.js", "MySQL", "Stripe API"],
      techIcons: [<FaReact />, <FaNodeJs />, <FaJs />],
      liveLink: "https://realestate-booking.example.com",
      repoLink: "https://github.com/username/realestate-booking",
      featured: false
    },
    {
      id: 4,
      title: "Portfolio Website",
      description: "My personal portfolio website showcasing my projects, skills, and professional journey as a web developer.",
      longDescription: "This portfolio website serves as a professional showcase of my work and capabilities as a web developer. Built with modern technologies and featuring smooth animations, it presents my projects in an engaging, interactive format. The site includes sections for my technical skills, project portfolio, about information, and contact details. Special attention was given to performance optimization, accessibility, and responsive design to ensure a seamless experience across all devices.",
      category: ["web", "ui"],
      image: "https://via.placeholder.com/800x500?text=Portfolio+Website+Preview",
      technologies: ["React", "Framer Motion", "Tailwind CSS", "Vite"],
      techIcons: [<FaReact />, <FaCss3 />, <FaJs />],
      liveLink: "#",
      repoLink: "https://github.com/username/portfolio-website",
      featured: false
    }
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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

  // Filter projects
  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(project => project.category.includes(filter));

  // Handle project click
  const handleProjectClick = (project) => {
    setActiveProject(project);
  };

  return (
    <motion.section
      className="projects-module"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="module-header">
        <motion.h2 variants={itemVariants} className="module-title">My Projects</motion.h2>
        <button onClick={closeModule} className="close-module-btn">
          <FaTimes />
        </button>
      </div>

      <div className="module-content-area">
        <motion.div variants={itemVariants} className="projects-intro">
          <h3>My Recent Work</h3>
          <p>
            Here's a selection of my recent projects. Each one presented unique challenges and opportunities to learn and grow as a developer.
          </p>
        </motion.div>

        <motion.div variants={itemVariants} className="project-filters">
          <button 
            className={`filter-btn ${filter === 'all' ? 'active' : ''}`} 
            onClick={() => setFilter('all')}
          >
            All
          </button>
          <button 
            className={`filter-btn ${filter === 'web' ? 'active' : ''}`} 
            onClick={() => setFilter('web')}
          >
            Web
          </button>
          <button 
            className={`filter-btn ${filter === 'app' ? 'active' : ''}`} 
            onClick={() => setFilter('app')}
          >
            Apps
          </button>
          <button 
            className={`filter-btn ${filter === 'ui' ? 'active' : ''}`} 
            onClick={() => setFilter('ui')}
          >
            UI/UX
          </button>
          <button 
            className={`filter-btn ${filter === 'ecommerce' ? 'active' : ''}`} 
            onClick={() => setFilter('ecommerce')}
          >
            E-commerce
          </button>
        </motion.div>

        <div className="projects-grid">
          {filteredProjects.map((project) => (
            <motion.div
              key={project.id}
              className="project-card"
              variants={itemVariants}
              whileHover={{ y: -10 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
              onClick={() => handleProjectClick(project)}
            >
              <div className="project-image-container">
                <img src={project.image} alt={project.title} className="project-image" />
                {project.featured && <span className="featured-badge">Featured</span>}
              </div>
              <div className="project-info">
                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">{project.description}</p>
                <div className="project-tech">
                  {project.techIcons.map((icon, index) => (
                    <span key={index} className="tech-icon">{icon}</span>
                  ))}
                </div>
                <button className="project-view-btn">View Project</button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Project Modal */}
      <AnimatePresence>
        {activeProject && (
          <motion.div 
            className="project-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveProject(null)}
          >
            <motion.div 
              className="project-modal"
              initial={{ y: '100vh' }}
              animate={{ y: 0 }}
              exit={{ y: '100vh' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                className="modal-close-btn"
                onClick={() => setActiveProject(null)}
              >
                <FaTimes />
              </button>
              
              <div className="modal-image">
                <img src={activeProject.image} alt={activeProject.title} />
              </div>
              
              <div className="modal-content">
                <h2 className="modal-title">{activeProject.title}</h2>
                
                <p className="modal-description">{activeProject.longDescription}</p>
                
                <div className="modal-tech-stack">
                  <h3>Technologies Used</h3>
                  <div className="tech-tags">
                    {activeProject.technologies.map((tech, index) => (
                      <span key={index} className="tech-tag">{tech}</span>
                    ))}
                  </div>
                </div>
                
                <div className="modal-links">
                  <a href={activeProject.liveLink} target="_blank" rel="noopener noreferrer" className="modal-link live-link">
                    <FaExternalLinkAlt /> View Live
                  </a>
                  <a href={activeProject.repoLink} target="_blank" rel="noopener noreferrer" className="modal-link repo-link">
                    <FaGithub /> View Code
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
};

export default Projects;