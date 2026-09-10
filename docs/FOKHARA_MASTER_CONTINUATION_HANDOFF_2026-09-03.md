# Fokhara — Master Continuation Handoff
## Canonical project state · 2026-09-03

> **Continuation authority:** this file is the canonical handoff for the current Fokhara project state.  
> If an older README status section, PR body, phase note, or earlier handoff conflicts with this file, **this file wins for continuation status**.  
> The underlying research/implementation docs remain authoritative for their detailed subject matter.

---

# 0. READ THIS FIRST

This project is **not** at the beginning of a redesign and it is **not** waiting for another generic inspiration phase.

A very large first body of work is already closed:

- reality/product/culture/material research
- meaning extraction
- digital translation
- architecture
- Woo commerce wiring
- real cart
- truthful workshop/booking model
- Carry + Recompose
- real current imagery
- typography system
- material-state system
- crop choreography
- restrained motion physics
- page pacing
- compact/mobile authorship
- first full rendered visual review
- first visual correction pass
- a disposable post-VP10 experiment lab

The current goal is no longer “finish the skeleton.”

The skeleton exists.

The current goal is:

> **keep looking, testing, re-authoring, subtracting and widening the creative field until the site stops feeling like a coherent premium design system and starts feeling unmistakably like Fokhara.**

Do **not** restart research from zero.
Do **not** mechanically continue adding numbered phases forever.
Do **not** merge the experiment lab as a bundle.
Do **not** treat passing CI as visual acceptance.

The working mode from here is a loop:

```
look
→ feel what is missing
→ targeted research
→ build a specific experiment
→ render it
→ compare it
→ keep / rewrite / delete
→ integrate only what earns its place
→ recapture
→ subtract
→ repeat
```

The user’s own shorthand for this current mode is essentially:

> **مرحلة الرواقة / الدلع**

That does not mean “add more animation.”
It means the architecture is stable enough that the project can now be treated as an authored visual work.

---

# 1. REPOSITORY / LIVE STATE

Repository:

```
omarkhair70-droid/Fokhara
```

## Production main

Branch:

```
main
```

Current production main SHA:

```
eabc448355c272c7c334664c2f0617e7ee4bb455
```

Commit:

```
VP9: Compact and mobile authorship
```

Production URL:

```
https://fokhara.vercel.app
```

Known production deployment:

```
dpl_7PUXXo5FGVf5V12jBHDwDA2X9Jkh
```

State:

```
READY
```

**Important:** production still reflects VP9/main. VP10 corrections and Lab experiments are intentionally not merged.

---

# 2. CURRENT ACTIVE BRANCHES

## A. VP10 rendered review / correction branch

Branch:

```
visual/vp10-full-visual-review
```

Current HEAD:

```
8e34cc413852ec892d74e15c4f010ac2f3a205a3
```

Latest commit:

```
fix(vp10): restore product and compact collection ordering
```

PR:

```
#14 — VP10: Full visual review
```

Status:

```
OPEN / DRAFT / DO NOT MERGE YET
```

Latest VP10 CI for HEAD:

- TypeScript: PASS
- production build: PASS
- workflow: PASS

Workflow run:

```
33720485015
```

## B. Disposable Experiment Lab

Branch:

```
visual/experiment-lab
```

Current HEAD at this handoff:

```
ccc49ebbce228da0d16ee2b0c8b14e71e8c2a7a7
```

Latest commit:

```
chore(lab): ignore generated lab review evidence
```

PR:

```
#15 — Lab: Post-VP10 Fokhara experiment loop
```

Status:

```
OPEN / DRAFT / DO NOT MERGE AS A BUNDLE
```

The latest fully code-validated Lab HEAD before documentation/gitignore-only changes was:

```
4af3adf002f9c7ff549d1c5c861bcfba440e3819
```

Validation:

- TypeScript: PASS
- production build: PASS
- GitHub workflow: PASS

Validation workflow:

```
33721293144
```

Temporary validation PRs were created only because the repository CI currently triggers `pull_request` checks against `main`:

- PR #16 — CLOSED
- PR #17 — CLOSED

Do not revive or merge those validation PRs.

---

# 3. BRAND / PRODUCT TRUTH

Fokhara is a real pottery studio and shop in New Cairo by ceramic artist/designer **Dalia Mobasher**.

Current public place:

```
Villa 313
Yasmin 1
1st Settlement
New Cairo, Egypt
```

The public offer joins:

- handmade functional ceramics
- pottery workshops
- courses / longer learning sequences
- physical studio participation

The project’s key reframing is:

> Fokhara is not merely a brand that sells pottery.

A more useful product truth is:

> **A place that turns the observer toward making, while producing functional objects that retain evidence of the hand.**

The practical axis:

```
make → learn → own → use
```

The material transformation:

```
formless clay → human intervention → functional form
```

Core DNA:

- TRANSFORMATION
- TOUCH
- CENTERING
- CONTROL × SURRENDER
- SLOWNESS
- TRACE
- FUNCTION
- LEARNING

Compass:

