"use client";

import { useState } from "react";
import { toggleSaved, useSaved } from "@/lib/saved";
import styles from "./property.module.css";

export default function SaveButton({ slug, title }: { slug: string; title: string }) {
  const saved = useSaved().includes(slug);
  const [copied, setCopied] = useState(false);
  async function share() {
    const url = window.location.href;
    try {
      if (navigator.share) await navigator.share({ title, url });
      else { await navigator.clipboard.writeText(url); setCopied(true); setTimeout(() => setCopied(false), 1800); }
    } catch { /* share cancelled */ }
  }
  return (
    <div className={styles.headActions}>
      <button onClick={share}>{copied ? "Link copied" : "Share"} <span aria-hidden="true">↗</span></button>
      <button onClick={() => toggleSaved(slug)} aria-pressed={saved} className={saved ? styles.isSaved : ""}>{saved ? "♥ Saved" : "♡ Save"}</button>
    </div>
  );
}
