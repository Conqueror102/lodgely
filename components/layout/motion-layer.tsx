"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import "@/components/layout/motion-layer.css";

const ease = "cubic-bezier(.2,.8,.2,1)";
const still = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;
/** When a link was followed; kept outside React so the curtain survives the header remounting between layouts. */
let coveredAt = 0;
const finePointer = () => window.matchMedia("(hover: hover) and (pointer: fine)").matches;

type Kind = "block" | "title" | "pop" | "img";

/** Usable on-screen element: not fixed, sticky, hidden or inside chrome. */
function usable(element: HTMLElement) {
  if (element.matches("[data-reveal]") || element.closest("header, dialog, footer, nav") || element.matches("script, style, [hidden]")) return false;
  const style = getComputedStyle(element);
  return style.position !== "fixed" && style.position !== "sticky" && style.display !== "none" && style.display !== "contents";
}

/** Small rounded things (buttons, pills, chips, badges) pop in on their own. */
function isChip(element: HTMLElement) {
  const box = element.getBoundingClientRect();
  return box.width > 0 && box.width < 340 && box.height < 80 && parseFloat(getComputedStyle(element).borderTopLeftRadius) >= 12;
}

/** Collects the blocks of a page that should animate in, plus the single components inside them. */
function revealTargets(root: ParentNode) {
  const found = new Map<HTMLElement, Kind>();
  const add = (element: HTMLElement, kind: Kind) => { if (!found.has(element) && usable(element)) found.set(element, kind); };
  root.querySelectorAll<HTMLElement>("main section, main article").forEach(section => {
    if (!usable(section)) return;
    for (const child of Array.from(section.children) as HTMLElement[]) {
      add(child, child.matches("h2, h3") || child.querySelector(":scope > h2") ? "title" : "block");
      const kids = Array.from(child.children) as HTMLElement[];
      if (kids.length >= 2 && kids.length <= 12 && /grid|flex/.test(getComputedStyle(child).display)) kids.forEach(kid => add(kid, "block"));
    }
  });
  // Single components: headings, list rows, images and chips animate individually inside their block.
  root.querySelectorAll<HTMLElement>("main section h2, main section h3, main section li, main section img, main section a, main section button, main section label").forEach(element => {
    if (found.size > 260) return;
    if (element.matches("img")) { if (element.getBoundingClientRect().width > 120) add(element, "img"); return; }
    if (element.matches("h2, h3")) { add(element, "title"); return; }
    if (element.matches("li")) { add(element, "block"); return; }
    if (isChip(element)) add(element, "pop");
  });
  return found;
}

/** Picks where an element flies in from: its side of the screen, or from below when it spans the middle. */
function direction(element: HTMLElement) {
  const box = element.getBoundingClientRect();
  const width = window.innerWidth;
  if (box.width > width * 0.7) return "up";
  const center = (box.left + box.width / 2) / width;
  return center < 0.42 ? "left" : center > 0.58 ? "right" : "up";
}

