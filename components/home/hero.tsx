"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import Icon from "@/components/ui/icon";
import styles from "@/components/home/hero.module.css";
import Link from "next/link";

const moods = [
  { label: "Campus life", type: "Student Accommodation", icon: "student-center", title: "Close to campus.\nCloser to your next chapter.", tag: "SPACE TO STUDY. ROOM TO GROW.", image: "/hero-apartments.png", cutout: true },
  { label: "My own space", type: "Apartments", icon: "home", title: "Your own rhythm.\nYour own little world.", tag: "MAKE ROOM FOR YOUR EVERYDAY.", image: "/how-explore.png", cutout: false },
  { label: "A fresh start", type: "Short-Term Stays", icon: "key", title: "New city. New keys.\nA whole new beginning.", tag: "WHERE YOUR NEXT CHAPTER BEGINS.", image: "/how-move.png", cutout: false },
];

export default function Hero() {
  const [propertyType, setPropertyType] = useState("");
  const [mood, setMood] = useState(0);
  const [location, setLocation] = useState("");
  const [message, setMessage] = useState("");
  const scene = moods[mood];
  const router = useRouter();
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const params = new URLSearchParams({ q: location.trim() });
    if (propertyType) params.set("type", propertyType);
    if (form.get("moveIn")) params.set("moveIn", String(form.get("moveIn")));
    setMessage("Finding your kind of place…");
    router.push(`/accommodation?${params}`);
  }
  return (
    <section className={styles.hero} id="top" aria-labelledby="hero-title">
      <div className={styles.main}>
        <div className={styles.copy}>
          <span className={styles.eyebrow}><span aria-hidden="true" />YOUR NEXT CHAPTER HAS AN ADDRESS.</span>
          <h1 id="hero-title">Find your place.<br /><em>Make it</em> <span className={styles.homeWord}>home.<svg viewBox="0 0 260 18" aria-hidden="true"><path d="M4 12 Q130 -1 254 10 M20 17 Q140 7 230 15" /></svg></span></h1>
          <p className={styles.lead}>Student accommodation, rentals &amp; homes across Africa.</p>
          <p className={styles.description}>Discover, compare and secure accommodation. Give your next chapter a place to begin — with digital tools for owners and agents, too.</p>
          <div className={styles.actions}><Link href="/accommodation">Find accommodation <span aria-hidden="true">↗</span></Link><a href="#how-it-works"><span className={styles.play} aria-hidden="true">↗</span>See how it works</a></div>
          <div className={styles.moodPicker}><span>WHAT DOES YOUR NEXT CHAPTER LOOK LIKE?</span><div role="group" aria-label="Choose your accommodation lifestyle">{moods.map((item, index) => <button key={item.label} aria-pressed={mood === index} className={mood === index ? styles.chosen : ""} onClick={() => { setMood(index); setPropertyType(item.type); setMessage(""); }}><Icon name={item.icon} size={19} />{item.label}</button>)}</div></div>
        </div>
        <div className={`${styles.visual} ${!scene.cutout ? styles.photoMode : ""}`}>
          <div className={styles.visualGrid} aria-hidden="true" /><span className={styles.visualWord} aria-hidden="true">belong.</span>
          <div className={styles.scene} key={scene.image}><Image src={scene.image} alt={scene.cutout ? "Illustrative apartment residence with balconies" : mood === 1 ? "Illustrative sunlit apartment with a bed and study space" : "Illustrative new resident holding a moving box"} fill priority={mood === 0} sizes="(max-width: 850px) 95vw, 55vw" /></div>
          <span className={styles.cornerTag}><Icon name="location" size={18} />A place for your possibilities</span>
          <div className={styles.stamp} aria-hidden="true"><Icon name="key" size={27} /><span>NEW KEYS.<br />NEW BEGINNINGS.</span></div>
          <div className={styles.visualCaption} aria-live="polite"><div><span>{scene.tag}</span><h2>{scene.title}</h2></div><Link href={`/accommodation?type=${encodeURIComponent(scene.type)}`} aria-label={`Search ${scene.type.toLowerCase()}`}>↗</Link></div>
          <span className={styles.imageNote}>Illustrative imagery</span>
        </div>
      </div>
      <div className={styles.searchArea} id="search">
        <div className={styles.searchIntro}><span><Icon name="search" size={19} />Let’s find your kind of place.</span><span>YOUR LOCATION. YOUR BUDGET. YOUR MOVE.</span></div>
        <form className={styles.search} onSubmit={submit}>
          <label><span><Icon name="location" size={19} />Where to?</span><input name="location" required value={location} onChange={event => { setLocation(event.target.value); setMessage(""); }} placeholder="City, area or university" /></label>
          <label><span><Icon name="home" size={19} />Your space</span><select name="type" value={propertyType} onChange={event => { setPropertyType(event.target.value); const match = moods.findIndex(item => item.type === event.target.value); if (match >= 0) setMood(match); }}><option value="">All property types</option>{["Student Accommodation", "Apartments", "Rooms", "Houses", "Hostels", "Short-Term Stays"].map(item => <option key={item}>{item}</option>)}</select></label>
          <label><span><Icon name="money" size={19} />Your budget</span><input name="budget" placeholder="Preferred budget" /></label>
          <label><span><Icon name="calendar" size={19} />Move-in date</span><input name="moveIn" type="date" /></label>
          <button type="submit"><Icon name="search" size={21} /><span>Find my place</span><span aria-hidden="true">↗</span></button>
        </form>
        {message && <p className={styles.message} role="status">{message}</p>}
      </div>
      <div className={styles.footnote}><span><Icon name="student-center" size={17} />Student-focused discovery</span><span><Icon name="settings" size={17} />Digital property tools</span><a href="#ecosystem">A little more about Lodgely <span aria-hidden="true">↓</span></a></div>
    </section>
  );
}
