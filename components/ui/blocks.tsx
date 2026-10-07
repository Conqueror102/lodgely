import Link from "next/link";
import type { ReactNode } from "react";
import Icon from "@/components/ui/icon";
import { Reveal } from "@/components/ui/motion";
import styles from "@/components/ui/blocks.module.css";

/** Kicker line + headline + optional copy, used to open most sections. */
export function SectionHead({ kicker, aside, title, copy }: { kicker: string; aside?: string; title: ReactNode; copy?: ReactNode }) {
  return (
    <Reveal className={styles.head}>
      <div className={styles.kicker}><span>{kicker}</span>{aside && <span>{aside}</span>}</div>
      <div className={styles.headRow}><h2>{title}</h2>{copy && <p>{copy}</p>}</div>
    </Reveal>
  );
}

/** A grid of icon cards that each link somewhere. */
export function LinkCards({ items, columns = 3 }: { items: { title: string; copy: string; href: string; icon: string; label?: string; tone?: string }[]; columns?: 2 | 3 | 4 }) {
  return (
    <div className={`${styles.cards} ${styles[`cols${columns}`]}`}>
      {items.map((item, index) => <Reveal key={item.href + item.title} delay={index * 70}>
        <Link href={item.href} className={`${styles.card} ${styles[item.tone ?? ["sage", "cream", "sand", "mint"][index % 4]]}`}>
          <div className={styles.cardTop}><span className={styles.cardIcon}><Icon name={item.icon} size={26} /></span>{item.label && <span className={styles.cardLabel}>{item.label}</span>}<span className={styles.arrow} aria-hidden="true">↗</span></div>
          <h3>{item.title}</h3><p>{item.copy}</p>
        </Link>
      </Reveal>)}
    </div>
  );
}

/** Feature tiles without links. */
export function FeatureTiles({ items, numbered = false }: { items: { title: string; copy: string; icon?: string }[]; numbered?: boolean }) {
  return (
    <div className={styles.tiles}>
      {items.map((item, index) => <Reveal key={item.title} delay={index * 60} className={styles.tile}>
        <span className={styles.tileMark}>{numbered ? String(index + 1).padStart(2, "0") : <Icon name={item.icon ?? "checkmark"} size={24} />}</span>
        <h3>{item.title}</h3><p>{item.copy}</p>
      </Reveal>)}
    </div>
  );
}

/** Accessible accordion built on <details>. */
export function Faqs({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className={styles.faqs}>
      {items.map((item, index) => <details key={item.q} className={styles.faq} open={index === 0}>
        <summary><span className={styles.faqIcon}><Icon name="help" size={20} /></span><span>{item.q}</span><span className={styles.plus} aria-hidden="true" /></summary>
        <p>{item.a}</p>
      </details>)}
    </div>
  );
}

/** The big closing call to action. */
export function CtaBand({ eyebrow, title, copy, actions }: { eyebrow: string; title: ReactNode; copy?: string; actions: { label: string; href: string; primary?: boolean }[] }) {
  return (
    <Reveal as="section" className={styles.cta}>
      <span className={styles.ctaWord} aria-hidden="true">next.</span>
      <span className={styles.ctaEyebrow}>{eyebrow}</span>
      <h2>{title}</h2>
      {copy && <p>{copy}</p>}
      <div className={styles.ctaActions}>{actions.map(action => <Link key={action.href} href={action.href} className={action.primary ? styles.ctaPrimary : styles.ctaGhost}>{action.label}<span aria-hidden="true">↗</span></Link>)}</div>
      <span className={styles.ctaStamp} aria-hidden="true">room for<br /><strong>your next.</strong></span>
    </Reveal>
  );
}

/** Preview / compliance notice. */
export function Notice({ children }: { children: ReactNode }) {
  return <div className={styles.notice}><Icon name="help" size={20} /><div>{children}</div></div>;
}
