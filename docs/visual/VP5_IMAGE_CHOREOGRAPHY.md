# VP5 — Image Choreography & Crop Authorship

**Status:** PASS candidate  
**Branch:** `visual/vp5-image-choreography`

VP5 stops treating the same real photograph as a generic thumbnail at every route.

The governing rule:

> **Crop is information priority.**

A crop must answer what the user needs to understand in that state.

---

## 1. Product crop roles

The same current Woo image can now be rendered with a semantic role:

- `home`
- `browse`
- `collection`
- `detail`
- `bridge`
- `cart`

### Home

Purpose:
**object as compositional mass**

Behavior:
- tighter than factual detail
- object becomes visually consequential
- still derived from the same real image

### Browse

Purpose:
**recognition + comparison**

Behavior:
- object enlarged relative to the old universal contain treatment
- current coherent white-cloth product shoot remains visible
- no destructive crop of handle/rim/foot

### Collection

Purpose:
**form inside a surface family**

Behavior:
- similar recognition discipline to browse
- slightly calmer than Home
- same ProductVisual contract used by collection routes

### Detail

Purpose:
**factual evaluation**

Behavior:
- returns to `contain`
- silhouette is preserved
- excess crop drama is removed before purchase decision

### Bridge

Purpose:
**recognisable object memory**

Behavior:
- tighter object presence
- no new editorial identity

### Cart

Purpose:
**identity only**

Behavior:
- contain
- natural scale
- no visual spectacle

---

## 2. Carry crop continuity

Before VP5:
- source and overlay both used one generic ProductVisual treatment;
- the destination could reveal a different composition with no authored crop transition.

After VP5:
- Carry captures the source visual role;
- the moving overlay first preserves that exact source crop;
- when the destination target is registered, the overlay crossfades to the factual Detail crop while the geometry recomposes;
- the final target then reveals the same Detail role.

Sequence:

`source crop → lift → navigate → target geometry → crop recompose → settle`

This makes image choreography part of **memory**, not a separate animation.

---

## 3. Collection consistency

The collection routes previously used raw `<img>` elements outside ProductVisual.

VP5 removes those exceptions.

Now:
- collection index lead → ProductVisual / collection role
- collection detail lead → ProductVisual / collection role
- collection product → CarryProductLink / collection role
- collection product can carry directly into Product Detail

The object-side image grammar is now shared across routes.

---

## 4. Workshop image truth

Workshop imagery cannot be forced into one “process” category.

Current real sources show different truths.

### Handbuilding

Current primary:
- a hand holds a finished dark clay mug
- strong red wall spiral
- outcome/held-object evidence

Classification:
**OUTCOME**

Do not pretend the photograph depicts active handbuilding pressure.

### Wheelthrowing

Current primary:
- instructor
- wheel/work surface
- participants around the action

Classification:
**PROCESS CONTEXT**

Crop priority:
instructor + wheel/action zone.

### 1-Month Course

Current primary:
- participant/maker actively working at the wheel
- wheel/table visible

Classification:
**ACTION**

Crop priority:
maker + wheel.

### Make & Paint

Current primary:
- participant actively works directly on the ceramic piece
- hands and object are the causal center

Classification:
**ACTION**

Detail crop intentionally shifts lower to prioritize the hands/object.

### Family Time

Current primary:
- people/family context
- activity aftermath / participation context
- not a close making action

Classification:
**HUMAN CONTEXT**

Do not crop it into a false “hands making” claim.

---

## 5. Workshop crop roles

- `home` — atmosphere with a readable activity center
- `index` — subject clarity
- `detail` — the most causally useful part of that specific source

Workshop focus anchors are authored separately from workshop business data in:

`lib/visual/image-choreography.ts`

Domain truth stays independent from presentation truth.

---

## 6. Mobile authorship

Mobile does not inherit desktop crop scale blindly.

Compact mode:
- opens product crops slightly;
- guarantees Detail stays contain;
- reduces aggressive workshop scaling;
- preserves action/faces/object visibility.

This is **recomposition**, not shrinkage.

---

## 7. No new factual assets invented

VP5 only changes:
- fit
- focal position
- scale
- transition between crop roles

It does not:
- generate alternate product angles
- invent macro photographs
- replace Fokhara products
- fake process evidence

Missing M0/M1/M3/M4 assets from VP0 remain genuine production gaps.

---

## 8. Implementation

New:
- `lib/visual/image-choreography.ts`

Changed:
- ProductVisual gets semantic `visualRole`
- WorkshopVisual gets semantic `visualRole` + image-truth classification
- Carry snapshot persists source visual role
- Carry overlay crossfades source crop → detail crop
- collection routes use ProductVisual / CarryProductLink
- workshop→object bridge uses ProductVisual

---

## 9. Exit gate

PASS when:

1. Home object has authored mass.
2. Shop products are visually larger without losing recognisability.
3. Product Detail preserves silhouette.
4. Carry starts with the exact source crop.
5. Carry resolves into the Detail crop instead of visually jumping.
6. Collection routes use the same product crop contract.
7. Workshop crops reflect what each real source actually depicts.
8. Mobile opens crops rather than blindly shrinking desktop.
9. Reduced motion has a coherent final crop without dependency on animation.
10. TypeScript, production build and preview are green.

Next:

**VP6 — Carry / Recompose Visual Refinement**
