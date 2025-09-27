"use client"

import type { ReactNode } from "react"
import { useInView } from "./scroll-animations"

interface AnimatedSectionProps {
  children: ReactNode
  className?: string
  animation?: "fade-up" | "fade-down" | "fade-left" | "fade-right" | "scale-up"
  delay?: number
}

export function AnimatedSection({ children, className = "", animation = "fade-up", delay = 0 }: AnimatedSectionProps) {
  const [ref, isInView] = useInView(0.2)

  const getAnimationClasses = () => {
    const baseClasses = "transition-all duration-1000 ease-out"

    if (!isInView) {
      switch (animation) {
        case "fade-up":
          return `${baseClasses} opacity-0 translate-y-12`
        case "fade-down":
          return `${baseClasses} opacity-0 -translate-y-12`
        case "fade-left":
          return `${baseClasses} opacity-0 translate-x-12`
        case "fade-right":
          return `${baseClasses} opacity-0 -translate-x-12`
        case "scale-up":
          return `${baseClasses} opacity-0 scale-95`
        default:
          return `${baseClasses} opacity-0 translate-y-12`
      }
    }

    return `${baseClasses} opacity-100 translate-y-0 translate-x-0 scale-100`
  }

  return (
    <div ref={ref} className={`${getAnimationClasses()} ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  )
}
