import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Contact.css';
import { FaTimes, FaMapMarkerAlt, FaEnvelope, FaPhone, FaLinkedin, FaGithub, FaTwitter } from 'react-icons/fa';

const Contact = ({ closeModule }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [focused, setFocused] = useState({}); // Track focused fields
  const [validFields, setValidFields] = useState({}); // Track field validation
  const [status, setStatus] = useState('');
  
  // Validate fields on change
  useEffect(() => {
    const newValidFields = {};
    
    if (formData.name) {
      newValidFields.name = formData.name.length >= 2;
    }
    
    if (formData.email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      newValidFields.email = emailRegex.test(formData.email);
    }
    
    if (formData.subject) {
      newValidFields.subject = formData.subject.length >= 3;
    }
    
    if (formData.message) {
      newValidFields.message = formData.message.length >= 10;
    }
    
    setValidFields(newValidFields);
  }, [formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
   };
  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('sending');
    console.log('Form data:', formData); // Log form data

    // Replace with actual form submission logic (e.g., using Formspree, Netlify Forms, or backend)
    // Example using a timeout to simulate
    setTimeout(() => {
      // Assume success for now
      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' }); // Clear form

      // Optionally hide success message after a few seconds
      setTimeout(() => setStatus(''), 3000);

    }, 1500);
   };


  // Variants for staggering children
  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } },
  };

  // Variants for individual items (fade in + slide up/left/right)
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
  };
  const formItemVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: 'easeOut' } },
  };
   const infoItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: 'easeOut' } },
  };


  return (
    <motion.section id="contact" className="contact-module">
      <button onClick={closeModule} className="close-module-btn">
        <FaTimes />
      </button>

      <motion.h2 variants={itemVariants} className="module-title">Get In Touch</motion.h2>


      <div className="module-content-area">
        <div className="contact-content">
          {/* Animate Contact Info section */}
          <motion.div className="contact-info" variants={containerVariants}>
            <motion.h3 variants={infoItemVariants}>Contact Information</motion.h3>
            <motion.p variants={infoItemVariants} className="contact-intro">
              Interested in collaborating or have a question? Feel free to reach out!
            </motion.p>
            {/* Stagger info items */}
            <motion.div variants={infoItemVariants} className="info-item">
              <FaMapMarkerAlt className="info-icon" />
              <div><h4>Location:</h4><p>New York City, NY (Remote Available)</p></div>
            </motion.div>
            <motion.div variants={infoItemVariants} className="info-item">
              <FaEnvelope className="info-icon" />
              <div><h4>Email:</h4><p><a href="mailto:example@example.com">your.email@example.com</a></p></div>
            </motion.div>
            <motion.div variants={infoItemVariants} className="info-item">
              <FaPhone className="info-icon" />
              <div><h4>Phone:</h4><p>+1 234 567 8900 (Optional)</p></div>
            </motion.div>
            {/* Animate social links container */}
            <motion.div className="social-links" variants={containerVariants}>
              <motion.a variants={infoItemVariants} whileHover={{ y: -3, color: 'var(--accent-primary)' }} href="#" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn Profile"><FaLinkedin /></motion.a>
              <motion.a variants={infoItemVariants} whileHover={{ y: -3, color: 'var(--accent-primary)' }} href="#" target="_blank" rel="noopener noreferrer" aria-label="GitHub Profile"><FaGithub /></motion.a>
              <motion.a variants={infoItemVariants} whileHover={{ y: -3, color: 'var(--accent-primary)' }} href="#" target="_blank" rel="noopener noreferrer" aria-label="Twitter Profile"><FaTwitter /></motion.a>
            </motion.div>
          </motion.div>

          {/* Animate Form section */}
          <motion.form className="contact-form" onSubmit={handleSubmit}>
            <motion.h3>Send a Message</motion.h3>
            {/* Stagger form elements */}
            <motion.div className="form-row">
              <div className={`form-group half-width floating-label ${formData.name ? 'has-value' : ''} ${focused.name ? 'is-focused' : ''} ${validFields.name === false ? 'is-invalid' : ''}`}>
                <input
                  id="name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  onFocus={() => setFocused({...focused, name: true})}
                  onBlur={() => setFocused({...focused, name: false})}
                  required
                />
                <label htmlFor="name">Your Name</label>
                <motion.span 
                  className="validation-icon"
                  initial={{ scale: 0 }}
                  animate={{ scale: validFields.name === false ? 1 : 0 }}
                >
                  !
                </motion.span>
              </div>
              
              <div className={`form-group half-width floating-label ${formData.email ? 'has-value' : ''} ${focused.email ? 'is-focused' : ''} ${validFields.email === false ? 'is-invalid' : ''}`}>
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onFocus={() => setFocused({...focused, email: true})}
                  onBlur={() => setFocused({...focused, email: false})}
                  required
                />
                <label htmlFor="email">Your Email</label>
                <motion.span 
                  className="validation-icon"
                  initial={{ scale: 0 }}
                  animate={{ scale: validFields.email === false ? 1 : 0 }}
                >
                  !
                </motion.span>
              </div>
            </motion.div>
            <motion.div className={`form-group floating-label ${formData.subject ? 'has-value' : ''} ${focused.subject ? 'is-focused' : ''} ${validFields.subject === false ? 'is-invalid' : ''}`}>
              <input
                id="subject"
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                onFocus={() => setFocused({...focused, subject: true})}
                onBlur={() => setFocused({...focused, subject: false})}
                required
              />
              <label htmlFor="subject">Subject</label>
              <motion.span 
                className="validation-icon"
                initial={{ scale: 0 }}
                animate={{ scale: validFields.subject === false ? 1 : 0 }}
              >
                !
              </motion.span>
            </motion.div>
            <motion.div className={`form-group floating-label ${formData.message ? 'has-value' : ''} ${focused.message ? 'is-focused' : ''} ${validFields.message === false ? 'is-invalid' : ''}`}>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                onFocus={() => setFocused({...focused, message: true})}
                onBlur={() => setFocused({...focused, message: false})}
                rows="5"
                required
              ></textarea>
              <label htmlFor="message">Your Message...</label>
              <motion.span 
                className="validation-icon"
                initial={{ scale: 0 }}
                animate={{ scale: validFields.message === false ? 1 : 0 }}
              >
                !
              </motion.span>
            </motion.div>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              type="submit"
              disabled={status === 'sending'}
              className="submit-btn"
            >
              {status === 'sending' ? (
                <motion.div className="loading-dots">
                  <motion.span animate={{ opacity: [0.2, 1, 0.2] }} transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 0 }}></motion.span>
                  <motion.span animate={{ opacity: [0.2, 1, 0.2] }} transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 0.2 }}></motion.span>
                  <motion.span animate={{ opacity: [0.2, 1, 0.2] }} transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 0.4 }}></motion.span>
                </motion.div>
              ) : 'Send Message'}
            </motion.button>
            {/* Animate status message appearance */}
            <AnimatePresence>
              {status === 'success' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="form-status success">Message sent successfully!</motion.div>
              )}
               {status === 'error' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="form-status error">Something went wrong. Please try again.</motion.div>
              )}
            </AnimatePresence>
          </motion.form>
        </div>
      </div>
    </motion.section>
  );
};

export default Contact;