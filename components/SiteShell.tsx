"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CartIndicator } from "@/components/CartIndicator";

function intentForPath(pathname: string) {
  if (pathname === "/") return "discovery";
  if (
    pathname === "/shop" ||
    pathname.startsWith("/collections") ||
    pathname === "/workshops" ||
    pathname === "/studio" ||
    pathname === "/visit"
  ) return "browse";
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
  const shopActive =
    pathname.startsWith("/shop") || pathname.startsWith("/collections");
  const workshopsActive =
    pathname.startsWith("/workshops") || pathname.startsWith("/book/");
  const studioActive = pathname === "/studio";
  const visitActive = pathname === "/visit";

  return (
    <div className="siteShell" data-intent={intent}>
      <a className="skipLink" href="#main-content">
        Skip to content
      </a>
      <header className="siteHeader">
        <Link className="brand" href="/">
          Fokhara
          <span>Studio & Shop</span>
        </Link>
        <nav aria-label="Primary">
          <Link
            data-active={shopActive}
            aria-current={shopActive ? "page" : undefined}
            href="/shop"
          >
            Shop
          </Link>
          <Link
            data-active={workshopsActive}
            aria-current={workshopsActive ? "page" : undefined}
            href="/workshops"
          >
            Workshops
          </Link>
          <Link
            data-active={studioActive}
            aria-current={studioActive ? "page" : undefined}
            href="/studio"
          >
            Studio
          </Link>
          <Link
            data-active={visitActive}
            aria-current={visitActive ? "page" : undefined}
            href="/visit"
          >
            Visit
          </Link>
        </nav>
        <CartIndicator />
      </header>
      <main id="main-content">{children}</main>
    </div>
  );
}
