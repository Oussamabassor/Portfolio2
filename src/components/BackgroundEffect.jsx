import React, { useEffect, useRef } from 'react';
import './BackgroundEffect.css';

const BackgroundEffect = ({ darkMode = true }) => {
  const canvasRef = useRef(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId = null;
    let particles = [];
    
    // Set canvas dimensions
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };
    
    // Initialize particles
    const initParticles = () => {
      particles = [];
      const particleCount = Math.min(100, Math.floor((canvas.width * canvas.height) / 10000));
      
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2 + 0.5,
          speedX: Math.random() * 0.6 - 0.3,
          speedY: Math.random() * 0.6 - 0.3,
          color: getRandomColor()
        });
      }
    };
    
    // Get random color based on theme
    const getRandomColor = () => {
      const darkColors = [
        'rgba(139, 233, 253, 0.7)',  // Cyan
        'rgba(80, 250, 123, 0.7)',   // Green
        'rgba(255, 121, 198, 0.7)',  // Pink
        'rgba(189, 147, 249, 0.7)',  // Purple
        'rgba(241, 250, 140, 0.7)',  // Yellow
      ];
      
      const lightColors = [
        'rgba(0, 152, 189, 0.5)',    // Cyan
        'rgba(0, 179, 104, 0.5)',    // Green
        'rgba(201, 59, 126, 0.5)',   // Pink
        'rgba(124, 67, 189, 0.5)',   // Purple
        'rgba(173, 148, 8, 0.5)',    // Yellow
      ];
      
      const colors = darkMode ? darkColors : lightColors;
      return colors[Math.floor(Math.random() * colors.length)];
    };
    
    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw radial gradient background
      const bgColor1 = darkMode ? '#24283b' : '#f5f5f7';
      const bgColor2 = darkMode ? '#1a1b26' : '#e5e5e7';
      
      const gradient = ctx.createRadialGradient(
        canvas.width / 2, 
        canvas.height / 2, 
        0, 
        canvas.width / 2, 
        canvas.height / 2, 
        canvas.width / 1.5
      );
      gradient.addColorStop(0, bgColor1);
      gradient.addColorStop(1, bgColor2);
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw particles
      particles.forEach((p, i) => {
        p.x += p.speedX;
        p.y += p.speedY;
        
        // Wrap around edges
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
        
        // Draw glow effect
        const glow = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 5);
        glow.addColorStop(0, p.color);
        glow.addColorStop(1, 'transparent');
        
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 5, 0, Math.PI * 2);
        ctx.fill();
        
        // Draw connection lines
        particles.forEach((p2, j) => {
          if (i === j) return;
          
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 150) {
            const lineColor = darkMode ? 
              `rgba(139, 233, 253, ${0.1 * (1 - distance / 150)})` : 
              `rgba(0, 152, 189, ${0.07 * (1 - distance / 150)})`;
                
            ctx.beginPath();
            ctx.strokeStyle = lineColor;
            ctx.lineWidth = 0.5;
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        });
      });
      
      animationFrameId = requestAnimationFrame(animate);
    };
    
    // Set up canvas and start animation
    handleResize();
    window.addEventListener('resize', handleResize);
    animate();
    
    // Update particles color when theme changes
    particles.forEach(p => {
      p.color = getRandomColor();
    });
    
    // Clean up
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [darkMode]); // Re-run effect when darkMode changes
  
  return <canvas ref={canvasRef} className="background-canvas" />;
};

export default BackgroundEffect;
