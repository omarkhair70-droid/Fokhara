const SOURCES: Record<string, string> = {
  nebula: "https://fokharastudioandshop.com/wp-content/uploads/2025/12/dscf7409.webp",
  midnight: "https://fokharastudioandshop.com/wp-content/uploads/2025/12/dscf7490.webp",
  ocean: "https://fokharastudioandshop.com/wp-content/uploads/2025/12/dscf7445.webp",
  foggy: "https://fokharastudioandshop.com/wp-content/uploads/2025/12/dscf7438.webp",
  lazuli: "https://fokharastudioandshop.com/wp-content/uploads/2025/12/dscf7483.webp",
  seaweed: "https://fokharastudioandshop.com/wp-content/uploads/2025/12/dscf7421.webp",
  "latte-foam": "https://fokharastudioandshop.com/wp-content/uploads/2025/12/dscf7468.webp"
};

type Props = {
  params: Promise<{ collection: string }>;
};

export async function GET(_: Request, { params }: Props) {
  const { collection } = await params;
  const source = SOURCES[collection];
  if (!source) return new Response("Not found", { status: 404 });

  const response = await fetch(source, {
    headers: { "User-Agent": "Fokhara-Redesign/VP4-Visual-Probe" },
    cache: "no-store"
  });

  if (!response.ok) {
    return new Response("Upstream image unavailable", { status: 502 });
  }

  return new Response(response.body, {
    headers: {
      "Content-Type": response.headers.get("content-type") ?? "image/webp",
      "Cache-Control": "no-store"
    }
  });
}
