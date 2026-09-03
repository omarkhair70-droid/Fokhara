import type { Product } from "@/lib/products";

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
  return (
    <div
      className={`productVisual ${className}`}
      data-form={product.form}
      style={
        {
          "--object-accent": product.accent,
          "--object-ink": product.accentInk
        } as React.CSSProperties
      }
      aria-label={label ? `Prototype visual stand-in for ${product.name}` : undefined}
      aria-hidden={label ? undefined : true}
    >
      <span className="productVisual__shadow" />
      <span className="productVisual__body">
        <span className="productVisual__rim" />
        {product.form === "mug" ? <span className="productVisual__handle" /> : null}
      </span>
      {label ? <span className="srOnly">Prototype visual stand-in</span> : null}
    </div>
  );
}
