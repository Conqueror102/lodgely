"use client";

import { useMemo, useState, useSyncExternalStore, type FormEvent } from "react";
import Icon from "@/components/ui/icon";
import { formatPrice, type Listing } from "@/data/listings";
import styles from "./property.module.css";

type Props = { listing: Pick<Listing, "slug" | "title" | "country" | "price" | "period" | "moveInCosts" | "listedBy" | "availableFrom">; priceLabel: string };

export default function ActionCard({ listing, priceLabel }: Props) {
  const [mode, setMode] = useState<"inspection" | "enquiry">("inspection");
  const [format, setFormat] = useState<"In person" | "Live video">("In person");
  const [day, setDay] = useState<string>("");
  const [slot, setSlot] = useState("Morning");
  const [sent, setSent] = useState(false);
  const total = listing.moveInCosts.reduce((sum, cost) => sum + cost.amount, 0);

  // The page is prerendered, so "the next six days" must come from the visitor's clock, not the build's.
  const today = useSyncExternalStore(() => () => {}, () => new Date().toDateString(), () => "");
  const days = useMemo(() => {
    if (!today) return [];
    const start = new Date(today);
    return Array.from({ length: 6 }, (_, i) => {
      const date = new Date(start); date.setDate(start.getDate() + i + 1);
      const iso = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
      return { iso, weekday: date.toLocaleDateString("en-GB", { weekday: "short" }), day: date.getDate() };
    });
  }, [today]);

  function submit(event: FormEvent<HTMLFormElement>) { event.preventDefault(); setSent(true); }

  return (
    <div className={styles.actionCard}>
      <div className={styles.priceBlock}>
        <span className={styles.label}>PRICE</span>
        <strong>{priceLabel}</strong>
      </div>
      <div className={styles.costs}>
        <span className={styles.label}>COST TO MOVE IN</span>
        {listing.moveInCosts.map(cost => <div key={cost.label}><span>{cost.label}</span><span>{formatPrice(listing, cost.amount)}</span></div>)}
        <div className={styles.total}><span>Estimated total</span><span>{formatPrice(listing, total)}</span></div>
        <small>Sample figures. Confirm every cost in writing before paying.</small>
      </div>

      <div className={styles.modeSwitch} role="tablist" aria-label="Choose an action">
        <button role="tab" aria-selected={mode === "inspection"} onClick={() => { setMode("inspection"); setSent(false); }}>Book inspection</button>
        <button role="tab" aria-selected={mode === "enquiry"} onClick={() => { setMode("enquiry"); setSent(false); }}>Send enquiry</button>
      </div>

      {sent ? <div className={styles.sent} role="status">
        <span className={styles.sentIcon}><Icon name="checkmark" size={26} /></span>
        <strong>{mode === "inspection" ? "Inspection request ready" : "Enquiry ready"}</strong>
        <p>This is a preview, so nothing was sent. When live, your {mode === "inspection" ? `${format.toLowerCase()} inspection request` : "message"} will go to the {listing.listedBy.toLowerCase()}.</p>
        <button onClick={() => setSent(false)}>Start again</button>
      </div> : <form className={styles.form} onSubmit={submit}>
        {mode === "inspection" && <>
          <div className={styles.toggle} role="group" aria-label="Inspection format">{(["In person", "Live video"] as const).map(item => <button type="button" key={item} aria-pressed={format === item} onClick={() => setFormat(item)}>{item}</button>)}</div>
          <div className={styles.days} role="group" aria-label="Choose a day">{days.map(item => <button type="button" key={item.iso} aria-pressed={day === item.iso} onClick={() => setDay(item.iso)}><small>{item.weekday}</small><strong>{item.day}</strong></button>)}</div>
          <div className={styles.toggle} role="group" aria-label="Time of day">{["Morning", "Afternoon", "Evening"].map(item => <button type="button" key={item} aria-pressed={slot === item} onClick={() => setSlot(item)}>{item}</button>)}</div>
        </>}
        <label><span>Your name</span><input required name="name" autoComplete="name" /></label>
        <label><span>Phone or email</span><input required name="contact" autoComplete="email" /></label>
        {mode === "enquiry" && <label><span>Your message</span><textarea name="message" rows={4} defaultValue={`Hi, is ${listing.title} still available from ${new Date(`${listing.availableFrom}T00:00:00`).toLocaleDateString("en-GB", { day: "numeric", month: "long" })}?`} /></label>}
        <button className={styles.submit} type="submit" disabled={mode === "inspection" && !day}>{mode === "inspection" ? (day ? "Request inspection" : "Pick a day first") : "Send enquiry"} <span aria-hidden="true">↗</span></button>
      </form>}

      <div className={styles.listedBy}>
        <span className={styles.avatar}><Icon name={listing.listedBy === "Agent" ? "handshake" : "home"} size={22} /></span>
        <div><strong>Listed by a {listing.listedBy.toLowerCase()}</strong><small>Sample contact · identity and verification details appear here for live listings</small></div>
      </div>
    </div>
  );
}
