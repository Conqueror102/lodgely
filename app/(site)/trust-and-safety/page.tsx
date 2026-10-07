import type { Metadata } from "next";
import { seo } from "@/lib/seo";
import Link from "next/link";
import { CtaBand, FeatureTiles, LinkCards, SectionHead } from "@/components/ui/blocks";
import { Reveal } from "@/components/ui/motion";
import PageHero from "@/components/ui/page-hero";
import kit from "@/components/ui/kit.module.css";
import RedFlagQuiz from "./red-flag-quiz";
import styles from "./trust.module.css";

export const metadata: Metadata = seo({
  title: "Trust & Safety | Lodgely",
  description: "How verification works on Lodgely, practical safety guidance for renters, how to report a concern and which payment protections apply.",
  path: "/trust-and-safety",
});

export default function TrustAndSafety() {
  return (
    <div className={kit.page}>
      <PageHero crumbs={[{ label: "Trust & Safety" }]} eyebrow="Search with greater confidence" watermark="trust."
        title={<>More information.<br /><em>More confidence.</em></>}
        lead={<p>Verification, safety guidance, reporting and payment protections, explained plainly. Here’s what we check, what you should check, and what to do if something feels off.</p>}
        image="/how-secure.png" imageAlt="Illustration of a person carefully reviewing a rental agreement"
        stamp={{ top: "BEFORE YOUR", main: <>next<br />big move.</>, bottom: "TAKE A CLOSER LOOK" }}>
        <div className={kit.actions}><Link href="#quiz" className={kit.primary}>Test your scam radar <span aria-hidden="true">↓</span></Link><Link href="/contact?type=report#write" className={kit.ghost}>Report a concern <span aria-hidden="true">↗</span></Link></div>
      </PageHero>

      <section className={kit.section}>
        <SectionHead kicker="How verification works" aside="Six layers of trust" title={<>What Lodgely <em>checks.</em></>} copy="Verification depends on the listing and the market. Each listing will show exactly which checks have been completed, so you never have to guess." />
        <FeatureTiles items={[
          { title: "User verification", copy: "Identity checks for people using Lodgely, where applicable.", icon: "user-group-man-man" },
          { title: "Property verification", copy: "Checks that a listed property exists and matches its listing, under our Property Verification Policy.", icon: "home" },
          { title: "Agent verification", copy: "Agents complete KYC and professional checks before listing.", icon: "handshake" },
          { title: "Fraud prevention", copy: "Monitoring for suspicious listings, behaviour and repeated reports.", icon: "shield" },
          { title: "Secure payments where available", copy: "Payment protections apply only where a listing shows they are available.", icon: "money" },
          { title: "Reporting", copy: "A clear way to report listings, owners or agents that concern you.", icon: "help" },
        ]} />
        {/* Before launch: confirm each statement above matches Lodgely's live KYC, verification, security and payment controls. */}
      </section>

      <section className={kit.section} id="quiz">
        <SectionHead kicker="Spot the red flag" aside="Five quick scenarios" title={<>How sharp is your<br /><em>scam radar?</em></>} copy="Real-world patterns, made into a two-minute game." />
        <Reveal><RedFlagQuiz /></Reveal>
      </section>

      <section className={kit.section}>
        <Reveal className={`${kit.panel} ${styles.golden}`}>
          <div><span className={kit.eyebrow}>Safety guidance</span><h2 className={kit.title}>Five golden rules<br /><em>before you pay.</em></h2></div>
          <ol className={styles.rules}>
            {["Inspect in person or by live video.", "Confirm who owns the property and who you’re dealing with.", "Get every cost in writing, including one-off fees.", "Check who receives each payment before you send it.", "Keep your agreement, receipts and messages."].map((rule, index) => <li key={rule}><span>{index + 1}</span>{rule}</li>)}
          </ol>
        </Reveal>
      </section>

      <section className={kit.section}>
        <SectionHead kicker="Reporting & protections" title={<>If something <em>feels off.</em></>} />
        <LinkCards columns={3} items={[
          { title: "Report a listing", copy: "Tell us about a suspicious listing, owner or agent. Save screenshots and messages first.", href: "/contact?type=report#write", icon: "shield", label: "Reporting" },
          { title: "Get support", copy: "Questions about an enquiry, inspection or agreement? We’ll help where we can.", href: "/contact?type=support#write", icon: "help", label: "Support" },
          { title: "Payment protections", copy: "Read which payments are covered, when refunds apply and how to request one.", href: "/legal/refunds", icon: "money", label: "Payments" },
        ]} />
      </section>

      <section className={kit.section}>
        <CtaBand eyebrow="Learn more" title={<>Read the full<br /><em>safety guide.</em></>} actions={[{ label: "How to avoid scams", href: "/guides/how-to-avoid-accommodation-scams", primary: true }, { label: "Our policies", href: "/legal" }]} />
      </section>
    </div>
  );
}
