"use client";

import { useEffect, useRef, useState } from "react";
import styles from "../guides.module.css";

/** Reading progress bar plus a table of contents that tracks the section on screen. */
export function ReadingProgress({ sections }: { sections: string[] }) {
  const bar = useRef<HTMLSpanElement>(null);
  const [current, setCurrent] = useState(0);
  useEffect(() => {
    const article = document.getElementById("article");
    const onScroll = () => {
      if (!article) return;
      const box = article.getBoundingClientRect();
      const progress = Math.min(1, Math.max(0, -box.top / (box.height - window.innerHeight)));
      bar.current?.style.setProperty("transform", `scaleX(${progress})`);
      const headings = sections.map((_, index) => document.getElementById(`section-${index}`));
      const index = headings.reduce((found, heading, i) => heading && heading.getBoundingClientRect().top < window.innerHeight * 0.35 ? i : found, 0);
      setCurrent(index);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [sections]);
  return (
    <nav className={styles.toc} aria-label="In this guide">
      <span className={styles.tocLabel}>IN THIS GUIDE</span>
      <span className={styles.tocBar}><span ref={bar} /></span>
      <ol>{sections.map((title, index) => <li key={title}><a href={`#section-${index}`} aria-current={current === index ? "true" : undefined}>{title}</a></li>)}</ol>
    </nav>
  );
}

/** A tickable checklist; progress is remembered for this visit only. */
export function Checklist({ items }: { items: string[] }) {
  const [done, setDone] = useState<number[]>([]);
  return (
    <div className={styles.checklist}>
      <div className={styles.checkHead}><span>YOUR CHECKLIST</span><span aria-live="polite">{done.length} / {items.length}</span></div>
      {items.map((item, index) => <label key={item} className={done.includes(index) ? styles.ticked : ""}>
        <input type="checkbox" checked={done.includes(index)} onChange={() => setDone(done.includes(index) ? done.filter(i => i !== index) : [...done, index])} />
        <span className={styles.box} aria-hidden="true">✓</span>{item}
      </label>)}
      {done.length === items.length && <p className={styles.allDone}>All checked. Nice work. ✳</p>}
    </div>
  );
}
