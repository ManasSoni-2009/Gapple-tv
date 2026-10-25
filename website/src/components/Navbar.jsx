import React, { useState, useEffect, useRef } from 'react'
import { Tv, Download, Terminal, Menu, X, Sparkles, Cpu, Layers } from 'lucide-react'
import { GithubIcon } from './Icons.jsx'
import gsap from 'gsap'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const navRef = useRef(null)
  const mobileMenuRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 25)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
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

  // Animate mobile menu open/close
  useEffect(() => {
    if (!mobileMenuRef.current) return
    if (mobileMenuOpen) {
      gsap.fromTo(
        mobileMenuRef.current,
        { y: -10, autoAlpha: 0, scale: 0.98 },
        { y: 0, autoAlpha: 1, scale: 1, duration: 0.3, ease: 'power2.out' }
      )
    }
  }, [mobileMenuOpen])

  const closeMenu = () => setMobileMenuOpen(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center px-3 sm:px-4 pt-3 sm:pt-4">
      <div className="w-full max-w-6xl mx-auto flex flex-col items-center">
        <nav 
          ref={navRef}
          className={`w-full rounded-full transition-[background-color,border-color,box-shadow] duration-300 px-4 sm:px-5 py-2.5 sm:py-3 flex items-center justify-between ${
            scrolled || mobileMenuOpen
              ? 'glass-card-elevated shadow-2xl shadow-black/80 border-white/20' 
              : 'glass-panel border-white/10'
          }`}
        >
          {/* Brand / Logo */}
          <a href="#" onClick={closeMenu} className="flex items-center gap-2.5 sm:gap-3 group shrink-0">
            <div className="relative flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-br from-white/15 to-white/5 border border-white/20 shadow-inner group-hover:scale-105 transition-transform duration-300">
              <Tv className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#4285F4] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-full w-full bg-gradient-to-r from-[#4285F4] to-[#34A853]"></span>
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm sm:text-base font-bold tracking-tight flex items-center gap-1">
                Gapple <span className="font-light text-white/70">tv</span>
              </span>
              <span className="hidden xs:inline text-[9px] sm:text-[10px] tracking-wider uppercase font-semibold text-white/40 -mt-0.5">
                Apple tvOS for Android
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
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

          {/* Action CTAs (Desktop & Mobile) */}
          <div className="flex items-center gap-2">
            <a
              href="https://github.com/ManasSoni-2009/Gapple-tv"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-full glass-pill text-white/80 hover:text-white transition-all duration-200 touch-active"
            >
              <GithubIcon className="w-3.5 h-3.5" />
              <span>GitHub</span>
            </a>

            <a
              href="./downloads/gapple-tv-release.apk"
              download="Gapple-TV-v1.0.apk"
              className="flex items-center gap-1.5 px-3 sm:px-4 py-1.5 text-xs font-semibold rounded-full bg-white text-black hover:bg-white/90 shadow-lg shadow-white/10 hover:shadow-white/20 active:scale-95 transition-all duration-200 cursor-pointer touch-active"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Get APK</span>
              <span className="hidden xs:inline text-[10px] bg-black/10 px-1.5 py-0.2 rounded-full font-mono text-black/70">1.28MB</span>
            </a>

            {/* Mobile Hamburger / Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden flex items-center justify-center w-8 h-8 rounded-full glass-pill text-white/90 hover:text-white hover:bg-white/10 transition-colors cursor-pointer touch-active"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-4 h-4 text-white" /> : <Menu className="w-4 h-4 text-white" />}
            </button>
          </div>
        </nav>

        {/* Mobile Dropdown Menu Sheet */}
        {mobileMenuOpen && (
          <div
            ref={mobileMenuRef}
            className="w-full mt-2 rounded-2xl glass-card-elevated border border-white/15 p-4 shadow-2xl flex flex-col gap-1.5 md:hidden animate-in fade-in slide-in-from-top-2 duration-200"
          >
            <div className="text-[10px] font-semibold uppercase tracking-wider text-white/40 px-3 py-1">
              Navigation
            </div>
            
            <a
              href="#simulator"
              onClick={closeMenu}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/10 text-white/90 hover:text-white text-sm font-medium transition-colors"
            >
              <Tv className="w-4 h-4 text-[#4285F4]" />
              <span>Live 3D Simulator</span>
            </a>

            <a
              href="#features"
              onClick={closeMenu}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/10 text-white/90 hover:text-white text-sm font-medium transition-colors"
            >
              <Sparkles className="w-4 h-4 text-[#34A853]" />
              <span>Experience & Top Shelf</span>
            </a>

            <a
              href="#performance"
              onClick={closeMenu}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/10 text-white/90 hover:text-white text-sm font-medium transition-colors"
            >
              <Cpu className="w-4 h-4 text-[#FBBC05]" />
              <span>27.6 MB Hardware Benchmark</span>
            </a>

            <a
              href="#guide"
              onClick={closeMenu}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/10 text-white/90 hover:text-white text-sm font-medium transition-colors"
            >
              <Terminal className="w-4 h-4 text-[#EA4335]" />
              <span>Interactive ADB Guide</span>
            </a>

            <div className="border-t border-white/10 my-1 pt-2 flex flex-col gap-2">
              <a
                href="https://github.com/ManasSoni-2009/Gapple-tv"
                target="_blank"
                rel="noopener noreferrer"
                onClick={closeMenu}
                className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl glass-pill text-xs font-semibold text-white/90 hover:text-white"
              >
                <GithubIcon className="w-4 h-4" />
                <span>View on GitHub</span>
              </a>

              <a
                href="./downloads/gapple-tv-release.apk"
                download="Gapple-TV-v1.0.apk"
                onClick={closeMenu}
                className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-white text-black font-semibold text-xs shadow-lg active:scale-98"
              >
                <Download className="w-4 h-4" />
                <span>Download Gapple TV APK (1.28 MB)</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
