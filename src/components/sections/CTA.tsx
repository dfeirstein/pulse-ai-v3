"use client";

import React from "react";
import { motion } from "framer-motion";
import { Zap, ArrowRight, Heart, Shield, Star } from "lucide-react";
import AuroraBackground from "@/components/backgrounds/AuroraBackground";
import FloatingOrb from "@/components/backgrounds/FloatingOrb";
import SplitText from "@/components/animations/SplitText";
import MagneticButton from "@/components/ui/MagneticButton";

const CTA: React.FC = () => {
  return (
    <section className="py-32 px-6 bg-black relative overflow-hidden">
      {/* Aurora Background for CTA */}
      <div className="absolute inset-0">
        <AuroraBackground />
      </div>
      
      {/* Floating Orbs for CTA */}
      <div className="absolute inset-0">
        <FloatingOrb delay={0} size={150} color="#FF6B6B" index={5} />
        <FloatingOrb delay={3} size={100} color="#20B2AA" index={6} />
        <FloatingOrb delay={6} size={120} color="#EE82EE" index={7} />
      </div>

      <div className="container mx-auto max-w-5xl relative z-10">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <SplitText 
              className="text-5xl md:text-7xl font-black text-white mb-6"
              delay={0.3}
            >
              Ready to Unlock
            </SplitText>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.8 }}
            >
              <span className="block text-5xl md:text-7xl font-black bg-gradient-to-r from-[#FF6B6B] via-[#20B2AA] to-[#EE82EE] bg-clip-text text-transparent">
                Team Superpowers?
              </span>
            </motion.div>
          </motion.div>

          <motion.p 
            className="text-xl md:text-2xl text-white/80 mb-12 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 1 }}
          >
            Join the revolution. Transform your team dynamics with AI that actually understands humans.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            <MagneticButton variant="primary" size="lg">
              <Zap className="h-6 w-6" />
              Start Your Free Transformation
              <ArrowRight className="h-5 w-5" />
            </MagneticButton>
          </motion.div>

          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-8 text-sm text-white/60"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 1.6 }}
          >
            <div className="flex items-center gap-2">
              <Heart className="h-4 w-4 text-[#FF6B6B]" />
              <span>Free forever for small teams</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-[#20B2AA]" />
              <span>Enterprise-grade security</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="h-4 w-4 text-[#EE82EE]" />
              <span>Setup in 30 seconds</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTA;