import Link from "next/link";

export default function NotFound() {
  return (
    <section className="notFound">
      <p className="eyebrow">No form found</p>
      <h1>This object is not in the P0 fixture set.</h1>
      <Link className="buttonPrimary" href="/shop">
        Return to shop
      </Link>
    </section>
  );
}
