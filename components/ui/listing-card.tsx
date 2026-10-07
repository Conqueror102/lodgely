"use client";

import Image from "next/image";
import Link from "next/link";
import Icon from "@/components/ui/icon";
import { formatPrice, periodLabel, type Listing } from "@/data/listings";
import { universities } from "@/data/places";
import { toggleSaved, useSaved } from "@/lib/saved";
import { Spotlight } from "@/components/ui/motion";
import styles from "@/components/ui/listing-card.module.css";

const dateLabel = (iso: string) => new Date(`${iso}T00:00:00`).toLocaleDateString("en-GB", { day: "numeric", month: "short" });

export default function ListingCard({ listing, compare, onCompare, highlighted, onHover, layout = "grid" }: {
  listing: Listing; compare?: boolean; onCompare?: () => void; highlighted?: boolean; onHover?: (slug: string | null) => void; layout?: "grid" | "row";
}) {
  const saved = useSaved().includes(listing.slug);
  const university = universities.find(item => item.slug === listing.university);
  return (
    <Spotlight as="article" className={`${styles.card} ${styles[listing.tone]} ${highlighted ? styles.highlighted : ""} ${layout === "row" ? styles.row : ""}`}
      onPointerEnter={() => onHover?.(listing.slug)} onPointerLeave={() => onHover?.(null)}>
      <div className={styles.media}>
        <Image src={listing.images[0]} alt={`Illustrative image for ${listing.title}`} fill sizes="(max-width: 700px) 92vw, (max-width: 1200px) 45vw, 30vw" className={listing.images[0].includes("cutout") || listing.images[0].includes("hero-apartments") ? styles.contain : ""} />
        <span className={styles.sample}>Sample listing</span>
        <button className={`${styles.heart} ${saved ? styles.saved : ""}`} aria-pressed={saved} aria-label={saved ? `Remove ${listing.title} from saved` : `Save ${listing.title}`} onClick={() => toggleSaved(listing.slug)}>{saved ? "♥" : "♡"}</button>
        <span className={styles.type}>{listing.type}</span>
      </div>
      <div className={styles.body}>
        <div className={styles.where}><Icon name="location" size={15} />{listing.area}, {listing.city[0].toUpperCase() + listing.city.slice(1)}</div>
        <h3><Link href={`/properties/${listing.slug}`} className={styles.link}>{listing.title}</Link></h3>
        {university && <div className={styles.campus}><Icon name="university" size={15} />{listing.campusMinutes} min to {university.short}</div>}
        <div className={styles.facts}><span><Icon name="bed" size={15} />{listing.bedrooms} bed</span><span>{listing.bathrooms} bath</span><span><Icon name="calendar" size={15} />From {dateLabel(listing.availableFrom)}</span></div>
        <div className={styles.bottom}>
          <span className={styles.price}><strong>{formatPrice(listing)}</strong> {periodLabel[listing.period]}</span>
          {onCompare && <label className={styles.compare}><input type="checkbox" checked={!!compare} onChange={onCompare} /><span>Compare</span></label>}
          <span className={styles.go} aria-hidden="true">↗</span>
        </div>
      </div>
    </Spotlight>
  );
}
