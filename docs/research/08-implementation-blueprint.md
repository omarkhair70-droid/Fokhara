# Step 08 — Original Synthesis / Implementation Blueprint

**Status:** Closed for prototype start  
**Purpose:** Convert the authored thesis, Web Reality Check, and Product Architecture into a concrete production-capable build system.

---

# 0. Implementation Thesis

The implementation must prove this behavior:

> **A real object or making action can become the cause of the next digital state. The system remembers enough context to preserve continuity, then progressively settles into exact product and booking behavior as user intent becomes concrete.**

The build is not judged by how many effects it contains.

It is judged by whether these four signatures survive real routes, mobile, reduced motion, real product data, and commerce constraints:

1. **CARRY + RECOMPOSE**
2. **TRACE**
3. **BECOME THE MAKER**
4. **SETTLE WITH INTENT**

---

# 1. Technical Baseline

## Application

- **Next.js 16.3.3 Active LTS**
- **App Router**
- **TypeScript**
- React Server Components by default
- Client Components only where interaction/state requires them

Why:

- real route architecture,
- server-rendered/indexable product and workshop content,
- shared layouts,
- streaming/prefetching,
- image optimization,
- clean separation between static/product content and interactive islands.

Do not build Fokhara as a client-only SPA.

---

# 2. Motion Baseline

## Primary animation layer

- **Motion for React 13.x**

Use it for:

- finite compositional state changes,
- spring/weighted settling,
- layout interpolation,
- focus/hover state,
- carry overlay geometry,
- reduced-motion aware behavior.

## Native View Transition API

Use only as **progressive enhancement** where it improves browser-native route continuity.

Do not make the thesis depend on it.

Reason:

- modern browser support is now strong,
- but the signature must remain controllable across App Router rendering, older devices, reduced motion, and transition failure.

## GSAP

Not part of the baseline.

Introduce only if a specific sequence cannot be expressed cleanly with Motion/CSS.

No library is allowed to become the creative direction.

---

# 3. Styling System

Use:

- CSS Modules for component-level authored styling
- global CSS custom properties for tokens
- modern CSS layout primitives
- container queries where useful
- logical properties
- fluid type/spacing through clamp()
- native color functions only where browser support meets production target

Avoid making a utility framework the visual architecture.

A small utility layer is acceptable, but the design system should remain legible as authored CSS.

---

# 4. Data / Commerce Strategy

Fokhara currently exposes WordPress/WooCommerce infrastructure, including the public WooCommerce Store API.

Therefore production should **preserve WooCommerce as the source of truth initially**, rather than rebuilding commerce from scratch.

## Production data source

### WooCommerce Store API

Use for customer-facing:

- products
- variations
- categories
- collection data
- stock state
- prices
- cart
- checkout where gateway compatibility is verified

Base namespace:

`/wp-json/wc/store/v1`

## WordPress REST / custom headless schema

Use for non-commerce editorial data:

- studio story
- maker information
- visit information
- authored homepage content
- process relationships
- workshop metadata not represented cleanly by Woo product fields

## Important rule

Do not scrape rendered HTML in production.

Prototype fixtures may be derived manually from current public data, but production must use stable APIs/content fields.

---

# 5. Commerce Adapter Boundary

Do not couple the UI directly to WooCommerce response shapes.

Create a domain adapter.

```ts
interface CommerceAdapter {
  listProducts(input: ProductQuery): Promise<ProductCollection>
  getProduct(slug: string): Promise<Product>
  getCart(): Promise<Cart>
  addToCart(input: AddToCartInput): Promise<Cart>
  updateCartItem(input: UpdateCartItemInput): Promise<Cart>
  removeCartItem(key: string): Promise<Cart>
  beginCheckout(input: CheckoutInput): Promise<CheckoutState>
}
```

Implementations:

- `FixtureCommerceAdapter` — prototype
- `WooCommerceAdapter` — production

This lets the first visual prototype be built before production credentials or gateway integration exist.

---

# 6. WooCommerce BFF Boundary

The browser should not contain Woo-specific session plumbing throughout the component tree.

Use Next Route Handlers as a thin Backend-for-Frontend layer:

```
app/api/commerce/products/...
app/api/commerce/cart/...
app/api/commerce/checkout/...
```

Responsibilities:

- normalize Woo responses into Fokhara domain objects,
- forward cart/nonce tokens,
- centralize errors,
- prevent UI components from knowing provider details,
- provide one future migration point if commerce changes.

## Cart token

