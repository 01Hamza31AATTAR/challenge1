"use client"
import { memo, useMemo, lazy, Suspense } from "react"
import { useIntersectionObserver } from "@/hooks/use-intersection-observer"

// Lazy load heavy 3D components
const LazyGalaxyScene = lazy(() => import("./galaxy-scene").then((module) => ({ default: module.GalaxyScene })))

// Memoized particle system for better performance
export const OptimizedParticles = memo(({ count = 100, speed = 0.5 }: { count?: number; speed?: number }) => {
  const particles = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 1,
        opacity: Math.random() * 0.8 + 0.2,
        speed: Math.random() * speed + 0.1,
      })),
    [count, speed],
  )

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute rounded-full bg-primary/30 animate-float"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            opacity: particle.opacity,
            animationDuration: `${20 / particle.speed}s`,
            animationDelay: `${particle.id * 0.1}s`,
          }}
        />
      ))}
    </div>
  )
})

OptimizedParticles.displayName = "OptimizedParticles"

// Intersection observer hook for performance
export const useInViewport = (threshold = 0.1) => {
  return useIntersectionObserver({ threshold })
}

// Optimized Galaxy Scene with lazy loading
export const OptimizedGalaxyScene = memo(({ scrollProgress }: { scrollProgress: number }) => {
  return (
    <Suspense
      fallback={
        <div className="fixed inset-0 bg-gradient-to-b from-background via-background/80 to-background flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      }
    >
      <LazyGalaxyScene scrollProgress={scrollProgress} />
    </Suspense>
  )
})

OptimizedGalaxyScene.displayName = "OptimizedGalaxyScene"
