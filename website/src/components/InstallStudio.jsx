import React, { useState } from 'react'
import { Terminal, Copy, Check, Play, Download, ShieldCheck, HelpCircle, Laptop, ArrowRight } from 'lucide-react'
import { AppleIcon } from './Icons.jsx'
import confetti from 'canvas-confetti'

const INSTALL_STEPS = [
  {
    step: '01',
    title: 'Enable USB Debugging on TV',
    desc: 'Go to TV Settings > Device Preferences > About. Click "Build Number" 7 times to unlock Developer Options, then toggle "USB Debugging" ON.',
    commandWin: '# On your TV: Settings > Developer Options > USB Debugging (Enable)',
    commandMac: '# On your TV: Settings > Developer Options > USB Debugging (Enable)',
    simulatedOutput: 'Developer mode is already enabled.\nUSB debugging enabled on port 5555.'
  },
  {
    step: '02',
    title: 'Connect ADB over Wi-Fi',
    desc: 'Find your TV\'s local IP address (e.g., 192.168.1.50) in Network Settings, then connect from your computer.',
    commandWin: '.\\platform-tools\\adb.exe connect 192.168.1.50:5555',
    commandMac: './platform-tools/adb connect 192.168.1.50:5555',
    simulatedOutput: 'connected to 192.168.1.50:5555\nDevice dangal (Xiaomi Mi TV 4A) authorized.'
  },
  {
    step: '03',
    title: 'Install Gapple TV APK',
    desc: 'Push and install the featherweight 1.28 MB launcher binary onto your TV.',
    commandWin: '.\\platform-tools\\adb.exe install -r .\\releases\\app-release.apk',
    commandMac: './platform-tools/adb install -r ./releases/app-release.apk',
    simulatedOutput: 'Performing Streamed Install\nSuccess'
  },
  {
    step: '04',
    title: 'Run One-Click Safe Debloat',
    desc: 'Wipe away 40+ ad-injecting manufacturer services, telemetry beacons, and sponsored feeds.',
    commandWin: '.\\scripts\\debloat.ps1',
    commandMac: 'bash ./scripts/debloat.sh',
    simulatedOutput: '[*] Debloating Xiaomi & Google TV ad trackers...\n[-] Package: com.mitv.tvhome uninstalled for user 0\n[-] Package: com.xiaomi.mitv.advertise uninstalled for user 0\n[+] 420 MB storage recovered. Zero telemetry active.'
  },
  {
    step: '05',
    title: 'Set as Default Home Launcher',
    desc: 'Set Gapple TV as the primary Home Activity so pressing the Home button on your remote always opens Gapple TV.',
    commandWin: '.\\platform-tools\\adb.exe shell cmd package set-home-activity com.gathin.tvhome/.MainActivity',
    commandMac: './platform-tools/adb shell cmd package set-home-activity com.gathin.tvhome/.MainActivity',
    simulatedOutput: 'Success: Home activity set to com.gathin.tvhome/.MainActivity'
  }
]