> **Fokhara is not about displaying pottery. It is about the moment formless earth meets a human hand and becomes something worth keeping.**

Meaning principles:

1. BECOMING
2. RETAINED TRACE
3. CENTERED TENSION
4. TIME IS MATERIAL
5. MATERIAL AGENCY
6. CRAFT ENTERS LIFE

Core thesis:

> **Fokhara is a choreography of becoming: matter takes memory under pressure, crosses thresholds through time, and carries the trace of making into everyday life.**

Internal visual thesis:

# THE FORM REMEMBERS

Refined digital thesis:

> **A digital material system where actions leave trace, selected objects causally reform later states, people can cross from observer to maker, and the interface settles from expressive exploration into precise commitment.**

---

# 4. IMPORTANT NUANCE — DO NOT OVER-FORCE “BECOME THE MAKER”

The MAKE path matters.

But it is **not** a requirement to make every workshop page literally feel like a pottery simulator or to force the user into a theatrical “you are now making clay” experience.

The user explicitly corrected this direction.

The right interpretation is:

- OWN and MAKE are two real product journeys.
- “Become the Maker” is a conceptual and functional shift from viewing objects to participating.
- It can be felt, but it does **not** need to be simulated.
- Do not build interaction just to prove the phrase.
- Practical workshop choice / truth / booking clarity remains more important than spectacle.

Never turn the website into a fake making game.

---

# 5. THE WORKFLOW — HOW IT EVOLVED

The core workflow that developed through this project is:

```
REALITY
/product
/culture
/material
/art
/science

→ MEANING

→ DIGITAL TRANSLATION

→ AUTHORED THESIS

→ ONLY THEN:
  award sites / contemporary web / technical references

→ architecture

→ synthesis

→ prototype

→ rendered visual review

→ authored experiment loop

→ subtraction
```

Core rule:

> **The web is the medium of execution, not the source of the idea.**

This rule matters because the early risk was producing a collage of Awwwards/Godly-style techniques before Fokhara had its own logic.

Award/reference sites are now allowed and useful **because the thesis already exists**.

They should be used as:

- challenge
- technique library
- reality-check
- interaction reference
- current craft benchmark

They must **not** become the source of Fokhara’s identity.

## Research can still continue

Do not interpret “Research Steps 1–8 closed” as “never research again.”

The correct behavior now is:

- no restart from zero
- targeted research when a visual/problem question appears
- widen beyond ceramics websites
- research the technique or compositional problem that the current live work exposes

Useful external fields now include:

- editorial design
- books / exhibition catalogues
- museum and exhibition sites
- fashion
- architecture / interiors
- film titles
- digital installations
- interactive art
- photography choreography
- commerce leaders
- experimental portfolios
- WebGL / shaders / WebGPU
- Three.js
- canvas
- SVG
- GSAP / ScrollTrigger
- Motion
- View Transitions
- masks / clipping
- variable typography
- spatial transitions
- 3D
- generative fields

Technology is a vocabulary, not a goal.

---

# 6. RESEARCH STEPS 1–8 — CLOSED

The canonical research foundation lives in:

```
docs/research/
```

Files:

1. `01-product-truth.md`
2. `02-non-web-source-atlas.md`
3. `03-meaning-extraction.md`
4. `04-digital-translation.md`
5. `05-first-visual-thesis.md`
6. `06-web-reality-check.md`
7. `07-product-architecture.md`
8. `08-implementation-blueprint.md`

Status:

```
ALL CLOSED
```

Do not recreate these from scratch unless new factual evidence materially changes the product truth.

---

# 7. DIGITAL GRAMMAR

The current authored grammar is:

- wide fields + pressure points
- stable grid that can be challenged deliberately
- typography as physical mass
- finite causal motion
- stable navigation
- transitions carry rather than erase
- mobile recomposes rather than shrinks
- product photography remains source-true
- practical commitment becomes calmer and more precise

Avoid:

- random wobble
- looping pottery wheel
- decorative blobs
- fake clay deformation
- fake cracks/noise as “ceramic identity”
- fire/kiln cliché
- ancient-Egypt shorthand
- gratuitous 3D
- sluggish scroll
- generic page fades
- interaction with no state meaning

Owned signatures:

1. **CARRY + RECOMPOSE**
2. **TRACE**
3. **BECOME THE MAKER**
4. **SETTLE WITH INTENT**

---

# 8. PRODUCT ARCHITECTURE

There are two practical systems.

## OWN

```
discover
→ evaluate
→ buy
→ use
```

Main journey:

```
Home
→ Shop
→ Collections
→ Product Detail
→ Cart
```

## MAKE

```
discover
→ choose
→ commit
→ participate
→ learn
```

Main journey:

```
Home
→ Workshops
→ Workshop Detail
→ Booking Request
```

Cross-system continuity:

```
Object → Workshops
Workshop → Objects
Studio → Shop / Workshops / Visit
Collection → Shop / Workshops
```

---

# 9. CURRENT ROUTES

Public product routes:

