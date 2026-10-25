import React from 'react'
import { Tv, Heart, ArrowUp } from 'lucide-react'
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
              <div className="font-bold text-white text-sm">Gapple tv</div>
              <div className="text-[11px] text-white/40">Apple tvOS Experience on Android TV</div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-medium">
            <a href="https://github.com/ManasSoni-2009/Gapple-tv" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors py-1">
              GitHub
            </a>
            <a href="#simulator" className="hover:text-white transition-colors py-1">
              Simulator
            </a>
            <a href="#performance" className="hover:text-white transition-colors py-1">
              Benchmarks
            </a>
            <a href="#guide" className="hover:text-white transition-colors py-1">
              ADB Guide
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

        <div className="border-t border-white/5 pt-6 sm:pt-8 space-y-3 leading-relaxed text-white/40 text-[10px] sm:text-[11px]">
          <p>
            * Legal Disclaimer: Apple TV, tvOS, and Siri Remote are registered trademarks of Apple Inc. Android, Android TV, Google TV, and Google Play are trademarks of Google LLC. Gapple TV is an independent, non-commercial open-source modification project created for personal customization and hardware debloating.
          </p>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pt-2">
            <div>
              Released under the <span className="text-white/60">MIT License</span>. Verified on Xiaomi Mi TV 4A Pro.
            </div>
            <div className="flex items-center gap-1">
              Engineered with <Heart className="w-3 h-3 text-[#EA4335] fill-current" /> by{' '}
              <a 
                href="https://github.com/ManasSoni-2009" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-white/80 hover:text-white underline decoration-white/30"
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
