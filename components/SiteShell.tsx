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

  return (
    <div className="siteShell" data-intent={intent}>
      <header className="siteHeader">
        <Link className="brand" href="/">
          Fokhara
          <span>Studio & Shop</span>
        </Link>
        <nav aria-label="Primary">
          <Link
            data-active={
              pathname.startsWith("/shop") ||
              pathname.startsWith("/collections")
            }
            href="/shop"
          >
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
          <Link data-active={pathname === "/studio"} href="/studio">
            Studio
          </Link>
          <Link data-active={pathname === "/visit"} href="/visit">
            Visit
          </Link>
        </nav>
        <CartIndicator />
      </header>
      <main>{children}</main>
    </div>
  );
}