- `/`
- `/shop`
- `/shop/[productSlug]`
- `/collections`
- `/collections/[collectionSlug]`
- `/workshops`
- `/workshops/[workshopSlug]`
- `/book/[workshopSlug]`
- `/cart`
- `/studio`
- `/visit`
- `/policies/workshops`

Commerce BFF:

- `/api/commerce/products`
- `/api/commerce/products/[slug]`
- `/api/commerce/cart`
- `/api/commerce/cart/items`
- `/api/commerce/cart/items/[key]`
- `/api/commerce/health`
- `/api/commerce/capabilities`

Lab-only hidden routes:

- `/lab`
- `/lab/material-memory`
- `/lab/carry-space`
- `/lab/kiln-threshold`
- `/lab/collection-inheritance`
- `/lab/collection-inheritance/[collectionSlug]`
- `/lab/studio-contact-sheet`

Lab routes are disposable and are **not** production navigation.

---

# 10. TECHNICAL BASELINE

Current baseline:

- Next.js 16.3.3
- App Router
- TypeScript
- React 19
- React Server Components by default
- Motion for React 13.x
- semantic authored CSS
- WooCommerce / WordPress retained as operational source
- normalized Fokhara commerce domain
- Next BFF for Woo session + mutations
- Product / Course structured data
- native View Transition only as progressive enhancement
- no WebGL requirement in production baseline
- no GSAP requirement in production baseline

Experiment Lab currently tests raw WebGL2 and CSS 3D where conceptually justified.

Do not add a heavyweight library merely because it is fashionable.

---

# 11. COMMERCE / DATA TRUTH

At the P2 audit:

- live Woo catalog exposed 34 products total
- 19 were current ceramics
- product names / price / stock / description / primary imagery are wired from current Woo
- collections are currently derived from product-name prefix because Woo does not expose a reliable collection taxonomy/tag structure for this project

Known collection names:

- Nebula
- Midnight
- Ocean
- Foggy
- Lazuli
- Latte Foam
- Seaweed

The collection adapter is a compatibility layer, not a claim that Woo has a first-class collection taxonomy.

## Cart

The headless Woo cart is real:

- Woo Cart-Token session
- add
- update
- remove
- totals

## Current checkout truth

Do **not** fake payment completion.

The live Woo store exposes Paymob gateways, but headless live payment completion has not been exercised against the owner’s production store.

External payment gate remains:

- staging/test Woo + Paymob, or
- explicit owner-approved controlled live-order test

Until then:

- online payment success must not be claimed
- no hidden production-order mutation for compatibility testing

VP10 improved the customer handoff:

- Booking review can prepare a truthful email request to Fokhara.
- Cart can prepare an email with the current selected ceramics.
- This removes dead “backend gate” UI while remaining truthful.

---

# 12. BOOKING TRUTH

Current booking is:

```
request / contact / preferred date / next available
```

It is **not verified real-time availability**.

Never display fake live capacity.

Never display fake booking confirmation.

Recurring published studio windows can be shown, but they are not live seats.

The booking flow should always make this distinction clear without sounding like an implementation prototype.

---

# 13. STRUCTURAL IMPLEMENTATION — CLOSED

Implementation docs:

```
docs/implementation/
```

Relevant files:

- `P0_STATUS.md`
- `P1_SCOPE.md`
- `P2_DATA_WIRING.md`
- `P2_STRUCTURAL_ACCEPTANCE.md`

Status:

## P0 — CLOSED
Carry + Recompose Product Loop

## P1 — CLOSED
Become the Maker / truthful booking path

## P2 — CLOSED
Full structural product system / real data wiring

The structural product system is the canvas now, not the final artwork.

---

# 14. AUTHORED VISUAL PRODUCTION — WHAT IS ALREADY DONE

## VP0 — Visual Truth Audit — DONE

Audit established current real asset truth.

At audit time:

- 19 current ceramic primary images
- official workshop/process photography available
- broader archive remains unresolved
- important missing authored assets remain

Known official workshop/process candidate:

```
https://fokharastudioandshop.com/wp-content/uploads/2024/06/GS3A3651-819x1024.jpg
```

Missing / desirable future real photography:

- founder portrait / Dalia frame
- macro glaze
- raw clay
- trimming
- glazing
- kiln
- studio wide
- shelves
- object in actual use
- exterior / arrival

Never substitute generic stock photography as factual Fokhara evidence.

## VP1 — Photography & Image Direction — DONE

Image modes:

- A — OBJECT TRUTH
- B — MATERIAL EVIDENCE
- C — ACTION / HAND
- D — HUMAN / LIFE
- E — STUDIO FIELD

Semantic distance:

```
M0 material → M4 field
```

Photography thesis:

> **Fokhara moves through distance: material becomes action, action becomes form, form enters a hand, and the hand returns the object to life.**

## VP2 — Asset Production / Missing Visuals — DONE AS BASELINE

Real Woo product/workshop assets wired.

Components include:

- ProductVisual
- WorkshopVisual
- StudioEvidence

Workshop imagery uses real current sources where available.

## VP3 — Typography Lab — DONE

Baseline family:

```
Instrument Sans
```

