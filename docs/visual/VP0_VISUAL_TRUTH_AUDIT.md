# VP0 — Visual Truth Audit

**Phase:** Authored Visual Production  
**Status:** CLOSED — source truth established  
**Branch:** `visual/vp0-asset-truth`

VP0 answers one question:

> What real visual material does Fokhara already have, what can carry production weight, and what is still missing before final art direction?

This is deliberately an **asset-truth audit**, not a moodboard and not a web-inspiration pass.

---

## 1. Source hierarchy

### Tier A — live Fokhara operational media

Use as the primary production source.

- current WooCommerce product images
- current Fokhara website editorial/workshop imagery
- owner-supplied original photography when available

These sources describe the real current business and objects.

### Tier B — official/public Fokhara presence

Use as a discovery/source lead, then verify before production use.

- Fokhara social channels
- Dalia Mobasher public professional presence
- current public activity/provider listings

These can reveal useful real moments, but the final project should prefer original/approved source files over screen grabs or third-party CDN copies.

### Tier C — editorial / press material

**Reference-only by default.**

Useful for understanding:
- founder story
- workshop behavior
- historical studio context
- what visual moments exist in reality

Do not silently copy press-owned imagery into the production site.

---

## 2. Current product media truth

The live Fokhara Woo source currently exposes **19 ceramic products** and a primary product image for every one of them.

The P2 live audit also established:

- all 19 are in the current ceramics category;
- current collection identity is not a Woo taxonomy;
- product images are current operational assets;
- the current product-image batch is predominantly served from `/wp-content/uploads/2025/12/`;
- filenames are camera-like production names such as `dscf7409.webp`, not stock-library assets.

A frozen URL snapshot from VP0 is stored in:

`docs/visual/VP0_PRODUCT_MEDIA_SNAPSHOT.json`

### What this gives us

Strong enough now for:
- Shop cards
- collection browse
- product identity during Carry
- initial Product Detail object presence
- cross-system object references

Not yet strong enough by itself for final:
- product macro/detail storytelling
- object-in-use scenes
- process-to-object causality
- collection-specific material storytelling
- final authored Product Detail pacing

A single primary product frame cannot carry the full visual thesis.

---

## 3. Official Fokhara editorial media found

### Strong official workshop/process candidate

Current Fokhara homepage media includes a vertical workshop photograph:

`https://fokharastudioandshop.com/wp-content/uploads/2024/06/GS3A3651-819x1024.jpg`

Observed content:
- three participants working at pottery wheels
- real hands, clay, wheels, aprons and studio context
- warm physical environment
- concentration rather than staged lifestyle posing

**Roles covered:**

- Human
- Process
- Studio
- Workshop atmosphere

**Good candidate for:**
- Workshops entry
- maker-path section on Home
- Studio evidence
- process crop studies

**Limitation:**
It is an ensemble workshop frame, not a dedicated macro of pressure / centering / trace.

### Current homepage ceramic gallery

The live homepage exposes a larger historic/editorial ceramic gallery with at least these visible media names:

- 5 - Copy
- 6
- 00011
- 27
- 64
- 88
- 334
- 345
- 900
- DSC_0111
- DSC_0178
- DSC_0233
- DSC_0295
- DSC_0316
- DSC_0329
- DSC_0353
- DSC_0411
- DSC_0431
- DSC_0496
- DSC_0524
- DSC_0542
- DSC_0544

This proves Fokhara has had a broader image archive than the 19 current Woo product primaries.

The search index does not reliably expose the exact original URLs or image semantics for the whole gallery, so these are **asset leads**, not normalized production assets yet.

### About page

The current About page exposes at least one image plus current studio narrative, but search indexing does not resolve the original media URL cleanly enough for a production manifest.

Treat this as a lead for owner/source-file retrieval.

---

## 4. Founder / historical visual truth

Dalia Mobasher is a central visual/story subject, not just a name in copy.

Current public professional evidence confirms:
- Fokhara Studio & Shop association;
- ceramic artist / designer positioning;
- SaloneSatellite / Salone del Mobile 2024 participation;
- previous public ceramic-collection activity.

Historical editorial coverage contains:
- a Dalia portrait;
- Fokhara studio imagery;
- pottery-making imagery;
- finished ceramic objects.

These editorial assets are valuable for understanding what real founder/studio photography exists, but remain **reference-only unless source rights are cleared**.

### Founder gap

The current redesign does **not** yet have a clearly owner-approved, high-resolution founder portrait or founder-at-work image.

This is a real gap for the Studio route.

---

## 5. Social-source finding

Current Fokhara workshop terms point users to an Instagram handle written as:

`@FokharaStudio`

Older third-party editorial embeds identify:

`@fokhara_studio`

Because those two handles do not match exactly, VP0 does **not** hard-code either one as a production social URL.

Action:
- verify the current official account directly before social-media ingestion;
- prefer original files supplied by the studio instead of scraping social posts.

---

## 6. Internal photography lead

A current LinkedIn profile for a Fokhara team member describes work as:

- products & food photographer
- social media coordinator at Fokhara Studio

This is an important source lead.

It strongly suggests the business may have access to original product/content files beyond what the current website exposes.

Do not assume access or rights from the profile alone.

If Fokhara cooperates with the redesign, the highest-value request is the **original media archive**, not screenshots from Instagram.

---

## 7. Asset-role coverage

