import type { Workshop } from "@/lib/workshops";

export function WorkshopVisual({ workshop }: { workshop: Workshop }) {
  return (
    <div
      className="workshopVisual"
      style={{ "--workshop-accent": workshop.accent } as React.CSSProperties}
      aria-hidden="true"
    >
      <span className="workshopVisual__axis" />
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