Variable width axis through `next/font/google`.

Intent widths:

- Discovery 78
- Browse 84
- Evaluate 88
- Commit 93
- Transaction 98
- body 98–100

Compact opens compressed widths.

Future Arabic candidate:

```
IBM Plex Sans Arabic
```

Arabic has **not** been authored as a finished language system.

## VP4 — Material State System — DONE

Material states are derived from current real collection imagery, not naïve theme colors.

Do not reduce this to:

- Nebula = purple
- Ocean = blue
- etc.

The interface field can inherit restrained traces from material state.

Product photography remains untinted.

Existing CSS variables include material concepts such as:

- field
- glaze
- clay
- depth
- pressure
- sheen / reflectivity

## VP5 — Image Choreography & Crop Authorship — DONE / MERGED

Same image changes authored crop behavior by route role:

- Home
- Browse
- Collection
- Detail
- Bridge
- Cart

Carry preserves source crop during lift/navigation, then recomposes to destination crop.

Main merge SHA:

```
41cd38cc6712c9e389e068a3876ea64be5fcfbfa
```

## VP6 — Carry / Recompose Visual Refinement — DONE / MERGED

State machine:

```
captured
→ lifting
→ navigating
→ target-ready
→ recomposing
→ settled
```

Distance-aware deterministic physics:

- near
- medium
- far

Material can affect restrained edge/lift/settle atmosphere.

Photography remains source-true.

Reduced motion skips the lift delay.

Main merge SHA:

```
fa3c5c6ea88c40ac20c7edf617516ebad9ec8203
```

## VP7 — Motion Physics & Interaction Restraint — DONE / MERGED

Rule:

> **Every transition must explain a state change. If it cannot, remove it.**

Removed generic/inert image transforms.

Fixed double-image Carry behavior.

Fixed reduced-motion hidden target delay.

No:

- infinite loops
- scroll-jacking
- generic hover choreography
- arbitrary loaders
- route-wide decorative fades
- image drift

Main merge SHA:

```
d35991b1a279e70bb28b594b45c62ca47ad493a2
```

## VP8 — Page Pacing & Compositional Rhythm — DONE / MERGED

Rule:

> **open → pressure → release → re-form**

Major work included:

- Home pacing restructured
- Shop intro compressed
- Shop breathing tied to real collection boundaries
- Collections rhythm: anchor / scan / release
- Product bridge reduced
- workshop rhythm tied to real format boundaries
- Workshop Detail contracts by intent
- Studio reordered so physical proof enters immediately after opening claim
- desktop vertical holds released on mobile

Implementation commit:

```
52d32c2de4433baa6e24cb2a2fde162e2a917bd4
```

Main after VP8:

```
48f84dc32e6ecaa01ed682f88507b796973f5a14
```

Doc:

```
docs/visual/VP8_PAGE_PACING.md
```

## VP9 — Compact / Mobile Authorship — DONE / MERGED / PRODUCTION

Rule:

> **One dominant thing at a time. Practical action arrives earlier. Desktop pressure is translated, not shrunk.**

Important work:

- real mobile header geometry: 116px two-row header
- horizontal native nav scanning
- 44px+ touch targets
- Home compact composition authored
- Shop card density improved
- explicit specificity fix for collection layouts
- Product Add to Cart moved before long description in actual DOM order
- workshop cards reduced from long viewport holds
- Maker Rail becomes compact horizontal sticky state strip
- Booking 52px controls / 16px inputs / safe-area-aware commit bar
- reduced-motion scroll behavior fixed
- Cart density improved
- Visit actions made reachable
- Policies turned into reading surface

Implementation commit:

```
01dd900318463f4b07ea8a3403e6ea0280e59aac
```

Production main:

```
eabc448355c272c7c334664c2f0617e7ee4bb455
```

Doc:

```
docs/visual/VP9_COMPACT_MOBILE_AUTHORSHIP.md
```

---

# 15. VP10 — FULL VISUAL REVIEW — ACTIVE / NOT ACCEPTED

This is important:

VP10 is **not** a code-review phase.

It exists to inspect the real rendered work.

Review dimensions include:

- first viewport dominance
- composition
- crop
- typography
- pacing
- dead space
- repeated pattern fatigue
- generic award-site residue
- mobile collisions / overflow
- touch reachability
- cross-page continuity without sameness
- product truth
- practical commerce clarity
- practical booking clarity
- whether THE FORM REMEMBERS is visible rather than merely documented

## Capture infrastructure

Branch:

```
visual/vp10-full-visual-review
```

Files:

- `scripts/vp10-capture.mjs`
- `scripts/vp10-capture.ps1`
- `docs/visual/VP10_CAPTURE_RUNNER.md`

The runner captures:

- Desktop 1440×1000
- Mobile 390×844
- fold
- full page
- manifest runtime evidence
- horizontal overflow
- errors
- failed requests

It was improved after the first capture so it:

- waits for client states such as Cart
- scroll-sweeps the full document
- activates lazy imagery
- returns to top before full screenshot

Generated evidence is not source and should remain ignored.

