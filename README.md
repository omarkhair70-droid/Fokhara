# Fokhara — Experimental Digital Redesign

An experimental redesign project for **Fokhara Studio & Shop**.

This repository tests a research-led creative workflow where the visual and interaction language is derived first from the **real product, material, craft, culture, physical processes, and meaning** — and only afterward checked against the current web craft landscape.

## Current Status

**Research, architecture, P0, P1 and the P2 structural product system are closed. The project is ready to move into authored visual production and final review.**

- [x] Step 01 — Product Truth
- [x] Step 02 — Non-Web Source Research / Source Atlas
- [x] Step 03 — Meaning Extraction
- [x] Step 04 — Digital Translation
- [x] Step 05 — First Visual Thesis
- [x] Step 06 — Web Reality Check
- [x] Step 07 — Product Architecture
- [x] Step 08 — Original Synthesis / Implementation Blueprint
- [x] P0 — Carry + Recompose Product Loop
- [x] P1 — Become the Maker / Booking Truth
- [x] P2 — Full Product System — structurally closed
- [x] VP0 — Visual Truth Audit
- [x] VP1 — Photography & Image Direction
- [x] VP2 — Asset Production / Missing Visuals
- [x] VP3 — Typography Lab
- [x] VP4 — Material State System
- [x] VP5 — Image Choreography & Crop Authorship
- [x] VP6 — Carry / Recompose Visual Refinement
- [x] VP7 — Motion Physics & Interaction Restraint
- [ ] VP8 — Page Pacing & Compositional Rhythm
- [ ] Visual Production
- [ ] Visual Review + Subtraction
- [ ] Final Production QA

### External production gate

The current live Fokhara Woo store exposes Paymob gateways through the Store API, but actual headless payment processing is intentionally not exercised against the owner's live store.

Checkout payment completion remains gated until either:

- a Woo/Paymob staging or test environment is available, or
- the owner explicitly approves a controlled live-order test.

This gate does **not** block the visual-production phase.

## Core Rule

> The web is the medium of execution, not the source of the idea.

## Research / Design Foundation

- [Step 01 — Product Truth](docs/research/01-product-truth.md)
- [Step 02 — Non-Web Source Atlas](docs/research/02-non-web-source-atlas.md)
- [Step 03 — Meaning Extraction](docs/research/03-meaning-extraction.md)
- [Step 04 — Digital Translation](docs/research/04-digital-translation.md)
- [Step 05 — First Visual Thesis](docs/research/05-first-visual-thesis.md)
- [Step 06 — Web Reality Check](docs/research/06-web-reality-check.md)
- [Step 07 — Product Architecture](docs/research/07-product-architecture.md)
- [Step 08 — Implementation Blueprint](docs/research/08-implementation-blueprint.md)
- [P2 — Data Wiring & Payment Audit](docs/implementation/P2_DATA_WIRING.md)
- [P2 — Structural Acceptance](docs/implementation/P2_STRUCTURAL_ACCEPTANCE.md)

## Internal Visual Thesis

**THE FORM REMEMBERS**

> **A digital material system where actions leave trace, selected objects causally reform later states, people can cross from observer to maker, and the interface settles from expressive exploration into precise commitment.**

## Technical Baseline

- Next.js 16.3.3
- App Router + TypeScript
- React Server Components by default
- semantic authored CSS
- WooCommerce / WordPress retained as operational source
- normalized Fokhara commerce domain
- Next BFF for Woo session and mutation plumbing
- native View Transition API only as progressive enhancement
- no WebGL requirement
- vendor-neutral analytics contract
- Product / Course structured data

## Signature System

### 1. CARRY + RECOMPOSE
The selected object persists and determines the next composition.

### 2. TRACE
Prior interaction leaves a subtle, causal state.

### 3. BECOME THE MAKER
Workshops transform the user from observer to participant.

### 4. SETTLE WITH INTENT
Expression contracts as the user approaches booking, cart, and checkout.

## Implemented Product System

### Object loop

```
Home
  → Shop
  → Collections
  → Product Detail
  → Live Cart
```

Includes:

- live Woo product data
- 19 current ceramic products discovered from the real store at P2 audit time
- live price / stock / descriptions / primary images
- collection grouping adapter
- Carry + Recompose
- return-state restoration
- live Woo Cart-Token session
- add / update / remove / totals
- structured Product SEO

### Maker loop

```
Home
  → Workshops
  → Workshop Detail
  → Booking Request Review
```

Includes:

- process-first workshop discovery
- observer → understand → choose → commit progression
- recurring-window truth
- no fake live capacity
- no fake booking confirmation
- current workshop policies
- structured Course SEO

### Cross-system continuity

```
Object → Workshops
Workshop → Objects
Studio → Shop / Workshops / Visit
Collection → Shop / Workshops
```

The product-to-workshop bridge does not claim an unverified making method for a specific object.

## Current Routes

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

## Architecture Guardrails

- no client-only SPA
- no fake live workshop availability
- no random composition
- no effect without causal meaning
- no fake checkout/payment success
- no production-order mutation for compatibility testing
- no WebGL until it has a real product/concept reason
- failed transition must never become failed navigation
- transactional clarity wins over spectacle
- unknown production facts remain unknown until Fokhara confirms them

## Next

**VP8 — Page Pacing & Compositional Rhythm**

The structural system is now the canvas, not the finished artwork.

VP0 established the real current asset surface: 19 live product primaries, usable official workshop imagery, a broader unresolved archive, and clear macro/founder/studio/use gaps.

Next work should concentrate on:

1. approved/original Fokhara photography
2. final typography
3. material-aware image crops and focal points
4. refined Carry / Trace motion
5. page pacing and compositional pressure
6. compact/mobile visual authorship
7. reduced-motion visual equivalence
8. full-site visual review
9. subtraction of generic award-site language
10. performance and final production QA

The next phase must make the site unmistakably **Fokhara**, not merely a well-built ceramics website.