| Role | Current coverage | Quality for final authored site | Decision |
|---|---|---:|---|
| Object | Strong | Medium–Strong | 19 live primary product images are immediately usable |
| Material / glaze macro | Weak | Weak | must be sourced/shot |
| Raw clay | Weak | Weak | must be sourced/shot |
| Hand / pressure | Medium | Medium | real workshop material exists, but signature close-ups are missing |
| Wheel / centering | Medium | Medium | workshop evidence exists; dedicated detail shot needed |
| Handbuilding / pinch | Weak | Weak | dedicated close action needed |
| Trimming | Weak | Weak | required for course/process sequence |
| Glazing | Weak–Medium | Weak | current workshop exists, but signature visual not normalized |
| Firing / kiln | Weak | Weak | useful threshold image; not yet secured |
| Studio wide | Weak–Medium | Weak | environment exists, but a deliberate spatial frame is missing |
| Shelves / accumulated work | Unknown–Medium | Weak | likely in archive; needs source file |
| Human / workshop | Strong | Medium | current official workshop frame is useful |
| Instructor + participant | Medium via press | Weak for production | needs owner-approved source |
| Object in use | Weak | Weak | major commerce/storytelling gap |
| Founder | Medium via press | Weak for production | needs approved portrait / founder-at-work |
| Exterior / arrival | Weak | Weak | needed for Visit |
| Collection group still life | Weak | Weak | high-value new production need |

---

## 8. Route-by-route asset sufficiency

### Home

Need:
1. one signature object frame
2. one hand/process frame
3. one human/studio frame
4. optional glaze macro for transition

Current state:
- object: available
- workshop human/process: available
- macro: missing

**Home can begin authored production now, but not finish.**

### Shop

Need:
- consistent product identity
- good object isolation
- reliable product crop

Current state:
- strong enough to proceed using Woo primaries

### Collections

Need:
- product group identity
- collection-to-collection material contrast
- macro/detail surface evidence

Current state:
- current products available
- material macro/group still life missing

**Collections should not become seven differently colored templates.**

### Product Detail

Need:
1. primary object
2. alternate or macro detail
3. object-in-use or scale context
4. optional hand/process relation when verified

Current state:
- primary only

This is the largest object-side image gap.

### Workshops

Need distinct real visuals for:
- handbuilding
- wheelthrowing
- trimming
- glazing
- family/couple/kids where those routes are visually emphasized

Current state:
- real general workshop imagery exists
- method-specific coverage is incomplete

### Studio

Need:
- founder
- founder working
- studio wide
- shelves / accumulated work
- teaching interaction
- material close-up

Current state:
- story truth is strong
- production imagery is incomplete

### Visit

Need:
- exterior/arrival
- entrance or recognizable studio approach
- interior spatial confirmation

Current state:
- practical information exists
- dedicated place photography missing

---

## 9. The minimum missing shoot / source pack

If Fokhara can provide or shoot only a small set, request these **12 priority images**:

1. founder portrait inside the studio
2. founder hands working with clay
3. wheel centering macro — hands + wet clay
4. handbuilding / pinch macro
5. trimming tool close-up
6. glaze application close-up
7. kiln / firing environment
8. clean studio-wide frame
9. shelves / accumulated finished and unfinished work
10. collection group still life with multiple real pieces
11. object being held / used in an everyday context
12. exterior / entrance / arrival frame

### Preferred capture behavior

- original camera files or highest-resolution exports
- no screenshots
- no baked-in text
- no heavy social-media filter
- keep natural surface texture
- both portrait and landscape coverage where possible
- leave negative space around some subjects for typography/crop flexibility
- include multiple distances: macro / object / human / room
- do not clean every trace of clay from process scenes

---

## 10. What we will NOT do

- do not generate fake Fokhara products and present them as real products;
- do not use generic stock pottery as if it were Fokhara;
- do not copy press-owned founder/process photos into production without permission;
- do not build the final site around screenshots from Instagram;
- do not force every route to wait for a perfect photoshoot;
- do not confuse “earthy pottery” with the actual Fokhara collection language.

Generative visuals, if used later, can support **non-factual abstract material fields / transitions**, never replace the identity of a real Fokhara object or person.

---

## 11. Visual implications discovered in VP0

The current asset truth changes the visual-production plan in useful ways.

### A. Product imagery is newer and cleaner than the old editorial archive

The live Woo product batch gives us a coherent current object baseline.

Therefore:
- use current Woo product images for object truth;
- use older archive/editorial media for process/studio texture only where appropriate;
- do not mix historical product imagery into live commerce as if it were current inventory.

### B. The site has real people/process imagery

We do not need to invent a “maker world” from abstract graphics.

The challenge is to crop and sequence real process imagery so it expresses:
- pressure
- centering
- trace
- accumulation
- transformation

### C. The biggest visual weakness is not product quantity

It is **missing image scales**.

We have object-level images.

We need more:
- macro
- hand/action
- human-use
- space

That is exactly compatible with the earlier thesis:

`material → partial form → whole object → object in use`

### D. Final originality should come from choreography, not exotic assets

Even with ordinary real workshop photographs, originality can come from:
- crop behavior
- scale transfer
- route carry
- material-state inheritance
- pressure/release pacing
- sequence

We do not need a giant CGI production to make Fokhara authored.

---

## 12. VP0 exit decision

**PASS.**

We know enough real asset truth to stop broad searching and enter photography direction.

### Ready for VP1

**VP1 — Photography & Image Direction**

VP1 will now do targeted research outside web-design galleries around:
- ceramic object photography
- craft documentary photography
- hands/material macro
- museum/object isolation
- still life
- workshop/process sequencing

Then we will write the exact Fokhara image grammar:

`light → distance → crop → negative space → surface → human presence → sequence → motion role`

The web remains the execution medium, not the source of the visual idea.
