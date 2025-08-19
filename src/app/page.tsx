"use client";

import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useMotionTemplate, animate } from "framer-motion";
import { ArrowRight, BarChart3, Heart, Shield, Sparkles, Timer, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// Floating Badge Component
const FloatingBadge: React.FC<{ children: React.ReactNode; className?: string }> = ({ 
  children, 
  className = "" 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: [0, -5, 0] }}
      transition={{ 
        opacity: { duration: 0.6, ease: "easeOut" },
        y: { duration: 2, repeat: Infinity, ease: "easeInOut" }
      }}
      className={`inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 px-4 py-2 text-sm font-medium text-white shadow-lg ${className}`}
    >
      <Sparkles className="h-4 w-4" />
      {children}
    </motion.div>
  );
};

// Glass Button Component
const GlassButton: React.FC<{
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  size?: "sm" | "lg";
  className?: string;
  onClick?: () => void;
}> = ({ children, variant = "primary", size = "lg", className = "", onClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  const baseClasses = "relative overflow-hidden rounded-full font-medium transition-all duration-300 cursor-pointer select-none";
  
  const variantClasses = {
    primary: "bg-white/20 backdrop-blur-xl border border-white/30 text-white hover:bg-white/30 hover:border-white/40",
    secondary: "bg-white/10 backdrop-blur-xl border border-white/20 text-white/90 hover:bg-white/20 hover:text-white hover:border-white/30"
  };

  const sizeClasses = {
    sm: "px-6 py-3 text-sm",
    lg: "px-8 py-4 text-lg"
  };

  const glowIntensity = isHovered ? "0 0 30px rgba(255, 255, 255, 0.3)" : "0 0 15px rgba(255, 255, 255, 0.1)";

  return (
    <motion.button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      style={{ boxShadow: glowIntensity }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
    >
      <span className="relative z-10 flex items-center gap-2">
        {children}
      </span>
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
        initial={{ x: "-100%" }}
        animate={isHovered ? { x: "100%" } : { x: "-100%" }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      />
    </motion.button>
  );
};

export default function Home() {
  const color = useMotionValue("#FF6B6B");

  useEffect(() => {
    animate(color, ["#FF6B6B", "#20B2AA", "#EE82EE", "#FF6B6B"], {
      ease: "easeInOut",
      duration: 10,
      repeat: Infinity,
      repeatType: "loop",
    });
  }, [color]);

  const backgroundGradient = useMotionTemplate`linear-gradient(135deg, ${color} 0%, #20B2AA 50%, #EE82EE 100%)`;

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 w-full backdrop-blur-md bg-white/10 border-b border-white/20 z-50">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Heart className="h-8 w-8 text-white" />
            <span className="text-2xl font-bold font-[family-name:var(--font-display)] text-white">
              Pulse AI
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" className="text-white hover:text-white/80">Features</Button>
            <Button variant="ghost" className="text-white hover:text-white/80">Pricing</Button>
            <Button variant="ghost" className="text-white hover:text-white/80">About</Button>
            <GlassButton variant="primary" size="sm">Get Started</GlassButton>
          </div>
        </div>
      </nav>

      {/* Premium Hero Section */}
      <motion.section
        style={{ background: backgroundGradient }}
        className="relative min-h-screen w-full overflow-hidden flex items-center justify-center"
      >
        {/* Glassmorphism overlay */}
        <div className="absolute inset-0 bg-black/10 backdrop-blur-sm" />
        
        {/* Animated background particles */}
        <div className="absolute inset-0">
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white/30 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        {/* Main content */}
        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center pt-20">
          {/* Floating badge */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <FloatingBadge>
              Powered by AI
            </FloatingBadge>
          </motion.div>

          {/* Main heading */}
          <motion.h1
            className="mb-6 text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-tight"
            style={{ fontFamily: "Space Grotesk, sans-serif" }}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            Understand Your Team's
            <br />
            <span className="bg-gradient-to-r from-white via-white/90 to-white/70 bg-clip-text text-transparent">
              True Sentiment
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="mb-12 text-xl md:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed"
            style={{ fontFamily: "Lato, sans-serif" }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            AI-powered sentiment analysis for Slack and Microsoft Teams. 
            Get instant insights into team health without surveys.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <GlassButton variant="primary" size="lg">
              Start Free Health Check
              <ArrowRight className="h-5 w-5" />
            </GlassButton>
            
            <GlassButton variant="secondary" size="lg">
              Watch Demo
            </GlassButton>
          </motion.div>

          {/* Quick info */}
          <motion.p
            className="mt-8 text-sm text-white/70"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            <Timer className="inline h-4 w-4 mr-1" />
            60-second setup • No credit card required
          </motion.p>
        </div>

        {/* Glassmorphism decorative elements */}
        <motion.div 
          className="absolute top-20 left-20 w-32 h-32 bg-white/10 backdrop-blur-xl rounded-full border border-white/20"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div 
          className="absolute bottom-20 right-20 w-24 h-24 bg-white/10 backdrop-blur-xl rounded-full border border-white/20"
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, -90, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.section>

      {/* Features Section with Glass Cards */}
      <section className="py-20 px-6 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto max-w-6xl">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold font-[family-name:var(--font-display)] mb-4">
              Why Teams Choose Pulse AI
            </h2>
            <p className="text-xl text-muted-foreground">
              Real-time insights that help you build healthier teams
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: BarChart3,
                title: "Instant Analysis",
                description: "Get team sentiment scores in 60 seconds. No surveys, no waiting.",
                color: "text-primary",
                borderColor: "hover:border-primary",
                items: ["Real-time sentiment tracking", "Channel-specific insights", "Historical trend analysis"]
              },
              {
                icon: Shield,
                title: "Privacy First",
                description: "Your data stays secure with enterprise-grade encryption.",
                color: "text-secondary",
                borderColor: "hover:border-secondary",
                items: ["GDPR compliant", "Anonymous analysis", "SOC 2 Type II certified"]
              },
              {
                icon: Users,
                title: "Team Insights",
                description: "Identify burnout risks and celebrate wins automatically.",
                color: "text-accent",
                borderColor: "hover:border-accent",
                items: ["Burnout prediction", "Team mood tracking", "AI recommendations"]
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className={`border-2 transition-all duration-300 hover:shadow-xl bg-white/50 backdrop-blur-sm ${feature.borderColor}`}>
                  <CardHeader>
                    <feature.icon className={`h-12 w-12 ${feature.color} mb-4`} />
                    <CardTitle className="text-2xl">{feature.title}</CardTitle>
                    <CardDescription>{feature.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm">
                      {feature.items.map((item, i) => (
                        <li key={i}>• {item}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works with Animated Steps */}
      <section className="py-20 px-6 bg-muted/50">
        <div className="container mx-auto max-w-6xl">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold font-[family-name:var(--font-display)] mb-4">
              How It Works
            </h2>
            <p className="text-xl text-muted-foreground">
              Three simple steps to healthier teams
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                title: "Connect Your Workspace",
                description: "Securely connect Slack or Teams with one-click OAuth",
                color: "bg-primary/10",
                textColor: "text-primary"
              },
              {
                step: "2",
                title: "AI Analyzes Sentiment",
                description: "Our AI processes messages to understand team dynamics",
                color: "bg-secondary/10",
                textColor: "text-secondary"
              },
              {
                step: "3",
                title: "Get Actionable Insights",
                description: "Receive real-time alerts and recommendations",
                color: "bg-accent/10",
                textColor: "text-accent"
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <motion.div
                  className={`w-16 h-16 ${item.color} rounded-full flex items-center justify-center mx-auto mb-4`}
                  whileHover={{ scale: 1.1, rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <span className={`text-2xl font-bold ${item.textColor}`}>{item.step}</span>
                </motion.div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Premium CTA Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card className="bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 border-2 backdrop-blur-sm">
              <CardContent className="p-12 text-center">
                <h2 className="text-4xl font-bold font-[family-name:var(--font-display)] mb-4">
                  Ready to Build a Healthier Team?
                </h2>
                <p className="text-xl text-muted-foreground mb-8">
                  Join hundreds of teams using Pulse AI to improve culture
                </p>
                <Button size="lg" className="text-lg px-12">
                  Start Your Free Health Check
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <p className="text-sm text-muted-foreground mt-4">
                  Free forever for teams under 10 • No credit card required
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12 px-6 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto max-w-6xl">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Heart className="h-6 w-6 text-primary" />
              <span className="text-lg font-semibold font-[family-name:var(--font-display)]">
                Pulse AI
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2025 Pulse AI. Built with ❤️ by a solopreneur.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}