---

# 16. VP10 — FIRST RENDERED REVIEW FINDINGS

The first real screenshot review showed that the site was coherent but still felt too much like:

> **a strong premium design system**

rather than fully:

> **Fokhara’s own visual world**

Key findings:

## Prototype/internal language leaked to visitors

Examples included implementation/research language around:

- Woo
- P1/P2
- VP2
- experimental digital study
- current source / API notes
- visual-production notes
- backend gates

This had to be removed.

## Product Detail over-delayed practical identity

The object image dominated too much before:

- product name
- price
- stock
- Add to Cart

## Collection Detail had similar over-hold

Large image authority was good, but identity arrived too late.

## Shop became repetitive

19 product cards with equal grammar caused fatigue.

## Collections repeated one panel pattern too much

Material state existed, but the composition was not yet materially distinct enough.

## Workshops / Studio had stronger real presence

Real hands / wheel / room / red workshop imagery felt more “Fokhara” than neutral field + oversized type alone.

That became a critical clue:

> real evidence should carry more identity before adding more effect.

## Cart / Booking still exposed implementation gates

They needed a truthful real-world handoff, not disabled prototype language.

---

# 17. VP10 — FIRST CORRECTION PASS — IMPLEMENTED

The correction pass on PR #14 included:

## Copy / truth cleanup

Removed visible:

- prototype
- experimental
- VP / P labels
- Woo/API implementation notes
- internal production notes

from core visitor surfaces.

Metadata description was also changed from “experimental redesign” language to public-facing Fokhara language.

## Shop → Material Chapters

Shop was rebuilt from one long equal-weight product grid into collection/material chapters.

The chapter structure now gives:

- collection title
- count
- in-stock count
- material trace
- product group
- collection route

This was visually judged as a clear improvement in the second capture.

## Collections

The index received stronger rhythm changes rather than seven equal panels.

## Collection Detail

Hero compressed so:

- name
- material identity
- image

arrive together sooner.

Desktop result improved in the second capture.

## Product Detail

The vertical-pressure / espresso composition was rebalanced to aim for:

- object
- identity
- price
- action

inside the first desktop viewport.

## Booking

The fake “backend gate” dead end was replaced with a truthful email handoff.

The request review prepares:

- workshop
- participants
- preferred schedule
- price basis

and can continue by email to Fokhara.

This does **not** confirm a booking.

## Cart

The fake checkout gate was replaced with a truthful email order handoff.

The current selected item list and total can be carried into an email to Fokhara.

This does **not** claim online payment.

## Studio / Visit / Workshops

Research/implementation prose was rewritten as visitor-facing content.

## Empty Cart

Empty Cart became an authored state rather than a generic utility void.

---

# 18. VP10 — SECOND CAPTURE / REGRESSIONS FOUND

The second rendered capture proved that the correction direction was broadly right.

Clear wins:

- Shop Material Chapters improved the page substantially.
- Collection Detail Desktop improved.
- Studio copy/evidence felt cleaner.
- Home prototype copy was gone.
- Cart empty state now belonged to the visual world.
- no horizontal overflow on core routes
- no meaningful page/console errors in the captured baseline

But it also exposed two real regressions.

## Regression 1 — Desktop Product Detail ordering

The Object→Maker bridge appeared before the actual product evaluation surface because of CSS grid/order interaction.

## Regression 2 — Mobile Collection Detail

A desktop override leaked into compact layout and compressed the lead image into a narrow side strip.

Both were fixed in:

```
8e34cc413852ec892d74e15c4f010ac2f3a205a3
```

Commit:

```
fix(vp10): restore product and compact collection ordering
```

CI after fix:

- TypeScript PASS
- Build PASS
- Workflow PASS

## Critical open visual fact

Those final `8e34cc4` fixes have **not yet been re-accepted through a fresh rendered screenshot comparison in this handoff state**.

Therefore:

> **VP10 remains OPEN.**

Do not mark PR #14 ready merely because CI is green.

---

# 19. WHY THE EXPERIMENT LAB EXISTS

After the second VP10 review, the direction became:

The site has enough structure.

Now test whether the thesis can become visible through authored behavior, imagery and spatial logic rather than:

- another large heading
- another beige field
- more generic motion
- more “award-site” gestures

The Lab is intentionally disposable.

Doc:

```
docs/visual/EXPERIMENT_LOOP_01.md
```

Core rule remains:

> **The web is the medium of execution, not the source of the idea.**

Interaction rule remains:

> **Every transition must explain a state change.**

---

# 20. LATE EXTERNAL REALITY-CHECKS USED FOR THE LAB

These were used **after** Fokhara’s thesis existed.

They are not visual templates to copy.

Examples researched:

## COTTA

Useful lesson:

A ceramics practice can hold:

- object
- studio
- art
- classes
- culture

inside one world rather than looking like a generic pottery ecommerce template.

## CaiYawen Ceramics

Useful lesson:

Scroll/mouse interaction can belong to ceramics without turning it into a game.

## Getty / Resn — Tracing Art

Useful lesson:

