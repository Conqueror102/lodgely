import Image from "next/image";

/** The Lodgely house mark and wordmark. Use tone="light" on dark green backgrounds. */
export default function Logo({ tone = "dark", height = 36, priority = false, alt = "Lodgely" }: { tone?: "dark" | "light"; height?: number; priority?: boolean; alt?: string }) {
  const src = tone === "light" ? "/brand/lodgely-logo-light.png" : "/brand/lodgely-logo.png";
  return <Image src={src} alt={alt} width={Math.round(height * 545 / 160)} height={height} priority={priority} />;
}
