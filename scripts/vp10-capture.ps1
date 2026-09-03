param(
  [switch]$Production
)

$ErrorActionPreference = "Stop"

$repoRoot = Split-Path -Parent $PSScriptRoot
Set-Location $repoRoot

Write-Host ""
Write-Host "Fokhara VP10 Visual Capture" -ForegroundColor Cyan
Write-Host "Repository: $repoRoot"
Write-Host ""

Write-Host "[1/5] Installing project dependencies..." -ForegroundColor Yellow
npm install
if ($LASTEXITCODE -ne 0) { throw "npm install failed" }

Write-Host "[2/5] Ensuring Playwright Chromium is installed..." -ForegroundColor Yellow
npx playwright install chromium
if ($LASTEXITCODE -ne 0) { throw "Playwright Chromium install failed" }

$server = $null

try {
  if ($Production) {
    $env:VP10_BASE_URL = "https://fokhara.vercel.app"
    Write-Host "[3/5] Using production: $env:VP10_BASE_URL" -ForegroundColor Yellow
  }
  else {
    Write-Host "[3/5] Building the current VP10 branch..." -ForegroundColor Yellow
    npm run build
    if ($LASTEXITCODE -ne 0) { throw "Next production build failed" }

    $port = 3100
    $env:VP10_BASE_URL = "http://127.0.0.1:$port"

    Write-Host "Starting local production server at $env:VP10_BASE_URL..." -ForegroundColor Yellow
    $server = Start-Process -FilePath "npm.cmd" -ArgumentList @("start", "--", "-p", "$port") -WorkingDirectory $repoRoot -PassThru -WindowStyle Hidden

    $ready = $false
    for ($attempt = 0; $attempt -lt 40; $attempt++) {
      Start-Sleep -Milliseconds 500
      try {
        $response = Invoke-WebRequest -Uri $env:VP10_BASE_URL -UseBasicParsing -TimeoutSec 2
        if ($response.StatusCode -eq 200) {
          $ready = $true
          break
        }
      }
      catch {
      }
    }

    if (-not $ready) {
      throw "Local Fokhara server did not become ready on port $port"
    }
  }

  Write-Host "[4/5] Capturing Desktop + Mobile evidence..." -ForegroundColor Yellow
  npm run capture:vp10
  if ($LASTEXITCODE -ne 0) {
    throw "VP10 capture reported a failure. Check visual-review/vp10/manifest.json"
  }

  $zipPath = Join-Path $repoRoot "vp10-review.zip"
  if (Test-Path $zipPath) {
    Remove-Item $zipPath -Force
  }

  Write-Host "[5/5] Packaging evidence..." -ForegroundColor Yellow
  Compress-Archive -Path (Join-Path $repoRoot "visual-review\vp10\*") -DestinationPath $zipPath -Force

  Write-Host ""
  Write-Host "DONE" -ForegroundColor Green
  Write-Host "Captured from: $env:VP10_BASE_URL"
  Write-Host "Upload this file to ChatGPT:"
  Write-Host $zipPath -ForegroundColor Cyan
  Write-Host ""
}
finally {
  if ($server -and -not $server.HasExited) {
    Write-Host "Stopping local VP10 server..." -ForegroundColor DarkGray
    & taskkill /PID $server.Id /T /F | Out-Null
  }
}
