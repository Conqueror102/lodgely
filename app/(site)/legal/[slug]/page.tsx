import type { Metadata } from "next";
import { seo } from "@/lib/seo";
import { notFound } from "next/navigation";
import { getLegalPage, legalPages } from "@/data/legal";
import LegalShell from "../legal-shell";
import styles from "../legal.module.css";

export const dynamicParams = false;
export function generateStaticParams() { return legalPages.map(page => ({ slug: page.slug })); }

export async function generateMetadata({ params }: PageProps<"/legal/[slug]">): Promise<Metadata> {
  const page = getLegalPage((await params).slug);
  return page ? seo({ title: `${page.title} | Lodgely`, description: page.summary, path: `/legal/${page.slug}`, noindex: true }) : {};
}

export default async function LegalPage({ params }: PageProps<"/legal/[slug]">) {
  const page = getLegalPage((await params).slug);
  if (!page) notFound();
  const approved = page.sections.every(section => section.body);
  return (
    <LegalShell crumbs={[{ label: "Legal", href: "/legal" }, { label: page.title }]} current={page.slug}>
      <span className={styles.kicker}>LODGELY POLICY</span>
      <h1>{page.title}</h1>
      <p className={styles.intro}>{page.summary}</p>
      {!approved && <div className={styles.pending} role="note"><strong>Approved policy text coming soon.</strong> This page shows the structure the {page.title.toLowerCase()} will follow. The full text will be published here once it has been approved.</div>}
      <ol className={styles.sections}>{page.sections.map((section, index) => <li key={section.heading} id={`part-${index + 1}`}>
        <h2><span>{index + 1}.</span>{section.heading}</h2>
        {section.body ? <p>{section.body}</p> : <p className={styles.placeholder}>Section pending approval.</p>}
      </li>)}</ol>
    </LegalShell>
  );
}
