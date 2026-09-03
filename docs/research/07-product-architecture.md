# Step 07 — Product Architecture

**Status:** Closed for first implementation pass  
**Purpose:** Define the real route, content, commerce, workshop, booking, and support structure that can carry the Fokhara thesis without turning the site into a portfolio experiment.

---

# 0. Architecture Principle

Fokhara contains two real product systems:

1. **OBJECT SYSTEM**
   - browse
   - evaluate
   - buy
   - own
   - use

2. **PARTICIPATION SYSTEM**
   - discover
   - choose a process
   - understand commitment
   - book
   - make
   - learn
   - collect / continue

The website must make both systems first-class.

The architectural goal is not to create many pages.

It is to create a small number of clear states with strong continuity between them.

---

# 1. Current Business Truth — Verified Before Architecture

The current Fokhara site visibly supports:

- ceramics products,
- workshops,
- courses,
- a small Tools & Materials category,
- product/cart commerce,
- workshop selection through product-style variants,
- contact-based date confirmation rather than a verified live booking calendar,
- studio/contact information,
- terms and policies attached to workshops.

The current catalog structure includes:

- **19 Ceramics by Fokhara Shop products**
- **14 Workshops and Courses**
  - Single Day Workshops
  - 2 Days Packages
  - Courses
- **1 Tools & Materials product**

The current workshop examples include:

- Handbuilding,
- Wheelthrowing,
- Colour-a-Pot,
- Glaze-a-Pot,
- Couples variants,
- Family Time,
- Kids workshops,
- Make & Paint package,
- 1-Month and 3-Month courses.

Important architecture constraint:

> Do not imply real-time seat/date availability unless a real availability source exists.

The current live experience tells users to contact Fokhara to choose a date according to availability; otherwise the booking applies to the next available date.

Therefore the redesign must preserve this truth until a real scheduling backend is introduced.

---

# 2. Primary Navigation

Keep the primary navigation short and literal.

## Proposed Primary Nav

- **Shop**
- **Workshops**
- **Studio**
- **Visit**
- **Cart**

Optional utility:
- Search, if catalog growth justifies it later.

Do not put conceptual labels such as:
- Matter
- Form
- Become
- Clay
- Journey

in place of obvious product navigation.

The thesis should live in behavior, not obscure labels.

---

# 3. Canonical Route Map

## Core

- `/` — Home
- `/shop` — Ceramics listing
- `/shop/collections/[slug]` — Collection view
- `/shop/[product-slug]` — Product Detail
- `/workshops` — Workshops & Courses discovery
- `/workshops/[workshop-slug]` — Workshop / Course Detail
- `/book/[workshop-slug]` — Booking commitment surface
- `/studio` — Maker / Studio / Process
- `/visit` — Location / Hours / Contact / Practical access
- `/cart` — Cart
- `/checkout` — Checkout

## Support

- `/policies/workshops`
- `/policies/shipping-returns`
- `/policies/privacy`
- `/policies/terms`
- `/contact` — optional if Visit does not fully cover contact needs
- `/404`

## Optional / Deferred

- `/journal`
- `/process/[slug]`
- `/account`
- `/wishlist`

Do not create these until real content or product need exists.

---

# 4. Home — Role

Home is a **dual-entry orchestrator**.

It must answer quickly:

1. What is Fokhara?
2. Can I buy ceramics?
3. Can I make ceramics?
4. Where is the studio?
5. Why is this studio different?

Home should not attempt to contain the entire catalog or every policy.

---

# 5. Home — Architecture

## State A — Brand / Material Entry

Purpose:
- establish identity,
- introduce one real object or process,
- reveal the thesis without explanation.

Primary actions:
- Shop Ceramics
- Explore Workshops

---

## State B — Object Path

Purpose:
- make the Shop system visible early.

Content:
- selected ceramics,
- collection entry,
- price / availability,
- product carry entry.

Primary action:
- Shop Ceramics

---

## State C — Maker Path

Purpose:
- introduce participation as equal to buying.

Content:
- one strong workshop/process,
- what the participant physically does,
- beginner / level cue,
- duration cue.

