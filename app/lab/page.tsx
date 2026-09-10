import Link from "next/link";
import styles from "./lab.module.css";

const experiments = [
  {
    number: "01",
    title: "Material Memory",
    href: "/lab/material-memory",
    stack: "WebGL2",
    question: "Can pressure leave a meaningful trace without faking the object?"
  },
  {
    number: "02",
    title: "Carry Becomes Space",
    href: "/lab/carry-space",
    stack: "Motion + CSS 3D",
    question: "Can navigation feel like carrying an object through space?"
  },
  {
    number: "03",
    title: "Kiln Threshold",
    href: "/lab/kiln-threshold",
    stack: "Motion + DOM",
    question: "Can the interface cross material states without simulating a fake pot?"
  },
  {
    number: "04",
    title: "Collection Inheritance",
    href: "/lab/collection-inheritance",
    stack: "Route state + CSS",
    question: "Can a selected surface remain present briefly after navigation?"
  },
  {
    number: "05",
    title: "Studio Contact Sheet",
    href: "/lab/studio-contact-sheet",
    stack: "Real imagery + DOM",
    question: "Can real studio evidence carry more identity than another effect?"
  }
];

export default function LabIndexPage() {
  return (
    <main className={styles.labIndex}>
      <header className={styles.hero}>
        <p className="eyebrow">Fokhara / experiment loop</p>
        <h1>Build it. Look at it. Keep only what earns its place.</h1>
        <p>
          These routes are disposable. None of them belongs to production until
          the rendered result proves that removing it would remove meaning, not
          just spectacle.
        </p>
      </header>

      <section className={styles.grid}>
        {experiments.map((experiment) => (
          <Link
            key={experiment.number}
            href={experiment.href}
            className={styles.card}
          >
            <span>{experiment.number}</span>
            <div>
              <p className="eyebrow">{experiment.stack}</p>
              <h2>{experiment.title}</h2>
              <p>{experiment.question}</p>
            </div>
            <strong>Open experiment →</strong>
          </Link>
        ))}
      </section>

      <section className={styles.rules}>
        <p className="eyebrow">Acceptance rule</p>
        <h2>If the technology is the most interesting thing, delete it.</h2>
        <ol>
          <li>It must express Fokhara without naming the technology.</li>
          <li>It must clarify material, action, transition or evidence.</li>
          <li>It must stay finite and preserve practical Shop / Booking intent.</li>
          <li>Mobile and reduced-motion states must remain authored.</li>
        </ol>
      </section>
    </main>
  );
}
