import Image from "next/image";
import type { ReactNode } from "react";
import Breadcrumbs, { type Crumb } from "@/components/ui/breadcrumbs";
import { Spotlight } from "@/components/ui/motion";
import styles from "@/components/ui/page-hero.module.css";

type Props = {
  crumbs: Crumb[]; eyebrow: string; title: ReactNode; lead: ReactNode; watermark?: string;
  image?: string; imageAlt?: string; imageFit?: "cover" | "contain";
  stamp?: { top: string; main: ReactNode; bottom: string };
  children?: ReactNode; aside?: ReactNode; tone?: "cream" | "dark";
};

/** The opening panel for every inner page: breadcrumb, headline, lead, actions and a playful visual. */
export default function PageHero({ crumbs, eyebrow, title, lead, watermark, image, imageAlt = "", imageFit = "cover", stamp, children, aside, tone = "cream" }: Props) {
  return (
    <section className={`${styles.hero} ${tone === "dark" ? styles.dark : ""}`}>
      {watermark && <span className={styles.watermark} aria-hidden="true">{watermark}</span>}
      <div className={styles.copy}>
        <Breadcrumbs items={crumbs} />
        <span className={styles.eyebrow}>{eyebrow}</span>
        <h1>{title}</h1>
        <div className={styles.lead}>{lead}</div>
        {children && <div className={styles.extra}>{children}</div>}
      </div>
      {(image || aside) && <div className={styles.side}>
        {image && <Spotlight tilt className={`${styles.visual} ${imageFit === "contain" ? styles.contain : ""}`}>
          <div className={styles.grid} aria-hidden="true" />
          <Image src={image} alt={imageAlt} fill priority sizes="(max-width: 900px) 92vw, 45vw" />
          <span className={styles.imageNote}>Illustrative imagery</span>
        </Spotlight>}
        {aside}
        {stamp && <div className={styles.stamp} aria-hidden="true"><span>{stamp.top}</span><strong>{stamp.main}</strong><span>{stamp.bottom}</span></div>}
      </div>}
    </section>
  );
}
