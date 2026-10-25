import React, { useState, useRef, useEffect } from 'react'
import { 
  Play, Download, Terminal, ChevronRight, Sparkles, 
  Tv, Film, Wifi, Settings as SettingsIcon, Layers, 
  RotateCcw, Sliders, ExternalLink, ArrowUpRight
} from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const TV_APPS = [
  {
    id: 'netflix',
    name: 'Netflix',
    tag: 'Now Streaming',
    title: 'Dynamic Top Shelf — Cinematic Ambient Backdrop',
    image: './images/tv/tv_dock_netflix.png',
    glowColor: 'rgba(229, 9, 20, 0.4)',
    accentColor: '#E50914',
    icon: '🔴'
  },
  {
    id: 'prime',
    name: 'Prime Video',
    tag: '4K HDR Feature',
    title: 'Content-Aware Poster Showcase',
    image: './images/tv/tv_dock_prime.png',
    glowColor: 'rgba(0, 168, 225, 0.4)',
    accentColor: '#00A8E1',
    icon: '🔵'
  },
  {
    id: 'youtube',
    name: 'YouTube',
    tag: 'Live Leanback',
    title: 'Dynamic Hero Backdrop & Zero Stutter Dock',
    image: './images/tv/tv_dock_youtube.png',
    glowColor: 'rgba(255, 0, 0, 0.4)',
    accentColor: '#FF0000',
    icon: '▶️'
  },
  {
    id: 'settings',
    name: 'Glass Settings',
    tag: 'tvOS Translucency',
    title: 'Translucent Sheet Overlay — Launcher Remains Active',
    image: './images/tv/tv_settings_menu_verified.png',
    glowColor: 'rgba(255, 255, 255, 0.25)',
    accentColor: '#94A3B8',
    icon: '⚙️'
  },
  {
    id: 'wifi',
    name: 'Wi-Fi Drawer',
    tag: 'Instant Connect',
    title: 'Quick Settings Overlay Without Black Screen Flash',
    image: './images/tv/tv_wifi_menu.png',
    glowColor: 'rgba(52, 168, 83, 0.4)',
    accentColor: '#34A853',
    icon: '📶'
  },
  {
    id: 'grid',
    name: 'All Apps Grid',
    tag: '27.6 MB Resident',
    title: 'Fluid App Drawer with 60 FPS Leanback Curves',
    image: './images/tv/tv_screen_apps_grid.png',
    glowColor: 'rgba(66, 133, 244, 0.4)',
    accentColor: '#4285F4',
    icon: '📱'
  }
]

