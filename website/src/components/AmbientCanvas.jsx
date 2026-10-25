import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function AmbientCanvas() {
  const orb1Ref = useRef(null)
  const orb2Ref = useRef(null)
  const orb3Ref = useRef(null)

  useEffect(() => {
    // Only run floating micro-drift if device doesn't prefer reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const tl1 = gsap.to(orb1Ref.current, {
      x: '+=40',
      y: '+=50',
      duration: 9,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    })

    const tl2 = gsap.to(orb2Ref.current, {
      x: '-=50',
      y: '+=35',
      duration: 12,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    })

    const tl3 = gsap.to(orb3Ref.current, {
      x: '+=30',
      y: '-=40',
      duration: 10,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    })

    return () => {
      tl1.kill()
      tl2.kill()
      tl3.kill()
    }
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden -z-20">
      <div
        ref={orb1Ref}
        className="absolute top-1/4 left-1/4 w-[280px] sm:w-[500px] h-[280px] sm:h-[500px] rounded-full bg-[#4285F4]/10 blur-[80px] sm:blur-[140px] transform-gpu will-change-transform"
      />
      <div
        ref={orb2Ref}
        className="absolute top-1/2 right-1/4 w-[300px] sm:w-[550px] h-[300px] sm:h-[550px] rounded-full bg-[#34A853]/08 blur-[90px] sm:blur-[160px] transform-gpu will-change-transform"
      />
      <div
        ref={orb3Ref}
        className="absolute bottom-1/4 left-1/3 w-[320px] sm:w-[600px] h-[320px] sm:h-[600px] rounded-full bg-[#EA4335]/06 blur-[90px] sm:blur-[180px] transform-gpu will-change-transform"
      />
      <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.04)_1px,transparent_1px)] [background-size:24px_24px] sm:[background-size:32px_32px] opacity-40" />
    </div>
  )
}
