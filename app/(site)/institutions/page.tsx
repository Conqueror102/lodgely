import type { Metadata } from "next";
import { seo } from "@/lib/seo";
import Link from "next/link";
import { CtaBand, LinkCards, SectionHead } from "@/components/ui/blocks";
import PageHero from "@/components/ui/page-hero";
import PreviewForm from "@/components/ui/preview-form";
import kit from "@/components/ui/kit.module.css";
import Journey from "./journey";

export const metadata: Metadata = seo({
  title: "For Universities & Institutions | Lodgely",
  description: "Partner with Lodgely on student housing discovery, off-campus directories, verified accommodation and student onboarding.",
  path: "/institutions",
});

export default function Institutions() {
  return (
    <div className={kit.page}>
      <PageHero crumbs={[{ label: "For Institutions" }]} eyebrow="Universities & institutions" watermark="campus."
        title={<>Better housing.<br /><em>Brighter beginnings.</em></>}
        lead={<p>Lodgely can work with universities, educational institutions, property owners and housing partners to improve access to accommodation around campuses.</p>}
        image="/student-life.png" imageAlt="Illustration of students sharing a relaxed moment at home"
        stamp={{ top: "GIVE POTENTIAL", main: <>A place<br />to grow.</>, bottom: "HOUSING PARTNERSHIPS" }}>
        <div className={kit.actions}>
          <Link href="#partner" className={kit.primary}>Partner with Lodgely <span aria-hidden="true">↗</span></Link>
          <Link href="#journey" className={kit.ghost}>See the student journey <span aria-hidden="true">↓</span></Link>
        </div>
      </PageHero>

      <section className={kit.section}>
        <SectionHead kicker="What we can build together" title={<>Housing support,<br /><em>designed for campuses.</em></>} />
        <LinkCards columns={3} items={[
          { title: "Student housing discovery", copy: "Help students find suitable rooms, hostels and apartments near campus.", href: "/accommodation/student-accommodation", icon: "search" },
          { title: "Off-campus directories", copy: "A dedicated, branded directory of accommodation around your institution.", href: "#partner", icon: "location" },
          { title: "Verified accommodation", copy: "Work with us on property verification standards for your students.", href: "/trust-and-safety", icon: "shield" },
          { title: "Housing partnerships", copy: "Connect with property owners and developers to grow supply.", href: "#partner", icon: "handshake" },
          { title: "Student onboarding", copy: "Share housing options with incoming students as part of admission.", href: "#journey", icon: "student-center" },
          { title: "Digital accommodation management", copy: "Organise listings, enquiries and records in one place.", href: "/landlords", icon: "settings" },
        ]} />
      </section>

      <section className={kit.section} id="journey">
        <SectionHead kicker="Student onboarding" aside="Hover to pause" title={<>From offer letter<br /><em>to first night home.</em></>} />
        <Journey />
      </section>

      <section className={kit.section} id="partner">
        <SectionHead kicker="Partnership enquiry" aside="Preview" title={<>Let’s talk about <em>your campus.</em></>} copy="Tell us about your institution and what your students need." />
        <div className={kit.panel}>
          <PreviewForm submitLabel="Send partnership enquiry" successTitle="Enquiry ready" successCopy="When enquiries open, our partnerships team will review your note and get in touch."
            fields={[
              { name: "institution", label: "Institution name", required: true },
              { name: "role", label: "Your role", required: true },
              { name: "email", label: "Work email", type: "email", required: true, autoComplete: "email" },
              { name: "country", label: "Country", type: "select", options: ["Nigeria", "Rwanda", "Other"], required: true },
              { name: "students", label: "Approximate student population", type: "select", options: ["Under 5,000", "5,000–20,000", "20,000–50,000", "50,000+"] },
              { name: "campus", label: "Campus location" },
              { name: "interests", label: "What are you interested in?", type: "chips", options: ["Housing discovery", "Off-campus directory", "Verification", "Housing partnerships", "Student onboarding"] },
              { name: "notes", label: "Anything else we should know?", type: "textarea" },
            ]} />
        </div>
      </section>

      <section className={kit.section}>
        <CtaBand eyebrow="Partner with Lodgely" title={<>Helping students<br /><em>find their place.</em></>} actions={[{ label: "Start a conversation", href: "#partner", primary: true }, { label: "Contact & partnerships", href: "/contact" }]} />
      </section>
    </div>
  );
}
