import type { Metadata } from "next";
import Link from "next/link";
import { CtaBand, Faqs, FeatureTiles, LinkCards, SectionHead } from "@/components/ui/blocks";
import Marquee from "@/components/ui/marquee";
import PageHero from "@/components/ui/page-hero";
import kit from "@/components/ui/kit.module.css";
import CampusPicker from "./campus-picker";

export const metadata: Metadata = {
  title: "Student Accommodation in Nigeria & Rwanda | Lodgely",
  description: "Find student rooms, hostels, apartments and off-campus housing near universities in Nigeria and Rwanda. Search by university, budget and property type.",
};

export default function StudentAccommodation() {
  return (
    <div className={kit.page}>
      <PageHero
        crumbs={[{ label: "Find Accommodation", href: "/accommodation" }, { label: "Student Accommodation" }]}
        eyebrow="Student accommodation made simple" watermark="campus."
        title={<>Big dreams need<br />a place <em>to start.</em></>}
        lead={<p>Finding accommodation around university campuses can be stressful. Lodgely helps students discover rooms, hostels, apartments and off-campus housing using location, university, budget and property preferences.</p>}
        image="/student-life.png" imageAlt="Illustration of three students relaxing together in a shared apartment"
        stamp={{ top: "YOUR NEXT CHAPTER", main: <>Room to<br />belong.</>, bottom: "MAKE YOURSELF AT HOME" }}>
        <div className={kit.actions}>
          <Link href="/accommodation?type=Student%20Accommodation" className={kit.primary}>Find student accommodation <span aria-hidden="true">↗</span></Link>
          <Link href="#campus" className={kit.ghost}>Search by university <span aria-hidden="true">↓</span></Link>
        </div>
      </PageHero>

      <Marquee items={["Rooms near campus", "Hostels", "Shared flats", "Off-campus homes", "Study-ready spaces", "Furnished rooms"]} />

      <section className={kit.section} id="campus">
        <SectionHead kicker="Accommodation near your university" aside="Pick a campus. See what’s around it." title={<>Where will you <em>study?</em></>} copy="Choose your university to see nearby neighbourhoods, travel times and places to explore." />
        <CampusPicker />
      </section>

      <section className={kit.section}>
        <SectionHead kicker="Your kind of student space" title={<>Rooms, hostels <em>&amp; apartments.</em></>} copy="Every student lives differently. Start with the kind of space that suits your budget and your routine." />
        <LinkCards columns={4} items={[
          { title: "Rooms", copy: "Your own room, often in a shared flat or compound.", href: "/accommodation?type=Rooms", icon: "bed", label: "Small space. Big start." },
          { title: "Hostels", copy: "Shared spaces, familiar faces and a sense of belonging.", href: "/accommodation?type=Hostels", icon: "user-group-man-man", label: "Better together" },
          { title: "Apartments", copy: "A little independence. A space that feels like you.", href: "/accommodation?type=Apartments", icon: "apartment", label: "Your own pace" },
          { title: "Off-campus homes", copy: "Self-contains and shared houses close to campus.", href: "/accommodation?type=Student%20Accommodation", icon: "student-center", label: "Closer to campus" },
        ]} />
      </section>

      <section className={kit.section}>
        <SectionHead kicker="How Lodgely helps" title={<>Search. Compare. <em>Settle in.</em></>} />
        <FeatureTiles numbered items={[
          { title: "Search", copy: "Find places by university, location, budget and property type." },
          { title: "Compare", copy: "Put up to three places side by side, including the real cost to move in." },
          { title: "Verify", copy: "Check the details, the people and the agreement before you commit." },
          { title: "Connect", copy: "Ask questions and book an inspection with the owner or agent." },
          { title: "Secure", copy: "Move through the applicable reservation or rental process with clear records." },
        ]} />
      </section>

      <section className={kit.section}>
        <SectionHead kicker="Student FAQs" title={<>Questions students <em>ask us.</em></>} copy={<>Still unsure? Read our <Link href="/guides/first-time-renter-checklist" style={{ textDecoration: "underline" }}>first-time renter’s checklist</Link>.</>} />
        <Faqs items={[
          { q: "When should I start looking for off-campus accommodation?", a: "As early as you can. Demand peaks just before each academic session, so starting early gives you time to compare places and inspect them properly." },
          { q: "What costs should I budget for besides rent?", a: "Depending on the market, there may be a refundable caution fee or deposit, an agreement fee, service charges, utilities and sometimes an agency fee. Ask for every cost in writing before you pay." },
          { q: "Can I inspect a place before paying?", a: "You should. Request an in-person or live video inspection. If someone refuses any inspection and pushes you to pay quickly, treat that as a warning sign." },
          { q: "Is rent paid monthly or yearly?", a: "It depends on the market and the property. In many Nigerian cities rent is often paid yearly, while in Kigali it is usually paid monthly with a deposit." },
          { q: "Does Lodgely verify every property?", a: "Verification depends on the listing and the market. Each listing will show what has been checked. Always do your own checks too." },
        ]} />
      </section>

      <section className={kit.section}>
        <CtaBand eyebrow="Your campus chapter" title={<>A place to live.<br /><em>Space to become.</em></>} copy="Start with your university, your budget and your move-in date." actions={[{ label: "Find student accommodation", href: "/accommodation?type=Student%20Accommodation", primary: true }, { label: "Browse universities", href: "/universities" }]} />
      </section>
    </div>
  );
}
