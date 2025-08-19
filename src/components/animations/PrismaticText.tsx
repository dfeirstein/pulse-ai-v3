"use client";

import React, { useEffect, useRef, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

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
  const [ref, inView] = useInView({ 
    threshold: 0.1,
    triggerOnce: true 
  });

  useEffect(() => {
    setMounted(true);
  }, []);
  
  const colors = ['#FF6B6B', '#20B2AA', '#EE82EE'];
  
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
                    transform: 'scale(0) rotate(0deg)'
                  }}
                  animate={inView ? {
                    opacity: 1,
                    filter: 'blur(0px)',
                    transform: 'scale(1) rotate(0deg)'
                  } : {}}
                  transition={{
                    duration: 0.8,
                    delay: delay + (totalIndex * 0.05),
                    ease: [0.43, 0.13, 0.23, 0.96]
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
                          background: `linear-gradient(${120 * i}deg, ${color}40, transparent)`,
                          filter: 'blur(1px)',
                          mixBlendMode: 'screen' as const
                        }}
                        initial={{
                          opacity: 0,
                          x: pos.x,
                          y: pos.y,
                          scale: 0.3,
                          rotate: pos.rotate
                        }}
                        animate={inView ? {
                          opacity: [0, 0.8, 0],
                          x: 0,
                          y: 0,
                          scale: 1,
                          rotate: 0
                        } : {}}
                        transition={{
                          duration: 1.2,
                          delay: delay + (totalIndex * 0.05) + (i * 0.1),
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
                      background: `radial-gradient(circle, ${color}60 0%, transparent 70%)`,
                      filter: 'blur(8px)',
                      transform: 'scale(1.5)',
                      mixBlendMode: 'screen' as const
                    }}
                    initial={{ opacity: 0 }}
                    animate={inView ? {
                      opacity: [0, 1, 0.3],
                    } : {}}
                    transition={{
                      duration: 1.5,
                      delay: delay + (totalIndex * 0.05),
                      ease: "easeOut"
                    }}
                  >
                    {char}
                  </motion.span>
                  
                  {/* Main character with gradient */}
                  <span
                    className="relative"
                    style={{
                      background: `linear-gradient(135deg, ${colors[0]}, ${colors[1]}, ${colors[2]})`,
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
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
                        delay: delay + (totalIndex * 0.05) + 0.5 + (i * 0.2),
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
                        boxShadow: `0 0 6px ${color}`,
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