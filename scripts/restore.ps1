# Gapple TV Safe Rollback Script for Windows PowerShell
Write-Host "[*] Restoring original stock packages..." -ForegroundColor Cyan
.\platform-tools\adb.exe connect 192.168.31.60:5555

$packages = @(
  "com.mitv.tvhome",
  "com.xiaomi.mitv.advertise",
  "com.xiaomi.mitv.upgrade",
  "com.xiaomi.mitv.payment",
  "com.xiaomi.mitv.shop",
  "com.google.android.tvrecommendations",
  "com.google.android.videos",
  "com.google.android.apps.tv.dreamx",
  "com.xiaomi.mitv.tvplayer"
)

foreach ($pkg in $packages) {
  Write-Host "[+] Reinstalling $pkg for user 0..."
  .\platform-tools\adb.exe shell cmd package install-existing $pkg
}

Write-Host "[*] Restoring default stock home activity..."
.\platform-tools\adb.exe shell cmd package set-home-activity com.mitv.tvhome/.MainActivity

Write-Host "[+] Restore complete. Original factory environment reinstated." -ForegroundColor Green
