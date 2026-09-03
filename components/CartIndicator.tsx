"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { Cart } from "@/lib/commerce/cart";

export function CartIndicator() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    let active = true;

    fetch("/api/commerce/cart")
      .then((response) => (response.ok ? response.json() : null))
      .then((cart: Cart | null) => {
        if (active && cart) setCount(cart.count);
      })
      .catch(() => undefined);

    const onCartUpdated = (event: Event) => {
      const detail = (event as CustomEvent<Cart>).detail;
      if (detail) setCount(detail.count);
    };

    window.addEventListener("fokhara:cart-updated", onCartUpdated);

    return () => {
      active = false;
      window.removeEventListener("fokhara:cart-updated", onCartUpdated);
    };
  }, []);

  return (
    <Link className="cartStub" href="/cart">
      Cart{count === null ? "" : ` · ${count}`}
    </Link>
  );
}
