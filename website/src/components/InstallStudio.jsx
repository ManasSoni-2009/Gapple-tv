import React, { useState, useRef, useEffect } from 'react'
import { 
  Terminal, Copy, Check, Play, Download, ShieldCheck, 
  Laptop, ArrowRight, Wifi, Sparkles, HelpCircle, ChevronDown, ChevronUp
} from 'lucide-react'
import { AppleIcon } from './Icons.jsx'
import confetti from 'canvas-confetti'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const INSTALL_STEPS = [
  {
    step: '01',
    shortTitle: 'USB Debugging',
    title: 'Enable USB Debugging on TV',
    badge: 'Hardware Prerequisite',
    desc: 'Go to TV Settings > Device Preferences > About. Click "Build Number" 7 times to unlock Developer Options, then toggle "USB Debugging" ON.',
    commandWin: '# On your TV: Settings > Developer Options > USB Debugging (Toggle ON)',
    commandMac: '# On your TV: Settings > Developer Options > USB Debugging (Toggle ON)',
    outputStream: [
      'Checking Android TV developer status...',
      '[OK] Developer options unlocked.',
      '[OK] adbd listening on port 5555 over Wi-Fi.',
      'Ready for incoming connection.'
    ]
  },
  {
    step: '02',
    shortTitle: 'Connect ADB',
    title: 'Connect ADB over Wi-Fi',
    badge: 'Network Handshake',
    desc: 'Find your TV\'s local IP address in Network Settings (e.g., 192.168.1.50), then connect wirelessly from your computer terminal.',
    commandWin: '.\\platform-tools\\adb.exe connect 192.168.1.50:5555',
    commandMac: './platform-tools/adb connect 192.168.1.50:5555',
    outputStream: [
      'Initiating TCP handshake with 192.168.1.50:5555...',
      'connected to 192.168.1.50:5555',
      'Target: Xiaomi Mi TV 4A Pro 32" (dangal)',
      'Security: RSA key accepted. Device authorized.'
    ]
  },
  {
    step: '03',
    shortTitle: 'Sideload APK',
    title: 'Sideload Gapple TV APK',
    badge: '1.28 MB Leanback Binary',
    desc: 'Push and install the featherweight 1.28 MB launcher APK onto your television storage.',
    commandWin: '.\\platform-tools\\adb.exe install -r .\\releases\\app-release.apk',
    commandMac: './platform-tools/adb install -r ./releases/app-release.apk',
    outputStream: [
      'Streaming APK package (1,276,716 bytes)...',
      'Verifying package integrity: com.gathin.tvhome',
      'Performing Streamed Install [100%]',
      'Success: Gapple TV v1.0.0 installed.'
    ]
  },
  {
    step: '04',
    shortTitle: 'Debloat Ads',
    title: 'Run Safe Debloat Script',
    badge: '420 MB Storage Freed',
    desc: 'Safely disable 40+ ad-injecting manufacturer services, sponsored PatchWall carousels, and telemetry beacons for User 0.',
    commandWin: '.\\scripts\\debloat.ps1',
    commandMac: 'bash ./scripts/debloat.sh',
    outputStream: [
      '[*] Parsing debloat manifest for Xiaomi / Android TV...',
      '[-] Package disabled: com.mitv.tvhome',
      '[-] Package disabled: com.xiaomi.mitv.advertise',
      '[-] Package disabled: com.google.android.tvrecommendations',
      '[-] Package disabled: com.xiaomi.mitv.upgrade',
      '[+] Done! 420 MB RAM/storage recovered. 0 telemetry active.'
    ]
  },
  {
    step: '05',
    shortTitle: 'Default Home',
    title: 'Set Default Home Activity',
    badge: 'Remote Button Binding',
    desc: 'Set Gapple TV as the primary Home Activity so pressing the Home button on your remote control brings you to Gapple TV.',
    commandWin: '.\\platform-tools\\adb.exe shell cmd package set-home-activity com.gathin.tvhome/.MainActivity',
    commandMac: './platform-tools/adb shell cmd package set-home-activity com.gathin.tvhome/.MainActivity',
    outputStream: [
      'Configuring Intent.CATEGORY_HOME handler...',
      'Active Home Activity -> com.gathin.tvhome/.MainActivity',
      '[+] Success: System default launcher registered.',
      'Enjoy your silky-smooth Gapple TV experience!'
    ]
  }
]

