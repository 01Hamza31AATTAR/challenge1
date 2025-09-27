"use client"

import { useParallax } from "./scroll-animations"
import { useMemo } from "react"

interface StarProps {
  id: string
  left: number
  top: number
  size: number
  opacity: number
  animationDelay: number
  color: string
}

export function ParallaxStars() {
  const offset1 = useParallax(0.2)
  const offset2 = useParallax(0.4)
  const offset3 = useParallax(0.6)

  // Memoize star positions to prevent re-renders
  const starsLayer1 = useMemo(() => generateStars(50, 1, 1.5, "white", 0.3), [])
  const starsLayer2 = useMemo(() => generateStars(30, 1.5, 2, "primary", 0.5), [])
  const starsLayer3 = useMemo(() => generateStars(20, 2, 2.5, "accent", 0.6), [])

  function generateStars(
    count: number, 
    minSize: number, 
    maxSize: number, 
    color: string, 
    baseOpacity: number
  ): StarProps[] {
    return Array.from({ length: count }, (_, i) => ({
      id: `star-${i}`,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: minSize + Math.random() * (maxSize - minSize),
      opacity: baseOpacity + (Math.random() * 0.3),
      animationDelay: Math.random() * 3,
      color
    }))
  }

  const Star = ({ star, className = "" }: { star: StarProps; className?: string }) => (
    <div
      className={`absolute rounded-full animate-twinkle ${className}`}
      style={{
        left: `${star.left}%`,
        top: `${star.top}%`,
        width: `${star.size}px`,
        height: `${star.size}px`,
        opacity: star.opacity,
        animationDelay: `${star.animationDelay}s`,
        backgroundColor: star.color.includes('/') ? '' : star.color,
      }}
    />
  )

  return (
    <div className="fixed inset-0 pointer-events-none -z-20 overflow-hidden">
      {/* Layer 1 - Distant stars */}
      <div className="absolute inset-0" style={{ transform: `translateY(${offset1}px)` }}>
        {starsLayer1.map((star) => (
          <Star 
            key={star.id} 
            star={star}
            className="bg-white/30"
          />
        ))}
      </div>

      {/* Layer 2 - Medium stars */}
      <div className="absolute inset-0" style={{ transform: `translateY(${offset2}px)` }}>
        {starsLayer2.map((star) => (
          <Star 
            key={star.id} 
            star={star}
            className="bg-primary/50"
          />
        ))}
      </div>

      {/* Layer 3 - Close stars */}
      <div className="absolute inset-0" style={{ transform: `translateY(${offset3}px)` }}>
        {starsLayer3.map((star) => (
          <Star 
            key={star.id} 
            star={star}
            className="bg-accent/60"
          />
        ))}
      </div>
    </div>
  )
}