import React, { useState, useEffect, useContext } from 'react';
import { motion } from 'framer-motion';
import './Header.css';
import { 
  FaTimes, 
  FaBars, 
  FaCode,
  FaFolder,
  FaSearch,
  FaGithub,
  FaSun,
  FaMoon,
  FaUserAlt,
  FaChevronDown
} from 'react-icons/fa';
import { ThemeContext } from '../context/ThemeContext';

const Header = ({ setActiveModule }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { darkMode, toggleTheme } = useContext(ThemeContext);
  
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
          <div 
            className="header-icon theme-toggle"
            onClick={toggleTheme}
            title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {darkMode ? <FaSun /> : <FaMoon />}
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
        <div className="mobile-menu-item" onClick={toggleTheme}>
          {darkMode ? <FaSun className="mobile-menu-icon" /> : <FaMoon className="mobile-menu-icon" />}
          <span>{darkMode ? "Light Mode" : "Dark Mode"}</span>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;