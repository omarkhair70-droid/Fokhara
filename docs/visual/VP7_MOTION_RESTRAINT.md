# VP7 — Motion Physics & Interaction Restraint

**Status:** PASS candidate  
**Branch:** `visual/vp7-motion-restraint`

VP7 audits every existing motion point after Carry physics is already authored.

The purpose is not to add movement.

The purpose is:

> **Every transition must explain a state change. If it cannot, remove it.**

---

## 1. Motion tiers

### Tier 0 — None

Use for:
- stable content
- normal text/layout
- reduced motion
- state changes that are clearer when immediate

### Tier 1 — Utility

Budget:
roughly 100–160 ms

Retained:
- Shop return-state readiness fade
- Carry target reveal

These communicate state completion, not atmosphere.

### Tier 2 — Compositional

Budget:
roughly 320 ms

Retained:
- Shop material-field change after a collection filter is selected

The cause is explicit:
collection selection changes material context.

### Tier 3 — Carry

Owned by VP6 physics rather than CSS timing alone.

Retained:
- source→detail crop crossfade
- material trace collapse
- spatial Carry spring

---

## 2. Removed motion

### Product image transform transition — REMOVED

Previous:
`520ms transform`

Why removed:
Product visual role is fixed for each rendered element.

There is no meaningful in-place state change that requires the image to glide
between transforms.

Carry already owns the actual crop-state transition through two coordinated
visual layers.

Keeping this CSS transition was inert and could cause accidental animation
during responsive/layout changes.

### Workshop image transform transition — REMOVED

Previous:
`420ms transform`

Why removed:
Workshop crop role is also fixed per rendered element.

No interaction changes that transform in place.

The transition added no information.

---

## 3. Shop transition conflict fixed

Earlier CSS had:

- a Shop readiness opacity transition;
- later, a material background transition on the same selector.

The later `transition` declaration replaced the first one in the cascade.

VP7 combines them explicitly:

- readiness opacity → utility tier
- material field → compositional tier

No accidental cascade override remains.

---

## 4. Carry source suppression

Previous:
source and target shared a 100ms opacity fade.

Problem:
the real source could remain partially visible under the newly-created Carry
overlay, briefly creating a doubled object.

VP7 changes the contract:

### Source
Immediate suppression.

Reason:
the overlay appears at the exact source bounds and becomes the visual object.

### Target
Short utility reveal remains.

Reason:
after Carry settles, the real destination replaces the overlay.

---

## 5. Reduced Motion bug fixed

Previous reduced-motion path:
- spatial overlay was correctly absent;
- Carry state could still keep the destination target hidden for about
  120–140ms.

This produced a small blank delay even when the user explicitly requested no
motion.

VP7 removes that artificial hold.

With reduced motion:

- navigation remains immediate;
- destination Carry state clears immediately;
- target content remains available;
- no spatial transition dependency exists.

This is visual equivalence, not merely animation disabling.

---

## 6. Semantic CSS tokens

VP7 introduces one small motion vocabulary:

- `--motion-utility-fast`
- `--motion-utility`
- `--motion-composition`
- `--motion-carry-out`
- `--motion-carry-in`
- `--motion-carry-trace`
- `--ease-utility`
- `--ease-settle`

These are budgets, not a license to animate every component.

New motion should still default to **none**.

---

## 7. Static transforms are not motion

The audit found static transforms used for layout/composition, such as:

- staggered product cards;
- process/action positioning.

They remain because they do not animate over time.

A transform property is not automatically a motion effect.

---

## 8. Current motion inventory

After VP7, authored motion is intentionally small:

1. Shop ready fade.
2. Shop material field response.
3. Carry target reveal.
4. Carry crop crossfade.
5. Carry material trace.
6. Carry spatial physics.

There is:

- no infinite ambient loop;
- no scroll-jacking;
- no smooth-scroll theater;
- no loader animation;
- no generic hover movement;
- no image drift;
- no route-wide fade curtain.

---

## 9. Reduced Motion

The global reduced-motion contract remains:

- all CSS animation durations effectively zero;
- all transition durations effectively zero;
- smooth scrolling disabled;
- Carry overlay hidden.

VP7 additionally fixes the React Carry state so content is not held invisible.

---

## 10. Exit gate

PASS when:

1. every retained transition has a causal state change;
2. inert product/workshop transform transitions are gone;
3. Shop opacity + background transitions coexist explicitly;
4. Carry source is not visually doubled during lift;
5. target reveal remains finite;
6. reduced motion has no artificial Carry hold;
7. no infinite or hover-only motion exists;
8. semantic motion tokens replace scattered timing values for retained CSS;
9. TypeScript/build/preview remain green.

Next:

**VP8 — Page Pacing & Compositional Rhythm**
