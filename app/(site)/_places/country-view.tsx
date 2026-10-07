import Link from "next/link";
import { CtaBand, FeatureTiles, LinkCards, SectionHead } from "@/components/ui/blocks";
import ListingCard from "@/components/ui/listing-card";
import Marquee from "@/components/ui/marquee";
import PageHero from "@/components/ui/page-hero";
import kit from "@/components/ui/kit.module.css";
import { listings } from "@/data/listings";
import { citiesIn, getCountry, universitiesIn, type CountrySlug } from "@/data/places";
import CountryMap from "./country-map";
import styles from "./places.module.css";

export default function CountryView({ slug }: { slug: CountrySlug }) {
  const country = getCountry(slug)!;
  const cities = citiesIn(slug);
  const universities = universitiesIn({ country: slug });
  const inCountry = listings.filter(listing => listing.country === slug);
  return (
    <div className={kit.page}>
      <PageHero crumbs={[{ label: "Find Accommodation", href: "/accommodation" }, { label: country.name }]} eyebrow={`Accommodation in ${country.name}`} watermark={country.watermark}
        title={<>Find your place<br />in <em>{country.name}.</em></>} lead={<p>{country.intro}</p>}
        aside={<CountryMap country={slug} cities={cities} label={country.name} />}>
        <div className={kit.actions}>
          <Link href={`/accommodation?country=${slug}`} className={kit.primary}>Search {country.name} <span aria-hidden="true">↗</span></Link>
          <Link href="#cities" className={kit.ghost}>Explore cities <span aria-hidden="true">↓</span></Link>
        </div>
      </PageHero>

      <div className={styles.facts}>{country.facts.map((fact, index) => <div key={fact.label} className={styles.fact} style={{ animationDelay: `${index * 80}ms` }}><span>{fact.label}</span><strong>{fact.value}</strong></div>)}</div>

      <section className={kit.section} id="cities">
        <SectionHead kicker={`Cities in ${country.name}`} aside="Active cities only" title={<>Where in {country.name}<br /><em>are you headed?</em></>} copy="We only list cities where Lodgely has useful local information or accommodation to show." />
        <LinkCards columns={cities.length >= 3 ? 3 : 2} items={cities.map(city => ({ title: city.name, copy: city.tagline, href: `/${slug}/${city.slug}`, icon: "location", label: city.region }))} />
      </section>

      <Marquee items={cities.flatMap(city => city.neighbourhoods.map(hood => `${hood.name}, ${city.name}`))} />

      <section className={kit.section}>
        <SectionHead kicker="Local knowledge" aside={country.rentRhythm} title={<>Renting in {country.name},<br /><em>the practical bits.</em></>} />
        <FeatureTiles items={country.tips.map((tip, index) => ({ ...tip, icon: ["money", "document", "search"][index] }))} />
      </section>

      <section className={kit.section}>
        <SectionHead kicker="Universities" title={<>Studying in {country.name}?</>} copy="Find accommodation near your campus." />
        <LinkCards columns={universities.length >= 3 ? 3 : 2} items={universities.map(university => ({ title: university.name, copy: university.campus, href: `/universities/${university.slug}`, icon: "university", label: university.short }))} />
      </section>

      <section className={kit.section}>
        <SectionHead kicker={`Places in ${country.name}`} aside="Sample listings" title={<>A few places <em>to start.</em></>} copy={<Link href={`/accommodation?country=${slug}`} style={{ textDecoration: "underline" }}>See every place in {country.name} ↗</Link>} />
        <div className={styles.listingGrid}>{inCountry.slice(0, 6).map(listing => <ListingCard key={listing.slug} listing={listing} />)}</div>
      </section>

      <section className={kit.section}>
        <CtaBand eyebrow={`Lodgely in ${country.name}`} title={<>Your next home starts<br /><em>with Lodgely.</em></>} copy="Search accommodation. Discover properties. Connect with housing partners." actions={[{ label: "Find accommodation", href: `/accommodation?country=${slug}`, primary: true }, { label: "List your property", href: "/list-your-property" }]} />
      </section>
    </div>
  );
}
