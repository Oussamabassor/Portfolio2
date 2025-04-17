import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FaTimes, FaEnvelope, FaLinkedin, FaGithub, 
  FaTwitter, FaMapMarkerAlt, FaPaperPlane 
} from 'react-icons/fa';
import './Contact.css';

const Contact = ({ closeModule }) => {
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [formStatus, setFormStatus] = useState({
    submitting: false,
    submitted: false,
    error: false,
    message: ''
  });

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setFormStatus({ ...formStatus, submitting: true });
    
    // Simulate form submission (replace with actual API call)
    setTimeout(() => {
      // Success scenario
      setFormStatus({
        submitting: false,
        submitted: true,
        error: false,
        message: 'Your message has been sent successfully! I will get back to you soon.'
      });
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      
      // Reset status after 5 seconds
      setTimeout(() => {
        setFormStatus({
          submitting: false,
          submitted: false,
          error: false,
          message: ''
        });
      }, 5000);
    }, 1500);
  };

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

  return (
    <motion.section
      className="contact-module"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="module-header">
        <motion.h2 variants={itemVariants} className="module-title">Contact Me</motion.h2>
        <button onClick={closeModule} className="close-module-btn">
          <FaTimes />
        </button>
      </div>

      <div className="module-content-area">
        <motion.div variants={itemVariants} className="contact-intro">
          <h3>Let's Connect</h3>
          <p>
            I'm always open to discussing new projects, creative ideas or opportunities to be part of your vision.
            Feel free to reach out using the form below or through my social media channels.
          </p>
        </motion.div>

        <div className="contact-content">
          <motion.div variants={itemVariants} className="contact-form-container">
            <h3>Send Me a Message</h3>
            
            {formStatus.submitted && (
              <div className="success-message">
                <FaPaperPlane className="success-icon" />
                <p>{formStatus.message}</p>
              </div>
            )}
            
            {!formStatus.submitted && (
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Your Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="John Doe"
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="email">Your Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="email@example.com"
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="subject">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    placeholder="Project Inquiry"
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="message">Your Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    placeholder="Hi Oussama, I'd like to discuss a project idea..."
                    rows="5"
                  ></textarea>
                </div>
                
                <button 
                  type="submit" 
                  className="submit-btn"
                  disabled={formStatus.submitting}
                >
                  {formStatus.submitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            )}
          </motion.div>
          
          <motion.div variants={itemVariants} className="contact-info">
            <div className="contact-card">
              <h3>Contact Information</h3>
              
              <div className="contact-details">
                <div className="contact-item">
                  <div className="contact-icon">
                    <FaEnvelope />
                  </div>
                  <div className="contact-text">
                    <h4>Email</h4>
                    <a href="mailto:oussamabassor@gmail.com">oussamabassor@gmail.com</a>
                  </div>
                </div>
                
                <div className="contact-item">
                  <div className="contact-icon">
                    <FaMapMarkerAlt />
                  </div>
                  <div className="contact-text">
                    <h4>Location</h4>
                    <p>Morocco</p>
                  </div>
                </div>
              </div>
              
              <div className="social-links">
                <h4>Find me on</h4>
                <div className="social-icons">
                  <a href="https://linkedin.com/" target="_blank" rel="noopener noreferrer" className="social-icon linkedin">
                    <FaLinkedin />
                  </a>
                  <a href="https://github.com/" target="_blank" rel="noopener noreferrer" className="social-icon github">
                    <FaGithub />
                  </a>
                  <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" className="social-icon twitter">
                    <FaTwitter />
                  </a>
                </div>
              </div>
              
              <div className="availability-info">
                <h4>Current Availability</h4>
                <div className="availability-status">
                  <span className="status-indicator available"></span>
                  <p>Available for freelance projects and collaborations</p>
                </div>
              </div>
            </div>
            
            <div className="response-info">
              <FaPaperPlane className="response-icon" />
              <p>I typically respond within 24-48 hours</p>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default Contact;