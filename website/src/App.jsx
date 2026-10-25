import React, { useState } from 'react'
import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import TelemetryStrip from './components/TelemetryStrip.jsx'
import FeaturesStory from './components/FeaturesStory.jsx'
import TvVsStockComparison from './components/TvVsStockComparison.jsx'
import InstallStudio from './components/InstallStudio.jsx'
import DownloadHub from './components/DownloadHub.jsx'
import Footer from './components/Footer.jsx'
import SiteReveal from './components/SiteReveal.jsx'
import AmbientCanvas from './components/AmbientCanvas.jsx'

export default function App() {
  const [revealDone, setRevealDone] = useState(false)

  return (
    <div className="relative min-h-screen bg-[#040507] text-white selection:bg-[#4285F4]/30">
      <SiteReveal onFinished={() => setRevealDone(true)} />
      <AmbientCanvas />
      <Navbar />

      <main className="space-y-4">
        <Hero />
        <div className="section-bridge" />
        <TelemetryStrip />
        <div className="section-bridge" />
        <FeaturesStory />
        <div className="section-bridge" />
        <TvVsStockComparison />
        <div className="section-bridge" />
        <InstallStudio />
        <div className="section-bridge" />
        <DownloadHub />
      </main>

      <Footer />
    </div>
  )
}
