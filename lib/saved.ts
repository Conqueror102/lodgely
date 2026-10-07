"use client";

import { useSyncExternalStore } from "react";

/** Saved (hearted) listings, kept in this browser only. */
const KEY = "lodgely:saved";
const listeners = new Set<() => void>();
let cache: string[] | null = null;

function read(): string[] {
  if (cache) return cache;
  try { cache = JSON.parse(localStorage.getItem(KEY) || "[]"); } catch { cache = []; }
  return cache!;
}

export function toggleSaved(slug: string) {
  const current = read();
  cache = current.includes(slug) ? current.filter(item => item !== slug) : [...current, slug];
  try { localStorage.setItem(KEY, JSON.stringify(cache)); } catch { /* storage unavailable: keep in memory */ }
  listeners.forEach(listener => listener());
}

const empty: string[] = [];
export function useSaved() {
  return useSyncExternalStore(
    listener => { listeners.add(listener); return () => listeners.delete(listener); },
    read,
    () => empty,
  );
}
