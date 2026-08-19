import { Kicker, Watermark } from "../components/Chrome";
import { MaskLines, Reveal, cx, useInView } from "../lib/motion";

const COHORT = [
  { label: "Established", count: 3, width: "30%", color: "bg-moss" },
  { label: "Mid-sized", count: 4, width: "40%", color: "bg-gold" },
  { label: "Specialist", count: 3, width: "30%", color: "bg-fern" },
];

const PHASES = [
  {
    chip: "Phase 1 · Weeks 1–2",
    title: "Build",
    items: [
      "Editorial strategy",
      "Visual identity",
      "Tracking setup",
      "Landing-page optimisation",
    ],
  },
  {
    chip: "Phase 2 · Weeks 3–10",
    title: "Produce",
    items: [
      "4 flagship videos",
      "12–20 short-form pieces",
      "4 written member profiles",
    ],
  },
  {
    chip: "Phase 3 · Weeks 11–13",
    title: "Distribute",
    items: ["Native publishing across YouTube, Instagram, TikTok & LinkedIn"],
    channels: ["YouTube", "Instagram", "TikTok", "LinkedIn"],
  },
];

export default function Slide4() {
  const [barRef, barIn] = useInView<HTMLDivElement>(0.35);

  return (
    <section id="page-4" className="slide relative min-h-svh overflow-hidden bg-paper text-ink">
      <div className="blueprint pointer-events-none absolute inset-0" />
      <Watermark num="05" tone="light" />

      <div className="relative mx-auto w-full max-w-7xl px-6 py-24 md:px-12 md:py-28">
        <Reveal>
          <Kicker num="05" label="The 90-Day Pilot" tone="light" />
        </Reveal>

        <div className="mt-10 flex flex-wrap items-end justify-between gap-10">
          <div className="max-w-3xl">
            <h2 className="font-display text-4xl font-semibold leading-[1.02] md:text-6xl">
              <MaskLines
                lines={[
                  <>Proving the hypothesis</>,
                  <>
                    <em className="italic text-fern">safely.</em>
                  </>,
                ]}
              />
            </h2>
            <Reveal delay={200}>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink/70">
                We do not build the entire engine at once. We run a 90-day pilot with
                a deliberately mixed cohort of{" "}
                <strong className="font-semibold text-ink">10 KATO members</strong>.
              </p>
            </Reveal>
          </div>

          <div className="border-l-2 border-gold pl-6 md:pl-8">
            <p className="font-display text-6xl font-semibold leading-none text-moss md:text-7xl">
              90<span className="text-gold">d</span>
            </p>
            <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.26em] text-ink/55">
              3 phases · 10 members · 1 engine
            </p>
          </div>
        </div>

        {/* cohort bar */}
        <div ref={barRef} className="mt-14">
          <Reveal className="flex flex-wrap items-center justify-between gap-3">
            <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-moss">
              Pilot cohort — 10 members
            </p>
            <div className="flex flex-wrap gap-4">
              {COHORT.map((c) => (
                <span key={c.label} className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-ink/60">
                  <span className={cx("h-2.5 w-2.5 rotate-45", c.color)} />
                  {c.count} {c.label}
                </span>
              ))}
            </div>
          </Reveal>
          <Reveal delay={120} className="mt-3 flex h-3.5 w-full overflow-hidden border border-ink/25 bg-paper">
            {COHORT.map((c, i) => (
              <span
                key={c.label}
                className={cx("block h-full transition-all duration-1000 ease-out", c.color)}
                style={{
                  width: barIn ? c.width : "0%",
                  transitionDelay: `${i * 160}ms`,
                }}
              />
            ))}
          </Reveal>
        </div>

        {/* timeline */}
        <div className="relative mt-16">
          <span className="absolute left-0 right-0 top-[7px] h-px bg-ink/15" aria-hidden="true" />
          <span
            className="absolute left-0 right-0 top-[7px] h-0.5 origin-left bg-gold transition-transform duration-[1400ms] ease-out"
            style={{ transform: barIn ? "scaleX(1)" : "scaleX(0)" }}
            aria-hidden="true"
          />
          <div className="grid gap-12 md:grid-cols-3 md:gap-10">
            {PHASES.map((p, i) => (
              <Reveal key={p.title} delay={200 + i * 180} className="relative pt-9">
                <span
                  className="absolute left-0 top-0 block h-[15px] w-[15px] rotate-45 border-2 border-gold bg-paper transition-colors duration-300 hover:bg-gold"
                  aria-hidden="true"
                />
                <span className="inline-block bg-ink px-2.5 py-1.5 font-mono text-[9px] uppercase tracking-[0.22em] text-goldpale">
                  {p.chip}
                </span>
                <h3 className="mt-4 font-display text-3xl font-semibold">
                  {p.title}
                  <span className="text-gold">.</span>
                </h3>
                <ul className="mt-4 space-y-2.5">
                  {p.items.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-[15px] leading-relaxed text-ink/75">
                      <span className="mt-2 block h-1.5 w-1.5 shrink-0 rotate-45 bg-gold" />
                      {item}
                    </li>
                  ))}
                </ul>
                {p.channels && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {p.channels.map((ch) => (
                      <span
                        key={ch}
                        className="border border-ink/25 px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.18em] text-ink/60 transition-colors duration-300 hover:border-gold hover:text-moss"
                      >
                        {ch}
                      </span>
                    ))}
                  </div>
                )}
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
