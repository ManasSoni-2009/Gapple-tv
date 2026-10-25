import React from 'react'
import { X, Sparkles, Layers } from 'lucide-react'

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
  return (
    <section className="py-24 px-4 max-w-6xl mx-auto">
      <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full glass-pill text-xs font-semibold text-[#FBBC05]">
          <Layers className="w-3.5 h-3.5" />
          <span>HEAD-TO-HEAD BENCHMARK</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight gradient-text-hero">
          Why your TV feels slow. <br />
          <span className="text-white/60">And how Gapple fixes it.</span>
        </h2>
        <p className="text-sm sm:text-base text-white/60">
          Compare the bloated defaults of stock Google TV & PatchWall against Gapple TV’s tuned micro-architecture.
        </p>
      </div>

      <div className="rounded-3xl glass-panel border border-white/10 overflow-hidden shadow-2xl">
        <div className="grid grid-cols-1 md:grid-cols-12 border-b border-white/10 text-xs font-bold uppercase tracking-wider text-white/50 bg-white/[0.02]">
          <div className="md:col-span-4 p-4 sm:p-6">Capability</div>
          <div className="md:col-span-4 p-4 sm:p-6 border-t md:border-t-0 md:border-l border-white/10 text-[#EA4335] flex items-center gap-2">
            <X className="w-4 h-4" /> Stock Google / Android TV
          </div>
          <div className="md:col-span-4 p-4 sm:p-6 border-t md:border-t-0 md:border-l border-white/10 text-[#34A853] flex items-center gap-2 bg-[#34A853]/5">
            <Sparkles className="w-4 h-4 text-[#34A853]" /> Gapple TV (Debloated)
          </div>
        </div>

        <div className="divide-y divide-white/5">
          {COMPARISON_ROWS.map((row, idx) => (
            <div key={idx} className="grid grid-cols-1 md:grid-cols-12 text-sm hover:bg-white/[0.02] transition-colors">
              <div className="md:col-span-4 p-4 sm:p-6 font-semibold text-white/90 flex items-center">
                {row.feature}
              </div>
              <div className="md:col-span-4 p-4 sm:p-6 md:border-l border-white/5 text-white/60 text-xs sm:text-sm flex items-start gap-2.5">
                <span className="w-4 h-4 rounded-full bg-[#EA4335]/20 text-[#EA4335] flex items-center justify-center shrink-0 mt-0.5 text-xs">✕</span>
                <span>{row.stock}</span>
              </div>
              <div className="md:col-span-4 p-4 sm:p-6 md:border-l border-white/5 text-white/90 text-xs sm:text-sm flex items-start gap-2.5 bg-[#34A853]/[0.02]">
                <span className="w-4 h-4 rounded-full bg-[#34A853]/20 text-[#34A853] flex items-center justify-center shrink-0 mt-0.5 text-xs">✓</span>
                <span className="font-medium">{row.gapple}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
