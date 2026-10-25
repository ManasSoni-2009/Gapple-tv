import React, { useRef, useEffect } from 'react'
import { Download, FileCode, RotateCcw, Tv, Sparkles, Terminal } from 'lucide-react'
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
    icon: Tv
  },
  {
    name: 'Safe Debloat Script',
    filename: 'debloat.ps1',
    path: './downloads/debloat.ps1',
    size: '1.3 KB',
    desc: 'PowerShell script that disables 40+ ad services, telemetry daemons, and PatchWall bloat.',
    badge: 'Safe for User 0',
    color: '#EA4335',
    icon: FileCode
  },
  {
    name: 'Instant Rollback Script',
    filename: 'restore.ps1',
    path: './downloads/restore.ps1',
    size: '1.2 KB',
    desc: 'One-click restore script that instantly brings back all stock factory applications.',
    badge: '100% Reversible',
    color: '#34A853',
    icon: RotateCcw
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
    <section className="py-20 px-4 max-w-6xl mx-auto">
      <div 
        ref={hubRef}
        className="rounded-3xl p-8 sm:p-12 glass-card-elevated border border-white/15 relative overflow-hidden shadow-2xl"
      >
        {/* Glow ambient background */}
        <div className="absolute top-0 right-1/4 w-96 h-96 rounded-full bg-[#4285F4]/12 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 rounded-full bg-[#34A853]/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-12">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold text-[#4285F4] bg-[#4285F4]/10 border border-[#4285F4]/20 shadow-sm">
              <Sparkles className="w-3.5 h-3.5" />
              <span>DIRECT BINARIES & SCRIPTS</span>
            </div>
            <h3 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              Get Gapple TV Today.
            </h3>
            <p className="text-sm text-white/60 max-w-lg leading-relaxed">
              Download the pre-compiled binary directly, or explore the open-source repository on GitHub.
            </p>
          </div>

          <a
            href="https://github.com/ManasSoni-2009/Gapple-tv"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-2.5 rounded-full glass-pill hover:bg-white/10 text-white font-medium text-xs transition-colors shrink-0 shadow-lg"
          >
            <GithubIcon className="w-4 h-4" />
            <span>View Source on GitHub</span>
          </a>
        </div>

        {/* Download Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {DOWNLOAD_ITEMS.map((item, idx) => {
            const Icon = item.icon
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-black/40 border border-white/10 hover:border-white/25 transition-all duration-300 flex flex-col justify-between group shadow-xl"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div 
                      className="w-11 h-11 rounded-xl flex items-center justify-center border border-white/10 shadow-inner"
                      style={{ background: `${item.color}15` }}
                    >
                      <Icon className="w-5 h-5" style={{ color: item.color }} />
                    </div>
                    <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-white/60">
                      {item.size}
                    </span>
                  </div>

                  <h4 className="text-base font-semibold text-white mb-1 group-hover:text-[#4285F4] transition-colors">
                    {item.name}
                  </h4>
                  <p className="text-xs text-white/50 leading-relaxed mb-5">
                    {item.desc}
                  </p>
                </div>

                <a
                  href={item.path}
                  download={item.filename}
                  className="w-full py-2.5 px-4 rounded-xl font-medium text-xs flex items-center justify-center gap-2 bg-white/10 hover:bg-white text-white hover:text-black transition-all duration-200 shadow-lg cursor-pointer"
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
