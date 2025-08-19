"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useMotionTemplate, animate, useScroll, useTransform } from "framer-motion";
import { ArrowRight, BarChart3, Heart, Shield, Sparkles, Timer, Users, Zap, Brain, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useInView } from "react-intersection-observer";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Aurora Background Component
const AuroraBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const particles: Array<{ x: number; y: number; vx: number; vy: number; life: number; maxLife: number }> = [];
    const colors = ['#FF6B6B', '#20B2AA', '#EE82EE', '#FFA500', '#87CEEB'];

    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        life: Math.random() * 100,
        maxLife: 100
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle, index) => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.life += 0.5;

        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

        if (particle.life > particle.maxLife) {
          particle.life = 0;
          particle.x = Math.random() * canvas.width;
          particle.y = Math.random() * canvas.height;
        }

        const alpha = 1 - (particle.life / particle.maxLife);
        const color = colors[index % colors.length];
        
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = color + Math.floor(alpha * 255).toString(16).padStart(2, '0');
        ctx.fill();

        // Connect nearby particles
        particles.forEach((otherParticle, otherIndex) => {
          if (index !== otherIndex) {
            const distance = Math.sqrt(
              Math.pow(particle.x - otherParticle.x, 2) + 
              Math.pow(particle.y - otherParticle.y, 2)
            );

            if (distance < 100) {
              ctx.beginPath();
              ctx.moveTo(particle.x, particle.y);
              ctx.lineTo(otherParticle.x, otherParticle.y);
              ctx.strokeStyle = color + '20';
              ctx.lineWidth = 1;
              ctx.stroke();
            }
          }
        });
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ mixBlendMode: 'screen' }}
    />
  );
};

// Split Text Animation Component
const SplitText: React.FC<{ children: string; className?: string; delay?: number }> = ({ 
  children, 
  className = "", 
  delay = 0 
}) => {
  const [ref, inView] = useInView({ threshold: 0.1 });
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (inView && textRef.current) {
      const chars = textRef.current.querySelectorAll('.char');
      gsap.fromTo(chars, 
        { 
          opacity: 0, 
          y: 50,
          rotateX: -90
        },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 0.8,
          ease: "back.out(1.7)",
          stagger: 0.02,
          delay: delay
        }
      );
    }
  }, [inView, delay]);

  return (
    <div ref={ref} className={className}>
      <div ref={textRef} className="inline-block">
        {children.split('').map((char, index) => (
          <span 
            key={index} 
            className="char inline-block"
            style={{ transformOrigin: '50% 100%' }}
          >
            {char === ' ' ? '\u00A0' : char}
          </span>
        ))}
      </div>
    </div>
  );
};