Woo Store API supports `Cart-Token` for headless cart identity.

Preferred handling:

- obtain token through the BFF,
- keep it server-managed where practical,
- expose only Fokhara cart state to UI,
- avoid storing sensitive information in client transition/session state.

---

# 7. Payment / Checkout Gate

Do **not** assume the current Woo payment gateway automatically works in a headless checkout.

Before production checkout implementation:

1. enumerate current Woo payment methods,
2. verify Store API / Woo Blocks compatibility,
3. test guest order creation,
4. test payment completion,
5. test failure/cancel return,
6. test mobile,
7. test order visibility in WordPress admin.

## If supported

Use Store API checkout through the commerce adapter.

## If unsupported

Choose one explicit fallback:

- supported Woo-hosted checkout handoff,
- gateway-specific headless integration,
- or a small Woo extension that exposes the required payment contract.

Do not emulate successful payment in the UI.

---

# 8. Repository Shape

Target:

```
app/
  (discovery)/
    page.tsx
    studio/
    visit/
  shop/
    page.tsx
    collections/[slug]/
    [productSlug]/
  workshops/
    page.tsx
    [workshopSlug]/
  book/[workshopSlug]/
  cart/
  checkout/
  api/
    commerce/
    content/

components/
  shell/
  navigation/
  media/
  product/
  workshop/
  commerce/
  transition/
  typography/
  primitives/

features/
  carry/
  trace/
  shop/
  workshops/
  booking/
  cart/
  checkout/

lib/
  commerce/
  content/
  transitions/
  analytics/
  accessibility/
  seo/

styles/
  tokens.css
  globals.css
  motion.css

data/
  fixtures/

tests/
  unit/
  e2e/
  visual/
```

Route folder details may evolve, but domain separation should remain.

---

# 9. Render Strategy

## Server by default

Server-render:

- route shells,
- product data,
- workshop data,
- collection data,
- SEO,
- primary copy,
- pricing/availability initial state.

## Client islands

Use Client Components only for:

- Carry Layer
- focus state
- filters needing immediate interaction
- cart mutation controls
- workshop selection
- booking form state
- transition memory
- pointer/touch-responsive behavior

The visual thesis must not force the entire app into client rendering.

---

# 10. Shell Architecture

## RootShell

Persistent responsibilities:

- navigation
- global transition layer
- cart access
- reduced-motion state
- route intent mode
- global focus management

## RouteIntent

Each route declares:

```ts
type IntentLevel =
  | "discovery"
  | "browse"
  | "evaluate"
  | "commit"
  | "transaction"
```

Mapping:

- Home → discovery
- Shop / Workshops → browse
- Product / Workshop Detail → evaluate
- Booking / Cart → commit
- Checkout → transaction

The shell exposes this as:

`data-intent="browse"`

or an equivalent typed state.

CSS/layout behavior can then settle systematically rather than page-by-page.

---

# 11. Visual Tokens

Do not finalize literal color/type values until the first prototype.

Define semantic tokens first.

## Field

- `--field-primary`
- `--field-raised`
- `--field-commit`

## Ink

- `--ink-primary`
- `--ink-secondary`
- `--ink-muted`

## Material state

- `--material-accent`
- `--material-accent-ink`
- `--material-surface`

## Space

- `--space-field`
- `--space-pressure`
- `--space-cluster`
- `--space-utility`

## Motion

- `--motion-utility`
- `--motion-compose`
- `--motion-carry`

The system should allow route intent and actual material data to change tokens without duplicating page CSS.

---

# 12. Carry State Contract

This is the most important custom state contract.

```ts
type CarryEntityType = "product" | "workshop" | "process"

interface CarrySnapshot {
  id: string
  entityType: CarryEntityType
  entityId: string
  sourceRoute: string
  destinationRoute: string

  media: {
    src: string
    alt: string
    objectPosition?: string
    cropKey?: string
  }

  geometry?: {
    x: number
    y: number
    width: number
    height: number
  }

  visual?: {
    materialAccent?: string
    collectionKey?: string
  }

  returnState?: {
    scrollY?: number
    focusKey?: string
    query?: string
  }

  createdAt: number
}
```

Rules:

- session-only,
- no personal/sensitive data,
- expires quickly,
- invalid state is ignored safely,
- destination must render correctly without it.

---

# 13. Carry Layer Architecture

Do not rely only on `layoutId` surviving route changes.

Create a persistent **CarryLayer** inside the root shell.

## Flow

### 1. Capture

On intentional navigation from an eligible card:

