import React from 'react';
import { motion } from 'framer-motion';
import './Skills.css';
import { FaTimes, FaReact, FaLaravel, FaNodeJs, FaDatabase, 
         FaTools, FaCode, FaPalette, FaServer } from 'react-icons/fa';

const Skills = ({ closeModule }) => {
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

  // Skill categories
  const skillCategories = [
    {
      title: "Frontend Development",
      icon: <FaReact className="category-icon" />,
      skills: [
        { name: "React.js", level: 90 },
        { name: "JavaScript ES6+", level: 85 },
        { name: "HTML5 & CSS3", level: 95 },
        { name: "Tailwind CSS", level: 90 },
        { name: "Framer Motion", level: 80 },
        { name: "Responsive Design", level: 90 },
      ],
    },
    {
      title: "Backend Development",
      icon: <FaServer className="category-icon" />,
      skills: [
        { name: "Laravel", level: 85 },
        { name: "Express.js", level: 75 },
        { name: "RESTful APIs", level: 80 },
        { name: "Node.js", level: 70 },
        { name: "PHP", level: 75 },
      ],
    },
    {
      title: "Database",
      icon: <FaDatabase className="category-icon" />,
      skills: [
        { name: "MySQL", level: 85 },
        { name: "MongoDB", level: 70 },
        { name: "Firebase", level: 75 },
        { name: "SQL", level: 80 },
      ],
    },
    {
      title: "Tools & Deployment",
      icon: <FaTools className="category-icon" />,
      skills: [
        { name: "Git & GitHub", level: 85 },
        { name: "Docker", level: 65 },
        { name: "Webpack", level: 70 },
        { name: "npm/yarn", level: 85 },
        { name: "VS Code", level: 90 },
      ],
    },
    {
      title: "UI/UX Design",
      icon: <FaPalette className="category-icon" />,
      skills: [
        { name: "Figma", level: 75 },
        { name: "Adobe XD", level: 70 },
        { name: "Wireframing", level: 80 },
        { name: "Responsive Design", level: 85 },
        { name: "Color Theory", level: 75 },
      ],
    }
  ];

  return (
    <motion.section
      className="skills-module"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="module-header">
        <motion.h2 variants={itemVariants} className="module-title">My Skills</motion.h2>
        <button onClick={closeModule} className="close-module-btn">
          <FaTimes />
        </button>
      </div>

      <div className="module-content-area">
        <motion.div variants={itemVariants} className="skills-intro">
          <h3>Technical Proficiency</h3>
          <p>
            I've developed a diverse set of skills throughout my journey as a web developer. Here's a breakdown of my technical proficiency in various areas:
          </p>
        </motion.div>

        <div className="skills-categories">
          {skillCategories.map((category, index) => (
            <motion.div
              key={index}
              className="skill-category-card"
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <div className="category-header">
                {category.icon}
                <h3>{category.title}</h3>
              </div>
              <div className="skills-list">
                {category.skills.map((skill, idx) => (
                  <div key={idx} className="skill-item">
                    <div className="skill-info">
                      <span className="skill-name">{skill.name}</span>
                      <span className="skill-level">{skill.level}%</span>
                    </div>
                    <div className="skill-bar-bg">
                      <motion.div 
                        className="skill-bar-fill"
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.level}%` }}
                        transition={{ delay: 0.4 + (idx * 0.1), duration: 1, ease: "easeOut" }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div variants={itemVariants} className="other-skills">
          <h3>Other Technical Skills</h3>
          <div className="skill-tags">
            <span className="skill-pill">Typed.js</span>
            <span className="skill-pill">SASS/SCSS</span>
            <span className="skill-pill">Redux</span>
            <span className="skill-pill">Material UI</span>
            <span className="skill-pill">Bootstrap</span>
            <span className="skill-pill">GraphQL</span>
            <span className="skill-pill">Jest</span>
            <span className="skill-pill">API Integration</span>
            <span className="skill-pill">Linux</span>
            <span className="skill-pill">Responsive Web Design</span>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="soft-skills">
          <h3>Soft Skills</h3>
          <div className="soft-skills-grid">
            <div className="soft-skill">
              <div className="soft-skill-icon">🔍</div>
              <h4>Problem Solving</h4>
              <p>Analytical approach to debugging and developing solutions</p>
            </div>
            <div className="soft-skill">
              <div className="soft-skill-icon">🤝</div>
              <h4>Collaboration</h4>
              <p>Effective teamwork and communication in cross-functional teams</p>
            </div>
            <div className="soft-skill">
              <div className="soft-skill-icon">⏱️</div>
              <h4>Time Management</h4>
              <p>Prioritizing tasks and meeting deadlines efficiently</p>
            </div>
            <div className="soft-skill">
              <div className="soft-skill-icon">📚</div>
              <h4>Continuous Learning</h4>
              <p>Adaptable to new technologies and frameworks</p>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Skills;