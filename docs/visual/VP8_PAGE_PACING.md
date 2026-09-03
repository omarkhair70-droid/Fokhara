# VP8 — Page Pacing & Compositional Rhythm

**Status:** PASS candidate  
**Branch:** `visual/vp8-page-pacing`

VP8 treats a page as a sequence of pressure states rather than a stack of equal
sections.

The governing rhythm:

> **open → pressure → release → re-form**

The rule is not applied mechanically. Each route derives its pacing from the
real product/task structure.

---

## 1. Home

Before:
- Object hero ≈ full viewport
- Maker ≈ full viewport
- Proof ≈ large viewport

The three states had nearly equal weight.

After:
- **Object** remains the open field.
- **Maker** becomes the pressure point.
- **Proof** becomes a short release/threshold.

The final proof changes composition too:
small label mass on the left, large concluding statement on the right.

It no longer behaves like a third hero.

---

## 2. Shop

The Shop now yields to inventory earlier.

Changes:
- intro compressed;
- product row breathing increased;
- repeated `3n + 2` visual staggering removed.

That stagger was formally consistent but had no relationship to product truth.

New pacing is causal:

When viewing **All**, the first product of a new real collection receives a
larger vertical breath.

So material-family change causes page rhythm change.

When filtering to one collection, that extra boundary disappears.

---

## 3. Collections index

Before:
seven current collections were represented as seven nearly identical large
panels.

After:
- first collection = **anchor**
- following collections = **scan**
- every third transition = **release**

The entry state establishes the material system, then the list becomes faster to
read.

No collection is hidden and factual summaries remain available.

This is authored sequence, not random masonry.

---

## 4. Collection detail

The collection hero remains important but is slightly shorter than a full
product-evaluation route.

Current product cards contract from large editorial panels into quicker
evaluation units.

The exit becomes a short release instead of another 65svh statement.

Sequence:

`material identity → factual strip → forms → release to whole system`

---

## 5. Product detail

Product Detail remains spatially dominant because the user is evaluating a real
object.

The Product → Workshop bridge is deliberately reduced.

It is a continuation, not a second hero.

This preserves:

`evaluate object → release → optional participation`

---

## 6. Workshop browse

Workshop grouping is now driven by actual **format**.

A new format:
- single
- package
- course

receives a larger breathing interval and a slightly larger lead card.

Other workshops within the same format scan faster.

The page rhythm is therefore tied to commitment shape, not list index.

---

## 7. Workshop detail

This route now expresses **Settle With Intent** spatially.

### Observe
94svh — open invitation.

### Understand
102svh — highest pressure.
The process/actions are the conceptual center.

### Choose
70svh — information density increases, spatial drama contracts.

### Commit
58svh — practical truth settles.

### Object bridge
60svh — continuation after commitment, not a competing ending.

The user can feel the route moving from exploration toward precision without
needing animation.

---

## 8. Studio reorder

Previous order:

`claim → historical origin → visual evidence → systems → process → visit`

Problem:
the first two major states were text-dominant.

New order:

`claim → physical proof → origin → own/make → compressed process → visit`

The real studio/workshop image now follows the opening claim immediately.

The evidence state becomes the page's visual peak.

History follows proof rather than delaying it.

---

## 9. Studio compression

The old Studio route had many sections in the ~65–90svh range.

VP8 gives each one a different role:

- Hero — invitation
- Evidence — visual peak
- Origin — contextual release
- Practice — two-system pressure
- Process — compressed sequence
- Visit — practical exit

This removes the feeling of six equally-weighted essays.

---

## 10. Compact mode

Desktop vertical holds are not copied to mobile.

Compact rules:
- long `svh` requirements are released;
- real images still keep useful minimum presence;
- collection/format boundaries remain visible;
- maker stages keep order but do not force viewport-sized sections.

Mobile is recomposed, not shrunk.

---

## 11. Removed generic behavior

VP8 specifically removes:
- repeating middle-card Shop staggering;
- equal-height collection-panel rhythm;
- equal-height workshop-stage rhythm;
- text-before-proof Studio pacing;
- oversized continuation bridges.

No new decorative effect was added.

---

## 12. Exit gate

PASS when:

1. Home has three visibly different pacing states.
2. Shop reaches products sooner.
3. Shop breathing follows real collection boundaries.
4. Collections no longer repeat seven equal panels.
5. Collection detail products scan faster than its hero.
6. Product bridge does not compete with Product Detail.
7. Workshop browse groups by real format.
8. Workshop Detail visibly contracts from process toward commitment.
9. Studio physical proof comes before historical origin.
10. Studio has one visual peak rather than six equal sections.
11. Compact mode does not preserve desktop viewport holds.
12. TypeScript/build/preview are green.

Next:

**VP9 — Compact / Mobile Authorship**