Primary action:
- Find a Workshop

---

## State D — Two Systems Meet

Purpose:
connect:

**object ↔ process**

Examples:
- product made with a technique → related workshop
- workshop technique → examples of finished ceramic forms

This is a structural expression of the thesis.

---

## State E — Studio / Human Proof

Purpose:
- Dalia / team,
- real studio,
- making environment,
- teaching / craft evidence.

Primary action:
- Meet the Studio

---

## State F — Practical Access

Purpose:
- location,
- working times,
- contact,
- visit CTA.

No theatrical ending.

The site resolves into something usable.

---

# 6. Shop — Role

Shop is the **object system**.

Its primary job is fast discovery and evaluation.

It must not inherit the homepage's full cinematic behavior.

---

# 7. Shop Listing Architecture

## Required

- page title
- count
- category / collection filtering
- availability filter if useful
- sort only if catalog size justifies it
- clear product grid
- price
- stock state
- product name
- collection / material label where available

## Potential Filters

Use only data Fokhara can maintain reliably.

Good candidates:

- Collection
- Form / Type
  - Cup
  - Mug
  - Bowl
  - Vessel
  - etc.
- Availability
- Price

Deferred unless real data exists:

- Technique
- Clay body
- Glaze chemistry
- Firing type

Do not create sophisticated filters around inconsistent metadata.

---

# 8. Collection Architecture

Collections should be meaningful grouping states, not SEO archive pages.

Route:

`/shop/collections/[slug]`

Each collection may contain:

- collection name,
- one short concrete premise,
- collection-derived material/accent state,
- products,
- one process or material evidence block if known.

Examples from current catalog naming include:
- Nebula
- Midnight
- Ocean

The collection page can preserve the selected collection state into product detail.

---

# 9. Product Card Contract

Every product card should contain, at minimum:

- image,
- product name,
- price,
- availability.

Optional:
- collection,
- material / dimensions if reliably available.

The card must support the signature system:

## Focus
The selected product gains compositional weight.

## Carry
The selected product image/state becomes the source for Product Detail.

## Trace
Returning to Shop restores:
- scroll location,
- focused item,
- and optionally a subtle material/accent trace.

This is functional continuity, not decoration.

---

# 10. Product Detail Architecture

Route:

`/shop/[product-slug]`

## Above the Fold

Must contain immediately:

- product image / object
- name
- price
- stock state
- variant if applicable
- quantity
- Add to Cart

No story gate.

---

## Layer 2 — Physical Truth

- dimensions
- material
- finish / glaze
- care
- use
- variation note if relevant

---

## Layer 3 — Trace of Making

Only where real information exists:

- process image,
- surface close-up,
- making note,
- maker context,
- collection context.

Do not fabricate production details.

---

## Layer 4 — Life

- object in use,
- scale in hand,
- table / studio context.

---

## Layer 5 — Continuation

- related forms
- same collection
- relevant workshop if there is a real process relationship

Example:

A wheel-thrown piece may point to Wheelthrowing Workshop if this is actually truthful.

---

# 11. Workshops — Role

Workshops are not a store category hidden inside Shop.

They are the **participation system**.

The user should enter Workshops with a different question:

> What do I want to do, learn, or make?

not:

> Which SKU do I want?

---

# 12. Workshops Listing Architecture

Route:

`/workshops`

## First-Level Groups

Use the real business structure, but phrase it for humans.

### Single Sessions
Examples:
- Handbuilding
- Wheelthrowing
- Colour-a-Pot
- Glaze-a-Pot
- Couples
- Family
- Kids

### Multi-Session / Packages
Example:
- Make & Paint

### Courses
Examples:
- 1-Month Course
- 3-Month Course

---

# 13. Workshop Discovery Filters

Potentially useful:

- **Process**
  - Handbuild
  - Wheelthrow
  - Glaze
  - Paint

- **Format**
  - Single Session
  - Package
  - Course

- **For**
  - Adults
  - Youth / Kids
  - Couples
  - Family

- **Duration**

