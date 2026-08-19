import { useState } from "react";
import { IMG } from "../lib/images";
import { Kicker, Watermark } from "../components/Chrome";
import { MaskLines, Reveal, useInView } from "../lib/motion";

const FUNNEL = [
  { stage: "Reach", metrics: "Impressions · views · watch time", width: "100%", bar: "bg-snow/30" },
  { stage: "Engagement", metrics: "Saves · shares · comments · follows", width: "74%", bar: "bg-sage/70" },
  { stage: "Discovery", metrics: "Google search volume · website traffic", width: "52%", bar: "bg-gold/60" },
  { stage: "Commercial", metrics: "Profile clicks · directory referrals · attributable enquiries", width: "34%", bar: "bg-gold shadow-[0_0_18px_rgba(201,162,39,0.55)]" },
];

const ASKS = [
  "Endorsement to approach 10 selected members for pilot content.",
  "Access to existing KATO event footage and imagery.",
  "A minimal pilot budget to cover production and distribution.",
];

export default function Slide5() {
  const [funnelRef, funnelIn] = useInView<HTMLDivElement>(0.25);
  const [fileNote, setFileNote] = useState(false);

  return (
    <section id="page-5" className="slide relative min-h-svh overflow-hidden bg-ink">
      <div className="topo pointer-events-none absolute inset-0" />
      <Watermark num="05" tone="dark" />

      <div className="relative mx-auto w-full max-w-7xl px-6 py-24 md:px-12 md:py-28">
        <Reveal>
          <Kicker num="05" label="Measurement & The Ask" tone="dark" />
        </Reveal>

        <h2 className="mt-10 max-w-4xl font-display text-4xl font-semibold leading-[1.02] text-snow md:text-6xl">
          <MaskLines
            lines={[
              <>How we know</>,
              <>
                it <em className="italic text-goldbright">works.</em>
              </>,
            ]}
          />
        </h2>

        <Reveal delay={200}>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-snow/75">
            We track four stages of the funnel to prove{" "}
            <strong className="font-semibold text-snow">commercial value</strong> — not
            vanity metrics.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          {/* measurement */}
          <div ref={funnelRef}>
            <Reveal className="flex items-center gap-4">
              <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-gold">
                Measurement
              </span>
              <span className="h-px flex-1 bg-snow/15" />
            </Reveal>
            <div className="mt-7 space-y-6">
              {FUNNEL.map((f, i) => (
                <Reveal key={f.stage} delay={i * 120}>
                  <div className="flex items-baseline justify-between gap-4">
                    <h3
                      className={
                        i === FUNNEL.length - 1
                          ? "font-display text-2xl font-semibold text-goldbright"
                          : "font-display text-2xl font-semibold text-snow"
                      }
                    >
                      {f.stage}
                    </h3>
                    <p className="text-right font-mono text-[10px] uppercase tracking-[0.14em] text-snow/50">
                      {f.metrics}
                    </p>
                  </div>
                  <div className="mt-2 h-2.5 w-full bg-snow/[0.07]">
                    <div
                      className={`h-full transition-all duration-1000 ease-out ${f.bar}`}
                      style={{
                        width: funnelIn ? f.width : "0%",
                        transitionDelay: `${200 + i * 170}ms`,
                      }}
                    />
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          {/* the ask */}
          <div>
            <Reveal className="flex items-center gap-4">
              <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-gold">
                The ask — next steps
              </span>
              <span className="h-px flex-1 bg-snow/15" />
            </Reveal>
            <div>
              {ASKS.map((a, i) => (
                <Reveal
                  key={a}
                  delay={150 + i * 140}
                  className="group flex items-start gap-6 border-b border-snow/12 py-6 transition-all duration-300 hover:border-gold/50 hover:pl-3"
                >
                  <span className="w-9 shrink-0 font-display text-3xl font-semibold italic leading-none text-gold">
                    {i + 1}.
                  </span>
                  <p className="text-[16px] leading-relaxed text-snow/85">{a}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>

        {/* the proof — prototype */}
        <Reveal delay={160} className="mt-14 grid border border-gold/35 bg-pine/60 md:grid-cols-[1.15fr_1fr]">
          <div className="group relative overflow-hidden">
            <img
              src={IMG.elephants}
              alt="Film still — elephants crossing golden plains at sunset"
              loading="lazy"
              className="h-full min-h-[220px] w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <span className="pointer-events-none absolute inset-x-0 top-0 h-[7%] bg-ink" aria-hidden="true" />
            <span className="pointer-events-none absolute inset-x-0 bottom-0 h-[7%] bg-ink" aria-hidden="true" />
            <span className="absolute left-4 top-[12%] bg-ink/85 px-2.5 py-1.5 font-mono text-[9px] uppercase tracking-[0.2em] text-goldpale">
              Prototype · 60 Seconds in Kenya
            </span>
            <span className="absolute bottom-[12%] right-4 font-mono text-[10px] tracking-[0.2em] text-snow/80">
              00:60
            </span>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="relative flex h-16 w-16 items-center justify-center">
                <span className="pulse-ring absolute inset-0 rounded-full border-2 border-gold" aria-hidden="true" />
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-gold text-ink">
                  <svg viewBox="0 0 24 24" className="ml-1 h-6 w-6" fill="currentColor" aria-hidden="true">
                    <path d="M7 4.5v15l13-7.5-13-7.5Z" />
                  </svg>
                </span>
              </span>
            </div>
          </div>
          <div className="flex flex-col justify-center p-8 md:p-10">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">
              The proof
            </p>
            <p className="mt-4 font-display text-xl font-medium leading-snug text-snow md:text-2xl">
              Attached to this document is a fully produced prototype of{" "}
              <em className="italic text-goldbright">60 Seconds in Kenya</em> — the
              quality and vision of the engine, in one minute.
            </p>
            <button
              type="button"
              onClick={() => setFileNote(true)}
              className="mt-7 self-start border border-gold px-6 py-3 font-mono text-[10px] uppercase tracking-[0.24em] text-goldbright transition-colors duration-300 hover:bg-gold hover:text-ink"
            >
              {fileNote ? "Included with this deck ✓" : "Review the prototype →"}
            </button>
            <p
              className={`mt-4 font-mono text-[9px] uppercase tracking-[0.18em] transition-colors duration-500 ${
                fileNote ? "text-goldbright" : "text-snow/40"
              }`}
              aria-live="polite"
            >
              {fileNote
                ? "60seconds_kenya_ep01 travels attached to this briefing."
                : "File — 60seconds_kenya_ep01 · 4K · 00:60"}
            </p>
          </div>
        </Reveal>

        {/* end of document */}
        <Reveal delay={200} className="mt-14 flex flex-wrap items-center justify-between gap-3 border-t border-snow/12 pt-6 font-mono text-[9px] uppercase tracking-[0.26em] text-snow/40">
          <span>End of briefing — asante sana</span>
          <span className="text-gold/70">KATO × Media Engine · prepared for the CEO&rsquo;s desk</span>
        </Reveal>
      </div>
    </section>
  );
}
