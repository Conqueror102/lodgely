"use client";

import Link from "next/link";
import { useState, type CSSProperties } from "react";
import Icon from "@/components/ui/icon";
import ListingCard from "@/components/ui/listing-card";
import { listings } from "@/data/listings";
import { universities } from "@/data/places";
import styles from "./student.module.css";

/** Pick a university and watch nearby places line up by travel time. */
export default function CampusPicker() {
  const [selected, setSelected] = useState(universities[0].slug);
  const university = universities.find(item => item.slug === selected)!;
  const nearby = listings.filter(listing => listing.university === selected).sort((a, b) => (a.campusMinutes ?? 0) - (b.campusMinutes ?? 0));
  const inCity = listings.filter(listing => listing.city === university.city && listing.university !== selected);
  const shown = [...nearby, ...inCity].slice(0, 3);
  return (
    <div className={styles.picker}>
      <div className={styles.uniList} role="group" aria-label="Choose your university">
        {universities.map(item => <button key={item.slug} aria-pressed={selected === item.slug} onClick={() => setSelected(item.slug)}>
          <span className={styles.uniShort}>{item.short}</span><span className={styles.uniName}>{item.name}<small>{item.campus}</small></span>
        </button>)}
      </div>
      <div className={styles.pickerBody} key={selected}>
        <div className={styles.radar} aria-hidden="true">
          <span className={styles.radarCampus}><Icon name="university" size={22} />{university.short}</span>
          {[10, 20, 30].map(ring => <span key={ring} className={styles.radarRing} style={{ width: `${ring * 3.2}%`, height: `${ring * 3.2}%` }}><small>{ring} min</small></span>)}
          {nearby.map((listing, index) => <span key={listing.slug} className={styles.radarDot} style={{ "--angle": `${index * 115 + 30}deg`, "--dist": (listing.campusMinutes ?? 10) * 1.6 } as CSSProperties}>{listing.area}</span>)}
          <span className={styles.radarSweep} />
        </div>
        <div className={styles.pickerInfo}>
          <span className={styles.label}>AROUND {university.short.toUpperCase()}</span>
          <h3>{university.name}</h3>
          <p>{university.intro}</p>
          <div className={styles.areas}>{university.nearby.map(area => <span key={area}>{area}</span>)}</div>
          <div className={styles.pickerLinks}>
            <Link href={`/universities/${university.slug}`} className={styles.dark}>Accommodation near {university.short} <span aria-hidden="true">↗</span></Link>
            <Link href={`/accommodation?university=${university.slug}`} className={styles.ghostLink}>See all places <span aria-hidden="true">↗</span></Link>
          </div>
        </div>
      </div>
      <div className={styles.pickerListings}>{shown.map(listing => <ListingCard key={listing.slug} listing={listing} />)}</div>
    </div>
  );
}
