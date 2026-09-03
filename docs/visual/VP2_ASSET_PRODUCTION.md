# VP2 — Asset Production / Missing Visuals

**Status:** PASS  
**Branch:** `visual/vp2-real-assets`

VP2 removes the largest prototype lie: real Fokhara visual truth now appears where the business already exposes it.

## Live object media

`ProductVisual` now prefers the current Woo product image.

The previous CSS ceramic remains only as a fallback when a real image is missing.

This means Carry / Shop / Product Detail can all preserve the identity of the same real current object.

## Live workshop media

The current Woo source exposes unique primary imagery for all five workshop prototypes currently represented in the redesign:

| Fokhara route | Current Woo product source | Primary media |
|---|---|---|
| Handbuilding | pottery-hand-building-pottery-workshop-cairo | img_9214.webp |
| Wheelthrowing | wheelthrowing-pottery-workshop-cairo | 51e8c35b-...-scaled.webp |
| 1-Month Course | 1-month-pottery-course-cairo | gs3a3370_original-scaled.webp |
| Make & Paint | two-day-pottery-workshop-cairo | 8f1d161d-...-scaled.webp |
| Family Time | family-pottery-workshop-cairo | img_4229-scaled.webp |

Workshop pages are hydrated server-side from the existing Woo adapter rather than hard-coding these URLs into each Workshop fixture.

## Official studio evidence

A current official Fokhara homepage workshop photograph is now registered as a deliberate Studio evidence source:

`GS3A3651-819x1024.jpg`

It is used as real studio/process proof, not as a generic background.

## Source architecture

Runtime object media:
`Woo → normalized Product → ProductVisual`

Runtime workshop media:
`Workshop source URL → Woo product slug → current Woo image → WorkshopVisual`

Known official editorial media:
`lib/visual/official-media.ts`

## Missing assets remain explicit

VP2 does not pretend we now have everything.

Still missing for final authored quality:

- founder portrait
- founder working
- glaze macro set
- raw clay macro
- trimming close-up
- dedicated glazing close-up
- kiln/firing threshold
- clean studio-wide
- shelves/archive
- object-in-use
- exterior/arrival
- alternate product angles

These are slots for real future source files.

They are **not** filled with generated fake Fokhara photography.

## Production note

The prototype currently references Fokhara's own live media URLs.

If the redesign is adopted as the final Fokhara site, production hardening should migrate/confirm approved master files and delivery ownership instead of assuming permanent cross-site hotlinking.

## Exit

**PASS.**

The structural prototype no longer needs abstract stand-ins to represent products/workshops where real current media exists.

Next:

**VP3 — Typography Lab**

Typography can now be judged against real product and process imagery instead of placeholders.