Spatial movement can express a real relationship/provenance instead of acting as decoration.

## GLSL / shader award archives

Useful lesson:

Shaders/WebGL are now mature techniques.

Therefore:

> a shader itself is not an idea.

## Kiln interactive storefront example

Useful lesson:

One meaningful 3D/object signature can carry more identity than putting WebGL everywhere.

Again:

**do not copy these sites visually.**

---

# 21. EXPERIMENT LAB — CURRENT FIVE EXPERIMENTS

Lab index:

```
/lab
```

## 01 — Material Memory Field

Route:

```
/lab/material-memory
```

Stack:

- raw WebGL2
- no Three.js dependency

Behavior:

- pointer movement leaves a light trace
- press/touch leaves stronger pressure
- trace has finite decay
- no permanent background loop
- reduced motion becomes static
- real product photography stays untouched

Question:

> Can THE FORM REMEMBERS become perceptible through pressure and trace rather than explanatory copy?

Important truth:

The interface receives the action.

The photographed ceramic does **not** pretend to deform.

## 02 — Carry Becomes Space

Route:

```
/lab/carry-space
```

Stack:

- Motion
- CSS 3D / perspective

Behavior:

- source
- lift
- depth
- travel
- target recomposition
- settle

Depth amount is tied to travel/distance profile rather than random theatrical animation.

Question:

> Can navigation feel like carrying an object through space without becoming theatrical?

This should extend the existing Carry idea, not replace it with a generic transition engine.

## 03 — Kiln Threshold

Route:

```
/lab/kiln-threshold
```

Behavior states:

```
soft
→ hold
→ surface
→ settle
```

Important truth:

- factual workshop image stays source-true
- material transition happens in the surrounding interface field
- no fake “this exact pot transforms through firing” claim
- no glaze filter painted over factual photography

Question:

> Can transformation be expressed by interface state rather than simulated ceramic deformation?

## 04 — Collection Inheritance

Routes:

```
/lab/collection-inheritance
/lab/collection-inheritance/[collectionSlug]
```

This is an actual route-navigation experiment.

Behavior:

- choose a collection
- persist selected material state for arrival
- destination receives an inherited field
- inherited state briefly remains
- state contracts into a quiet edge when the destination task settles

Question:

> Can a user choice be remembered across navigation instead of behaving like a simple theme color?

## 05 — Studio Contact Sheet

Route:

```
/lab/studio-contact-sheet
```

Stack:

- real imagery
- DOM/CSS
- no WebGL
- no 3D

Behavior:

- real current Fokhara workshop imagery drives composition
- image modes change narrative emphasis
- contact-sheet rhythm breaks repeated hero language

Question:

> Can real studio evidence carry more Fokhara identity than another visual effect?

This experiment exists because VP10 showed that real workshop/studio imagery already carried some of the strongest presence in the whole site.

---

# 22. EXPERIMENT ACCEPTANCE RULE

Keep an experiment only if all are true:

1. It can be explained using Fokhara’s thesis without naming the technology.
2. It clarifies a material, action, transition or evidence relationship.
3. It does not delay Shop / Booking / Cart intent.
4. It is finite.
5. Mobile and reduced-motion remain authored.
6. Removing it would remove meaning, not merely spectacle.

Shortcut:

> **If the technology is the most interesting thing, delete it.**

Never merge PR #15 as a bundle.

Accepted ideas must be selectively re-authored into VP10/production one by one.

---

# 23. LAB INTERACTION-AWARE CAPTURE

The Lab now has its own capture infrastructure.

Files:

- `scripts/lab-capture.mjs`
- `scripts/lab-capture.ps1`

Package script:

```
npm run capture:lab
```

Output folder:

```
visual-review/lab/
```

Packaged output:

```
fokhara-lab-review.zip
```

The runner is interaction-aware.

It captures actual experiment states:

## Material Memory
- initial
- trace
- settling

## Carry Becomes Space
- source
- travel
- target

## Kiln Threshold
- soft
- hold
- surface
- settle

## Collection Inheritance
- choice
- arrival
- settled

## Studio Contact Sheet
- opening
- middle
- late

Profiles:

- Desktop
- Mobile

Generated Lab visual evidence is gitignored.

---

# 24. NEXT IMMEDIATE ACTION — THIS IS THE MOST IMPORTANT CONTINUATION POINT

The next chat should **not** start by inventing Experiment 06.

First:

## Run the Lab capture

From the local repository:

```powershell
git fetch origin
git checkout visual/experiment-lab
git pull origin visual/experiment-lab

powershell -ExecutionPolicy Bypass -File .\scripts\lab-capture.ps1
```

Expected output:

```
fokhara-lab-review.zip
```

Upload that ZIP into the continuation chat.

Then visually review the five experiments.

Do not judge them from code.

---

# 25. HOW TO REVIEW THE LAB

The review must answer, experiment by experiment:

## Material Memory

- Does the trace feel material or like a shader demo?
- Is pressure legible?
- Is it too “digital goo”?
- Is the product still the factual anchor?
- Does it deserve Home / collection use, or nowhere?

