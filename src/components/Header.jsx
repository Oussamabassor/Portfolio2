import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './Header.css';
import { 
  FaTimes, 
  FaBars, 
  FaCode,
  FaFolder,
  FaSearch,
  FaGithub,
  FaCog,
  FaUserAlt,
  FaChevronDown
} from 'react-icons/fa';

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
    setActiveModule(moduleName);
    setIsOpen(false);
  };

  return (
    <motion.header 
      className={`header ${scrolled ? 'scrolled' : ''}`}
      initial={{ y: -70 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      {/* VSCode-style top bar */}
      <div className="vscode-header">
        {/* Left side - Logo and menu */}
        <div className="header-left">
          <div className="logo" onClick={() => handleNavClick(null)}>
            <span className="logo-icon">O</span>
            <span className="logo-text">Oussama<span className="logo-dot">.</span>dev</span>
          </div>
          
          <nav className="desktop-menu">
            <div className="menu-item" onClick={() => handleNavClick('about')}>
              <span>About</span>
            </div>
            <div className="menu-item" onClick={() => handleNavClick('skills')}>
              <span>Skills</span>
            </div>
            <div className="menu-item" onClick={() => handleNavClick('projects')}>
              <span>Projects</span>
            </div>
            <div className="menu-item" onClick={() => handleNavClick('contact')}>
              <span>Contact</span>
            </div>
          </nav>
        </div>
        
        {/* Center - Tabs */}
        <div className="header-center">
          <div className="header-tab active">
            <FaCode className="tab-icon" />
            <span>portfolio.jsx</span>
            <button className="tab-close">×</button>
          </div>
        </div>
        
        {/* Right side - Icons */}
        <div className="header-right">
          <div className="header-icon">
            <FaSearch />
          </div>
          <div className="header-icon">
            <FaGithub />
          </div>
          <div className="header-icon">
            <FaCog />
          </div>
          <div className="header-icon user-icon">
            <FaUserAlt />
            <FaChevronDown className="dropdown-icon" />
          </div>
          
          {/* Mobile menu toggle */}
          <button className={`mobile-toggle ${isOpen ? 'active' : ''}`} onClick={toggleMenu}>
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>
      
      {/* Mobile dropdown menu */}
      <div className={`mobile-menu ${isOpen ? 'active' : ''}`}>
        <div className="mobile-menu-item" onClick={() => handleNavClick('about')}>
          <FaFolder className="mobile-menu-icon" />
          <span>About</span>
        </div>
        <div className="mobile-menu-item" onClick={() => handleNavClick('skills')}>
          <FaCode className="mobile-menu-icon" />
          <span>Skills</span>
        </div>
        <div className="mobile-menu-item" onClick={() => handleNavClick('projects')}>
          <FaFolder className="mobile-menu-icon" />
          <span>Projects</span>
        </div>
        <div className="mobile-menu-item" onClick={() => handleNavClick('contact')}>
          <FaUserAlt className="mobile-menu-icon" />
          <span>Contact</span>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;