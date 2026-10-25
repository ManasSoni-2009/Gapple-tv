#!/usr/bin/env bash
# Gapple TV Safe Rollback Script for macOS and Linux
set -e

echo "[*] Restoring original stock packages..."
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

for pkg in "${PACKAGES[@]}"; do
  echo "[+] Reinstalling $pkg for user 0..."
  $ADB shell cmd package install-existing "$pkg" || true
done

echo "[*] Restoring default stock home activity..."
$ADB shell cmd package set-home-activity com.mitv.tvhome/.MainActivity || true

echo "[+] Restore complete. Original factory environment reinstated."
