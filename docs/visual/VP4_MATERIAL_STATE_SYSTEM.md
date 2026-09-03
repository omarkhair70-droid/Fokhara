# VP4 — Material State System

**Status:** PASS candidate  
**Branch:** `visual/vp4-material-state`

VP4 converts the earlier principle **colour is a material event** into a working interface system.

The rule is strict:

> The photograph remains object truth. The interface may inherit a restrained trace of the material, but it must never recolour the object.

---

## 1. Why the old model was insufficient

Before VP4, the live Woo adapter only had intentional accents for:

- Nebula
- Midnight
- Ocean

Foggy, Lazuli, Seaweed and Latte Foam all fell back to the same neutral grey.

That made collection identity technically visible in names but materially invisible in the interface.

VP4 removes that fallback collapse.

---

## 2. Material state contract

Each collection now has a small authored state:

- **field** — low-energy surrounding tone
- **accent** — primary interface accent
- **glaze** — surface event colour
- **clay** — retained fired/raw earth counterpoint
- **depth** — dark structural counterweight
- **ink** — readable dark text state
- **reflectivity** — matte / satin / gloss / mixed
- **pressure** — how much colour is permitted to enter the field
- **sheen** — how much edge energy the material may carry

This is implemented in:

`lib/visual/material-state.ts`

---

## 3. Visual reading

The current live images prove that collection names cannot be reduced to flat brand colours.

### Nebula

Observed primary image:
- blue-violet / indigo glaze
- oxide / rust variation
- visible clay base
- mixed reflective and granular surface

Therefore Nebula is not a purple theme.

### Midnight

Observed primary image:
- near-black glossy body
- turquoise / sea-green eruption
- exposed terracotta foot

Therefore Midnight is not a black theme.

### Ocean

Observed primary image:
- smoky blue
- brown / iron variation
- exposed fired clay

Therefore Ocean is not a clean blue theme.

### Remaining current collections

Foggy, Lazuli, Seaweed and Latte Foam receive restrained authored starting states instead of the previous identical grey fallback.

These values are **interface colours informed by current collection identity**, not claims of laboratory colour extraction.

They must be tuned again during final image/crop visual review if the current source photography reveals a stronger surface relationship.

---

## 4. Current authored states

| Collection | Field | Accent | Glaze event | Clay counterpoint | Depth |
|---|---|---|---|---|---|
| Nebula | warm mineral | indigo slate | blue-violet | oxide terracotta | blue-black |
| Midnight | pale stone | near-black | turquoise eruption | terracotta | carbon |
| Ocean | cool mineral | smoky blue | blue-grey | iron clay | blue charcoal |
| Foggy | pale fog stone | warm grey | mineral grey | warm clay | charcoal grey |
| Lazuli | cool pale stone | lapis blue | cobalt-blue | warm clay | deep blue |
| Seaweed | muted mineral | moss | green mineral | warm clay | dark moss |
| Latte Foam | warm pale mineral | café taupe | cream/caramel | warm clay | brown charcoal |

---

## 5. Where material state is allowed

### Home

The selected object can leave:
- a narrow glaze/clay/depth edge
- a restrained caption field

The product photograph itself stays untouched.

### Shop

When filtering by a collection:
- the surrounding field receives a low-energy material trace;
- the selected filter inherits depth/accent;
- each product card carries its own thin material edge.

“All” returns to neutral.

### Collection index

Each collection receives:
- a subtle field
- a three-state vertical trace
- a small material line in copy

The page does **not** become seven themed microsites.

### Collection detail

The route inherits:
- field
- glaze
- clay
- depth

The lead image remains source-true.

### Product detail

Evaluate intent receives the strongest legitimate inheritance:
- surrounding field
- media-column field
- glaze/clay/depth edge

The actual Woo photograph is not filtered or tinted.

### Carry

Carry already uses `ProductVisual`.

Because `ProductVisual` now owns material variables, object identity and material identity travel together without inventing a new transition texture.

### Cart / transaction

Material pressure collapses.

Commit and transaction surfaces remain structurally neutral and precise.

---

## 6. What VP4 explicitly rejects

- collection = full-page background colour
- Ocean = blue website
- Midnight = black website
- fake grain overlays
- glaze gradients painted on top of product photos
- global colour grading of Woo images
- reactive colour animation with no product cause
- turning every product into a different UI theme

---

## 7. Technical implementation

### New

`lib/visual/material-state.ts`

Exports:
- `materialStateForCollection()`
- `materialStateCssVars()`
- typed reflectivity/material state contract

### Woo

The Woo normalizer now derives its legacy `accent / accentInk` compatibility values from the same material-state source.

This removes two competing colour systems.

### ProductVisual

Carries:
- material ID
- reflectivity
- material CSS variables

Real image remains visually neutral.

### Shop / Collections / Product Detail / Home object

Consume the same state source.

No route hard-codes a separate version of the collection palette.

---

## 8. VP4 exit gate

PASS when:

1. all seven current collections resolve to distinct material states;
2. current Woo product photography is never tinted;
3. Shop “All” remains neutral;
4. filter selection causes a restrained, causal field change;
5. Collection and Product Detail inherit the same state source;
6. Carry preserves material identity without added fake texture;
7. Cart/commit remains substantially more neutral;
8. TypeScript and production build stay green.

Next:

**VP5 — Image Choreography & Crop Authorship**
