"use client";

import { useState, type FormEvent } from "react";
import Icon from "@/components/ui/icon";
import kit from "@/components/ui/kit.module.css";
import styles from "@/components/ui/preview-form.module.css";

export type FormField = { name: string; label: string; type?: "text" | "email" | "tel" | "textarea" | "select" | "chips"; options?: string[]; required?: boolean; full?: boolean; hint?: string; placeholder?: string; autoComplete?: string };

/** A styled form for flows that aren't live yet: it validates and confirms, but sends nothing. */
export default function PreviewForm({ fields, submitLabel, successTitle, successCopy }: { fields: FormField[]; submitLabel: string; successTitle: string; successCopy: string }) {
  const [sent, setSent] = useState(false);
  const [chips, setChips] = useState<Record<string, string[]>>({});
  function submit(event: FormEvent<HTMLFormElement>) { event.preventDefault(); setSent(true); }
  if (sent) return (
    <div className={styles.done} role="status">
      <span className={styles.check}><Icon name="checkmark" size={30} /></span>
      <strong>{successTitle}</strong>
      <p>{successCopy}</p>
      <p className={styles.preview}>Preview only: nothing was sent or stored.</p>
      <button onClick={() => setSent(false)} className={kit.ghost}>Back to the form <span aria-hidden="true">↺</span></button>
    </div>
  );
  return (
    <form className={`${kit.formGrid} ${styles.form}`} onSubmit={submit}>
      {fields.map(field => {
        const className = `${kit.field} ${field.full || field.type === "textarea" || field.type === "chips" ? kit.full : ""}`;
        if (field.type === "chips") return <fieldset key={field.name} className={`${className} ${styles.chipSet}`}>
          <legend>{field.label}</legend>
          <div className={styles.chips}>{field.options!.map(option => { const on = chips[field.name]?.includes(option); return <button type="button" key={option} aria-pressed={!!on} onClick={() => setChips({ ...chips, [field.name]: on ? chips[field.name].filter(item => item !== option) : [...(chips[field.name] ?? []), option] })}>{on ? "✓ " : "+ "}{option}</button>; })}</div>
          {field.hint && <small>{field.hint}</small>}
        </fieldset>;
        return <label key={field.name} className={className}>
          <span>{field.label}{field.required && <em className={styles.req}> *</em>}</span>
          {field.type === "textarea" ? <textarea name={field.name} required={field.required} placeholder={field.placeholder} />
            : field.type === "select" ? <select name={field.name} required={field.required} defaultValue=""><option value="" disabled>Choose…</option>{field.options!.map(option => <option key={option}>{option}</option>)}</select>
            : <input name={field.name} type={field.type ?? "text"} required={field.required} placeholder={field.placeholder} autoComplete={field.autoComplete} />}
          {field.hint && <small>{field.hint}</small>}
        </label>;
      })}
      <div className={`${kit.full} ${styles.footer}`}>
        <span>Fields marked * are required.</span>
        <button type="submit" className={kit.primary}>{submitLabel} <span aria-hidden="true">↗</span></button>
      </div>
    </form>
  );
}
