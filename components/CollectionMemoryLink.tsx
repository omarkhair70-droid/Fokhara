"use client";

import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";

type Props = {
  href: string;
  collectionSlug: string;
  className?: string;
  style?: CSSProperties;
  materialId?: string;
  reflectivity?: string;
  rhythm?: string;
  children: ReactNode;
};

const STORAGE_KEY = "fokhara:collection-memory";

export function CollectionMemoryLink({
  href,
  collectionSlug,
  className,
  style,
  materialId,
  reflectivity,
  rhythm,
  children
}: Props) {
  return (
    <Link
      href={href}
      className={className}
      style={style}
      data-material={materialId}
      data-reflectivity={reflectivity}
      data-rhythm={rhythm}
      onClick={(event) => {
        if (
          event.defaultPrevented ||
          event.button !== 0 ||
          event.metaKey ||
          event.ctrlKey ||
          event.shiftKey ||
          event.altKey
        ) {
          return;
        }

        try {
          sessionStorage.setItem(
            STORAGE_KEY,
            JSON.stringify({
              slug: collectionSlug,
              at: Date.now()
            })
          );
        } catch {
          // Navigation remains authoritative when storage is unavailable.
        }
      }}
    >
      {children}
    </Link>
  );
}

export const collectionMemoryStorageKey = STORAGE_KEY;
