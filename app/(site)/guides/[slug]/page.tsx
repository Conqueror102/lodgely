import type { Metadata } from "next";
import { seo } from "@/lib/seo";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/ui/breadcrumbs";
import { getGuide, guides } from "@/data/guides";
import { Checklist, ReadingProgress } from "./reading";
import styles from "../guides.module.css";

export const dynamicParams = false;
export function generateStaticParams() { return guides.map(guide => ({ slug: guide.slug })); }

export async function generateMetadata({ params }: PageProps<"/guides/[slug]">): Promise<Metadata> {
  const guide = getGuide((await params).slug);
  return guide ? seo({ title: `${guide.title} | Lodgely Guides`, description: guide.excerpt, path: `/guides/${guide.slug}` }) : {};
}

export default async function GuidePage({ params }: PageProps<"/guides/[slug]">) {
  const guide = getGuide((await params).slug);
  if (!guide) notFound();
  const related = guides.filter(item => item.slug !== guide.slug).slice(0, 3);
  return (
    <article className={styles.article} id="article">
      <header className={styles.articleHead}>
        <Breadcrumbs items={[{ label: "Guides", href: "/guides" }, { label: guide.title }]} />
        <span className={styles.meta}>{guide.category} · {guide.minutes} min read</span>
        <h1>{guide.title}</h1>
        <p>{guide.excerpt}</p>
        <div className={styles.articleImage}><Image src={guide.image} alt="" fill priority sizes="(max-width: 900px) 92vw, 40vw" /></div>
      </header>
      <div className={styles.articleLayout}>
        <ReadingProgress sections={guide.sections.map(section => section.heading)} />
        <div className={styles.prose}>
          {guide.sections.map((section, index) => <section key={section.heading} id={`section-${index}`}>
            <h2><span>{String(index + 1).padStart(2, "0")}</span>{section.heading}</h2>
            {section.body.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
            {section.checklist && <Checklist items={section.checklist} />}
          </section>)}
          <div className={styles.articleCta}><strong>Ready to start?</strong><div><Link href="/accommodation">Find accommodation ↗</Link><Link href="/trust-and-safety">Safety guide ↗</Link></div></div>
        </div>
      </div>
      <section className={styles.related}>
        <h2>Keep reading</h2>
        <div className={styles.grid}>{related.map(item => <Link key={item.slug} href={`/guides/${item.slug}`} className={`${styles.card} ${styles[item.tone]}`}>
          <div className={styles.cardImage}><Image src={item.image} alt="" fill sizes="(max-width: 700px) 92vw, 30vw" /></div>
          <span className={styles.meta}>{item.category} · {item.minutes} min</span><h3>{item.title}</h3><span className={styles.arrow} aria-hidden="true">↗</span>
        </Link>)}</div>
      </section>
    </article>
  );
}
