"use client";

import Icon from "@/components/ui/icon";
import { useState } from "react";
import Image from "next/image";
import styles from "@/components/home/ecosystem.module.css";
import Link from "next/link";

const pillars = [
  {
    name: "Find", caption: "Your place. Your possibilities.",
    title: "A new chapter starts with a place.",
    copy: "From a room near campus to an apartment in a new city. Discover accommodation around the way you want to live.",
    audience: ["Students", "Renters", "Universities", "Property owners"],
    cardLabel: "A place for your next chapter", cardTitle: "Find your kind of home.",
    details: ["Location", "Your budget", "Your preferences"], action: "Start your search", href: "/accommodation",
  },
  {
    name: "Rent", caption: "Less searching. More living.",
    title: "Turn a possibility into your next place.",
    copy: "Compare the details that matter, explore your options and connect with the people behind the property. Take your next step with a clearer picture.",
    audience: ["Renters", "Landlords", "Property agents", "Students"],
    cardLabel: "Your next move", cardTitle: "Explore. Compare. Connect.",
    details: ["Property details", "Amenities", "Availability"], action: "Explore accommodation", href: "/accommodation",
  },
  {
    name: "Manage", caption: "More clarity. Less complexity.",
    title: "See the bigger picture of your property.",
    copy: "Bring listings, tenant enquiries and property information into a digital workflow. Designed for owners and agents building something that lasts.",
    audience: ["Property owners", "Landlords", "Agents", "Institutions"],
    cardLabel: "A more organised property journey", cardTitle: "Every detail. Connected.",
    details: ["Your listings", "Tenant enquiries", "Property records"], action: "Explore owner tools", href: "/landlords",
  },
  {
    name: "Digitize", caption: "Real places. Digital possibilities.",
    title: "Give every property a digital foundation.",
    copy: "Connect physical spaces with property profiles, information and documentation. The foundation for a more connected African property ecosystem.",
    audience: ["Properties", "People", "Information", "Opportunities"],
    cardLabel: "Building the future of property", cardTitle: "A place. A digital identity.",
    details: ["Property profile", "Documentation", "Digital records"], action: "List your property", href: "/list-your-property",
  },
];

export default function Ecosystem() {
  const [active, setActive] = useState(0);
  const pillar = pillars[active];

  return (
    <section className={styles.section} aria-labelledby="ecosystem-title" id="ecosystem">
      <div className={styles.eyebrow}><span>THE LODGELY CONNECTION</span><span>Many people. One ecosystem.</span></div>
      <div className={styles.intro}>
        <h2 id="ecosystem-title">One platform connecting <span>people, properties</span> &amp; opportunities.</h2>
        <div className={styles.introAside}>
          <span className={styles.signature} aria-hidden="true">L</span>
          <p>Lodgely connects students, renters, property owners, landlords, agents and institutions through a digital accommodation and property ecosystem.</p>
        </div>
      </div>

      <div className={styles.experience}>
        <div className={styles.story} key={pillar.name}>
          <div className={styles.chapter}><Icon name={["search", "key", "settings", "cloud"][active]} size={24} /><span>ONE PLATFORM. FOUR POSSIBILITIES.</span></div>
          <h3>{pillar.title}</h3>
          <p>{pillar.copy}</p>
          {pillar.href ? <Link className={styles.action} href={pillar.href}>{pillar.action}<span aria-hidden="true">↗</span></Link> : <button className={styles.action} onClick={() => setActive(3)}>{pillar.action}<span aria-hidden="true">↗</span></button>}
          <div className={styles.storyFoot}><span className={styles.dot} /> Built around people. Connected through property.</div>
        </div>

        <div className={styles.visual} aria-live="polite">
          <span className={styles.watermark} aria-hidden="true">{pillar.name}</span>
          <div className={styles.orbit} aria-hidden="true" />
          <div className={styles.orbitInner} aria-hidden="true" />
          <div className={styles.connectionCard} key={pillar.name}>
            <div className={styles.cardTop}><span>LODGELY</span><span className={styles.cardBadge}>Connected by possibility</span></div>
            <div className={styles.propertyImage}>
              <Image src="/hero-apartments.png" alt="Illustrative apartment residence" fill sizes="300px" />
            </div>
            <p className={styles.cardLabel}>{pillar.cardLabel}</p>
            <h4>{pillar.cardTitle}</h4>
            <div className={styles.details}>{pillar.details.map(detail => <span key={detail}>{detail}</span>)}</div>
          </div>
          {pillar.audience.map((person, index) => <div className={`${styles.person} ${styles[`person${index}`]}`} key={index}><span className={styles.personDot} />{person}</div>)}
          <span className={styles.visualNote}>An ecosystem designed to bring us closer.</span>
        </div>

        <div className={styles.pillars} role="group" aria-label="Explore Lodgely's four pillars">
          {pillars.map((item, index) => <button key={item.name} className={active === index ? styles.selected : ""} aria-pressed={active === index} onClick={() => setActive(index)}>
            <span className={styles.pillarTop}><Icon name={["search", "key", "settings", "cloud"][index]} size={28} /><span aria-hidden="true">↗</span></span>
            <strong>{item.name}<span>.</span></strong>
            <span className={styles.caption}>{item.caption}</span>
          </button>)}
        </div>
      </div>
      <div className={styles.bottomLine}><span>FOR THE WAY WE LIVE TODAY.</span><span>AND THE POSSIBILITIES OF TOMORROW.</span></div>
    </section>
  );
}