const FAQS = [
  {
    q: 'What is Gapple TV and how does it bring Apple tvOS to Android TV?',
    a: 'Gapple TV is a high-performance open-source TV launcher created by Manas Soni that brings the fluid aesthetics, dynamic top-shelf backdrop artwork, and frosted glass sheet menus of Apple tvOS to Android TV and Google TV devices.'
  },
  {
    q: 'How does Gapple TV improve performance on Android TV and Google TV?',
    a: 'Gapple TV drops launcher resident memory (PSS) from ~320 MB on stock Google TV down to just 27.6 MB (>91% RAM reduction) and delivers locked 60 FPS scrolling on budget 1 GB RAM TVs like Xiaomi Mi TV.'
  },
  {
    q: 'Does Gapple TV require root or void my TV warranty?',
    a: 'No! ADB package disabling operates strictly for User 0 without rooting. All underlying factory packages remain completely untouched in the system ROM partition.'
  },
  {
    q: 'How do I revert back to the original stock launcher?',
    a: 'Simply run ".\\scripts\\restore.ps1" (or "./scripts/restore.sh"). It instantly reinstalls all original factory applications and restores the default launcher in under 5 seconds.'
  },
  {
    q: 'Does Gapple TV eliminate ads and telemetry?',
    a: 'Yes. Gapple TV strips away all sponsored carousels, promoted billboard banners, and auto-playing trailer previews, providing a 100% ad-free, private living room experience.'
  },
  {
    q: 'Who developed Gapple TV?',
    a: 'Gapple TV was engineered by Manas Soni as an open-source, privacy-first launcher replacement designed to restore 60 FPS speed to smart TVs.'
  }
]

