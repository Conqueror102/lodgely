import Icon from "@/components/ui/icon";
import Image from "next/image";
import styles from "@/components/home/students.module.css";
import Link from "next/link";

export default function Students() {
  return (
    <section className={styles.section} id="student-accommodation" aria-labelledby="students-title">
      <div className={styles.topLine}><span><Icon name="student-center" size={22} /> YOUR CAMPUS CHAPTER</span><span>A place to live. Space to become.</span></div>
      <div className={styles.hero}>
        <div className={styles.copy}>
          <span className={styles.label}>BIG DREAMS NEED A PLACE TO START.</span>
          <h2 id="students-title">Student accommodation<br /><span>made simple.</span></h2>
          <p>Finding accommodation around university campuses can be stressful. Lodgely helps students discover rooms, hostels, apartments and off-campus housing using location, university, budget and property preferences.</p>
          <Link className={styles.cta} href="/accommodation/student-accommodation">Find Student Accommodation <span aria-hidden="true">↗</span></Link>
          <div className={styles.microcopy}><span>ROOMS</span><span>HOSTELS</span><span>APARTMENTS</span><span>OFF-CAMPUS HOMES</span></div>
        </div>
        <div className={styles.visual}>
          <div className={styles.photo}>
            <div className={styles.image}><Image src="/student-life.png" alt="Illustration of three university students sharing a relaxed moment in a student apartment" fill sizes="(max-width: 800px) 100vw, 48vw" /></div>
            <div className={styles.photoFooter}><span>THE BEST CHAPTERS START TOGETHER.</span><span>LODGELY / STUDENT LIFE</span></div>
          </div>
          <div className={styles.sticker}><span>YOUR NEXT CHAPTER</span><strong>Room to<br />belong.</strong><span>MAKE YOURSELF AT HOME.</span></div>
          <span className={styles.imageNote}>Illustrative student-life image</span>
        </div>
      </div>

    </section>
  );
}
