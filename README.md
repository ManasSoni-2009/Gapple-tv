# Gapple TV (Apple tvOS Experience for Android TV & Google TV)

<p align="center">
  <img src="https://website-one-mauve-nud917tlxw.vercel.app/images/tv/tv_dock_netflix.png" alt="Gapple TV Interface" width="85%" style="border-radius: 16px; box-shadow: 0 20px 50px rgba(0,0,0,0.8);" />
</p>

<p align="center">
  <strong>Transform sluggish, ad-ridden Android and Google TVs into a silky-smooth, privacy-first Apple tvOS interface.</strong><br>
  Reduces launcher resident RAM from <b>320 MB to just 27.6 MB</b> (>91% reduction) while running at a locked 60 FPS.
</p>

<p align="center">
  <a href="https://website-one-mauve-nud917tlxw.vercel.app">🌐 Live Showcase Website</a> •
  <a href="#key-features">Key Features</a> •
  <a href="#quick-start-guide">Quick Start</a> •
  <a href="#hardware-telemetry">Telemetry Benchmarks</a> •
  <a href="#monorepo-structure">Repository</a> •
  <a href="#license">License</a>
</p>

---

## 🌟 Key Features

- **Dynamic Top Shelf Cinema**: Hovering dock apps (Netflix, Prime Video, YouTube, Hotstar) smoothly crossfades the full backdrop into 4K content-aware artwork and hero posters.
- **Translucent Frosted Glass Overlays**: Quick settings and Wi-Fi drawers slide in as hardware-accelerated translucent sheets (`Theme.Translucent.NoTitleBar.Fullscreen`) with smooth decel interpolators—the launcher remains 100% visible behind.
- **Zero Sponsored Ads & Banners**: Removes all promotional carousels, auto-playing video trailers, and banner billboards.
- **Ultra-Lightweight Micro-Kernel**: Native Android Leanback Java architecture compiled to a tiny **1.28 MB APK**.
- **91% RAM Reduction**: Drops resident PSS memory footprint to **27.6 MB**, completely eliminating background app evictions and sluggish remote lag on 1GB RAM TVs.
- **100% Safe & Reversible**: Debloats via ADB for user 0 without rooting. Any debloated system app can be restored with one command.

---

## 📊 Hardware Telemetry Benchmarks

*Tested on Xiaomi Mi TV 4A Pro 32" (`dangal`) running Android 9 Pie (SDK 28) with 1.0 GB RAM via `adb shell dumpsys meminfo com.gathin.tvhome`:*

| Metric | Stock Google TV / PatchWall | Gapple TV | Improvement |
| :--- | :--- | :--- | :--- |
| **Resident RAM (PSS)** | ~320 MB | **27.6 MB** | **91.4% Less Memory** |
| **RenderThread Frame Rate** | 24–40 FPS (stutter on scroll) | **60 FPS Locked** | **Zero UI Jitter** |
| **Home Screen Ads** | Multiple sponsored rows & auto-play trailers | **0 Ads** | **Pure Sanctuary** |
| **Active Telemetry Trackers** | 40+ background daemons | **0 Trackers** | **100% Private** |
| **Freed Flash Storage** | 0 MB | **420+ MB Freed** | **More space for apps** |
| **Binary Install Size** | 250 MB+ | **1.28 MB** | **Instant installation** |

---

## 🚀 Quick Start Guide

### Step 1: Enable USB Debugging on Your TV
1. On your TV, navigate to **Settings** > **Device Preferences** > **About**.
2. Scroll to **Build Number** and click it **7 times** until you see *"You are now a developer!"*.
3. Go back to **Device Preferences** > **Developer Options**, and toggle **USB Debugging** to **ON**.

### Step 2: Connect via ADB over Wi-Fi
Find your TV's IP address under **Settings** > **Network & Internet** (e.g. `192.168.1.50`), then run:

```powershell
# Windows PowerShell
.\platform-tools\adb.exe connect 192.168.1.50:5555

# macOS / Linux Terminal
./platform-tools/adb connect 192.168.1.50:5555
```

### Step 3: Install Gapple TV Launcher
```powershell
# Windows
.\platform-tools\adb.exe install -r .\releases\app-release.apk

# macOS / Linux
./platform-tools/adb install -r ./releases/app-release.apk
```

### Step 4: Run the One-Click Debloat Script
Removes 40+ pre-installed bloatware services, telemetry beacons, and promotional launchers:
```powershell
# Windows PowerShell
.\scripts\debloat.ps1

# macOS / Linux
chmod +x ./scripts/debloat.sh && ./scripts/debloat.sh
```

### Step 5: Set Gapple TV as Default Home Activity
```powershell
adb shell cmd package set-home-activity com.gathin.tvhome/.MainActivity
```
Press the **Home button** on your remote control to experience Gapple TV!

---

## 🛡️ Instant Rollback & Safety Guarantee

Every debloated package is uninstalled only for **User 0**. The underlying APKs remain in system ROM, meaning your hardware warranty remains intact and you can restore every factory app instantly at any time:

```powershell
# Windows
.\scripts\restore.ps1

# macOS / Linux
chmod +x ./scripts/restore.sh && ./scripts/restore.sh
```

---

## ⚖️ License & Trademarks

- **Code License**: [MIT License](LICENSE).
- **Trademarks**: Apple TV, tvOS, and Siri Remote are registered trademarks of Apple Inc. Android, Android TV, Google TV, and Google Play are registered trademarks of Google LLC. Gapple TV is an independent community modification project built for personal educational use and performance optimization.