- measure source media bounds,
- capture source image/crop,
- capture material accent,
- capture return scroll/focus state,
- create `CarrySnapshot`.

### 2. Lift

Render a fixed-position visual clone into CarryLayer.

The real source becomes visually suppressed but remains semantically intact until navigation starts.

### 3. Navigate

Use normal Next navigation.

No fake page swap.

### 4. Destination register

Destination hero registers its target anchor:

```ts
registerCarryTarget(entityId, element)
```

### 5. Recompose

The overlay animates from source geometry to destination geometry while the destination layout resolves around the entity.

This is the critical difference:

**the destination layout is selected from the carried entity state.**

Not merely:
image flies from A to B.

### 6. Commit

Once settled:

- reveal destination media,
- remove overlay,
- preserve trace state.

### 7. Failure

If destination anchor does not register within the transition budget:

- cancel carry,
- reveal destination normally,
- never leave invisible content.

---

# 14. Recomposition Contract

Each eligible destination may expose a limited set of authored compositions.

Example Product Detail:

```ts
type ProductComposition =
  | "mass-left"
  | "mass-right"
  | "vertical-pressure"
```

The selected composition can be determined by real source attributes such as:

- source card position,
- product silhouette orientation,
- source image crop,
- collection context.

Do not randomize composition.

Same cause should produce the same result.

This makes the behavior causal.

---

# 15. Trace Store

Create a small session-level store.

No large state library is required initially.

Use:

- React context for active interaction state,
- `sessionStorage` for route-return continuity.

Possible state:

```ts
interface TraceState {
  shop?: {
    scrollY: number
    focusedProductId?: string
    query?: ProductQuery
  }

  workshops?: {
    scrollY: number
    focusedWorkshopId?: string
    query?: WorkshopQuery
  }

  materialAccent?: {
    value: string
    sourceEntityId: string
  }
}
```

Do not persist every click.

Only preserve state that helps continuity.

---

# 16. Shop Component System

## Server / structural

- `ShopPageShell`
- `ProductGrid`
- `ProductCard`
- `ProductPrice`
- `StockState`
- `CollectionHeader`

## Client / interactive

- `ProductFocusController`
- `ProductFilters`
- `CarryLink`
- `ShopReturnRestorer`

## Contract

Every ProductCard must work without JS as a normal link.

Enhanced interaction is additive.

---

# 17. Product Detail Component System

- `ProductHero`
- `ProductPurchasePanel`
- `ProductGallery`
- `MaterialEvidence`
- `ProductSpecifications`
- `UseContext`
- `RelatedProducts`
- `RelatedWorkshop`
- `CarryTarget`

Above-the-fold purchase controls cannot be delayed by narrative animation.

---

# 18. Workshop Component System

## Discovery

- `WorkshopGrid`
- `WorkshopCard`
- `WorkshopFilters`
- `WorkshopFormatGroup`

## Detail

- `WorkshopHero`
- `ProcessVerbs`
- `WorkshopOutcome`
- `WorkshopFacts`
- `WorkshopPolicies`
- `WorkshopBookingCTA`
- `RelatedObjects`

## Booking

- `BookingShell`
- `ParticipantSelector`
- `PreferredScheduleSelector`
- `AvailabilityDisclosure`
- `ParticipantDetailsForm`
- `PolicyConfirmation`
- `BookingSummary`

---

# 19. Workshop Availability Contract

Use:

```ts
type AvailabilityMode =
  | "live"
  | "request"
  | "next_available"
  | "contact"
```

UI branches by mode.

## Live

Can show real dates/capacity.

## Request

Can show preferred date/time input with explicit pending confirmation language.

## Next Available

Can communicate the next-session policy without inventing a date.

## Contact

Provides clear contact action before commitment.

Never infer live capacity from recurring schedule text.

---

# 20. Become-the-Maker State

Workshop detail should expose a small progression model:

```ts
type MakerStage =
  | "observe"
  | "understand"
  | "choose"
  | "commit"
```

This does not need to appear as a visible stepper.

It can govern:

- composition density,
- process imagery,
- amount of practical information,
- CTA persistence.

The page starts as an invitation and settles toward a clear booking state.

---

# 21. Motion Tiers

Every motion belongs to one tier.

## Tier 0 — None

For:
- reduced motion,
- recovery states,
- low-power fallback where needed.

## Tier 1 — Utility

Target:
roughly immediate / 100–220ms class.

Examples:
- button state
- filter chip
- cart quantity
- navigation feedback

No springs that delay action.

