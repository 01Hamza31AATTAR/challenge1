"use client"

import { useEffect, useRef, memo, useMemo, lazy, Suspense, useState } from "react"
import * as THREE from "three"

interface GalaxySceneProps {
  scrollProgress?: number
}

export function GalaxyScene({ scrollProgress }: GalaxySceneProps) {
  const mountRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<THREE.Scene>()
  const rendererRef = useRef<THREE.WebGLRenderer>()
  const galaxyRef = useRef<THREE.Group>()
  const animationRef = useRef<number>()
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    if (!isClient || !mountRef.current) return

    // Scene setup
    const scene = new THREE.Scene()
    sceneRef.current = scene

    // Camera setup
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    camera.position.z = 5

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setClearColor(0x000000, 0)
    rendererRef.current = renderer
    mountRef.current.appendChild(renderer.domElement)

    // Galaxy group
    const galaxy = new THREE.Group()
    galaxyRef.current = galaxy
    scene.add(galaxy)

    // Create stars with deterministic randomness for SSR safety
    const createGalaxy = () => {
      const starGeometry = new THREE.BufferGeometry()
      const starCount = 2000
      const positions = new Float32Array(starCount * 3)
      const colors = new Float32Array(starCount * 3)

      // Deterministic random function
      const deterministicRandom = (seed: number) => {
        const x = Math.sin(seed * 987.654) * 10000
        return x - Math.floor(x)
      }

      for (let i = 0; i < starCount; i++) {
        const rand1 = deterministicRandom(i)
        const rand2 = deterministicRandom(i + 1000)
        const rand3 = deterministicRandom(i + 2000)
        
        // Position stars in a spiral galaxy pattern
        const radius = rand1 * 15
        const angle = rand2 * Math.PI * 2
        const height = (rand3 - 0.5) * 2

        positions[i * 3] = Math.cos(angle) * radius
        positions[i * 3 + 1] = height
        positions[i * 3 + 2] = Math.sin(angle) * radius

        // Color variation for stars
        const colorChoice = deterministicRandom(i + 3000)
        if (colorChoice < 0.3) {
          // Blue stars
          colors[i * 3] = 0.4
          colors[i * 3 + 1] = 0.6
          colors[i * 3 + 2] = 1
        } else if (colorChoice < 0.6) {
          // White stars
          colors[i * 3] = 1
          colors[i * 3 + 1] = 1
          colors[i * 3 + 2] = 1
        } else {
          // Pink/purple stars
          colors[i * 3] = 1
          colors[i * 3 + 1] = 0.4
          colors[i * 3 + 2] = 0.8
        }
      }

      starGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3))
      starGeometry.setAttribute("color", new THREE.BufferAttribute(colors, 3))

      const starMaterial = new THREE.PointsMaterial({
        size: 0.05,
        vertexColors: true,
        transparent: true,
        opacity: 0.8,
      })

      const stars = new THREE.Points(starGeometry, starMaterial)
      return stars
    }

    const stars = createGalaxy()
    galaxy.add(stars)

    // Create nebula clouds with deterministic randomness
    const createNebula = () => {
      const nebulaGeometry = new THREE.BufferGeometry()
      const nebulaCount = 500
      const nebulaPositions = new Float32Array(nebulaCount * 3)
      const nebulaColors = new Float32Array(nebulaCount * 3)

      const deterministicRandom = (seed: number) => {
        const x = Math.sin(seed * 123.456) * 10000
        return x - Math.floor(x)
      }

      for (let i = 0; i < nebulaCount; i++) {
        const rand1 = deterministicRandom(i)
        const rand2 = deterministicRandom(i + 500)
        const rand3 = deterministicRandom(i + 1000)

        const radius = rand1 * 12
        const angle = rand2 * Math.PI * 2
        const height = (rand3 - 0.5) * 1.5

        nebulaPositions[i * 3] = Math.cos(angle) * radius
        nebulaPositions[i * 3 + 1] = height
        nebulaPositions[i * 3 + 2] = Math.sin(angle) * radius

        // Nebula colors (purple and pink)
        const colorChoice = deterministicRandom(i + 1500)
        if (colorChoice < 0.5) {
          nebulaColors[i * 3] = 0.8
          nebulaColors[i * 3 + 1] = 0.2
          nebulaColors[i * 3 + 2] = 1
        } else {
          nebulaColors[i * 3] = 1
          nebulaColors[i * 3 + 1] = 0.2
          nebulaColors[i * 3 + 2] = 0.6
        }
      }

      nebulaGeometry.setAttribute("position", new THREE.BufferAttribute(nebulaPositions, 3))
      nebulaGeometry.setAttribute("color", new THREE.BufferAttribute(nebulaColors, 3))

      const nebulaMaterial = new THREE.PointsMaterial({
        size: 0.2,
        vertexColors: true,
        transparent: true,
        opacity: 0.3,
        blending: THREE.AdditiveBlending,
      })

      return new THREE.Points(nebulaGeometry, nebulaMaterial)
    }

    const nebula = createNebula()
    galaxy.add(nebula)

    // Animation loop
    const animate = () => {
      animationRef.current = requestAnimationFrame(animate)

      if (galaxyRef.current) {
        const constantSpeed = 0.002
        galaxyRef.current.rotation.y += constantSpeed
        galaxyRef.current.rotation.x += constantSpeed * 0.3
      }

      renderer.render(scene, camera)
    }
    animate()

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }
    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement)
      }
      renderer.dispose()
    }
  }, [isClient])

  if (!isClient) {
    return (
      <div
        className="fixed inset-0 -z-10"
        style={{
          background: "radial-gradient(ellipse at center, rgba(66, 41, 108, 0.3) 0%, rgba(13, 13, 35, 0.8) 100%)",
        }}
      />
    )
  }

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 -z-10"
      style={{
        background: "radial-gradient(ellipse at center, rgba(66, 41, 108, 0.3) 0%, rgba(13, 13, 35, 0.8) 100%)",
      }}
    />
  )
}

// Optimized version with SSR safety
export const OptimizedParticles = memo(({ count = 100, speed = 0.5 }: { count?: number; speed?: number }) => {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const particles = useMemo(() => {
    if (!isClient) return []

    const deterministicRandom = (seed: number) => {
      const x = Math.sin(seed * 987.654) * 10000
      return x - Math.floor(x)
    }

    return Array.from({ length: count }, (_, i) => ({
      id: i,
      x: deterministicRandom(i) * 100,
      y: deterministicRandom(i + count) * 100,
      size: deterministicRandom(i + count * 2) * 3 + 1,
      opacity: deterministicRandom(i + count * 3) * 0.8 + 0.2,
      speed: deterministicRandom(i + count * 4) * speed + 0.1,
    }))
  }, [count, speed, isClient])

  if (!isClient) {
    return null
  }

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

// Lazy load the galaxy scene for better performance
const LazyGalaxyScene = lazy(() => Promise.resolve({ default: GalaxyScene }))

export const OptimizedGalaxyScene = memo(({ scrollProgress }: { scrollProgress?: number }) => {
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