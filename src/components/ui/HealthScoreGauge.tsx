"use client";

import React, { useEffect, useState } from "react";

interface HealthScoreGaugeProps {
  score: number;
  label: string;
  color?: string;
  size?: "sm" | "md" | "lg";
  animate?: boolean;
}

const sizeConfig = {
  sm: { width: 48, height: 48, radius: 20, strokeWidth: 3, fontSize: "text-xs" },
  md: { width: 64, height: 64, radius: 28, strokeWidth: 4, fontSize: "text-sm" },
  lg: { width: 80, height: 80, radius: 36, strokeWidth: 5, fontSize: "text-base" },
};

export const HealthScoreGauge: React.FC<HealthScoreGaugeProps> = ({
  score,
  label,
  color = "#10B981",
  size = "md",
  animate = true,
}) => {
  const [animatedScore, setAnimatedScore] = useState(animate ? 0 : score);
  const config = sizeConfig[size];
  const circumference = 2 * Math.PI * config.radius;
  const strokeDashoffset = circumference - (animatedScore / 100) * circumference;

  useEffect(() => {
    if (animate) {
      const timer = setTimeout(() => {
        setAnimatedScore(score);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [score, animate]);

  const getScoreColor = (score: number) => {
    if (score >= 80) return "#10B981"; // Green
    if (score >= 60) return "#F59E0B"; // Orange
    return "#EF4444"; // Red
  };

  const displayColor = color === "auto" ? getScoreColor(score) : color;

  return (
    <div className="flex flex-col items-center">
      <div className="relative" style={{ width: config.width, height: config.height }}>
        <svg
          className="transform -rotate-90"
          width={config.width}
          height={config.height}
        >
          {/* Background circle */}
          <circle
            cx={config.width / 2}
            cy={config.height / 2}
            r={config.radius}
            fill="none"
            stroke="currentColor"
            strokeWidth={config.strokeWidth}
            className="text-gray-200"
          />
          {/* Progress circle */}
          <circle
            cx={config.width / 2}
            cy={config.height / 2}
            r={config.radius}
            fill="none"
            stroke={displayColor}
            strokeWidth={config.strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={`${config.fontSize} font-bold text-gray-900`}>
            {Math.round(animatedScore)}%
          </span>
        </div>
      </div>
      <span className={`${config.fontSize} text-gray-600 mt-1 text-center`}>
        {label}
      </span>
    </div>
  );
};