## Tier 2 — Compositional

Target:
roughly 250–600ms class, interruption-safe.

Examples:
- pressure/release
- crop resolution
- card focus
- content rebalancing

Use weighted easing/springs.

## Tier 3 — Carry

Target:
only as long as needed for spatial continuity.

Examples:
- Shop → Product
- Workshop → Workshop Detail

The transition must never block access if destination is ready.

Exact timing is tuned by prototype, not fixed in documentation.

---

# 22. Motion Budget Rules

- no infinite ambient animation by default,
- no scroll-jacking,
- no loader-as-brand-theater,
- no animation before navigation acknowledgement,
- transform/opacity preferred,
- layout reads batched,
- avoid animating expensive blur/filter over large surfaces,
- no shader/WebGL in v1,
- pause non-essential motion when page is hidden,
- respect `prefers-reduced-motion`.

---

# 23. Reduced Motion Contract

With reduced motion:

## Carry

Replace geometric flight with:

- immediate route transition,
- retained material accent/context,
- optional short opacity crossfade.

## Pressure / Release

Use hierarchy/state change with little or no positional movement.

## Scroll narrative

Content remains fully visible and ordered.

No information depends on an animation completing.

The user still receives:

- continuity,
- trace,
- intent settling.

---

# 24. Responsive Modes

Do not use dozens of visual breakpoints.

Start with semantic modes:

## Compact
phones / narrow screens

## Medium
tablet / small landscape

## Field
large desktop

Components decide their local behavior with container queries where appropriate.

---

# 25. Compact Mode Rules

- one dominant mass at a time,
- no tiny counterweight columns,
- CTA remains reachable,
- object imagery allowed to exceed conventional card scale,
- transitions become shorter,
- source/destination carry can use scale + vertical translation,
- no hover-dependent meaning,
- touch focus state must be explicit,
- product purchase action appears before deep story.

---

# 26. Media Pipeline

Use Next Image where compatible.

Store media metadata:

```ts
interface FokharaImage {
  src: string
  alt: string
  width: number
  height: number
  focalPoint?: { x: number; y: number }
  role?: "material" | "object" | "life" | "studio"
}
```

The **focalPoint** is important for carry/crop continuity.

Do not solve art direction with CSS object-position guesses scattered across pages.

---

# 27. Material Accent Contract

Color may be carried only when sourced from real content.

```ts
interface MaterialAccent {
  value: string
  source: "glaze" | "collection" | "process"
  sourceId: string
}
```

Production content should explicitly define or approve the accent.

Do not auto-sample image colors in v1.

Reason:

- inconsistent results,
- contrast risk,
- makes visual identity data-dependent in uncontrolled ways.

Automatic sampling can be explored later as tooling, not runtime behavior.

---

# 28. Content Layer

Create normalized domain types independent of WordPress.

## Product

```ts
interface Product {
  id: string
  slug: string
  name: string
  price: Money
  compareAtPrice?: Money
  stock: "in_stock" | "out_of_stock"
  images: FokharaImage[]
  collection?: CollectionRef
  form?: string
  dimensions?: string
  material?: string
  finish?: string
  care?: string
  description?: string
  variants: ProductVariant[]
  materialAccent?: MaterialAccent
  relatedProductIds?: string[]
  relatedWorkshopId?: string
}
```

## Workshop

```ts
interface Workshop {
  id: string
  slug: string
  name: string
  format: "single" | "package" | "course"
  process: string[]
  audience: string[]
  duration: string
  sessions: number
  price: Money
  compareAtPrice?: Money
  availabilityMode: AvailabilityMode
  scheduleOptions?: ScheduleOption[]
  includedMaterials?: string[]
  actions: string[]
  outcomes?: string[]
  policyRefs: string[]
  images: FokharaImage[]
  relatedWorkshopIds?: string[]
  relatedProductIds?: string[]
}
```

---

# 29. Validation

Use runtime schema validation at provider boundaries.

Recommended:

- Zod or equivalent lightweight schema validation

Validate Woo/content responses before mapping into domain types.

The UI should never assume remote data is complete.

---

# 30. Error / Empty States

Error states must belong to the visual system but remain direct.

Required:

- product unavailable
- out of stock
- workshop unavailable
- booking requires contact
- cart mutation failed
- checkout failed
- media missing
- transition failed
- API unavailable

Do not mask errors behind animation.

---

# 31. SEO Architecture

For every Product / Workshop:

