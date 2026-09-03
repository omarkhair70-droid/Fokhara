"use client";

import { useCallback, useEffect, useState } from "react";
import type { Cart } from "@/lib/commerce/cart";
import { formatEgp } from "@/lib/products";

export function CartClient() {
  const [cart, setCart] = useState<Cart | null>(null);
  const [error, setError] = useState("");
  const [busyKey, setBusyKey] = useState<string | null>(null);

  const load = useCallback(async () => {
    setError("");

    try {
      const response = await fetch("/api/commerce/cart");
      const body = await response.json();

      if (!response.ok) {
        throw new Error(body?.error ?? "Could not load cart.");
      }

      setCart(body as Cart);
      window.dispatchEvent(
        new CustomEvent("fokhara:cart-updated", { detail: body })
      );
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Could not load cart.");
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  async function mutate(
    key: string,
    options: RequestInit
  ) {
    setBusyKey(key);
    setError("");

    try {
      const response = await fetch(
        `/api/commerce/cart/items/${encodeURIComponent(key)}`,
        options
      );
      const body = await response.json();

      if (!response.ok) {
        throw new Error(body?.error ?? "Could not update cart.");
      }

      setCart(body as Cart);
      window.dispatchEvent(
        new CustomEvent("fokhara:cart-updated", { detail: body })
      );
    } catch (caught) {
      setError(
        caught instanceof Error ? caught.message : "Could not update cart."
      );
    } finally {
      setBusyKey(null);
    }
  }

  if (!cart && !error) {
    return (
      <section className="cartPage">
        <p className="eyebrow">Commit / cart</p>
        <h1>Loading your cart…</h1>
      </section>
    );
  }

  const orderEmailHref = cart
    ? "mailto:fokhara@outlook.com?subject=" +
      encodeURIComponent("Ceramics order request") +
      "&body=" +
      encodeURIComponent(
        [
          "Hello Fokhara,",
          "",
          "I would like to ask about these pieces:",
          ...cart.items.map(
            (item) =>
              `- ${item.name} × ${item.quantity} · ${formatEgp(item.lineTotalEgp)}`
          ),
          "",
          `Current total shown: ${formatEgp(cart.totalEgp)}`,
          "",
          "Please confirm availability and how I can complete the order."
        ].join("\n")
      )
    : "#";

  return (
    <section className="cartPage">
      <header className="cartHeader">
        <p className="eyebrow">Cart / ceramics</p>
        <h1>Your selected forms.</h1>
        <p>
          Review the pieces you selected before contacting the studio to
          complete the order.
        </p>
      </header>

      {error ? (
        <div className="dataFallback" role="alert">
          {error}
        </div>
      ) : null}

      {cart?.items.length === 0 ? (
        <div className="cartEmpty">
          <p className="eyebrow">Nothing selected yet</p>
          <h2>Your cart is waiting for its first piece.</h2>
          <p>Browse the current ceramics and carry a form into the cart.</p>
          <a className="buttonPrimary" href="/shop">
            Explore ceramics
          </a>
        </div>
      ) : null}

      {cart && cart.items.length > 0 ? (
        <>
          <div className="cartLines">
            {cart.items.map((item) => (
              <article className="cartLine" key={item.key}>
                <div>
                  <p className="eyebrow">Ceramic object</p>
                  <h2>{item.name}</h2>
                  <span>{formatEgp(item.unitPriceEgp)}</span>
                </div>

                <label>
                  Quantity
                  <input
                    type="number"
                    min={1}
                    value={item.quantity}
                    disabled={busyKey === item.key}
                    onChange={(event) => {
                      const quantity = Number(event.currentTarget.value);
                      if (!Number.isInteger(quantity) || quantity < 1) return;

                      void mutate(item.key, {
                        method: "PATCH",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ quantity })
                      });
                    }}
                  />
                </label>

                <strong>{formatEgp(item.lineTotalEgp)}</strong>

                <button
                  type="button"
                  disabled={busyKey === item.key}
                  onClick={() =>
                    void mutate(item.key, { method: "DELETE" })
                  }
                >
                  Remove
                </button>
              </article>
            ))}
          </div>

          <aside className="cartSummary">
            <div>
              <span>Items</span>
              <strong>{cart.count}</strong>
            </div>
            <div>
              <span>Subtotal</span>
              <strong>{formatEgp(cart.subtotalEgp)}</strong>
            </div>
            <div>
              <span>Current total</span>
              <strong>{formatEgp(cart.totalEgp)}</strong>
            </div>
            <div className="cartSummary__gate">
              <span>Checkout</span>
              <p>
                Online payment is not available on this site yet. Send the
                current cart to Fokhara to confirm availability and payment.
              </p>
            </div>
            <a className="buttonPrimary" href={orderEmailHref}>
              Email this cart to Fokhara
            </a>
          </aside>
        </>
      ) : null}
    </section>
  );
}
