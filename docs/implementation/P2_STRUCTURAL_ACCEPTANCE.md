# P2 — Structural Acceptance

**Status:** PASS — structural product system closed  
**Branch:** `prototype/p2-full-product-system`  
**PR:** #3

P2 is accepted as the complete structural product-system phase.

The payment-processing path remains a documented external integration gate because it cannot be safely proven by creating an owner-production order without staging/test access or explicit approval.

That gate does not invalidate the P2 architecture and does not block visual production.

---

## Acceptance Matrix

| Area | Status | Evidence / Decision |
|---|---|---|
| Live product source | PASS | Woo Store API is normalized behind the Fokhara adapter. |
| Product price / stock | PASS | Read from the current Woo source, with visible fallback behavior. |
| Product imagery | PASS structurally | Woo primary images are available; final authored photography/art direction is Visual Production scope. |
| Collections | PASS | Live ceramic products are grouped through an isolated current-name compatibility rule. |
| Product detail | PASS | Deep-linkable, live product data, purchase state, collection continuation and maker bridge. |
| Carry + Recompose | PASS | P0 merged; destination composition is causally selected and direct entry still works. |
| Trace / return | PASS | Shop and workshop browse context can restore meaningful state. |
| Workshops | PASS | First-class participation system with process/action hierarchy. |
| Workshop detail | PASS | observe → understand → choose → commit progression. |
| Booking truth | PASS | Preference/request mode; no invented seat availability or confirmation. |
| Workshop policies | PASS | Current published rules reorganized into a dedicated route. |
| Live cart | PASS | Woo Cart-Token session behind HttpOnly BFF cookie; add/update/remove/totals wired. |
| Checkout architecture | PASS | Explicit boundary and capability audit exist. |
| Payment completion | EXTERNAL GATE | Paymob methods exposed; actual order/payment test requires staging/test access or owner-approved live test. |
| Studio | PASS | Practice/founder/current object + learning system represented without inventing production facts. |
| Visit | PASS | Current address/hours/contact/pickup context separated from workshop availability. |
| Object ↔ Maker bridges | PASS | Both systems cross without falsely asserting how an exact product was made. |
| Navigation / intent | PASS | Shop/Workshops/Studio/Visit plus commit/transaction intent boundary. |
| Analytics contract | PASS | Vendor-neutral event wrapper and critical interaction events. |
| Product SEO | PASS | Server metadata + Product JSON-LD. |
| Workshop SEO | PASS | Server metadata + Course JSON-LD. |
| Reduced motion | PASS structurally | Motion can be removed without removing information or navigation. |
| Compact/mobile | PASS structurally | P0/P1/P2 layouts contain compact rules; final art-direction QA remains Visual Production scope. |
| TypeScript | PASS | P2 head CI. |
| Production build | PASS | P2 head CI. |

---

## Route Graph

### Discovery

```
/
├─ /shop
├─ /workshops
├─ /studio
└─ /visit
```

### Object system

```
/shop
├─ /collections
│  └─ /collections/[collectionSlug]
├─ /shop/[productSlug]
│  ├─ /cart
│  └─ /workshops/[workshopSlug]
└─ back → restored Shop context
```

### Maker system

```
/workshops
└─ /workshops/[workshopSlug]
   ├─ /book/[workshopSlug]
   ├─ /policies/workshops
   └─ /shop/[productSlug]
```

### Commerce

```
Product
  → Add to Cart
  → /cart
  → checkout boundary
  → Paymob verification gate
```

---

## Data Truth

At the P2 live audit, the current Woo source returned:

- 34 total products
- 19 ceramic products
- ceramic category: `ceramics-by-fokhara-shop`
- ceramic product images
- live price and stock states
- no populated collection tags

Current collection grouping is therefore an adapter compatibility rule derived from current product naming.

Known names handled at P2 closure:

- Nebula
- Midnight
- Ocean
- Foggy
- Lazuli
- Latte Foam
- Seaweed

If Fokhara later structures collections in Woo taxonomy/metadata, the adapter should prefer the structured source and the UI should remain unchanged.

---

## Payment Boundary

The current Store API capability audit exposes:

- `paymob-main`
- `paymob-4606366-card-vpc-egp`

This proves that the current Woo installation exposes Paymob methods.

It does not prove the exact custom-headless `payment_data` contract for successful payment completion.

Do not create a production order merely for closure.

Enable payment completion after:

1. staging/test Woo + Paymob access, or explicit controlled-live-test approval;
2. successful guest order creation;
3. payment success path;
4. cancellation/failure path;
5. Woo order-state verification;
6. callback/webhook verification;
7. mobile checkout verification.

---

## What P2 Deliberately Does Not Claim

P2 does not claim:

- final photography is complete;
- final typography is complete;
- final art direction is complete;
- every ceramic has verified material/dimension/care metadata;
- collections are structurally modeled in Woo;
- workshop availability is live;
- booking request submission backend exists;
- Paymob payment completion has been tested headlessly.

Those are either content/visual-production work or explicit external integration gates.

---

## Exit Decision

P2 has enough real product structure to stop expanding architecture.

Continuing to add structural pages/effects now would dilute the workflow.

**Next: Authored Visual Production → Visual Review + Subtraction → Final Production QA.**

The next question is no longer “does the site have the route?”

It is:

> **Does every route now feel like the same Fokhara material system without becoming a generic award-site skin?**
