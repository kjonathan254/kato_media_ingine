import { useCallback, useEffect, useState } from "react";
import {
  BottomBar,
  ProgressBar,
  SideRail,
  TopBar,
  type SlideMeta,
} from "./components/Chrome";
import { useReducedMotion } from "./lib/motion";
import Slide1 from "./slides/Slide1";
import SlideJourney from "./slides/SlideJourney";
import Slide2 from "./slides/Slide2";
import Slide3 from "./slides/Slide3";
import Slide4 from "./slides/Slide4";
import Slide5 from "./slides/Slide5";

const SLIDES: SlideMeta[] = [
  { id: "page-1", num: "01", title: "The Opportunity", short: "Opportunity" },
  { id: "page-journey", num: "02", title: "The Traveller Journey", short: "Journey" },
  { id: "page-2", num: "03", title: "What KATO Already Has", short: "Assets" },
  { id: "page-3", num: "04", title: "The KATO Media Engine", short: "Engine" },
  { id: "page-4", num: "05", title: "The 90-Day Pilot", short: "Pilot" },
  { id: "page-5", num: "06", title: "Measurement & The Ask", short: "The Ask" },
];

export default function App() {
  const reduced = useReducedMotion();
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);

  const goTo = useCallback(
    (i: number) => {
      const idx = Math.max(0, Math.min(SLIDES.length - 1, i));
      document
        .getElementById(SLIDES[idx].id)
        ?.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
    },
    [reduced]
  );

  /* track which page is centred */
  useEffect(() => {
    const sections = SLIDES.map((s) => document.getElementById(s.id)).filter(
      Boolean
    ) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const idx = SLIDES.findIndex((s) => s.id === e.target.id);
            if (idx !== -1) setActive(idx);
          }
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  /* reading progress */
  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        setProgress(max > 0 ? window.scrollY / max : 0);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  /* keyboard navigation */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (["ArrowDown", "ArrowRight", "PageDown", " "].includes(e.key)) {
        e.preventDefault();
        goTo(active + 1);
      } else if (["ArrowUp", "ArrowLeft", "PageUp"].includes(e.key)) {
        e.preventDefault();
        goTo(active - 1);
      } else if (e.key === "Home") {
        e.preventDefault();
        goTo(0);
      } else if (e.key === "End") {
        e.preventDefault();
        goTo(SLIDES.length - 1);
      } else if (/^[1-6]$/.test(e.key)) {
        goTo(Number(e.key) - 1);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, goTo]);

  return (
    <div className="relative">
      <ProgressBar value={progress} />
      <TopBar slides={SLIDES} active={active} onNav={goTo} />
      <SideRail slides={SLIDES} active={active} onNav={goTo} />
      <BottomBar active={active} total={SLIDES.length} />

      <main>
        <Slide1 />
        <SlideJourney />
        <Slide2 />
        <Slide3 />
        <Slide4 />
        <Slide5 />
      </main>

      {/* film grain over everything */}
      <div
        aria-hidden="true"
        className="grain pointer-events-none fixed inset-0 z-[65] opacity-[0.05] mix-blend-overlay"
      />
    </div>
  );
}
