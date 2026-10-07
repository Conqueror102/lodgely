import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Icon from "@/components/ui/icon";
import { CtaBand, FeatureTiles, SectionHead } from "@/components/ui/blocks";
import ListingCard from "@/components/ui/listing-card";
import { Reveal } from "@/components/ui/motion";
import PageHero from "@/components/ui/page-hero";
import kit from "@/components/ui/kit.module.css";
import { listings } from "@/data/listings";
import { getCity, getCountry, getUniversity, universities } from "@/data/places";
import styles from "./university.module.css";

export const dynamicParams = false;
export function generateStaticParams() { return universities.map(university => ({ slug: university.slug })); }

export async function generateMetadata({ params }: PageProps<"/universities/[slug]">): Promise<Metadata> {
  const university = getUniversity((await params).slug);
  return university ? { title: `${university.name} Accommodation | Lodgely`, description: `Find student accommodation near ${university.name} (${university.short}). ${university.intro}` } : {};
}

export default async function UniversityPage({ params }: PageProps<"/universities/[slug]">) {
  const university = getUniversity((await params).slug);
  if (!university) notFound();
  const city = getCity(university.country, university.city)!;
  const country = getCountry(university.country)!;
  const near = listings.filter(listing => listing.university === university.slug).sort((a, b) => (a.campusMinutes ?? 0) - (b.campusMinutes ?? 0));
  const more = listings.filter(listing => listing.city === university.city && listing.university !== university.slug);
  return (
    <div className={kit.page}>
      <PageHero crumbs={[{ label: "Universities", href: "/universities" }, { label: university.name }]} eyebrow={`${university.short} · ${city.name}, ${country.name}`} watermark={university.short}
        title={<>Accommodation near<br /><em>{university.name}.</em></>} lead={<p>{university.intro}</p>}
        aside={<div className={styles.campusCard}>
          <span className={styles.badge}><Icon name="university" size={30} /></span>
          <span className={styles.short}>{university.short}</span>
          <dl>
            <div><dt>Campus</dt><dd>{university.campus}</dd></div>
            <div><dt>City</dt><dd><Link href={`/${country.slug}/${city.slug}`}>{city.name}, {country.name} ↗</Link></dd></div>
            <div><dt>Nearby areas</dt><dd>{university.nearby.join(" · ")}</dd></div>
            <div><dt>Sample places nearby</dt><dd>{near.length}</dd></div>
          </dl>
          <span className={styles.orbit} aria-hidden="true" />
        </div>}>
        <div className={kit.actions}>
          <Link href={`/accommodation?university=${university.slug}`} className={kit.primary}>Search near {university.short} <span aria-hidden="true">↗</span></Link>
          <Link href={`/accommodation?university=${university.slug}&view=map`} className={kit.ghost}>See it on the map <span aria-hidden="true">↗</span></Link>
        </div>
      </PageHero>

      <section className={kit.section}>
        <SectionHead kicker="Where students live" title={<>Neighbourhoods around <em>{university.short}.</em></>} copy="Tap an area to search places there." />
        <div className={styles.areas}>{university.nearby.map((area, index) => <Reveal key={area} delay={index * 80}><Link href={`/accommodation?q=${encodeURIComponent(area)}`} className={styles.area}><span>{String(index + 1).padStart(2, "0")}</span>{area}<em aria-hidden="true">↗</em></Link></Reveal>)}</div>
      </section>

      <section className={kit.section}>
        <SectionHead kicker="Campus housing tips" title={<>Before you sign <em>near {university.short}.</em></>} />
        <FeatureTiles numbered items={university.tips.map(tip => ({ title: tip.split(/[.,]/)[0], copy: tip }))} />
      </section>

      <section className={kit.section}>
        <SectionHead kicker={`Places near ${university.short}`} aside="Sample listings" title={<>Closest <em>first.</em></>} />
        <div className={styles.grid}>{[...near, ...more].slice(0, 6).map(listing => <ListingCard key={listing.slug} listing={listing} />)}</div>
      </section>

      <section className={kit.section}>
        <CtaBand eyebrow={`Work at ${university.short}?`} title={<>Let’s improve student<br /><em>accommodation access.</em></>} actions={[{ label: "Partner with Lodgely", href: "/institutions", primary: true }, { label: "All universities", href: "/universities" }]} />
      </section>
    </div>
  );
}
