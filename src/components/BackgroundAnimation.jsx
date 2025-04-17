import React, { useEffect, useRef } from 'react';
import './BackgroundAnimation.css';

const BackgroundAnimation = () => {
  const canvasRef = useRef(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];
    
    // Resize canvas to fit viewport
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };
    
    // Create particles
    const initParticles = () => {
      particles = [];
      const particleCount = Math.floor((canvas.width * canvas.height) / 15000); // Adjust density
      
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 2 + 0.5,
          color: getParticleColor(),
          velocity: {
            x: (Math.random() - 0.5) * 0.5,
            y: (Math.random() - 0.5) * 0.5
          },
          opacity: Math.random() * 0.5 + 0.1
        });
      }
    };
    
    // Get color based on theme colors
    const getParticleColor = () => {
      const colors = [
        '61, 218, 251', // Light blue (accent-primary)
        '198, 120, 221', // Purple (accent-secondary)
        '152, 195, 121', // Green
        '229, 192, 123', // Yellow
        '255, 255, 255'  // White
      ];
      return colors[Math.floor(Math.random() * colors.length)];
    };
    
    // Animation loop
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw particles
      particles.forEach(particle => {
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${particle.color}, ${particle.opacity})`;
        ctx.fill();
        
        // Update position
        particle.x += particle.velocity.x;
        particle.y += particle.velocity.y;
        
        // Handle boundary collisions
        if (particle.x < 0 || particle.x > canvas.width) particle.velocity.x *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.velocity.y *= -1;
      });
      
      // Draw connections
      drawConnections();
    };
    
    // Draw lines between nearby particles
    const drawConnections = () => {
      const connectionDistance = 150;
      
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < connectionDistance) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(97, 218, 251, ${0.03 * (1 - distance / connectionDistance)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    };
    
    // Initialize
    handleResize();
    window.addEventListener('resize', handleResize);
    animate();
    
    // Cleanup function
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);
  
  return <canvas ref={canvasRef} className="background-canvas" />;
};

export default BackgroundAnimation;
