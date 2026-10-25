# Gapple TV Safe Debloat Script for Windows PowerShell
Write-Host "[*] Connecting to TV at 192.168.31.60:5555..." -ForegroundColor Cyan
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

Write-Host "[*] Debloating system ad services and sponsored launchers..." -ForegroundColor Yellow
foreach ($pkg in $packages) {
  Write-Host "[-] Disabling $pkg..."
  .\platform-tools\adb.exe shell pm uninstall -k --user 0 $pkg
}

Write-Host "[+] Debloat complete! Storage freed and background trackers disabled." -ForegroundColor Green