/** Site-wide motion: scroll reveals, a page curtain, magnetic buttons, click bursts, a cursor halo and image parallax. */
export default function MotionLayer() {
  const pathname = usePathname();
  const curtain = useRef<HTMLDivElement>(null);
  const cursor = useRef<HTMLDivElement>(null);

  // Scroll reveals, re-scanned on every page: blocks slide in from their side, single components follow.
  useEffect(() => {
    if (still()) return;
    let pending: HTMLElement[] = [];
    let ticking = false;
    const timers: ReturnType<typeof setTimeout>[] = [];
    const show = (element: HTMLElement) => {
      const siblings = element.parentElement ? Array.from(element.parentElement.children) : [];
      const index = Math.max(0, siblings.indexOf(element));
      const nested = element.parentElement?.closest("[data-m]") ? 160 : 0;
      element.style.setProperty("--m-delay", `${nested + Math.min(index * 85, 510)}ms`);
      element.dataset.m = "in";
      timers.push(setTimeout(() => {
        delete element.dataset.m; delete element.dataset.kind; delete element.dataset.dir;
        element.style.removeProperty("--m-delay");
      }, 2000));
    };
    const check = () => {
      ticking = false;
      const line = window.innerHeight * 0.88;
      pending = pending.filter(element => {
        if (!element.isConnected) return false;
        if (element.getBoundingClientRect().top < line) { show(element); return false; }
        return true;
      });
    };
    const onScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(check); } };
    const frame = requestAnimationFrame(() => {
      const fold = window.innerHeight * 0.92;
      const targets = revealTargets(document);
      pending = [];
      targets.forEach((kind, element) => {
        if (element.getBoundingClientRect().top <= fold) return;
        element.dataset.kind = kind;
        element.dataset.dir = direction(element);
        element.dataset.m = "hide";
        pending.push(element);
      });
    });
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      timers.forEach(clearTimeout);
      document.querySelectorAll<HTMLElement>("[data-m]").forEach(element => { delete element.dataset.m; delete element.dataset.kind; delete element.dataset.dir; });
    };
  }, [pathname]);

  // Image parallax: pictures drift slightly against the scroll.
  useEffect(() => {
    if (still()) return;
    let images: HTMLImageElement[] = [];
    const visible = new Set<HTMLImageElement>();
    let ticking = false;
    const paint = () => {
      ticking = false;
      const height = window.innerHeight;
      visible.forEach(image => {
        const box = image.getBoundingClientRect();
        const progress = (box.top + box.height / 2 - height / 2) / height;
        image.style.translate = `0 ${(progress * -28).toFixed(1)}px`;
      });
    };
    const onScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(paint); } };
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      const image = entry.target as HTMLImageElement;
      if (entry.isIntersecting) visible.add(image); else visible.delete(image);
    }));
    const frame = requestAnimationFrame(() => {
      images = Array.from(document.querySelectorAll<HTMLImageElement>("main img")).filter(image => {
        if (image.closest("header, dialog, a[aria-label*='Lodgely']")) return false;
        const box = image.getBoundingClientRect();
        const frameBox = image.parentElement;
        return box.width > 220 && box.height > 160 && !!frameBox && getComputedStyle(frameBox).overflow !== "visible";
      }).slice(0, 40);
      images.forEach(image => { image.dataset.parallax = ""; observer.observe(image); });
      paint();
    });
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      images.forEach(image => { image.style.removeProperty("translate"); delete image.dataset.parallax; });
    };
  }, [pathname]);

  // Magnetic pill buttons, a click burst and the cursor halo.
  useEffect(() => {
    if (still()) return;
    const fine = finePointer();
    const halo = cursor.current;
    let magnet: HTMLElement | null = null;
    let x = -100, y = -100, hx = -100, hy = -100, raf = 0;
    const isPill = (element: HTMLElement) => {
      const style = getComputedStyle(element);
      const box = element.getBoundingClientRect();
      const filled = !/rgba\(0, 0, 0, 0\)|transparent/.test(style.backgroundColor) || parseFloat(style.borderTopWidth) > 0;
      return parseFloat(style.borderTopLeftRadius) >= 16 && filled && box.width < 360 && box.height < 90;
    };
    const release = (element: HTMLElement) => {
      const from = element.style.translate || "0px 0px";
      element.style.removeProperty("translate");
      element.animate([{ translate: from }, { translate: "0px 0px" }], { duration: 500, easing: ease });
    };
    const onMove = (event: PointerEvent) => {
      x = event.clientX; y = event.clientY;
      const target = (event.target as Element | null)?.closest?.<HTMLElement>("a, button");
      const pill = fine && target && !target.closest("[data-no-magnet]") && isPill(target) ? target : null;
      if (magnet && magnet !== pill) release(magnet);
      magnet = pill;
      if (pill) {
        const box = pill.getBoundingClientRect();
        const dx = (x - box.left - box.width / 2) * 0.22, dy = (y - box.top - box.height / 2) * 0.32;
        pill.style.translate = `${Math.max(-10, Math.min(10, dx)).toFixed(1)}px ${Math.max(-7, Math.min(7, dy)).toFixed(1)}px`;
      }
      if (halo) halo.dataset.state = pill || target ? "link" : (event.target as Element | null)?.closest?.("img, picture") ? "image" : "";
    };
    const loop = () => {
      hx += (x - hx) * 0.18; hy += (y - hy) * 0.18;
      if (halo) halo.style.transform = `translate3d(${hx}px, ${hy}px, 0)`;
      raf = requestAnimationFrame(loop);
    };
    const onDown = (event: PointerEvent) => {
      if (!(event.target as Element | null)?.closest?.("a, button, [role=button], label")) return;
      const burst = document.createElement("span");
      burst.className = "lodgely-burst";
      burst.style.left = `${event.clientX}px`; burst.style.top = `${event.clientY}px`;
      document.body.appendChild(burst);
      burst.addEventListener("animationend", () => burst.remove());
    };
    const onLeave = () => { if (halo) halo.dataset.state = "away"; };
    document.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerdown", onDown, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    if (fine && halo) { halo.hidden = false; raf = requestAnimationFrame(loop); }
    return () => {
      document.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerdown", onDown);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      cancelAnimationFrame(raf);
      if (magnet) magnet.style.removeProperty("translate");
    };
  }, []);

  // Page curtain: sweeps up when an internal link is followed, lifts when the new page arrives.
  useEffect(() => {
    if (still()) return;
    let fallback: ReturnType<typeof setTimeout>;
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const link = (event.target as Element | null)?.closest?.<HTMLAnchorElement>("a[href]");
      if (!link || link.target || link.hasAttribute("download")) return;
      const url = new URL(link.href, location.href);
      if (url.origin !== location.origin || url.pathname === location.pathname) return;
      const element = curtain.current;
      if (!element) return;
      coveredAt = performance.now();
      element.dataset.state = "cover";
      clearTimeout(fallback);
      fallback = setTimeout(() => { element.dataset.state = "lift"; }, 2500);
    };
    document.addEventListener("click", onClick, true);
    return () => { document.removeEventListener("click", onClick, true); clearTimeout(fallback); };
  }, []);

  useEffect(() => {
    const element = curtain.current;
    const elapsed = performance.now() - coveredAt;
    if (!element || !coveredAt || elapsed > 3000) return;
    if (element.dataset.state !== "cover") element.dataset.state = "hold";
    const lift = setTimeout(() => { coveredAt = 0; element.dataset.state = "lift"; window.scrollTo(0, 0); }, Math.max(0, 380 - elapsed));
    return () => clearTimeout(lift);
  }, [pathname]);

  return (
    <>
      <div ref={curtain} className="lodgely-curtain" aria-hidden="true" onAnimationEnd={event => { if (event.currentTarget.dataset.state === "lift") event.currentTarget.dataset.state = ""; }}>
        <span className="lodgely-curtain-mark"><span>L</span>Lodgely<i>.</i></span>
      </div>
      <div ref={cursor} className="lodgely-halo" aria-hidden="true" hidden />
    </>
  );
}
