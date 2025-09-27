"use client"

import type React from "react"

import { useScrollProgress } from "./scroll-animations"

interface SectionTransitionProps {
  children: React.ReactNode
  className?: string
  gradientFrom?: string
  gradientTo?: string
}

export function SectionTransition({
  children,
  className = "",
  gradientFrom = "transparent",
  gradientTo = "background/80",
}: SectionTransitionProps) {
  const { scrollProgress } = useScrollProgress()

  return (
    <div className={`relative ${className}`}>
      {/* Dynamic gradient overlay based on scroll */}
      <div
        className={`absolute inset-0 bg-gradient-to-b from-${gradientFrom} to-${gradientTo} transition-opacity duration-1000`}
        style={{
          opacity: Math.min(scrollProgress * 1.5, 0.9),
        }}
      />

      {/* Content */}
      <div className="relative z-10">{children}</div>

      {/* Floating cosmic dust particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-primary/20 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.8}s`,
              animationDuration: `${4 + Math.random() * 3}s`,
            }}
          />
        ))}
      </div>
    </div>
  )
}
