import React, { useState, useEffect } from 'react';
import './Footer.css';
import { FaRegClock, FaWifi, FaBatteryFull } from 'react-icons/fa'; // Example status icons

const Footer = () => {
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    };
    updateTime(); // Initial call
    const intervalId = setInterval(updateTime, 60000); // Update every minute
    return () => clearInterval(intervalId); // Cleanup interval
  }, []);

  const currentYear = new Date().getFullYear();

  return (
    <footer className="status-bar">
      <div className="status-left">
        <span>© {currentYear} Your Name</span>
        <span className="separator">|</span>
        <span>Status: Ready</span>
      </div>
      <div className="status-right">
        <FaWifi className="status-icon" />
        <FaBatteryFull className="status-icon" />
        <FaRegClock className="status-icon" />
        <span>{currentTime}</span>
      </div>
    </footer>
  );
};

export default Footer;