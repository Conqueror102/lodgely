"use client";

import Link from "next/link";
import { useState } from "react";
import type { City } from "@/data/places";
import styles from "./places.module.css";

export default function Neighbourhoods({ city, counts }: { city: City; counts: Record<string, number> }) {
  const [active, setActive] = useState(0);
  const place = city.neighbourhoods[active];
  return (
    <div className={styles.hoods}>
      <div className={styles.hoodTabs} role="tablist" aria-label={`Neighbourhoods in ${city.name}`}>
        {city.neighbourhoods.map((item, index) => <button key={item.name} role="tab" aria-selected={active === index} onClick={() => setActive(index)} onPointerEnter={() => setActive(index)}>
          <span className={styles.hoodIndex}>{String(index + 1).padStart(2, "0")}</span>{item.name}<span aria-hidden="true">↗</span>
        </button>)}
      </div>
      <div className={styles.hoodPanel} role="tabpanel" key={place.name}>
        <span className={styles.hoodWord} aria-hidden="true">{place.name}</span>
        <span className={styles.popLabel}>NEIGHBOURHOOD GUIDE</span>
        <h3>{place.name}</h3>
        <p>{place.vibe}</p>
        <div className={styles.goodFor}><span>Good for</span>{place.goodFor.map(tag => <em key={tag}>{tag}</em>)}</div>
        <div className={styles.hoodFoot}>
          <span><strong>{counts[place.name] ?? 0}</strong> sample place{(counts[place.name] ?? 0) === 1 ? "" : "s"} here</span>
          <Link href={`/accommodation?q=${encodeURIComponent(place.name)}&city=${city.slug}`}>Search {place.name} <span aria-hidden="true">↗</span></Link>
        </div>
      </div>
    </div>
  );
}