- **Experience Level**

Avoid showing “available today” or live date filters unless real availability is connected.

---

# 14. Workshop Card Contract

Each card must answer faster than the current generic product model:

- what will I do?
- who is it for?
- how long?
- what does it cost?
- how many sessions?
- what do I leave with / learn?

Required fields:

- workshop name
- process
- duration
- audience / age
- price
- format
- booking CTA

Optional:
- outcome / object
- skill level

---

# 15. Workshop Detail Architecture

Route:

`/workshops/[workshop-slug]`

This is the strongest **Become the Maker** surface.

## Layer 1 — Experience

Immediately answer:

- What is it?
- What will I physically do?
- Price
- Duration
- Audience / age
- Number of sessions
- Book CTA

---

## Layer 2 — Process

Show the activity as verbs:

For wheelthrowing:
- center
- pull
- shape

For a course:
- handbuild
- throw
- trim
- glaze

This content should be real, not a decorative process diagram.

---

## Layer 3 — Outcome

Explain what the participant may:

- make,
- learn,
- finish,
- collect later,
- or continue into next.

---

## Layer 4 — Commitment Truth

Before booking, make policies explicit:

- date selection / confirmation behavior,
- cancellation rules,
- age requirements,
- included materials,
- firing / collection terms,
- group minimum where applicable.

Do not bury these behind checkout.

---

## Layer 5 — Continuation

Possible:
- related workshop
- next-level course
- related ceramic objects
- studio information

---

# 16. Booking Architecture

Route:

`/book/[workshop-slug]`

This is where **Settle With Intent** becomes strongest.

The design becomes more exact and less expressive.

## Current-Truth Booking Mode

Until live scheduling exists:

### Step 1 — Confirm Offering
- workshop/course
- participant count
- variant / audience if relevant

### Step 2 — Preferred Schedule
Use known recurring day/time options only if they are real.

Language must make clear:

> Preferred schedule / subject to studio availability

not:

> Available slot

unless the backend verifies it.

### Step 3 — Contact / Participant Details
- name
- phone
- email
- participant details where needed

### Step 4 — Policy Confirmation
- refund/cancellation
- firing / collection
- arrival rules
- age
- group conditions

### Step 5 — Payment / Commitment
Use the actual current payment mechanism.

### Step 6 — Confirmation State
Explain:
- what was paid,
- what was requested,
- whether date is confirmed or pending studio confirmation,
- what happens next.

---

# 17. Future Booking Mode

If Fokhara later adds a true scheduling backend:

The same route can upgrade to:

- real capacity,
- live slots,
- session dates,
- remaining seats,
- booking confirmation.

The architecture should not need redesign.

Only the availability source changes.

---

# 18. Studio Architecture

Route:

`/studio`

Role:

**human authorship + material evidence + learning environment**

Sections:

- Dalia / maker introduction
- Fokhara story
- studio in use
- material/process evidence
- teaching / learning
- selected milestones
- link to Workshops
- link to Shop

Avoid:
- corporate timeline for its own sake
- long generic manifesto
- repeated homepage copy

---

# 19. Visit Architecture

Route:

`/visit`

This is a practical surface.

Required:

- address
- map / directions
- current business hours
- phone
- email
- visit/contact guidance
- workshop arrival guidance if relevant

Current live site lists the studio at:
Villa 313, Yasmin 1, 1st Settlement, New Cairo.

Current listed operating windows:
- Saturday evening
- Tuesday evening
- Wednesday evening
- Thursday late morning / early afternoon

These values must be sourced dynamically or reverified before production launch.

Do not hardcode research-time hours without an update mechanism.

---

# 20. Cart Architecture

Route:

`/cart`

Cart may contain:

- physical products,
- workshop bookings,
- or both.

The cart must clearly distinguish them.

## Physical Product Line Item
- image
- name
- variant
- quantity
- price
- stock

## Workshop Line Item
- workshop
- participant count
- preferred schedule / status
- price
- confirmation status language

If mixed carts are technically unsupported by the chosen commerce platform, separate checkout flows rather than faking support.

---

