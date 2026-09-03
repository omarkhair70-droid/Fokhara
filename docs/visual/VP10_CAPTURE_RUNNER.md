# VP10 — Full Visual Review Capture Runner

This runner captures the real deployed Fokhara site for visual review.

It is deliberately separate from CI and does not mutate production.

## Default source

`https://fokhara.vercel.app`

Override when needed:

```powershell
$env:VP10_BASE_URL="https://your-preview.example.com"
npm run capture:vp10
```

## Routes captured

- Home
- Shop
- Collections
- Nebula Collection
- Nebula Product Detail
- Workshops
- Handbuilding Workshop Detail
- Handbuilding Booking
- Studio
- Visit
- Cart
- Workshop Policies

## Viewports

### Desktop
1440 × 1000

### Mobile
390 × 844

Each route gets:

- `__fold.png` — first viewport
- `__full.png` — full-page capture

Output:

`visual-review/vp10/`

## Runtime evidence

`manifest.json` records for every route/profile:

- response status
- screenshot filenames
- page dimensions
- actual header height
- horizontal overflow
- page errors
- console errors
- failed requests

This means VP10 can review visual composition and obvious runtime defects from
one evidence bundle.

## Windows / PowerShell

From the repository:

```powershell
git fetch origin
git checkout visual/vp10-full-visual-review
npm install
npx playwright install chromium
npm run capture:vp10
```

Then package the evidence:

```powershell
Compress-Archive -Path .\visual-review\vp10\* -DestinationPath .\vp10-review.zip -Force
```

Upload `vp10-review.zip` to the ChatGPT conversation.

## Review rule

The capture is evidence, not acceptance.

VP10 closes only after the actual rendered screenshots are reviewed for:

- composition
- image crops
- typography
- page pacing
- material states
- empty/dead space
- mobile overflow/collisions
- CTA reachability
- repetitive templates
- generic award-site residue

Any visual failure is fixed, redeployed and recaptured before VP10 closes.
