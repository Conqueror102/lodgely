"use client";

import Link from "next/link";
import { useState } from "react";
import Icon from "@/components/ui/icon";
import type { City } from "@/data/places";
import styles from "./places.module.css";

const shapes = {
  nigeria: "M14 34 C 18 18, 40 10, 58 14 C 74 10, 90 18, 92 34 C 96 50, 86 60, 80 72 C 72 88, 52 92, 38 86 C 22 90, 10 82, 10 66 C 6 54, 10 44, 14 34 Z",
  rwanda: "M20 30 C 30 14, 54 10, 72 18 C 88 24, 94 42, 88 58 C 84 74, 70 88, 50 88 C 32 90, 16 78, 12 62 C 8 50, 12 40, 20 30 Z",
};

/** An illustrative (not geographic) country shape with clickable city markers. */
export default function CountryMap({ country, cities, label }: { country: "nigeria" | "rwanda"; cities: City[]; label: string }) {
  const [active, setActive] = useState(cities[0]?.slug);
  const city = cities.find(item => item.slug === active);
  return (
    <div className={styles.countryMap}>
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        <defs><pattern id={`dots-${country}`} width="3" height="3" patternUnits="userSpaceOnUse"><circle cx="1.5" cy="1.5" r=".55" fill="#9fb592" /></pattern></defs>
        <path d={shapes[country]} className={styles.shape} />
        <path d={shapes[country]} fill={`url(#dots-${country})`} className={styles.shapeDots} />
      </svg>
      <span className={styles.mapTitle}>{label}</span>
      {cities.map(item => <button key={item.slug} className={`${styles.cityDot} ${active === item.slug ? styles.cityDotActive : ""}`} style={{ left: `${item.map.x}%`, top: `${item.map.y}%` }}
        onPointerEnter={() => setActive(item.slug)} onFocus={() => setActive(item.slug)} onClick={() => setActive(item.slug)} aria-label={`Show ${item.name}`} aria-pressed={active === item.slug}>
        <span className={styles.pulse} /><span className={styles.cityName}>{item.name}</span>
      </button>)}
      {city && <div className={styles.cityPop} key={city.slug}>
        <span className={styles.popLabel}><Icon name="location" size={14} />{city.region}</span>
        <strong>{city.name}</strong>
        <p>{city.tagline}</p>
        <Link href={`/${city.country}/${city.slug}`}>Explore {city.name} <span aria-hidden="true">↗</span></Link>
      </div>}
      <span className={styles.mapCaption}>Illustrative map · active cities only</span>
    </div>
  );
}
