import type { Metadata } from "next";
import Link from "next/link";
import { legalPages } from "@/data/legal";
import LegalShell from "./legal-shell";
import styles from "./legal.module.css";

export const metadata: Metadata = { title: "Legal | Lodgely", description: "Lodgely's terms, privacy, cookie, KYC, property verification and refund policies, and disclaimer." };

export default function Legal() {
  return (
    <LegalShell crumbs={[{ label: "Legal" }]}>
      <h1>The fine print,<br /><em>made findable.</em></h1>
      <p className={styles.intro}>Everything that governs how Lodgely works, in one place.</p>
      <div className={styles.cards}>{legalPages.map((page, index) => <Link key={page.slug} href={`/legal/${page.slug}`} className={styles.card}><span>{String(index + 1).padStart(2, "0")}</span><strong>{page.title}</strong><small>{page.summary}</small><em aria-hidden="true">↗</em></Link>)}</div>
    </LegalShell>
  );
}