## Carry Becomes Space

- Does depth make Carry more physical or just slower?
- Does the object still feel precise?
- Is 3D tilt too theatrical?
- Is destination recomposition clearer than the current production Carry?
- Does mobile need a different translation?

## Kiln Threshold

- Does soft→hold→surface→settle clarify process?
- Does the surrounding field feel like material states or just scroll theming?
- Is the long scroll worth it?
- Could the useful part be reduced to one finite threshold moment?

## Collection Inheritance

- Does arriving material memory feel causally connected to the selection?
- Is it too much full-screen color?
- Could a smaller inherited edge/trace be stronger?
- Does it actually improve continuity?

## Studio Contact Sheet

- Does real imagery finally break the neutral-editorial template feeling?
- Which crop/grouping rhythms work?
- Does this deserve production before any shader?
- What real missing photography would make this substantially stronger?

---

# 26. EXPECTED OUTCOME OF THE LAB REVIEW

Do **not** expect all five to survive.

A successful Lab review may result in:

- 1 experiment accepted
- 2 partially accepted
- 2 deleted

That is good.

The Lab exists to make deletion cheap.

Potential outcomes:

- keep the concept but rewrite the implementation
- keep only one micro-behavior
- move an experiment to one route only
- keep desktop but redesign compact separately
- reject entirely

Do not attach ego to experimental code.

---

# 27. AFTER LAB REVIEW — SELECTIVE PRODUCTION INTEGRATION

Once rendered experiments are reviewed:

1. Rank:
   - KEEP
   - REWRITE
   - DELETE

2. Do not merge PR #15.

3. For each accepted idea:
   - re-author it cleanly on `visual/vp10-full-visual-review`
   - keep the smallest version that carries the meaning
   - validate mobile + reduced motion
   - preserve commerce/booking clarity

4. Recapture VP10.

5. Compare against the previous VP10 evidence.

6. Only then decide whether the integrated idea remains.

---

# 28. VP10 AFTER EXPERIMENT INTEGRATION

VP10 should close only when:

- rendered Desktop review is accepted
- rendered Mobile review is accepted
- final `8e34cc4` regressions are visually verified
- any accepted Lab ideas are integrated and re-reviewed
- no major generic award-site residue remains
- practical actions remain clear
- no route has accidental giant dead space
- no page is merely repeating another page’s composition
- real product/studio evidence has enough authority
- motion remains causal
- reduced motion has a designed equivalent
- mobile remains authored rather than compressed desktop

Then PR #14 can become mergeable.

Not before.

---

# 29. SUBTRACTION — AFTER THE EXPERIMENT LOOP, NOT BEFORE

The project previously called this VP11/Subtraction.

Do not obsess over the phase number.

The work is:

Remove anything that is:

- clever but unnecessary
- repeated
- self-explanatory dev copy
- duplicate transition language
- excessive oversized typography
- redundant material accents
- fake “award” gesture
- overlong spatial hold
- interaction with no consequence
- visual effect that competes with the object

Subtraction is not “make it minimal.”

It means:

> leave only the gestures that belong to Fokhara.

---

# 30. FINAL PRODUCTION QA — AFTER VISUAL ACCEPTANCE

The final production close should include:

## Performance

- Core Web Vitals
- image weight / sizing
- responsive image behavior
- font loading
- JS budget
- WebGL cost if any experiment survives
- mobile GPU cost
- no unnecessary hydration

## Accessibility

- keyboard
- focus
- reduced motion
- semantic links/buttons
- contrast
- touch target sizes
- no interaction-only content loss

## Runtime

- deep links
- 404s
- Woo availability
- empty states
- failure states
- Cart mutations
- Cart return
- booking request handoff
- mobile widths
- no horizontal overflow

## SEO

- metadata
- structured Product
- structured Course
- canonical public wording
- no Lab indexing

## Production smoke

- Home
- Shop
- Collections
- Product Detail
- Workshops
- Workshop Detail
- Booking
- Studio
- Visit
- Cart
- Policies

## Payment

Payment completion remains a separate external gate unless test/staging or explicit controlled owner approval exists.

---

# 31. VISUAL SOURCE TRUTH / ASSET GAPS STILL MATTER

The project can continue visually without waiting for a complete new photoshoot.

But original asset production remains one of the biggest future ceilings.

High-value real Fokhara assets to obtain eventually:

1. Dalia/founder portrait
2. hands + raw clay macro
3. trimming
4. glazing
5. kiln / post-fire
6. studio wide
7. shelves / inventory in space
8. finished object in use
9. exterior / arrival
10. controlled macro shots of glaze / foot / rim / retained hand trace

When these arrive:

Do not simply drop them into existing cards.

Revisit choreography and page pacing around the new evidence.

---

# 32. FIGMA ATTEMPT — NOT THE CURRENT PATH

A Figma VP10 file exists:

```
Fokhara VP10 Visual Review
```

File key:

```
e6CchybAr3Eo2c3yxvnVQV
```

