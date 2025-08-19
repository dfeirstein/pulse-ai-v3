"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "@/hooks/useTheme";

interface MagneticButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  className?: string;
  onClick?: () => void;
  size?: "sm" | "md" | "lg";
}

const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  variant = "primary",
  className = "",
  onClick,
  size = "md"
}) => {
  const ref = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const { theme } = useTheme();

  const handleMouse = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const x = (clientX - left - width / 2) * 0.2;
    const y = (clientY - top - height / 2) * 0.2;
    setPosition({ x, y });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  // Theme-aware variants - using single brand colors
  const variants = {
    primary: theme === 'light' 
      ? "bg-primary text-white shadow-lg hover:bg-primary/90"
      : "bg-primary text-white hover:bg-primary/90",
    secondary: theme === 'light'
      ? "bg-white/80 backdrop-blur-xl border border-gray-200 text-gray-800 shadow-md hover:bg-white/90"
      : "bg-white/10 backdrop-blur-xl border border-white/20 text-white hover:bg-white/20"
  };

  const sizes = {
    sm: "px-6 py-2.5 text-sm",
    md: "px-8 py-4 text-lg",
    lg: "px-10 py-5 text-xl"
  };

  return (
    <motion.button
      ref={ref}
      className={`
        relative rounded-full font-medium
        transition-all duration-300 overflow-hidden group
        ${variants[variant]} ${sizes[size]} ${className}
      `}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>
      
      {/* Theme-aware shimmer effect */}
      <motion.div
        className={`absolute inset-0 bg-gradient-to-r from-transparent to-transparent ${
          theme === 'light' 
            ? 'via-gray-200/40' 
            : 'via-white/30'
        }`}
        initial={{ x: "-100%" }}
        whileHover={{ x: "100%" }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      />
    </motion.button>
  );
};

export default MagneticButton;