"use client";

import Icon from "@/components/ui/icon";
import { useState } from "react";
import styles from "@/components/home/faq.module.css";
import Link from "next/link";

const questions = [
  { category: "Getting started", question: "What is Lodgely?", answer: "Lodgely is a digital accommodation and property platform designed to connect accommodation seekers with properties while providing digital tools for property owners, agents and institutions." },
  { category: "Getting started", question: "Where does Lodgely operate?", answer: "Lodgely is initially focused on Nigeria and Rwanda, subject to the actual markets and services currently available." },
  { category: "Finding a place", question: "Can students find accommodation?", answer: "Yes, where Lodgely has relevant accommodation inventory and services available. Search by location, university, budget and property type to explore suitable options." },
  { category: "For partners", question: "Can landlords list properties?", answer: "Property owners can apply to list properties subject to Lodgely’s applicable verification requirements. Listing applications are coming soon in this preview." },
  { category: "For partners", question: "Can agents join?", answer: "Agents can apply and undergo applicable verification. Agent applications are coming soon in this preview." },
  { category: "For partners", question: "Does Lodgely manage properties?", answer: "Lodgely can provide digital property management capabilities where the relevant service is available." },
  { category: "Getting started", question: "Does Lodgely support investment or tokenization?", answer: "Lodgely’s broader roadmap may explore digital real estate and real-world asset infrastructure. These future or experimental capabilities are distinct from live products; their inclusion in the roadmap does not mean an investment or tokenization offering is currently available." },
];
const categories = ["All questions", "Getting started", "Finding a place", "For partners"];

export default function Faq() {
  const [category, setCategory] = useState("All questions");
  const [open, setOpen] = useState<string | null>(questions[0].question);
  const visible = questions.filter(item => category === "All questions" || item.category === category);
  return (
    <section className={styles.section} id="faq" aria-labelledby="faq-title">
      <div className={styles.intro}>
        <span className={styles.eyebrow}>GOOD QUESTIONS. CLEAR ANSWERS.</span>
        <h2 id="faq-title">Wondering?<br /><em>Let’s clear <br />things up.</em></h2>
        <p>A little clarity before your next chapter.<br />Start with what’s on your mind.</p>
        <div className={styles.questionArt} aria-hidden="true"><span className={styles.backBubble}>hello.</span><span className={styles.frontBubble}>?</span><span className={styles.littleStar}>✳</span><span className={styles.artNote}>Every good move starts<br />with a good question.</span></div>
        <Link href="/accommodation" className={styles.start}>Ready to find your place? <span aria-hidden="true">↗</span></Link>
      </div>
      <div className={styles.answers}>
        <div className={styles.filters} role="group" aria-label="Filter frequently asked questions">{categories.map(item => <button key={item} className={category === item ? styles.selected : ""} aria-pressed={category === item} onClick={() => { setCategory(item); setOpen(null); }}>{item}</button>)}</div>
        <div className={styles.results} aria-live="polite">{visible.length} questions <span>Find your answer below</span></div>
        <div className={styles.list}>{visible.map(item => {
          const index = questions.indexOf(item);
          const expanded = open === item.question;
          return <article key={item.question} className={`${styles.item} ${expanded ? styles.expanded : ""}`}>
            <h3><button id={`faq-question-${index}`} aria-expanded={expanded} aria-controls={`faq-answer-${index}`} onClick={() => setOpen(expanded ? null : item.question)}><span className={styles.number}><Icon name="help" size={22} /></span><span>{item.question}</span><span className={styles.toggle} aria-hidden="true">{expanded ? "−" : "+"}</span></button></h3>
            <div id={`faq-answer-${index}`} role="region" aria-labelledby={`faq-question-${index}`} hidden={!expanded} className={styles.answer}><p>{item.answer}</p></div>
          </article>;
        })}</div>
        <div className={styles.bottom}><span>YOUR NEXT CHAPTER, WITH A LITTLE MORE CLARITY.</span><span aria-hidden="true">↗</span></div>
      </div>
    </section>
  );
}
