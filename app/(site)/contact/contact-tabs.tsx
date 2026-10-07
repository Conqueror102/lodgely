"use client";

import { useState, useSyncExternalStore } from "react";
import Icon from "@/components/ui/icon";
import PreviewForm, { type FormField } from "@/components/ui/preview-form";
import styles from "./contact.module.css";

const base: FormField[] = [
  { name: "name", label: "Your name", required: true, autoComplete: "name" },
  { name: "email", label: "Email", type: "email", required: true, autoComplete: "email" },
];
const tabs: { id: string; label: string; icon: string; intro: string; fields: FormField[]; submit: string }[] = [
  { id: "general", label: "General enquiry", icon: "help", intro: "Questions about Lodgely, how it works or where we operate.", submit: "Send message", fields: [...base, { name: "topic", label: "Topic", type: "select", options: ["Finding accommodation", "Listing a property", "Becoming an agent", "Something else"] }, { name: "message", label: "Message", type: "textarea", required: true }] },
  { id: "support", label: "Support", icon: "settings", intro: "Help with a search, a listing, an enquiry or your account.", submit: "Request support", fields: [...base, { name: "role", label: "I am a", type: "select", options: ["Student or renter", "Property owner", "Agent", "Institution"], required: true }, { name: "listing", label: "Listing link or name", hint: "If your question is about a specific listing." }, { name: "message", label: "How can we help?", type: "textarea", required: true }] },
  { id: "partnerships", label: "Partnerships", icon: "handshake", intro: "Universities, developers, property managers and housing partners.", submit: "Send partnership enquiry", fields: [...base, { name: "organisation", label: "Organisation", required: true }, { name: "type", label: "Partner type", type: "select", options: ["University or institution", "Property developer", "Property manager", "Corporate housing", "Other"], required: true }, { name: "markets", label: "Markets", type: "chips", options: ["Nigeria", "Rwanda", "Other African markets"] }, { name: "message", label: "Tell us about the partnership", type: "textarea" }] },
  { id: "report", label: "Report a concern", icon: "shield", intro: "Something feels off about a listing, an owner or an agent? Tell us.", submit: "Submit report", fields: [...base, { name: "listing", label: "Listing link or name", required: true }, { name: "issue", label: "What’s the concern?", type: "select", options: ["Suspected scam", "Misleading information", "Pressure to pay", "Safety concern", "Other"], required: true }, { name: "details", label: "What happened?", type: "textarea", required: true, hint: "Don’t include passwords or full card numbers." }] },
];

export default function ContactTabs() {
  const fromUrl = useSyncExternalStore(() => () => {}, () => new URLSearchParams(window.location.search).get("type"), () => null);
  const [chosen, setActive] = useState<string | null>(null);
  const active = chosen ?? (tabs.some(tab => tab.id === fromUrl) ? fromUrl! : "general");
  const tab = tabs.find(item => item.id === active)!;
  return (
    <div className={styles.tabs}>
      <div className={styles.tabList} role="tablist" aria-label="Choose an enquiry type">
        {tabs.map(item => <button key={item.id} role="tab" aria-selected={active === item.id} onClick={() => setActive(item.id)}><span><Icon name={item.icon} size={22} /></span><strong>{item.label}</strong></button>)}
      </div>
      <div className={styles.tabPanel} role="tabpanel" key={tab.id}>
        <h2>{tab.label}</h2>
        <p>{tab.intro}</p>
        <PreviewForm fields={tab.fields} submitLabel={tab.submit} successTitle="Message ready" successCopy="When our inbox opens on this site, your message will reach the right team and we’ll reply by email." />
      </div>
    </div>
  );
}
