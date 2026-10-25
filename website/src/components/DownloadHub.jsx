import React, { useRef, useEffect } from 'react'
import { Download, FileCode, RotateCcw, Tv, Sparkles } from 'lucide-react'
import { GithubIcon } from './Icons.jsx'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const DOWNLOAD_ITEMS = [
  {
    name: 'Gapple TV Launcher APK',
    filename: 'gapple-tv-release.apk',
    path: './downloads/gapple-tv-release.apk',
    size: '1.28 MB',
    desc: 'Production release APK compiled with ProGuard and Android Leanback optimization.',
    badge: 'Signed v1.0',
    color: '#4285F4',
    icon: Tv,
    primary: true
  },
  {
    name: 'Safe Debloat Script',
    filename: 'debloat.ps1',
    path: './downloads/debloat.ps1',
    size: '1.3 KB',
    desc: 'PowerShell script that disables 40+ ad services, telemetry daemons, and PatchWall bloat.',
    badge: 'Safe for User 0',
    color: '#EA4335',
    icon: FileCode,
    primary: false
  },
  {
    name: 'Instant Rollback Script',
    filename: 'restore.ps1',
    path: './downloads/restore.ps1',
    size: '1.2 KB',
    desc: 'One-click restore script that instantly brings back all stock factory applications.',
    badge: '100% Reversible',
    color: '#34A853',
    icon: RotateCcw,
    primary: false
  }
]

export default function DownloadHub() {
  const hubRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        hubRef.current,
        { scale: 0.95, y: 40, autoAlpha: 0 },
        {
          scale: 1,
          y: 0,
          autoAlpha: 1,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: hubRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        }
      )
    }, hubRef)

    return () => ctx.revert()
  }, [])

  return (
    <section className="py-16 sm:py-20 px-3 sm:px-4 max-w-6xl mx-auto">
      <div 
        ref={hubRef}
        className="rounded-2xl sm:rounded-3xl p-5 sm:p-12 glass-card-elevated border border-white/15 relative overflow-hidden shadow-2xl"
      >
        {/* Glow ambient background */}
        <div className="absolute top-0 right-1/4 w-64 sm:w-96 h-64 sm:h-96 rounded-full bg-[#4285F4]/12 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-64 sm:w-96 h-64 sm:h-96 rounded-full bg-[#34A853]/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-5 sm:gap-6 mb-8 sm:mb-12">
          <div className="space-y-1.5 sm:space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] sm:text-xs font-semibold text-[#4285F4] bg-[#4285F4]/10 border border-[#4285F4]/20 shadow-sm">
              <Sparkles className="w-3.5 h-3.5" />
              <span>DIRECT BINARIES & SCRIPTS</span>
            </div>
            <h3 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              Get Gapple TV Today.
            </h3>
            <p className="text-xs sm:text-sm text-white/60 max-w-lg leading-relaxed">
              Download the pre-compiled binary directly, or explore the open-source repository on GitHub.
            </p>
          </div>

          <a
            href="https://github.com/ManasSoni-2009/Gapple-tv"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-full glass-pill hover:bg-white/10 text-white font-medium text-xs transition-colors shrink-0 shadow-lg touch-active w-full sm:w-auto justify-center"
          >
            <GithubIcon className="w-4 h-4" />
            <span>View Source on GitHub</span>
          </a>
        </div>

        {/* Download Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
          {DOWNLOAD_ITEMS.map((item, idx) => {
            const Icon = item.icon
            return (
              <div
                key={idx}
                className={`p-5 sm:p-6 rounded-2xl bg-black/40 border transition-all duration-300 flex flex-col justify-between group shadow-xl ${
                  item.primary ? 'border-white/25 shadow-[0_0_25px_rgba(66,133,244,0.12)]' : 'border-white/10 hover:border-white/20'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3 sm:mb-4">
                    <div 
                      className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center border border-white/10 shadow-inner"
                      style={{ background: `${item.color}15` }}
                    >
                      <Icon className="w-5 h-5" style={{ color: item.color }} />
                    </div>
                    <span className="text-[10px] sm:text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-white/60">
                      {item.size}
                    </span>
                  </div>

                  <h4 className="text-sm sm:text-base font-semibold text-white mb-1 group-hover:text-[#4285F4] transition-colors">
                    {item.name}
                  </h4>
                  <p className="text-xs text-white/50 leading-relaxed mb-4 sm:mb-5">
                    {item.desc}
                  </p>
                </div>

                <a
                  href={item.path}
                  download={item.filename}
                  className={`w-full py-3 px-4 rounded-xl font-semibold text-xs flex items-center justify-center gap-2 transition-all duration-200 shadow-lg cursor-pointer min-h-[44px] touch-active ${
                    item.primary
                      ? 'bg-white text-black hover:bg-white/90 shadow-white/10'
                      : 'bg-white/10 hover:bg-white text-white hover:text-black'
                  }`}
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download {item.filename}</span>
                </a>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
