"use client";

import Image from "next/image";
import { useState } from "react";
import Icon from "@/components/ui/icon";
import styles from "./landlords.module.css";

const layers = [
  { id: "photos", label: "Photos", icon: "apartment", copy: "Show the space as it really is." },
  { id: "id", label: "Property ID", icon: "key", copy: "A unique digital identity for your property." },
  { id: "amenities", label: "Amenities", icon: "settings", copy: "Wi-Fi, water, power, security and more." },
  { id: "availability", label: "Availability", icon: "calendar", copy: "When it’s free and for how long." },
  { id: "documents", label: "Documentation", icon: "document", copy: "Keep supporting documents organised." },
  { id: "verification", label: "Verification", icon: "shield", copy: "Complete the applicable checks." },
];

/** Toggle profile layers and watch a digital property profile assemble itself. */
export default function ProfileBuilder() {
  const [on, setOn] = useState<string[]>(["photos", "id"]);
  const has = (id: string) => on.includes(id);
  const score = Math.round((on.length / layers.length) * 100);
  return (
    <div className={styles.builder}>
      <div className={styles.layers}>
        <span className={styles.builderLabel}>BUILD A DIGITAL PROPERTY PROFILE</span>
        {layers.map(layer => <button key={layer.id} aria-pressed={has(layer.id)} onClick={() => setOn(has(layer.id) ? on.filter(item => item !== layer.id) : [...on, layer.id])}>
          <span className={styles.layerIcon}><Icon name={layer.icon} size={22} /></span>
          <span className={styles.layerText}><strong>{layer.label}</strong><small>{layer.copy}</small></span>
          <span className={styles.switch} aria-hidden="true" />
        </button>)}
      </div>
      <div className={styles.preview} aria-live="polite">
        <div className={styles.meter}><span>Profile strength</span><strong>{score}%</strong><i style={{ width: `${score}%` }} /></div>
        <div className={styles.profile}>
          <div className={`${styles.profileImage} ${has("photos") ? "" : styles.blank}`}>
            {has("photos") ? <Image src="/hero-apartments.png" alt="Illustrative apartment building" fill sizes="400px" /> : <span>Add photos</span>}
            {has("verification") && <span className={styles.verified}><Icon name="shield" size={14} /> Checks complete</span>}
          </div>
          <div className={styles.profileBody}>
            <div className={styles.profileTop}><strong>Sunrise Residence</strong>{has("id") && <code>LDG-PR-0427</code>}</div>
            <small>Sample profile · Akoka, Lagos</small>
            {has("amenities") && <div className={styles.tags}>{["Wi-Fi ready", "Water supply", "Security", "Prepaid meter"].map(tag => <span key={tag}>{tag}</span>)}</div>}
            {has("availability") && <div className={styles.avail}><Icon name="calendar" size={16} /> 3 of 8 units available from November</div>}
            {has("documents") && <div className={styles.docs}>{["Title document", "Inspection report", "Tenancy template"].map(doc => <span key={doc}><Icon name="document" size={15} />{doc}</span>)}</div>}
          </div>
        </div>
        <span className={styles.previewNote}>Illustrative preview of a digital property profile</span>
      </div>
    </div>
  );
}
