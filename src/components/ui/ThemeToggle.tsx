"use client";

import React from "react";
import { motion } from "framer-motion";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";

interface ThemeToggleProps {
  className?: string;
  size?: number;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ 
  className = "", 
  size = 20 
}) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.button
      onClick={toggleTheme}
      className={`relative flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 
        ${theme === 'light' 
          ? 'bg-gradient-to-br from-orange-100 to-amber-100 hover:from-orange-200 hover:to-amber-200 shadow-md' 
          : 'bg-gradient-to-br from-indigo-900 to-purple-900 hover:from-indigo-800 hover:to-purple-800 shadow-lg'
        } 
        ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
    >
      <motion.div
        initial={false}
        animate={{
          rotate: theme === 'light' ? 0 : 180,
          scale: theme === 'light' ? 1 : 0.8,
        }}
        transition={{
          duration: 0.3,
          ease: [0.43, 0.13, 0.23, 0.96]
        }}
        className="absolute"
      >
        {theme === 'light' ? (
          <Sun 
            size={size} 
            className="text-amber-600 drop-shadow-sm"
          />
        ) : (
          <Moon 
            size={size} 
            className="text-slate-200 drop-shadow-sm"
          />
        )}
      </motion.div>
      
      {/* Subtle glow effect */}
      <motion.div
        className={`absolute inset-0 rounded-full blur-sm opacity-50
          ${theme === 'light' 
            ? 'bg-gradient-to-br from-orange-300 to-amber-300' 
            : 'bg-gradient-to-br from-indigo-400 to-purple-400'
          }`}
        animate={{
          opacity: theme === 'light' ? 0.3 : 0.5,
        }}
        transition={{ duration: 0.3 }}
      />
    </motion.button>
  );
};

export default ThemeToggle;