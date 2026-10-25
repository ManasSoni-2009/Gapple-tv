import React, { useState, useEffect, useRef } from 'react'
import { Tv, Download, Terminal } from 'lucide-react'
import { GithubIcon } from './Icons.jsx'
import gsap from 'gsap'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const navRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        navRef.current,
        { y: -30, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.8,
          delay: 0.2,
          ease: 'power3.out'
        }
      )
    }, navRef)

    return () => ctx.revert()
  }, [])

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-4">
      <nav 
        ref={navRef}
        className={`w-full max-w-6xl mx-auto rounded-full transition-[background-color,border-color,box-shadow] duration-300 px-5 py-3 flex items-center justify-between ${
          scrolled 
            ? 'glass-card-elevated shadow-2xl shadow-black/80 border-white/20' 
            : 'glass-panel border-white/10'
        }`}
      >
        {/* Brand / Logo */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="relative flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-white/15 to-white/5 border border-white/20 shadow-inner group-hover:scale-105 transition-transform duration-300">
            <Tv className="w-5 h-5 text-white" />
            <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#4285F4] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-gradient-to-r from-[#4285F4] to-[#34A853]"></span>
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-base font-bold tracking-tight flex items-center gap-1">
              Gapple <span className="font-light text-white/70">tv</span>
            </span>
            <span className="text-[10px] tracking-wider uppercase font-semibold text-white/40 -mt-0.5">
              Apple tvOS for Android
            </span>
          </div>
        </a>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-1 text-sm font-medium text-white/70">
          <a href="#simulator" className="px-3.5 py-1.5 rounded-full hover:text-white hover:bg-white/5 transition-colors">
            Live Simulator
          </a>
          <a href="#features" className="px-3.5 py-1.5 rounded-full hover:text-white hover:bg-white/5 transition-colors">
            Experience
          </a>
          <a href="#performance" className="px-3.5 py-1.5 rounded-full hover:text-white hover:bg-white/5 transition-colors">
            27MB Benchmark
          </a>
          <a href="#guide" className="px-3.5 py-1.5 rounded-full hover:text-white hover:bg-white/5 transition-colors flex items-center gap-1.5">
            <Terminal className="w-3.5 h-3.5 text-[#34A853]" />
            ADB Guide
          </a>
        </div>

        {/* Action CTAs */}
        <div className="flex items-center gap-2.5">
          <a
            href="https://github.com/ManasSoni-2009/Gapple-tv"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-full glass-pill text-white/80 hover:text-white transition-all duration-200"
          >
            <GithubIcon className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">GitHub</span>
          </a>
          <a
            href="./downloads/gapple-tv-release.apk"
            download="Gapple-TV-v1.0.apk"
            className="flex items-center gap-1.5 px-4 py-1.5 text-xs font-semibold rounded-full bg-white text-black hover:bg-white/90 shadow-lg shadow-white/10 hover:shadow-white/20 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Get APK</span>
            <span className="text-[10px] bg-black/10 px-1.5 py-0.5 rounded-full font-mono text-black/70">1.28MB</span>
          </a>
        </div>
      </nav>
    </header>
  )
}
