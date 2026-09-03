import { withWorkshopMediaList } from "@/lib/commerce/workshop-media";
import { workshops } from "@/lib/workshops";
import { officialVisualMedia } from "@/lib/visual/official-media";

type EvidenceFrame = {
  id: string;
  src: string;
  alt: string;
  label: string;
  note: string;
};

export async function StudioEvidence() {
  const evidenceWorkshops = workshops.filter((workshop) =>
    ["wheelthrowing", "short-course", "make-paint"].includes(workshop.id)
  );
  const visualWorkshops = await withWorkshopMediaList(evidenceWorkshops);

  const frames: EvidenceFrame[] = [
    {
      id: "studio-room",
      src: officialVisualMedia.workshopEnsemble.src,
      alt: officialVisualMedia.workshopEnsemble.alt,
      label: "Inside Fokhara",
      note: "people / wheels / working room"
    },
    ...visualWorkshops
      .filter((workshop) => workshop.image?.src)
      .map((workshop) => ({
        id: workshop.id,
        src: workshop.image!.src,
        alt: workshop.image!.alt || workshop.name,
        label: workshop.name,
        note: workshop.process.join(" / ")
      }))
  ];

  return (
    <section className="studioEvidence studioEvidence--contact">
      <aside className="studioEvidence__narrative">
        <div>
          <p className="eyebrow">Inside the studio</p>
          <h2>Hands, wheels, clay, and a room that is actually used.</h2>
          <p>
            Fokhara is both a working ceramic practice and a place where people
            learn by making. These current studio and workshop images are the
            evidence: real tools, real clay, finished and unfinished work, and
            people sharing the room.
          </p>
        </div>
      </aside>

      <div className="studioEvidence__sheet">
        {frames.map((frame, index) => {
          const mode =
            index === 0
              ? "anchor"
              : index === 2
                ? "wide"
                : index === 4
                  ? "offset"
                  : "scan";

          return (
            <figure
              className="studioEvidence__frame"
              data-mode={mode}
              key={frame.id}
            >
              <div className="studioEvidence__image">
                <img
                  src={frame.src}
                  alt={frame.alt}
                  loading={index < 2 ? "eager" : "lazy"}
                  decoding="async"
                />
              </div>
              <figcaption>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{frame.label}</strong>
                <small>{frame.note}</small>
              </figcaption>
            </figure>
          );
        })}
      </div>
    </section>
  );
}
