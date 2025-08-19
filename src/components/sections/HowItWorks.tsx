"use client";

import React from "react";
import { motion } from "framer-motion";
import { Zap, BarChart3, ArrowRight } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";

const steps = [
  {
    number: "1",
    title: "Add to Slack",
    description: "Click 'Add to Slack' and authorize Pulse AI. We only read public channels, never private messages.",
    slackStep: true
  },
  {
    number: "2",
    title: "AI learns your team",
    description: "Our AI analyzes conversation patterns, tone, and engagement to understand team dynamics.",
    slackStep: false
  },
  {
    number: "3",
    title: "Get instant insights",
    description: "Access your real-time dashboard showing team health, trends, and actionable recommendations.",
    slackStep: false
  }
];

const HowItWorks: React.FC = () => {
  const { theme } = useTheme();
  
  return (
    <section className={`py-20 px-6 relative overflow-hidden transition-colors duration-300 ${
      theme === 'light' 
        ? 'bg-gray-50' 
        : 'bg-gray-800'
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
            How it works with Slack
          </h2>
          <p className={`text-xl max-w-2xl mx-auto ${
            theme === 'light' ? 'text-gray-600' : 'text-gray-300'
          }`}>
            Connect your Slack workspace in seconds. No configuration, no training, just insights.
          </p>
        </motion.div>
        
        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="relative"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {/* Arrow between steps */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-12 -right-4 z-10">
                  <ArrowRight className={`h-8 w-8 ${
                    theme === 'light' ? 'text-gray-300' : 'text-gray-600'
                  }`} />
                </div>
              )}
              
              <div className={`p-8 rounded-xl h-full ${
                theme === 'light' 
                  ? 'bg-white border border-gray-200' 
                  : 'bg-gray-900 border border-gray-700'
              }`}>
                {/* Step Number with Slack color for step 1 */}
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full mb-4 font-bold text-lg ${
                  step.slackStep
                    ? 'bg-[#4A154B] text-white'
                    : theme === 'light' 
                      ? 'bg-primary/10 text-primary' 
                      : 'bg-primary/20 text-primary'
                }`}>
                  {step.number}
                </div>
                
                {/* Slack Logo for step 1 */}
                {step.slackStep && (
                  <div className="mb-4">
                    <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zM6.313 15.165a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313z" fill="#E01E5A"/>
                      <path d="M8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.527 2.527 0 0 1 2.521 2.522v2.52H8.834zM8.834 6.313a2.527 2.527 0 0 1 2.521 2.521 2.527 2.527 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312z" fill="#36C5F0"/>
                      <path d="M18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.527 2.527 0 0 1-2.522 2.521h-2.522V8.834zM17.688 8.834a2.527 2.527 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.528 2.528 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.312z" fill="#2EB67D"/>
                      <path d="M15.165 18.956a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.52-2.522v-2.522h2.52zM15.165 17.688a2.527 2.527 0 0 1-2.52-2.523 2.527 2.527 0 0 1 2.52-2.52h6.313A2.528 2.528 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.523h-6.313z" fill="#ECB22E"/>
                    </svg>
                  </div>
                )}
                
                {/* Other icons */}
                {!step.slackStep && (
                  <div className="mb-4">
                    {index === 1 ? (
                      <Zap className={`h-8 w-8 ${
                        theme === 'light' ? 'text-gray-700' : 'text-gray-300'
                      }`} />
                    ) : (
                      <BarChart3 className={`h-8 w-8 ${
                        theme === 'light' ? 'text-gray-700' : 'text-gray-300'
                      }`} />
                    )}
                  </div>
                )}
                
                <h3 className={`text-xl font-bold mb-3 ${
                  theme === 'light' ? 'text-gray-900' : 'text-white'
                }`}>
                  {step.title}
                </h3>
                
                <p className={`leading-relaxed ${
                  theme === 'light' ? 'text-gray-600' : 'text-gray-300'
                }`}>
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Slack Integration Visual */}
        <motion.div
          className="max-w-5xl mx-auto"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className={`rounded-xl overflow-hidden shadow-xl border ${
            theme === 'light' 
              ? 'border-gray-200 bg-white' 
              : 'border-gray-700 bg-gray-800'
          }`}>
            {/* Slack-style interface */}
            <div className={`p-4 border-b flex items-center gap-4 ${
              theme === 'light' ? 'border-gray-200 bg-gray-50' : 'border-gray-700 bg-gray-900'
            }`}>
              <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zM6.313 15.165a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313z" fill="#E01E5A"/>
                <path d="M8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.527 2.527 0 0 1 2.521 2.522v2.52H8.834zM8.834 6.313a2.527 2.527 0 0 1 2.521 2.521 2.527 2.527 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312z" fill="#36C5F0"/>
                <path d="M18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.527 2.527 0 0 1-2.522 2.521h-2.522V8.834zM17.688 8.834a2.527 2.527 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.528 2.528 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.312z" fill="#2EB67D"/>
                <path d="M15.165 18.956a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.52-2.522v-2.522h2.52zM15.165 17.688a2.527 2.527 0 0 1-2.52-2.523 2.527 2.527 0 0 1 2.52-2.52h6.313A2.528 2.528 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.523h-6.313z" fill="#ECB22E"/>
              </svg>
              <div className="flex-1">
                <span className={`font-semibold ${
                  theme === 'light' ? 'text-gray-800' : 'text-gray-200'
                }`}>Slack Workspace</span>
              </div>
              <span className="text-xs px-3 py-1 bg-green-500 text-white rounded-full font-medium">
                Pulse AI Connected
              </span>
            </div>
            
            <div className="flex">
              {/* Slack channels sidebar */}
              <div className={`w-1/3 p-4 border-r ${
                theme === 'light' ? 'border-gray-200 bg-gray-50' : 'border-gray-700 bg-gray-900'
              }`}>
                <div className="space-y-2">
                  <div className={`text-xs font-semibold uppercase tracking-wider mb-2 ${
                    theme === 'light' ? 'text-gray-500' : 'text-gray-400'
                  }`}>
                    Channels
                  </div>
                  <div className={`py-1 px-2 rounded ${
                    theme === 'light' ? 'bg-white' : 'bg-gray-800'
                  }`}>
                    # general
                  </div>
                  <div className={`py-1 px-2 rounded ${
                    theme === 'light' ? 'hover:bg-gray-100' : 'hover:bg-gray-800'
                  }`}>
                    # engineering
                  </div>
                  <div className={`py-1 px-2 rounded ${
                    theme === 'light' ? 'hover:bg-gray-100' : 'hover:bg-gray-800'
                  }`}>
                    # product
                  </div>
                  <div className={`py-1 px-2 rounded ${
                    theme === 'light' ? 'hover:bg-gray-100' : 'hover:bg-gray-800'
                  }`}>
                    # design
                  </div>
                </div>
              </div>
              
              {/* Pulse AI insights */}
              <div className="flex-1 p-6">
                <div className={`text-center ${
                  theme === 'light' ? 'text-gray-600' : 'text-gray-400'
                }`}>
                  <div className="mb-6">
                    <div className="text-sm font-medium mb-2">Pulse AI is analyzing your workspace...</div>
                    <div className="flex justify-center gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                      <div className="w-2 h-2 bg-primary rounded-full animate-pulse delay-75"></div>
                      <div className="w-2 h-2 bg-primary rounded-full animate-pulse delay-150"></div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className={`p-3 rounded-lg ${
                      theme === 'light' ? 'bg-green-50 border border-green-200' : 'bg-green-900/20 border border-green-800'
                    }`}>
                      <div className="text-2xl mb-1">😊</div>
                      <div className="text-xs">Positive Sentiment</div>
                      <div className="text-lg font-bold text-green-600">78%</div>
                    </div>
                    <div className={`p-3 rounded-lg ${
                      theme === 'light' ? 'bg-blue-50 border border-blue-200' : 'bg-blue-900/20 border border-blue-800'
                    }`}>
                      <div className="text-2xl mb-1">💬</div>
                      <div className="text-xs">Engagement Rate</div>
                      <div className="text-lg font-bold text-blue-600">High</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;