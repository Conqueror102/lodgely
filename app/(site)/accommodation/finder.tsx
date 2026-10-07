"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import Icon from "@/components/ui/icon";
import Breadcrumbs from "@/components/ui/breadcrumbs";
import ListingCard from "@/components/ui/listing-card";
import { useSaved } from "@/lib/saved";
import { formatPrice, listings, periodLabel, propertyTypes, type Listing } from "@/data/listings";
import { cities, countries, universities } from "@/data/places";
import styles from "./finder.module.css";

export type Filters = {
  q: string; country: string; city: string; university: string; types: string[]; budget: number;
  moveIn: string; furnished: boolean; savedOnly: boolean; sort: string; view: "grid" | "map";
};

const blank: Filters = { q: "", country: "", city: "", university: "", types: [], budget: 0, moveIn: "", furnished: false, savedOnly: false, sort: "recommended", view: "grid" };
const budgetRange = { nigeria: { max: 300000, step: 10000 }, rwanda: { max: 800000, step: 10000 } } as const;
const sorts = [
  { id: "recommended", label: "Recommended" }, { id: "price-asc", label: "Price: low to high" }, { id: "price-desc", label: "Price: high to low" },
  { id: "campus", label: "Closest to campus" }, { id: "available", label: "Soonest available" },
];

/** Monthly equivalent, so yearly, monthly and nightly prices can share one budget slider. */
export const monthly = (listing: Pick<Listing, "price" | "period">) => listing.period === "year" ? listing.price / 12 : listing.period === "night" ? listing.price * 30 : listing.price;
const moveInTotal = (listing: Listing) => listing.moveInCosts.reduce((sum, cost) => sum + cost.amount, 0);
const titleCase = (text: string) => text[0].toUpperCase() + text.slice(1);

