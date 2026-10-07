"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState, useSyncExternalStore, type ChangeEvent, type DragEvent } from "react";
import Icon from "@/components/ui/icon";
import { propertyTypes } from "@/data/listings";
import { cities, universities } from "@/data/places";
import styles from "./wizard.module.css";

type Cost = { label: string; amount: string };
type Draft = {
  name: string; type: string; bedrooms: string; bathrooms: string; furnished: boolean; description: string;
  country: string; city: string; area: string; address: string; university: string;
  amenities: string[]; price: string; period: string; availableFrom: string; costs: Cost[];
  ownerName: string; email: string; phone: string; relationship: string; consent: boolean;
};
type Photo = { id: string; url: string; name: string };

const empty: Draft = {
  name: "", type: "", bedrooms: "1", bathrooms: "1", furnished: false, description: "",
  country: "", city: "", area: "", address: "", university: "",
  amenities: [], price: "", period: "year", availableFrom: "", costs: [],
  ownerName: "", email: "", phone: "", relationship: "Property owner", consent: false,
};
const steps = [
  { id: "property", label: "Property", icon: "home", title: "Tell us about your property", copy: "Start with the basics. You can change anything before you submit." },
  { id: "location", label: "Location", icon: "location", title: "Where is it?", copy: "Seekers search by city, area and nearby university." },
  { id: "photos", label: "Photos", icon: "apartment", title: "Show it off", copy: "Bright, honest photos help seekers picture their everyday. Aim for five or more." },
  { id: "amenities", label: "Amenities", icon: "settings", title: "What’s included?", copy: "Pick everything a tenant can use." },
  { id: "pricing", label: "Pricing", icon: "money", title: "Price and availability", copy: "Be upfront about every cost. Transparent listings build trust." },
  { id: "owner", label: "Your details", icon: "user-group-man-man", title: "Who’s listing?", copy: "We’ll use these details for verification and enquiries." },
  { id: "review", label: "Review", icon: "checkmark", title: "Review and submit", copy: "Check everything looks right." },
];
const amenityOptions = ["Wi-Fi", "Water supply", "Prepaid meter", "Backup power", "Security", "Parking", "Kitchen", "Shared kitchen", "Study desk", "Wardrobe", "Air conditioning", "Balcony", "Garden", "Laundry", "Gated compound", "Furnished bedroom"];
const KEY = "lodgely:listing-draft";
const readSaved = () => { try { return localStorage.getItem(KEY); } catch { return null; } };

