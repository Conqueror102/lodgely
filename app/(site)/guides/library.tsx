"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import Icon from "@/components/ui/icon";
import { guideCategories, guides } from "@/data/guides";
import styles from "./guides.module.css";

export default function Library() {
  const [category, setCategory] = useState("All");
  const [query, setQuery] = useState("");
  const visible = useMemo(() => guides.filter(guide => (category === "All" || guide.category === category) && `${guide.title} ${guide.excerpt} ${guide.category}`.toLowerCase().includes(query.toLowerCase().trim())), [category, query]);
  const [featured, ...rest] = visible;
  return (
    <div className={styles.library}>
      <div className={styles.controls}>
        <div className={styles.filters} role="group" aria-label="Filter guides by category">
          {["All", ...guideCategories].map(item => <button key={item} aria-pressed={category === item} onClick={() => setCategory(item)}>{item}<span>{item === "All" ? guides.length : guides.filter(guide => guide.category === item).length}</span></button>)}
        </div>
        <label className={styles.search}><Icon name="search" size={18} /><span className="sr-only">Search guides</span><input value={query} onChange={event => setQuery(event.target.value)} placeholder="Search guides…" /></label>
      </div>
      {!featured && <p className={styles.none}>No guides match that yet. Try another topic.</p>}
      {featured && <Link href={`/guides/${featured.slug}`} className={styles.featured} key={featured.slug}>
        <div className={styles.featuredImage}><Image src={featured.image} alt="" fill sizes="(max-width: 900px) 92vw, 50vw" /></div>
        <div className={styles.featuredBody}>
          <span className={styles.meta}>{featured.category} · {featured.minutes} min read</span>
          <h2>{featured.title}</h2><p>{featured.excerpt}</p>
          <span className={styles.read}>Read the guide <span aria-hidden="true">↗</span></span>
        </div>
      </Link>}
      <div className={styles.grid}>
        {rest.map((guide, index) => <Link key={guide.slug} href={`/guides/${guide.slug}`} className={`${styles.card} ${styles[guide.tone]}`} style={{ animationDelay: `${index * 60}ms` }}>
          <div className={styles.cardImage}><Image src={guide.image} alt="" fill sizes="(max-width: 700px) 92vw, 30vw" /></div>
          <span className={styles.meta}>{guide.category} · {guide.minutes} min</span>
          <h3>{guide.title}</h3><p>{guide.excerpt}</p>
          <span className={styles.arrow} aria-hidden="true">↗</span>
        </Link>)}
      </div>
    </div>
  );
}
