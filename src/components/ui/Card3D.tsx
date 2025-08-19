"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

interface Card3DProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
}

const Card3D: React.FC<Card3DProps> = ({ 
  children, 
  className = "", 
  glowColor = "#FF6B6B" 
}) => {
  const [ref, inView] = useInView({ threshold: 0.1 });
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const rotateXValue = (e.clientY - centerY) / 10;
    const rotateYValue = (centerX - e.clientX) / 10;
    
    setRotateX(rotateXValue);
    setRotateY(rotateYValue);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      ref={ref}
      className={`relative group perspective-1000 ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6 }}
    >
      <motion.div
        className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8 transform-gpu transition-all duration-300 hover:shadow-2xl"
        style={{
          transformStyle: "preserve-3d",
          boxShadow: `0 20px 40px ${glowColor}20, 0 0 0 1px ${glowColor}10`
        }}
        animate={{
          rotateX: rotateX,
          rotateY: rotateY
        }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
      >
        {children}
        <div 
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `linear-gradient(135deg, ${glowColor}10, transparent 50%, ${glowColor}05)`
          }}
        />
      </motion.div>
    </motion.div>
  );
};

export default Card3D;