"use client";

import Icon from "@/components/ui/icon";
import { useRef, useState } from "react";
import Image from "next/image";
import styles from "@/components/home/how-works.module.css";
import Link from "next/link";

const images = ["search", "explore", "connect", "secure", "move"];
const steps = [
  { name: "Search", title: "Your search.\nYour possibilities.", copy: "Find properties by location, university, budget and type.", tag: "Find your place", action: "Start searching", href: "/accommodation", note: "A place that feels like you." },
  { name: "Explore", title: "Take a closer\nlook around.", copy: "Review property information, amenities, images, location and availability.", tag: "See the details", action: "Explore homes", href: "/accommodation?view=map", note: "Picture your everyday here." },
  { name: "Connect", title: "Good places.\nReal conversations.", copy: "Engage with relevant property owners or agents.", tag: "Meet your contact", action: "Find a property", href: "/accommodation", note: "Ask questions. Get clarity." },
  { name: "Secure", title: "Make your\nnext move.", copy: "Progress through the applicable reservation, rental or payment workflow.", tag: "Plan your move", action: "Find your next home", href: "/trust-and-safety", note: "One step closer to your keys." },
  { name: "Move In", title: "New keys.\nNew beginnings.", copy: "Access relevant digital records and support.", tag: "Settle in", action: "Begin your journey", href: "/guides", note: "Make room for a new chapter." },
];

export default function HowWorks() {
  const rail = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [atEnd, setAtEnd] = useState(false);
  function move(direction: number) {
    const element = rail.current;
    if (!element) return;
    const card = element.firstElementChild as HTMLElement;
    element.scrollBy({ left: direction * (card.offsetWidth + 20), behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
  }
  return (
    <section className={styles.section} id="how-it-works" aria-labelledby="how-title">
      <div className={styles.heading}>
        <div><span className={styles.eyebrow}>HOW LODGELY WORKS</span><h2 id="how-title">A few simple steps.<br /><span>A whole new chapter.</span></h2></div>
        <div className={styles.controls}><button onClick={() => move(-1)} disabled={active === 0} aria-label="Previous steps">←</button><button onClick={() => move(1)} disabled={atEnd} aria-label="Next steps">→</button></div>
      </div>
      <div className={styles.rail} ref={rail} tabIndex={0} aria-label="How Lodgely works: five steps, scroll to explore" onScroll={(event) => {
        const element = event.currentTarget;
        const width = (element.firstElementChild as HTMLElement).offsetWidth + 20;
        setActive(Math.round(element.scrollLeft / width));
        setAtEnd(element.scrollLeft + element.clientWidth >= element.scrollWidth - 4);
      }}>
        {steps.map((step, index) => <article className={`${styles.card} ${active === index ? styles.active : ""}`} key={step.name}>
          <div className={styles.cardCopy}><div className={styles.tags}><span><Icon name={["search", "home", "handshake", "document", "key"][index]} size={18} /> {step.name}</span><span>{step.tag}</span></div><h3>{step.title}</h3><p>{step.copy}</p></div>
          <div className={styles.scene}>
            <Image src={`/how-${images[index]}.png`} alt={`Illustrative scene for ${step.name.toLowerCase()}`} fill sizes="(max-width: 600px) 86vw, (max-width: 1000px) 39vw, 420px" />
            <span className={styles.note}>{step.note}</span><Link href={step.href}>{step.action}<span aria-hidden="true">↗</span></Link>
          </div>
        </article>)}
      </div>
      <div className={styles.footer}><span>FROM THE FIRST SEARCH TO THE FIRST NIGHT HOME.</span><span>Five steps. Your pace. <span aria-hidden="true">↗</span></span></div>
    </section>
  );
}