export default function Finder({ initial }: { initial: Filters }) {
  const [filters, setFilters] = useState<Filters>(initial);
  const [compare, setCompare] = useState<string[]>([]);
  const [hovered, setHovered] = useState<string | null>(null);
  const [mapCity, setMapCity] = useState(initial.city || "lagos");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const compareDialog = useRef<HTMLDialogElement>(null);
  const saved = useSaved();
  const set = (patch: Partial<Filters>) => setFilters(current => ({ ...current, ...patch }));

  // Keep the URL shareable as filters change.
  useEffect(() => {
    const params = new URLSearchParams();
    if (filters.q) params.set("q", filters.q);
    if (filters.country) params.set("country", filters.country);
    if (filters.city) params.set("city", filters.city);
    if (filters.university) params.set("university", filters.university);
    if (filters.types.length) params.set("type", filters.types.join(","));
    if (filters.budget) params.set("budget", String(filters.budget));
    if (filters.moveIn) params.set("moveIn", filters.moveIn);
    if (filters.furnished) params.set("furnished", "1");
    if (filters.sort !== "recommended") params.set("sort", filters.sort);
    if (filters.view === "map") params.set("view", "map");
    const search = params.toString();
    window.history.replaceState(null, "", `${window.location.pathname}${search ? `?${search}` : ""}`);
  }, [filters]);

  const results = useMemo(() => {
    const words = filters.q.toLowerCase().split(/\s+/).filter(Boolean);
    const list = listings.filter(listing => {
      const university = universities.find(item => item.slug === listing.university);
      const haystack = `${listing.title} ${listing.area} ${listing.city} ${listing.country} ${listing.type} ${university?.name ?? ""} ${university?.short ?? ""}`.toLowerCase();
      if (words.some(word => !haystack.includes(word))) return false;
      if (filters.country && listing.country !== filters.country) return false;
      if (filters.city && listing.city !== filters.city) return false;
      if (filters.university && listing.university !== filters.university) return false;
      if (filters.types.length && !filters.types.includes(listing.type)) return false;
      if (filters.budget && monthly(listing) > filters.budget) return false;
      if (filters.moveIn && listing.availableFrom > filters.moveIn) return false;
      if (filters.furnished && !listing.furnished) return false;
      if (filters.savedOnly && !saved.includes(listing.slug)) return false;
      return true;
    });
    const sorted = [...list];
    if (filters.sort === "price-asc") sorted.sort((a, b) => monthly(a) - monthly(b));
    if (filters.sort === "price-desc") sorted.sort((a, b) => monthly(b) - monthly(a));
    if (filters.sort === "campus") sorted.sort((a, b) => (a.campusMinutes ?? 999) - (b.campusMinutes ?? 999));
    if (filters.sort === "available") sorted.sort((a, b) => a.availableFrom.localeCompare(b.availableFrom));
    return sorted;
  }, [filters, saved]);

  const cityOptions = cities.filter(city => !filters.country || city.country === filters.country);
  const universityOptions = universities.filter(item => (!filters.country || item.country === filters.country) && (!filters.city || item.city === filters.city));
  const activeCount = [filters.q, filters.country, filters.city, filters.university, filters.budget, filters.moveIn, filters.furnished, filters.savedOnly].filter(Boolean).length + filters.types.length;
  const range = filters.country ? budgetRange[filters.country as keyof typeof budgetRange] : null;
  const shownCity = filters.city || mapCity;
  const mapListings = results.filter(listing => listing.city === shownCity);
  const compared = compare.map(slug => listings.find(listing => listing.slug === slug)!).filter(Boolean);

  function toggleCompare(slug: string) {
    setCompare(current => current.includes(slug) ? current.filter(item => item !== slug) : current.length >= 3 ? [...current.slice(1), slug] : [...current, slug]);
  }

  return (
    <div className={styles.page}>
      <section className={styles.top}>
        <span className={styles.watermark} aria-hidden="true">search.</span>
        <Breadcrumbs items={[{ label: "Find Accommodation" }]} />
        <div className={styles.headline}>
          <div>
            <span className={styles.eyebrow}>FIND ACCOMMODATION WHERE YOU NEED IT</span>
            <h1>Your kind of place,<br /><em>one search away.</em></h1>
          </div>
          <div className={styles.counter} aria-live="polite"><strong key={results.length}>{results.length}</strong><span>{results.length === 1 ? "place matches" : "places match"}<br />your search</span></div>
        </div>
        <form className={styles.searchBar} onSubmit={event => event.preventDefault()} role="search">
          <label className={styles.searchField}><Icon name="location" size={20} /><span className="sr-only">Location or university</span><input value={filters.q} onChange={event => set({ q: event.target.value })} placeholder="City, area or university — try “Yaba” or “ALU”" /></label>
          <label className={styles.inlineField}><Icon name="money" size={18} /><span className="sr-only">Sort results</span><select value={filters.sort} onChange={event => set({ sort: event.target.value })}>{sorts.map(sort => <option key={sort.id} value={sort.id}>{sort.label}</option>)}</select></label>
          <div className={styles.viewToggle} role="group" aria-label="Choose results view">
            <button type="button" aria-pressed={filters.view === "grid"} onClick={() => set({ view: "grid" })}>Grid</button>
            <button type="button" aria-pressed={filters.view === "map"} onClick={() => set({ view: "map" })}>Map</button>
          </div>
          <button type="button" className={styles.filterButton} onClick={() => setFiltersOpen(true)}>Filters{activeCount > 0 && <span>{activeCount}</span>}</button>
        </form>
        <div className={styles.typeChips} role="group" aria-label="Property type">
          {propertyTypes.map((type, index) => {
            const on = filters.types.includes(type);
            return <button key={type} aria-pressed={on} onClick={() => set({ types: on ? filters.types.filter(item => item !== type) : [...filters.types, type] })}>
              <Icon name={["student-center", "apartment", "bed", "home", "user-group-man-man", "calendar"][index]} size={18} />{type}
            </button>;
          })}
        </div>
      </section>

      <div className={styles.layout}>
        <aside className={`${styles.filters} ${filtersOpen ? styles.filtersOpen : ""}`} aria-label="Search filters">
          <div className={styles.filtersHead}><strong>Refine your search</strong><button onClick={() => setFiltersOpen(false)} className={styles.closeFilters}>Done</button></div>

          <fieldset><legend>Country</legend>
            <div className={styles.segment}>
              {[{ slug: "", name: "All" }, ...countries].map(country => <button key={country.slug} aria-pressed={filters.country === country.slug} onClick={() => set({ country: country.slug, city: "", university: "", budget: 0 })}>{country.name}</button>)}
            </div>
          </fieldset>

          <fieldset><legend>City</legend>
            <div className={styles.chips}>
              {cityOptions.map(city => <button key={city.slug} aria-pressed={filters.city === city.slug} onClick={() => { const next = filters.city === city.slug ? "" : city.slug; set({ city: next, country: city.country, university: "" }); if (next) setMapCity(next); }}>{city.name}</button>)}
            </div>
          </fieldset>

          <fieldset><legend>University</legend>
            <select className={styles.select} value={filters.university} onChange={event => { const university = universities.find(item => item.slug === event.target.value); set({ university: event.target.value, ...(university ? { city: university.city, country: university.country } : {}) }); if (university) setMapCity(university.city); }}>
              <option value="">Any university</option>
              {universityOptions.map(item => <option key={item.slug} value={item.slug}>{item.name}</option>)}
            </select>
          </fieldset>

          <fieldset><legend>Budget <small>monthly equivalent</small></legend>
            {range ? <>
              <input className={styles.range} type="range" min={0} max={range.max} step={range.step} value={filters.budget || range.max} onChange={event => set({ budget: Number(event.target.value) >= range.max ? 0 : Number(event.target.value) })} aria-valuetext={filters.budget ? `Up to ${formatPrice({ country: filters.country as Listing["country"], price: filters.budget })} a month` : "Any budget"} />
              <div className={styles.rangeValue}>{filters.budget ? <>Up to <strong>{formatPrice({ country: filters.country as Listing["country"], price: filters.budget })}</strong> / month</> : "Any budget"}</div>
            </> : <p className={styles.hint}>Pick a country to set a budget in local currency.</p>}
          </fieldset>

          <fieldset><legend>Move-in date</legend>
            <input className={styles.select} type="date" value={filters.moveIn} onChange={event => set({ moveIn: event.target.value })} />
            <p className={styles.hint}>Shows places available on or before this date.</p>
          </fieldset>

          <fieldset><legend>More</legend>
            <label className={styles.switch}><input type="checkbox" checked={filters.furnished} onChange={event => set({ furnished: event.target.checked })} /><span />Furnished only</label>
            <label className={styles.switch}><input type="checkbox" checked={filters.savedOnly} onChange={event => set({ savedOnly: event.target.checked })} /><span />Saved places ({saved.length})</label>
          </fieldset>

          {activeCount > 0 && <button className={styles.reset} onClick={() => setFilters({ ...blank, view: filters.view, sort: filters.sort })}>Clear all filters</button>}
        </aside>

        <div className={styles.results}>
          <div className={styles.notice}><Icon name="help" size={18} /><span><strong>Preview:</strong> these are sample listings that show how Lodgely search works. Live listings are coming soon.</span></div>

          {results.length === 0 ? <div className={styles.empty}>
            <span className={styles.emptyArt} aria-hidden="true">?</span>
            <h2>No places match… yet.</h2>
            <p>Try widening your budget, picking a different city or clearing a few filters.</p>
            <button className={styles.reset} onClick={() => setFilters({ ...blank, view: filters.view })}>Clear all filters</button>
          </div> : filters.view === "grid" ? <div className={styles.grid}>
            {results.map((listing, index) => <div key={listing.slug} className={styles.cardWrap} style={{ animationDelay: `${Math.min(index, 8) * 50}ms` }}>
              <ListingCard listing={listing} compare={compare.includes(listing.slug)} onCompare={() => toggleCompare(listing.slug)} />
            </div>)}
          </div> : <div className={styles.mapView}>
            <div className={styles.mapTabs} role="group" aria-label="Choose a city on the map">
              {cities.filter(city => !filters.country || city.country === filters.country).map(city => {
                const count = results.filter(listing => listing.city === city.slug).length;
                return <button key={city.slug} aria-pressed={shownCity === city.slug} disabled={!!filters.city && filters.city !== city.slug} onClick={() => setMapCity(city.slug)}>{city.name}<span>{count}</span></button>;
              })}
            </div>
            <div className={styles.mapSplit}>
              <CityMap city={shownCity} items={mapListings} hovered={hovered} onHover={setHovered} />
              <div className={styles.mapList}>
                {mapListings.length === 0 && <p className={styles.hint}>No matching places in {titleCase(shownCity)} with these filters.</p>}
                {mapListings.map(listing => <ListingCard key={listing.slug} listing={listing} layout="row" highlighted={hovered === listing.slug} onHover={setHovered} compare={compare.includes(listing.slug)} onCompare={() => toggleCompare(listing.slug)} />)}
              </div>
            </div>
          </div>}

          <div className={styles.helpers}>
            <Link href="/accommodation/student-accommodation" className={styles.helper}><Icon name="student-center" size={26} /><span><strong>Looking near campus?</strong><small>Student accommodation, made simple</small></span><span aria-hidden="true">↗</span></Link>
            <Link href="/guides/how-to-avoid-accommodation-scams" className={styles.helper}><Icon name="shield" size={26} /><span><strong>Search safely</strong><small>How to spot and avoid scams</small></span><span aria-hidden="true">↗</span></Link>
            <Link href="/list-your-property" className={styles.helper}><Icon name="key" size={26} /><span><strong>Own a property?</strong><small>List it on Lodgely</small></span><span aria-hidden="true">↗</span></Link>
          </div>
        </div>
      </div>

      {compared.length > 0 && <div className={styles.tray} role="region" aria-label="Compare places">
        <div className={styles.trayItems}>
          {compared.map(listing => <span key={listing.slug} className={styles.trayItem}>
            <span className={styles.trayThumb}><Image src={listing.images[0]} alt="" fill sizes="44px" /></span>{listing.title}
            <button onClick={() => toggleCompare(listing.slug)} aria-label={`Remove ${listing.title} from comparison`}>×</button>
          </span>)}
          {Array.from({ length: 3 - compared.length }).map((_, index) => <span key={index} className={styles.traySlot}>Add a place</span>)}
        </div>
        <button className={styles.trayButton} disabled={compared.length < 2} onClick={() => compareDialog.current?.showModal()}>Compare {compared.length}<span aria-hidden="true">↗</span></button>
      </div>}

      <dialog ref={compareDialog} className={styles.compareDialog} onClick={event => { if (event.target === event.currentTarget) compareDialog.current?.close(); }} aria-label="Side-by-side comparison">
        <div className={styles.compareHead}><h2>Side by side</h2><button onClick={() => compareDialog.current?.close()} aria-label="Close comparison">×</button></div>
        <div className={styles.compareTable} style={{ gridTemplateColumns: `150px repeat(${compared.length}, minmax(180px, 1fr))` }}>
          <span />
          {compared.map(listing => <div key={listing.slug} className={styles.compareCol}><span className={styles.compareImage}><Image src={listing.images[0]} alt="" fill sizes="220px" /></span><Link href={`/properties/${listing.slug}`}>{listing.title} ↗</Link></div>)}
          {[
            ["Price", (l: Listing) => `${formatPrice(l)} ${periodLabel[l.period]}`],
            ["Monthly equivalent", (l: Listing) => formatPrice(l, Math.round(monthly(l)))],
            ["Cost to move in", (l: Listing) => formatPrice(l, moveInTotal(l))],
            ["Type", (l: Listing) => l.type],
            ["Where", (l: Listing) => `${l.area}, ${titleCase(l.city)}`],
            ["To campus", (l: Listing) => l.campusMinutes ? `${l.campusMinutes} min to ${universities.find(u => u.slug === l.university)?.short}` : "—"],
            ["Bedrooms", (l: Listing) => String(l.bedrooms)],
            ["Furnished", (l: Listing) => l.furnished ? "Yes" : "No"],
            ["Available from", (l: Listing) => new Date(`${l.availableFrom}T00:00:00`).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })],
            ["Amenities", (l: Listing) => l.amenities.join(", ")],
          ].map(([label, value]) => <div key={label as string} className={styles.compareRow}>
            <span className={styles.compareLabel}>{label as string}</span>
            {compared.map(listing => <span key={listing.slug}>{(value as (l: Listing) => string)(listing)}</span>)}
          </div>)}
        </div>
        <p className={styles.hint}>Sample listings. Always confirm prices and costs with the owner or agent before paying.</p>
      </dialog>
    </div>
  );
}

