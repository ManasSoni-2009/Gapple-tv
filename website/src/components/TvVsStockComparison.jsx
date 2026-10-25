import React, { useRef, useEffect } from 'react'
import { X, Check, Layers, Sparkles } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const COMPARISON_ROWS = [
  {
    feature: 'Home Screen Ads & Promoted Rows',
    stock: 'Excessive (sponsored carousels, auto-playing trailers, promoted store feeds)',
    gapple: 'Zero Ads (pure cinema minimalist top shelf, no tracking)'
  },
  {
    feature: 'Resident RAM Footprint (PSS)',
    stock: '~280 MB – 360 MB (frequent OOM background app kills)',
    gapple: '27.6 MB (verified via Android ADB dumpsys meminfo)'
  },
  {
    feature: 'Scrolling Performance on 1 GB TVs',
    stock: 'Noticeable stutter, 18–30 FPS drops, delayed remote response',
    gapple: 'Locked 60 FPS hardware-accelerated RenderThread'
  },
  {
    feature: 'Background Telemetry & Services',
    stock: '40+ active manufacturer & analytics background daemons',
    gapple: '0 telemetry beacons — 100% offline & private'
  },
  {
    feature: 'Quick Settings / Wi-Fi Experience',
    stock: 'Full screen blacks out, exits your active video stream',
    gapple: 'Translucent frosted glass sheet floating over live launcher'
  },
  {
    feature: 'Launcher Binary Size',
    stock: '150 MB – 400 MB system package bundle',
    gapple: '1.28 MB ultra-lean compiled release APK'
  }
]

export default function TvVsStockComparison() {
  const tableRef = useRef(null)
  const headerRef = useRef(null)
  const rowsRef = useRef([])

  useEffect(() => {
    const ctx = gsap.context(() => {
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

      gsap.fromTo(
        rowsRef.current,
        { y: 25, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.6,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: tableRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        }
      )
    }, tableRef)

    return () => ctx.revert()
  }, [])

  return (
    <section className="py-16 sm:py-24 px-3 sm:px-4 max-w-6xl mx-auto">
      {/* Header */}
      <div ref={headerRef} className="text-center max-w-2xl mx-auto mb-10 sm:mb-16 space-y-2.5 sm:space-y-3 px-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full glass-pill text-[11px] sm:text-xs font-semibold text-[#FBBC05]">
          <Layers className="w-3.5 h-3.5" />
          <span>HEAD-TO-HEAD BENCHMARK</span>
        </div>
        <h2 className="text-2xl xs:text-3xl sm:text-5xl font-extrabold tracking-tight gradient-text-hero">
          Why your TV feels slow. <br />
          <span className="text-white/60">And how Gapple fixes it.</span>
        </h2>
        <p className="text-xs xs:text-sm sm:text-base text-white/60 leading-relaxed">
          Compare the bloated defaults of stock Google TV &amp; Xiaomi PatchWall against Gapple TV’s tuned micro-architecture. Unlocking maximum performance on Android TV and Google TV devices with locked 60 FPS fluidity.
        </p>
      </div>

      <div ref={tableRef}>
        {/* Mobile Dedicated Comparison Cards (<md) */}
        <div className="block md:hidden space-y-3.5">
          {COMPARISON_ROWS.map((row, idx) => (
            <div
              key={idx}
              ref={el => rowsRef.current[idx] = el}
              className="p-4 rounded-2xl glass-card-elevated border border-white/10 space-y-3"
            >
              <div className="text-sm font-bold text-white tracking-tight flex items-center justify-between">
                <span>{row.feature}</span>
                <span className="text-[10px] font-mono text-white/40">#{idx + 1}</span>
              </div>

              {/* Stock Row */}
              <div className="p-3 rounded-xl bg-[#EA4335]/08 border border-[#EA4335]/20 flex items-start gap-2.5">
                <span className="w-4 h-4 rounded-full bg-[#EA4335]/20 text-[#EA4335] flex items-center justify-center shrink-0 mt-0.5">
                  <X className="w-2.5 h-2.5 text-[#EA4335]" />
                </span>
                <div className="space-y-0.5">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-[#EA4335]">
                    Stock Android TV
                  </div>
                  <div className="text-xs text-white/65 leading-relaxed">
                    {row.stock}
                  </div>
                </div>
              </div>

              {/* Gapple Row */}
              <div className="p-3 rounded-xl bg-[#34A853]/10 border border-[#34A853]/30 flex items-start gap-2.5 shadow-[0_0_15px_rgba(52,168,83,0.08)]">
                <span className="w-4 h-4 rounded-full bg-[#34A853]/30 text-[#34A853] flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-2.5 h-2.5 text-[#34A853]" />
                </span>
                <div className="space-y-0.5">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-[#34A853] flex items-center gap-1">
                    <span>Gapple TV</span>
                    <Sparkles className="w-2.5 h-2.5" />
                  </div>
                  <div className="text-xs font-medium text-white/95 leading-relaxed">
                    {row.gapple}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop Comparison Table (md+) */}
        <div className="hidden md:block rounded-3xl glass-card-elevated overflow-hidden shadow-2xl">
          <div className="grid grid-cols-12 border-b border-white/10 text-xs font-bold uppercase tracking-wider text-white/50 bg-white/[0.02]">
            <div className="col-span-4 p-5 sm:p-6">Capability</div>
            <div className="col-span-4 p-5 sm:p-6 border-l border-white/10 text-[#EA4335] flex items-center gap-2">
              <div className="w-5 h-5 rounded-md bg-[#EA4335]/20 flex items-center justify-center">
                <X className="w-3.5 h-3.5 text-[#EA4335]" />
              </div>
              <span>Stock Google / Android TV</span>
            </div>
            <div className="col-span-4 p-5 sm:p-6 border-l border-white/10 text-[#34A853] flex items-center gap-2 bg-[#34A853]/5">
              <div className="w-5 h-5 rounded-md bg-[#34A853]/20 flex items-center justify-center">
                <Sparkles className="w-3.5 h-3.5 text-[#34A853]" />
              </div>
              <span>Gapple TV (Debloated)</span>
            </div>
          </div>

          <div className="divide-y divide-white/5">
            {COMPARISON_ROWS.map((row, idx) => (
              <div 
                key={idx} 
                className="grid grid-cols-12 text-sm hover:bg-white/[0.03] transition-colors"
              >
                <div className="col-span-4 p-5 sm:p-6 font-semibold text-white/90 flex items-center">
                  {row.feature}
                </div>
                <div className="col-span-4 p-5 sm:p-6 border-l border-white/5 text-white/60 text-xs sm:text-sm flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-[#EA4335]/15 text-[#EA4335] flex items-center justify-center shrink-0 mt-0.5 border border-[#EA4335]/20">
                    <X className="w-3 h-3 text-[#EA4335]" />
                  </span>
                  <span className="leading-relaxed">{row.stock}</span>
                </div>
                <div className="col-span-4 p-5 sm:p-6 border-l border-white/5 text-white/90 text-xs sm:text-sm flex items-start gap-3 bg-[#34A853]/[0.02]">
                  <span className="w-5 h-5 rounded-full bg-[#34A853]/20 text-[#34A853] flex items-center justify-center shrink-0 mt-0.5 border border-[#34A853]/30 shadow-[0_0_8px_rgba(52,168,83,0.3)]">
                    <Check className="w-3 h-3 text-[#34A853]" />
                  </span>
                  <span className="font-medium leading-relaxed">{row.gapple}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
