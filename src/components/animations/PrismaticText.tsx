"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useTheme } from "@/hooks/useTheme";

interface PrismaticTextProps {
  children: string;
  className?: string;
  delay?: number;
}

const PrismaticText: React.FC<PrismaticTextProps> = ({ 
  children, 
  className = "", 
  delay = 0 
}) => {
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();
  const [ref, inView] = useInView({ 
    threshold: 0.1,
    triggerOnce: true 
  });

  useEffect(() => {
    setMounted(true);
  }, []);
  
  // Theme-aware colors - darker and more saturated for light mode
  const colors = theme === 'light' 
    ? ['#E53E3E', '#0D9488', '#D946EF'] // Darker versions for accessibility
    : ['#FF6B6B', '#20B2AA', '#EE82EE']; // Original bright colors
  
  // Split text into words and characters
  const words = children.split(' ');
  
  // Generate deterministic positions based on character index
  const getFragmentPosition = (wordIndex: number, charIndex: number, fragmentIndex: number) => {
    const seed = (wordIndex * 100 + charIndex * 10 + fragmentIndex + 1) * 137.5;
    const angle = (seed % 360) * (Math.PI / 180);
    const radius = 50 + (seed % 50);
    
    return {
      x: Math.cos(angle) * radius,
      y: Math.sin(angle) * radius,
      rotate: (seed % 360)
    };
  };
  
  // Don't render animations during SSR
  if (!mounted) {
    return (
      <div className={`${className} relative`}>
        {children}
      </div>
    );
  }

  return (
    <div ref={ref} className={`${className} relative`}>
      {words.map((word, wordIndex) => (
        <span key={wordIndex} className="inline-block">
          {word.split('').map((char, charIndex) => {
            const totalIndex = wordIndex * 10 + charIndex;
            const color = colors[totalIndex % colors.length];
            
            return (
              <span key={charIndex} className="relative inline-block">
                {/* Main character */}
                <motion.span
                  className="relative inline-block font-black"
                  initial={{ 
                    opacity: 0,
                    filter: 'blur(20px)',
                    transform: 'scale(0.8) rotate(0deg)'
                  }}
                  animate={inView ? {
                    opacity: 1,
                    filter: 'blur(0px)',
                    transform: 'scale(1) rotate(0deg)'
                  } : {}}
                  transition={{
                    duration: 1.2,
                    delay: delay + (totalIndex * 0.02), // Reduced delay for smoother animation
                    ease: [0.34, 1.56, 0.64, 1]
                  }}
                >
                  {/* Crystal fragments with deterministic positions */}
                  {[...Array(3)].map((_, i) => {
                    const pos = getFragmentPosition(wordIndex, charIndex, i);
                    return (
                      <motion.span
                        key={i}
                        className="absolute inset-0"
                        style={{
                          backgroundImage: theme === 'light'
                            ? `linear-gradient(${120 * i}deg, ${color}60, transparent)` // More opacity for light mode
                            : `linear-gradient(${120 * i}deg, ${color}40, transparent)`,
                          filter: 'blur(1px)',
                          mixBlendMode: theme === 'light' ? 'multiply' as const : 'screen' as const,
                          textShadow: theme === 'light' ? `0 1px 2px ${color}30` : 'none' // Add text shadow in light mode
                        }}
                        initial={{
                          opacity: 0,
                          x: pos.x,
                          y: pos.y,
                          scale: 0.3,
                          rotate: pos.rotate
                        }}
                        animate={inView ? {
                          opacity: [0, 0.6, 0],
                          x: 0,
                          y: 0,
                          scale: 1,
                          rotate: 0
                        } : {}}
                        transition={{
                          duration: 1.5,
                          delay: delay + (totalIndex * 0.02) + (i * 0.05), // Synchronized with main animation
                          ease: "easeOut"
                        }}
                      >
                        {char}
                      </motion.span>
                    );
                  })}
                  
                  {/* Prismatic glow effect */}
                  <motion.span
                    className="absolute inset-0"
                    style={{
                      backgroundImage: theme === 'light'
                        ? `radial-gradient(circle, ${color}40 0%, transparent 70%)` // Reduced glow in light mode
                        : `radial-gradient(circle, ${color}60 0%, transparent 70%)`,
                      filter: theme === 'light' ? 'blur(4px)' : 'blur(8px)', // Less blur in light mode
                      transform: 'scale(1.5)',
                      mixBlendMode: theme === 'light' ? 'multiply' as const : 'screen' as const
                    }}
                    initial={{ opacity: 0 }}
                    animate={inView ? {
                      opacity: [0, 0.8, 0.3],
                    } : {}}
                    transition={{
                      duration: 1.8,
                      delay: delay + (totalIndex * 0.02), // Match main animation timing
                      ease: "easeOut"
                    }}
                  >
                    {char}
                  </motion.span>
                  
                  {/* Main character with gradient */}
                  <span
                    className="relative"
                    style={{
                      backgroundImage: `linear-gradient(135deg, ${colors[0]}, ${colors[1]}, ${colors[2]})`,
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                      textShadow: theme === 'light' ? `0 2px 4px rgba(0,0,0,0.1)` : 'none', // Subtle shadow for light mode contrast
                    }}
                  >
                    {char}
                  </span>
                </motion.span>
                
                {/* Sparkle particles - only animate after mount */}
                {inView && [...Array(2)].map((_, i) => {
                  const sparkleOffset = ((wordIndex + charIndex + i) * 137) % 60 - 30;
                  return (
                    <motion.span
                      key={`sparkle-${i}`}
                      className="absolute pointer-events-none"
                      initial={{
                        opacity: 0,
                        scale: 0,
                        x: 0,
                        y: 0
                      }}
                      animate={{
                        opacity: [0, 1, 0],
                        scale: [0, 1, 0],
                        x: sparkleOffset,
                        y: -sparkleOffset
                      }}
                      transition={{
                        duration: 1.5,
                        delay: delay + (totalIndex * 0.02) + 0.8 + (i * 0.2), // Synchronized delay
                        ease: "easeOut",
                        repeat: Infinity,
                        repeatDelay: 3 + (i * 2)
                      }}
                      style={{
                        left: '50%',
                        top: '50%',
                        width: '4px',
                        height: '4px',
                        borderRadius: '50%',
                        background: color,
                        boxShadow: theme === 'light' 
                          ? `0 0 3px ${color}, 0 1px 2px rgba(0,0,0,0.1)` // Softer glow + shadow for light mode
                          : `0 0 6px ${color}`, // Original glow for dark mode
                        opacity: theme === 'light' ? 0.7 : 1, // Slightly more transparent in light mode
                      }}
                    />
                  );
                })}
              </span>
            );
          })}
          {wordIndex < words.length - 1 && <span>&nbsp;</span>}
        </span>
      ))}
    </div>
  );
};

export default PrismaticText;