# 21. Checkout Architecture

Route:

`/checkout`

The most restrained surface.

Required:

- contact details
- delivery / collection choices for products
- workshop participant/contact info where relevant
- payment
- order summary
- policy agreement
- clear final state

The thesis appears here through:
- continuity,
- exactness,
- retained item identity,
- not visual effects.

---

# 22. Search Architecture

Not required in v1 if the catalog remains small.

Current catalog size is small enough that:

- category,
- collection,
- workshop filters

may outperform full-site search.

Add search only if:

- catalog grows,
- workshops expand,
- editorial content appears.

Do not add features because award sites have them.

---

# 23. Cross-System Bridges

These are structurally important.

## Object → Workshop

A product can link to a workshop when there is a truthful relationship.

Examples:
- wheel-thrown form → wheelthrowing
- handbuilt object → handbuilding
- glaze-specific story → glaze workshop

Do not infer technique unless known.

---

## Workshop → Object

After seeing a technique, the user may see examples of finished Fokhara objects related to that process.

This turns “Become the Maker” into a bridge, not an isolated branch.

---

## Home → Object / Maker

Home must give equal legitimacy to:

- own
- make

Do not hide workshops below products.

---

# 24. State Memory Contract

Retained Trace becomes a product requirement.

## Shop Memory
On returning from Product Detail:
- restore prior scroll
- restore filter state
- restore focused item

## Workshop Memory
On returning from Workshop Detail:
- restore selected filters / category
- optionally preserve chosen process context

## Cross-System Memory
Where relevant:
- carry material/process context between object and workshop surfaces.

Do not persist sensitive or unnecessary history.

Session-level continuity is enough for v1.

---

# 25. Carry + Recompose Contract

The route transition must be architected before implementation.

## Shop → Product

Source state stores:
- source image ID
- crop
- source bounds
- product identity
- collection/material accent if used

Destination uses that state to:
- place the same object,
- establish first composition,
- then resolve product information.

## Workshop → Detail

Possible source carry:
- process image
- hand/tool action
- outcome object

The destination composition should be determined by the selected workshop content.

Shared-element animation alone is not enough.

The carried content must influence layout.

---

# 26. Intent Settling Contract

Every route receives an **intent level**.

## Level 0 — Discovery
Home

Most expressive.

## Level 1 — Browse
Shop / Workshops

Structured but exploratory.

## Level 2 — Evaluate
Product Detail / Workshop Detail

Balanced context + action.

## Level 3 — Commit
Booking / Cart

Tighter, more exact.

## Level 4 — Transaction
Checkout

Minimal expression, maximum clarity.

This level can later become a design token / layout mode.

---

# 27. Content Model — Product

Minimum product schema:

- id
- slug
- name
- price
- sale price
- stock state
- images
- collection
- type
- description
- dimensions
- material
- finish / glaze
- care
- variants
- related products
- optional process relation
- optional workshop relation

Do not create fields that Fokhara cannot populate.

---

# 28. Content Model — Workshop

Minimum workshop schema:

- id
- slug
- name
- type
- process
- audience
- age requirement
- experience level
- number of sessions
- duration per session
- price
- sale price
- participant options
- recurring schedule options
- availability mode
- included materials
- what participant does
- what participant learns
- expected outcome
- cancellation policy reference
- firing/collection policy reference
- related workshops
- optional related products

---

# 29. Availability Model

Use explicit modes.

## `live`
Backend verifies real slots/capacity.

## `request`
User submits preferred date/time; studio confirms.

## `next_available`
Purchase applies to next available session.

## `contact`
User must contact studio before final scheduling.

Current implementation should use whichever of these reflects Fokhara's actual live process.

Never visually style a request mode as live availability.

---

# 30. Stock / Availability Language

## Products

Use:
- In stock
- Low stock only if real data exists
- Out of stock

## Workshops

Use language based on availability mode:
- Choose preferred schedule
- Date confirmed by studio
- Next available session
- Contact to schedule

Avoid:
- “2 seats left”
- “Available Saturday”
- “Instant confirmation”

