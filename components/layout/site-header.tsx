"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Icon from "@/components/ui/icon";
import QuickJump from "@/components/layout/quick-jump";
import MotionLayer from "@/components/layout/motion-layer";
import { navGroups } from "@/data/site-map";
import styles from "@/components/layout/site-header.module.css";

const features: Record<string, { image: string; title: string; href: string; cta: string }> = {
  find: { image: "/accommodation-studio.png", title: "Make room for what’s next.", href: "/accommodation", cta: "Start searching" },
  partners: { image: "/hero-apartments.png", title: "Your space. Their next chapter.", href: "/list-your-property", cta: "List your property" },
  learn: { image: "/how-secure.png", title: "Search with greater confidence.", href: "/trust-and-safety", cta: "Read the safety guide" },
};

export default function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState<string | null>(null);
  const [mobile, setMobile] = useState(false);
  const [jump, setJump] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const progress = useRef<HTMLSpanElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 30);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      progress.current?.style.setProperty("transform", `scaleX(${max > 0 ? window.scrollY / max : 0})`);
    };
    const onKey = (event: KeyboardEvent) => {
      const typing = event.target instanceof HTMLElement && (event.target.matches("input, textarea, select") || event.target.isContentEditable);
      if ((event.key === "k" && (event.metaKey || event.ctrlKey)) || (event.key === "/" && !typing)) { event.preventDefault(); setJump(true); setMobile(false); }
      if (event.key === "Escape") setOpen(null);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("keydown", onKey);
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("keydown", onKey); };
  }, []);

  // Close menus whenever the route changes.
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) { setLastPath(pathname); setOpen(null); setMobile(false); }

  useEffect(() => { document.body.style.overflow = mobile ? "hidden" : ""; }, [mobile]);

  const isActive = (href: string) => href === pathname || (href !== "/" && pathname.startsWith(`${href}/`));
  const groupActive = (id: string) => navGroups.find(group => group.id === id)!.links.some(link => isActive(link.href));
  const show = (id: string) => { clearTimeout(closeTimer.current); setOpen(id); };
  const hide = () => { closeTimer.current = setTimeout(() => setOpen(null), 160); };
  const panel = navGroups.find(group => group.id === open);

  return (
    <>
      <header className={`${styles.header} ${scrolled ? styles.scrolled : ""} ${open ? styles.menuOpen : ""}`} onPointerLeave={hide} onPointerEnter={() => clearTimeout(closeTimer.current)}>
        <div className={styles.bar}>
          <Link className={styles.brand} href="/" aria-label="Lodgely home"><span>L</span>Lodgely<span className={styles.dot}>.</span></Link>
          <nav className={styles.nav} aria-label="Main navigation">
            {navGroups.map(group => (
              <button key={group.id} className={`${styles.trigger} ${groupActive(group.id) ? styles.current : ""}`} aria-expanded={open === group.id} aria-controls="mega-panel"
                onPointerEnter={event => { if (event.pointerType === "mouse") show(group.id); }} onClick={() => setOpen(open === group.id ? null : group.id)}>
                {group.label}<span className={styles.chevron} aria-hidden="true">↓</span>
              </button>
            ))}
          </nav>
          <div className={styles.tools}>
            <button className={styles.jump} onClick={() => setJump(true)} aria-label="Jump anywhere (Ctrl K)"><Icon name="search" size={17} /><span>Jump to…</span><kbd>⌘K</kbd></button>
            <Link className={styles.cta} href="/list-your-property">List your property <span aria-hidden="true">↗</span></Link>
            <button className={styles.menuButton} aria-expanded={mobile} aria-controls="mobile-menu" onClick={() => setMobile(!mobile)}><span>{mobile ? "Close" : "Menu"}</span><span className={`${styles.burger} ${mobile ? styles.burgerOpen : ""}`} aria-hidden="true"><i /><i /></span></button>
          </div>
          <span className={styles.progress} ref={progress} aria-hidden="true" />
        </div>

        {panel && <div className={styles.mega} id="mega-panel" key={panel.id}>
          <div className={styles.megaIntro}>
            <span className={styles.megaLabel}>{panel.label}</span>
            <p>{panel.tagline}</p>
            <Link href={features[panel.id].href} className={styles.feature}>
              <Image src={features[panel.id].image} alt="" fill sizes="320px" />
              <span className={styles.featureText}><strong>{features[panel.id].title}</strong><span>{features[panel.id].cta} ↗</span></span>
            </Link>
          </div>
          <ul className={styles.megaLinks}>
            {panel.links.map((link, index) => <li key={link.href} style={{ animationDelay: `${index * 40}ms` }}>
              <Link href={link.href} className={isActive(link.href) ? styles.here : ""} aria-current={isActive(link.href) ? "page" : undefined}>
                <span className={styles.linkIcon}><Icon name={link.icon} size={22} /></span>
                <span className={styles.linkText}><strong>{link.label}</strong><small>{link.hint}</small></span>
                <span className={styles.linkArrow} aria-hidden="true">↗</span>
              </Link>
            </li>)}
          </ul>
        </div>}
      </header>

      {mobile && <div className={styles.sheet} id="mobile-menu" role="dialog" aria-modal="true" aria-label="Site menu">
        <button className={styles.sheetJump} onClick={() => { setMobile(false); setJump(true); }}><Icon name="search" size={20} />Search pages, cities, universities…</button>
        {navGroups.map((group, groupIndex) => <section key={group.id} style={{ animationDelay: `${groupIndex * 70}ms` }}>
          <h2>{group.label}</h2>
          {group.links.map(link => <Link key={link.href} href={link.href} aria-current={isActive(link.href) ? "page" : undefined}><Icon name={link.icon} size={20} /><span>{link.label}</span><span aria-hidden="true">↗</span></Link>)}
        </section>)}
        <Link className={styles.sheetCta} href="/accommodation">Find accommodation <span aria-hidden="true">↗</span></Link>
      </div>}

      <QuickJump open={jump} onClose={() => setJump(false)} />
      <MotionLayer />
    </>
  );
}
