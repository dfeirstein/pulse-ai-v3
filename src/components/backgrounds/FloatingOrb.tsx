"use client";

import React, { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";

interface FloatingOrbProps {
  delay?: number;
  size?: number;
  color?: string;
  index?: number;
}

const FloatingOrb: React.FC<FloatingOrbProps> = ({ 
  delay = 0, 
  size = 100, 
  color = "#FF6B6B",
  index = 0
}) => {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  // Use deterministic values based on index for initial server render
  // These will be recalculated on client after mount
  const positions = useMemo(() => {
    if (!mounted) {
      // Deterministic values for server render based on index
      const baseX = (index * 300) % 1920;
      const baseY = (index * 200) % 1080;
      return {
        initial: { x: baseX, y: baseY },
        animate: {
          x: [baseX, baseX + 200, baseX - 100],
          y: [baseY, baseY - 150, baseY + 100]
        }
      };
    }
    
    // Random values for client after hydration
    const width = window.innerWidth;
    const height = window.innerHeight;
    return {
      initial: { 
        x: Math.random() * width, 
        y: Math.random() * height 
      },
      animate: {
        x: [
          Math.random() * width,
          Math.random() * width,
          Math.random() * width
        ],
        y: [
          Math.random() * height,
          Math.random() * height,
          Math.random() * height
        ]
      }
    };
  }, [mounted, index]);

  const duration = useMemo(() => {
    if (!mounted) {
      return 20 + (index * 2); // Deterministic duration for server
    }
    return 20 + Math.random() * 10;
  }, [mounted, index]);

  return (
    <motion.div
      className="absolute rounded-full blur-xl"
      style={{
        width: size,
        height: size,
        background: `radial-gradient(circle, ${color}40 0%, ${color}20 50%, transparent 100%)`
      }}
      initial={{ 
        x: positions.initial.x,
        y: positions.initial.y,
        scale: 0
      }}
      animate={{
        x: positions.animate.x,
        y: positions.animate.y,
        scale: [0, 1, 0.5, 1]
      }}
      transition={{
        duration: duration,
        repeat: Infinity,
        ease: "easeInOut",
        delay: delay
      }}
    />
  );
};

export default FloatingOrb;