- unique metadata,
- canonical URL,
- Open Graph image,
- structured data where accurate,
- semantic headings,
- crawlable price/availability where appropriate.

Use server rendering for important content.

Do not move essential text into canvas.

---

# 32. Accessibility Gates

Before a visual state can be considered closed:

- keyboard navigation works,
- visible focus,
- semantic links/buttons,
- no hover-only information,
- alt text correct,
- contrast passes,
- filters accessible,
- cart updates announced,
- errors programmatically associated,
- dialogs trap/restore focus correctly,
- reduced-motion works,
- source/target transition never duplicates focusable controls.

CarryLayer visuals must be `aria-hidden`.

The semantic source/destination remains the actual accessible content.

---

# 33. Performance Budget

The thesis depends on immediacy.

Initial targets:

## Core

- no blocking WebGL bundle,
- no global animation library duplication,
- lazy-load below-fold editorial media,
- reserve media aspect ratios,
- avoid layout shift,
- route prefetch for likely product/workshop navigation.

## Prototype gate

On a mid-range mobile profile:

- route action acknowledged immediately,
- carry transition does not wait on large image decode,
- destination critical data can render without decorative media,
- no persistent main-thread animation loop.

Formal Lighthouse/Web Vitals thresholds are set during production measurement, not guessed now.

---

# 34. Testing Stack

## Unit / contract

- Vitest or equivalent
- domain adapters
- schema mapping
- availability logic
- intent mapping
- trace expiry

## E2E

- Playwright

Critical journeys:

1. Home → Shop → Product → Back
2. Shop filter → Product → Back restores state
3. Product Add to Cart
4. Workshops → Detail → Booking
5. request-mode booking truth
6. Cart → Checkout
7. reduced motion
8. keyboard-only
9. compact viewport
10. out-of-stock / unavailable states

## Visual

Screenshot tests for:
- Field
- Medium
- Compact
- reduced motion final states

Do not snapshot animation frames as the main quality test.

---

# 35. Analytics Contract

Implement through one wrapper:

```ts
track(event, payload)
```

UI does not import a vendor directly.

Initial events:

- home_shop_enter
- home_workshops_enter
- product_focus
- product_open
- product_to_workshop
- add_to_cart
- workshop_open
- workshop_to_product
- booking_start
- preferred_schedule_selected
- booking_commit
- checkout_start
- purchase_complete

Add transition diagnostics only in development/QA.

---

# 36. Prototype Data Strategy

The first prototype should not wait for WordPress changes.

Create small curated fixtures:

## Products

3–6 real Fokhara products representing:
- different silhouettes,
- at least two collections,
- in-stock + out-of-stock,
- differing image crops.

## Workshops

3–4 real offerings:
- Wheelthrowing
- Handbuilding
- one course
- one family/couples/kids case

Use real public facts only.

Mark any missing production field as unknown.

Do not invent material/process details merely to make the prototype richer.

---

# 37. First Prototype Scope — P0

Build only:

## Route 1
`/`

Minimal object entry.

## Route 2
`/shop`

- real/fixture product list,
- focus behavior,
- basic filter state,
- carry capture.

## Route 3
`/shop/[productSlug]`

- carry target,
- recompose,
- price,
- stock,
- add-to-cart placeholder adapter or real adapter,
- material evidence region,
- related continuation.

## Return

Product → Shop restores:
- scroll,
- filters,
- focus.

## Responsive

- Field
- Compact

## Accessibility

- reduced-motion equivalent
- keyboard path

Nothing else is required to prove P0.

---

# 38. P0 Acceptance Gates

P0 passes only if all are true.

## Thesis

### Carry
The same selected object visibly persists across route change.

### Recompose
The destination composition is affected by the carried state.

### Trace
Returning restores meaningful browse context.

### No gimmick
Removing the transition animation still leaves a coherent layout.

---

## Product

- name readable,
- price readable,
- stock readable,
- primary action visible,
- normal URL works on refresh,
- direct deep-link works without prior carry state.

---

## Performance

- no blank page between routes,
- no transition waiting on non-critical media,
- no layout flash from missing geometry,
- source and target image ratios reserved.

---

## Mobile

- no hover dependency,
- carry simplifies cleanly,
- purchase action remains near the top,
- no horizontal overflow,
- type remains readable.

---

## Accessibility

- keyboard can complete route loop,
- focus is restored logically,
- reduced-motion removes spatial flight,
- overlay is not announced by screen reader.

---

# 39. P1 — Participation Slice

Only after P0 passes:

- `/workshops`
- `/workshops/[slug]`
- `/book/[slug]`

