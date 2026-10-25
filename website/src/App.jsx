import React from 'react'
import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import TelemetryStrip from './components/TelemetryStrip.jsx'
import FeaturesStory from './components/FeaturesStory.jsx'
import TvVsStockComparison from './components/TvVsStockComparison.jsx'
import InstallStudio from './components/InstallStudio.jsx'
import DownloadHub from './components/DownloadHub.jsx'
import Footer from './components/Footer.jsx'

export default function App() {
  return (
    <div className="min-h-screen bg-[#050608] text-white selection:bg-[#4285F4]/30">
      <Navbar />
      <main className="space-y-12">
        <Hero />
        <TelemetryStrip />
        <FeaturesStory />
        <TvVsStockComparison />
        <InstallStudio />
        <DownloadHub />
      </main>
      <Footer />
    </div>
  )
}
