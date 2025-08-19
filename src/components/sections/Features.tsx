"use client";

import React from "react";
import { motion } from "framer-motion";
import { Clock, Shield, Brain } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";

const features = [
  {
    icon: Clock,
    title: "Know in seconds, not surveys",
    description: "AI analyzes existing communication patterns. No more survey fatigue or waiting weeks for results.",
    color: "#FF6B6B"
  },
  {
    icon: Shield,
    title: "100% anonymous, 100% honest",
    description: "Complete privacy protection means teams share real feelings, not what they think you want to hear.",
    color: "#20B2AA"
  },
  {
    icon: Brain,
    title: "AI that actually understands humans",
    description: "Advanced sentiment analysis that catches nuance, context, and the things left unsaid.",
    color: "#EE82EE"
  }
];

const Features: React.FC = () => {
  const { theme } = useTheme();
  
  return (
    <section className={`py-20 px-6 relative overflow-hidden transition-colors duration-300 ${
      theme === 'light' 
        ? 'bg-white' 
        : 'bg-gray-900'
    }`}>
      <div className="container mx-auto max-w-6xl">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className={`text-4xl md:text-5xl font-black mb-4 ${
            theme === 'light' ? 'text-gray-900' : 'text-white'
          }`}>
            Why teams choose Pulse AI
          </h2>
          <p className={`text-xl max-w-2xl mx-auto ${
            theme === 'light' ? 'text-gray-600' : 'text-gray-300'
          }`}>
            Simple, powerful, and built for the way modern teams actually work.
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className={`p-8 rounded-xl transition-all ${
                theme === 'light' 
                  ? 'bg-gray-50 hover:bg-gray-100 border border-gray-200' 
                  : 'bg-gray-800 hover:bg-gray-700 border border-gray-700'
              }`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div 
                className="h-12 w-12 rounded-lg flex items-center justify-center mb-6"
                style={{ backgroundColor: `${feature.color}20` }}
              >
                <feature.icon 
                  className="h-6 w-6" 
                  style={{ color: feature.color }}
                />
              </div>
              
              <h3 className={`text-xl font-bold mb-3 ${
                theme === 'light' ? 'text-gray-900' : 'text-white'
              }`}>
                {feature.title}
              </h3>
              
              <p className={`leading-relaxed ${
                theme === 'light' ? 'text-gray-600' : 'text-gray-300'
              }`}>
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;