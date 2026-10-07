"use client";

import Image from "next/image";
import Link from "next/link";
import { legalPages } from "@/data/legal";
import Icon from "@/components/ui/icon";
import styles from "@/components/layout/footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer} id="footer">
      <div className={styles.navigation}>
        <div className={styles.brand}><Link href="/" aria-label="Lodgely home"><span>L</span>Lodgely</Link><p>Digital accommodation and property<br />infrastructure for Africa.</p><span className={styles.signoff}>Real places. Real possibilities.</span></div>
        <nav aria-label="Footer accommodation"><h3><Icon name="home" />Find your place</h3><Link href="/accommodation">Find accommodation</Link><Link href="/accommodation/student-accommodation">Student accommodation</Link><Link href="/universities">Universities</Link><Link href="/nigeria">Nigeria</Link><Link href="/rwanda">Rwanda</Link></nav>
        <nav aria-label="Footer partners"><h3><Icon name="handshake" />Build with us</h3><Link href="/landlords">Property owners</Link><Link href="/list-your-property">List your property</Link><Link href="/agents">Property agents</Link><Link href="/institutions">Universities & institutions</Link><Link href="/contact">Partnerships</Link></nav>
        <nav aria-label="Footer resources"><h3><Icon name="help" />A little guidance</h3><Link href="/guides">Housing guides</Link><Link href="/trust-and-safety">Trust & safety</Link><Link href="/about">About Lodgely</Link><Link href="/contact">Contact</Link><Link href="/#faq">FAQs</Link></nav>
      </div>
      <div className={styles.community}>
        <div className={styles.communityLine}><span>A PLACE FOR YOU. A PLACE FOR ALL OF US.</span><span className={styles.communityPill}>Find your people. Find your place. <span aria-hidden="true">✳</span></span></div>
        <div className={styles.wordmark} aria-hidden="true">Lodgely</div>
        <div className={styles.characters}><Image src="/footer-community.png" alt="Joyful 3D illustration of a community of young African adults welcoming you to Lodgely" fill sizes="(max-width: 1700px) 100vw, 1700px" /></div>
        <span className={styles.sticker} aria-hidden="true">room for<br /><strong>your next.</strong><span>↗</span></span>
      </div>
      <div className={styles.bottom}><span>© 2026 Lodgely. All rights reserved.</span><nav className={styles.legal} aria-label="Legal">{legalPages.map(page => <Link key={page.slug} href={`/legal/${page.slug}`}>{page.short}</Link>)}</nav><a href="#top" aria-label="Back to top"><Icon name="up" size={20} /></a></div>
    </footer>
  );
}