Prove:

- Become the Maker,
- process-based discovery,
- availability truth,
- Intent Settling.

No need to build checkout before booking truth works.

---

# 40. P2 — Full Product System

After P1:

- collections
- cart
- checkout
- studio
- visit
- policies
- cross-system bridges
- production Woo adapter
- analytics
- SEO completion

---

# 41. Development Diagnostics

In development only, add a small debug overlay toggle that can show:

- current intent level,
- active carry entity,
- carry source/target bounds,
- trace state,
- reduced-motion status,
- route transition phase.

This will make the novel interaction system debuggable instead of mystical.

Never ship it enabled in production.

---

# 42. Transition State Machine

Use an explicit machine/state enum rather than loose booleans.

```ts
type CarryPhase =
  | "idle"
  | "captured"
  | "lifting"
  | "navigating"
  | "target-ready"
  | "recomposing"
  | "settled"
  | "cancelled"
```

Illegal transitions should be ignored/logged in development.

This prevents classic animation bugs:
- duplicate overlays,
- hidden destination image,
- stale source geometry,
- carry surviving unrelated navigation.

---

# 43. Transition Recovery

Cancel Carry and render destination normally when:

- user opens in new tab,
- direct URL,
- source image missing,
- target ID mismatch,
- target timeout,
- navigation interrupted,
- browser page restored from bfcache,
- reduced-motion policy says no spatial transition.

A failed transition must never become a failed navigation.

---

# 44. Image Decode Strategy for Carry

The visual clone should use an already-rendered source image where possible.

Do not wait to download a new high-resolution asset just to animate.

Destination image:

- reserves correct ratio,
- may decode in parallel,
- crossfades in at settle.

The transition is continuity, not a preload screen.

---

# 45. Route Prefetch Strategy

Prefetch likely destinations on:

- pointer intent,
- focus,
- viewport proximity,
- touch-down only where it does not cause waste.

Do not prefetch the whole catalog.

The strongest place is product/workshop cards likely to be carried.

---

# 46. Composition Determinism

For the same source state and viewport mode, composition selection should be deterministic.

Example input:

```
entity = nebula-espresso
sourceColumn = 3
viewport = field
silhouette = tall
```

returns one known destination composition.

Why:

- trace feels authored,
- screenshots are testable,
- bugs reproduce,
- no pseudo-organic randomness.

---

# 47. No-WebGL Gate

P0 and P1 must pass without WebGL.

Only reconsider 3D after:

- carry works,
- mobile works,
- product clarity works,
- workshop journey works,
- performance is measured.

A future WebGL proposal must answer:

1. Which principle does it express better?
2. Which real user/product task improves?
3. What is the non-WebGL fallback?
4. What is its performance cost?

If those answers are weak, reject it.

---

# 48. Production Content Gaps to Resolve Later

Before final production:

- exact product materials,
- dimensions,
- care instructions,
- collection definitions,
- real process relation per product,
- workshop age rules,
- session durations,
- included materials,
- firing/collection terms,
- current operating hours,
- payment gateway headless compatibility,
- shipping/collection rules,
- authoritative brand assets,
- approved photography.

Unknown values remain unknown until Fokhara confirms them.

Do not infer.

---

# 49. Current Source-of-Truth Decision

## Now

Use the existing Fokhara WooCommerce/WordPress system as the operational source.

## Frontend

Build a new authored Next.js experience against normalized adapters.

## Later

If Fokhara wants a CMS/commerce migration, the domain layer makes that a separate decision.

Do not turn the redesign into an unnecessary backend rewrite.

---

# 50. Implementation Blueprint Verdict

The project is ready to leave pure research.

The first code should not attempt to “build Fokhara.”

It should prove one thesis loop:

> **A real product is selected in a usable shop, physically carries into a deep-linkable product route, causes that route to recompose, and leaves enough trace that returning feels continuous — on desktop, mobile, keyboard, and reduced motion.**

If that loop fails, do not expand scope.

If it succeeds, the core creative proposition is technically real.

---

# Step 08 Exit Condition

Step 08 is closed when:

- the production-capable stack is chosen,
- WooCommerce is isolated behind an adapter/BFF,
- Carry has an explicit state machine,
- Trace has a minimal state contract,
- route intent is systematic,
- reduced motion and recovery are designed before animation,
- P0/P1/P2 scopes are explicit,
- acceptance gates are testable,
- and no unresolved visual effect is required to begin coding.

**Next: P0 Prototype Implementation.**
