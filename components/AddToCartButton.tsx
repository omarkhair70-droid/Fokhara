"use client";

import { useState } from "react";
import type { Cart } from "@/lib/commerce/cart";
import type { Product } from "@/lib/products";

export function AddToCartButton({ product }: { product: Product }) {
  const [state, setState] = useState<"idle" | "adding" | "added" | "error">(
    "idle"
  );
  const [error, setError] = useState("");

  const blocked =
    product.stock !== "in_stock" ||
    product.purchasable === false ||
    product.hasOptions === true ||
    typeof product.wooId !== "number";

  const label =
    product.stock !== "in_stock"
      ? "Unavailable"
      : product.hasOptions
        ? "Options required"
        : state === "adding"
          ? "Adding…"
          : state === "added"
            ? "Added to cart"
            : "Add to cart";

  async function add() {
    if (blocked || state === "adding") return;

    setState("adding");
    setError("");

    try {
      const response = await fetch("/api/commerce/cart/items", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId: product.wooId,
          quantity: 1
        })
      });

      const body = await response.json();

      if (!response.ok) {
        throw new Error(body?.error ?? "Could not add this product.");
      }

      const cart = body as Cart;
      window.dispatchEvent(
        new CustomEvent("fokhara:cart-updated", { detail: cart })
      );
      setState("added");

      window.setTimeout(() => setState("idle"), 1800);
    } catch (caught) {
      setError(
        caught instanceof Error ? caught.message : "Could not add this product."
      );
      setState("error");
    }
  }

  return (
    <div className="addToCart">
      <button
        type="button"
        className="buttonPrimary"
        disabled={blocked || state === "adding"}
        onClick={add}
      >
        {label}
      </button>
      {error ? <span role="alert">{error}</span> : null}
    </div>
  );
}
