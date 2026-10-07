import type { ReactNode } from "react";
import styles from "./site.module.css";

/** Re-mounts on every navigation so each page glides in. */
export default function Template({ children }: { children: ReactNode }) {
  return <div className={styles.enter}>{children}</div>;
}
