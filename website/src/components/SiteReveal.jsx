import React, { useRef, useEffect } from 'react'
import { Tv } from 'lucide-react'
import gsap from 'gsap'

export default function SiteReveal({ onFinished }) {
  const overlayRef = useRef(null)
  const iconRef = useRef(null)
  const textRef = useRef(null)
  const lineRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          if (onFinished) onFinished()
        }
      })

      gsap.set(iconRef.current, { scale: 0.7, autoAlpha: 0, filter: 'blur(10px)' })
      gsap.set(textRef.current, { y: 20, autoAlpha: 0 })
      gsap.set(lineRef.current, { scaleX: 0 })

      tl.to(iconRef.current, {
        scale: 1,
        autoAlpha: 1,
        filter: 'blur(0px)',
        duration: 0.6,
        ease: 'power3.out'
      })
      .to(lineRef.current, {
        scaleX: 1,
        duration: 0.5,
        ease: 'power2.inOut'
      }, '-=0.2')
      .to(textRef.current, {
        y: 0,
        autoAlpha: 1,
        duration: 0.4,
        ease: 'power2.out'
      }, '-=0.3')
      .to(overlayRef.current, {
        autoAlpha: 0,
        scale: 1.05,
        duration: 0.6,
        delay: 0.2,
        ease: 'power4.inOut'
      })
    }, overlayRef)

    return () => ctx.revert()
  }, [onFinished])

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#040507] pointer-events-none select-none"
    >
      <div className="absolute w-[450px] h-[450px] rounded-full bg-gradient-to-tr from-[#4285F4]/20 via-[#34A853]/15 to-[#EA4335]/15 blur-[100px] pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center gap-4">
        <div
          ref={iconRef}
          className="relative w-16 h-16 rounded-2xl glass-card-elevated flex items-center justify-center border border-white/20 shadow-2xl"
        >
          <Tv className="w-8 h-8 text-white drop-shadow-[0_0_12px_rgba(255,255,255,0.6)]" />
          <span className="absolute -top-1 -right-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#4285F4] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-gradient-to-r from-[#4285F4] to-[#34A853]"></span>
          </span>
        </div>

        <div ref={textRef} className="flex flex-col items-center">
          <div className="text-2xl font-bold tracking-tight text-white flex items-center gap-1.5">
            Gapple <span className="font-light text-white/60">tv</span>
          </div>
          <div className="text-[11px] tracking-widest uppercase font-semibold text-white/40 mt-0.5">
            Apple tvOS for Android
          </div>
        </div>

        <div
          ref={lineRef}
          className="w-32 h-0.5 rounded-full bg-gradient-to-r from-[#4285F4] via-[#34A853] via-[#FBBC05] to-[#EA4335] shadow-[0_0_10px_rgba(66,133,244,0.6)] origin-center"
        />
      </div>
    </div>
  )
}
