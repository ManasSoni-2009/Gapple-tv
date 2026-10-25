import React, { useRef, useEffect } from 'react'
import { Cpu, Zap, ShieldCheck, HardDrive, Gauge } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const METRICS = [
  {
    value: '27.6 MB',
    subvalue: 'from 320 MB',
    label: 'Resident RAM Footprint',
    description: 'Over 91% memory freed for smooth video playback without OOM app crashes.',
    color: '#4285F4',
    icon: Cpu
  },
  {
    value: '60 FPS',
    subvalue: 'Locked vs 24 FPS',
    label: 'Smooth RenderThread',
    description: 'No dropped frames or UI stutter when scrolling through 50+ installed apps.',
    color: '#34A853',
    icon: Zap
  },
  {
    value: '0 Ads',
    subvalue: '100% Privacy',
    label: 'Zero Sponsored Banners',
    description: 'No auto-playing trailer previews, recommended feeds, or telemetry tracking.',
    color: '#FBBC05',
    icon: ShieldCheck
  },
  {
    value: '420+ MB',
    subvalue: 'Flash Storage',
    label: 'Storage Recovered',
    description: 'Debloated 40+ system bloatware packages safely with instant restore capability.',
    color: '#EA4335',
    icon: HardDrive
  }
]

export default function TelemetryStrip() {
  const sectionRef = useRef(null)
  const headerRef = useRef(null)
  const cardsRef = useRef([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header entrance
      gsap.fromTo(
        headerRef.current,
        { y: 35, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        }
      )

      // Cards staggered reveal
      gsap.fromTo(
        cardsRef.current,
        { y: 45, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.8,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            toggleActions: 'play none none none'
          }
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section 
      id="performance" 
      ref={sectionRef} 
      className="py-16 sm:py-24 px-3 sm:px-4 relative max-w-7xl mx-auto"
    >
      {/* Section Header */}
      <div ref={headerRef} className="text-center max-w-2xl mx-auto mb-10 sm:mb-16 space-y-2.5 sm:space-y-3 px-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full glass-pill text-[11px] sm:text-xs font-semibold text-[#4285F4]">
          <Gauge className="w-3.5 h-3.5" />
          <span>REAL HARDWARE TELEMETRY</span>
        </div>
        <h2 className="text-2xl xs:text-3xl sm:text-5xl font-extrabold tracking-tight gradient-text-hero">
          Breathtaking speed. <br />
          <span className="text-white/60">Even on 1 GB RAM TVs.</span>
        </h2>
        <p className="text-xs xs:text-sm sm:text-base text-white/60 leading-relaxed">
          Measured via live Android ADB dumpsys on the budget Xiaomi Mi TV 4A Pro. 
          Gapple TV outperforms the default Google TV launcher in every key metric.
        </p>
      </div>

      {/* Grid of Metric Cards (1 col mobile, 2 cols tablet, 4 cols desktop) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {METRICS.map((metric, i) => {
          const Icon = metric.icon
          return (
            <div
              key={i}
              ref={el => cardsRef.current[i] = el}
              className="relative group p-5 sm:p-7 rounded-2xl sm:rounded-3xl glass-card-elevated hover:border-white/25 transition-all duration-300 overflow-hidden flex flex-col justify-between"
            >
              {/* Luminous ambient highlight on hover */}
              <div 
                className="absolute top-0 right-0 w-32 sm:w-36 h-32 sm:h-36 rounded-full blur-3xl opacity-0 group-hover:opacity-35 transition-opacity duration-500 pointer-events-none"
                style={{ background: metric.color }}
              />

              <div>
                <div className="flex items-center justify-between mb-4 sm:mb-5">
                  <div 
                    className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl sm:rounded-2xl flex items-center justify-center border border-white/10 shadow-inner"
                    style={{ background: `${metric.color}20` }}
                  >
                    <Icon className="w-5 h-5" style={{ color: metric.color }} />
                  </div>
                  <span className="text-[10px] sm:text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-white/60">
                    {metric.subvalue}
                  </span>
                </div>

                <div className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white mb-0.5 sm:mb-1">
                  {metric.value}
                </div>
                <div className="text-xs sm:text-sm font-semibold text-white/90 mb-1 sm:mb-2">
                  {metric.label}
                </div>
              </div>

              <p className="text-[11px] sm:text-xs text-white/50 leading-relaxed mt-3 sm:mt-4 border-t border-white/5 pt-3 sm:pt-3.5">
                {metric.description}
              </p>
            </div>
          )
        })}
      </div>
    </section>
  )
}
