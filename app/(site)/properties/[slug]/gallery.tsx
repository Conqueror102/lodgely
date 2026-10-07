"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import styles from "./property.module.css";

const captions = ["The space", "Living and study", "Shared moments"];

export default function Gallery({ images, title }: { images: string[]; title: string }) {
  const [index, setIndex] = useState(0);
  const dialog = useRef<HTMLDialogElement>(null);
  const contain = (src: string) => src.includes("cutout") || src.includes("hero-apartments");
  const open = (i: number) => { setIndex(i); dialog.current?.showModal(); };
  const step = (by: number) => setIndex(i => (i + by + images.length) % images.length);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (!dialog.current?.open) return;
      if (event.key === "ArrowRight") step(1);
      if (event.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  return (
    <>
      <div className={styles.gallery}>
        {images.slice(0, 3).map((src, i) => <button key={src + i} className={`${styles.shot} ${i === 0 ? styles.shotMain : ""} ${contain(src) ? styles.shotContain : ""}`} onClick={() => open(i)} aria-label={`Open photo ${i + 1} of ${images.length}`}>
          <Image src={src} alt={`Illustrative photo ${i + 1} for ${title}`} fill priority={i === 0} sizes={i === 0 ? "(max-width: 800px) 95vw, 60vw" : "(max-width: 800px) 47vw, 30vw"} />
          <span className={styles.shotCaption}>{captions[i]}</span>
        </button>)}
        <button className={styles.allPhotos} onClick={() => open(0)}>▦ View all photos</button>
        <span className={styles.imageNote}>Illustrative images</span>
      </div>
      <dialog ref={dialog} className={styles.lightbox} onClick={event => { if (event.target === event.currentTarget) dialog.current?.close(); }} aria-label="Photo viewer">
        <div className={styles.lightboxStage} key={index}>
          <Image src={images[index]} alt={`Illustrative photo ${index + 1} for ${title}`} fill sizes="90vw" className={contain(images[index]) ? styles.containImg : ""} />
        </div>
        <div className={styles.lightboxBar}>
          <button onClick={() => step(-1)} aria-label="Previous photo">←</button>
          <span>{index + 1} / {images.length} · {captions[index]}</span>
          <button onClick={() => step(1)} aria-label="Next photo">→</button>
          <button onClick={() => dialog.current?.close()} aria-label="Close photo viewer">×</button>
        </div>
        <div className={styles.thumbs}>{images.map((src, i) => <button key={src + i} aria-pressed={i === index} onClick={() => setIndex(i)}><Image src={src} alt="" fill sizes="80px" /></button>)}</div>
      </dialog>
    </>
  );
}
