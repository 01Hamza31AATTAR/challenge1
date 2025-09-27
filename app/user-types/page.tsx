"use client"
import { OptimizedGalaxyScene, OptimizedParticles } from "@/components/galaxy-scene"
import { ParallaxStars } from "@/components/parallax-stars"
import { AnimatedSection } from "@/components/animated-section"
import { CosmicCursor } from "@/components/cosmic-cursor"
import { useScrollProgress } from "@/components/scroll-animations"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, User, UserCog, Sparkles, Shield, Rocket } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export default function UserTypesPage() {
  const { scrollProgress } = useScrollProgress()
  const [selectedType, setSelectedType] = useState<string | null>(null)

  const userTypes = [
    {
      id: "regular",
      title: "Regular User",
      icon: User,
      description: "Perfect for newcomers and casual explorers",
      features: [
        "Guided tour of the galaxy",
        "Basic interactive features",
        "Simplified navigation",
        "Essential cosmic tools",
        "Community access",
      ],
      color: "from-blue-500 to-cyan-500",
      accent: "text-blue-400",
    },
    {
      id: "advanced",
      title: "Advanced User",
      icon: UserCog,
      description: "For experienced cosmic travelers and power users",
      features: [
        "Full galaxy control panel",
        "Advanced 3D interactions",
        "Custom universe creation",
        "Developer tools access",
        "Priority support",
      ],
      color: "from-purple-500 to-pink-500",
      accent: "text-purple-400",
    },
  ]

  const handleUserTypeSelect = (typeId: string) => {
    setSelectedType(typeId)
    // Here you could store the selection in localStorage, context, or send to an API
    localStorage.setItem("userType", typeId)

    // Redirect back to main page after selection
    setTimeout(() => {
      window.location.href = "/"
    }, 1500)
  }

  return (
    <div className="min-h-screen">
      {/* Cosmic Cursor Effect */}
      <CosmicCursor />

      {/* 3D Galaxy Background */}
      <OptimizedGalaxyScene scrollProgress={scrollProgress} />

      {/* Optimized Particles */}
      <OptimizedParticles count={30} speed={0.2} />

      {/* Parallax Stars */}
      <ParallaxStars />

      {/* Back Button */}
      <div className="fixed top-6 left-6 z-50">
        <Link href="/">
          <Button
            variant="outline"
            size="sm"
            className="bg-card/80 backdrop-blur-md border border-border/50 hover:bg-card/90 transition-all duration-300"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Galaxy
          </Button>
        </Link>
      </div>

      <main className="relative z-10">
        <section className="min-h-screen flex items-center justify-center px-6 py-20">
          <div className="max-w-6xl mx-auto">
            <AnimatedSection animation="fade-down" className="text-center space-y-8 mb-16">
              <div className="space-y-4">
                <h1 className="text-4xl md:text-6xl font-bold text-balance">
                  Choose Your{" "}
                  <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    Cosmic Role
                  </span>
                </h1>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed text-pretty">
                  Select the experience level that best matches your journey through our digital universe
                </p>
              </div>
            </AnimatedSection>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {userTypes.map((type, index) => {
                const IconComponent = type.icon
                const isSelected = selectedType === type.id

                return (
                  <AnimatedSection key={type.id} animation="fade-up" delay={index * 200} className="h-full">
                    <Card
                      className={`h-full bg-card/40 backdrop-blur-sm border transition-all duration-500 cursor-pointer hover:scale-105 hover:bg-card/60 ${
                        isSelected
                          ? "border-primary/80 bg-card/70 scale-105 shadow-2xl shadow-primary/20"
                          : "border-border/50 hover:border-primary/40"
                      }`}
                      onClick={() => handleUserTypeSelect(type.id)}
                    >
                      <CardHeader className="text-center space-y-4 pb-6">
                        <div
                          className={`w-20 h-20 bg-gradient-to-r ${type.color} rounded-full flex items-center justify-center mx-auto ${
                            isSelected ? "animate-pulse" : "hover:animate-bounce"
                          }`}
                        >
                          <IconComponent className="h-10 w-10 text-white" />
                        </div>
                        <div>
                          <CardTitle className="text-2xl font-bold mb-2">{type.title}</CardTitle>
                          <CardDescription className="text-base text-muted-foreground">
                            {type.description}
                          </CardDescription>
                        </div>
                      </CardHeader>

                      <CardContent className="space-y-6">
                        <div className="space-y-3">
                          <h4 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground">
                            Features Included
                          </h4>
                          <ul className="space-y-2">
                            {type.features.map((feature, featureIndex) => (
                              <li key={featureIndex} className="flex items-center space-x-3">
                                <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${type.color} flex-shrink-0`} />
                                <span className="text-sm text-muted-foreground">{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <Button
                          className={`w-full bg-gradient-to-r ${type.color} hover:opacity-90 text-white transition-all duration-300 ${
                            isSelected ? "animate-pulse" : ""
                          }`}
                          disabled={isSelected}
                        >
                          {isSelected ? (
                            <>
                              <Sparkles className="mr-2 h-4 w-4 animate-spin" />
                              Selected! Redirecting...
                            </>
                          ) : (
                            <>
                              <Rocket className="mr-2 h-4 w-4" />
                              Choose {type.title}
                            </>
                          )}
                        </Button>
                      </CardContent>
                    </Card>
                  </AnimatedSection>
                )
              })}
            </div>

            {/* Additional Info Section */}
            <AnimatedSection animation="fade-up" delay={600} className="text-center mt-16">
              <div className="bg-card/30 backdrop-blur-sm border border-border/50 rounded-2xl p-8 max-w-2xl mx-auto">
                <div className="flex items-center justify-center mb-4">
                  <Shield className="h-8 w-8 text-primary mr-3" />
                  <h3 className="text-xl font-semibold">Don't worry!</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  You can always change your user type later in your profile settings. This selection helps us customize
                  your initial experience in the galaxy.
                </p>
              </div>
            </AnimatedSection>
          </div>
        </section>
      </main>
    </div>
  )
}
