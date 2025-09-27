"use client"
import { OptimizedGalaxyScene, OptimizedParticles } from "@/components/galaxy-scene"
import { NavigationMenu } from "@/components/navigation-menu"
import { AIAssistant } from "@/components/ai-assistant"
import { ParallaxStars } from "@/components/parallax-stars"
import { AnimatedSection } from "@/components/animated-section"
import { SectionTransition } from "@/components/section-transition"
import { CosmicCursor } from "@/components/cosmic-cursor"
import { useScrollProgress } from "@/components/scroll-animations"
import { Button } from "@/components/ui/button"
import {
  ArrowDown,
  Sparkles,
  Users,
  Target,
  Rocket,
  Zap,
  Globe,
  Star,
  Orbit,
  Telescope,
  ChevronUp,
  UserCheck,
} from "lucide-react"
import { AccessibilityControls, useFocusManagement } from "@/components/accessibility-enhancements"
import Link from "next/link"

export default function HomePage() {
  const { scrollProgress, scrollDirection } = useScrollProgress()
  useFocusManagement()

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <div className="min-h-screen">
      {/* Accessibility Controls */}
      <AccessibilityControls />

      {/* Cosmic Cursor Effect */}
      <CosmicCursor />

      {/* 3D Galaxy Background - now using optimized version */}
      <OptimizedGalaxyScene scrollProgress={scrollProgress} />

      {/* Optimized Particles */}
      <OptimizedParticles count={50} speed={0.3} />

      {/* Parallax Stars */}
      <ParallaxStars />

      {/* Navigation Menu */}
      <NavigationMenu />

      {/* AI Assistant */}
      <AIAssistant />

      <div className="fixed top-6 right-6 z-50">
        <Link href="/user-types">
          <Button
            variant="outline"
            size="sm"
            className="bg-card/80 backdrop-blur-md border border-border/50 hover:bg-card/90 transition-all duration-300 group"
          >
            <UserCheck className="h-4 w-4 mr-2 group-hover:animate-pulse" />
            Choose User Type
          </Button>
        </Link>
      </div>

      {/* Scroll to Top Button */}
      {scrollProgress > 0.2 && (
        <Button
          size="icon"
          className="fixed bottom-6 left-6 z-40 w-12 h-12 rounded-full bg-card/80 backdrop-blur-md border border-border/50 hover:bg-card/90 transition-all duration-300 animate-in slide-in-from-bottom-2"
          onClick={scrollToTop}
        >
          <ChevronUp className="h-5 w-5 text-primary" />
        </Button>
      )}

      <main role="main">
        {/* Hero Section */}
        <section id="home" className="min-h-screen flex items-center justify-center relative">
          <div className="text-center space-y-8 px-6 max-w-4xl mx-auto">
            <AnimatedSection animation="scale-up" delay={200}>
              <div className="space-y-4">
                <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                  IMMERSIVE
                </h1>
                <div className="relative">
                  <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                    Journey through the cosmos and discover infinite possibilities in our interactive digital universe
                  </p>
                  <div className="absolute -inset-4 pointer-events-none">
                    {Array.from({ length: 8 }).map((_, i) => (
                      <div
                        key={i}
                        className="absolute w-2 h-2 bg-primary/30 rounded-full animate-float"
                        style={{
                          left: `${10 + Math.random() * 80}%`,
                          top: `${10 + Math.random() * 80}%`,
                          animationDelay: `${i * 0.5}s`,
                          animationDuration: `${3 + Math.random() * 2}s`,
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection animation="fade-up" delay={600}>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-primary to-accent hover:from-primary/80 hover:to-accent/80 text-primary-foreground px-8 py-6 text-lg rounded-full group"
                >
                  <Sparkles className="mr-2 h-5 w-5 group-hover:animate-spin" />
                  Explore Galaxy
                </Button>
                <Link href="/user-types">
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-primary/50 hover:bg-primary/10 px-8 py-6 text-lg rounded-full bg-transparent group"
                  >
                    <UserCheck className="mr-2 h-5 w-5 group-hover:animate-pulse" />
                    Choose Your Role
                  </Button>
                </Link>
              </div>
            </AnimatedSection>

            <AnimatedSection animation="fade-up" delay={800}>
              <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
                <div
                  className={`transition-all duration-500 ${scrollDirection === "down" ? "animate-bounce" : "animate-pulse"}`}
                >
                  <ArrowDown className="h-6 w-6 text-primary" />
                </div>
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* Explore Section with Transition */}
        <SectionTransition gradientFrom="transparent" gradientTo="background/60">
          <section id="explore" className="h-screen relative flex items-center justify-center">
            <AnimatedSection animation="scale-up" className="text-center space-y-6 px-6">
              <div className="relative">
                <h2 className="text-4xl md:text-6xl font-bold text-balance">
                  <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    Infinite Possibilities
                  </span>
                </h2>
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 blur-3xl -z-10 animate-pulse" />
              </div>

              <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Where technology meets imagination, creating experiences beyond the ordinary
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 max-w-4xl mx-auto">
                <AnimatedSection animation="fade-up" delay={200}>
                  <div className="bg-card/30 backdrop-blur-sm border border-primary/20 rounded-xl p-6 hover:bg-card/50 transition-all duration-300 group">
                    <Rocket className="h-12 w-12 text-primary mx-auto mb-4 group-hover:animate-bounce" />
                    <h3 className="text-lg font-semibold mb-2">Explore</h3>
                    <p className="text-sm text-muted-foreground">Discover new worlds</p>
                  </div>
                </AnimatedSection>

                <AnimatedSection animation="fade-up" delay={400}>
                  <div className="bg-card/30 backdrop-blur-sm border border-accent/20 rounded-xl p-6 hover:bg-card/50 transition-all duration-300 group">
                    <Zap className="h-12 w-12 text-accent mx-auto mb-4 group-hover:animate-pulse" />
                    <h3 className="text-lg font-semibold mb-2">Create</h3>
                    <p className="text-sm text-muted-foreground">Build the impossible</p>
                  </div>
                </AnimatedSection>

                <AnimatedSection animation="fade-up" delay={600}>
                  <div className="bg-card/30 backdrop-blur-sm border border-primary/20 rounded-xl p-6 hover:bg-card/50 transition-all duration-300 group">
                    <Globe className="h-12 w-12 text-primary mx-auto mb-4 group-hover:animate-spin" />
                    <h3 className="text-lg font-semibold mb-2">Connect</h3>
                    <p className="text-sm text-muted-foreground">Join the universe</p>
                  </div>
                </AnimatedSection>
              </div>
            </AnimatedSection>
          </section>
        </SectionTransition>

        {/* Planets Section with Enhanced Transition */}
        <SectionTransition gradientFrom="background/40" gradientTo="background/90">
          <section id="planets" className="min-h-screen flex items-center justify-center relative">
            <div className="max-w-6xl mx-auto px-6 py-20">
              <AnimatedSection animation="fade-down" className="text-center space-y-12">
                <div className="space-y-4">
                  <h2 className="text-4xl md:text-6xl font-bold text-balance">
                    Explore{" "}
                    <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                      Distant Worlds
                    </span>
                  </h2>
                  <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed text-pretty">
                    Each planet in our digital universe offers unique experiences and discoveries waiting to be
                    explored.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
                  <AnimatedSection animation="fade-up" delay={200}>
                    <div className="bg-card/40 backdrop-blur-sm border border-border/50 rounded-2xl p-8 hover:bg-card/60 transition-all duration-300 hover:scale-105 group">
                      <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mb-6 mx-auto group-hover:animate-spin">
                        <Star className="h-8 w-8 text-white" />
                      </div>
                      <h3 className="text-xl font-bold mb-4">Nebula Prime</h3>
                      <p className="text-muted-foreground leading-relaxed text-sm">
                        A world of swirling colors and cosmic energy, where creativity knows no bounds.
                      </p>
                    </div>
                  </AnimatedSection>

                  <AnimatedSection animation="fade-up" delay={400}>
                    <div className="bg-card/40 backdrop-blur-sm border border-border/50 rounded-2xl p-8 hover:bg-card/60 transition-all duration-300 hover:scale-105 group">
                      <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mb-6 mx-auto group-hover:animate-pulse">
                        <Orbit className="h-8 w-8 text-white" />
                      </div>
                      <h3 className="text-xl font-bold mb-4">Quantum Sphere</h3>
                      <p className="text-muted-foreground leading-relaxed text-sm">
                        Where the laws of physics bend and digital possibilities become reality.
                      </p>
                    </div>
                  </AnimatedSection>

                  <AnimatedSection animation="fade-up" delay={600}>
                    <div className="bg-card/40 backdrop-blur-sm border border-border/50 rounded-2xl p-8 hover:bg-card/60 transition-all duration-300 hover:scale-105 group">
                      <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mb-6 mx-auto group-hover:animate-bounce">
                        <Telescope className="h-8 w-8 text-white" />
                      </div>
                      <h3 className="text-xl font-bold mb-4">Discovery Station</h3>
                      <p className="text-muted-foreground leading-relaxed text-sm">
                        The hub of exploration, where new frontiers are constantly being mapped.
                      </p>
                    </div>
                  </AnimatedSection>
                </div>
              </AnimatedSection>
            </div>
          </section>
        </SectionTransition>

        {/* About Section with Full Transition */}
        <SectionTransition gradientFrom="background/70" gradientTo="background">
          <section id="about" className="min-h-screen flex items-center justify-center relative">
            <div className="max-w-6xl mx-auto px-6 py-20">
              <div className="text-center space-y-12">
                <AnimatedSection animation="fade-down">
                  <div className="space-y-4">
                    <h2 className="text-4xl md:text-6xl font-bold text-balance">
                      About Our{" "}
                      <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                        Cosmic Journey
                      </span>
                    </h2>
                    <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed text-pretty">
                      We are explorers of the digital frontier, crafting immersive experiences that blur the line
                      between reality and imagination. Our mission is to push the boundaries of what's possible in
                      interactive design.
                    </p>
                  </div>
                </AnimatedSection>

                <div className="grid md:grid-cols-3 gap-8 mt-16">
                  <AnimatedSection animation="fade-right" delay={200}>
                    <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-8 hover:bg-card/70 transition-all duration-300 hover:scale-105 group">
                      <div className="w-16 h-16 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center mb-6 mx-auto group-hover:animate-pulse">
                        <Sparkles className="h-8 w-8 text-primary-foreground" />
                      </div>
                      <h3 className="text-2xl font-bold mb-4">Innovation</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        Pioneering cutting-edge technologies to create experiences that have never been seen before in
                        the digital realm.
                      </p>
                    </div>
                  </AnimatedSection>

                  <AnimatedSection animation="fade-up" delay={400}>
                    <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-8 hover:bg-card/70 transition-all duration-300 hover:scale-105 group">
                      <div className="w-16 h-16 bg-gradient-to-r from-accent to-primary rounded-full flex items-center justify-center mb-6 mx-auto group-hover:animate-bounce">
                        <Users className="h-8 w-8 text-primary-foreground" />
                      </div>
                      <h3 className="text-2xl font-bold mb-4">Community</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        Building a vibrant community of creators, dreamers, and innovators who share our passion for the
                        extraordinary.
                      </p>
                    </div>
                  </AnimatedSection>

                  <AnimatedSection animation="fade-left" delay={600}>
                    <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-8 hover:bg-card/70 transition-all duration-300 hover:scale-105 group">
                      <div className="w-16 h-16 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center mb-6 mx-auto group-hover:animate-spin">
                        <Target className="h-8 w-8 text-primary-foreground" />
                      </div>
                      <h3 className="text-2xl font-bold mb-4">Vision</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        Envisioning a future where digital experiences are indistinguishable from magic, inspiring
                        wonder in every interaction.
                      </p>
                    </div>
                  </AnimatedSection>
                </div>
              </div>
            </div>
          </section>
        </SectionTransition>

        {/* Contact Section */}
        <section id="contact" className="min-h-screen flex items-center justify-center relative bg-background">
          <div className="max-w-4xl mx-auto px-6 py-20 text-center">
            <AnimatedSection animation="scale-up">
              <div className="space-y-8">
                <h2 className="text-4xl md:text-6xl font-bold text-balance">
                  Ready to{" "}
                  <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Launch</span>?
                </h2>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                  Join us on this cosmic journey and help shape the future of digital experiences.
                </p>
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-primary to-accent hover:from-primary/80 hover:to-accent/80 text-primary-foreground px-12 py-6 text-lg rounded-full group"
                >
                  <Rocket className="mr-2 h-5 w-5 group-hover:animate-bounce" />
                  Start Your Journey
                </Button>
              </div>
            </AnimatedSection>
          </div>
        </section>
      </main>
    </div>
  )
}
