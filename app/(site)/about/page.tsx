import type { Metadata } from "next";
import { seo } from "@/lib/seo";
import Link from "next/link";
import { CtaBand, SectionHead } from "@/components/ui/blocks";
import Marquee from "@/components/ui/marquee";
import { Reveal } from "@/components/ui/motion";
import PageHero from "@/components/ui/page-hero";
import kit from "@/components/ui/kit.module.css";
import FlipCards from "./flip-cards";
import styles from "./about.module.css";

export const metadata: Metadata = seo({
  title: "About Lodgely | Digital Accommodation & Property Infrastructure for Africa",
  description: "Lodgely is building digital accommodation and property infrastructure for Africa, starting in Nigeria and Rwanda.",
  path: "/about",
});

const roadmap = [
  { lane: "Focus now", tone: "now", items: ["Accommodation discovery", "Student housing search", "Property listing applications"] },
  { lane: "Building next", tone: "next", items: ["Digital property profiles", "Listing & rental management", "Verification workflows"] },
  { lane: "Exploring", tone: "later", items: ["Digital ownership records", "Investment infrastructure", "Real-world asset infrastructure"] },
];

export default function About() {
  return (
    <div className={kit.page}>
      <PageHero tone="dark" crumbs={[{ label: "About Lodgely" }]} eyebrow="Our mission" watermark="lodgely"
        title={<>Find accommodation.<br />Manage property.<br /><em>Build the future of real estate.</em></>}
        lead={<p>Lodgely is digital accommodation and property infrastructure for Africa. We connect students, renters, property owners, landlords, agents and institutions through one accommodation and property ecosystem.</p>}
        image="/footer-community.png" imageAlt="Illustration of a joyful community of young Africans" />

      <section className={kit.section}>
        <SectionHead kicker="The challenges we’re addressing" aside="Tap a card" title={<>Finding a home<br /><em>shouldn’t be this hard.</em></>} copy="Across African cities, people searching for accommodation and people offering it face the same friction. We’re building to remove it." />
        <FlipCards />
      </section>

      <Marquee items={["Students", "Renters", "Property owners", "Landlords", "Agents", "Institutions", "Professionals", "Relocating families"]} />

      <section className={kit.section}>
        <SectionHead kicker="Who we serve" title={<>Built around <em>people.</em></>} />
        <div className={styles.audiences}>
          {[["Students", "Rooms, hostels and off-campus homes near campus."], ["Renters & professionals", "Apartments, rooms and short stays in a new city."], ["Property owners", "Listing, documentation and management tools."], ["Agents", "Listings, leads and client communication."], ["Institutions", "Housing discovery and partnerships for campuses."], ["People on the move", "International students, interns, researchers and families."]].map(([title, copy], index) => <Reveal key={title} delay={index * 60} className={styles.audience}><span>{String(index + 1).padStart(2, "0")}</span><strong>{title}</strong><p>{copy}</p></Reveal>)}
        </div>
      </section>

      <section className={kit.section}>
        <Reveal className={`${kit.panel} ${styles.markets}`}>
          <div>
            <span className={kit.eyebrow}>Built for Africa. Designed to scale.</span>
            <h2 className={kit.title}>Starting in <em>Nigeria &amp; Rwanda.</em></h2>
            <p className={kit.muted}>Lodgely is initially focused on Nigeria and Rwanda, with a long-term ambition to expand its accommodation and property infrastructure across additional African markets.</p>
          </div>
          <div className={styles.marketCols}>
            <div className={styles.current}><small>CURRENT MARKETS</small><Link href="/nigeria"><strong>Nigeria</strong><span>Lagos · Ibadan · Abuja ↗</span></Link><Link href="/rwanda"><strong>Rwanda</strong><span>Kigali ↗</span></Link></div>
            <div className={styles.expansion}><small>EXPANSION MARKETS</small><p>Additional African markets are part of our long-term plans. We’ll only list a market here once we actually operate there.</p></div>
          </div>
        </Reveal>
      </section>

      <section className={kit.section}>
        <SectionHead kicker="Future direction" title={<>Where we’re <em>headed.</em></>} copy="Lodgely’s long-term vision includes exploring technology that can make property information, ownership structures and investment opportunities more accessible." />
        <div className={styles.roadmap}>
          {roadmap.map((lane, index) => <Reveal key={lane.lane} delay={index * 120} className={`${styles.lane} ${styles[lane.tone]}`}>
            <span className={styles.laneHead}>{lane.lane}</span>
            {lane.items.map(item => <span key={item} className={styles.laneItem}>{item}</span>)}
          </Reveal>)}
        </div>
        <p className={styles.compliance}>Future and experimental capabilities are not live products. Nothing on this page is an offer of securities, investment returns, tokenized offerings or ownership products.</p>
      </section>

      <section className={kit.section}>
        <CtaBand eyebrow="Join us" title={<>Your next home starts<br /><em>with Lodgely.</em></>} actions={[{ label: "Find accommodation", href: "/accommodation", primary: true }, { label: "Partner with Lodgely", href: "/contact" }]} />
      </section>
    </div>
  );
}
