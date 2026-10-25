<div align="center">

<!-- Hero Animated SVG Header -->
<a href="https://gapple-tv.vercel.app">
  <img src="assets/banner-hero.svg" alt="Gapple TV - Pure Cinema. Zero Bloat." width="100%" />
</a>

<br/><br/>

<!-- Shields.io Aesthetic Badges -->
[![Showcase Live](https://img.shields.io/badge/Showcase_Live-gapple--tv.vercel.app-000000?style=for-the-badge&logo=vercel&logoColor=white&labelColor=07090E)](https://gapple-tv.vercel.app)
[![Resident RAM](https://img.shields.io/badge/Resident_RAM-27.6_MB_PSS-34A853?style=for-the-badge&logo=android&logoColor=white&labelColor=07090E)](#-hardware-telemetry-benchmarks)
[![Framerate](https://img.shields.io/badge/Framerate-60_FPS_Locked-4285F4?style=for-the-badge&logo=apple&logoColor=white&labelColor=07090E)](#-hardware-telemetry-benchmarks)
[![Binary Size](https://img.shields.io/badge/Release_APK-1.28_MB-EA4335?style=for-the-badge&logo=googleplay&logoColor=white&labelColor=07090E)](https://gapple-tv.vercel.app/downloads/gapple-tv-release.apk)
[![License](https://img.shields.io/badge/License-MIT-FBBC05?style=for-the-badge&logoColor=white&labelColor=07090E)](LICENSE)

<br/>

<p align="center">
  <b>The definitive open-source fusion between Apple tvOS aesthetic luxury and Android TV micro-kernel performance.</b><br/>
  <i>Engineered for 1 GB RAM Smart TVs. 91.4% less memory footprint, locked 60 FPS leanback scrolling, and 0 ads.</i>
</p>

<p align="center">
  <a href="https://gapple-tv.vercel.app">🌐 <b>Live Web Showcase</b></a> &nbsp;◆&nbsp;
  <a href="https://gapple-tv.vercel.app/downloads/gapple-tv-release.apk">⚡ <b>Direct APK Download (1.28 MB)</b></a> &nbsp;◆&nbsp;
  <a href="#-quick-start--interactive-adb-studio">🚀 <b>5-Min Setup Guide</b></a> &nbsp;◆&nbsp;
  <a href="#-hardware-telemetry-benchmarks">📊 <b>Telemetry Benchmarks</b></a> &nbsp;◆&nbsp;
  <a href="#-author--maintainer">👤 <b>Author</b></a>
</p>

<p align="center">
  <img src="assets/divider.svg" width="100%" />
</p>

</div>

---

## 🌟 The Core Philosophy

Stock Android TV and Google TV have become sluggish billboard carousels. On budget Smart TVs (like the Xiaomi Mi TV 4A with 1.0 GB RAM), stock launchers consume **over 320 MB of resident RAM (PSS)**, generate 18–30 FPS UI stutter, force frequent Out-Of-Memory (OOM) background app kills, and run 40+ manufacturer ad-tracking daemons.

**Gapple TV** is a ground-up reconstruction of the living room television experience:
- **Apple tvOS Design Language**: Pure glassmorphic aesthetics, content-aware dynamic top shelf poster backdrops, and frosted translucent overlays.
- **Micro-Kernel Efficiency**: Built in native Java on Android's hardware-accelerated Leanback SDK, compiled to a tiny **1.28 MB APK**.
- **Sanctuary of Privacy**: 100% offline, zero analytics, zero telemetric reporting, zero banner billboards.

<br/>

<div align="center">
  <img src="assets/features-grid.svg" width="100%" alt="Flagship Architectural Pillars" />
</div>

<br/>

<p align="center">
  <img src="assets/divider.svg" width="100%" />
</p>

---

## 📊 Hardware Telemetry Benchmarks

> **Test Environment**: Real-world hardware stress testing executed on a **Xiaomi Mi TV 4A Pro 32" (`dangal`)** running Android 9 Pie (SDK 28) with **1.0 GB physical RAM** and an Amlogic 64-bit Quad-Core CPU via `adb shell dumpsys meminfo com.gathin.tvhome`.

<div align="center">
  <img src="assets/telemetry-benchmark.svg" width="100%" alt="Hardware Telemetry Benchmarks" />
</div>

<br/>

### Head-to-Head Architectural Comparison

| Performance Metric | Stock Google TV / PatchWall | Gapple TV (Debloated) | Delta / Impact |
| :--- | :--- | :--- | :--- |
| **Resident RAM Footprint (PSS)** | `318.4 MB – 362.1 MB` | **`27.6 MB`** | 🟢 **91.4% Memory Freed** |
| **RenderThread Frame Rate** | `24 – 38 FPS` (scroll jitter) | **`60.0 FPS Locked`** | 🟢 **Zero Stutter / Smooth V-Sync** |
| **Home Screen Sponsored Ads** | 3–5 billboard rows + auto-play | **`0 Ads`** (Clean Top Shelf) | 🟢 **100% Ad-Free Sanctuary** |
| **Active Telemetry Trackers** | 40+ manufacturer daemons | **`0 Trackers`** (Private) | 🟢 **Zero Background Siphoning** |
| **Freed Flash Storage** | 0 MB baseline | **`420+ MB Recovered`** | 🟢 **Extra Storage for Apps** |
| **Launcher Binary Size** | ~280 MB bundle | **`1.28 MB APK`** | 🟢 **Instant Sideload & Cold Boot** |
| **Quick Settings Invocation** | Screen blacks out & kills stream | **`Frosted Glass Sheet Overlay`** | 🟢 **Launcher Stays 100% Visible** |

<p align="center">
  <img src="assets/divider.svg" width="100%" />
</p>

---

## 🔬 Architecture & System Flow

Gapple TV bypasses the bloat of modern hybrid web-view launchers by executing strictly within Android's native graphics pipeline:

<div align="center">
  <img src="assets/architecture-flow.svg" width="100%" alt="Architecture and System Flow" />
</div>

<br/>

### 1. Dynamic Top Shelf Engine
When navigating between apps in the dock (Netflix, Prime Video, YouTube, Hotstar), Gapple TV dynamically crossfades the full-screen ambient backdrop into high-resolution cinema key art. Bitmap decoding is memory-pooled to avoid garbage collection spikes on 1 GB RAM TVs.

### 2. Translucent Glass Sheet Compositor
Stock Android TV launchers force a complete window teardown and black screen flicker when opening Wi-Fi or settings menus. Gapple TV uses a hardware-accelerated translucent theme (`Theme.Translucent.NoTitleBar.Fullscreen`) and custom slide interpolators—allowing the live launcher backdrop and video feed to remain visible behind frosted menus.

### 3. User 0 Sandbox Isolation
All system modifications operate strictly within Android's `user 0` boundary (`pm uninstall -k --user 0`). The television's read-only system ROM partition is never touched, meaning root access is **not** required, OTA system stability is preserved, and the setup is **100% reversible**.

<p align="center">
  <img src="assets/divider.svg" width="100%" />
</p>

---

## 🚀 Quick Start & Interactive ADB Studio

You can set up Gapple TV in less than 5 minutes using any computer connected to the same Wi-Fi network as your TV.

<div align="center">
  <img src="assets/terminal-adb.svg" width="100%" alt="Interactive Terminal Studio" />
</div>

<br/>

### Step 1: Unlock Developer Options on Your TV
1. On your television, go to **Settings** > **Device Preferences** > **About**.
2. Scroll to **Build Number** and click it **7 times** with your remote until you see *"You are now a developer!"*.
3. Go back to **Device Preferences** > **Developer Options**, and switch **USB Debugging** to **ON**.

---

### Step 2: Connect via ADB over Wi-Fi
Find your TV's local IP address under **Settings** > **Network & Internet** (e.g., `192.168.1.50`), open your terminal, and run:

```powershell
# Windows PowerShell
.\platform-tools\adb.exe connect 192.168.1.50:5555

# macOS / Linux Terminal
./platform-tools/adb connect 192.168.1.50:5555
```

> **Note**: A security prompt will pop up on your TV screen saying *"Allow USB debugging?"*. Select **"Always allow from this computer"** and press **OK** on your remote.

---

### Step 3: Sideload Gapple TV Launcher (1.28 MB)
```powershell
# Windows PowerShell
.\platform-tools\adb.exe install -r .\releases\app-release.apk

# macOS / Linux Terminal
./platform-tools/adb install -r ./releases/app-release.apk
```

---

### Step 4: Run the One-Click Safe Debloat Script
This disables 40+ ad-injecting manufacturer services, sponsored carousels, and telemetry beacons for User 0:

```powershell
# Windows PowerShell
.\scripts\debloat.ps1

# macOS / Linux Terminal
chmod +x ./scripts/debloat.sh && ./scripts/debloat.sh
```

---

### Step 5: Bind the TV Remote Home Button
Set Gapple TV as the primary Android Home Activity:

```powershell
# Windows PowerShell
.\platform-tools\adb.exe shell cmd package set-home-activity com.gathin.tvhome/.MainActivity

# macOS / Linux Terminal
./platform-tools/adb shell cmd package set-home-activity com.gathin.tvhome/.MainActivity
```

Press the **Home button** on your TV remote. Welcome to your new Apple tvOS experience! 🍿

<p align="center">
  <img src="assets/divider.svg" width="100%" />
</p>

---

## 🛡️ Instant Rollback & Safety Guarantee

Because packages are disabled solely for **User 0**, the original factory firmware files are never deleted from system ROM. Your TV warranty remains completely unaffected.

If you ever wish to revert back to the stock manufacturer launcher, run the instant restore script:

```powershell
# Windows PowerShell
.\scripts\restore.ps1

# macOS / Linux Terminal
chmod +x ./scripts/restore.sh && ./scripts/restore.sh
```

Every stock app and manufacturer service will be restored in under 5 seconds.

<p align="center">
  <img src="assets/divider.svg" width="100%" />
</p>

---

## 📁 Monorepo Directory Architecture

```
Gapple-tv/
├── assets/                    <- Animated vector artwork & telemetry cards
│   ├── banner-hero.svg        <- Animated 3D Apple TV showcase header
│   ├── telemetry-benchmark.svg<- Animated RAM & 60 FPS oscilloscope meters
│   ├── features-grid.svg      <- 4-pillar architectural showcase
│   ├── architecture-flow.svg  <- Hardware Leanback pipeline diagram
│   ├── terminal-adb.svg       <- Interactive ADB terminal preview
│   └── divider.svg            <- Quad-gradient shimmering section divider
├── launcher/                  <- Native Android Leanback launcher Java source
│   ├── app/src/main/java/     <- MainActivity, DynamicTopShelf, GlassView
│   └── app/src/main/res/      <- Translucent themes, glass layouts, icons
├── releases/                  <- Compiled production binary distribution
│   └── app-release.apk        <- 1.28 MB signed production APK
├── scripts/                   <- Automated ADB maintenance suite
│   ├── debloat.ps1            <- 1-click Windows debloater
│   ├── debloat.sh             <- 1-click POSIX debloater
│   ├── restore.ps1            <- 1-click Windows factory recovery
│   ├── restore.sh             <- 1-click POSIX factory recovery
│   └── packages_backup.txt    <- Complete factory snapshot manifest
├── website/                   <- Awwwards-level GSAP 3D product showcase
│   ├── src/components/        <- Hero simulator, Telemetry, InstallStudio
│   ├── public/                <- Discovery infrastructure (sitemap, robots)
│   └── vercel.json            <- High-performance production edge config
└── README.md                  <- Visual design masterpiece documentation
```

<p align="center">
  <img src="assets/divider.svg" width="100%" />
</p>

---

## 📜 Debloat Package Manifest

<details>
<summary><b>Click to inspect packages disabled by <code>debloat.ps1</code></b></summary>

<br/>

| Package Name | Category | Reason for Disabling |
| :--- | :--- | :--- |
| `com.mitv.tvhome` | Stock Launcher | Xiaomi PatchWall / Mi Home bloated feed |
| `com.xiaomi.mitv.advertise` | Ad Engine | Boot ads and wallpaper promotional popups |
| `com.xiaomi.mitv.upgrade` | Telemetry | Unwanted background ROM push daemons |
| `com.xiaomi.mitv.payment` | Manufacturer | Background in-app payment hooks |
| `com.xiaomi.mitv.shop` | Store Bloat | Xiaomi TV app store promotional pusher |
| `com.google.android.tvrecommendations` | Ad Carousel | Google TV sponsored banner carousel |
| `com.google.android.videos` | Store Bloat | Google Play Movies banner push daemon |
| `com.google.android.apps.tv.dreamx` | Ambient Bloat | Stock screensaver memory hog |
| `com.xiaomi.mitv.tvplayer` | Telemetry | Xiaomi telemetry analytics daemon |

</details>

<p align="center">
  <img src="assets/divider.svg" width="100%" />
</p>

---

## 👤 Author & Maintainer

<table border="0">
  <tr>
    <td width="90" align="center">
      <img src="https://github.com/ManasSoni-2009.png" width="80" height="80" style="border-radius: 50%;" alt="Manas Soni" />
    </td>
    <td>
      <b>Manas Soni</b><br/>
      <i>Lead Systems Engineer & Android TV Architect</i><br/>
      <a href="https://github.com/ManasSoni-2009">GitHub Profile</a> • 
      <a href="https://gapple-tv.vercel.app">Gapple TV Showcase</a>
    </td>
  </tr>
</table>

- **GitHub Repository**: [https://github.com/ManasSoni-2009/Gapple-tv](https://github.com/ManasSoni-2009/Gapple-tv)
- **Live Showcase**: [https://gapple-tv.vercel.app](https://gapple-tv.vercel.app)
- **Topics**: `android-tv`, `android-tv-launchers`, `apple-tv`, `google-tv`, `performance-optimization`, `debloat`, `manas-soni`

---

## ⚖️ License & Trademarks

- **Code License**: Released under the [MIT License](LICENSE). Free for personal modification and educational use.
- **Trademarks**: Apple TV, tvOS, and Siri Remote are registered trademarks of Apple Inc. Android, Android TV, Google TV, and Google Play are registered trademarks of Google LLC. Gapple TV is an independent community modification project built for personal educational use and hardware debloating.

<div align="center">
  <sub>Crafted with precision by <a href="https://github.com/ManasSoni-2009">Manas Soni</a> • Apple HIG × Google Material 3 Design Fusion</sub>
</div>
