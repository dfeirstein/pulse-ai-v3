"use client";

import React from "react";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";

interface FooterProps {
  className?: string;
}

const Footer: React.FC<FooterProps> = ({ className = "" }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={`border-t border-white/10 py-16 px-6 bg-gradient-to-b from-black to-gray-900 ${className}`}>
      <div className="container mx-auto max-w-6xl">
        <motion.div 
          className="flex flex-col md:flex-row justify-between items-center gap-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center space-x-3">
            <Heart className="h-8 w-8 text-[#FF6B6B]" />
            <span className="text-2xl font-bold text-white">
              Pulse AI
            </span>
          </div>
          <p className="text-white/60">
            © {currentYear} Pulse AI. Crafted with ❤️ for the future of teamwork.
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;