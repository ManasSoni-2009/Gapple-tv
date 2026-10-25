import React from 'react'
import { Tv, Heart, ArrowUp, ShieldCheck, Zap, Terminal, Sparkles } from 'lucide-react'
import { GithubIcon } from './Icons.jsx'

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="border-t border-white/10 bg-[#040507] pt-12 sm:pt-16 pb-10 sm:pb-12 px-3 sm:px-4 text-xs text-white/50">
      <div className="max-w-6xl mx-auto space-y-8 sm:space-y-10">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center shrink-0">
              <Tv className="w-4 h-4 text-white" />
            </div>
            <div>
              <div className="font-bold text-white text-sm">Gapple TV</div>
              <div className="text-[11px] text-white/40">Apple tvOS Experience for Android TV &amp; Google TV</div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-medium">
            <a href="https://github.com/ManasSoni-2009/Gapple-tv" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors py-1">
              GitHub Repository
            </a>
            <a href="#simulator" className="hover:text-white transition-colors py-1">
              TV Simulator
            </a>
            <a href="#performance" className="hover:text-white transition-colors py-1">
              Performance Benchmarks
            </a>
            <a href="#guide" className="hover:text-white transition-colors py-1">
              ADB Installation Guide
            </a>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-full glass-pill hover:text-white transition-colors cursor-pointer touch-active flex items-center justify-center"
              title="Scroll to Top"
              aria-label="Scroll to top of page"
            >
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Semantic Knowledge Graph & Search Query Topic Directory */}
        <div className="border-t border-white/5 pt-6 sm:pt-8 grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 text-white/60">
          <div className="space-y-2">
            <div className="flex items-center gap-1.5 text-white font-semibold text-xs tracking-wide">
              <Tv className="w-3.5 h-3.5 text-[#4285F4]" />
              <span>Android TV Launchers &amp; Google TV</span>
            </div>
            <p className="text-[11px] text-white/40 leading-relaxed">
              Gapple TV (gapple-tv) is the modern open-source Android TV launcher designed to bring the cinematic Apple tvOS home experience to Google TV, Android TV, and Xiaomi PatchWall devices without ads or bloatware.
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-1.5 text-white font-semibold text-xs tracking-wide">
              <Zap className="w-3.5 h-3.5 text-[#34A853]" />
              <span>Performance on Android TV &amp; Google TVs</span>
            </div>
            <p className="text-[11px] text-white/40 leading-relaxed">
              Achieve locked 60 FPS leanback navigation and drop memory consumption to 27.6 MB resident PSS. Complete 1-click debloat disables 40+ tracking daemons and frees up 420 MB of storage for maximum responsiveness.
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-1.5 text-white font-semibold text-xs tracking-wide">
              <Sparkles className="w-3.5 h-3.5 text-[#FBBC05]" />
              <span>Engineered by Manas Soni</span>
            </div>
            <p className="text-[11px] text-white/40 leading-relaxed">
              Created and open-sourced by <a href="https://github.com/ManasSoni-2009" target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-white underline">Manas Soni</a>. Developed for enthusiasts seeking high performance on Android TV, smart TV debloating, and aesthetic Apple TV UI fusion.
            </p>
          </div>
        </div>

        <div className="border-t border-white/5 pt-6 sm:pt-8 space-y-3 leading-relaxed text-white/40 text-[10px] sm:text-[11px]">
          <p>
            * Legal Disclaimer: Apple TV, tvOS, and Siri Remote are registered trademarks of Apple Inc. Android, Android TV, Google TV, and Google Play are trademarks of Google LLC. Gapple TV is an independent, non-commercial open-source modification project created for personal customization and hardware debloating.
          </p>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pt-2">
            <div>
              Released under the <span className="text-white/60">MIT License</span>. Verified on Xiaomi Mi TV 4A Pro, Chromecast with Google TV, and generic Android TV boxes.
            </div>
            <div className="flex items-center gap-1">
              Engineered with <Heart className="w-3 h-3 text-[#EA4335] fill-current" /> by{' '}
              <a 
                href="https://github.com/ManasSoni-2009" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-white/80 hover:text-white underline decoration-white/30 font-medium"
              >
                Manas Soni
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