// Magnetic Button Component
const MagneticButton: React.FC<{
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary";
  size?: "sm" | "lg";
  onClick?: () => void;
}> = ({ children, className = "", variant = "primary", size = "lg", onClick }) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!buttonRef.current) return;
    
    const rect = buttonRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const deltaX = e.clientX - centerX;
    const deltaY = e.clientY - centerY;
    
    setMousePosition({ x: deltaX * 0.1, y: deltaY * 0.1 });
  };

  const handleMouseLeave = () => {
    setMousePosition({ x: 0, y: 0 });
  };

  const baseClasses = "relative overflow-hidden rounded-full font-medium transition-all duration-500 cursor-pointer select-none group";
  
  const variantClasses = {
    primary: "bg-gradient-to-r from-[#FF6B6B] via-[#20B2AA] to-[#EE82EE] text-white hover:shadow-2xl hover:shadow-[#FF6B6B]/25",
    secondary: "bg-white/10 backdrop-blur-xl border border-white/30 text-white hover:bg-white/20 hover:border-white/50"
  };

  const sizeClasses = {
    sm: "px-6 py-3 text-sm",
    lg: "px-10 py-5 text-lg"
  };

  return (
    <motion.button
      ref={buttonRef}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      animate={{
        x: mousePosition.x,
        y: mousePosition.y
      }}
      transition={{ type: "spring", stiffness: 150, damping: 15 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <span className="relative z-10 flex items-center gap-2">
        {children}
      </span>
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0"
        initial={{ x: "-100%" }}
        animate={{ x: "100%" }}
        transition={{ 
          repeat: Infinity, 
          duration: 3, 
          ease: "linear",
          repeatType: "loop"
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </motion.button>
  );
};

// Floating Orb Component
const FloatingOrb: React.FC<{ delay?: number; size?: number; color?: string }> = ({ 
  delay = 0, 
  size = 100, 
  color = "#FF6B6B" 
}) => {
  const [dimensions, setDimensions] = useState({ width: 1920, height: 1080 });
  
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setDimensions({ width: window.innerWidth, height: window.innerHeight });
      const handleResize = () => {
        setDimensions({ width: window.innerWidth, height: window.innerHeight });
      };
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  return (
    <motion.div
      className="absolute rounded-full blur-xl"
      style={{
        width: size,
        height: size,
        background: `radial-gradient(circle, ${color}40 0%, ${color}20 50%, transparent 100%)`
      }}
      initial={{ 
        x: Math.random() * dimensions.width,
        y: Math.random() * dimensions.height,
        scale: 0
      }}
      animate={{
        x: [
          Math.random() * dimensions.width,
          Math.random() * dimensions.width,
          Math.random() * dimensions.width
        ],
        y: [
          Math.random() * dimensions.height,
          Math.random() * dimensions.height,
          Math.random() * dimensions.height
        ],
        scale: [0, 1, 0.5, 1]
      }}
      transition={{
        duration: 20 + Math.random() * 10,
        repeat: Infinity,
        ease: "easeInOut",
        delay: delay
      }}
    />
  );
};

// 3D Card Component
const Card3D: React.FC<{
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
}> = ({ children, className = "", glowColor = "#FF6B6B" }) => {
  const [ref, inView] = useInView({ threshold: 0.1 });
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const rotateXValue = (e.clientY - centerY) / 10;
    const rotateYValue = (centerX - e.clientX) / 10;
    
    setRotateX(rotateXValue);
    setRotateY(rotateYValue);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      ref={ref}
      className={`relative group perspective-1000 ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6 }}
    >
      <motion.div
        className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8 transform-gpu transition-all duration-300 hover:shadow-2xl"
        style={{
          transformStyle: "preserve-3d",
          boxShadow: `0 20px 40px ${glowColor}20, 0 0 0 1px ${glowColor}10`
        }}
        animate={{
          rotateX: rotateX,
          rotateY: rotateY
        }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
      >
        {children}
        <div 
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `linear-gradient(135deg, ${glowColor}10, transparent 50%, ${glowColor}05)`
          }}
        />
      </motion.div>
    </motion.div>
  );
};

export default function Home() {
  const { scrollYProgress } = useScroll();
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "200%"]);

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Cursor Trail Effect */}
      <div className="fixed inset-0 pointer-events-none z-40">
        <div className="absolute inset-0 bg-gradient-to-br from-[#FF6B6B]/20 via-[#20B2AA]/20 to-[#EE82EE]/20 opacity-30" />
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 w-full backdrop-blur-2xl bg-black/20 border-b border-white/10 z-50">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <motion.div 
            className="flex items-center space-x-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <Heart className="h-8 w-8 text-[#FF6B6B]" />
            </motion.div>
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

      {/* Revolutionary Hero Section */}
      <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden">
        {/* Aurora Background */}
        <AuroraBackground />
        
        {/* Floating Orbs */}
        <div className="absolute inset-0">
          <FloatingOrb delay={0} size={120} color="#FF6B6B" />
          <FloatingOrb delay={2} size={80} color="#20B2AA" />
          <FloatingOrb delay={4} size={100} color="#EE82EE" />
          <FloatingOrb delay={6} size={60} color="#FFA500" />
          <FloatingOrb delay={8} size={90} color="#87CEEB" />
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
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              >
                <Brain className="h-5 w-5 text-[#20B2AA]" />
              </motion.div>
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

      {/* Next-Gen Features Section */}
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
            {[
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
            ].map((feature, index) => (
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

      {/* Revolutionary Process Section */}
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
            <SplitText 
              className="text-5xl md:text-6xl font-black mb-6 text-white"
              delay={0.2}
            >
              How The Magic Happens
            </SplitText>
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
            {[
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
            ].map((item, index) => (
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

      {/* Epic CTA Section */}
      <section className="py-32 px-6 bg-black relative overflow-hidden">
        {/* Aurora Background for CTA */}
        <div className="absolute inset-0">
          <AuroraBackground />
        </div>
        
        {/* Floating Orbs for CTA */}
        <div className="absolute inset-0">
          <FloatingOrb delay={0} size={150} color="#FF6B6B" />
          <FloatingOrb delay={3} size={100} color="#20B2AA" />
          <FloatingOrb delay={6} size={120} color="#EE82EE" />
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

      {/* Futuristic Footer */}
      <footer className="border-t border-white/10 py-16 px-6 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto max-w-6xl">
          <motion.div 
            className="flex flex-col md:flex-row justify-between items-center gap-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center space-x-3">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <Heart className="h-8 w-8 text-[#FF6B6B]" />
              </motion.div>
              <span className="text-2xl font-bold text-white">
                Pulse AI
              </span>
            </div>
            <p className="text-white/60">
              © 2025 Pulse AI. Crafted with ❤️ for the future of teamwork.
            </p>
          </motion.div>
        </div>
      </footer>
    </div>
  );
}