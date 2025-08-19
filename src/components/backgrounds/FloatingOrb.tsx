"use client";

import React, { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";
import { useTheme } from "@/hooks/useTheme";

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
  const { theme } = useTheme();
  
  useEffect(() => {
    setMounted(true);
  }, []);

  // Theme-aware color adjustment
  const themeAwareColor = useMemo(() => {
    if (theme === 'light') {
      // Convert to more pastel, less saturated versions for light mode
      const colorMap: Record<string, string> = {
        '#FF6B6B': '#FFB3B3', // Pastel coral
        '#20B2AA': '#7DD3C0', // Pastel teal
        '#EE82EE': '#F4C2F4', // Pastel pink
        '#FFA500': '#FFD180', // Pastel orange
        '#87CEEB': '#B8E0FF', // Pastel blue
      };
      return colorMap[color] || color;
    }
    return color;
  }, [color, theme]);

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
      className="absolute rounded-full transition-all duration-300"
      style={{
        width: size,
        height: size,
        background: theme === 'light' 
          ? `radial-gradient(circle, ${themeAwareColor}30 0%, ${themeAwareColor}15 50%, transparent 100%)`
          : `radial-gradient(circle, ${themeAwareColor}40 0%, ${themeAwareColor}20 50%, transparent 100%)`,
        filter: theme === 'light' ? 'blur(8px)' : 'blur(12px)', // Less blur in light mode
        boxShadow: theme === 'light' 
          ? `0 0 ${size/4}px ${themeAwareColor}20` // Soft shadow instead of glow
          : `0 0 ${size/2}px ${themeAwareColor}40`, // Glow effect for dark mode
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