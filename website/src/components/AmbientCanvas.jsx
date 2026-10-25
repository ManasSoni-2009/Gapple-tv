import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function AmbientCanvas() {
  const orb1Ref = useRef(null)
  const orb2Ref = useRef(null)
  const orb3Ref = useRef(null)

  useEffect(() => {
    const tl1 = gsap.to(orb1Ref.current, {
      x: '+=60',
      y: '+=80',
      duration: 8,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    })

    const tl2 = gsap.to(orb2Ref.current, {
      x: '-=80',
      y: '+=50',
      duration: 11,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    })

    const tl3 = gsap.to(orb3Ref.current, {
      x: '+=40',
      y: '-=60',
      duration: 9,
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
        className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-[#4285F4]/10 blur-[140px] transform-gpu"
      />
      <div
        ref={orb2Ref}
        className="absolute top-1/2 right-1/4 w-[550px] h-[550px] rounded-full bg-[#34A853]/08 blur-[160px] transform-gpu"
      />
      <div
        ref={orb3Ref}
        className="absolute bottom-1/4 left-1/3 w-[600px] h-[600px] rounded-full bg-[#EA4335]/06 blur-[180px] transform-gpu"
      />
      <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.04)_1px,transparent_1px)] [background-size:32px_32px] opacity-40" />
    </div>
  )
}
