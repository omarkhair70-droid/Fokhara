# Fokhara — Experimental Digital Redesign

An experimental redesign project for **Fokhara Studio & Shop**.

This repository is being used to test a research-led creative workflow where the visual and interaction language is derived first from the **real product, material, craft, culture, physical processes, and meaning** — and only afterward checked against the current web craft landscape.

## Current Status

**Original Synthesis / Implementation Blueprint closed. Ready for P0 prototype implementation.**

- [x] Step 01 — Product Truth
- [x] Step 02 — Non-Web Source Research / Source Atlas
- [x] Step 03 — Meaning Extraction
- [x] Step 04 — Digital Translation
- [x] Step 05 — First Visual Thesis
- [x] Step 06 — Web Reality Check
- [x] Step 07 — Product Architecture
- [x] Step 08 — Original Synthesis / Implementation Blueprint
- [ ] P0 — Carry + Recompose Product Loop
- [ ] P1 — Become the Maker / Booking
- [ ] P2 — Full Product System
- [ ] Visual Review + Subtraction

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

## Internal Visual Thesis

**THE FORM REMEMBERS**

> **A digital material system where actions leave trace, selected objects causally reform later states, people can cross from observer to maker, and the interface settles from expressive exploration into precise commitment.**

## Technical Baseline

- Next.js 16.3.3 Active LTS
- App Router + TypeScript
- React Server Components by default
- Motion for React 13.x
- CSS Modules + semantic CSS custom-property tokens
- WooCommerce / WordPress retained as initial operational source
- WooCommerce isolated behind a Fokhara commerce adapter + Next BFF
- native View Transition API only as progressive enhancement
- no WebGL requirement for P0/P1

## Signature System

### 1. CARRY + RECOMPOSE
The selected object persists and determines the next composition.

### 2. TRACE
Prior interaction leaves a subtle, causal state.

### 3. BECOME THE MAKER
Workshops transform the user from observer to participant.

### 4. SETTLE WITH INTENT
Expression contracts as the user approaches booking, cart, and checkout.

## P0 Prototype

Build only:

1. minimal Home object entry
2. Shop listing
3. Product Detail
4. Carry + Recompose
5. return-state restoration
6. compact/mobile equivalent
7. reduced-motion equivalent

The Product Detail route must also work as a direct deep link with no carry state.

## Architecture Guardrails

- no client-only SPA
- no fake live workshop availability
- no random composition
- no effect without causal meaning
- no checkout assumption before gateway compatibility is verified
- no WebGL until P0/P1 pass
- failed transition must never become failed navigation
- transactional clarity wins over spectacle

## Production Source

The current Fokhara installation exposes WooCommerce Store API endpoints, so the redesign can preserve the existing commerce backend while replacing the customer-facing experience.

Production checkout remains gated on verification of the current payment gateway's Store API/headless compatibility.

## Next

**P0 Prototype Implementation — Home → Shop → Product via Carry + Recompose → Back with Trace.**
