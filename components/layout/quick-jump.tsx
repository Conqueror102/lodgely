"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import Icon from "@/components/ui/icon";
import { allLinks } from "@/data/site-map";
import { cities, countries, universities } from "@/data/places";
import { listings } from "@/data/listings";
import { guides } from "@/data/guides";
import styles from "@/components/layout/quick-jump.module.css";

type Entry = { group: string; label: string; hint: string; href: string; icon: string; terms: string };

const entries: Entry[] = [
  ...allLinks.map(link => ({ group: "Pages", label: link.label, hint: link.hint, href: link.href, icon: link.icon, terms: `${link.label} ${link.hint} ${link.keywords ?? ""}` })),
  ...cities.map(city => ({ group: "Cities", label: city.name, hint: `${city.region}, ${countries.find(c => c.slug === city.country)?.name}`, href: `/${city.country}/${city.slug}`, icon: "location", terms: `${city.name} ${city.region} ${city.neighbourhoods.map(n => n.name).join(" ")}` })),
  ...universities.map(university => ({ group: "Universities", label: university.name, hint: `${university.short} · ${university.campus}`, href: `/universities/${university.slug}`, icon: "university", terms: `${university.name} ${university.short} ${university.nearby.join(" ")}` })),
  ...listings.map(listing => ({ group: "Sample listings", label: listing.title, hint: `${listing.type} · ${listing.area}`, href: `/properties/${listing.slug}`, icon: "home", terms: `${listing.title} ${listing.type} ${listing.area} ${listing.city}` })),
  ...guides.map(guide => ({ group: "Guides", label: guide.title, hint: `${guide.minutes} min read`, href: `/guides/${guide.slug}`, icon: "document", terms: `${guide.title} ${guide.category} ${guide.excerpt}` })),
];

const suggestions = ["/accommodation", "/accommodation/student-accommodation", "/list-your-property", "/trust-and-safety", "/universities"];

function score(entry: Entry, words: string[]) {
  const label = entry.label.toLowerCase();
  const terms = entry.terms.toLowerCase();
  let total = 0;
  for (const word of words) {
    if (label.startsWith(word)) total += 6;
    else if (label.includes(word)) total += 4;
    else if (terms.includes(word)) total += 2;
    else return 0;
  }
  return total;
}

/** "Jump anywhere" search across every page, place, university, listing and guide. Opens with ⌘K, Ctrl+K or "/". */
export default function QuickJump({ open, onClose }: { open: boolean; onClose: () => void }) {
  const router = useRouter();
  const dialog = useRef<HTMLDialogElement>(null);
  const input = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  const [cursor, setCursor] = useState(0);

  const results = useMemo(() => {
    const words = query.toLowerCase().trim().split(/\s+/).filter(Boolean);
    if (!words.length) return suggestions.map(href => entries.find(entry => entry.href === href)!).map(entry => ({ ...entry, group: "Popular" }));
    return entries.map(entry => ({ entry, rank: score(entry, words) })).filter(item => item.rank > 0).sort((a, b) => b.rank - a.rank).slice(0, 12).map(item => item.entry);
  }, [query]);

  useEffect(() => {
    const element = dialog.current;
    if (!element) return;
    if (open && !element.open) { element.showModal(); setQuery(""); setCursor(0); requestAnimationFrame(() => input.current?.focus()); }
    if (!open && element.open) element.close();
  }, [open]);

  function go(href: string) { onClose(); router.push(href); }

  const groups = results.reduce<Record<string, Entry[]>>((all, entry) => { (all[entry.group] ||= []).push(entry); return all; }, {});
  let index = -1;

  return (
    <dialog ref={dialog} className={styles.dialog} onClose={onClose} onClick={event => { if (event.target === event.currentTarget) onClose(); }} aria-label="Jump anywhere on Lodgely">
      <div className={styles.box}>
        <div className={styles.inputRow}>
          <Icon name="search" size={22} />
          <input ref={input} value={query} placeholder="Search pages, cities, universities, guides…" aria-label="Search Lodgely" aria-controls="quick-jump-results" aria-activedescendant={results[cursor] ? `jump-${cursor}` : undefined}
            onChange={event => { setQuery(event.target.value); setCursor(0); }}
            onKeyDown={event => {
              if (event.key === "ArrowDown") { event.preventDefault(); setCursor(c => Math.min(results.length - 1, c + 1)); }
              if (event.key === "ArrowUp") { event.preventDefault(); setCursor(c => Math.max(0, c - 1)); }
              if (event.key === "Enter" && results[cursor]) go(results[cursor].href);
            }} />
          <kbd>esc</kbd>
        </div>
        <div className={styles.results} id="quick-jump-results" role="listbox">
          {results.length === 0 && <p className={styles.empty}>Nothing matches “{query}”. Try a city, a university or “guides”.</p>}
          {Object.entries(groups).map(([group, items]) => <div key={group} className={styles.group}>
            <span className={styles.groupLabel}>{group}</span>
            {items.map(item => { index += 1; const i = index; return (
              <button key={item.href} id={`jump-${i}`} role="option" aria-selected={cursor === i} className={cursor === i ? styles.active : ""} onMouseEnter={() => setCursor(i)} onClick={() => go(item.href)}>
                <span className={styles.icon}><Icon name={item.icon} size={19} /></span>
                <span className={styles.text}><strong>{item.label}</strong><small>{item.hint}</small></span>
                <span className={styles.enter} aria-hidden="true">↵</span>
              </button>
            ); })}
          </div>)}
        </div>
        <div className={styles.footer}><span><kbd>↑</kbd><kbd>↓</kbd> to move</span><span><kbd>↵</kbd> to open</span><span className={styles.brand}>Lodgely quick jump</span></div>
      </div>
    </dialog>
  );
}
