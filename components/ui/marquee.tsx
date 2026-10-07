import kit from "@/components/ui/kit.module.css";

export default function Marquee({ items }: { items: string[] }) {
  const loop = [...items, ...items];
  return <div className={kit.marquee} aria-hidden="true"><div className={kit.marqueeTrack}>{loop.map((item, index) => <span key={index}>{item}</span>)}</div></div>;
}
