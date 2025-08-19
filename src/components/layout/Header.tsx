"use client";

import React from "react";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import MagneticButton from "@/components/ui/MagneticButton";

interface HeaderProps {
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ className = "" }) => {
  return (
    <nav className={`fixed top-0 w-full backdrop-blur-2xl bg-black/20 border-b border-white/10 z-50 ${className}`}>
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <motion.div 
          className="flex items-center space-x-3"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Heart className="h-8 w-8 text-[#FF6B6B]" />
          <span className="text-2xl font-bold font-[family-name:var(--font-display)] text-white">
            Pulse AI
          </span>
        </motion.div>
        <motion.div 
          className="flex items-center space-x-6"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Button variant="ghost" className="text-white/80 hover:text-white transition-colors">Features</Button>
          <Button variant="ghost" className="text-white/80 hover:text-white transition-colors">Pricing</Button>
          <Button variant="ghost" className="text-white/80 hover:text-white transition-colors">About</Button>
          <MagneticButton variant="secondary" size="sm">Get Started</MagneticButton>
        </motion.div>
      </div>
    </nav>
  );
};

export default Header;