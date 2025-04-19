import React from 'react';
import './Hero.css';

const Hero = () => {
  return (
    <section id="home" className="hero">
      <div className="container hero-content">
        <h1>Hello, I'm <span>Oussama bassor</span></h1>
        <p>Frontend Developer & UI/UX Designer</p>
        <div className="hero-buttons">
          <a href="#projects"><button>View My Work</button></a>
          <a href="#contact"><button className="secondary">Contact Me</button></a>
        </div>
        <div className="scroll-down">
          <a href="#about">
            <div className="mouse">
              <span></span>
            </div>
            <div className="arrow-down">
              <span></span>
              <span></span>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;