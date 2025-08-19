"use client";

import React, { useEffect, useRef } from "react";

const AuroraBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const particles: Array<{ 
      x: number; 
      y: number; 
      vx: number; 
      vy: number; 
      life: number; 
      maxLife: number 
    }> = [];
    
    const colors = ['#FF6B6B', '#20B2AA', '#EE82EE', '#FFA500', '#87CEEB'];

    // Use deterministic initial positions based on index
    for (let i = 0; i < 50; i++) {
      // Create a pseudo-random but deterministic pattern
      const angle = (i * 137.5) * (Math.PI / 180); // Golden angle
      const radius = (i / 50) * Math.min(canvas.width, canvas.height) * 0.5;
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      
      particles.push({
        x: centerX + Math.cos(angle) * radius,
        y: centerY + Math.sin(angle) * radius,
        vx: Math.cos(angle * 2) * 0.25,
        vy: Math.sin(angle * 2) * 0.25,
        life: (i * 2) % 100,
        maxLife: 100
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw connections
      particles.forEach((p1, i) => {
        particles.slice(i + 1).forEach(p2 => {
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 150) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            const opacity = (1 - distance / 150) * 0.2;
            ctx.strokeStyle = `rgba(32, 178, 170, ${opacity})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });

      // Update and draw particles
      particles.forEach((particle, index) => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.life--;

        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

        if (particle.life <= 0) {
          // Reset to center with slight offset based on index
          const angle = (index * 137.5) * (Math.PI / 180);
          const offsetRadius = 50;
          particle.x = canvas.width / 2 + Math.cos(angle) * offsetRadius;
          particle.y = canvas.height / 2 + Math.sin(angle) * offsetRadius;
          particle.life = particle.maxLife;
        }

        const lifeRatio = particle.life / particle.maxLife;
        const size = 2 + lifeRatio * 2;
        const opacity = lifeRatio * 0.8;

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, size, 0, Math.PI * 2);
        ctx.fillStyle = `${colors[index % colors.length]}${Math.floor(opacity * 255).toString(16).padStart(2, '0')}`;
        ctx.fill();

        // Glow effect
        const gradient = ctx.createRadialGradient(particle.x, particle.y, 0, particle.x, particle.y, size * 4);
        gradient.addColorStop(0, `${colors[index % colors.length]}40`);
        gradient.addColorStop(1, 'transparent');
        ctx.fillStyle = gradient;
        ctx.fillRect(particle.x - size * 4, particle.y - size * 4, size * 8, size * 8);
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ mixBlendMode: 'screen' }}
    />
  );
};

export default AuroraBackground;