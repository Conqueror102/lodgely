import type { Metadata } from "next";
import { seo } from "@/lib/seo";
import Link from "next/link";
import { LinkCards, SectionHead } from "@/components/ui/blocks";
import PageHero from "@/components/ui/page-hero";
import kit from "@/components/ui/kit.module.css";
import ContactTabs from "./contact-tabs";

export const metadata: Metadata = seo({
  title: "Contact & Partnerships | Lodgely",
  description: "Get in touch with Lodgely for general enquiries, support, partnerships or to report a concern about a listing.",
  path: "/contact",
});

export default function Contact() {
  return (
    <div className={kit.page}>
      <PageHero crumbs={[{ label: "Contact & Partnerships" }]} eyebrow="Contact & partnerships" watermark="hello."
        title={<>Let’s talk about<br /><em>what’s next.</em></>}
        lead={<p>Questions, support or a partnership idea. Pick what you need and we’ll point you to the right people.</p>}
        image="/how-connect.png" imageAlt="Illustration of two people talking at a front door"
        stamp={{ top: "EVERY GOOD MOVE", main: <>Starts with<br />hello.</>, bottom: "WE’RE LISTENING" }}>
        <div className={kit.actions}><Link href="#write" className={kit.primary}>Write to us <span aria-hidden="true">↓</span></Link><Link href="/contact?type=report#write" className={kit.ghost}>Report a concern <span aria-hidden="true">↗</span></Link></div>
      </PageHero>
      <section className={kit.section} id="write"><ContactTabs /></section>
      <section className={kit.section}>
        <SectionHead kicker="Looking for something specific?" title={<>You might find it <em>faster here.</em></>} />
        <LinkCards columns={4} items={[
          { title: "Guides", copy: "Renting, scams and student housing.", href: "/guides", icon: "document" },
          { title: "Trust & Safety", copy: "Verification, safety and reporting.", href: "/trust-and-safety", icon: "shield" },
          { title: "List a property", copy: "Our step-by-step application.", href: "/list-your-property", icon: "key" },
          { title: "For institutions", copy: "Housing partnerships for campuses.", href: "/institutions", icon: "university" },
        ]} />
      </section>
    </div>
  );
}
