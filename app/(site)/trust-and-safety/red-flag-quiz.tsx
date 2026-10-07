"use client";

import { useState } from "react";
import styles from "./trust.module.css";

const scenarios = [
  { text: "The agent says three other students want the room, so you must pay today to “secure” it, before any viewing.", flag: true, why: "Urgency plus no inspection is the classic scam pattern. A genuine place can wait for a viewing." },
  { text: "The owner offers a live video tour and sends a written breakdown of rent, caution fee and agreement fee.", flag: false, why: "A live tour and costs in writing are good signs. Still confirm who owns the property before paying." },
  { text: "The price is half of every similar place nearby, and photos look like a hotel brochure.", flag: true, why: "Too-good-to-be-true prices and copied photos are common bait. Reverse-search the images and ask for a live viewing." },
  { text: "You’re asked to pay into a personal account that doesn’t match the owner’s or agency’s name.", flag: true, why: "Always confirm the recipient. Ask why the names differ and get it in writing before sending anything." },
  { text: "The agent explains they’re representing the owner and shares their agency details when asked.", flag: false, why: "Transparency about who’s who is a healthy sign. You can still verify those details independently." },
];

/** Spot the red flag: a quick, playful safety check. */
export default function RedFlagQuiz() {
  const [index, setIndex] = useState(0);
  const [answer, setAnswer] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);
  const finished = index >= scenarios.length;
  const scenario = scenarios[index];
  function choose(flag: boolean) {
    if (answer !== null) return;
    setAnswer(flag);
    if (flag === scenario.flag) setScore(s => s + 1);
  }
  if (finished) return (
    <div className={styles.quiz}>
      <div className={styles.result}>
        <span className={styles.bigScore}>{score}/{scenarios.length}</span>
        <h3>{score === scenarios.length ? "Sharp eyes. You’re ready." : score >= 3 ? "Nicely done. A few to keep in mind." : "Good start. Keep these patterns close."}</h3>
        <p>Trust your instincts. When something feels rushed or unclear, pause and ask more questions.</p>
        <button className={styles.quizButton} onClick={() => { setIndex(0); setAnswer(null); setScore(0); }}>Try again ↺</button>
      </div>
    </div>
  );
  const correct = answer !== null && answer === scenario.flag;
  return (
    <div className={styles.quiz}>
      <div className={styles.quizTop}><span>SCENARIO {index + 1} OF {scenarios.length}</span><span className={styles.dots}>{scenarios.map((_, i) => <i key={i} className={i < index ? styles.dotDone : i === index ? styles.dotNow : ""} />)}</span></div>
      <p className={styles.scenario} key={index}>“{scenario.text}”</p>
      <div className={styles.choices}>
        <button onClick={() => choose(true)} disabled={answer !== null} className={answer === true ? (scenario.flag ? styles.right : styles.wrong) : ""}>🚩 Red flag</button>
        <button onClick={() => choose(false)} disabled={answer !== null} className={answer === false ? (!scenario.flag ? styles.right : styles.wrong) : ""}>✓ Looks okay</button>
      </div>
      {answer !== null && <div className={`${styles.explain} ${correct ? styles.explainRight : styles.explainWrong}`} role="status">
        <strong>{correct ? "Spot on." : "Not quite."}</strong> {scenario.why}
        <button className={styles.quizButton} onClick={() => { setIndex(index + 1); setAnswer(null); }}>{index === scenarios.length - 1 ? "See my score" : "Next scenario"} →</button>
      </div>}
    </div>
  );
}
