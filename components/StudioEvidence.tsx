import { officialVisualMedia } from "@/lib/visual/official-media";

export function StudioEvidence() {
  const media = officialVisualMedia.workshopEnsemble;

  return (
    <section className="studioEvidence">
      <div className="studioEvidence__media">
        <img src={media.src} alt={media.alt} loading="lazy" decoding="async" />
      </div>
      <div className="studioEvidence__copy">
        <p className="eyebrow">Inside the studio</p>
        <h2>Hands, wheels, clay, and a room that is actually used.</h2>
        <p>
          Pottery here is learned around real wheels, tools, clay and other
          people making beside you. The studio is a working room, not a display
          set.
        </p>
      </div>
    </section>
  );
}
