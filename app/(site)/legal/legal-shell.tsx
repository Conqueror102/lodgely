import Link from "next/link";
import type { ReactNode } from "react";
import Breadcrumbs, { type Crumb } from "@/components/ui/breadcrumbs";
import { legalPages } from "@/data/legal";
import styles from "./legal.module.css";

export default function LegalShell({ crumbs, current, children }: { crumbs: Crumb[]; current?: string; children: ReactNode }) {
  return (
    <div className={styles.shell}>
      <aside className={styles.side}>
        <Breadcrumbs items={crumbs} />
        <span className={styles.sideLabel}>POLICIES</span>
        <nav aria-label="Legal pages">
          {legalPages.map(page => <Link key={page.slug} href={`/legal/${page.slug}`} aria-current={current === page.slug ? "page" : undefined}>{page.title}<span aria-hidden="true">↗</span></Link>)}
        </nav>
      </aside>
      <div className={styles.content}>{children}</div>
    </div>
  );
}
