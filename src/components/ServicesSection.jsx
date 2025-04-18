import React from 'react';
import { motion } from 'framer-motion';
import { FaCode, FaServer, FaDesktop, FaMobileAlt, FaDatabase, FaTools } from 'react-icons/fa';

const ServicesSection = () => {
  const services = [
    {
      id: 1,
      title: 'Front-End Development',
      icon: <FaCode />,
      description: 'Creating responsive and interactive user interfaces with modern frameworks',
      features: ['React & Next.js', 'UI/UX Implementation', 'Performance Optimization'],
      size: 'wide',
      featured: true,
      badge: 'Popular'
    },
    {
      id: 2,
      title: 'Back-End Development',
      icon: <FaServer />,
      description: 'Building robust server-side applications and APIs',
      features: ['Node.js & Express', 'RESTful APIs', 'Authentication'],
      size: 'tall',
      badge: null
    },
    {
      id: 3,
      title: 'Database Design',
      icon: <FaDatabase />,
      description: 'Efficient data modeling and storage solutions',
      features: ['MongoDB', 'PostgreSQL', 'Data Management'],
      size: 'small',
      badge: null
    },
    {
      id: 4,
      title: 'Mobile Development',
      icon: <FaMobileAlt />,
      description: 'Cross-platform mobile applications with native experience',
      features: ['React Native', 'iOS & Android', 'App Store Deployment'],
      size: 'normal',
      badge: 'New'
    },
    {
      id: 5,
      title: 'Full-Stack Solutions',
      icon: <FaDesktop />,
      description: 'End-to-end application development from concept to deployment',
      features: ['Full System Architecture', 'Testing & QA', 'Production Deployment'],
      size: 'normal',
      badge: null
    },
    {
      id: 6,
      title: 'DevOps & Tools',
      icon: <FaTools />,
      description: 'Streamlining development workflow and operations',
      features: ['CI/CD Pipelines', 'Docker Containers', 'AWS/Azure Cloud'],
      size: 'small',
      badge: null
    }
  ];
  
  return (
    <motion.div 
      className="services-section"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <h2 className="section-title">Services</h2>
      <div className="terminal-styled-header">
        <div className="prompt-symbol">$</div>
        <div className="command-text">ls -la ./services</div>
      </div>
      
      <div className="services-container">
        {services.map((service) => (
          <motion.div 
            className={`service-card ${service.size || ''} ${service.featured ? 'featured' : ''}`}
            key={service.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: service.id * 0.1 }}
          >
            <div className="bento-highlight"></div>
            {service.badge && <span className="service-badge">{service.badge}</span>}
            
            <div className="bento-service-header">
              <div className="service-icon">{service.icon}</div>
              <h3 className="service-title">{service.title}</h3>
            </div>
            
            <div className="bento-service-body">
              <p className="service-description">{service.description}</p>
              <ul className="service-features">
                {service.features.map((feature, i) => (
                  <li key={i} className="service-feature">{feature}</li>
                ))}
              </ul>
              <div className="service-cta">
                <button className="service-btn">Learn More</button>
              </div>
              <span className="service-index">0{service.id}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default ServicesSection;
