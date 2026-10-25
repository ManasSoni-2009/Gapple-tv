import React, { useState, useRef, useEffect } from 'react'
import { 
  Play, Download, Terminal, ChevronRight, Sparkles, 
  Tv, Film, Wifi, Sliders, LayoutGrid, ArrowUpRight,
  ShieldCheck, Cpu, ChevronLeft
} from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const TV_APPS = [
  {
    id: 'netflix',
    name: 'Netflix',
    tag: '4K Cinema',
    title: 'Dynamic Top Shelf — Ambient Poster Backdrop',
    image: './images/tv/tv_dock_netflix.png',
    glowColor: 'rgba(229, 9, 20, 0.45)',
    accentColor: '#E50914',
    icon: Film
  },
  {
    id: 'prime',
    name: 'Prime Video',
    tag: 'HDR Feature',
    title: 'Content-Aware Poster Showcase',
    image: './images/tv/tv_dock_prime.png',
    glowColor: 'rgba(0, 168, 225, 0.45)',
    accentColor: '#00A8E1',
    icon: Play
  },
  {
    id: 'youtube',
    name: 'YouTube',
    tag: 'Live Leanback',
    title: 'Dynamic Hero Backdrop & Zero Stutter Dock',
    image: './images/tv/tv_dock_youtube.png',
    glowColor: 'rgba(255, 0, 0, 0.45)',
    accentColor: '#FF0000',
    icon: Tv
  },
  {
    id: 'settings',
    name: 'Glass Settings',
    tag: 'tvOS Translucency',
    title: 'Translucent Sheet Overlay — Launcher Remains Active',
    image: './images/tv/tv_settings_menu_verified.png',
    glowColor: 'rgba(255, 255, 255, 0.3)',
    accentColor: '#94A3B8',
    icon: Sliders
  },
  {
    id: 'wifi',
    name: 'Wi-Fi Drawer',
    tag: 'Instant Connect',
    title: 'Quick Settings Overlay Without Black Screen Flash',
    image: './images/tv/tv_wifi_menu.png',
    glowColor: 'rgba(52, 168, 83, 0.45)',
    accentColor: '#34A853',
    icon: Wifi
  },
  {
    id: 'grid',
    name: 'All Apps Grid',
    tag: '27.6 MB Resident',
    title: 'Fluid App Drawer with 60 FPS Leanback Curves',
    image: './images/tv/tv_screen_apps_grid.png',
    glowColor: 'rgba(66, 133, 244, 0.45)',
    accentColor: '#4285F4',
    icon: LayoutGrid
  }
]

