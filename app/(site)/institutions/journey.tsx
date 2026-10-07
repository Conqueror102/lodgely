"use client";

import { useEffect, useState } from "react";
import Icon from "@/components/ui/icon";
import styles from "./institutions.module.css";

const steps = [
  { icon: "university", title: "Admission", copy: "A student accepts their offer and receives a link to your housing directory." },
  { icon: "search", title: "Discovery", copy: "They browse on- and off-campus options that match their budget and campus." },
  { icon: "shield", title: "Confidence", copy: "Listings show what has been checked, so families can decide with clarity." },
  { icon: "handshake", title: "Connection", copy: "Students connect with owners and book inspections in a few taps." },
  { icon: "key", title: "Arrival", copy: "They arrive with a place to stay and the records they need." },
];

/** An auto-playing student onboarding journey that visitors can also step through. */
export default function Journey() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = setInterval(() => setActive(index => (index + 1) % steps.length), 3200);
    return () => clearInterval(timer);
  }, [paused]);
  const step = steps[active];
  return (
    <div className={styles.journey} onPointerEnter={() => setPaused(true)} onPointerLeave={() => setPaused(false)}>
      <div className={styles.track} role="tablist" aria-label="Student onboarding journey">
        <span className={styles.trackFill} style={{ width: `${(active / (steps.length - 1)) * 100}%` }} />
        {steps.map((item, index) => <button key={item.title} role="tab" aria-selected={active === index} className={index <= active ? styles.reached : ""} onClick={() => { setActive(index); setPaused(true); }}>
          <span><Icon name={item.icon} size={20} /></span>{item.title}
        </button>)}
      </div>
      <div className={styles.stage} key={active}>
        <span className={styles.stageNumber}>{String(active + 1).padStart(2, "0")}</span>
        <div><h3>{step.title}</h3><p>{step.copy}</p></div>
      </div>
    </div>
  );
}
