"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

function intentForPath(pathname: string) {
  if (pathname === "/") return "discovery";
  if (pathname === "/shop" || pathname === "/workshops") return "browse";
  if (
    pathname.startsWith("/shop/") ||
    pathname.startsWith("/workshops/")
  ) {
    return "evaluate";
  }
  if (pathname.startsWith("/book/") || pathname === "/cart") return "commit";
  if (pathname === "/checkout") return "transaction";
  return "browse";
}

export function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const intent = intentForPath(pathname);

  return (
    <div className="siteShell" data-intent={intent}>
      <header className="siteHeader">
        <Link className="brand" href="/">
          Fokhara
          <span>Studio & Shop</span>
        </Link>
        <nav aria-label="Primary">
          <Link data-active={pathname.startsWith("/shop")} href="/shop">
            Shop
          </Link>
          <Link
            data-active={
              pathname.startsWith("/workshops") ||
              pathname.startsWith("/book/")
            }
            href="/workshops"
          >
            Workshops
          </Link>
          <span className="navMuted" aria-disabled="true">Studio</span>
          <span className="navMuted" aria-disabled="true">Visit</span>
        </nav>
        <span className="cartStub" aria-label="Cart prototype placeholder">
          Cart · 0
        </span>
      </header>
      <main>{children}</main>
    </div>
  );
}
