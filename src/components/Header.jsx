import React, { useState } from 'react';
import { motion } from 'framer-motion'; // Import motion
import './Header.css';
import { FaTimes, FaBars } from 'react-icons/fa';

const Header = ({ setActiveModule }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleNavClick = (moduleName) => {
    setActiveModule(moduleName);
    setIsOpen(false);
  };

  // Variants for nav items
  const navItemVariants = {
    hover: { scale: 1.05, color: 'var(--accent-primary)' },
    tap: { scale: 0.95 }
  };
  const logoVariants = {
    hover: { scale: 1.03, color: 'var(--accent-secondary)' },
    tap: { scale: 0.98 }
  };


  return (
    <motion.header
      className="header"
      initial={{ y: -70 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <div className="container header-content">
        <motion.div
          className="logo"
          variants={logoVariants}
          whileHover="hover"
          whileTap="tap"
        >
          <button onClick={() => handleNavClick(null)} className="logo-button">
            DevOS_Portfolio
          </button>
        </motion.div>
        <div className={`mobile-menu ${isOpen ? 'active' : ''}`} onClick={toggleMenu}>
          {isOpen ? <FaTimes /> : <FaBars />}
        </div>
        <nav className={`nav ${isOpen ? 'active' : ''}`}>
          <ul>
            {/* Wrap list items or buttons in motion component */}
            <motion.li variants={navItemVariants} whileHover="hover" whileTap="tap">
              <button onClick={() => handleNavClick('about')}>About</button>
            </motion.li>
            <motion.li variants={navItemVariants} whileHover="hover" whileTap="tap">
              <button onClick={() => handleNavClick('skills')}>Skills</button>
            </motion.li>
            <motion.li variants={navItemVariants} whileHover="hover" whileTap="tap">
              <button onClick={() => handleNavClick('projects')}>Projects</button>
            </motion.li>
            <motion.li variants={navItemVariants} whileHover="hover" whileTap="tap">
              <button onClick={() => handleNavClick('contact')}>Contact</button>
            </motion.li>
          </ul>
        </nav>
      </div>
    </motion.header>
  );
};

export default Header;