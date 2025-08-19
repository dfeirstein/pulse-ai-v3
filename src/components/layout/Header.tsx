"use client";

import React from "react";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import MagneticButton from "@/components/ui/MagneticButton";
import ThemeToggle from "@/components/ui/ThemeToggle";
import { useTheme } from "@/hooks/useTheme";

interface HeaderProps {
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ className = "" }) => {
  const { theme } = useTheme();
  
  return (
    <nav className={`fixed top-0 w-full backdrop-blur-2xl transition-all duration-300 z-50 ${
      theme === 'light' 
        ? 'bg-white/80 border-b border-gray-200/50' 
        : 'bg-black/20 border-b border-white/10'
    } ${className}`}>
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <motion.div 
          className="flex items-center space-x-3"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Heart className={`h-8 w-8 transition-colors duration-300 ${
            theme === 'light' ? 'text-[#E53E3E]' : 'text-[#FF6B6B]'
          }`} />
          <span className={`text-2xl font-bold font-[family-name:var(--font-display)] transition-colors duration-300 ${
            theme === 'light' ? 'text-gray-900' : 'text-white'
          }`}>
            Pulse AI
          </span>
        </motion.div>
        <motion.div 
          className="flex items-center space-x-6"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Button 
            variant="ghost" 
            className={`transition-colors duration-300 ${
              theme === 'light' 
                ? 'text-gray-600 hover:text-gray-900' 
                : 'text-white/80 hover:text-white'
            }`}
          >
            Features
          </Button>
          <Button 
            variant="ghost" 
            className={`transition-colors duration-300 ${
              theme === 'light' 
                ? 'text-gray-600 hover:text-gray-900' 
                : 'text-white/80 hover:text-white'
            }`}
          >
            Pricing
          </Button>
          <Button 
            variant="ghost" 
            className={`transition-colors duration-300 ${
              theme === 'light' 
                ? 'text-gray-600 hover:text-gray-900' 
                : 'text-white/80 hover:text-white'
            }`}
          >
            About
          </Button>
          <ThemeToggle />
          <MagneticButton variant="secondary" size="sm">Get Started</MagneticButton>
        </motion.div>
      </div>
    </nav>
  );
};

export default Header;