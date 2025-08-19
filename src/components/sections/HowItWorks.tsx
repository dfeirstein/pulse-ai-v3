"use client";

import React from "react";
import { motion } from "framer-motion";
import { Zap, Brain, Star } from "lucide-react";
import PrismaticText from "@/components/animations/PrismaticText";

const steps = [
  {
    step: "01",
    title: "Neural Connection",
    description: "Quantum-secure integration with your workspace in seconds",
    color: "#FF6B6B",
    icon: Zap
  },
  {
    step: "02", 
    title: "AI Analysis Engine",
    description: "Advanced neural networks decode team emotional patterns",
    color: "#20B2AA",
    icon: Brain
  },
  {
    step: "03",
    title: "Actionable Intelligence",
    description: "Receive prescriptive insights and proactive recommendations",
    color: "#EE82EE",
    icon: Star
  }
];

const HowItWorks: React.FC = () => {
  return (
    <section className="py-32 px-6 bg-gradient-to-br from-gray-900 via-black to-gray-900 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute inset-0 opacity-20"
          animate={{
            background: [
              "radial-gradient(600px circle at 0% 0%, #FF6B6B40, transparent)",
              "radial-gradient(600px circle at 100% 100%, #20B2AA40, transparent)",
              "radial-gradient(600px circle at 0% 100%, #EE82EE40, transparent)",
              "radial-gradient(600px circle at 100% 0%, #FF6B6B40, transparent)"
            ]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        />
      </div>

      <div className="container mx-auto max-w-7xl relative z-10">
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <PrismaticText 
            className="text-5xl md:text-6xl font-black mb-6 text-white"
            delay={0.2}
          >
            How The Magic Happens
          </PrismaticText>
          <motion.p 
            className="text-xl text-white/70 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            Three revolutionary steps to transform your team dynamics forever
          </motion.p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-12">
          {steps.map((item, index) => (
            <motion.div
              key={index}
              className="text-center relative group"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
            >
              {/* Connection Line */}
              {index < 2 && (
                <motion.div
                  className="hidden md:block absolute top-16 left-full w-12 h-0.5 bg-gradient-to-r from-white/30 to-transparent z-0"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: index * 0.3 + 0.5 }}
                />
              )}

              {/* Step Circle */}
              <motion.div
                className="relative mb-8"
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <motion.div
                  className="w-20 h-20 rounded-full mx-auto flex items-center justify-center relative overflow-hidden border-2 border-white/20"
                  style={{
                    background: `linear-gradient(135deg, ${item.color}40, ${item.color}20)`
                  }}
                  whileHover={{
                    boxShadow: `0 0 30px ${item.color}60`
                  }}
                >
                  <item.icon className="h-8 w-8 text-white z-10" />
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    initial={{ x: "-100%" }}
                    animate={{ x: "100%" }}
                    transition={{ 
                      repeat: Infinity, 
                      duration: 2, 
                      ease: "linear",
                      delay: index * 0.5
                    }}
                  />
                </motion.div>
                
                {/* Step Number */}
                <motion.div
                  className="absolute -top-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
                  style={{ backgroundColor: item.color, color: 'white' }}
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.2 + 0.8 }}
                >
                  {item.step}
                </motion.div>
              </motion.div>

              <motion.h3 
                className="text-2xl font-bold text-white mb-4 group-hover:text-white/90 transition-colors"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 + 0.4 }}
              >
                {item.title}
              </motion.h3>
              
              <motion.p 
                className="text-white/70 leading-relaxed"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 + 0.6 }}
              >
                {item.description}
              </motion.p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;