A browser/Figma capture path was explored, but it depended on a browser MCP workflow not exposed directly in this Plus web chat.

Do not waste the next chat rebuilding that path.

The local Playwright capture workflow is currently the reliable visual-review method.

If the product/tool environment changes later, Figma can be revisited.

---

# 33. ARCHITECTURE GUARDRAILS

Keep these intact unless new evidence justifies changing them.

- no client-only SPA rewrite
- no fake live workshop availability
- no fake booking confirmation
- no fake checkout success
- no production-order mutation for compatibility testing
- no random composition
- no random motion
- no effect without causal meaning
- failed transition must never become failed navigation
- practical commerce clarity beats spectacle
- mobile is authored independently
- reduced motion is a real design state
- product imagery remains source-true
- unknown production facts remain unknown until verified
- WebGL is optional
- 3D is optional
- GSAP is optional
- award techniques are optional
- Fokhara identity is not optional

---

# 34. WHAT NOT TO DO IN THE NEXT CHAT

Do not:

1. restart with “let’s research pottery websites”
2. propose a generic earthy pottery color palette
3. turn everything into clay morphing
4. add Three.js because “award sites use it”
5. merge PR #15 wholesale
6. merge PR #14 before rendered acceptance
7. call VP10 done because CI is green
8. force every page into observer→maker theater
9. replace real photography with generic stock
10. create more phase labels just to feel progress
11. polish padding before answering larger visual questions
12. make Home/Shop/Collections/Studio all use the same large-type template
13. make commerce harder in the name of art

---

# 35. WHAT TO PRESERVE FROM THE USER’S WORKING STYLE

This matters to project continuity.

The workflow developed through active challenge and correction, not passive approval.

The user wants:

- ambitious work
- high visual ceiling
- real research
- broad references when the timing is right
- implementation, not endless discussion
- willingness to delete an idea
- visual review of actual renders
- no premature freezing of the design
- no generic “award candidate” tricks
- no artificial splitting into endless phases
- practical truth preserved

A useful working rhythm is:

> build enough to see → show evidence → critique → change direction if needed.

Do not defend previous work merely because it took effort.

---

# 36. CURRENT PROJECT STATUS — ONE SCREEN

```
RESEARCH 01–08                         ✅ CLOSED
P0 Carry / Recompose                   ✅ CLOSED
P1 Maker / truthful booking            ✅ CLOSED
P2 Full structural product system      ✅ CLOSED

VP0 Visual Truth                       ✅
VP1 Photography Direction              ✅
VP2 Asset Baseline                     ✅
VP3 Typography                         ✅
VP4 Material State                     ✅
VP5 Crop Choreography                  ✅
VP6 Carry Visual Refinement            ✅
VP7 Motion Restraint                   ✅
VP8 Page Pacing                        ✅
VP9 Compact / Mobile                   ✅ MERGED / PRODUCTION

VP10 Full Rendered Visual Review       🔄 ACTIVE
VP10 First Correction Pass             ✅ IMPLEMENTED
VP10 Second Screenshot Review          ✅ REVIEWED
VP10 Regression Fix 8e34cc4            ✅ CODE/CI
VP10 Regression Fix visual recapture   ⏳ STILL NEEDED

Experiment Lab                         🔄 ACTIVE / DISPOSABLE
  01 Material Memory                   ✅ BUILT
  02 Carry Becomes Space               ✅ BUILT
  03 Kiln Threshold                    ✅ BUILT
  04 Collection Inheritance            ✅ BUILT
  05 Studio Contact Sheet              ✅ BUILT
  Lab Index                            ✅ BUILT
  Interaction-aware capture runner     ✅ BUILT
  Lab code validation                  ✅ PASS
  Lab rendered visual review           ⏳ NEXT

Selective experiment integration       ⏳
Subtraction                            ⏳
Final Visual / Production QA           ⏳
Final production merge/deploy          ⏳
```

---

# 37. EXACT NEXT CHAT OPENING INSTRUCTION

A continuation chat should start by reading this file and then proceed from:

> **We are at the rendered Experiment Lab review. Do not restart Fokhara research. The immediate job is to capture/review the five experiments, rank KEEP/REWRITE/DELETE, then selectively re-author only accepted ideas into VP10.**

If the Lab ZIP has not yet been generated, run:

```powershell
git fetch origin
git checkout visual/experiment-lab
git pull origin visual/experiment-lab
powershell -ExecutionPolicy Bypass -File .\scripts\lab-capture.ps1
```

Upload:

```
fokhara-lab-review.zip
```

Then review the actual interaction-state screenshots.

---

# 38. FINAL CONTINUATION PRINCIPLE

The first part of the project answered:

> **What is Fokhara, and what digital system can truthfully carry it?**

That work is largely done.

The current work asks:

> **What does Fokhara look and feel like when the system stops being a prototype and becomes authored enough that the idea is visible without reading the documentation?**

The answer should not come from adding every modern technique.

It should come from repeatedly choosing the smallest, strongest, most truthful set of visual behaviors that make:

# THE FORM REMEMBERS

feel inevitable rather than branded-on.