unless actually backed by live data.

---

# 31. Footer Architecture

Footer is practical, not a second homepage.

Include:

- Shop
- Workshops
- Studio
- Visit
- Contact
- Policies
- Instagram / social if active
- copyright

Potential:
- email signup only if Fokhara actually intends to use it.

No generic newsletter box by default.

---

# 32. Mobile Architecture

The route system remains the same.

Mobile changes composition, not information priority.

## Mobile Priorities

### Product
- object
- price
- stock
- Add to Cart
- then material/story

### Workshop
- activity
- price
- duration
- audience
- booking
- then process/story

### Visit
- map/directions
- hours
- contact

No desktop-only concept may hide essential actions.

---

# 33. Accessibility / Reduced Motion Architecture

All core routes work without transition state.

If carry data is unavailable:
- route loads normally,
- no functionality breaks.

With `prefers-reduced-motion`:
- use direct state continuity,
- simple fades / cuts,
- preserve scroll/filter state,
- preserve semantic trace without animation.

The thesis is not dependent on motion.

---

# 34. SEO / Crawlable Structure

Experimental composition cannot damage product discovery.

Each major route needs:

- real URL
- server-renderable / crawlable content where stack permits
- semantic title
- description
- product/workshop structured data where appropriate
- canonical URLs
- indexable product/workshop detail

Do not hide essential content inside canvas-only/WebGL experiences.

---

# 35. Analytics Events — Minimal Useful Set

Do not over-instrument v1.

Track:

## Discovery
- home_shop_enter
- home_workshops_enter

## Shop
- product_focus
- product_open
- add_to_cart

## Workshops
- workshop_open
- booking_start
- preferred_schedule_selected
- booking_commit

## Cross-System
- product_to_workshop
- workshop_to_product

## Transaction
- checkout_start
- purchase_complete

This lets us test whether the dual-system architecture actually works.

---

# 36. Architecture Rules That Protect the Thesis

## Rule 1
Shop and Workshops are peers.

## Rule 2
A selected object/process may persist across routes.

## Rule 3
Interaction memory is session-level and causal.

## Rule 4
Transactional surfaces become progressively quieter.

## Rule 5
Current business limitations are stated honestly.

## Rule 6
The site does not invent live availability.

## Rule 7
Art direction never hides price, duration, age, stock, location, or booking requirements.

## Rule 8
Cross-links between object and workshop require truthful process relationships.

---

# 37. First Build Slice

Do not build all routes at once.

The first implementation slice should be:

1. **Home object entry**
2. **Shop listing**
3. **Product Detail**
4. **Carry + Recompose**
5. **Back-state restoration**
6. **Mobile equivalent**
7. **Reduced-motion equivalent**

This proves:

- Becoming
- Trace
- Centered Tension
- the first signature interaction
- real commerce clarity

Then build the participation slice:

8. **Workshops listing**
9. **Workshop Detail**
10. **Booking request/commit flow**

This proves:

- Become the Maker
- Intent Settling
- current availability truth

---

# 38. Architecture Verdict

The site is not:

> Home + Shop + About + Contact with effects.

It is a two-system product:

## OWN
**discover → evaluate → buy → use**

## MAKE
**discover → choose → commit → participate → learn**

The authored thesis lives in how these systems preserve state and transform around real objects/actions.

The final route architecture remains conventional enough to be usable.

The originality is in **continuity, causality, and behavior between routes**, not unusual route names.

---

# Step 07 Exit Condition

Product Architecture is closed when:

- both product systems have clear routes,
- booking does not overclaim availability,
- commerce is explicit,
- workshop UX is no longer modeled as generic product cards,
- the four signatures have structural homes,
- mobile and reduced-motion remain viable,
- and the first implementation slice is clearly defined.

The next stage is **Original Synthesis / Implementation Blueprint**:

combine the authored thesis, Web Reality Check, and Product Architecture into a concrete build system:

- stack,
- components,
- route shells,
- state model,
- transition architecture,
- content contracts,
- responsive modes,
- motion tiers,
- and first prototype acceptance gates.
