"use client";

import React from "react";
import Image from "next/image";

interface CircularAvatarProps {
  src: string;
  alt: string;
  bgColor: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeClasses = {
  sm: "w-16 h-16",
  md: "w-24 h-24",
  lg: "w-32 h-32",
};

export const CircularAvatar: React.FC<CircularAvatarProps> = ({
  src,
  alt,
  bgColor,
  size = "md",
  className = "",
}) => {
  return (
    <div
      className={`relative ${sizeClasses[size]} rounded-full ${bgColor} p-1 shadow-lg hover:shadow-xl transition-all duration-300 ${className}`}
    >
      <div className="w-full h-full rounded-full overflow-hidden bg-white p-0.5">
        <Image
          src={src}
          alt={alt}
          width={size === "sm" ? 64 : size === "md" ? 96 : 128}
          height={size === "sm" ? 64 : size === "md" ? 96 : 128}
          className="w-full h-full rounded-full object-cover"
        />
      </div>
    </div>
  );
};