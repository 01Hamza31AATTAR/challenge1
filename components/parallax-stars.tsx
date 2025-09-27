"use client"

import { useParallax } from "./scroll-animations"

export function ParallaxStars() {
  const offset1 = useParallax(0.2)
  const offset2 = useParallax(0.4)
  const offset3 = useParallax(0.6)

  return (
    <div className="fixed inset-0 pointer-events-none -z-20">
      {/* Layer 1 - Distant stars */}
      <div className="absolute inset-0" style={{ transform: `translateY(${offset1}px)` }}>
        {Array.from({ length: 50 }).map((_, i) => (
          <div
            key={`star1-${i}`}
            className="absolute w-1 h-1 bg-white/30 rounded-full animate-twinkle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      {/* Layer 2 - Medium stars */}
      <div className="absolute inset-0" style={{ transform: `translateY(${offset2}px)` }}>
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={`star2-${i}`}
            className="absolute w-1.5 h-1.5 bg-primary/50 rounded-full animate-twinkle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Layer 3 - Close stars */}
      <div className="absolute inset-0" style={{ transform: `translateY(${offset3}px)` }}>
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={`star3-${i}`}
            className="absolute w-2 h-2 bg-accent/60 rounded-full animate-twinkle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 1.5}s`,
            }}
          />
        ))}
      </div>
    </div>
  )
}
