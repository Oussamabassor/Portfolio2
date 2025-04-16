import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Projects.css';
import { FaTimes } from 'react-icons/fa';

const Projects = ({ closeModule }) => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [focusedCardIndex, setFocusedCardIndex] = useState(-1);
  const projects = [
    {
      id: 1,
      title: 'E-commerce Platform', // Slightly updated title
      category: 'web',
      image: 'https://via.placeholder.com/400x300/1e2127/61dafb?text=Project+1', // Themed placeholder
      description: 'A fully responsive e-commerce platform with product filtering and cart functionality.',
      technologies: ['React', 'Node.js', 'MongoDB', 'CSS Modules'], // Added one more tech
      link: '#'
    },
    {
      id: 2,
      title: 'Secure Mobile Banking', // Slightly updated title
      category: 'app',
      image: 'https://via.placeholder.com/400x300/1e2127/98c379?text=Project+2', // Themed placeholder
      description: 'A mobile banking application with secure authentication and transaction features.',
      technologies: ['React Native', 'Firebase', 'Biometrics'], // Added one more tech
      link: '#'
    },
    {
      id: 3,
      title: 'Photographer Portfolio UI', // Slightly updated title
      category: 'design',
      image: 'https://via.placeholder.com/400x300/1e2127/c678dd?text=Project+3', // Themed placeholder
      description: 'A sleek portfolio design concept for photographers showcasing their work visually.',
      technologies: ['Figma', 'Adobe XD', 'Prototyping'], // Added one more tech
      link: '#'
    },
    // ... Add other projects similarly
  ];

  const filteredProjects = activeFilter === 'all'
    ? projects
    : projects.filter(project => project.category === activeFilter);

  // Variants for staggering children (cards)
  const gridVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1, // Stagger animation for cards
      },
    },
  };

  // Variants for individual cards
  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: 'spring', stiffness: 100, damping: 12 },
    },
    exit: { // Add exit animation for filtering
        opacity: 0,
        y: -20,
        scale: 0.95,
        transition: { duration: 0.2 }
    },
    hover: {
      y: -5,
      scale: 1.02,
      boxShadow: "0 8px 20px rgba(0, 0, 0, 0.3), 0 0 15px var(--accent-primary) / 50%",
      transition: { duration: 0.2 }
    },
    focus: {
      y: -5,
      scale: 1.02,
      boxShadow: "0 0 0 3px var(--accent-secondary)",
      transition: { duration: 0.2 }
    }
  };

  // Variants for filter tabs container
  const tabsVariants = {
      hidden: { opacity: 0 },
      visible: { opacity: 1, transition: { duration: 0.4 } }
  }

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!filteredProjects.length) return;
      
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        setFocusedCardIndex(prev => 
          prev < filteredProjects.length - 1 ? prev + 1 : 0
        );
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        setFocusedCardIndex(prev => 
          prev > 0 ? prev - 1 : filteredProjects.length - 1
        );
      } else if (e.key === 'Enter' && focusedCardIndex !== -1) {
        window.open(filteredProjects[focusedCardIndex].link, '_blank');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [filteredProjects, focusedCardIndex]);

  return (
    <section id="projects" className="projects-module">
      {/* NEW: Module Header */}
      <div className="module-header">
        <motion.h2
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }} // Slight delay
          className="module-title"
        >
          Project Showcase
        </motion.h2>
        {/* Close button moved inside header */}
        <button onClick={closeModule} className="close-module-btn">
          <FaTimes />
        </button>
      </div>

      {/* NEW: Content Wrapper for padding and scroll */}
      <div className="module-content-area">
        {/* Animate Filter Tabs */}
        <motion.div
          className="filter-tabs"
          variants={tabsVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Buttons remain interactive */}
          <button className={`filter-tab ${activeFilter === 'all' ? 'active' : ''}`} onClick={() => setActiveFilter('all')}>All</button>
          <button className={`filter-tab ${activeFilter === 'web' ? 'active' : ''}`} onClick={() => setActiveFilter('web')}>Web Apps</button>
          <button className={`filter-tab ${activeFilter === 'app' ? 'active' : ''}`} onClick={() => setActiveFilter('app')}>Mobile Apps</button>
          <button className={`filter-tab ${activeFilter === 'design' ? 'active' : ''}`} onClick={() => setActiveFilter('design')}>UI/UX Design</button>
        </motion.div>

        {/* Animate Projects Grid */}
        <motion.div
          className="projects-grid"
          variants={gridVariants}
          initial="hidden"
          animate="visible"
          key={activeFilter} // Change key on filter change to re-trigger stagger
        >
          <AnimatePresence mode="sync"> {/* Use sync or wait */}
            {filteredProjects.map((project, index) => (
              // Animate each card
              <motion.div
                className={`project-card ${focusedCardIndex === index ? 'focused' : ''}`}
                key={project.id} // Use unique project ID as key
                variants={cardVariants}
                initial="hidden" // Apply initial here if key changes trigger full re-render
                animate={focusedCardIndex === index ? "focus" : "visible"}
                exit="exit" // Apply exit animation
                layout // Add layout prop for smooth filtering re-arrangement
                whileHover="hover" // Add hover variant trigger
                tabIndex={0}
                onFocus={() => setFocusedCardIndex(index)}
                onBlur={() => setFocusedCardIndex(-1)}
              >
                <div className="project-img-container">
                  <img src={project.image} alt={project.title} className="project-img" />
                  <div className="project-overlay">
                     <a href={project.link} target="_blank" rel="noopener noreferrer" className="view-project-link">
                       View Project
                     </a>
                  </div>
                </div>
                <div className="project-info">
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <div className="project-tech">
                    {project.technologies.map((tech, index) => (
                      <span key={index} className="tech-badge">{tech}</span>
                    ))}
                  </div>
                </div>
                <div className="keyboard-hint" aria-hidden="true">
                  Press Enter to view
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div> {/* End Content Wrapper */}
    </section>
  );
};

export default Projects;