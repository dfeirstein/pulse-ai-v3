"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

interface SplitTextProps {
  children: string;
  className?: string;
  delay?: number;
}

const SplitText: React.FC<SplitTextProps> = ({ 
  children, 
  className = "", 
  delay = 0 
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const chars = containerRef.current.querySelectorAll('.char');
    
    gsap.fromTo(chars,
      {
        opacity: 0,
        rotateX: 90,
        y: 50,
      },
      {
        opacity: 1,
        rotateX: 0,
        y: 0,
        duration: 0.8,
        ease: "elastic.out(1, 0.3)",
        stagger: 0.02,
        delay: delay,
      }
    );
  }, [delay]);

  return (
    <div ref={containerRef} className={`inline-block ${className}`}>
      {children.split('').map((char, index) => (
        <span
          key={index}
          className="char inline-block"
          style={{ 
            display: 'inline-block',
            transformStyle: 'preserve-3d',
            perspective: '1000px',
            opacity: 0,
            transform: 'rotateX(90deg) translateY(50px)'
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </div>
  );
};

export default SplitText;