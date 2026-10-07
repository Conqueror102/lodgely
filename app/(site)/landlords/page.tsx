import type { Metadata } from "next";
import { seo } from "@/lib/seo";
import type { CSSProperties } from "react";
import Link from "next/link";
import { CtaBand, Faqs, FeatureTiles, SectionHead } from "@/components/ui/blocks";
import { Reveal } from "@/components/ui/motion";
import PageHero from "@/components/ui/page-hero";
import kit from "@/components/ui/kit.module.css";
import ProfileBuilder from "./profile-builder";
import styles from "./landlords.module.css";

export const metadata: Metadata = seo({
  title: "For Property Owners & Landlords | Lodgely",
  description: "List your property on Lodgely, reach students and renters, and manage listings, enquiries, documentation and occupancy with digital tools.",
  path: "/landlords",
});

export default function Landlords() {
  return (
    <div className={kit.page}>
      <PageHero crumbs={[{ label: "For Property Owners" }]} eyebrow="Property owners & landlords" watermark="owners."
        title={<>Own a property?<br /><em>Make it a digital asset.</em></>}
        lead={<p>List your property on Lodgely and reach students, renters and other accommodation seekers looking for suitable homes.</p>}
        image="/hero-apartments.png" imageFit="contain" imageAlt="Illustrative apartment building"
        stamp={{ top: "A PLACE.", main: <>A possi-<br />bility.</>, bottom: "A NEW BEGINNING" }}>
        <div className={kit.actions}>
          <Link href="/list-your-property" className={kit.primary}>List your property <span aria-hidden="true">↗</span></Link>
          <Link href="#tools" className={kit.ghost}>See the tools <span aria-hidden="true">↓</span></Link>
        </div>
      </PageHero>

      <section className={kit.section}>
        <SectionHead kicker="Digital property profiles" aside="Try it: switch the layers on and off" title={<>Every property,<br /><em>beautifully documented.</em></>} copy="A digital profile brings your photos, details, availability and documents together in one place, so seekers can decide with confidence." />
        <ProfileBuilder />
      </section>

      <section className={kit.section}>
        <SectionHead kicker="Listing benefits" title={<>More reach.<br /><em>Less back and forth.</em></>} />
        <FeatureTiles items={[
          { title: "Property listing", copy: "Present your property to students, renters and relocating professionals.", icon: "home" },
          { title: "Tenant enquiries", copy: "Receive enquiries and inspection requests in one organised place.", icon: "user-group-man-man" },
          { title: "Listing management", copy: "Update availability, pricing and photos whenever things change.", icon: "settings" },
          { title: "Verification", copy: "Complete the applicable checks so seekers can search with confidence.", icon: "shield" },
          { title: "Digital documentation", copy: "Keep agreements, receipts and inspection reports together.", icon: "document" },
          { title: "Occupancy tracking", copy: "See which units are let, available or coming up for renewal.", icon: "calendar" },
        ]} />
      </section>

      <section className={kit.section} id="tools">
        <Reveal className={`${kit.panel} ${kit.panelDark} ${styles.tools}`}>
          <span className={`${kit.watermark} ${styles.toolsWord}`} aria-hidden="true">manage.</span>
          <div className={styles.toolsCopy}>
            <span className={kit.eyebrow}>Management tools</span>
            <h2 className={kit.title}>See the bigger picture<br /><em>of your property.</em></h2>
            <p className={kit.lead}>Rental management, occupancy tracking and analytics, designed for owners building something that lasts. Availability depends on the service in your market.</p>
            <ul className={kit.list}><li>Track enquiries from first message to move-in</li><li>See occupancy across every unit at a glance</li><li>Understand which listings get the most interest</li></ul>
          </div>
          <div className={styles.dash} aria-label="Illustrative dashboard preview">
            <div className={styles.dashRow}>
              <div className={styles.ring} style={{ "--p": 62 } as CSSProperties}><strong>62%</strong><span>occupied</span></div>
              <div className={styles.bars}>{[40, 65, 52, 80, 72, 90, 68].map((h, i) => <i key={i} style={{ height: `${h}%`, animationDelay: `${i * 90}ms` }} />)}<span>Listing views · last 7 days</span></div>
            </div>
            <div className={styles.enquiries}>
              {[["New enquiry", "Room in a shared flat", "2m"], ["Inspection booked", "Garden self-contain", "1h"], ["Agreement sent", "Two-bedroom flat", "Yesterday"]].map(([status, place, time]) => <div key={place}><span className={styles.dot} /><strong>{status}</strong><small>{place}</small><em>{time}</em></div>)}
            </div>
            <span className={styles.dashNote}>Illustrative preview · sample data</span>
          </div>
        </Reveal>
      </section>

      <section className={kit.section}>
        <SectionHead kicker="Getting listed" title={<>Four steps to <em>your first listing.</em></>} />
        <FeatureTiles numbered items={[
          { title: "Apply", copy: "Tell us about your property in our step-by-step application." },
          { title: "Verify", copy: "Complete the applicable identity and property verification." },
          { title: "Publish", copy: "Your digital property profile goes live for seekers to discover." },
          { title: "Manage", copy: "Respond to enquiries, book inspections and keep records." },
        ]} />
      </section>

      <section className={kit.section}>
        <SectionHead kicker="Owner FAQs" title={<>Good to <em>know.</em></>} />
        <Faqs items={[
          { q: "Can I list my property today?", a: "Property owners can apply to list properties subject to Lodgely’s applicable verification requirements. Our listing application is in preview, so you can explore every step now." },
          { q: "What do I need to apply?", a: "Have your property location, photos, amenities, pricing and ownership information ready. Additional documents may be requested during verification." },
          { q: "Does Lodgely manage properties?", a: "Lodgely can provide digital property management capabilities where the relevant service is available in your market." },
          { q: "Can an agent list on my behalf?", a: "Yes. Agents can apply to join Lodgely and undergo applicable verification before listing properties." },
        ]} />
      </section>

      <section className={kit.section}>
        <CtaBand eyebrow="Your space. Their next chapter." title={<>Ready to list<br /><em>your property?</em></>} actions={[{ label: "List your property", href: "/list-your-property", primary: true }, { label: "I’m an agent", href: "/agents" }]} />
      </section>
    </div>
  );
}
