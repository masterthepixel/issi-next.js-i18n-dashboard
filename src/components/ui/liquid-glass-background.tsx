"use client";

import React, { useEffect, useRef } from 'react';
import { useTheme } from '@/contexts/ThemeContext';

interface LiquidGlassBackgroundProps {
  className?: string;
}

export function LiquidGlassBackground({ className = "" }: LiquidGlassBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    let animationFrameId: number;
    let mouse = { x: 0, y: 0 };
    
    // Define Particle class with proper null checking
    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;
      baseColor: string;
      targetX: number;
      targetY: number;
      
      constructor(canvasWidth: number, canvasHeight: number) {
        this.x = Math.random() * canvasWidth;
        this.y = Math.random() * canvasHeight;
        this.size = Math.random() * 80 + 40; // Bigger blobs
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 - 0.25;
        
        // Define base colors based on theme
        if (isDark) {
          const hue = Math.random() * 60 + 200; // Blue to purple range for dark theme
          this.baseColor = `hsla(${hue}, 80%, 60%, 0.15)`;
        } else {
          const hue = Math.random() * 60 + 180; // Cyan to blue range for light theme
          this.baseColor = `hsla(${hue}, 80%, 70%, 0.12)`;
        }
        this.color = this.baseColor;
        
        // Target position for smooth movement
        this.targetX = this.x;
        this.targetY = this.y;
      }
        update(canvasWidth: number, canvasHeight: number) {
        // Slowly move towards target position for smoother motion
        this.x += (this.targetX - this.x) * 0.01;
        this.y += (this.targetY - this.y) * 0.01;
        
        // Occasional change in target position
        if (Math.random() < 0.01) {
          this.targetX = Math.random() * canvasWidth;
          this.targetY = Math.random() * canvasHeight;
        }
        
        // Add a subtle mouse interaction
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const maxDistance = 300;
        
        if (distance < maxDistance) {
          const force = (maxDistance - distance) / maxDistance;
          this.targetX -= dx * force * 0.02;
          this.targetY -= dy * force * 0.02;
        }
        
        // Boundary checking with bounce effect
        if (this.x < 0 || this.x > canvasWidth) this.speedX *= -1;
        if (this.y < 0 || this.y > canvasHeight) this.speedY *= -1;
      }      draw(context: CanvasRenderingContext2D) {
        // Create a gradient for each blob for more realistic glass effect
        const gradient = context.createRadialGradient(
          this.x, this.y, 0,
          this.x, this.y, this.size
        );
        
        if (isDark) {
          gradient.addColorStop(0, `hsla(210, 100%, 70%, 0.2)`);
          gradient.addColorStop(0.5, `hsla(220, 80%, 60%, 0.15)`);
          gradient.addColorStop(1, `hsla(240, 60%, 50%, 0.1)`);
        } else {
          gradient.addColorStop(0, `hsla(190, 90%, 80%, 0.2)`);
          gradient.addColorStop(0.5, `hsla(200, 85%, 70%, 0.15)`);
          gradient.addColorStop(1, `hsla(210, 80%, 60%, 0.1)`);
        }

        context.beginPath();
        // Use a more complex shape for the blobs
        const angleDelta = (Math.PI * 2) / 6;
        let angle = 0;
        let radius = this.size;
        
        // Create an irregular blob shape
        for (let i = 0; i < 6; i++) {
          const radiusVariation = 0.85 + Math.sin(Date.now() * 0.001 + i) * 0.15;
          const currentRadius = radius * radiusVariation;
          
          const x = this.x + Math.cos(angle) * currentRadius;
          const y = this.y + Math.sin(angle) * currentRadius;
            if (i === 0) {
            context.moveTo(x, y);
          } else {
            // Use bezier curves for smoother blob shapes
            const prevAngle = angle - angleDelta;
            const prevX = this.x + Math.cos(prevAngle) * radius * (0.85 + Math.sin(Date.now() * 0.001 + i - 1) * 0.15);
            const prevY = this.y + Math.sin(prevAngle) * radius * (0.85 + Math.sin(Date.now() * 0.001 + i - 1) * 0.15);
            
            const cp1x = prevX + Math.cos(prevAngle + Math.PI/6) * currentRadius * 0.5;
            const cp1y = prevY + Math.sin(prevAngle + Math.PI/6) * currentRadius * 0.5;
            const cp2x = x + Math.cos(angle - Math.PI/6) * currentRadius * 0.5;
            const cp2y = y + Math.sin(angle - Math.PI/6) * currentRadius * 0.5;
            
            context.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y);
          }
          
          angle += angleDelta;
        }
          context.closePath();
        context.fillStyle = gradient;
        context.fill();
      }
    }
    
    // Now declare variables and set up event handlers after the class definition
    let particles: Particle[] = [];
      // Set canvas to full size
    const handleResize = () => {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      // Re-initialize particles on resize
      initParticles();
    };
    
    window.addEventListener('resize', handleResize);
    handleResize();
    
    // Track mouse movement
    window.addEventListener('mousemove', (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    });    function initParticles() {
      if (!canvas) return;
      particles = [];
      // Create fewer, larger particles for better performance and visual effect
      const particleCount = Math.min(12, Math.max(6, window.innerWidth / 200));
      
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle(canvas.width, canvas.height));
      }
    }
    
    function animate() {
      if (!canvas || !ctx) return;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Apply a subtle background blur filter for glass effect
      if (isDark) {
        ctx.fillStyle = 'rgba(15, 23, 42, 0.01)'; // Very subtle dark background
      } else {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.01)'; // Very subtle light background
      }
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(particle => {
        particle.update(canvas.width, canvas.height);
        particle.draw(ctx);
      });
      
      animationFrameId = requestAnimationFrame(animate);
    }
    
    initParticles();
    animate();
    
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', () => {});
      cancelAnimationFrame(animationFrameId);
    };
  }, [isDark]);
  
  return (
    <canvas 
      ref={canvasRef} 
      className={`fixed inset-0 -z-10 ${className}`}
      style={{ filter: 'blur(60px)' }}
    />
  );
}
