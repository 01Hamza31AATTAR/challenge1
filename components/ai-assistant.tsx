"use client"

import type React from "react"

import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Bot, X, Sparkles, ArrowDown, Users } from "lucide-react"
import { useScrollProgress } from "./scroll-animations"

interface Message {
  id: number
  text: string
  icon?: React.ReactNode
  trigger?: "scroll" | "time" | "section"
  scrollThreshold?: number
  delay?: number
}

export function AIAssistant() {
  const [isVisible, setIsVisible] = useState(true)
  const [showMessage, setShowMessage] = useState(false)
  const [currentMessage, setCurrentMessage] = useState<Message | null>(null)
  const [messageHistory, setMessageHistory] = useState<number[]>([])
  const [isAnimating, setIsAnimating] = useState(false)
  const { scrollProgress } = useScrollProgress()

  const messages: Message[] = [
    {
      id: 1,
      text: "Welcome to our cosmic journey! I'm your AI guide through this galaxy.",
      icon: <Sparkles className="h-4 w-4" />,
      trigger: "time",
      delay: 2000,
    },
    {
      id: 2,
      text: "Scroll down to see the galaxy respond to your movement!",
      icon: <ArrowDown className="h-4 w-4" />,
      trigger: "time",
      delay: 6000,
    },
    {
      id: 3,
      text: "Amazing! The galaxy is spinning faster as you explore. Keep scrolling!",
      trigger: "scroll",
      scrollThreshold: 0.1,
    },
    {
      id: 4,
      text: "You've discovered our mission section! We're building the future of digital experiences.",
      trigger: "scroll",
      scrollThreshold: 0.3,
    },
    {
      id: 5,
      text: "Welcome to our About section! Learn more about our cosmic vision.",
      icon: <Users className="h-4 w-4" />,
      trigger: "scroll",
      scrollThreshold: 0.7,
    },
    {
      id: 6,
      text: "You've explored the entire galaxy! Use the menu to navigate or start your own journey.",
      trigger: "scroll",
      scrollThreshold: 0.9,
    },
  ]

  const showMessageWithAnimation = useCallback(
    (message: Message) => {
      if (messageHistory.includes(message.id)) return

      setIsAnimating(true)
      setCurrentMessage(message)
      setShowMessage(true)
      setMessageHistory((prev) => [...prev, message.id])

      setTimeout(() => setIsAnimating(false), 300)

      // Auto-hide message after 5 seconds
      setTimeout(() => {
        setShowMessage(false)
        setCurrentMessage(null)
      }, 5000)
    },
    [messageHistory],
  )

  // Handle time-based messages
  useEffect(() => {
    const timeMessages = messages.filter((msg) => msg.trigger === "time")

    timeMessages.forEach((message) => {
      if (message.delay) {
        setTimeout(() => {
          showMessageWithAnimation(message)
        }, message.delay)
      }
    })
  }, [showMessageWithAnimation, messages])

  // Handle scroll-based messages
  useEffect(() => {
    const scrollMessages = messages.filter((msg) => msg.trigger === "scroll")

    scrollMessages.forEach((message) => {
      if (message.scrollThreshold && scrollProgress >= message.scrollThreshold) {
        showMessageWithAnimation(message)
      }
    })
  }, [scrollProgress, showMessageWithAnimation, messages])

  const handleAssistantClick = () => {
    if (showMessage) {
      setShowMessage(false)
      setCurrentMessage(null)
    } else {
      // Show a contextual message based on scroll position
      let contextualMessage: Message

      if (scrollProgress < 0.1) {
        contextualMessage = {
          id: 999,
          text: "Try scrolling to see the galaxy come alive! The stars will dance as you explore.",
          icon: <ArrowDown className="h-4 w-4" />,
          trigger: "time",
        }
      } else if (scrollProgress < 0.5) {
        contextualMessage = {
          id: 998,
          text: "You're doing great! The galaxy is responding beautifully to your exploration.",
          icon: <Sparkles className="h-4 w-4" />,
          trigger: "time",
        }
      } else {
        contextualMessage = {
          id: 997,
          text: "You've mastered the cosmic navigation! Feel free to explore more or use the menu.",
          icon: <Users className="h-4 w-4" />,
          trigger: "time",
        }
      }

      setCurrentMessage(contextualMessage)
      setShowMessage(true)

      setTimeout(() => {
        setShowMessage(false)
        setCurrentMessage(null)
      }, 4000)
    }
  }

  if (!isVisible) return null

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chat bubble */}
      {showMessage && currentMessage && (
        <div
          className={`mb-4 max-w-xs transition-all duration-300 ${
            isAnimating ? "animate-in slide-in-from-bottom-4 fade-in-0" : ""
          }`}
        >
          <div className="bg-card/95 backdrop-blur-md border border-primary/40 rounded-2xl p-4 shadow-2xl relative group hover:bg-card/100 transition-all duration-200">
            <div className="flex items-start gap-3">
              {currentMessage.icon && (
                <div className="flex-shrink-0 w-6 h-6 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center mt-0.5">
                  <div className="text-primary-foreground text-xs">{currentMessage.icon}</div>
                </div>
              )}
              <p className="text-sm text-foreground leading-relaxed flex-1">{currentMessage.text}</p>
            </div>

            {/* Speech bubble tail */}
            <div className="absolute bottom-0 right-6 transform translate-y-1/2 rotate-45 w-3 h-3 bg-card border-r border-b border-primary/40 group-hover:border-primary/60 transition-colors"></div>

            {/* Glow effect */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/10 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200 -z-10"></div>
          </div>
        </div>
      )}

      {/* AI Character */}
      <div className="relative group">
        <Button
          size="icon"
          className="w-16 h-16 rounded-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 shadow-2xl animate-float transition-all duration-300 group-hover:scale-110"
          onClick={handleAssistantClick}
        >
          <Bot className="h-8 w-8 text-primary-foreground transition-transform duration-200 group-hover:scale-110" />
        </Button>

        {/* Orbital rings */}
        <div
          className="absolute inset-0 rounded-full border-2 border-primary/30 animate-spin"
          style={{ animationDuration: "8s" }}
        ></div>
        <div
          className="absolute inset-2 rounded-full border border-accent/20 animate-spin"
          style={{ animationDuration: "6s", animationDirection: "reverse" }}
        ></div>

        {/* Pulsing glow effect */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary to-accent opacity-20 animate-ping"></div>
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary to-accent opacity-30 animate-pulse -z-10"></div>

        {/* Floating particles */}
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-primary/60 rounded-full animate-float"
            style={{
              left: `${20 + Math.cos((i * Math.PI * 2) / 6) * 40}px`,
              top: `${20 + Math.sin((i * Math.PI * 2) / 6) * 40}px`,
              animationDelay: `${i * 0.3}s`,
              animationDuration: `${2 + Math.random()}s`,
            }}
          />
        ))}

        {/* Close button */}
        <Button
          size="icon"
          variant="ghost"
          className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-background/90 hover:bg-background border border-border/50 opacity-0 group-hover:opacity-100 transition-all duration-200"
          onClick={(e) => {
            e.stopPropagation()
            setIsVisible(false)
          }}
        >
          <X className="h-3 w-3" />
        </Button>

        {/* Status indicator */}
        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-background animate-pulse"></div>
      </div>

      {/* Interaction hint */}
      {!showMessage && (
        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <div className="bg-background/80 backdrop-blur-sm border border-border/50 rounded-lg px-2 py-1">
            <p className="text-xs text-muted-foreground whitespace-nowrap">Click for guidance</p>
          </div>
        </div>
      )}
    </div>
  )
}