export default function InstallStudio() {
  const [platform, setPlatform] = useState('windows')
  const [activeStep, setActiveStep] = useState(0)
  const [copiedIndex, setCopiedIndex] = useState(null)
  const [terminalOutput, setTerminalOutput] = useState('')
  const [isRunning, setIsRunning] = useState(false)

  const currentStep = INSTALL_STEPS[activeStep]
  const currentCommand = platform === 'windows' ? currentStep.commandWin : currentStep.commandMac

  const copyCommand = (cmd, index) => {
    navigator.clipboard.writeText(cmd)
    setCopiedIndex(index)
    confetti({
      particleCount: 25,
      spread: 60,
      origin: { y: 0.8 },
      colors: ['#4285F4', '#34A853', '#FBBC05', '#EA4335']
    })
    setTimeout(() => setCopiedIndex(null), 2000)
  }

  const runSimulation = () => {
    setIsRunning(true)
    setTerminalOutput(`> ${currentCommand}\nRunning command on TV...`)
    setTimeout(() => {
      setTerminalOutput(`> ${currentCommand}\n\n${currentStep.simulatedOutput}`)
      setIsRunning(false)
    }, 600)
  }

  return (
    <section id="guide" className="py-24 px-4 max-w-6xl mx-auto">
      <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full glass-pill text-xs font-semibold text-[#34A853]">
          <Terminal className="w-3.5 h-3.5" />
          <span>INTERACTIVE INSTALLATION STUDIO</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight gradient-text-hero">
          Set up in 5 minutes. <br />
          <span className="text-white/60">No root. Fully reversible.</span>
        </h2>
        <p className="text-sm sm:text-base text-white/60">
          Transform your TV using standard Android Debug Bridge (ADB) commands over Wi-Fi. 
          Your TV warranty remains 100% intact, and you can restore anytime with <code>restore.ps1</code>.
        </p>

        <div className="pt-4 flex items-center justify-center">
          <div className="flex items-center gap-1 p-1 rounded-full glass-panel">
            <button
              onClick={() => setPlatform('windows')}
              className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer ${
                platform === 'windows'
                  ? 'bg-white text-black shadow-md'
                  : 'text-white/70 hover:text-white'
              }`}
            >
              <Laptop className="w-3.5 h-3.5" />
              Windows PowerShell
            </button>
            <button
              onClick={() => setPlatform('posix')}
              className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer ${
                platform === 'posix'
                  ? 'bg-white text-black shadow-md'
                  : 'text-white/70 hover:text-white'
              }`}
            >
              <AppleIcon className="w-3.5 h-3.5" />
              macOS / Linux Terminal
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-5 space-y-3">
          {INSTALL_STEPS.map((step, idx) => {
            const isActive = idx === activeStep
            return (
              <div
                key={idx}
                onClick={() => {
                  setActiveStep(idx)
                  setTerminalOutput('')
                }}
                className={`p-4 rounded-2xl border transition-all duration-200 cursor-pointer flex items-start gap-4 ${
                  isActive
                    ? 'glass-panel border-white/30 bg-white/[0.08] shadow-lg'
                    : 'bg-white/[0.02] border-white/5 hover:border-white/15 hover:bg-white/[0.04]'
                }`}
              >
                <span className={`text-xs font-mono font-bold px-2 py-1 rounded-lg ${
                  isActive ? 'bg-[#4285F4] text-white' : 'bg-white/10 text-white/50'
                }`}>
                  {step.step}
                </span>

                <div className="flex-1">
                  <h4 className="text-sm font-semibold text-white mb-1">
                    {step.title}
                  </h4>
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

          <div className="p-4 rounded-2xl glass-panel border border-[#34A853]/20 bg-[#34A853]/5 flex items-start gap-3 mt-6">
            <ShieldCheck className="w-5 h-5 text-[#34A853] shrink-0 mt-0.5" />
            <div className="text-xs space-y-1">
              <span className="font-semibold text-white/90">Zero Risk. 100% Reversible.</span>
              <p className="text-white/60">
                All debloated packages are disabled only for user 0. Run <code>.\scripts\restore.ps1</code> at any time to instantly reinstall original stock apps.
              </p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 rounded-3xl glass-panel border border-white/15 overflow-hidden shadow-2xl flex flex-col">
          <div className="px-4 py-3 bg-black/60 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#EA4335]/80" />
              <span className="w-3 h-3 rounded-full bg-[#FBBC05]/80" />
              <span className="w-3 h-3 rounded-full bg-[#34A853]/80" />
              <span className="text-xs font-mono text-white/40 ml-2">
                terminal — {platform === 'windows' ? 'powershell' : 'zsh'}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => copyCommand(currentCommand, activeStep)}
                className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-medium text-white transition-colors cursor-pointer"
              >
                {copiedIndex === activeStep ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-[#34A853]" />
                    <span className="text-[#34A853]">Copied!</span>
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
                className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#4285F4] hover:bg-[#3367D6] text-xs font-semibold text-white transition-colors cursor-pointer disabled:opacity-50"
              >
                <Play className="w-3.5 h-3.5" />
                <span>Simulate</span>
              </button>
            </div>
          </div>

          <div className="p-6 bg-black/80 font-mono text-xs sm:text-sm space-y-4">
            <div className="text-white/40 text-[11px]">
              # Step {currentStep.step}: {currentStep.title}
            </div>

            <div className="p-3.5 rounded-xl bg-white/[0.04] border border-white/10 text-[#34A853] flex items-center justify-between">
              <code className="break-all">{currentCommand}</code>
            </div>

            <div className="min-h-[160px] p-4 rounded-xl bg-black border border-white/5 font-mono text-xs text-white/70 whitespace-pre-wrap leading-relaxed">
              {terminalOutput || (
                <span className="text-white/30 italic">
                  Press "Simulate" to test run this command against a virtual TV environment, or click "Copy" to paste it into your local terminal.
                </span>
              )}
            </div>
          </div>

          <div className="p-4 bg-white/[0.02] border-t border-white/5 flex items-center justify-between">
            <button
              onClick={() => setActiveStep(Math.max(0, activeStep - 1))}
              disabled={activeStep === 0}
              className="px-3.5 py-1.5 rounded-lg text-xs font-medium text-white/60 hover:text-white disabled:opacity-20 cursor-pointer"
            >
              Previous Step
            </button>

            <span className="text-xs font-mono text-white/40">
              {activeStep + 1} / {INSTALL_STEPS.length}
            </span>

            <button
              onClick={() => setActiveStep(Math.min(INSTALL_STEPS.length - 1, activeStep + 1))}
              disabled={activeStep === INSTALL_STEPS.length - 1}
              className="px-3.5 py-1.5 rounded-lg text-xs font-medium text-white hover:bg-white/10 disabled:opacity-20 cursor-pointer"
            >
              Next Step →
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
