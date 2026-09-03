# P2 — Production Data Wiring & Payment Capability Audit

## Status

**Product data: live**
**Cart session: live**
**Checkout processing: gated pending non-production payment verification**

Branch: `prototype/p2-full-product-system`
PR: #3

---

## Live WooCommerce Product Truth

Verified from the current Fokhara WooCommerce Store API through the P2 preview runtime.

- Total Woo products returned: **34**
- Current ceramics: **19**
- Ceramics category slug: `ceramics-by-fokhara-shop`
- Current ceramic product tags: none
- Product images: present
- Live fields now wired:
  - Woo product ID
  - slug
  - name
  - price
  - regular price
  - stock state
  - purchasable flag
  - has-options flag
  - description
  - primary image URL
  - categories
  - source permalink

### Current collection model

Woo currently does not expose ceramic collection identity through tags/taxonomy.

P2 therefore derives known collection names deterministically from current product naming:

- Nebula
- Midnight
- Ocean
- Foggy
- Lazuli
- Latte Foam
- Seaweed

This is an adapter-level compatibility rule, **not** a claim that these are structured Woo collections.

Long-term production cleanup should move collection identity into maintainable Woo taxonomy/metadata.

---

## Product Data Architecture

Customer-facing UI does not consume raw Woo response shapes.

Flow:

```
Fokhara UI
  ↓
normalized Product domain
  ↓
Woo adapter
  ↓
WooCommerce Store API
```

Public BFF/read surfaces:

- `GET /api/commerce/products`
- `GET /api/commerce/products/[slug]`
- `GET /api/commerce/health`

Fallback behavior:

- live Store API is preferred;
- curated fixtures are used only if live product retrieval fails;
- fixture mode is visibly disclosed in Shop.

---

## Cart Session Architecture

Cart uses the WooCommerce Store API `Cart-Token` model.

The Woo token is isolated behind the Fokhara BFF and stored as an HttpOnly cookie:

`fokhara_cart_token`

Cookie policy:

- HttpOnly
- SameSite=Lax
- Secure in production
- path=/
- 30-day max age

BFF routes:

- `GET /api/commerce/cart`
- `POST /api/commerce/cart/items`
- `PATCH /api/commerce/cart/items/[key]`
- `DELETE /api/commerce/cart/items/[key]`

UI wired:

- live cart count
- live Add to Cart for simple purchasable ceramics
- `/cart`
- quantity changes
- remove item
- live totals

If a stored Cart-Token becomes invalid, the adapter may recover by creating a fresh Woo cart session rather than breaking navigation.

---

## Payment Capability Audit

A dedicated non-order-mutating capability surface was added:

`GET /api/commerce/capabilities`

Verified current Woo payment method IDs:

- `paymob-main`
- `paymob-4606366-card-vpc-egp`

This confirms that the current Fokhara Woo store exposes Paymob through the Store API cart state.

### External plugin capability evidence

The current public Paymob Checkout plugin/extension declares WooCommerce Cart & Checkout Blocks compatibility.

The current WordPress plugin listing also records a recent checkout-block enhancement.

This is strong evidence that Paymob participates in the modern Woo checkout system.

It is **not sufficient evidence** that an arbitrary custom headless client can submit every required Paymob payment field correctly without an integration test.

Woo Store API checkout accepts a payment method plus gateway-specific `payment_data`, and Woo explicitly notes that payment gateways may expect different data.

---

## Production Decision

### Enabled now

- live catalog reads
- live stock and pricing
- live simple-product Add to Cart
- live Cart-Token session
- live cart update/remove/totals

### Deliberately gated

- creating a checkout/order
- charging Paymob
- declaring payment success
- Paymob redirect/embedded-card completion

Reason:

Testing the actual checkout processing path against the live Fokhara store could create a real Woo order or payment attempt.

The volunteer prototype should not mutate the owner's production orders merely to prove compatibility.

---

## Checkout Exit Gate

Checkout can be enabled after one of these is available:

### Preferred
A staging/test Fokhara Woo/Paymob environment with test-mode Paymob credentials.

Then verify:

1. Cart-Token survives into checkout.
2. Billing/customer data is accepted.
3. `paymob-main` processing returns the expected Paymob result/redirect.
4. Card/VPC method required payment data is identified.
5. cancelled payment returns safely.
6. successful test payment changes Woo order state correctly.
7. webhook/callback reaches the original Woo store correctly.

### Alternative
Explicit owner permission to make a controlled test order in the live store.

Without one of those conditions, P2 should keep checkout visibly gated.

---

## Rendering Correction

A temporary diagnostic originally fetched `/cart` inside the Home/Shop render path.

That made Next classify those routes as dynamic because cart inspection is no-store/session-oriented.

The diagnostic was removed from render paths.

Current intended rendering:

- Home: ISR
- Shop: ISR
- Product Detail: server-rendered live data
- Cart/BFF mutation routes: dynamic
- payment capability audit: dedicated dynamic endpoint

Session data must not contaminate catalog rendering.

---

## Current P2 Remaining Work

Production Data Wiring is structurally established.

Remaining Full Product System work:

1. Collection route/system
2. Studio
3. Visit
4. product ↔ workshop bridges
5. checkout integration once payment exit gate is satisfied
6. remove temporary preview diagnostics
7. P2 structural acceptance
