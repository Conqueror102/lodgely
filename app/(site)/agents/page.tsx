import type { Metadata } from "next";
import { seo } from "@/lib/seo";
import Link from "next/link";
import { CtaBand, FeatureTiles, SectionHead } from "@/components/ui/blocks";
import { Reveal } from "@/components/ui/motion";
import PageHero from "@/components/ui/page-hero";
import PreviewForm from "@/components/ui/preview-form";
import kit from "@/components/ui/kit.module.css";
import LeadBoard from "./lead-board";
import styles from "./agents.module.css";

export const metadata: Metadata = seo({
  title: "For Property Agents | Lodgely",
  description: "Grow your agency with Lodgely. Digitize listings, manage leads, communicate with clients and complete agent verification.",
  path: "/agents",
});

export default function Agents() {
  return (
    <div className={kit.page}>
      <PageHero crumbs={[{ label: "For Agents" }]} eyebrow="Property agents" watermark="agents."
        title={<>Are you an agent?<br /><em>Grow with Lodgely.</em></>}
        lead={<p>Lodgely helps property agents digitize listings, connect with accommodation seekers and manage their property pipeline from one platform.</p>}
        image="/how-connect.png" imageAlt="Illustration of a property host welcoming a renter at the door"
        stamp={{ top: "MORE CONNECTIONS", main: <>More<br />possible.</>, bottom: "BUILD YOUR NEXT" }}>
        <div className={kit.actions}>
          <Link href="#register" className={kit.primary}>Become a Lodgely agent <span aria-hidden="true">↗</span></Link>
          <Link href="#verification" className={kit.ghost}>Verification requirements <span aria-hidden="true">↓</span></Link>
        </div>
      </PageHero>

      <section className={kit.section}>
        <SectionHead kicker="Why agents join" title={<>Everything your pipeline <em>needs.</em></>} />
        <FeatureTiles items={[
          { title: "Property listing", copy: "Create digital listings with photos, amenities, pricing and availability.", icon: "home" },
          { title: "Lead management", copy: "Track every enquiry from first message to signed agreement.", icon: "user-group-man-man" },
          { title: "Client communication", copy: "Keep conversations and inspection plans in one place.", icon: "help" },
          { title: "Property inspection", copy: "Schedule in-person or live video inspections.", icon: "search" },
          { title: "Listing management", copy: "Update, pause or relist properties as they change.", icon: "settings" },
          { title: "Digital records", copy: "Agreements, receipts and notes, organised and searchable.", icon: "document" },
        ]} />
      </section>

      <section className={kit.section}>
        <SectionHead kicker="Lead management" aside="Interactive sample" title={<>From hello<br /><em>to handover.</em></>} copy="See every lead at a glance and move it forward with a tap." />
        <Reveal><LeadBoard /></Reveal>
      </section>

      <section className={kit.section} id="verification">
        <Reveal className={`${kit.panel} ${styles.verify}`}>
          <div>
            <span className={kit.eyebrow}>KYC & verification</span>
            <h2 className={kit.title}>Trust is built<br /><em>before the first listing.</em></h2>
            <p className={kit.muted}>Agents apply and undergo applicable verification. Exact requirements depend on your market and will be confirmed during registration.</p>
          </div>
          <ol className={styles.steps}>
            {[["Identity", "A valid government-issued ID and a recent photo."], ["Professional details", "Your agency name, role and contact information."], ["Business registration", "Registration documents, where applicable in your market."], ["Service areas", "The cities and neighbourhoods you cover."], ["Review", "We review your application and confirm the outcome."]].map(([title, copy], index) => <li key={title}><span>{index + 1}</span><div><strong>{title}</strong><small>{copy}</small></div></li>)}
          </ol>
        </Reveal>
      </section>

      <section className={kit.section} id="register">
        <SectionHead kicker="Agent registration" aside="Preview" title={<>Become a <em>Lodgely agent.</em></>} copy="Registration is in preview. Explore the form; nothing you enter is sent." />
        <div className={kit.panel}>
          <PreviewForm submitLabel="Submit registration" successTitle="Registration ready" successCopy="When registration opens, your application will move to verification and we’ll be in touch about next steps."
            fields={[
              { name: "name", label: "Full name", required: true, autoComplete: "name" },
              { name: "agency", label: "Agency or business name" },
              { name: "email", label: "Email", type: "email", required: true, autoComplete: "email" },
              { name: "phone", label: "Phone", type: "tel", required: true, autoComplete: "tel" },
              { name: "country", label: "Country", type: "select", options: ["Nigeria", "Rwanda"], required: true },
              { name: "experience", label: "Years of experience", type: "select", options: ["Less than 1", "1–3", "3–5", "5+"] },
              { name: "areas", label: "Cities you serve", type: "chips", options: ["Lagos", "Ibadan", "Abuja", "Kigali"], hint: "Pick all that apply." },
              { name: "about", label: "Tell us about your portfolio", type: "textarea" },
            ]} />
        </div>
      </section>

      <section className={kit.section}>
        <CtaBand eyebrow="Build your next connection" title={<>More listings.<br /><em>Better leads.</em></>} actions={[{ label: "Register as an agent", href: "#register", primary: true }, { label: "For property owners", href: "/landlords" }]} />
      </section>
    </div>
  );
}