export default function Wizard() {
  const [step, setStep] = useState(0);
  // A draft saved on this device is read once on the client; edits then live in state.
  const savedDraft = useSyncExternalStore(() => () => {}, readSaved, () => null);
  const restoredDraft = useMemo<Draft | null>(() => { try { return savedDraft ? { ...empty, ...JSON.parse(savedDraft) } : null; } catch { return null; } }, [savedDraft]);
  const [edited, setDraft] = useState<Draft | null>(null);
  const draft = edited ?? restoredDraft ?? empty;
  const restored = !edited && !!restoredDraft;
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [errors, setErrors] = useState<string[]>([]);
  const [dragging, setDragging] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const top = useRef<HTMLDivElement>(null);
  const set = (patch: Partial<Draft>) => { setDraft({ ...draft, ...patch }); setErrors([]); };

  // Save edits locally (photos stay in memory only).
  useEffect(() => { if (edited) try { localStorage.setItem(KEY, JSON.stringify(edited)); } catch { /* ignore */ } }, [edited]);
  useEffect(() => () => photos.forEach(photo => URL.revokeObjectURL(photo.url)), []); // eslint-disable-line react-hooks/exhaustive-deps

  const currency = draft.country === "rwanda" ? "RWF" : "₦";
  const cityName = cities.find(city => city.slug === draft.city)?.name ?? (draft.city === "other" ? "Other city" : "");

  function validate(index: number) {
    const missing: string[] = [];
    if (index === 0) { if (!draft.name.trim()) missing.push("Give your property a name"); if (!draft.type) missing.push("Choose a property type"); }
    if (index === 1) { if (!draft.country) missing.push("Choose a country"); if (!draft.city) missing.push("Choose a city"); if (!draft.area.trim()) missing.push("Add the area or neighbourhood"); }
    if (index === 2 && photos.length === 0) missing.push("Add at least one photo");
    if (index === 3 && draft.amenities.length === 0) missing.push("Pick at least one amenity");
    if (index === 4) { if (!draft.price || Number(draft.price) <= 0) missing.push("Add the rent amount"); if (!draft.availableFrom) missing.push("Add an available-from date"); }
    if (index === 5) { if (!draft.ownerName.trim()) missing.push("Add your name"); if (!/^\S+@\S+\.\S+$/.test(draft.email)) missing.push("Add a valid email"); if (!draft.phone.trim()) missing.push("Add a phone number"); if (!draft.consent) missing.push("Agree to verification"); }
    return missing;
  }
  function go(to: number) {
    if (to > step) {
      for (let index = step; index < to; index++) { const missing = validate(index); if (missing.length) { setStep(index); setErrors(missing); return; } }
    }
    setErrors([]); setStep(to);
    top.current?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "start" });
  }
  function addFiles(files: FileList | null) {
    if (!files) return;
    const added = Array.from(files).filter(file => file.type.startsWith("image/")).slice(0, 12 - photos.length).map(file => ({ id: `${file.name}-${file.lastModified}-${Math.random()}`, url: URL.createObjectURL(file), name: file.name }));
    setPhotos(current => [...current, ...added]); setErrors([]);
  }
  function onDrop(event: DragEvent<HTMLLabelElement>) { event.preventDefault(); setDragging(false); addFiles(event.dataTransfer.files); }
  function removePhoto(id: string) { setPhotos(current => { const photo = current.find(item => item.id === id); if (photo) URL.revokeObjectURL(photo.url); return current.filter(item => item.id !== id); }); }
  function makeCover(id: string) { setPhotos(current => [...current.filter(item => item.id === id), ...current.filter(item => item.id !== id)]); }
  function submit() {
    for (let index = 0; index < steps.length - 1; index++) { const missing = validate(index); if (missing.length) { setStep(index); setErrors(missing); return; } }
    setSubmitted(true);
    try { localStorage.removeItem(KEY); } catch { /* ignore */ }
  }

  const completed = steps.slice(0, -1).filter((_, index) => validate(index).length === 0).length;
  const progress = Math.round((completed / (steps.length - 1)) * 100);
  const current = steps[step];

  if (submitted) return (
    <div className={styles.done} ref={top}>
      <div className={styles.confetti} aria-hidden="true">{Array.from({ length: 24 }).map((_, i) => <i key={i} style={{ left: `${(i * 37) % 100}%`, animationDelay: `${(i % 8) * 90}ms`, background: ["#e3ebc7", "#edc5a3", "#aebd80", "#fff"][i % 4] }} />)}</div>
      <span className={styles.doneIcon}><Icon name="key" size={36} /></span>
      <h2>{draft.name || "Your property"} is ready for review.</h2>
      <p>Thank you, {draft.ownerName.split(" ")[0] || "there"}. When listing applications open, this is where your property would move into verification before going live.</p>
      <p className={styles.previewNote}>Preview only: nothing was sent, uploaded or stored on our servers.</p>
      <div className={styles.doneActions}><button className={styles.next} onClick={() => { setSubmitted(false); setStep(0); setDraft(empty); setPhotos([]); }}>List another property <span aria-hidden="true">↺</span></button><Link className={styles.back} href="/landlords">Back to owner tools</Link></div>
    </div>
  );

  return (
    <div className={styles.wizard} ref={top}>
      <nav className={styles.rail} aria-label="Application steps">
        <div className={styles.progress}><span className={styles.ring} style={{ background: `conic-gradient(var(--brand) ${progress * 3.6}deg, #dce3d2 0)` }}><strong>{progress}%</strong></span><span>complete<br /><small>{restored ? "Draft restored on this device" : "Your draft saves on this device"}</small></span></div>
        <ol>
          {steps.map((item, index) => {
            const done = index < steps.length - 1 && validate(index).length === 0;
            return <li key={item.id}><button onClick={() => go(index)} aria-current={step === index ? "step" : undefined} className={`${step === index ? styles.railActive : ""} ${done ? styles.railDone : ""}`}>
              <span className={styles.railIcon}>{done && step !== index ? "✓" : <Icon name={item.icon} size={18} />}</span>{item.label}
            </button></li>;
          })}
        </ol>
      </nav>

      <div className={styles.panel}>
        <div className={styles.stepHead} key={`head-${step}`}>
          <span className={styles.stepCount}>Step {step + 1} of {steps.length}</span>
          <h2>{current.title}</h2>
          <p>{current.copy}</p>
        </div>

        <div className={styles.body} key={`body-${step}`}>
          {step === 0 && <>
            <label className={styles.field}><span>Property name</span><input value={draft.name} onChange={event => set({ name: event.target.value })} placeholder="e.g. Sunrise Residence, Room 3" /></label>
            <fieldset className={styles.field}><legend>Property type</legend>
              <div className={styles.typeGrid}>{propertyTypes.map((type, index) => <button type="button" key={type} aria-pressed={draft.type === type} onClick={() => set({ type })}><Icon name={["student-center", "apartment", "bed", "home", "user-group-man-man", "calendar"][index]} size={24} />{type}</button>)}</div>
            </fieldset>
            <div className={styles.row3}>
              <Stepper label="Bedrooms" value={draft.bedrooms} onChange={bedrooms => set({ bedrooms })} />
              <Stepper label="Bathrooms" value={draft.bathrooms} onChange={bathrooms => set({ bathrooms })} />
              <label className={styles.toggleField}><input type="checkbox" checked={draft.furnished} onChange={event => set({ furnished: event.target.checked })} /><span className={styles.switch} />Furnished</label>
            </div>
            <label className={styles.field}><span>Description <small>{draft.description.length}/600</small></span><textarea maxLength={600} value={draft.description} onChange={event => set({ description: event.target.value })} placeholder="What makes it a great place to live? Mention the space, the building and the neighbourhood." /></label>
          </>}

          {step === 1 && <>
            <fieldset className={styles.field}><legend>Country</legend>
              <div className={styles.segment}>{[["nigeria", "Nigeria"], ["rwanda", "Rwanda"]].map(([slug, name]) => <button type="button" key={slug} aria-pressed={draft.country === slug} onClick={() => set({ country: slug, city: "", university: "" })}>{name}</button>)}</div>
            </fieldset>
            {draft.country && <fieldset className={styles.field}><legend>City</legend>
              <div className={styles.chips}>{[...cities.filter(city => city.country === draft.country).map(city => [city.slug, city.name]), ["other", "Another city"]].map(([slug, name]) => <button type="button" key={slug} aria-pressed={draft.city === slug} onClick={() => set({ city: slug, university: "" })}>{name}</button>)}</div>
            </fieldset>}
            <div className={styles.row2}>
              <label className={styles.field}><span>Area or neighbourhood</span><input value={draft.area} onChange={event => set({ area: event.target.value })} placeholder={draft.country === "rwanda" ? "e.g. Remera" : "e.g. Akoka"} /></label>
              <label className={styles.field}><span>Nearest university <small>optional</small></span><select value={draft.university} onChange={event => set({ university: event.target.value })}><option value="">None nearby</option>{universities.filter(item => !draft.city || item.city === draft.city).map(item => <option key={item.slug} value={item.slug}>{item.name}</option>)}</select></label>
            </div>
            <label className={styles.field}><span>Street address <small>shared only after verification</small></span><input value={draft.address} onChange={event => set({ address: event.target.value })} autoComplete="street-address" /></label>
          </>}

          {step === 2 && <>
            <label className={`${styles.drop} ${dragging ? styles.dragging : ""}`} onDragOver={event => { event.preventDefault(); setDragging(true); }} onDragLeave={() => setDragging(false)} onDrop={onDrop}>
              <input type="file" accept="image/*" multiple onChange={(event: ChangeEvent<HTMLInputElement>) => { addFiles(event.target.files); event.target.value = ""; }} />
              <span className={styles.dropIcon}><Icon name="apartment" size={30} /></span>
              <strong>Drag photos here or <u>browse</u></strong>
              <small>Up to 12 photos · JPG or PNG · They stay on your device in this preview</small>
            </label>
            {photos.length > 0 && <div className={styles.photos}>{photos.map((photo, index) => <figure key={photo.id} className={index === 0 ? styles.cover : ""}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={photo.url} alt={`Upload ${index + 1}: ${photo.name}`} />
              {index === 0 ? <span className={styles.coverTag}>Cover photo</span> : <button type="button" onClick={() => makeCover(photo.id)} className={styles.coverButton}>Make cover</button>}
              <button type="button" onClick={() => removePhoto(photo.id)} className={styles.remove} aria-label={`Remove ${photo.name}`}>×</button>
            </figure>)}</div>}
            <ul className={styles.tips}><li>Shoot in daylight with lights on</li><li>Include the bathroom and kitchen</li><li>Show the view and the entrance</li></ul>
          </>}

          {step === 3 && <div className={styles.amenityGrid}>{amenityOptions.map(amenity => { const on = draft.amenities.includes(amenity); return <button type="button" key={amenity} aria-pressed={on} onClick={() => set({ amenities: on ? draft.amenities.filter(item => item !== amenity) : [...draft.amenities, amenity] })}><span className={styles.tick}>{on ? "✓" : "+"}</span>{amenity}</button>; })}</div>}

          {step === 4 && <>
            <div className={styles.row2}>
              <label className={styles.field}><span>Rent</span><div className={styles.money}><em>{currency}</em><input inputMode="numeric" value={draft.price} onChange={event => set({ price: event.target.value.replace(/\D/g, "") })} placeholder="0" /></div></label>
              <label className={styles.field}><span>Paid per</span><select value={draft.period} onChange={event => set({ period: event.target.value })}><option value="year">Year</option><option value="month">Month</option><option value="night">Night</option></select></label>
            </div>
            <label className={styles.field}><span>Available from</span><input type="date" value={draft.availableFrom} onChange={event => set({ availableFrom: event.target.value })} /></label>
            <fieldset className={styles.field}><legend>Other costs to move in <small>caution, deposit, agreement or service fees</small></legend>
              {draft.costs.map((cost, index) => <div key={index} className={styles.costRow}>
                <input aria-label="Cost name" value={cost.label} placeholder="e.g. Caution fee (refundable)" onChange={event => set({ costs: draft.costs.map((item, i) => i === index ? { ...item, label: event.target.value } : item) })} />
                <div className={styles.money}><em>{currency}</em><input aria-label="Amount" inputMode="numeric" value={cost.amount} onChange={event => set({ costs: draft.costs.map((item, i) => i === index ? { ...item, amount: event.target.value.replace(/\D/g, "") } : item) })} /></div>
                <button type="button" onClick={() => set({ costs: draft.costs.filter((_, i) => i !== index) })} aria-label="Remove cost">×</button>
              </div>)}
              <button type="button" className={styles.addCost} onClick={() => set({ costs: [...draft.costs, { label: "", amount: "" }] })}>+ Add a cost</button>
            </fieldset>
            {draft.price && <div className={styles.totalBox}><span>Estimated cost to move in</span><strong>{currency}{new Intl.NumberFormat("en-NG").format(Number(draft.price) + draft.costs.reduce((sum, cost) => sum + (Number(cost.amount) || 0), 0))}</strong></div>}
          </>}

          {step === 5 && <>
            <div className={styles.row2}>
              <label className={styles.field}><span>Full name</span><input value={draft.ownerName} onChange={event => set({ ownerName: event.target.value })} autoComplete="name" /></label>
              <label className={styles.field}><span>You are the</span><select value={draft.relationship} onChange={event => set({ relationship: event.target.value })}><option>Property owner</option><option>Agent</option><option>Property manager</option></select></label>
              <label className={styles.field}><span>Email</span><input type="email" value={draft.email} onChange={event => set({ email: event.target.value })} autoComplete="email" /></label>
              <label className={styles.field}><span>Phone</span><input type="tel" value={draft.phone} onChange={event => set({ phone: event.target.value })} autoComplete="tel" /></label>
            </div>
            <label className={styles.consent}><input type="checkbox" checked={draft.consent} onChange={event => set({ consent: event.target.checked })} /><span>I understand my listing is subject to Lodgely’s applicable identity and property verification, and I agree to the <Link href="/legal/terms">Terms</Link> and <Link href="/legal/property-verification">Property Verification Policy</Link>.</span></label>
          </>}

          {step === 6 && <div className={styles.review}>
            {[
              { title: "Property", to: 0, rows: [["Name", draft.name], ["Type", draft.type], ["Rooms", `${draft.bedrooms} bed · ${draft.bathrooms} bath · ${draft.furnished ? "Furnished" : "Unfurnished"}`]] },
              { title: "Location", to: 1, rows: [["Where", [draft.area, cityName, draft.country && draft.country[0].toUpperCase() + draft.country.slice(1)].filter(Boolean).join(", ")], ["University", universities.find(u => u.slug === draft.university)?.name ?? "—"]] },
              { title: "Photos", to: 2, rows: [["Uploaded", `${photos.length} photo${photos.length === 1 ? "" : "s"}`]] },
              { title: "Amenities", to: 3, rows: [["Included", draft.amenities.join(", ") || "—"]] },
              { title: "Pricing", to: 4, rows: [["Rent", draft.price ? `${currency}${new Intl.NumberFormat("en-NG").format(Number(draft.price))} / ${draft.period}` : "—"], ["Other costs", draft.costs.filter(c => c.label).map(c => `${c.label}: ${currency}${c.amount || 0}`).join(", ") || "None"], ["Available", draft.availableFrom || "—"]] },
              { title: "Your details", to: 5, rows: [["Name", draft.ownerName], ["Contact", [draft.email, draft.phone].filter(Boolean).join(" · ")], ["Role", draft.relationship]] },
            ].map(section => <div key={section.title} className={styles.reviewBlock}>
              <div className={styles.reviewHead}><strong>{section.title}</strong><button type="button" onClick={() => go(section.to)}>Edit</button></div>
              <dl>{section.rows.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value || <em>Missing</em>}</dd></div>)}</dl>
            </div>)}
          </div>}
        </div>

        {errors.length > 0 && <div className={styles.errors} role="alert"><strong>Almost there:</strong> {errors.join(" · ")}</div>}

        <div className={styles.nav}>
          <button type="button" className={styles.back} onClick={() => go(step - 1)} disabled={step === 0}>← Back</button>
          {step < steps.length - 1
            ? <button type="button" className={styles.next} onClick={() => go(step + 1)}>Continue to {steps[step + 1].label.toLowerCase()} <span aria-hidden="true">→</span></button>
            : <button type="button" className={styles.next} onClick={submit}>Submit application <span aria-hidden="true">↗</span></button>}
        </div>
      </div>

      <aside className={styles.live} aria-label="Live listing preview">
        <span className={styles.liveLabel}><i /> Live preview</span>
        <div className={styles.liveCard}>
          <div className={styles.liveImage}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            {photos[0] ? <img src={photos[0].url} alt="" /> : <span><Icon name="apartment" size={30} />Your cover photo</span>}
            {draft.type && <em>{draft.type}</em>}
          </div>
          <div className={styles.liveBody}>
            <small><Icon name="location" size={13} /> {[draft.area, cityName].filter(Boolean).join(", ") || "Location"}</small>
            <strong>{draft.name || "Your property name"}</strong>
            <span className={styles.liveFacts}>{draft.bedrooms} bed · {draft.bathrooms} bath{draft.furnished ? " · Furnished" : ""}</span>
            {draft.amenities.length > 0 && <div className={styles.liveTags}>{draft.amenities.slice(0, 4).map(item => <span key={item}>{item}</span>)}{draft.amenities.length > 4 && <span>+{draft.amenities.length - 4}</span>}</div>}
            <div className={styles.livePrice}>{draft.price ? <><b>{currency}{new Intl.NumberFormat("en-NG").format(Number(draft.price))}</b> / {draft.period}</> : <span>Add a price</span>}<i>↗</i></div>
          </div>
        </div>
        <p>This is how seekers will see your listing in search.</p>
      </aside>
    </div>
  );
}

function Stepper({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  const n = Number(value) || 0;
  return (
    <div className={styles.stepper}><span>{label}</span>
      <div><button type="button" onClick={() => onChange(String(Math.max(0, n - 1)))} aria-label={`Fewer ${label.toLowerCase()}`}>−</button><output aria-live="polite">{n}</output><button type="button" onClick={() => onChange(String(Math.min(20, n + 1)))} aria-label={`More ${label.toLowerCase()}`}>+</button></div>
    </div>
  );
}
