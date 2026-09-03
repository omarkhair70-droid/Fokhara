# VP9 — Compact / Mobile Authorship

**Status:** PASS candidate  
**Branch:** `visual/vp9-compact-mobile-authorship`

VP9 treats Compact as its own authored composition mode.

The governing rule:

> **One dominant thing at a time. Practical action arrives earlier. Desktop
> pressure is translated, not shrunk.**

---

## 1. Header truth

The previous compact CSS declared:

`--header-height: 68px`

while the actual header had two rows:

1. brand + cart
2. primary navigation

That value could make sticky elements such as the Maker Rail sit underneath the
real header.

VP9 sets an explicit two-row compact header and a matching 116px semantic
height.

Navigation becomes:
- horizontal;
- touch-sized;
- non-wrapping;
- scrollable when necessary.

---

## 2. Touch choice bars

Collection filters and workshop-format filters no longer wrap into multiple
compact rows.

They become horizontally scannable choice strips with 44px minimum targets.

This reduces vertical UI chrome before real content.

---

## 3. Home

Compact Home now:
- keeps copy first;
- reduces oversized display pressure;
- keeps object media at a useful 56svh rather than 64svh+;
- uses a two-action row where space allows;
- stacks actions under 420px.

The maker image also contracts.

---

## 4. Shop density

Before:
each Product Card had a 72svh minimum height on compact.

With a 19-product catalog, that created a long browsing marathon.

After:
- cards use a 50svh / 25rem media frame;
- factual copy follows naturally;
- group-start breathing remains but is shorter than desktop.

Collection identity still controls rhythm; mobile simply scans faster.

---

## 5. Collection specificity bug

VP8 introduced more-specific selectors such as:

`.collectionIndex__item[data-rhythm="anchor"]`

Those desktop selectors could override the older compact two-column rule because
of CSS specificity.

VP9 explicitly authors all rhythm states for Compact:

`number rail + one content column`

This is a correctness fix, not merely polish.

---

## 6. Product Detail

The purchase block now appears before long description text in the actual DOM.

Sequence:

`identity → price/stock → action → description → facts`

This improves both:
- compact reachability;
- semantic/keyboard order.

Compact media contracts to roughly half a viewport and the information region no
longer reserves another 62svh.

The Add to Cart action becomes full width.

---

## 7. Workshop browse

Before:
a compact Workshop Card could contain:
- a large visual;
- plus a 55svh information column.

One offering could therefore consume well over a viewport.

After:
- visual ≈ 48svh;
- copy uses natural height;
- facts follow after the title/action description;
- format boundaries remain visible without giant dead space.

---

## 8. Maker Rail

The 5-column compact Maker Rail is replaced with a horizontal sticky state strip.

Why:
- stage labels need readable touch/scan space;
- a narrow 5-column grid compresses language rather than hierarchy;
- the rail is state feedback, not a dashboard.

It now sits below the real two-row header.

---

## 9. Workshop Detail

Compact order stays:
- image;
- workshop identity;
- immediate facts;
- booking CTA.

The hero copy no longer reserves 64svh.

Process verbs are resized and the fact grid can collapse to one column below
420px.

The conceptual sequence remains intact without forcing desktop-sized stages.

---

## 10. Booking

Compact Booking becomes touch-first:

- 52px controls;
- native 16px input text to avoid mobile browser zoom;
- shorter back-link gap;
- smaller display heading;
- sticky commit bar respects the device bottom safe area;
- form reserves enough bottom space not to be obscured by the sticky bar.

At very narrow widths the commit bar stacks.

The review scroll also respects `prefers-reduced-motion`.

---

## 11. Cart

Compact Cart:
- shortens the intro;
- puts quantity / total / remove into a dense mobile row;
- makes summary full width;
- collapses the checkout-gate explanation to one column.

No commerce fact is hidden.

---

## 12. Studio / Visit / Policies

These routes stop inheriting desktop-size reading cards.

### Studio
- real evidence remains dominant;
- headings are capped for compact;
- process rail remains two columns.

### Visit
- practical sections use natural height;
- directions become full width;
- phone/email scale is capped and wrap-safe.

### Policies
- becomes a continuous reading surface;
- desktop card borders are reduced;
- large heading pressure is lowered.

---

## 13. Safe areas

Compact header and sticky booking controls account for:
- left/right safe-area insets;
- bottom safe-area inset.

This keeps critical controls clear on edge-to-edge devices.

---

## 14. What VP9 does not do

- hide purchase facts;
- collapse workshop truth;
- replace navigation with a hamburger purely for fashion;
- make images tiny;
- remove Carry;
- add mobile-only animation;
- duplicate desktop sections in accordions.

---

## 15. Exit gate

PASS when:

1. mobile semantic header height matches the two-row layout;
2. nav/filter strips remain usable without wrapping;
3. Shop cards no longer force 72svh each;
4. collection rhythm is truly one-column on Compact;
5. Product action appears before long description in DOM order;
6. Workshop cards fit one coherent scan unit;
7. Maker Rail cannot sit under the site header;
8. Booking controls are touch-sized and safe-area aware;
9. Cart remains usable without horizontal overflow;
10. Visit contact text remains readable/wrap-safe;
11. Policies read as a document, not stacked desktop cards;
12. <=420px has explicit fallback rules;
13. reduced motion remains respected;
14. TypeScript/build/preview are green.

Next:

**VP10 — Full Visual Review**
