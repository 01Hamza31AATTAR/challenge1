"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X, Home, Rocket, Mail, Users, Sparkles, Globe } from "lucide-react"
import { useScrollProgress } from "./scroll-animations"

interface MenuItem {
  icon: React.ComponentType<{ className?: string }>
  label: string
  href: string
  description: string
}

export function NavigationMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const { scrollProgress } = useScrollProgress()

  const menuItems: MenuItem[] = [
    {
      icon: Home,
      label: "Home",
      href: "#home",
      description: "Return to the galaxy",
    },
    {
      icon: Sparkles,
      label: "Explore",
      href: "#explore",
      description: "Discover possibilities",
    },
    {
      icon: Users,
      label: "About",
      href: "#about",
      description: "Our cosmic mission",
    },
    {
      icon: Rocket,
      label: "Planets",
      href: "#planets",
      description: "Explore worlds",
    },
    {
      icon: Globe,
      label: "Universe",
      href: "#universe",
      description: "The bigger picture",
    },
    {
      icon: Mail,
      label: "Contact",
      href: "#contact",
      description: "Connect with us",
    },
  ]

  // Determine active section based on scroll progress
  useEffect(() => {
    if (scrollProgress < 0.2) {
      setActiveSection("home")
    } else if (scrollProgress < 0.4) {
      setActiveSection("explore")
    } else if (scrollProgress < 0.8) {
      setActiveSection("about")
    } else {
      setActiveSection("contact")
    }
  }, [scrollProgress])

  const handleMenuClick = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
    setIsOpen(false)
  }

  return (
    <div className="fixed top-6 left-6 z-50">
      <div
        className={`
        bg-card/80 backdrop-blur-md border border-border/50 rounded-2xl
        transition-all duration-500 ease-out
        ${isOpen ? "w-80 h-auto shadow-2xl" : "w-16 h-16 shadow-lg"}
        overflow-hidden group hover:shadow-xl
      `}
      >
        {/* Menu Toggle Button */}
        <div className="relative">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(!isOpen)}
            className="w-16 h-16 rounded-2xl hover:bg-primary/20 transition-all duration-300 group relative"
          >
            <div className="relative">
              {isOpen ? (
                <X className="h-6 w-6 text-primary transition-all duration-300 rotate-0 hover:rotate-90" />
              ) : (
                <Menu className="h-6 w-6 text-primary transition-all duration-300 hover:scale-110" />
              )}
            </div>
          </Button>

          {/* Glow effect on hover */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/20 to-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>

          {/* Active indicator */}
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-accent rounded-full animate-pulse"></div>
        </div>

        {/* Menu Items */}
        {isOpen && (
          <div className="p-6 pt-2 space-y-3">
            {/* Header */}
            <div className="mb-4 animate-in fade-in-0 slide-in-from-top-2 duration-300">
              <h3 className="text-lg font-semibold text-foreground mb-1">Navigation</h3>
              <p className="text-sm text-muted-foreground">Explore the cosmic interface</p>
            </div>

            {/* Menu Items */}
            <div className="space-y-2">
              {menuItems.map((item, index) => {
                const isActive = activeSection === item.href.replace("#", "")
                return (
                  <Button
                    key={item.label}
                    variant="ghost"
                    className={`
                      w-full justify-start gap-4 h-14 rounded-xl transition-all duration-300
                      hover:bg-primary/20 hover:text-primary hover:scale-105
                      ${isActive ? "bg-primary/10 text-primary border border-primary/30" : ""}
                      animate-in fade-in-0 slide-in-from-left-4
                    `}
                    style={{ animationDelay: `${index * 80}ms` }}
                    onClick={() => handleMenuClick(item.href)}
                  >
                    <div className="relative">
                      <item.icon className="h-5 w-5 transition-transform duration-200 group-hover:scale-110" />
                      {isActive && <div className="absolute inset-0 bg-primary/30 rounded-full animate-ping"></div>}
                    </div>
                    <div className="flex-1 text-left">
                      <div className="font-medium text-sm">{item.label}</div>
                      <div className="text-xs text-muted-foreground">{item.description}</div>
                    </div>
                    {isActive && <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>}
                  </Button>
                )
              })}
            </div>

            {/* Footer */}
            <div className="pt-4 border-t border-border/50 animate-in fade-in-0 slide-in-from-bottom-2 duration-300 delay-300">
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>Scroll Progress</span>
                <span>{Math.round(scrollProgress * 100)}%</span>
              </div>
              <div className="mt-2 h-1 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-300 rounded-full"
                  style={{ width: `${scrollProgress * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Floating particles around menu when open */}
      {isOpen && (
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-primary/40 rounded-full animate-float"
              style={{
                left: `${-10 + Math.random() * 120}%`,
                top: `${-10 + Math.random() * 120}%`,
                animationDelay: `${i * 0.2}s`,
                animationDuration: `${2 + Math.random() * 2}s`,
              }}
            />
          ))}
        </div>
      )}
    </div>
  )
}