/** A stylised, illustrative city map: streets, water and neighbourhood labels, with a price pin per listing. */
function CityMap({ city, items, hovered, onHover }: { city: string; items: Listing[]; hovered: string | null; onHover: (slug: string | null) => void }) {
  const [active, setActive] = useState<string | null>(null);
  const areas = Array.from(new Set(listings.filter(listing => listing.city === city).map(listing => listing.area))).map(area => {
    const inArea = listings.filter(listing => listing.city === city && listing.area === area);
    return { area, x: inArea.reduce((s, l) => s + l.pin.x, 0) / inArea.length, y: inArea.reduce((s, l) => s + l.pin.y, 0) / inArea.length };
  });
  const selected = items.find(listing => listing.slug === active);
  const water = city === "lagos" ? "M0 88 C 20 80, 40 96, 62 86 S 100 90, 100 84 L100 100 L0 100 Z" : city === "kigali" ? "M70 0 C 66 20, 78 34, 72 52 S 84 80, 80 100 L 100 100 L100 0 Z" : "M0 0 C 14 10, 8 26, 18 40 S 10 70, 0 78 Z";
  return (
    <div className={styles.map} role="group" aria-label={`Illustrative map of ${titleCase(city)}`}>
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        <path d={water} className={styles.water} />
        {[18, 36, 54, 72].map(y => <path key={`h${y}`} d={`M0 ${y} C 30 ${y + 4}, 60 ${y - 5}, 100 ${y + 2}`} className={styles.street} />)}
        {[16, 40, 62, 84].map(x => <path key={`v${x}`} d={`M${x} 0 C ${x + 4} 30, ${x - 5} 60, ${x + 2} 100`} className={styles.street} />)}
        <path d="M0 60 C 30 40, 60 70, 100 30" className={styles.mainRoad} />
        <circle cx="30" cy="20" r="7" className={styles.park} /><circle cx="76" cy="62" r="5" className={styles.park} />
      </svg>
      {areas.map(area => <span key={area.area} className={styles.areaLabel} style={{ left: `${area.x}%`, top: `${area.y + 9}%` }}>{area.area}</span>)}
      {universities.filter(university => university.city === city).map((university, index) => <span key={university.slug} className={styles.campusPin} style={{ left: `${[34, 80][index] ?? 50}%`, top: `${[26, 18][index] ?? 50}%` }}><Icon name="university" size={14} />{university.short}</span>)}
      {items.map(listing => <button key={listing.slug} className={`${styles.pin} ${hovered === listing.slug || active === listing.slug ? styles.pinActive : ""}`} style={{ left: `${listing.pin.x}%`, top: `${listing.pin.y}%` }}
        onPointerEnter={() => onHover(listing.slug)} onPointerLeave={() => onHover(null)} onClick={() => setActive(active === listing.slug ? null : listing.slug)} aria-label={`${listing.title}, ${formatPrice(listing)} ${periodLabel[listing.period]}`}>
        {formatPrice(listing).replace(/,000$/, "k")}
      </button>)}
      {selected && <div className={styles.mapCard} style={{ left: `${Math.min(70, Math.max(2, selected.pin.x - 14))}%`, top: `${selected.pin.y > 55 ? selected.pin.y - 40 : selected.pin.y + 6}%` }}>
        <span className={styles.mapCardImage}><Image src={selected.images[0]} alt="" fill sizes="90px" /></span>
        <span><strong>{selected.title}</strong><small>{formatPrice(selected)} {periodLabel[selected.period]}</small><Link href={`/properties/${selected.slug}`}>View place ↗</Link></span>
      </div>}
      <span className={styles.mapNote}>Illustrative map · pin positions are approximate</span>
    </div>
  );
}
