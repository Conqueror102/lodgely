import type { Metadata } from "next";
import { seo } from "@/lib/seo";
import Link from "next/link";
import { notFound } from "next/navigation";
import Icon from "@/components/ui/icon";
import Breadcrumbs from "@/components/ui/breadcrumbs";
import ListingCard from "@/components/ui/listing-card";
import { Reveal } from "@/components/ui/motion";
import { formatPrice, getListing, listings, periodLabel } from "@/data/listings";
import { getCity, getCountry, universities } from "@/data/places";
import Gallery from "./gallery";
import ActionCard from "./action-card";
import SaveButton from "./save-button";
import styles from "./property.module.css";

export function generateStaticParams() {
  return listings.map(listing => ({ slug: listing.slug }));
}

export async function generateMetadata({ params }: PageProps<"/properties/[slug]">): Promise<Metadata> {
  const listing = getListing((await params).slug);
  if (!listing) return {};
  return seo({ title: `${listing.title} | Lodgely`, description: listing.summary, path: `/properties/${listing.slug}`, noindex: true });
}

const amenityIcon = (amenity: string) => /wi-?fi|internet/i.test(amenity) ? "cloud" : /water/i.test(amenity) ? "settings" : /secur/i.test(amenity) ? "shield" : /desk|reading/i.test(amenity) ? "student-center" : /bed|wardrobe/i.test(amenity) ? "bed" : /kitchen|breakfast/i.test(amenity) ? "home" : /meter|power|air/i.test(amenity) ? "settings" : /parking|garden|balcony/i.test(amenity) ? "location" : "checkmark";

export default async function PropertyPage({ params }: PageProps<"/properties/[slug]">) {
  const listing = getListing((await params).slug);
  if (!listing) notFound();
  const city = getCity(listing.country, listing.city)!;
  const country = getCountry(listing.country)!;
  const university = universities.find(item => item.slug === listing.university);
  const neighbourhood = city.neighbourhoods.find(item => item.name === listing.area);
  const similar = listings.filter(item => item.slug !== listing.slug && (item.city === listing.city || item.type === listing.type)).slice(0, 3);
  const available = new Date(`${listing.availableFrom}T00:00:00`).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
  const highlights = [
    { icon: "bed", label: `${listing.bedrooms} bedroom${listing.bedrooms > 1 ? "s" : ""}` },
    { icon: "home", label: `${listing.bathrooms} bathroom${listing.bathrooms > 1 ? "s" : ""}` },
    ...(listing.size ? [{ icon: "apartment", label: listing.size }] : []),
    { icon: "key", label: listing.furnished ? "Furnished" : "Unfurnished" },
    ...(university ? [{ icon: "university", label: `${listing.campusMinutes} min to ${university.short}` }] : []),
  ];

  return (
    <article className={styles.page}>
      <header className={styles.head}>
        <Breadcrumbs items={[{ label: "Find Accommodation", href: "/accommodation" }, { label: city.name, href: `/${country.slug}/${city.slug}` }, { label: listing.title }]} />
        <div className={styles.titleRow}>
          <div>
            <div className={styles.tags}><span className={styles.type}>{listing.type}</span><span className={styles.sample}>Sample listing · preview only</span></div>
            <h1>{listing.title}</h1>
            <p className={styles.where}><Icon name="location" size={18} />{listing.area}, {city.name}, {country.name}</p>
          </div>
          <SaveButton slug={listing.slug} title={listing.title} />
        </div>
      </header>

      <Gallery images={listing.images} title={listing.title} />

      <div className={styles.layout}>
        <div className={styles.main}>
          <Reveal className={styles.highlights}>{highlights.map(item => <span key={item.label}><Icon name={item.icon} size={22} />{item.label}</span>)}</Reveal>

          <Reveal as="section" className={styles.block}>
            <span className={styles.label}>ABOUT THIS PLACE</span>
            <p className={styles.summary}>{listing.summary}</p>
            {listing.description.map(paragraph => <p key={paragraph} className={styles.text}>{paragraph}</p>)}
          </Reveal>

          <Reveal as="section" className={styles.block}>
            <span className={styles.label}>WHAT’S HERE</span>
            <h2>Amenities</h2>
            <div className={styles.amenities}>{listing.amenities.map((amenity, index) => <span key={amenity} style={{ animationDelay: `${index * 60}ms` }}><Icon name={amenityIcon(amenity)} size={22} />{amenity}</span>)}</div>
          </Reveal>

          <Reveal as="section" className={`${styles.block} ${styles.location}`}>
            <div>
              <span className={styles.label}>THE NEIGHBOURHOOD</span>
              <h2>Life in {listing.area}</h2>
              {neighbourhood && <p className={styles.text}>{neighbourhood.vibe}</p>}
              <div className={styles.goodFor}>{neighbourhood?.goodFor.map(tag => <span key={tag}>{tag}</span>)}</div>
              <div className={styles.locLinks}>
                <Link href={`/${country.slug}/${city.slug}`}>Explore {city.name} ↗</Link>
                {university && <Link href={`/universities/${university.slug}`}>Near {university.short} ↗</Link>}
              </div>
            </div>
            <div className={styles.miniMap} aria-hidden="true">
              <span className={styles.ring} /><span className={styles.ring2} />
              <span className={styles.youPin}><Icon name="home" size={20} /></span>
              {university && <span className={styles.uniPin}><Icon name="university" size={16} />{university.short} · {listing.campusMinutes} min</span>}
              <span className={styles.areaName}>{listing.area}</span>
            </div>
          </Reveal>

          <Reveal as="section" className={styles.block}>
            <span className={styles.label}>AVAILABILITY</span>
            <h2>Available from {available}</h2>
            <ol className={styles.timeline}>
              {[["Enquire", "Ask your questions and confirm the details."], ["Inspect", "Visit in person or by live video."], ["Agree", "Review the terms and every cost in writing."], ["Move in", "Collect your keys and keep your records safe."]].map(([step, copy], index) => <li key={step}><span>{String(index + 1).padStart(2, "0")}</span><strong>{step}</strong><small>{copy}</small></li>)}
            </ol>
          </Reveal>

          <Reveal as="section" className={styles.safety}>
            <Icon name="shield" size={30} />
            <div><strong>Before you pay anything</strong><p>Do well to verify the amenities, conditions, prices, availability on the platform before booking/making payment. You can chat with a support team for further information or verification.</p></div>
            <Link href="/trust-and-safety">Safety guide ↗</Link>
          </Reveal>
        </div>

        <aside className={styles.aside}>
          <ActionCard listing={{ slug: listing.slug, title: listing.title, country: listing.country, price: listing.price, period: listing.period, moveInCosts: listing.moveInCosts, listedBy: listing.listedBy, availableFrom: listing.availableFrom }} priceLabel={`${formatPrice(listing)} ${periodLabel[listing.period]}`} />
        </aside>
      </div>

      <section className={styles.similar}>
        <div className={styles.similarHead}><h2>You might also like</h2><Link href={`/accommodation?city=${listing.city}`}>More in {city.name} ↗</Link></div>
        <div className={styles.similarGrid}>{similar.map(item => <ListingCard key={item.slug} listing={item} />)}</div>
      </section>
    </article>
  );
}
