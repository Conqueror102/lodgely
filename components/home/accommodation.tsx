import Icon from "@/components/ui/icon";
import Image from "next/image";
import styles from "@/components/home/accommodation.module.css";
import Link from "next/link";

const categories = [
  { title: "Student Accommodation", label: "CAMPUS LIFE", description: "A place to study, settle in and start your next chapter.", tag: "Closer to your campus", tone: "sage" },
  { title: "Apartments", label: "YOUR OWN PACE", description: "A little independence. A space that feels like you.", tag: "Room to be yourself", tone: "cream" },
  { title: "Rooms", label: "SMALL SPACE. BIG START.", description: "Find your own corner of a city full of possibilities.", tag: "Keep it simple", tone: "sand" },
  { title: "Houses", label: "SPACE TO GROW", description: "For shared dinners, new routines and everything ahead.", tag: "More room for life", tone: "mint" },
  { title: "Hostels", label: "BETTER TOGETHER", description: "Shared spaces, familiar faces and a sense of belonging.", tag: "Find your community", tone: "cream" },
  { title: "Short-Term Stays", label: "JUST FOR NOW", description: "A comfortable base for a visit, a transition or a fresh start.", tag: "Stay for your next step", tone: "sage" },
];

export default function Accommodation() {
  return (
    <section className={styles.section} id="accommodation" aria-labelledby="accommodation-title">
      <div className={styles.kicker}><span>FIND YOUR PLACE</span><span>Designed around your next move.</span></div>
      <header className={styles.header}>
        <h2 id="accommodation-title">Find accommodation<br /><span>where you need it.</span></h2>
        <p>Search for student housing, rooms, apartments and rental properties based on location, budget, property type and other preferences.</p>
      </header>

      <div className={styles.collection}>
        <div className={styles.feature}>
          <Image src="/accommodation-studio.png" alt="Illustrative sunlit studio with a bed, green accents and a desk beside the window" fill sizes="(max-width: 800px) 100vw, 42vw" />
          <span className={styles.photoTag}>A LITTLE SPACE. A LOT OF POSSIBILITY.</span>
          <div className={styles.photoCaption}>
            <span className={styles.smallLabel}>LIFE HAPPENS HERE</span>
            <h3>Make room<br />for what’s next.</h3>
            <Link href="/accommodation/student-accommodation" aria-label="Search student accommodation"><span>Find your starting point</span><span aria-hidden="true">↗</span></Link>
          </div>
          <span className={styles.photoCredit}>Illustrative accommodation</span>
        </div>

        <div className={styles.categories}>
          {categories.map((category, index) => (
            <Link key={category.title} href={`/accommodation?type=${encodeURIComponent(category.title)}`} className={`${styles.category} ${styles[category.tone]}`} aria-label={`Explore ${category.title}`}>
              <div className={styles.categoryTop}><span>{category.label}</span><span className={styles.arrow} aria-hidden="true">↗</span></div>
              <h3>{category.title}</h3>
              <p>{category.description}</p>
              <div className={styles.categoryBottom}><span>{category.tag}</span><span className={styles.number} aria-hidden="true"><Icon name={["student-center", "apartment", "bed", "home", "user-group-man-man", "calendar"][index]} size={42} /></span></div>
            </Link>
          ))}
        </div>
      </div>

      <footer className={styles.footer}>
        <div><span>THE RIGHT PLACE STARTS WITH YOU.</span><p>Your location. Your budget. <em>Your kind of place.</em></p></div>
        <Link href="/accommodation">Explore Accommodation <span aria-hidden="true">↗</span></Link>
      </footer>
    </section>
  );
}
