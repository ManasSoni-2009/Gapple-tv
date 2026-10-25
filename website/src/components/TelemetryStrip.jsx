import React from 'react'
import { Cpu, Zap, ShieldCheck, HardDrive, Gauge, Sparkles } from 'lucide-react'

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
  return (
    <section id="performance" className="py-20 px-4 relative max-w-7xl mx-auto">
      <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full glass-pill text-xs font-semibold text-[#4285F4]">
          <Gauge className="w-3.5 h-3.5" />
          <span>REAL HARDWARE TELEMETRY</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight gradient-text-hero">
          Breathtaking speed. <br />
          <span className="text-white/60">Even on 1 GB RAM TVs.</span>
        </h2>
        <p className="text-sm sm:text-base text-white/60">
          Measured via live Android ADB dumpsys on the budget Xiaomi Mi TV 4A Pro. 
          Gapple TV outperforms the default Google TV launcher in every key metric.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {METRICS.map((metric, i) => {
          const Icon = metric.icon
          return (
            <div
              key={i}
              className="relative group p-6 rounded-3xl glass-panel hover:border-white/20 transition-all duration-300 overflow-hidden flex flex-col justify-between"
            >
              <div 
                className="absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl opacity-0 group-hover:opacity-30 transition-opacity duration-500 pointer-events-none"
                style={{ background: metric.color }}
              />

              <div>
                <div className="flex items-center justify-between mb-4">
                  <div 
                    className="w-10 h-10 rounded-2xl flex items-center justify-center border border-white/10"
                    style={{ background: `${metric.color}18` }}
                  >
                    <Icon className="w-5 h-5" style={{ color: metric.color }} />
                  </div>
                  <span className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-white/50">
                    {metric.subvalue}
                  </span>
                </div>

                <div className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-1">
                  {metric.value}
                </div>
                <div className="text-sm font-semibold text-white/90 mb-2">
                  {metric.label}
                </div>
              </div>

              <p className="text-xs text-white/50 leading-relaxed mt-4 border-t border-white/5 pt-3">
                {metric.description}
              </p>
            </div>
          )
        })}
      </div>
    </section>
  )
}
