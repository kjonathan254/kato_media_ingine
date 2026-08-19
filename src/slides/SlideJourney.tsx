import { Kicker, Watermark } from "../components/Chrome";
import { MaskLines, Reveal, cx } from "../lib/motion";

/* ---------- stage glyphs ---------- */
function CompassIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="m15.5 8.5-2.2 5-5 2.2 2.2-5 5-2.2Z" fill="currentColor" stroke="none" />
    </svg>
  );
}

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M10 9.5v5l4.5-2.5L10 9.5Z" fill="currentColor" stroke="none" />
    </svg>
  );
}

function TrustIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
      <path d="M12 3 19 5.8V11c0 4.4-3 7.6-7 9-4-1.4-7-4.6-7-9V5.8L12 3Z" />
      <path d="m9 11.5 2.2 2.2L15.5 9" />
    </svg>
  );
}

function MemberIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
      <path d="M12 21s-6.5-5.4-6.5-10.2A6.5 6.5 0 0 1 12 4.3a6.5 6.5 0 0 1 6.5 6.5C18.5 15.6 12 21 12 21Z" />
      <circle cx="12" cy="10.8" r="2.3" />
    </svg>
  );
}

function EnquiryIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
      <rect x="3" y="5.5" width="18" height="13" rx="1.5" />
      <path d="m4 7 8 6 8-6" />
    </svg>
  );
}

/* ---------- the chain ---------- */
type Stage = {
  step: string;
  title: string;
  desc: string;
  Icon: () => React.JSX.Element;
  gold?: boolean;
};

const STAGES: Stage[] = [
  {
    step: "01",
    title: "Traveller discovers Kenya",
    desc: "Search, short-form video, word of mouth — the moment of inspiration.",
    Icon: CompassIcon,
  },
  {
    step: "02",
    title: "KATO Media",
    desc: "60 Seconds in Kenya · Meet the Operator · KATO Explains.",
    Icon: PlayIcon,
    gold: true,
  },
  {
    step: "03",
    title: "Trust + education + inspiration",
    desc: "Authority a foreign OTA simply cannot give.",
    Icon: TrustIcon,
  },
  {
    step: "04",
    title: "Discover a KATO member",
    desc: "Verified, bonded operators surfaced through the directory.",
    Icon: MemberIcon,
  },
  {
    step: "05",
    title: "Enquiry / booking",
    desc: "Direct, attributable commercial value for members.",
    Icon: EnquiryIcon,
  },
];

function DownConnector({ delay }: { delay: number }) {
  return (
    <Reveal delay={delay} className="pl-[27px]">
      <svg viewBox="0 0 24 40" className="h-9 w-6" aria-hidden="true">
        <path
          d="M12 2 V26"
          fill="none"
          stroke="var(--color-gold)"
          strokeWidth="1.5"
          className="draw-path"
          style={{ ["--len" as string]: 26, transitionDelay: "120ms" }}
        />
        <path
          d="M6 21 12 34 18 21"
          fill="none"
          stroke="var(--color-gold)"
          strokeWidth="1.5"
          className="draw-path"
          style={{ ["--len" as string]: 32, transitionDelay: "380ms" }}
        />
      </svg>
    </Reveal>
  );
}

function StageRow({ s, index }: { s: Stage; index: number }) {
  return (
    <Reveal
      delay={index * 160}
      className={cx(
        "group flex items-center gap-4 border px-4 py-3.5 transition-all duration-300 md:gap-5",
        s.gold
          ? "border-gold bg-gold text-ink shadow-[0_0_44px_rgba(201,162,39,0.22)]"
          : "border-snow/15 bg-pine/45 text-snow hover:translate-x-1.5 hover:border-gold/55"
      )}
    >
      <span
        className={cx(
          "flex h-11 w-11 shrink-0 items-center justify-center border",
          s.gold ? "border-ink/30 text-ink" : "border-gold/40 text-gold"
        )}
      >
        <s.Icon />
      </span>
      <span className="min-w-0">
        <span
          className={cx(
            "block font-mono text-[9px] uppercase tracking-[0.26em]",
            s.gold ? "text-ink/60" : "text-gold"
          )}
        >
          Step {s.step}
        </span>
        <span className="block font-display text-lg font-semibold leading-tight md:text-xl">
          {s.title}
        </span>
        <span
          className={cx(
            "mt-0.5 block text-[13px] leading-snug",
            s.gold ? "text-ink/70" : "text-snow/55"
          )}
        >
          {s.desc}
        </span>
      </span>
    </Reveal>
  );
}

/* ---------- slide ---------- */
export default function SlideJourney() {
  return (
    <section id="page-journey" className="slide relative min-h-svh overflow-hidden bg-ink">
      <div className="topo pointer-events-none absolute inset-0" />
      <Watermark num="02" tone="dark" />

      <div className="relative mx-auto w-full max-w-7xl px-6 py-24 md:px-12 md:py-28">
        <Reveal>
          <Kicker num="02" label="The Traveller Journey" tone="dark" />
        </Reveal>

        <div className="mt-10 grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
          {/* left — the claim, honestly positioned */}
          <div>
            <h2 className="font-display text-4xl font-semibold leading-[1.02] text-snow md:text-6xl">
              <MaskLines
                lines={[
                  <>One chain</>,
                  <>
                    KATO can <em className="italic text-goldbright">own.</em>
                  </>,
                ]}
              />
            </h2>

            <Reveal delay={220}>
              <p className="mt-6 max-w-lg text-lg leading-relaxed text-snow/75">
                The engine is not a posting schedule — it is a pipeline. Attention
                becomes trust, trust becomes discovery, and discovery becomes{" "}
                <strong className="font-semibold text-snow">revenue for members</strong>.
              </p>
            </Reveal>

            <Reveal delay={360} className="mt-9 max-w-lg border-l-2 border-gold pl-6">
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">
                Positioned honestly
              </p>
              <p className="mt-3 text-[15px] leading-relaxed text-snow/75">
                This chain is a <strong className="font-semibold text-snow">hypothesis</strong>,
                not a proven model. The 90-day pilot exists to test it — before KATO
                commits anything significant.
              </p>
            </Reveal>

            <Reveal delay={480} className="mt-9 hidden font-mono text-[9px] uppercase tracking-[0.26em] text-snow/40 lg:block">
              System view · page 04 — proof plan · page 06
            </Reveal>
          </div>

          {/* right — the flow diagram */}
          <div>
            <Reveal className="mb-5 flex items-center gap-4">
              <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-gold">
                Discovery → enquiry
              </span>
              <span className="h-px flex-1 bg-snow/15" />
            </Reveal>

            {STAGES.map((s, i) => (
              <div key={s.step}>
                <StageRow s={s} index={i} />
                {i < STAGES.length - 1 && <DownConnector delay={260 + i * 180} />}
              </div>
            ))}

            <Reveal delay={900} className="mt-5 flex items-center gap-3 font-mono text-[9px] uppercase tracking-[0.24em] text-snow/45">
              <span className="h-1.5 w-1.5 rotate-45 bg-goldbright" />
              Attributable — this is exactly what the pilot measures
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