export default function Hero() {
  const [activeAppIndex, setActiveAppIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  
  const heroRef = useRef(null)
  const tvStageRef = useRef(null)
  const titleRef = useRef(null)
  const descRef = useRef(null)
  const ctaRef = useRef(null)
  const pillRef = useRef(null)
  const dockRef = useRef(null)
  const dockScrollRef = useRef(null)

  const activeApp = TV_APPS[activeAppIndex]

  // GSAP Entrance & Scroll Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Staggered cinematic entrance
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
      
      tl.fromTo(pillRef.current, 
        { y: -20, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.7, delay: 0.1 }
      )
      .fromTo(titleRef.current,
        { y: 35, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.8 },
        '-=0.4'
      )
      .fromTo(descRef.current,
        { y: 25, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.7 },
        '-=0.5'
      )
      .fromTo(ctaRef.current,
        { y: 20, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.6 },
        '-=0.4'
      )
      .fromTo(tvStageRef.current,
        { scale: 0.92, y: 40, autoAlpha: 0 },
        { scale: 1, y: 0, autoAlpha: 1, duration: 1.0, ease: 'power4.out' },
        '-=0.5'
      )
      .fromTo(dockRef.current,
        { y: 20, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.6 },
        '-=0.4'
      )

      // Parallax scroll tilt for 3D TV Stage (gentle on mobile, deep on desktop)
      gsap.to(tvStageRef.current, {
        rotateX: window.innerWidth < 768 ? 4 : 8,
        y: window.innerWidth < 768 ? -15 : -30,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom center',
          scrub: 1.2
        }
      })
    }, heroRef)

    return () => ctx.revert()
  }, [])

  const switchApp = (index) => {
    if (index === activeAppIndex || isTransitioning) return
    setIsTransitioning(true)
    setActiveAppIndex(index)
    setTimeout(() => setIsTransitioning(false), 280)
  }

  return (
    <section 
      ref={heroRef} 
      className="relative min-h-screen pt-24 sm:pt-28 pb-16 sm:pb-20 px-3 sm:px-4 flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Dynamic Ambient Backlight Glow that morphs with the selected app */}
      <div 
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[720px] h-[300px] sm:h-[520px] rounded-full blur-[90px] sm:blur-[150px] pointer-events-none transition-all duration-700 -z-10"
        style={{ background: activeApp.glowColor }}
      />
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[450px] sm:h-[650px] glow-ambient pointer-events-none -z-10" />

      {/* Top Pill Announcement */}
      <div 
        ref={pillRef}
        className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 rounded-full glass-pill text-[11px] sm:text-xs font-medium text-white/90 mb-5 sm:mb-6 max-w-[94vw] sm:max-w-none hover:border-white/30 transition-colors duration-300"
      >
        <span className="flex h-2 w-2 rounded-full bg-[#34A853] animate-pulse shrink-0" />
        <span className="text-white/70 truncate">Xiaomi Mi TV 4A Verified</span>
        <span className="w-1 h-1 rounded-full bg-white/20 shrink-0 hidden xs:inline" />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4285F4] to-[#34A853] font-semibold shrink-0">
          Total PSS: 27.6 MB RAM
        </span>
        <ArrowUpRight className="w-3.5 h-3.5 text-white/50 shrink-0 hidden xs:inline" />
      </div>

      {/* Main Punchy Typography */}
      <div className="text-center max-w-4xl mx-auto space-y-3 sm:space-y-4 mb-8 sm:mb-10 px-2">
        <div className="text-[11px] sm:text-xs font-bold tracking-widest uppercase text-transparent bg-clip-text bg-gradient-to-r from-[#4285F4] via-[#EA4335] to-[#FBBC05]">
          Apple tvOS Launcher for Android TV &amp; Google TV
        </div>
        <h1 
          ref={titleRef}
          className="text-3xl xs:text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-[1.12] sm:leading-[1.08] gradient-text-hero"
        >
          Gapple TV. <br className="hidden xs:inline" />
          <span className="gradient-text-google">Pure Cinema. Zero Bloat.</span>
        </h1>
        <p 
          ref={descRef}
          className="text-xs xs:text-sm sm:text-lg md:text-xl text-white/70 max-w-2xl mx-auto font-normal leading-relaxed px-1"
        >
          The fluid aesthetic of Apple tvOS, precision-engineered by <span className="text-white font-medium">Manas Soni</span> to maximize performance on Android TV and Google TV devices. Zero sponsored ads, 91% less RAM (27.6 MB), and locked 60 FPS response.
        </p>

        {/* Responsive CTA Buttons (Full width on mobile for easy thumb reach) */}
        <div ref={ctaRef} className="flex flex-col sm:flex-row items-center justify-center gap-2.5 sm:gap-3 pt-2 sm:pt-3 w-full max-w-md sm:max-w-none mx-auto">
          <a
            href="./downloads/gapple-tv-release.apk"
            download="Gapple-TV-v1.0.apk"
            className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full bg-white text-black font-semibold text-xs sm:text-sm hover:bg-white/90 shadow-xl shadow-white/10 active:scale-95 transition-all duration-200 cursor-pointer touch-active"
          >
            <Download className="w-4 h-4 shrink-0" />
            <span>Download Gapple TV APK</span>
            <span className="text-[10px] sm:text-xs bg-black/10 px-2 py-0.5 rounded-full font-mono">1.28 MB</span>
          </a>
          <a
            href="#guide"
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-3.5 rounded-full glass-pill text-xs sm:text-sm font-medium text-white/90 hover:text-white active:scale-95 transition-all duration-200 touch-active"
          >
            <Terminal className="w-4 h-4 text-[#34A853] shrink-0" />
            <span>Interactive ADB Setup</span>
            <ChevronRight className="w-4 h-4 text-white/40 shrink-0" />
          </a>
        </div>
      </div>

      {/* 3D TV Showcase Stage */}
      <div id="simulator" className="w-full max-w-6xl mx-auto perspective-[1000px] sm:perspective-[1200px] mt-2 sm:mt-4">
        <div 
          ref={tvStageRef} 
          className="relative rounded-2xl sm:rounded-3xl p-2 sm:p-5 glass-card-elevated"
        >
          {/* OLED TV Bezel Frame */}
          <div className="relative rounded-xl sm:rounded-2xl overflow-hidden bg-black border-2 sm:border-4 border-[#1b1d24] shadow-2xl">
            {/* TV Screen Aspect Ratio Container (16:9) */}
            <div className="relative aspect-video w-full overflow-hidden bg-[#07080b]">
              {/* Actual Captured TV Screenshot */}
              <img
                src={activeApp.image}
                alt={activeApp.title}
                className={`w-full h-full object-cover transition-all duration-300 ${
                  isTransitioning ? 'opacity-40 scale-[1.015] blur-[2px]' : 'opacity-100 scale-100 blur-0'
                }`}
              />

              {/* TV Screen Specular Glare & Vignette */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-transparent to-white/5 pointer-events-none" />
              <div className="absolute inset-0 shadow-[inset_0_0_50px_rgba(0,0,0,0.65)] sm:shadow-[inset_0_0_90px_rgba(0,0,0,0.65)] pointer-events-none" />

              {/* Desktop TV Status Pill Top Right Overlay */}
              <div className="absolute top-3 sm:top-4 right-3 sm:right-4 hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-black/65 backdrop-blur-md border border-white/10 text-[11px] font-mono text-white/80 shadow-lg">
                <span className="w-2 h-2 rounded-full bg-[#34A853] animate-pulse" />
                <span>Xiaomi Mi TV 4A</span>
                <span className="text-white/30">|</span>
                <span>27.6 MB PSS</span>
                <span className="text-white/30">|</span>
                <span className="text-[#4285F4]">60 FPS</span>
              </div>

              {/* Mobile TV Status Pill (Compact) */}
              <div className="sm:hidden absolute top-2 right-2 flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-black/80 backdrop-blur-md border border-white/10 text-[9px] font-mono text-white/90 shadow-md">
                <span className="w-1.5 h-1.5 rounded-full bg-[#34A853] animate-pulse" />
                <span>27.6 MB</span>
              </div>

              {/* Desktop Live Preview Indicator Pill */}
              <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 hidden sm:flex flex-col gap-0.5 bg-black/75 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-white/10 max-w-md shadow-lg">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-[#4285F4] flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3 text-[#4285F4]" /> Live Hardware Capture
                </span>
                <span className="text-xs font-medium text-white/90 truncate">
                  {activeApp.title}
                </span>
              </div>

              {/* Mobile Live Preview Indicator Pill (Compact) */}
              <div className="sm:hidden absolute bottom-2 left-2 flex items-center gap-1 bg-black/85 backdrop-blur-md px-2 py-0.5 rounded-lg border border-white/10 text-[9px] font-medium text-white/90 max-w-[70%] shadow-md">
                <Sparkles className="w-2.5 h-2.5 text-[#4285F4] shrink-0" />
                <span className="truncate">{activeApp.name}</span>
              </div>
            </div>

            {/* TV Chin with Minimalist Indicator */}
            <div className="h-3 sm:h-4 bg-[#111216] flex items-center justify-center border-t border-white/5">
              <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-white/40" />
            </div>
          </div>

          {/* TV Stand Base */}
          <div className="relative mx-auto w-24 sm:w-36 h-1.5 sm:h-2 bg-gradient-to-r from-transparent via-white/20 to-transparent -mt-0.5 rounded-full blur-[0.5px]" />
          <div className="mx-auto w-32 sm:w-48 h-0.5 sm:h-1 bg-white/10 rounded-full mt-0.5" />

          {/* Interactive Screen Switcher Dock Bar (Touch horizontal scroll on mobile, flex-wrap on desktop) */}
          <div ref={dockRef} className="mt-4 sm:mt-6 flex flex-col items-center gap-2 sm:gap-3 w-full">
            <div className="text-[10px] sm:text-xs font-semibold text-white/50 tracking-wider uppercase flex items-center gap-1.5">
              <span>Interactive Remote Simulator</span>
              <span className="w-1 h-1 rounded-full bg-white/20" />
              <span className="text-white/70">Swipe or tap to switch</span>
            </div>

            <div 
              ref={dockScrollRef}
              className="w-full max-w-3xl overflow-x-auto no-scrollbar snap-x flex items-center justify-start sm:justify-center gap-2 p-1.5 rounded-2xl glass-panel"
            >
              {TV_APPS.map((app, index) => {
                const isActive = index === activeAppIndex
                const IconComponent = app.icon
                return (
                  <button
                    key={app.id}
                    onClick={() => switchApp(index)}
                    className={`snap-center shrink-0 flex items-center gap-2 px-3 sm:px-3.5 py-2 sm:py-2 rounded-xl text-xs font-medium transition-all duration-200 cursor-pointer min-h-[40px] touch-active ${
                      isActive
                        ? 'bg-white text-black font-semibold shadow-xl shadow-white/20 scale-105'
                        : 'text-white/70 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <IconComponent 
                      className="w-3.5 h-3.5 shrink-0 transition-colors" 
                      style={{ color: isActive ? '#000000' : app.accentColor }} 
                    />
                    <span className="whitespace-nowrap">{app.name}</span>
                    {isActive && (
                      <span 
                        className="w-1.5 h-1.5 rounded-full ml-0.5 shrink-0" 
                        style={{ background: app.accentColor }}
                      />
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
