"use client";

import Icon from "@/components/ui/icon";
import { useState } from "react";
import Image from "next/image";
import styles from "@/components/home/trust.module.css";
import Link from "next/link";

const topics = [
  { label: "The place", category: "PROPERTY DETAILS", title: "Look closer.\nFeel more informed.", copy: "A great-looking photo is a starting point. Get a clearer picture of the property before deciding it’s the one.", checks: ["Review the address, amenities and listing details.", "Ask about an inspection or a live viewing.", "Confirm availability and the full cost of moving in."], tag: "Get to know the place", image: "/how-explore.png", alt: "Illustrative sunlit student apartment" },
  { label: "The people", category: "OWNERS & AGENTS", title: "Know who’s\non the other side.", copy: "Good questions make better conversations. Understand who you’re dealing with and their connection to the property.", checks: ["Ask whether your contact is the owner or an agent.", "Request supporting identity and property information.", "Clarify who will handle your agreement and enquiries."], tag: "Start with a conversation", image: "/how-connect.png", alt: "Illustrative renter talking with a property host" },
  { label: "The agreement", category: "TERMS & PAYMENTS", title: "Clear details.\nFewer surprises.", copy: "Take time to understand the terms and the applicable reservation or payment process before making a commitment.", checks: ["Read the rental terms and ask about extra charges.", "Confirm the recipient and applicable payment process.", "Keep copies of your agreement and payment records."], tag: "Give the details a moment", image: "/how-secure.png", alt: "Illustrative review of rental paperwork" },
  { label: "Your instincts", category: "CONCERNS & REPORTING", title: "Something feels off?\nTake a pause.", copy: "You don’t have to rush your next move. Ask for clarification when information is missing, inconsistent or feels pressured.", checks: ["Pause if you’re pressured to pay immediately.", "Save the listing details and relevant conversations.", "Use the reporting or support channel where available."], tag: "Your questions matter", image: "/how-search.png", alt: "Illustrative accommodation seeker reviewing information on her phone" },
];

export default function Trust() {
  const [active, setActive] = useState(0);
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const topic = topics[active];
  const count = topic.checks.filter((_, index) => checked[`${active}-${index}`]).length;
  return (
    <section className={styles.section} id="trust-safety" aria-labelledby="trust-title">
      <header className={styles.header}><span className={styles.eyebrow}>A LITTLE CLARITY GOES A LONG WAY</span><span className={styles.smallTag}>Your next move, thoughtfully.</span></header>
      <div className={styles.heading}><h2 id="trust-title">Search with<br /><em>greater confidence.</em></h2><p>From the first photo to the finer details.<br />Make space for the questions that matter.</p></div>
      <div className={styles.desk}>
        <div className={styles.visual}>
          <div className={styles.orbit} aria-hidden="true" />
          <span className={styles.floatingLabel}>A LITTLE CHECKING.<br /><strong>A clearer next step.</strong></span>
          <div className={styles.photo} key={topic.image}><div className={styles.photoImage}><Image src={topic.image} alt={topic.alt} fill sizes="(max-width: 800px) 85vw, 500px" /></div><div className={styles.photoCaption}><span>LODGELY / THE CONFIDENCE GUIDE</span><Icon name={["home", "user-group-man-man", "document", "shield"][active]} size={20} /></div></div>
          <div className={styles.stamp} aria-hidden="true"><span>BEFORE YOUR</span><strong>next<br />big move.</strong><span>TAKE A CLOSER LOOK</span></div>
          <span className={styles.imageNote}>Illustrative imagery</span>
        </div>
        <div className={styles.guide}>
          <div className={styles.topics} role="group" aria-label="Explore accommodation safety topics">{topics.map((item, index) => <button key={item.label} aria-pressed={active === index} onClick={() => setActive(index)} className={active === index ? styles.selected : ""}><Icon name={["home", "user-group-man-man", "document", "shield"][index]} size={24} />{item.label}</button>)}</div>
          <div className={styles.content} key={topic.category}>
            <span className={styles.category}>{topic.category}</span><h3>{topic.title}</h3><p>{topic.copy}</p>
            <div className={styles.checkHeader}><span>YOUR PERSONAL CHECKLIST</span><span aria-live="polite">{count} / 3 reviewed</span></div>
            <div className={styles.checks}>{topic.checks.map((check, index) => <label key={check}><input type="checkbox" checked={!!checked[`${active}-${index}`]} onChange={event => setChecked({ ...checked, [`${active}-${index}`]: event.target.checked })} /><span>{check}</span></label>)}</div>
            <div className={styles.guideBottom}><span>{count === 3 ? "A little more clarity for your next move." : "Tap each point as you review it."}</span><button onClick={() => setActive((active + 1) % topics.length)} aria-label={`Next topic: ${topics[(active + 1) % topics.length].label}`}>Next <span aria-hidden="true">↗</span></button></div>
          </div>
        </div>
      </div>
      <footer className={styles.footer}><div><strong>More information. More confidence.</strong><Link className={styles.more} href="/trust-and-safety">Read the full safety guide <span aria-hidden="true">↗</span></Link></div><p>This guide supports your own checks. Verification, reporting and payment services depend on what is available for your listing and market. Checking these boxes does not verify a property.</p></footer>
    </section>
  );
}
