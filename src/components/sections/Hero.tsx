"use client";

import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Brain, Star, Timer, Shield, Sparkles, Zap, Heart } from "lucide-react";
import AuroraBackground from "@/components/backgrounds/AuroraBackground";
import FloatingOrb from "@/components/backgrounds/FloatingOrb";
import SplitText from "@/components/animations/SplitText";
import MagneticButton from "@/components/ui/MagneticButton";

const Hero: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "200%"]);

  return (
    <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Aurora Background */}
      <AuroraBackground />
      
      {/* Floating Orbs */}
      <div className="absolute inset-0">
        <FloatingOrb delay={0} size={120} color="#FF6B6B" index={0} />
        <FloatingOrb delay={2} size={80} color="#20B2AA" index={1} />
        <FloatingOrb delay={4} size={100} color="#EE82EE" index={2} />
        <FloatingOrb delay={6} size={60} color="#FFA500" index={3} />
        <FloatingOrb delay={8} size={90} color="#87CEEB" index={4} />
      </div>

      {/* Mesh Gradient Overlay */}
      <motion.div 
        className="absolute inset-0 opacity-80"
        style={{
          background: "radial-gradient(ellipse 80% 80% at 50% -20%, rgba(255, 107, 107, 0.3), transparent), radial-gradient(ellipse 80% 80% at 80% 60%, rgba(32, 178, 170, 0.3), transparent), radial-gradient(ellipse 80% 80% at 20% 80%, rgba(238, 130, 238, 0.3), transparent)"
        }}
        animate={{
          opacity: [0.6, 0.9, 0.6]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Main Content */}
      <motion.div 
        className="relative z-10 max-w-7xl mx-auto px-6 text-center pt-20"
        style={{ y: textY }}
      >
        {/* Floating Badge */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.div
            className="inline-flex items-center gap-3 rounded-full bg-white/5 backdrop-blur-2xl border border-white/20 px-6 py-3 text-sm font-medium text-white shadow-2xl"
            whileHover={{ scale: 1.05, y: -5 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <Brain className="h-5 w-5 text-[#20B2AA]" />
            <span className="bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
              Powered by Advanced AI
            </span>
            <Star className="h-4 w-4 text-[#EE82EE]" />
          </motion.div>
        </motion.div>

        {/* Main Heading with Split Text */}
        <div className="mb-8">
          <SplitText 
            className="text-6xl md:text-8xl lg:text-9xl font-black leading-none"
            delay={0.5}
          >
            Understand Your
          </SplitText>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
          >
            <span className="block text-6xl md:text-8xl lg:text-9xl font-black bg-gradient-to-r from-[#FF6B6B] via-[#20B2AA] to-[#EE82EE] bg-clip-text text-transparent leading-none">
              Team's Pulse
            </span>
          </motion.div>
        </div>

        {/* Subtitle with Typewriter Effect */}
        <motion.div
          className="mb-16 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.5 }}
        >
          <p className="text-xl md:text-2xl text-white/90 leading-relaxed font-light">
            Revolutionary AI-powered sentiment analysis for modern teams. 
            <br className="hidden md:block" />
            <span className="text-[#20B2AA] font-medium">Instantly understand team dynamics</span> without invasive surveys.
          </p>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.8 }}
        >
          <MagneticButton variant="primary" size="lg">
            <Zap className="h-5 w-5" />
            Start Free Analysis
          </MagneticButton>
          
          <MagneticButton variant="secondary" size="lg">
            <Heart className="h-5 w-5" />
            Watch AI in Action
          </MagneticButton>
        </motion.div>

        {/* Trust Indicators */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-8 text-sm text-white/60"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 2.2 }}
        >
          <div className="flex items-center gap-2">
            <Timer className="h-4 w-4 text-[#20B2AA]" />
            <span>30-second setup</span>
          </div>
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4 text-[#EE82EE]" />
            <span>Enterprise security</span>
          </div>
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-[#FF6B6B]" />
            <span>No credit card required</span>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;