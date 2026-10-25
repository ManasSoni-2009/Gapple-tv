import React, { useState, useCallback } from 'react'
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

  const handleRevealFinished = useCallback(() => {
    setRevealDone(true)
  }, [])

  return (
    <div className="relative min-h-screen bg-[#040507] text-white selection:bg-[#4285F4]/30">
      {/* Cinematic Site Reveal Screen - unmounts cleanly once finished */}
      {!revealDone && <SiteReveal onFinished={handleRevealFinished} />}

      {/* Floating Ambient Continuous Particles & Canvas */}
      <AmbientCanvas />

      {/* Sticky Header */}
      <Navbar />

      {/* Main Flow with Fluid Animated Section Bridges */}
      <main className="space-y-4">
        <Hero />
        
        {/* Animated Light Bridge 1 */}
        <div className="section-bridge" />
        
        <TelemetryStrip />
        
        {/* Animated Light Bridge 2 */}
        <div className="section-bridge" />
        
        <FeaturesStory />
        
        {/* Animated Light Bridge 3 */}
        <div className="section-bridge" />
        
        <TvVsStockComparison />
        
        {/* Animated Light Bridge 4 */}
        <div className="section-bridge" />
        
        <InstallStudio />
        
        {/* Animated Light Bridge 5 */}
        <div className="section-bridge" />
        
        <DownloadHub />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}
