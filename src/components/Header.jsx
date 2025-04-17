import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './Header.css';
import { FaTimes, FaBars } from 'react-icons/fa';

const Header = ({ setActiveModule }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  // Add scroll detection
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleNavClick = (moduleName) => {
    // Ensure module activation works correctly
    console.log(`Activating module: ${moduleName}`);
    setActiveModule(moduleName);
    setIsOpen(false);
  };

  // Enhanced animation variants
  const navItemVariants = {
    initial: { opacity: 0.7, y: 0 },
    hover: { 
      opacity: 1, 
      y: -3,
      color: 'var(--accent-primary)',
      transition: { 
        duration: 0.2,
        ease: 'easeOut'
      }
    },
    tap: { 
      scale: 0.95,
      transition: { duration: 0.1 }
    }
  };
  
  const logoVariants = {
    initial: { opacity: 1 },
    hover: { 
      scale: 1.05, 
      color: 'var(--accent-secondary)',
      textShadow: '0 0 8px rgba(198, 120, 221, 0.5)',
      transition: { 
        duration: 0.3,
        ease: 'easeOut'
      }
    },
    tap: { 
      scale: 0.98,
      transition: { duration: 0.1 }
    }
  };

  return (
    <motion.header className="header">
      <div className="container header-content">
        <motion.div
          className="logo"
          initial="initial"
          whileHover="hover"
          whileTap="tap"
          variants={logoVariants}
        >
          <button onClick={() => handleNavClick(null)} className="logo-button">
            Oussama<span className="logo-dot">.</span>
          </button>
        </motion.div>
        
        <div className={`mobile-menu ${isOpen ? 'active' : ''}`} onClick={toggleMenu}>
          {isOpen ? <FaTimes /> : <FaBars />}
        </div>
        
        <nav className={`nav ${isOpen ? 'active' : ''}`}>
          <ul>
            <motion.li>
              <button 
                onClick={() => handleNavClick('about')} 
                className="nav-link"
              >
                <span className="nav-text">About</span>
              </button>
            </motion.li>
            
            <motion.li>
              <button 
                onClick={() => handleNavClick('skills')} 
                className="nav-link"
              >
                <span className="nav-text">Skills</span>
              </button>
            </motion.li>
            
            <motion.li>
              <button 
                onClick={() => handleNavClick('projects')} 
                className="nav-link"
              >
                <span className="nav-text">Projects</span>
              </button>
            </motion.li>
            
            <motion.li>
              <button 
                onClick={() => handleNavClick('contact')} 
                className="nav-link"
              >
                <span className="nav-text">Contact</span>
              </button>
            </motion.li>
          </ul>
        </nav>
      </div>
    </motion.header>
  );
};

export default Header;