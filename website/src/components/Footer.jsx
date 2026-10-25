import React from 'react'
import { Tv, Heart, Terminal, ArrowUp } from 'lucide-react'
import { GithubIcon } from './Icons.jsx'

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="border-t border-white/10 bg-[#040507] pt-16 pb-12 px-4 text-xs text-white/50">
      <div className="max-w-6xl mx-auto space-y-10">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center">
              <Tv className="w-4 h-4 text-white" />
            </div>
            <div>
              <div className="font-bold text-white text-sm">Gapple tv</div>
              <div className="text-[11px] text-white/40">Apple tvOS Experience on Android TV</div>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs font-medium">
            <a href="https://github.com/ManasSoni-2009/Gapple-tv" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
              GitHub Repository
            </a>
            <a href="#simulator" className="hover:text-white transition-colors">
              Simulator
            </a>
            <a href="#performance" className="hover:text-white transition-colors">
              Benchmarks
            </a>
            <a href="#guide" className="hover:text-white transition-colors">
              ADB Guide
            </a>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-full glass-pill hover:text-white transition-colors cursor-pointer"
              title="Scroll to Top"
            >
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 space-y-3 leading-relaxed text-white/40 text-[11px]">
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
