import type { Metadata } from "next";
import { CtaBand } from "@/components/ui/blocks";
import PageHero from "@/components/ui/page-hero";
import kit from "@/components/ui/kit.module.css";
import Library from "./library";

export const metadata: Metadata = {
  title: "Housing & Property Guides | Lodgely",
  description: "Practical guides on student accommodation, renting in Nigeria and Rwanda, avoiding scams, property management and property digitization.",
};

export default function Guides() {
  return (
    <div className={kit.page}>
      <PageHero crumbs={[{ label: "Resources & Guides" }]} eyebrow="Lodgely housing & property resources" watermark="guides."
        title={<>A little guidance<br /><em>goes a long way.</em></>}
        lead={<p>Practical, honest advice for students, renters, owners and agents. From your first search to your first night home.</p>}
        image="/how-it-works-scenes.png" imageAlt="Illustrated scenes of searching, viewing, signing and moving into a new home" />
      <section className={kit.section}><Library /></section>
      <section className={kit.section}>
        <CtaBand eyebrow="Ready when you are" title={<>Put the guides<br /><em>into practice.</em></>} actions={[{ label: "Find accommodation", href: "/accommodation", primary: true }, { label: "Trust & safety", href: "/trust-and-safety" }]} />
      </section>
    </div>
  );
}
