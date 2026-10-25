#!/usr/bin/env bash
# Gapple TV Safe Debloat Script for macOS and Linux
set -e

echo "[*] Connecting to TV..."
ADB="./platform-tools/adb"
if ! command -v "$ADB" &> /dev/null; then
  ADB="adb"
fi

PACKAGES=(
  "com.mitv.tvhome"
  "com.xiaomi.mitv.advertise"
  "com.xiaomi.mitv.upgrade"
  "com.xiaomi.mitv.payment"
  "com.xiaomi.mitv.shop"
  "com.google.android.tvrecommendations"
  "com.google.android.videos"
  "com.google.android.apps.tv.dreamx"
  "com.xiaomi.mitv.tvplayer"
)

echo "[*] Debloating system ad services and sponsored launchers..."
for pkg in "${PACKAGES[@]}"; do
  echo "[-] Disabling $pkg..."
  $ADB shell pm uninstall -k --user 0 "$pkg" || true
done

echo "[+] Debloat complete! Storage freed and background trackers disabled."
