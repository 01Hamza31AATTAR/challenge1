"use client"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Pause, Play, Volume2, VolumeX } from "lucide-react"

export function AccessibilityControls() {
  const [reducedMotion, setReducedMotion] = useState(false)
  const [soundEnabled, setSoundEnabled] = useState(true)

  useEffect(() => {
    // Check for user's motion preference
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    setReducedMotion(mediaQuery.matches)

    const handleChange = (e: MediaQueryListEvent) => {
      setReducedMotion(e.matches)
    }

    mediaQuery.addEventListener("change", handleChange)
    return () => mediaQuery.removeEventListener("change", handleChange)
  }, [])

  useEffect(() => {
    // Apply reduced motion globally
    if (reducedMotion) {
      document.documentElement.style.setProperty("--animation-duration", "0.01s")
    } else {
      document.documentElement.style.removeProperty("--animation-duration")
    }
  }, [reducedMotion])

  return (
    <div className="fixed top-4 right-4 z-50 flex gap-2">
      <Button
        size="sm"
        variant="outline"
        className="bg-card/80 backdrop-blur-sm border-border/50"
        onClick={() => setReducedMotion(!reducedMotion)}
        aria-label={reducedMotion ? "Enable animations" : "Disable animations"}
      >
        {reducedMotion ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
      </Button>

      <Button
        size="sm"
        variant="outline"
        className="bg-card/80 backdrop-blur-sm border-border/50"
        onClick={() => setSoundEnabled(!soundEnabled)}
        aria-label={soundEnabled ? "Mute sounds" : "Enable sounds"}
      >
        {soundEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
      </Button>
    </div>
  )
}

// Enhanced focus management for keyboard navigation
export function useFocusManagement() {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Skip to main content with Alt+S
      if (e.altKey && e.key === "s") {
        e.preventDefault()
        const main = document.querySelector("main") || document.querySelector('[role="main"]')
        if (main) {
          ;(main as HTMLElement).focus()
        }
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [])
}