export default function Hero() {
  const [activeAppIndex, setActiveAppIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const heroRef = useRef(null)
  const tvStageRef = useRef(null)
  const activeApp = TV_APPS[activeAppIndex]

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        tvStageRef.current,
        {
          rotateX: 14,
          scale: 0.92,
          y: 40,
          opacity: 0.85
        },
        {
          rotateX: 0,
          scale: 1,
          y: 0,
          opacity: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom center',
            scrub: 1.2
          }
        }
      )
    }, heroRef)

    return () => ctx.revert()
  }, [])

  const switchApp = (index) => {
    if (index === activeAppIndex || isTransitioning) return
    setIsTransitioning(true)
    setActiveAppIndex(index)
    setTimeout(() => setIsTransitioning(false), 300)
  }

  return (
    <section ref={heroRef} className="relative min-h-screen pt-28 pb-20 px-4 flex flex-col items-center justify-center overflow-hidden">
      <div 
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full blur-[140px] pointer-events-none transition-all duration-700 -z-10"
        style={{ background: activeApp.glowColor }}
      />
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] glow-ambient pointer-events-none -z-10" />

      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-pill text-xs font-medium text-white/90 mb-6 hover:border-white/30 transition-all duration-300">
        <span className="flex h-2 w-2 rounded-full bg-[#34A853] animate-pulse" />
        <span className="text-white/60">Xiaomi Mi TV 4A Verified</span>
        <span className="w-1 h-1 rounded-full bg-white/20" />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4285F4] to-[#34A853] font-semibold">
          Total PSS: 27.6 MB RAM
        </span>
        <ArrowUpRight className="w-3.5 h-3.5 text-white/50" />
      </div>

      <div className="text-center max-w-4xl mx-auto space-y-4 mb-10">
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-[1.08] gradient-text-hero">
          Pure Cinema. <br className="hidden sm:inline" />
          <span className="gradient-text-google">Zero Bloat.</span>
        </h1>
        <p className="text-base sm:text-xl text-white/65 max-w-2xl mx-auto font-normal leading-relaxed">
          The luxurious fluidity of Apple tvOS, precision-engineered for Android TV and Google TV. 
          No sponsored banner ads. 91% less RAM. Instant 60 FPS response.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-3">
          <a
            href="./downloads/gapple-tv-release.apk"
            download="Gapple-TV-v1.0.apk"
            className="flex items-center gap-2.5 px-6 py-3 rounded-full bg-white text-black font-semibold text-sm hover:bg-white/90 shadow-xl shadow-white/10 hover:scale-105 active:scale-95 transition-all duration-200"
          >
            <Download className="w-4 h-4" />
            <span>Download Gapple TV APK</span>
            <span className="text-xs bg-black/10 px-2 py-0.5 rounded-full font-mono">1.28 MB</span>
          </a>
          <a
            href="#guide"
            className="flex items-center gap-2 px-5 py-3 rounded-full glass-pill text-sm font-medium text-white/90 hover:text-white hover:bg-white/10 transition-all duration-200"
          >
            <Terminal className="w-4 h-4 text-[#34A853]" />
            <span>Instant ADB Setup Guide</span>
            <ChevronRight className="w-4 h-4 text-white/40" />
          </a>
        </div>
      </div>

      <div id="simulator" className="w-full max-w-6xl mx-auto perspective-[1200px] mt-4">
        <div 
          ref={tvStageRef} 
          className="relative transition-all duration-500 rounded-3xl p-3 sm:p-5 bg-gradient-to-b from-white/10 via-white/5 to-transparent border border-white/15 shadow-[0_30px_100px_-20px_rgba(0,0,0,0.9)]"
        >
          <div className="relative rounded-2xl overflow-hidden bg-black border-4 border-[#1c1d22] shadow-2xl">
            <div className="relative aspect-video w-full overflow-hidden bg-[#0a0b0e]">
              <img
                src={activeApp.image}
                alt={activeApp.title}
                className={`w-full h-full object-cover transition-opacity duration-300 ${
                  isTransitioning ? 'opacity-40 scale-[1.01]' : 'opacity-100 scale-100'
                }`}
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-transparent to-white/5 pointer-events-none" />
              <div className="absolute inset-0 shadow-[inset_0_0_80px_rgba(0,0,0,0.6)] pointer-events-none" />

              <div className="absolute top-4 right-4 hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[11px] font-mono text-white/80">
                <span className="w-2 h-2 rounded-full bg-[#34A853] animate-pulse" />
                <span>Mi TV 4A Pro</span>
                <span className="text-white/40">|</span>
                <span>27.6 MB PSS</span>
                <span className="text-white/40">|</span>
                <span className="text-[#4285F4]">60 FPS</span>
              </div>

              <div className="absolute bottom-4 left-4 hidden sm:flex flex-col gap-0.5 bg-black/70 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-white/10 max-w-md">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-[#4285F4] flex items-center gap-1">
                  <Sparkles className="w-3 h-3" /> Live Capture Preview
                </span>
                <span className="text-xs font-medium text-white/90 truncate">
                  {activeApp.title}
                </span>
              </div>
            </div>

            <div className="h-4 bg-[#141519] flex items-center justify-center border-t border-white/5">
              <div className="w-1.5 h-1.5 rounded-full bg-white/40" />
            </div>
          </div>

          <div className="relative mx-auto w-36 h-2.5 bg-gradient-to-r from-transparent via-white/20 to-transparent -mt-0.5 rounded-full blur-[0.5px]" />
          <div className="mx-auto w-48 h-1 bg-white/10 rounded-full mt-0.5" />

          <div className="mt-6 flex flex-col items-center gap-3">
            <div className="text-xs font-semibold text-white/50 tracking-wider uppercase flex items-center gap-1.5">
              <span>Interactive Remote Simulator</span>
              <span className="w-1 h-1 rounded-full bg-white/20" />
              <span className="text-white/70">Click to switch TV views</span>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-2 p-1.5 rounded-2xl glass-panel max-w-3xl">
              {TV_APPS.map((app, index) => {
                const isActive = index === activeAppIndex
                return (
                  <button
                    key={app.id}
                    onClick={() => switchApp(index)}
                    className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium transition-all duration-200 cursor-pointer ${
                      isActive
                        ? 'bg-white text-black font-semibold shadow-lg shadow-white/20 scale-105'
                        : 'text-white/70 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <span>{app.icon}</span>
                    <span>{app.name}</span>
                    {isActive && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#4285F4]" />
                    )}
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
