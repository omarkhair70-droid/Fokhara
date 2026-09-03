import type { Product } from "@/lib/products";
import {
  materialStateCssVars,
  materialStateForCollection
} from "@/lib/visual/material-state";

type ProductVisualProps = {
  product: Product;
  className?: string;
  label?: boolean;
};

export function ProductVisual({
  product,
  className = "",
  label = false
}: ProductVisualProps) {
  const hasMedia = Boolean(product.image?.src);
  const material = materialStateForCollection(product.collection);

  return (
    <div
      className={`productVisual ${className}`}
      data-form={product.form}
      data-has-media={hasMedia}
      data-material={material.id}
      data-reflectivity={material.reflectivity}
      style={
        {
          ...materialStateCssVars(product.collection),
          "--object-accent": product.accent,
          "--object-ink": product.accentInk
        } as React.CSSProperties
      }
      role={label ? "img" : undefined}
      aria-label={
        label
          ? product.image?.alt || product.name
          : undefined
      }
      aria-hidden={label ? undefined : true}
    >
      {hasMedia ? (
        <img
          className="productVisual__image"
          src={product.image!.src}
          alt=""
          decoding="async"
        />
      ) : (
        <>
          <span className="productVisual__shadow" />
          <span className="productVisual__body">
            <span className="productVisual__rim" />
            {product.form === "mug" ? (
              <span className="productVisual__handle" />
            ) : null}
          </span>
        </>
      )}
      {label && !hasMedia ? (
        <span className="srOnly">Fallback ceramic form visualization</span>
      ) : null}
    </div>
  );
}
