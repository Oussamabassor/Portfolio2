import React from 'react';
import { FaUser, FaCode, FaLaptopCode, FaEnvelope } from 'react-icons/fa';
import styles from './NavigationMenu.module.css';

const NavigationMenu = ({ setActiveModule, activeModule }) => {
  return (
    <div className={styles.modernTerminal}>
      {/* Terminal Header */}
      <div className={styles.modernTerminalHeader}>
        <div className={styles.terminalDots}>
          <span className={`${styles.dot} ${styles.red}`}></span>
          <span className={`${styles.dot} ${styles.yellow}`}></span>
          <span className={`${styles.dot} ${styles.green}`}></span>
        </div>
        <div className={styles.terminalTitle}>portfolio ~ bash</div>
      </div>

      {/* Terminal Content */}
      <div className={styles.modernTerminalBody}>
        <div className={styles.terminalLine}>
          <span className={styles.prompt}>➜</span>
          <span className={styles.directory}>portfolio</span>
          <span className={styles.branch}>(main)</span>
          <span className={styles.command}>ls -l</span>
        </div>

        {/* Navigation Section */}
        <div className={styles.terminalOutput}>
          <div className={styles.terminalNavigation}>
            <button 
              className={`${styles.terminalNavItem} ${activeModule === 'about' ? styles.active : ''}`}
              onClick={() => setActiveModule('about')}
            >
              <FaUser className={styles.navIcon} />
              <span className={styles.navLabel}>about.md</span>
            </button>
            
            <button 
              className={`${styles.terminalNavItem} ${activeModule === 'skills' ? styles.active : ''}`}
              onClick={() => setActiveModule('skills')}
            >
              <FaCode className={styles.navIcon} />
              <span className={styles.navLabel}>skills.json</span>
            </button>
            
            <button 
              className={`${styles.terminalNavItem} ${activeModule === 'projects' ? styles.active : ''}`}
              onClick={() => setActiveModule('projects')}
            >
              <FaLaptopCode className={styles.navIcon} />
              <span className={styles.navLabel}>projects/</span>
            </button>
            
            <button 
              className={`${styles.terminalNavItem} ${activeModule === 'contact' ? styles.active : ''}`}
              onClick={() => setActiveModule('contact')}
            >
              <FaEnvelope className={styles.navIcon} />
              <span className={styles.navLabel}>contact.txt</span>
            </button>
          </div>
        </div>

        <div className={styles.terminalLine}>
          <span className={styles.prompt}>➜</span>
          <span className={styles.directory}>portfolio</span>
          <span className={styles.branch}>(main)</span>
          <span className={styles.cursorBlink}></span>
        </div>
      </div>
    </div>
  );
};

export default NavigationMenu;
