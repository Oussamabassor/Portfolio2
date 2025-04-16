import React, { useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion'; // Add useInView
import './Skills.css';
import { FaTimes } from 'react-icons/fa';

const Skills = ({ closeModule }) => {
  const [isVisible, setIsVisible] = useState(false);
  const skillsRef = React.useRef(null);
  const inView = useInView(skillsRef, { once: true, amount: 0.3 });
  
  useEffect(() => {
    if (inView) {
      setIsVisible(true);
    }
  }, [inView]);
  
  const skillsData = [
    // Frontend
    { name: 'JavaScript/TypeScript', level: 90 },
    { name: 'React & Redux', level: 88 },
    { name: 'HTML5/CSS3/SASS', level: 92 },
    
    // Backend
    { name: 'Node.js/Express', level: 85 },
    { name: 'Python/Django', level: 80 },
    { name: 'RESTful APIs', level: 88 },
    
    // Database
    { name: 'MongoDB/Mongoose', level: 82 },
    { name: 'SQL (PostgreSQL/MySQL)', level: 78 },
    
    // DevOps & Tools
    { name: 'Git/GitHub', level: 85 },
    { name: 'Docker/Kubernetes', level: 75 },
    { name: 'AWS/Azure Cloud', level: 72 },
    { name: 'CI/CD Pipelines', level: 70 },
  ];

  // Variants for staggering children
  const containerVariants = {
    hidden: {}, // Parent doesn't need opacity if children handle it
    visible: {
      transition: {
        staggerChildren: 0.1, // Stagger animation for children
      },
    },
  };

  // Variants for text block
  const textVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: 'easeOut' } },
  };

  // Variants for skill items
  const skillItemVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: 'easeOut' } },
  };

  return (
    <motion.section id="skills" className="skills-module">
      <button onClick={closeModule} className="close-module-btn">
        <FaTimes />
      </button>

      <motion.h2 variants={textVariants} className="module-title">My Skillset</motion.h2>

      <div className="module-content-area">
        <div className="skills-content">
          {/* Animate text section */}
          <motion.div className="skills-text" variants={textVariants}>
            <h3>Technical Expertise</h3>
            <p>
              I specialize in frontend development, building responsive and performant web applications with a focus on clean code and great user experiences.
            </p>
            <p>
              My toolkit includes modern JavaScript frameworks, CSS preprocessors, version control, and design tools. I'm always eager to learn and adapt to new technologies.
            </p>
          </motion.div>

          {/* Animate skills bars container with stagger */}
          <motion.div
            className="skills-bars"
            variants={containerVariants}
            ref={skillsRef}
          >
            {skillsData.map((skill, index) => (
              // Animate each skill item
              <motion.div className="skill" key={index} variants={skillItemVariants}>
                <div className="skill-info">
                  <span className="skill-name">{skill.name}</span>
                  <motion.span 
                    className="skill-percentage"
                    initial={{ opacity: 0 }}
                    animate={isVisible ? { opacity: 1 } : {}}
                    transition={{ delay: index * 0.1 + 0.3 }}
                  >
                    {skill.level}%
                  </motion.span>
                </div>
                <div className="skill-bar">
                  <motion.div
                    className="skill-level"
                    initial={{ width: 0 }}
                    animate={isVisible ? { width: `${skill.level}%` } : {}}
                    transition={{ 
                      duration: 1.2, 
                      delay: index * 0.1,
                      ease: [0.25, 0.1, 0.25, 1]
                    }}
                  ></motion.div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default Skills;