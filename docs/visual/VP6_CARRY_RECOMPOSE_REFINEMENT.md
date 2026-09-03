# VP6 — Carry / Recompose Visual Refinement

**Status:** PASS candidate  
**Branch:** `visual/vp6-carry-recompose-refinement`

VP6 refines the signature Carry loop after real photography, material state,
typography and crop roles are already in place.

This phase does **not** add decorative animation.

It makes the existing transition obey a finite causal sequence:

`capture → lift → navigate → target acquire → recompose → settle`

---

## 1. Explicit lift phase

The original implementation enum described a lift concept but runtime moved from
capture to navigation on the next animation frame.

VP6 restores an explicit:

`lifting`

phase.

The lift budget is deliberately short:

**92 ms**

It exists only to acknowledge the selected object physically before normal Next
navigation starts.

Reduced Motion skips this delay entirely.

---

## 2. Distance-aware travel

One spring no longer governs every source/target geometry.

Travel is measured deterministically from the source and target centers.

### Near

- highest stiffness
- lowest mass
- shortest settle budget

### Medium

- slightly calmer
- slightly heavier

### Far

- lowest stiffness
- highest mass
- longest settle budget

The rule is:

> longer travel should feel heavier, not artificially faster.

No randomness is used.

Same geometry produces the same physics profile.

Implementation:

`lib/visual/carry-physics.ts`

---

## 3. Geometry and crop are separate but coordinated

VP5 established source-crop memory.

VP6 keeps that behavior:

1. source crop is captured;
2. overlay lifts with source crop;
3. route changes;
4. destination target registers;
5. geometry begins resolving;
6. crop crossfades toward Detail;
7. destination settles.

The crop does not change just because navigation started.

It changes only after the destination exists.

---

## 4. Material inheritance on the Carry layer

The moving Carry layer now receives the same material CSS variables as the
selected object.

Material is allowed to affect only:

- transition edge
- restrained lift shadow
- settle trace

The photograph remains untouched.

This fixes a previous limitation where material variables existed inside
ProductVisual but the parent Carry frame could not reliably use them.

---

## 5. Phase-specific physical behavior

### captured

Semantic source is suppressed and overlay appears at the same bounds.

### lifting

Very small scale gain and strongest contact shadow.

Not a floating-card effect.

It reads as separation from the source plane.

### navigating

Scale relaxes slightly while route navigation proceeds.

### target-ready

Target geometry is known.

### recomposing

Source crop → detail crop crossfade and geometry resolution occur together.

### settled

Shadow/trace collapse and overlay exits.

### cancelled

Overlay is cleared; navigation/destination remains usable.

---

## 6. Failure safety

VP6 keeps the existing safety contract:

- target timeout cancels Carry;
- direct routes work without Carry;
- reduced motion skips flight;
- overlay remains aria-hidden;
- failed transition never becomes failed navigation.

Navigation timers are now also explicitly cleaned up when Carry is cleared or
the provider unmounts.

---

## 7. Motion budget

The transition remains finite.

- lift: 92 ms
- geometry settle: roughly 540–620 ms depending on real distance
- final overlay release: ~90 ms

These are not artificial loading delays.

Destination registration starts as soon as the route is available.

---

## 8. Compact behavior

Compact mode keeps:
- smaller shadow energy
- one-pixel material trace
- same deterministic physics contract

Reduced Motion has no lift delay and no spatial overlay.

---

## 9. Exit gate

PASS when:

1. explicit lifting phase exists;
2. navigation still begins quickly after immediate visual acknowledgement;
3. near/medium/far travel selects deterministic physics;
4. source crop remains stable until destination acquisition;
5. target crop begins only when target is registered;
6. Carry parent inherits the real material state;
7. long travel feels calmer/heavier, not faster;
8. timers clean up on cancel/unmount;
9. reduced-motion route navigation remains immediate;
10. TypeScript, production build and preview are green.

Next:

**VP7 — Motion Physics & Interaction Restraint**
