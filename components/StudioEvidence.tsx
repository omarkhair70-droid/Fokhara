import { officialVisualMedia } from "@/lib/visual/official-media";

export function StudioEvidence() {
  const media = officialVisualMedia.workshopEnsemble;

  return (
    <section className="studioEvidence">
      <div className="studioEvidence__media">
        <img src={media.src} alt={media.alt} loading="lazy" decoding="async" />
      </div>
      <div className="studioEvidence__copy">
        <p className="eyebrow">Current studio evidence / official media</p>
        <h2>Hands, wheels, clay, and a room that is actually used.</h2>
        <p>
          The visual-production system now prefers real Fokhara workshop
          photography over invented craft imagery. Final Studio authorship still
          needs a dedicated founder frame and a deliberate wide spatial image.
        </p>
      </div>
    </section>
  );
}
