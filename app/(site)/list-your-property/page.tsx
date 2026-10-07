import type { Metadata } from "next";
import { seo } from "@/lib/seo";
import Breadcrumbs from "@/components/ui/breadcrumbs";
import Wizard from "./wizard";
import styles from "./wizard.module.css";

export const metadata: Metadata = seo({
  title: "List Your Property | Lodgely",
  description: "List your property on Lodgely in a few guided steps: property details, location, photos, amenities, pricing and your details.",
  path: "/list-your-property",
});

export default function ListYourProperty() {
  return (
    <div className={styles.page}>
      <header className={styles.intro}>
        <span className={styles.introWord} aria-hidden="true">list.</span>
        <Breadcrumbs items={[{ label: "For Property Owners", href: "/landlords" }, { label: "List Your Property" }]} />
        <span className={styles.eyebrow}>LIST YOUR PROPERTY</span>
        <h1>Your space.<br /><em>Their next chapter.</em></h1>
        <p>Seven short steps. Watch your listing come to life as you go. Applications are in preview, so nothing is sent until listing opens.</p>
      </header>
      <Wizard />
    </div>
  );
}
