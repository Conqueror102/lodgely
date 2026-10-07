"use client";

import { useState } from "react";
import styles from "./agents.module.css";

const stages = ["New", "Contacted", "Inspection", "Closed"] as const;
type Lead = { id: number; name: string; want: string; stage: (typeof stages)[number] };
const start: Lead[] = [
  { id: 1, name: "Student, 200 level", want: "Room near UNILAG · ₦500k/yr", stage: "New" },
  { id: 2, name: "Intern", want: "Furnished studio · Kigali", stage: "New" },
  { id: 3, name: "Young family", want: "3-bed house · Kicukiro", stage: "Contacted" },
  { id: 4, name: "Postgraduate", want: "Mini flat · Bodija", stage: "Inspection" },
  { id: 5, name: "Professional", want: "1-bed · Kacyiru", stage: "Closed" },
];

/** A playful sample of lead management: move each lead along the pipeline. */
export default function LeadBoard() {
  const [leads, setLeads] = useState(start);
  const move = (id: number, by: number) => setLeads(current => current.map(lead => lead.id === id ? { ...lead, stage: stages[Math.min(stages.length - 1, Math.max(0, stages.indexOf(lead.stage) + by))] } : lead));
  return (
    <div className={styles.board} aria-label="Sample lead pipeline">
      {stages.map((stage, column) => {
        const items = leads.filter(lead => lead.stage === stage);
        return <div key={stage} className={styles.column}>
          <div className={styles.columnHead}><strong>{stage}</strong><span>{items.length}</span></div>
          {items.map(lead => <div key={lead.id} className={styles.lead}>
            <strong>{lead.name}</strong><small>{lead.want}</small>
            <div className={styles.leadActions}>
              <button onClick={() => move(lead.id, -1)} disabled={column === 0} aria-label={`Move ${lead.name} back`}>←</button>
              <button onClick={() => move(lead.id, 1)} disabled={column === stages.length - 1} aria-label={`Move ${lead.name} forward`}>{column === stages.length - 2 ? "Close ✓" : "Next →"}</button>
            </div>
          </div>)}
          {items.length === 0 && <span className={styles.emptyCol}>Nothing here</span>}
        </div>;
      })}
      <span className={styles.boardNote}>Sample leads · try moving them along</span>
    </div>
  );
}
