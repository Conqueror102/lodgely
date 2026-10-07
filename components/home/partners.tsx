"use client";

import Icon from "@/components/ui/icon";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import styles from "@/components/home/partners.module.css";

const partners = [
  { id: "property-owners", href: "/list-your-property", label: "Property owners", title: "Your space.\nTheir next chapter.", copy: "List your property on Lodgely and reach students, renters and other accommodation seekers looking for suitable homes.", features: ["Digital property profile", "Listing management", "Tenant enquiries", "Digital documentation"], image: "/hero-apartments.png", alt: "Illustrative apartment residence", action: "List Your Property", caption: "MAKE MORE OF YOUR PROPERTY", prepare: "Have your property location, photos and ownership information ready." },
  { id: "agents", href: "/agents", label: "Property agents", title: "More connections.\nMore possibilities.", copy: "Lodgely helps property agents digitize listings, connect with accommodation seekers and manage their property pipeline from one platform.", features: ["Property listing", "Lead management", "Client communication", "Digital records"], image: "/how-connect.png", alt: "Illustrative conversation between a property host and a renter", action: "Become a Lodgely Agent", caption: "BUILD YOUR NEXT CONNECTION", prepare: "Have your professional details and the locations you serve ready." },
  { id: "institutions", href: "/institutions", label: "Universities & institutions", title: "Better housing.\nBrighter beginnings.", copy: "Lodgely can work with universities, educational institutions, property owners and housing partners to improve access to accommodation around campuses.", features: ["Student housing discovery", "Off-campus housing directories", "Housing partnerships", "Student onboarding"], image: "/student-life.png", alt: "Illustrative student community in a shared apartment", action: "Partner With Lodgely", caption: "GIVE POTENTIAL A PLACE TO GROW", prepare: "Have your institution name, campus location and housing needs ready." },
];

export default function Partners() {
  const [active, setActive] = useState(0);
  return (
    <section className={styles.section} id="partners" aria-labelledby="partners-title">
      <header className={styles.heading}>
        <div><span className={styles.eyebrow}>BUILT FOR PARTNERSHIP</span><h2 id="partners-title">Your property.<br /><em>More possibilities.</em></h2></div>
        <p>Behind every great place,<br />there are people making it possible.<br /><strong>Let’s build what comes next.</strong></p>
      </header>
      <div className={styles.cards}>
        {partners.map((partner, index) => <article id={partner.id} key={partner.id} className={`${styles.card} ${active === index ? styles.expanded : ""}`}>
          <button className={styles.selector} aria-expanded={active === index} aria-controls={`${partner.id}-detail`} onClick={() => setActive(index)}>
            <span className={styles.number}><Icon name={["home", "handshake", "university"][index]} size={25} /></span><span>{partner.label}</span><span className={styles.toggle} aria-hidden="true">{active === index ? "−" : "+"}</span>
          </button>
          <div className={`${styles.visual} ${index === 0 ? styles.building : ""}`}>
            <Image src={partner.image} alt={partner.alt} fill sizes="(max-width: 800px) 90vw, 50vw" />
            <span className={styles.visualLabel}>{partner.caption}</span>
            {index === 0 && <span className={styles.seal} aria-hidden="true">A place.<br /><strong>A possibility.</strong><br />A new beginning.</span>}
          </div>
          <div className={styles.body}>
            <h3>{partner.title}</h3>
            {active !== index && <div className={styles.preview}>
              <span className={styles.previewLabel}>YOUR POSSIBILITIES</span>
              <div className={styles.previewFeatures}>{partner.features.slice(0, 3).map((feature) => <span key={feature}><Icon name="checkmark" size={17} />{feature}</span>)}</div>
              <button className={styles.explore} onClick={() => setActive(index)}>Explore partnership <span aria-hidden="true">↗</span></button>
            </div>}
            <div id={`${partner.id}-detail`} hidden={active !== index}>
              <p>{partner.copy}</p>
              <ul>{partner.features.map(feature => <li key={feature}>{feature}</li>)}</ul>
              <Link className={styles.cta} href={partner.href}>{partner.action}<span aria-hidden="true">↗</span></Link>
            </div>
          </div>
        </article>)}
      </div>
      <div className={styles.footer}><span>LOCAL KNOWLEDGE. SHARED POSSIBILITIES.</span><span>One platform. Room for all of us.</span></div>
    </section>
  );
}
