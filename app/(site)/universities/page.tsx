import type { Metadata } from "next";
import Link from "next/link";
import { CtaBand, LinkCards, Notice, SectionHead } from "@/components/ui/blocks";
import PageHero from "@/components/ui/page-hero";
import kit from "@/components/ui/kit.module.css";
import { countries, universitiesIn } from "@/data/places";

export const metadata: Metadata = {
  title: "Accommodation Near Your University | Lodgely",
  description: "Find student accommodation near University of Lagos, University of Ibadan, University of Abuja, University of Rwanda and African Leadership University.",
};

export default function Universities() {
  return (
    <div className={kit.page}>
      <PageHero crumbs={[{ label: "Universities" }]} eyebrow="University & campus discovery" watermark="campus."
        title={<>Accommodation near<br /><em>your university.</em></>}
        lead={<p>Discover accommodation options around universities and educational institutions in markets where Lodgely operates.</p>}
        image="/how-search.png" imageAlt="Illustration of a student searching for accommodation on her phone"
        stamp={{ top: "CLOSE TO CAMPUS", main: <>Closer to<br />your goals.</>, bottom: "FIND YOUR PLACE" }}>
        <div className={kit.actions}><Link href="/accommodation/student-accommodation#campus" className={kit.primary}>Open the campus radar <span aria-hidden="true">↗</span></Link></div>
      </PageHero>
      {countries.map(country => <section key={country.slug} className={kit.section}>
        <SectionHead kicker={`Universities in ${country.name}`} aside={`${universitiesIn({ country: country.slug }).length} campuses`} title={<>{country.name}<em>.</em></>} />
        <LinkCards columns={3} items={universitiesIn({ country: country.slug }).map(university => ({ title: university.name, copy: university.campus, href: `/universities/${university.slug}`, icon: "university", label: university.short }))} />
      </section>)}
      <section className={kit.section}>
        <Notice><p><strong>Don’t see your university?</strong> We add university pages only where we have genuinely useful local information or accommodation to show. <Link href="/contact" style={{ textDecoration: "underline" }}>Tell us where you study</Link> and we’ll let you know when it’s covered.</p></Notice>
      </section>
      <section className={kit.section}>
        <CtaBand eyebrow="For universities & institutions" title={<>Better housing.<br /><em>Brighter beginnings.</em></>} actions={[{ label: "Partner with Lodgely", href: "/institutions", primary: true }, { label: "Contact us", href: "/contact" }]} />
      </section>
    </div>
  );
}
