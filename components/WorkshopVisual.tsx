import type { Workshop } from "@/lib/workshops";

export function WorkshopVisual({ workshop }: { workshop: Workshop }) {
  const hasMedia = Boolean(workshop.image?.src);

  return (
    <div
      className="workshopVisual"
      data-has-media={hasMedia}
      style={{ "--workshop-accent": workshop.accent } as React.CSSProperties}
      aria-hidden="true"
    >
      {hasMedia ? (
        <img
          className="workshopVisual__image"
          src={workshop.image!.src}
          alt=""
          loading="lazy"
          decoding="async"
        />
      ) : (
        <span className="workshopVisual__axis" />
      )}

      <div className="workshopVisual__actions">
        {workshop.actions.map((action, index) => (
          <span key={action} style={{ "--i": index } as React.CSSProperties}>
            <small>{String(index + 1).padStart(2, "0")}</small>
            {action}
          </span>
        ))}
      </div>
    </div>
  );
}