export default function InstallStudio() {
  const [platform, setPlatform] = useState('windows')
  const [activeStep, setActiveStep] = useState(0)
  const [copiedIndex, setCopiedIndex] = useState(null)
  const [terminalLines, setTerminalLines] = useState([])
  const [isRunning, setIsRunning] = useState(false)
  const [expandedFaq, setExpandedFaq] = useState(null)
  const [tvIp, setTvIp] = useState('192.168.1.50')
  const [isPinging, setIsPinging] = useState(false)
  const [pingSuccess, setPingSuccess] = useState(false)

  const studioRef = useRef(null)

  const currentStep = INSTALL_STEPS[activeStep]
  const currentCommand = platform === 'windows' 
    ? currentStep.commandWin.replace('192.168.1.50', tvIp)
    : currentStep.commandMac.replace('192.168.1.50', tvIp)

  // Scroll reveal
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        studioRef.current,
        { y: 40, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: studioRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        }
      )
    }, studioRef)

    return () => ctx.revert()
  }, [])

  // Auto-fill terminal lines when changing step
  useEffect(() => {
    setTerminalLines([
      `# Step ${currentStep.step}: ${currentStep.title}`,
      `> ${currentCommand}`,
      ''
    ])
  }, [activeStep, platform, tvIp])

  const copyCommand = (cmd, index) => {
    navigator.clipboard.writeText(cmd)
    setCopiedIndex(index)
    confetti({
      particleCount: 20,
      spread: 50,
      origin: { y: 0.8 },
      colors: ['#4285F4', '#34A853', '#FBBC05', '#EA4335']
    })
    setTimeout(() => setCopiedIndex(null), 1800)
  }

  const runSimulation = () => {
    if (isRunning) return
    setIsRunning(true)
    setTerminalLines([`> ${currentCommand}`, 'Running command over wireless bridge...'])

    currentStep.outputStream.forEach((line, index) => {
      setTimeout(() => {
        setTerminalLines(prev => [...prev, line])
        if (index === currentStep.outputStream.length - 1) {
          setIsRunning(false)
        }
      }, (index + 1) * 200)
    })
  }

  const testPing = () => {
    setIsPinging(true)
    setPingSuccess(false)
    setTimeout(() => {
      setIsPinging(false)
      setPingSuccess(true)
      setTimeout(() => setPingSuccess(false), 3000)
    }, 600)
  }

  return (
    <section id="guide" ref={studioRef} className="py-16 sm:py-24 px-3 sm:px-4 max-w-6xl mx-auto space-y-12 sm:space-y-16">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2.5 sm:space-y-3 px-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full glass-pill text-[11px] sm:text-xs font-semibold text-[#34A853]">
          <Terminal className="w-3.5 h-3.5" />
          <span>INTERACTIVE INSTALLATION STUDIO</span>
        </div>
        <h2 className="text-2xl xs:text-3xl sm:text-5xl font-extrabold tracking-tight gradient-text-hero">
          Set up in 5 minutes. <br />
          <span className="text-white/60">No root. Fully reversible.</span>
        </h2>
        <p className="text-xs xs:text-sm sm:text-base text-white/60 leading-relaxed">
          Transform your TV using standard Android Debug Bridge (ADB) commands over Wi-Fi. 
          Your TV warranty remains 100% intact, and you can restore anytime with <code>restore.ps1</code>.
        </p>

        {/* IP Configurator & Platform Selector (Responsive on mobile) */}
        <div className="pt-3 sm:pt-4 flex flex-wrap items-center justify-center gap-2.5 sm:gap-3">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full glass-pill text-xs">
            <Wifi className="w-3.5 h-3.5 text-[#4285F4] shrink-0" />
            <span className="text-white/50 text-[11px] sm:text-xs">TV IP:</span>
            <input
              type="text"
              value={tvIp}
              onChange={e => setTvIp(e.target.value)}
              className="w-24 sm:w-28 bg-transparent text-white font-mono focus:outline-none text-[11px] sm:text-xs text-center border-b border-white/20"
              placeholder="192.168.1.50"
            />
            <button
              onClick={testPing}
              disabled={isPinging}
              className="ml-1 text-[11px] font-semibold text-[#34A853] hover:underline cursor-pointer touch-active"
            >
              {isPinging ? '...' : pingSuccess ? 'Online' : 'Ping'}
            </button>
          </div>

          <div className="flex items-center gap-1 p-1 rounded-full glass-panel">
            <button
              onClick={() => setPlatform('windows')}
              className={`flex items-center gap-1.5 px-3 sm:px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer touch-active ${
                platform === 'windows'
                  ? 'bg-white text-black shadow-md'
                  : 'text-white/70 hover:text-white'
              }`}
            >
              <Laptop className="w-3.5 h-3.5" />
              <span>PowerShell</span>
            </button>
            <button
              onClick={() => setPlatform('posix')}
              className={`flex items-center gap-1.5 px-3 sm:px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer touch-active ${
                platform === 'posix'
                  ? 'bg-white text-black shadow-md'
                  : 'text-white/70 hover:text-white'
              }`}
            >
              <AppleIcon className="w-3.5 h-3.5" />
              <span>macOS / Linux</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Step Segmented Bar (Mobile only: lets mobile users jump steps without scrolling past all cards) */}
      <div className="block lg:hidden">
        <div className="text-[11px] font-semibold text-white/50 uppercase tracking-wider mb-2 px-1 flex items-center justify-between">
          <span>Installation Steps</span>
          <span className="text-white/40 font-mono">Step {activeStep + 1} of 5</span>
        </div>
        <div className="flex overflow-x-auto no-scrollbar gap-2 pb-2 snap-x">
          {INSTALL_STEPS.map((s, idx) => (
            <button
              key={idx}
              onClick={() => setActiveStep(idx)}
              className={`snap-center shrink-0 flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer min-h-[40px] touch-active ${
                activeStep === idx
                  ? 'bg-white text-black shadow-lg shadow-white/20'
                  : 'glass-panel text-white/60 hover:text-white'
              }`}
            >
              <span className="font-mono text-[10px] opacity-70">{s.step}</span>
              <span>{s.shortTitle}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Studio Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
        {/* Desktop Step Selector Column (Left 5 cols) */}
        <div className="hidden lg:block lg:col-span-5 space-y-3">
          {INSTALL_STEPS.map((step, idx) => {
            const isActive = idx === activeStep
            return (
              <div
                key={idx}
                onClick={() => setActiveStep(idx)}
                className={`p-4 rounded-2xl border transition-all duration-200 cursor-pointer flex items-start gap-4 ${
                  isActive
                    ? 'glass-card-elevated border-white/30 shadow-xl'
                    : 'bg-white/[0.02] border-white/5 hover:border-white/15 hover:bg-white/[0.04]'
                }`}
              >
                <span className={`text-xs font-mono font-bold px-2 py-1 rounded-lg ${
                  isActive ? 'bg-[#4285F4] text-white shadow-md' : 'bg-white/10 text-white/50'
                }`}>
                  {step.step}
                </span>

                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="text-sm font-semibold text-white">
                      {step.title}
                    </h4>
                    <span className="text-[10px] font-mono text-white/40">
                      {step.badge}
                    </span>
                  </div>
                  <p className="text-xs text-white/50 leading-relaxed line-clamp-2">
                    {step.desc}
                  </p>
                </div>

                {isActive && (
                  <ArrowRight className="w-4 h-4 text-[#4285F4] mt-1 shrink-0" />
                )}
              </div>
            )
          })}

          {/* Desktop Reversibility Guarantee Note */}
          <div className="p-4 rounded-2xl glass-panel border border-[#34A853]/20 bg-[#34A853]/5 flex items-start gap-3 mt-6">
            <ShieldCheck className="w-5 h-5 text-[#34A853] shrink-0 mt-0.5" />
            <div className="text-xs space-y-1">
              <span className="font-semibold text-white/90">Zero Risk. 100% Reversible.</span>
              <p className="text-white/60">
                All debloated packages are disabled only for user 0. Run <code>.\scripts\restore.ps1</code> at any time to instantly restore all stock apps.
              </p>
            </div>
          </div>
        </div>

        {/* Terminal Simulator Console (Right 7 cols on desktop, full width on mobile) */}
        <div className="lg:col-span-7 rounded-2xl sm:rounded-3xl glass-card-elevated overflow-hidden shadow-2xl flex flex-col w-full">
          {/* Terminal Window Header */}
          <div className="px-3 sm:px-4 py-2.5 sm:py-3 bg-black/70 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <span className="w-2.5 sm:w-3 h-2.5 sm:h-3 rounded-full bg-[#EA4335]/90 shadow-sm" />
              <span className="w-2.5 sm:w-3 h-2.5 sm:h-3 rounded-full bg-[#FBBC05]/90 shadow-sm" />
              <span className="w-2.5 sm:w-3 h-2.5 sm:h-3 rounded-full bg-[#34A853]/90 shadow-sm" />
              <span className="text-[11px] sm:text-xs font-mono text-white/40 ml-1.5 truncate max-w-[120px] xs:max-w-none">
                gapple — {platform === 'windows' ? 'powershell' : 'zsh'}
              </span>
            </div>

            <div className="flex items-center gap-1.5 sm:gap-2">
              <button
                onClick={() => copyCommand(currentCommand, activeStep)}
                className="flex items-center gap-1 px-2.5 sm:px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-medium text-white transition-colors cursor-pointer touch-active"
              >
                {copiedIndex === activeStep ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-[#34A853]" />
                    <span className="text-[#34A853]">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-white/70" />
                    <span>Copy</span>
                  </>
                )}
              </button>

              <button
                onClick={runSimulation}
                disabled={isRunning}
                className="flex items-center gap-1 px-3 sm:px-3.5 py-1.5 rounded-lg bg-[#4285F4] hover:bg-[#3367D6] text-xs font-semibold text-white transition-colors cursor-pointer disabled:opacity-50 shadow-md shadow-[#4285F4]/30 touch-active"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>{isRunning ? 'Running' : 'Simulate'}</span>
              </button>
            </div>
          </div>

          {/* Code Execution Box */}
          <div className="p-4 sm:p-6 bg-black/85 font-mono text-xs sm:text-sm space-y-3 sm:space-y-4">
            <div className="text-white/40 text-[10px] sm:text-[11px] flex items-center justify-between">
              <span className="truncate max-w-[70%]"># Step {currentStep.step}: {currentStep.title}</span>
              <span className="text-[#34A853] shrink-0">{currentStep.badge}</span>
            </div>

            <div className="p-3 sm:p-4 rounded-xl bg-white/[0.05] border border-white/10 text-[#34A853] flex items-center justify-between">
              <code className="break-all text-[11px] sm:text-xs select-all">{currentCommand}</code>
            </div>

            {/* Simulated Live Output Stream */}
            <div className="min-h-[140px] sm:min-h-[170px] p-3 sm:p-4 rounded-xl bg-[#030406] border border-white/5 font-mono text-[11px] sm:text-xs text-white/75 whitespace-pre-wrap leading-relaxed shadow-inner">
              {terminalLines.map((line, lIdx) => (
                <div 
                  key={lIdx} 
                  className={line.startsWith('[+]') ? 'text-[#34A853]' : line.startsWith('[-]') ? 'text-[#FBBC05]' : ''}
                >
                  {line}
                </div>
              ))}
              {isRunning && (
                <span className="inline-block w-2 h-3.5 bg-[#34A853] animate-pulse ml-1" />
              )}
            </div>
          </div>

          {/* Quick Step Navigation Footer */}
          <div className="p-3 sm:p-4 bg-white/[0.02] border-t border-white/5 flex items-center justify-between">
            <button
              onClick={() => setActiveStep(Math.max(0, activeStep - 1))}
              disabled={activeStep === 0}
              className="px-3 py-1.5 rounded-lg text-xs font-medium text-white/60 hover:text-white disabled:opacity-20 cursor-pointer touch-active"
            >
              ← Previous
            </button>

            <span className="text-xs font-mono text-white/40">
              {activeStep + 1} / {INSTALL_STEPS.length}
            </span>

            <button
              onClick={() => setActiveStep(Math.min(INSTALL_STEPS.length - 1, activeStep + 1))}
              disabled={activeStep === INSTALL_STEPS.length - 1}
              className="px-3 py-1.5 rounded-lg text-xs font-medium text-white hover:bg-white/10 disabled:opacity-20 cursor-pointer touch-active"
            >
              Next →
            </button>
          </div>
        </div>

        {/* Mobile Reversibility Guarantee Note (Appears below terminal on mobile) */}
        <div className="block lg:hidden w-full">
          <div className="p-4 rounded-2xl glass-panel border border-[#34A853]/20 bg-[#34A853]/5 flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-[#34A853] shrink-0 mt-0.5" />
            <div className="text-xs space-y-1">
              <span className="font-semibold text-white/90">Zero Risk. 100% Reversible.</span>
              <p className="text-white/60 text-[11px] leading-relaxed">
                All debloated packages are disabled only for user 0. Run <code>.\scripts\restore.ps1</code> at any time to instantly restore all stock apps.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Troubleshooting FAQs Drawer */}
      <div className="rounded-2xl sm:rounded-3xl glass-card-elevated p-4 sm:p-8 space-y-3 sm:space-y-4">
        <div className="flex items-center gap-2 mb-1 sm:mb-2 text-xs sm:text-sm font-bold text-white uppercase tracking-wider">
          <HelpCircle className="w-4 h-4 text-[#FBBC05] shrink-0" />
          <span>Troubleshooting & FAQs</span>
        </div>

        <div className="space-y-2.5 sm:space-y-3">
          {FAQS.map((faq, fIdx) => {
            const isExpanded = expandedFaq === fIdx
            return (
              <div 
                key={fIdx}
                className="rounded-xl sm:rounded-2xl border border-white/8 bg-white/[0.02] overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => setExpandedFaq(isExpanded ? null : fIdx)}
                  className="w-full p-3.5 sm:p-4 text-left flex items-center justify-between text-xs sm:text-sm font-semibold text-white/90 hover:text-white cursor-pointer touch-active"
                >
                  <span className="pr-3 leading-snug">{faq.q}</span>
                  {isExpanded ? (
                    <ChevronUp className="w-4 h-4 text-white/40 shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-white/40 shrink-0" />
                  )}
                </button>
                {isExpanded && (
                  <div className="px-3.5 sm:px-4 pb-3.5 sm:pb-4 text-xs text-white/60 leading-relaxed border-t border-white/5 pt-2.5 sm:pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
