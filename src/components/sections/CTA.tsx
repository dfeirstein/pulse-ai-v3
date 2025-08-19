"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";

const CTA: React.FC = () => {
  const { theme } = useTheme();
  const [email, setEmail] = useState("");
  const [workspaceName, setWorkspaceName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate submission
    setTimeout(() => {
      setIsSubmitting(false);
      alert("Thank you! Check your email for your Slack integration link.");
      setEmail("");
      setWorkspaceName("");
    }, 1000);
  };
  
  return (
    <section className={`py-24 px-6 relative overflow-hidden transition-colors duration-300 ${
      theme === 'light' 
        ? 'bg-gradient-to-br from-primary/5 via-white to-secondary/5' 
        : 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900'
    }`}>
      <div className="container mx-auto max-w-4xl relative z-10">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {/* Slack Integration Badge */}
          <div className="flex justify-center mb-8">
            <div className={`inline-flex items-center gap-3 px-5 py-3 rounded-full ${
              theme === 'light'
                ? 'bg-[#4A154B]/10 border border-[#4A154B]/20'
                : 'bg-[#4A154B]/20 border border-[#4A154B]/30'
            }`}>
              <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zM6.313 15.165a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313z" fill="#E01E5A"/>
                <path d="M8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.527 2.527 0 0 1 2.521 2.522v2.52H8.834zM8.834 6.313a2.527 2.527 0 0 1 2.521 2.521 2.527 2.527 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312z" fill="#36C5F0"/>
                <path d="M18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.527 2.527 0 0 1-2.522 2.521h-2.522V8.834zM17.688 8.834a2.527 2.527 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.528 2.528 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.312z" fill="#2EB67D"/>
                <path d="M15.165 18.956a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.52-2.522v-2.522h2.52zM15.165 17.688a2.527 2.527 0 0 1-2.52-2.523 2.527 2.527 0 0 1 2.52-2.52h6.313A2.528 2.528 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.523h-6.313z" fill="#ECB22E"/>
              </svg>
              <span className="font-semibold text-[#4A154B]">Slack App Directory Partner</span>
            </div>
          </div>

          {/* Main Headline */}
          <h2 className={`text-4xl md:text-5xl font-black mb-4 ${
            theme === 'light' ? 'text-gray-900' : 'text-white'
          }`}>
            Connect Your Slack Workspace
          </h2>
          
          <p className={`text-xl mb-12 max-w-2xl mx-auto ${
            theme === 'light' ? 'text-gray-600' : 'text-gray-300'
          }`}>
            Join 50+ teams using Pulse AI to understand their team dynamics through Slack.
          </p>

          {/* Form Card */}
          <motion.div
            className={`max-w-md mx-auto p-8 rounded-xl shadow-lg ${
              theme === 'light' 
                ? 'bg-white border border-gray-200' 
                : 'bg-gray-800 border border-gray-700'
            }`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Input */}
              <div className="text-left">
                <label htmlFor="email" className={`block text-sm font-medium mb-2 ${
                  theme === 'light' ? 'text-gray-700' : 'text-gray-300'
                }`}>
                  Work Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  required
                  className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                    theme === 'light' 
                      ? 'bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:border-[#4A154B] focus:ring-1 focus:ring-[#4A154B]' 
                      : 'bg-gray-900 border-gray-600 text-white placeholder-gray-400 focus:border-[#4A154B] focus:ring-1 focus:ring-[#4A154B]'
                  }`}
                />
              </div>

              {/* Slack Workspace Name */}
              <div className="text-left">
                <label htmlFor="workspaceName" className={`block text-sm font-medium mb-2 ${
                  theme === 'light' ? 'text-gray-700' : 'text-gray-300'
                }`}>
                  Slack Workspace Name
                </label>
                <input
                  type="text"
                  id="workspaceName"
                  value={workspaceName}
                  onChange={(e) => setWorkspaceName(e.target.value)}
                  placeholder="your-workspace"
                  required
                  className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                    theme === 'light' 
                      ? 'bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:border-[#4A154B] focus:ring-1 focus:ring-[#4A154B]' 
                      : 'bg-gray-900 border-gray-600 text-white placeholder-gray-400 focus:border-[#4A154B] focus:ring-1 focus:ring-[#4A154B]'
                  }`}
                />
                <p className={`mt-1 text-xs ${
                  theme === 'light' ? 'text-gray-500' : 'text-gray-400'
                }`}>
                  e.g., yourworkspace.slack.com
                </p>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-6 py-4 bg-[#4A154B] text-white font-semibold text-lg rounded-lg hover:bg-[#611f69] transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 group"
              >
                {isSubmitting ? (
                  "Processing..."
                ) : (
                  <>
                    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zM6.313 15.165a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313z" fill="#E01E5A"/>
                      <path d="M8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.527 2.527 0 0 1 2.521 2.522v2.52H8.834zM8.834 6.313a2.527 2.527 0 0 1 2.521 2.521 2.527 2.527 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312z" fill="#36C5F0"/>
                      <path d="M18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.527 2.527 0 0 1-2.522 2.521h-2.522V8.834zM17.688 8.834a2.527 2.527 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.528 2.528 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.312z" fill="#2EB67D"/>
                      <path d="M15.165 18.956a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.52-2.522v-2.522h2.52zM15.165 17.688a2.527 2.527 0 0 1-2.52-2.523 2.527 2.527 0 0 1 2.52-2.52h6.313A2.528 2.528 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.523h-6.313z" fill="#ECB22E"/>
                    </svg>
                    Connect with Slack
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>

            {/* Trust Indicators */}
            <div className={`mt-6 pt-6 border-t space-y-3 ${
              theme === 'light' ? 'border-gray-200' : 'border-gray-700'
            }`}>
              <div className={`flex items-center gap-2 text-sm ${
                theme === 'light' ? 'text-gray-600' : 'text-gray-400'
              }`}>
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>Read-only access to public channels</span>
              </div>
              <div className={`flex items-center gap-2 text-sm ${
                theme === 'light' ? 'text-gray-600' : 'text-gray-400'
              }`}>
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>SOC 2 Type II certified</span>
              </div>
              <div className={`flex items-center gap-2 text-sm ${
                theme === 'light' ? 'text-gray-600' : 'text-gray-400'
              }`}>
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>30-second setup, instant insights</span>
              </div>
            </div>
          </motion.div>

          {/* Slack Partnership Note */}
          <motion.div
            className="mt-8 flex items-center justify-center gap-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className={`text-xs ${
              theme === 'light' ? 'text-gray-500' : 'text-gray-400'
            }`}>
              Official Slack App • Verified by Slack • Enterprise Ready
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTA;