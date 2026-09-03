# VP3 — Typography Lab

**Status:** PASS candidate  
**Branch:** `visual/vp3-typography-lab`

VP3 starts only after VP2 placed real Fokhara product and workshop imagery into the interface.

The goal is not to pick a fashionable font.

The goal is to make typography participate in:

- Centered Tension
- Pressure / Release
- Settle with Intent
- commerce clarity

---

## Candidates

### A — Instrument Sans variable — SELECTED

Why it survived:

- variable width axis gives real typographic compression instead of CSS transform;
- weight range is sufficient for display and interface work;
- neo-grotesque precision avoids immediately coding the site as “rustic craft”;
- subtle character remains without becoming decorative;
- one family can move from expressive to exact without switching visual identity.

Operational use:

`discovery 78 → browse 84 → evaluate 88 → commit 93 → transaction 98`

Width values are semantic targets, not fixed brand commandments.

Mobile opens the narrowest settings slightly to preserve legibility.

License:
SIL Open Font License 1.1.

Delivery:
`next/font/google`, self-hosted in the Next build.

### B — Instrument Serif + Instrument Sans — REJECTED AS BASELINE

Strength:
- expressive large-size display face;
- contemporary old-style character;
- useful for editorial contrast.

Reason not selected:
- introduces a familiar ceramics / art-magazine / boutique-luxury code too early;
- creates dual-family drama that is not derived from Fokhara’s process;
- display identity would compete with real object surfaces.

Possible future role:
none by default. Re-open only if later visual review proves a specific content need.

### C — Newsreader + neutral sans — REJECTED AS BASELINE

Strength:
- excellent reading face;
- variable and screen-oriented;
- sophisticated long-form editorial quality.

Reason not selected:
- Fokhara is not primarily a publication;
- pushes Studio/history pages toward magazine language;
- weakens the idea that pressure/release is one coherent material system.

### D — IBM Plex Sans / IBM Plex Sans Arabic — ARABIC COMPANION CANDIDATE

Strength:
- mature open-source family;
- explicit Arabic support;
- strong UI behavior.

Reason not selected for current Latin identity:
- more rational/industrial than the current Fokhara object world needs.

Future role:
- first Arabic companion candidate when Arabic route/content is actually authored;
- Arabic typography must be reviewed as its own composition, not treated as glyph substitution.

---

## Selected system

### Family

**Instrument Sans**

### Display behavior

No separate display typeface.

Display mass comes from:
- width axis
- size
- line break
- tracking
- placement
- surrounding negative space

### Intent widths

| Intent | Width target | Meaning |
|---|---:|---|
| Discovery | 78 | highest pressure / authored mass |
| Browse | 84 | controlled exploration |
| Evaluate | 88 | object context opens |
| Commit | 93 | utility begins to dominate |
| Transaction | 98 | near-natural clarity |

These values are implemented through the font's `wdth` variable axis.

### Utility

Navigation / eyebrow / technical labels:
- width ~94
- stronger weight
- restrained uppercase tracking

### Text

Body:
- width 98–100
- regular weight
- no faux condensed text paragraphs

---

## Why this belongs to the thesis

Earlier research gave us:

`CENTERED TENSION = energy × restraint`

The typography now behaves the same way.

At discovery:
- letters are under controlled horizontal pressure.

As intent increases:
- pressure releases.

At transaction:
- type nearly returns to its natural width.

So typography participates in the journey:

`expression → evaluation → commitment → precision`

instead of remaining a static brand costume.

---

## Guardrails

- do not use width axis to make body copy “stylish”;
- do not compress utility labels below comfortable reading;
- do not use scaleX transforms;
- do not introduce a serif only because pottery is “artisanal”;
- do not force Arabic into Latin metrics later;
- do not let ultra-tight display settings create broken mobile words;
- transactional surfaces win on legibility.

---

## Implementation

Root layout:
- loads Instrument Sans through `next/font/google`;
- includes the `wdth` axis;
- exposes `--font-instrument-sans`.

CSS:
- defines semantic width tokens;
- changes display width by `data-intent`;
- opens display settings on compact layouts;
- keeps body copy close to natural width.

No font binary is committed to the repository.

---

## VP3 exit gate

PASS when:

1. TypeScript/build green.
2. no font loader error.
3. Home shows clear display mass without faux scaling.
4. Shop/product copy stays legible.
5. Booking/cart are visibly calmer than discovery.
6. compact layout does not over-compress headings.
7. no serif dependency is needed to make the site feel authored.

Next:
**VP4 — Material State System**
