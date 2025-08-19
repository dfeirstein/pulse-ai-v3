"use client";

import React from "react";
import { motion } from "framer-motion";
import { BarChart3, Shield, Brain } from "lucide-react";
import Card3D from "@/components/ui/Card3D";
import SplitText from "@/components/animations/SplitText";

const features = [
  {
    icon: BarChart3,
    title: "Lightning Analysis",
    description: "Get comprehensive team sentiment in under 30 seconds",
    color: "#FF6B6B",
    features: ["Real-time emotional mapping", "Predictive trend analysis", "Cross-platform integration"]
  },
  {
    icon: Shield,
    title: "Fort Knox Security", 
    description: "Military-grade encryption meets complete privacy",
    color: "#20B2AA",
    features: ["Zero-knowledge architecture", "End-to-end encryption", "Compliance automation"]
  },
  {
    icon: Brain,
    title: "AI Superpowers",
    description: "Advanced machine learning that understands human nuance",
    color: "#EE82EE", 
    features: ["Emotional intelligence AI", "Burnout early warning", "Culture health scoring"]
  }
];

const Features: React.FC = () => {
  return (
    <section className="py-32 px-6 bg-gradient-to-b from-black via-gray-900 to-black relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)`,
          backgroundSize: '50px 50px'
        }} />
      </div>

      <div className="container mx-auto max-w-7xl relative z-10">
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <SplitText 
            className="text-5xl md:text-6xl font-black mb-6 text-white"
            delay={0.2}
          >
            Why Teams Love Pulse AI
          </SplitText>
          <motion.p 
            className="text-xl text-white/70 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            Experience the future of team insights with our revolutionary AI-powered platform
          </motion.p>
        </motion.div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card3D 
              key={index}
              glowColor={feature.color}
              className="group"
            >
              <motion.div
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <motion.div
                  className="mb-6 inline-block"
                  whileHover={{ scale: 1.1, rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <feature.icon 
                    className="h-16 w-16 mx-auto" 
                    style={{ color: feature.color }}
                  />
                </motion.div>
                
                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-white/90 transition-colors">
                  {feature.title}
                </h3>
                
                <p className="text-white/70 mb-6 leading-relaxed">
                  {feature.description}
                </p>
                
                <div className="space-y-3">
                  {feature.features.map((item, i) => (
                    <motion.div
                      key={i}
                      className="flex items-center gap-3 text-white/60"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.1 + i * 0.1 }}
                    >
                      <div 
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: feature.color }}
                      />
                      <span className="text-sm">{item}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </Card3D>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;