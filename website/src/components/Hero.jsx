import React, { useState, useRef, useEffect } from 'react'
import { 
  Play, Download, Terminal, ChevronRight, Sparkles, 
  Tv, Film, Wifi, Sliders, LayoutGrid, ArrowUpRight,
  ShieldCheck, Cpu
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

      // Parallax scroll tilt for 3D TV Stage
      gsap.to(tvStageRef.current, {
        rotateX: 8,
        y: -30,
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
      className="relative min-h-screen pt-28 pb-20 px-4 flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Dynamic Ambient Backlight Glow that morphs with the selected app */}
      <div 
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[720px] h-[520px] rounded-full blur-[150px] pointer-events-none transition-all duration-700 -z-10"
        style={{ background: activeApp.glowColor }}
      />
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[650px] glow-ambient pointer-events-none -z-10" />

      {/* Top Pill Announcement */}
      <div 
        ref={pillRef}
        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-pill text-xs font-medium text-white/90 mb-6 hover:border-white/30 transition-colors duration-300"
      >
        <span className="flex h-2 w-2 rounded-full bg-[#34A853] animate-pulse" />
        <span className="text-white/60">Xiaomi Mi TV 4A Verified</span>
        <span className="w-1 h-1 rounded-full bg-white/20" />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4285F4] to-[#34A853] font-semibold">
          Total PSS: 27.6 MB RAM
        </span>
        <ArrowUpRight className="w-3.5 h-3.5 text-white/50" />
      </div>

      {/* Main Punchy Typography */}
      <div className="text-center max-w-4xl mx-auto space-y-4 mb-10">
        <h1 
          ref={titleRef}
          className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-[1.08] gradient-text-hero"
        >
          Pure Cinema. <br className="hidden sm:inline" />
          <span className="gradient-text-google">Zero Bloat.</span>
        </h1>
        <p 
          ref={descRef}
          className="text-base sm:text-xl text-white/65 max-w-2xl mx-auto font-normal leading-relaxed"
        >
          The luxurious fluidity of Apple tvOS, precision-engineered for Android TV and Google TV. 
          No sponsored banner ads. 91% less RAM. Instant 60 FPS response.
        </p>

        {/* CTA Buttons */}
        <div ref={ctaRef} className="flex flex-wrap items-center justify-center gap-3 pt-3">
          <a
            href="./downloads/gapple-tv-release.apk"
            download="Gapple-TV-v1.0.apk"
            className="flex items-center gap-2.5 px-6 py-3 rounded-full bg-white text-black font-semibold text-sm hover:bg-white/90 shadow-xl shadow-white/10 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Download Gapple TV APK</span>
            <span className="text-xs bg-black/10 px-2 py-0.5 rounded-full font-mono">1.28 MB</span>
          </a>
          <a
            href="#guide"
            className="flex items-center gap-2 px-5 py-3 rounded-full glass-pill text-sm font-medium text-white/90 hover:text-white transition-all duration-200"
          >
            <Terminal className="w-4 h-4 text-[#34A853]" />
            <span>Interactive ADB Setup</span>
            <ChevronRight className="w-4 h-4 text-white/40" />
          </a>
        </div>
      </div>

      {/* 3D TV Showcase Stage */}
      <div id="simulator" className="w-full max-w-6xl mx-auto perspective-[1200px] mt-4">
        <div 
          ref={tvStageRef} 
          className="relative rounded-3xl p-3 sm:p-5 glass-card-elevated"
        >
          {/* OLED TV Bezel Frame */}
          <div className="relative rounded-2xl overflow-hidden bg-black border-4 border-[#1b1d24] shadow-2xl">
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
              <div className="absolute inset-0 shadow-[inset_0_0_90px_rgba(0,0,0,0.65)] pointer-events-none" />

              {/* TV Status Pill Top Right Overlay */}
              <div className="absolute top-4 right-4 hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-black/65 backdrop-blur-md border border-white/10 text-[11px] font-mono text-white/80 shadow-lg">
                <span className="w-2 h-2 rounded-full bg-[#34A853] animate-pulse" />
                <span>Xiaomi Mi TV 4A</span>
                <span className="text-white/30">|</span>
                <span>27.6 MB PSS</span>
                <span className="text-white/30">|</span>
                <span className="text-[#4285F4]">60 FPS</span>
              </div>

              {/* Live Preview Indicator Pill */}
              <div className="absolute bottom-4 left-4 hidden sm:flex flex-col gap-0.5 bg-black/75 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-white/10 max-w-md shadow-lg">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-[#4285F4] flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3 text-[#4285F4]" /> Live Hardware Capture
                </span>
                <span className="text-xs font-medium text-white/90 truncate">
                  {activeApp.title}
                </span>
              </div>
            </div>

            {/* TV Chin with Minimalist Indicator */}
            <div className="h-4 bg-[#111216] flex items-center justify-center border-t border-white/5">
              <div className="w-1.5 h-1.5 rounded-full bg-white/40" />
            </div>
          </div>

          {/* TV Stand Base */}
          <div className="relative mx-auto w-36 h-2 bg-gradient-to-r from-transparent via-white/20 to-transparent -mt-0.5 rounded-full blur-[0.5px]" />
          <div className="mx-auto w-48 h-1 bg-white/10 rounded-full mt-0.5" />

          {/* Interactive Screen Switcher Dock Bar (Replaced Cheap Emojis with Vector Icons) */}
          <div ref={dockRef} className="mt-6 flex flex-col items-center gap-3">
            <div className="text-xs font-semibold text-white/50 tracking-wider uppercase flex items-center gap-1.5">
              <span>Interactive Remote Simulator</span>
              <span className="w-1 h-1 rounded-full bg-white/20" />
              <span className="text-white/70">Click to switch views</span>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-2 p-1.5 rounded-2xl glass-panel max-w-3xl">
              {TV_APPS.map((app, index) => {
                const isActive = index === activeAppIndex
                const IconComponent = app.icon
                return (
                  <button
                    key={app.id}
                    onClick={() => switchApp(index)}
                    className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium transition-all duration-200 cursor-pointer ${
                      isActive
                        ? 'bg-white text-black font-semibold shadow-xl shadow-white/20 scale-105'
                        : 'text-white/70 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <IconComponent 
                      className="w-3.5 h-3.5 transition-colors" 
                      style={{ color: isActive ? '#000000' : app.accentColor }} 
                    />
                    <span>{app.name}</span>
                    {isActive && (
                      <span 
                        className="w-1.5 h-1.5 rounded-full ml-0.5" 
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
