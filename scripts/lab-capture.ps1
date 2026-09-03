$ErrorActionPreference = "Stop"

$repoRoot = Split-Path -Parent $PSScriptRoot
Set-Location $repoRoot

Write-Host ""
Write-Host "Fokhara Experiment Lab Capture" -ForegroundColor Cyan
Write-Host "Repository: $repoRoot"
Write-Host ""

Write-Host "[1/5] Installing dependencies..." -ForegroundColor Yellow
npm install
if ($LASTEXITCODE -ne 0) { throw "npm install failed" }

Write-Host "[2/5] Ensuring Playwright Chromium is installed..." -ForegroundColor Yellow
npx playwright install chromium
if ($LASTEXITCODE -ne 0) { throw "Playwright Chromium install failed" }

Write-Host "[3/5] Building experiment lab..." -ForegroundColor Yellow
npm run build
if ($LASTEXITCODE -ne 0) { throw "Next build failed" }

$port = 3200
$env:LAB_BASE_URL = "http://127.0.0.1:$port"
$server = $null

try {
  Write-Host "Starting local lab at $env:LAB_BASE_URL..." -ForegroundColor Yellow
  $server = Start-Process -FilePath "npm.cmd" -ArgumentList @("start", "--", "-p", "$port") -WorkingDirectory $repoRoot -PassThru -WindowStyle Hidden

  $ready = $false
  for ($attempt = 0; $attempt -lt 40; $attempt++) {
    Start-Sleep -Milliseconds 500
    try {
      $response = Invoke-WebRequest -Uri "$env:LAB_BASE_URL/lab" -UseBasicParsing -TimeoutSec 2
      if ($response.StatusCode -eq 200) {
        $ready = $true
        break
      }
    }
    catch {
    }
  }

  if (-not $ready) {
    throw "Local lab server did not become ready on port $port"
  }

  Write-Host "[4/5] Capturing interactive experiment states..." -ForegroundColor Yellow
  npm run capture:lab
  if ($LASTEXITCODE -ne 0) { throw "Lab capture failed" }

  $zipPath = Join-Path $repoRoot "fokhara-lab-review.zip"
  if (Test-Path $zipPath) {
    Remove-Item $zipPath -Force
  }

  Write-Host "[5/5] Packaging evidence..." -ForegroundColor Yellow
  Compress-Archive -Path (Join-Path $repoRoot "visual-review\lab\*") -DestinationPath $zipPath -Force

  Write-Host ""
  Write-Host "DONE" -ForegroundColor Green
  Write-Host "Upload this file to ChatGPT:"
  Write-Host $zipPath -ForegroundColor Cyan
  Write-Host ""
}
finally {
  if ($server -and -not $server.HasExited) {
    & taskkill /PID $server.Id /T /F | Out-Null
  }
}
