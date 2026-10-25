import React, { useRef, useEffect } from 'react'
import { Sparkles, CheckCircle2 } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const STORIES = [
  {
    tag: 'DYNAMIC TOP SHELF',
    tagColor: '#4285F4',
    title: 'Content-Aware Cinema.',
    subtitle: 'Your wallpaper breathes with every move.',
    description: 'Hover over Netflix, Prime Video, or YouTube on your dock, and Gapple TV instantly crossfades the full backdrop into dynamic 4K hero artwork for that app. Just like genuine tvOS.',
    image: './images/tv/tv_dock_prime.png',
    points: [
      'Zero latency asset caching directly in lean memory',
      'Smooth 300ms crossfade interpolator without stutter',
      'Dynamic fallback to minimalist dark gradient when offline'
    ]
  },
  {
    tag: 'TRANSLUCENT SHEETS',
    tagColor: '#34A853',
    title: 'Settings without the Blackout.',
    subtitle: 'Frosted glass floating over live content.',
    description: 'Opening settings or switching Wi-Fi on stock Android TV plunges your display into darkness. Gapple TV uses hardware-accelerated translucent sheets so your launcher remains fully visible behind.',
    image: './images/tv/tv_settings_menu_verified.png',
    points: [
      'Sub-pixel frosted glass with decel(1.8f) slide-in curve',
      'Quick Wi-Fi switcher without navigating nested submenus',
      'Custom app reordering and dock slot customizations'
    ]
  },
  {
    tag: 'PRIVACY & ZERO ADS',
    tagColor: '#FBBC05',
    title: 'Your Living Room. Not a Billboard.',
    subtitle: 'Say goodbye to auto-playing trailers and promoted shows.',
    description: 'Modern smart TVs bombard you with 70% advertising on your home screen. Gapple TV wipes away all promotional rows, sponsored cards, and analytics telemetry, giving you a tranquil sanctuary.',
    image: './images/tv/tv_dock_netflix.png',
    points: [
      '100% free of sponsored trailers and banner ads',
      'Blocks Xiaomi & Google telemetry background pings',
      'Zero account logins or tracking cookies required'
    ]
  },
  {
    tag: 'FEATHERWEIGHT RUNTIME',
    tagColor: '#EA4335',
    title: '27.6 MB Resident Footprint.',
    subtitle: 'Giving budget dual-core TVs a second life.',
    description: 'Engineered in clean, native Android Leanback Java without massive runtime dependencies. The entire APK is just 1.28 MB, leaving 900+ MB of RAM free for 4K video rendering and snappy multitasking.',
    image: './images/tv/tv_screen_apps_grid.png',
    points: [
      'Tiny 1.28 MB APK download size',
      'Strict PSS memory trim policy keeps GC overhead negligible',
      'Compatible with Android 7.0 through Android 14+'
    ]
  }
]

export default function FeaturesStory() {
  const containerRef = useRef(null)
  const rowsRef = useRef([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      rowsRef.current.forEach((row, i) => {
        if (!row) return
        const isEven = i % 2 === 0
        const textCol = row.querySelector('.text-col')
        const visualCol = row.querySelector('.visual-col')

        gsap.fromTo(
          textCol,
          { x: isEven ? -40 : 40, autoAlpha: 0 },
          {
            x: 0,
            autoAlpha: 1,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: row,
              start: 'top 80%',
              toggleActions: 'play none none none'
            }
          }
        )

        gsap.fromTo(
          visualCol,
          { scale: 0.92, y: 30, autoAlpha: 0 },
          {
            scale: 1,
            y: 0,
            autoAlpha: 1,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: row,
              start: 'top 80%',
              toggleActions: 'play none none none'
            }
          }
        )
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="features" ref={containerRef} className="py-24 px-4 max-w-7xl mx-auto space-y-36">
      {STORIES.map((story, i) => {
        const isEven = i % 2 === 0
        return (
          <div
            key={i}
            ref={el => rowsRef.current[i] = el}
            className={`flex flex-col ${
              isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'
            } items-center gap-12 lg:gap-20`}
          >
            {/* Text Column */}
            <div className="text-col flex-1 space-y-6">
              <div 
                className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider border border-white/10"
                style={{ background: `${story.tagColor}15`, color: story.tagColor }}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>{story.tag}</span>
              </div>

              <div className="space-y-2">
                <h3 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
                  {story.title}
                </h3>
                <p className="text-lg sm:text-xl font-medium text-white/70">
                  {story.subtitle}
                </p>
              </div>

              <p className="text-sm sm:text-base text-white/55 leading-relaxed">
                {story.description}
              </p>

              <div className="space-y-3 pt-2">
                {story.points.map((pt, pIdx) => (
                  <div key={pIdx} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 mt-0.5 shrink-0" style={{ color: story.tagColor }} />
                    <span className="text-sm text-white/80">{pt}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Visual Screen Column with Elevated Glass */}
            <div className="visual-col flex-1 w-full">
              <div className="relative group rounded-3xl p-3 glass-card-elevated overflow-hidden hover:border-white/30 transition-all duration-500">
                <div 
                  className="absolute -top-12 -right-12 w-56 h-56 rounded-full blur-3xl opacity-25 pointer-events-none group-hover:opacity-40 transition-opacity duration-700"
                  style={{ background: story.tagColor }}
                />

                <div className="relative aspect-video rounded-2xl overflow-hidden bg-black border border-white/10 shadow-2xl">
                  <img
                    src={story.image}
                    alt={story.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </section>
  )
}
