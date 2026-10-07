"use client";

import { useEffect, useRef, type CSSProperties, type ElementType, type ReactNode, type PointerEvent } from "react";
import styles from "@/components/ui/motion.module.css";

/** Fades and lifts its children into view the first time they scroll on screen. */
export function Reveal({ children, className = "", delay = 0, as: Tag = "div", id }: { children: ReactNode; className?: string; delay?: number; as?: ElementType; id?: string }) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { element.dataset.visible = "true"; observer.disconnect(); }
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  return <Tag ref={ref} id={id} data-reveal="" className={`${styles.reveal} ${className}`} style={{ "--delay": `${delay}ms` } as CSSProperties}>{children}</Tag>;
}

/** Tracks the pointer so `.spotlight` / `.tilt` styles can follow it. */
export function Spotlight({ children, className = "", tilt = false, as: Tag = "div", onPointerLeave, ...rest }: { children: ReactNode; className?: string; tilt?: boolean; as?: ElementType; onPointerLeave?: (event: PointerEvent<HTMLElement>) => void; [key: string]: unknown }) {
  function move(event: PointerEvent<HTMLElement>) {
    const element = event.currentTarget;
    const box = element.getBoundingClientRect();
    const x = (event.clientX - box.left) / box.width;
    const y = (event.clientY - box.top) / box.height;
    element.style.setProperty("--x", `${x * 100}%`);
    element.style.setProperty("--y", `${y * 100}%`);
    if (tilt && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      element.style.setProperty("--rx", `${(0.5 - y) * 7}deg`);
      element.style.setProperty("--ry", `${(x - 0.5) * 9}deg`);
    }
  }
  function leave(event: PointerEvent<HTMLElement>) {
    event.currentTarget.style.setProperty("--rx", "0deg");
    event.currentTarget.style.setProperty("--ry", "0deg");
    onPointerLeave?.(event);
  }
  return <Tag className={`${className} ${tilt ? styles.tilt : ""}`} {...rest} onPointerMove={move} onPointerLeave={leave}>{children}</Tag>;
}

/** Counts up to a number when it scrolls into view. */
export function CountUp({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      const start = performance.now();
      const step = (now: number) => {
        const progress = Math.min(1, (now - start) / 900);
        element.textContent = `${Math.round(to * (1 - Math.pow(1 - progress, 3)))}${suffix}`;
        if (progress < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, [to, suffix]);
  return <span ref={ref}>{to}{suffix}</span>;
}
