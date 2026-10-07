import Footer from "@/components/layout/footer";
import SiteHeader from "@/components/layout/site-header";
import styles from "./site.module.css";

export default function SiteLayout({ children }: LayoutProps<"/">) {
  return (
    <div className={`site-shell ${styles.shell}`}>
      <a href="#main" className={styles.skip}>Skip to content</a>
      <SiteHeader />
      <main id="main" className={styles.main}>{children}</main>
      <Footer />
    </div>
  );
}
