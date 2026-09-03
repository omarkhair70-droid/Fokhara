import type { Workshop } from "@/lib/workshops";
import {
  workshopImageChoreography,
  workshopImageTruth,
  type WorkshopVisualRole
} from "@/lib/visual/image-choreography";

export function WorkshopVisual({
  workshop,
  visualRole = "index"
}: {
  workshop: Workshop;
  visualRole?: WorkshopVisualRole;
}) {
  const hasMedia = Boolean(workshop.image?.src);
  const imageTruth = workshopImageTruth(workshop.id);

  return (
    <div
      className="workshopVisual"
      data-has-media={hasMedia}
      data-visual-role={visualRole}
      data-image-truth={imageTruth}
      style={
        {
          "--workshop-accent": workshop.accent,
          ...workshopImageChoreography(workshop.id, visualRole)
        } as React.CSSProperties
      }
      aria-hidden="true"
    >
      {hasMedia ? (
        <img
          className="workshopVisual__image"
          src={workshop.image!.src}
          alt=""
          loading={visualRole === "detail" ? "eager" : "lazy"}
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
