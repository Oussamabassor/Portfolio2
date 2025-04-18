import React, { useEffect, useRef } from 'react';
import './InteractiveBackground.css';

const InteractiveBackground = ({ intensity = 0.6, particleCount = 70 }) => {
  const canvasRef = useRef(null);
  const mousePosition = useRef({ x: null, y: null });
  const particles = useRef([]);
  const wavePoints = useRef([]);
  const animationFrameId = useRef(null);
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initializeParticles();
      initializeWavePoints();
    };
    
    const handleMouseMove = (e) => {
      mousePosition.current = { 
        x: e.clientX, 
        y: e.clientY 
      };
      
      // Create ripple effect on click
      if (e.type === 'click') {
        createRipple(e.clientX, e.clientY);
      }
    };
    
    const handleTouchMove = (e) => {
      if (e.touches.length > 0) {
        mousePosition.current = {
          x: e.touches[0].clientX,
          y: e.touches[0].clientY
        };
      }
    };
    
    const handleMouseLeave = () => {
      mousePosition.current = { x: null, y: null };
    };
    
    // Particle class with enhanced visual effects
    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.baseSize = this.size;
        this.baseX = this.x;
        this.baseY = this.y;
        this.density = Math.random() * 25 + 5;
        this.colorOffset = Math.random() * 100;
        this.angle = Math.random() * Math.PI * 2;
        this.speed = 0.02 + Math.random() * 0.04;
        this.curve = Math.random() * 200 + 50;
        this.pulse = Math.random() * 0.1;
      }
      
      draw() {
        // Gradient fill for particles
        const gradient = ctx.createRadialGradient(
          this.x, this.y, 0, 
          this.x, this.y, this.size * 2
        );
        
        // Color based on position with subtle pulse
        const hue = ((this.x / canvas.width * 30) + (this.y / canvas.height * 30) + this.colorOffset) % 360;
        
        gradient.addColorStop(0, `hsla(${hue + 180}, 80%, 65%, ${0.8 + Math.sin(Date.now() * 0.002 + this.colorOffset) * this.pulse})`);
        gradient.addColorStop(1, `hsla(${hue}, 100%, 65%, 0)`);
        
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
      }
      
      update() {
        // Distance between particle and mouse
        if (mousePosition.current.x != null) {
          const dx = mousePosition.current.x - this.x;
          const dy = mousePosition.current.y - this.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const forceDirectionX = dx / distance;
          const forceDirectionY = dy / distance;
          const maxDistance = 150;
          const force = (maxDistance - distance) / maxDistance;
          const directionX = forceDirectionX * force * this.density * intensity;
          const directionY = forceDirectionY * force * this.density * intensity;
          
          if (distance < maxDistance) {
            this.x -= directionX;
            this.y -= directionY;
            // Size pulse when affected by mouse
            this.size = this.baseSize + force * 2;
          } else {
            if (this.x !== this.baseX) {
              const dx = this.x - this.baseX;
              this.x -= dx / 15;
            }
            if (this.y !== this.baseY) {
              const dy = this.y - this.baseY;
              this.y -= dy / 15;
            }
            this.size = this.baseSize + Math.sin(Date.now() * 0.003 + this.colorOffset) * 0.5;
          }
        } else {
          // Complex orbital motion when no mouse interaction
          this.angle += this.speed;
          
          // Orbital movement around base position
          const xOffset = Math.cos(this.angle) * (20 + Math.sin(Date.now() * 0.001) * 10);
          const yOffset = Math.sin(this.angle) * (20 + Math.sin(Date.now() * 0.0015) * 10);
          
          // Gentle return to orbit
          const targetX = this.baseX + xOffset;
          const targetY = this.baseY + yOffset;
          
          this.x += (targetX - this.x) * 0.05;
          this.y += (targetY - this.y) * 0.05;
          
          // Size oscillation
          this.size = this.baseSize + Math.sin(Date.now() * 0.003 + this.colorOffset) * 0.5;
        }
      }
    }
    
    class Ripple {
      constructor(x, y) {
        this.x = x;
        this.y = y;
        this.radius = 0;
        this.maxRadius = 100 + Math.random() * 50;
        this.speed = 5 + Math.random() * 3;
        this.life = 0;
        this.opacity = 1;
      }
      
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(139, 233, 253, ${this.opacity})`;
        ctx.lineWidth = 2;
        ctx.stroke();
      }
      
      update() {
        this.radius += this.speed;
        this.life += 1;
        this.opacity = 1 - (this.radius / this.maxRadius);
        
        // Affect nearby particles
        particles.current.forEach(particle => {
          const dx = particle.x - this.x;
          const dy = particle.y - this.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const maxDistance = this.radius + 30;
          
          if (distance < this.radius && distance > this.radius - 30) {
            const force = (maxDistance - distance) / maxDistance;
            const directionX = dx / distance;
            const directionY = dy / distance;
            particle.x += directionX * force * 5;
            particle.y += directionY * force * 5;
          }
        });
      }
      
      isFinished() {
        return this.opacity <= 0;
      }
    }
    
    // Wave background effect
    class WavePoint {
      constructor(x) {
        this.x = x;
        this.y = canvas.height / 2;
        this.baseY = canvas.height / 2;
        this.speed = 0.1;
        this.amplitude = canvas.height * 0.05;
        this.offset = Math.random() * Math.PI * 2;
      }
      
      update() {
        this.y = this.baseY + Math.sin(Date.now() * 0.001 + this.offset) * this.amplitude;
      }
    }
    
    const initializeWavePoints = () => {
      wavePoints.current = [];
      const numberOfPoints = 10;
      for (let i = 0; i <= numberOfPoints; i++) {
        wavePoints.current.push(new WavePoint(canvas.width / numberOfPoints * i));
      }
    };
    
    const drawWaves = () => {
      // Update wave points
      wavePoints.current.forEach(point => point.update());
      
      // Draw waves with gradients
      for (let w = 0; w < 3; w++) {
        ctx.beginPath();
        
        // Set different colors and opacities for each wave
        const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
        
        if (w === 0) {
          gradient.addColorStop(0, 'rgba(189, 147, 249, 0.03)');
          gradient.addColorStop(0.5, 'rgba(139, 233, 253, 0.03)');
          gradient.addColorStop(1, 'rgba(80, 250, 123, 0.03)');
          ctx.moveTo(0, canvas.height);
        } else if (w === 1) {
          gradient.addColorStop(0, 'rgba(139, 233, 253, 0.02)');
          gradient.addColorStop(0.5, 'rgba(255, 121, 198, 0.02)');
          gradient.addColorStop(1, 'rgba(189, 147, 249, 0.02)');
          ctx.moveTo(0, canvas.height);
        } else {
          gradient.addColorStop(0, 'rgba(80, 250, 123, 0.01)');
          gradient.addColorStop(0.5, 'rgba(189, 147, 249, 0.01)');
          gradient.addColorStop(1, 'rgba(255, 121, 198, 0.01)');
          ctx.moveTo(0, canvas.height);
        }
        
        // Draw the curve
        for (let i = 0; i < wavePoints.current.length; i++) {
          const offsetY = (w * 50) - 40; // Offset each wave
          
          if (i === 0) {
            ctx.moveTo(wavePoints.current[i].x, wavePoints.current[i].y + offsetY);
          } else {
            // Use control points for smooth curve
            const xc = (wavePoints.current[i].x + wavePoints.current[i-1].x) / 2;
            const yc = (wavePoints.current[i].y + wavePoints.current[i-1].y + offsetY*2) / 2;
            ctx.quadraticCurveTo(wavePoints.current[i-1].x, wavePoints.current[i-1].y + offsetY, xc, yc);
          }
        }
        
        // Complete the path
        ctx.lineTo(canvas.width, canvas.height);
        ctx.lineTo(0, canvas.height);
        ctx.closePath();
        
        ctx.fillStyle = gradient;
        ctx.fill();
      }
    };
    
    const ripples = [];
    
    const createRipple = (x, y) => {
      ripples.push(new Ripple(x, y));
    };
    
    const initializeParticles = () => {
      particles.current = [];
      for (let i = 0; i < particleCount; i++) {
        particles.current.push(new Particle());
      }
    };
    
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw subtle waves in background
      drawWaves();
      
      // Update and draw ripples
      for (let i = ripples.length - 1; i >= 0; i--) {
        ripples[i].update();
        ripples[i].draw();
        if (ripples[i].isFinished()) {
          ripples.splice(i, 1);
        }
      }
      
      // Update and draw particles
      particles.current.forEach(particle => {
        particle.update();
        particle.draw();
      });
      
      // Connect particles with lines when they're close
      connectParticles();
      
      animationFrameId.current = requestAnimationFrame(animate);
    };
    
    const connectParticles = () => {
      for (let i = 0; i < particles.current.length; i++) {
        for (let j = i; j < particles.current.length; j++) {
          const dx = particles.current[i].x - particles.current[j].x;
          const dy = particles.current[i].y - particles.current[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 120) {
            const opacity = 1 - distance / 120;
            ctx.strokeStyle = `rgba(139, 233, 253, ${opacity * 0.2})`;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(particles.current[i].x, particles.current[i].y);
            ctx.lineTo(particles.current[j].x, particles.current[j].y);
            ctx.stroke();
          }
        }
      }
    };
    
    // Initialize
    handleResize();
    
    // Add event listeners
    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('click', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('touchstart', handleTouchMove);
    
    // Start animation if user doesn't prefer reduced motion
    if (!prefersReducedMotion) {
      animate();
    }
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchstart', handleTouchMove);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [intensity, particleCount]);
  
  return <canvas ref={canvasRef} className="interactive-background" aria-hidden="true" />;
};

export default InteractiveBackground;
