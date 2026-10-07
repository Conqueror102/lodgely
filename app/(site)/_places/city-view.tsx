import Link from "next/link";
import { CtaBand, FeatureTiles, LinkCards, SectionHead } from "@/components/ui/blocks";
import ListingCard from "@/components/ui/listing-card";
import PageHero from "@/components/ui/page-hero";
import kit from "@/components/ui/kit.module.css";
import { listings } from "@/data/listings";
import { getCountry, universitiesIn, type City } from "@/data/places";
import Neighbourhoods from "./neighbourhoods";
import styles from "./places.module.css";

export default function CityView({ city }: { city: City }) {
  const country = getCountry(city.country)!;
  const universities = universitiesIn({ city: city.slug });
  const inCity = listings.filter(listing => listing.city === city.slug);
  const counts = Object.fromEntries(city.neighbourhoods.map(hood => [hood.name, inCity.filter(listing => listing.area === hood.name).length]));
  return (
    <div className={kit.page}>
      <PageHero crumbs={[{ label: country.name, href: `/${country.slug}` }, { label: city.name }]} eyebrow={`${city.region}, ${country.name}`} watermark={city.name.toLowerCase()}
        title={<>{city.name}.<br /><em>{city.tagline}</em></>} lead={<p>{city.intro}</p>}
        image={city.country === "rwanda" ? "/how-search.png" : "/how-explore.png"} imageAlt={`Illustrative accommodation scene for ${city.name}`}
        stamp={{ top: "LOCAL GUIDE", main: <>{city.name}<br />living.</>, bottom: "FIND YOUR CORNER" }}>
        <div className={kit.actions}>
          <Link href={`/accommodation?city=${city.slug}`} className={kit.primary}>Search {city.name} <span aria-hidden="true">↗</span></Link>
          <Link href={`/accommodation?city=${city.slug}&view=map`} className={kit.ghost}>Open the map <span aria-hidden="true">↗</span></Link>
        </div>
      </PageHero>

      <section className={kit.section}>
        <SectionHead kicker="Neighbourhoods" aside="Hover or tap to explore" title={<>Find your corner<br /><em>of {city.name}.</em></>} />
        <Neighbourhoods city={city} counts={counts} />
      </section>

      {universities.length > 0 && <section className={kit.section}>
        <SectionHead kicker={`Universities in ${city.name}`} title={<>Near your <em>campus.</em></>} />
        <LinkCards columns={universities.length >= 3 ? 3 : 2} items={universities.map(university => ({ title: university.name, copy: university.intro, href: `/universities/${university.slug}`, icon: "university", label: university.short }))} />
      </section>}

      <section className={kit.section}>
        <SectionHead kicker="Housing guidance" title={<>Good to know <em>before you move.</em></>} copy={<Link href="/guides" style={{ textDecoration: "underline" }}>More guides ↗</Link>} />
        <FeatureTiles items={city.guidance.map((item, index) => ({ ...item, icon: ["location", "settings", "shield"][index] }))} />
      </section>

      <section className={kit.section}>
        <SectionHead kicker={`Places in ${city.name}`} aside="Sample listings" title={<>Local <em>accommodation.</em></>} />
        <div className={styles.listingGrid}>{inCity.map(listing => <ListingCard key={listing.slug} listing={listing} />)}</div>
      </section>

      <section className={kit.section}>
        <CtaBand eyebrow={`Own a property in ${city.name}?`} title={<>Your space.<br /><em>Their next chapter.</em></>} actions={[{ label: "List your property", href: "/list-your-property", primary: true }, { label: "For property owners", href: "/landlords" }]} />
      </section>
    </div>
  );
}
