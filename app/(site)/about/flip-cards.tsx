"use client";

import { useState } from "react";
import styles from "./about.module.css";

const challenges = [
  { problem: "Searching is slow and scattered.", answer: "One place to search by city, university, budget, type and move-in date." },
  { problem: "Listings are hard to trust.", answer: "Clear listing information, applicable verification and practical safety guidance." },
  { problem: "Costs arrive as surprises.", answer: "Upfront move-in costs, so seekers can compare the real price of a place." },
  { problem: "Property records live on paper.", answer: "Digital property profiles that bring photos, details and documents together." },
];

/** Tap a challenge to see how Lodgely responds. */
export default function FlipCards() {
  const [flipped, setFlipped] = useState<number[]>([]);
  return (
    <div className={styles.flips}>
      {challenges.map((item, index) => {
        const on = flipped.includes(index);
        return <button key={item.problem} className={`${styles.flip} ${on ? styles.flipped : ""}`} aria-pressed={on} onClick={() => setFlipped(on ? flipped.filter(i => i !== index) : [...flipped, index])}>
          <span className={styles.face}><small>THE CHALLENGE · 0{index + 1}</small><strong>{item.problem}</strong><em>Tap to see our answer ↻</em></span>
          <span className={`${styles.face} ${styles.back}`}><small>HOW LODGELY HELPS</small><strong>{item.answer}</strong><em>Tap to flip back ↻</em></span>
        </button>;
      })}
    </div>
  );
}
