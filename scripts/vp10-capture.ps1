$ErrorActionPreference = "Stop"

$repoRoot = Split-Path -Parent $PSScriptRoot
Set-Location $repoRoot

Write-Host ""
Write-Host "Fokhara VP10 Visual Capture" -ForegroundColor Cyan
Write-Host "Repository: $repoRoot"
Write-Host ""

Write-Host "[1/4] Installing project dependencies..." -ForegroundColor Yellow
npm install
if ($LASTEXITCODE -ne 0) { throw "npm install failed" }

Write-Host "[2/4] Ensuring Playwright Chromium is installed..." -ForegroundColor Yellow
npx playwright install chromium
if ($LASTEXITCODE -ne 0) { throw "Playwright Chromium install failed" }

Write-Host "[3/4] Capturing Desktop + Mobile evidence..." -ForegroundColor Yellow
npm run capture:vp10
if ($LASTEXITCODE -ne 0) { throw "VP10 capture reported a failure. Check visual-review/vp10/manifest.json" }

$zipPath = Join-Path $repoRoot "vp10-review.zip"
if (Test-Path $zipPath) {
  Remove-Item $zipPath -Force
}

Write-Host "[4/4] Packaging evidence..." -ForegroundColor Yellow
Compress-Archive -Path (Join-Path $repoRoot "visual-review\vp10\*") -DestinationPath $zipPath -Force

Write-Host ""
Write-Host "DONE" -ForegroundColor Green
Write-Host "Upload this file to ChatGPT:"
Write-Host $zipPath -ForegroundColor Cyan
Write-Host ""
