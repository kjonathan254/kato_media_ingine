import { IMG } from "../lib/images";
import { Kicker, Watermark } from "../components/Chrome";
import { MaskLines, Reveal, cx } from "../lib/motion";

/* ---------- flowchart ---------- */
const NODES = [
  { tag: "Node 01", title: "KATO Members", sub: "Stories & expertise", gold: false },
  { tag: "Node 02", title: "KATO Media Engine", sub: "Production & distribution", gold: true },
  { tag: "Node 03", title: "Traveller", sub: "Discovery & trust", gold: false },
  { tag: "Node 04", title: "KATO Directory", sub: "Direct enquiries", gold: false },
];

function Connector({ delay }: { delay: number }) {
  return (
    <Reveal
      delay={delay}
      className="flex shrink-0 items-center justify-center py-1 lg:w-16 lg:py-0"
    >
      {/* horizontal arrow */}
      <svg viewBox="0 0 60 24" className="hidden h-6 w-14 lg:block" aria-hidden="true">
        <path d="M2 12 H48" fill="none" stroke="var(--color-gold)" strokeWidth="1.6" className="draw-path" style={{ ["--len" as string]: 46, transitionDelay: "120ms" }} />
        <path d="M42 5 54 12 42 19" fill="none" stroke="var(--color-gold)" strokeWidth="1.6" className="draw-path" style={{ ["--len" as string]: 30, transitionDelay: "420ms" }} />
      </svg>
      {/* vertical arrow */}
      <svg viewBox="0 0 24 48" className="h-10 w-6 lg:hidden" aria-hidden="true">
        <path d="M12 2 V34" fill="none" stroke="var(--color-gold)" strokeWidth="1.6" className="draw-path" style={{ ["--len" as string]: 32, transitionDelay: "120ms" }} />
        <path d="M5 28 12 41 19 28" fill="none" stroke="var(--color-gold)" strokeWidth="1.6" className="draw-path" style={{ ["--len" as string]: 32, transitionDelay: "420ms" }} />
      </svg>
    </Reveal>
  );
}

/* ---------- content architecture ---------- */
const SHOWS = [
  {
    tag: "Series · 60″",
    title: "60 Seconds in Kenya",
    desc: "Destination storytelling",
    img: IMG.river,
    alt: "The Mara River winding through green savanna",
  },
  {
    tag: "Series · Profile",
    title: "Meet the Operator",
    desc: "Member visibility",
    img: IMG.guide,
    alt: "A Kenyan safari guide smiling beside his Land Cruiser",
  },
  {
    tag: "Series · Explainer",
    title: "KATO Explains",
    desc: "Trust, standards & authority",
    img: IMG.map,
    alt: "Hands unrolling a topographic map on a safari table",
  },
];

export default function Slide3() {
  return (
    <section id="page-3" className="slide relative min-h-svh overflow-hidden bg-pine">
      <div className="topo pointer-events-none absolute inset-0" />
      <Watermark num="04" tone="dark" />

      <div className="relative mx-auto w-full max-w-7xl px-6 py-24 md:px-12 md:py-28">
        <Reveal>
          <Kicker num="04" label="The KATO Media Engine" tone="dark" />
        </Reveal>

        <h2 className="mt-10 font-display text-4xl font-semibold leading-[1.02] text-snow md:text-6xl">
          <MaskLines
            lines={[
              <>From directory to</>,
              <>
                media <em className="italic text-goldbright">ecosystem.</em>
              </>,
            ]}
          />
        </h2>

        <Reveal delay={200}>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-snow/75">
            Instead of asking 395 operators to become media companies, KATO becomes
            the <strong className="font-semibold text-snow">shared media infrastructure</strong>.
          </p>
        </Reveal>

        {/* flowchart */}
        <div className="mt-14 flex flex-col items-stretch lg:flex-row lg:items-stretch">
          {NODES.map((n, i) => (
            <div key={n.title} className="contents">
              <Reveal
                delay={i * 160}
                className={cx(
                  "relative flex-1 border px-5 py-6 md:px-6",
                  n.gold
                    ? "border-gold bg-gold text-ink shadow-[0_0_50px_rgba(201,162,39,0.25)]"
                    : "border-snow/15 bg-ink/45 text-snow"
                )}
              >
                {n.gold && (
                  <>
                    <span className="pointer-events-none absolute inset-0 border border-gold/50 pulse-ring" aria-hidden="true" />
                    <span className="blink-dot absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full bg-goldbright" aria-hidden="true" />
                  </>
                )}
                <p
                  className={cx(
                    "font-mono text-[9px] uppercase tracking-[0.28em]",
                    n.gold ? "text-ink/65" : "text-gold"
                  )}
                >
                  {n.tag}
                </p>
                <p className="mt-2 font-display text-xl font-semibold leading-tight md:text-2xl">
                  {n.title}
                </p>
                <p
                  className={cx(
                    "mt-1.5 text-sm",
                    n.gold ? "text-ink/75" : "text-snow/60"
                  )}
                >
                  {n.sub}
                </p>
              </Reveal>
              {i < NODES.length - 1 && <Connector delay={380 + i * 200} />}
            </div>
          ))}
        </div>

        <Reveal delay={250} className="mt-5 flex items-center gap-4">
          <span className="h-px flex-1 bg-snow/12" />
          <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-snow/45">
            One pipeline · every member benefits
          </span>
          <span className="h-px flex-1 bg-snow/12" />
        </Reveal>

        {/* content architecture */}
        <Reveal delay={120} className="mt-16 flex items-center gap-5">
          <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-gold">
            The content architecture
          </span>
          <span className="h-px flex-1 bg-snow/15" />
          <span className="hidden font-mono text-[10px] uppercase tracking-[0.24em] text-snow/45 sm:block">
            3 formats · one voice
          </span>
        </Reveal>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {SHOWS.map((s, i) => (
            <Reveal
              key={s.title}
              delay={i * 130}
              className="group border border-snow/12 bg-ink/40 transition-all duration-300 hover:-translate-y-1.5 hover:border-gold/60 hover:shadow-[0_18px_40px_rgba(0,0,0,0.35)]"
            >
              <div className="aspect-[3/2] overflow-hidden">
                <img
                  src={s.img}
                  alt={s.alt}
                  loading="lazy"
                  className="h-full w-full object-cover saturate-[0.82] transition-all duration-700 group-hover:scale-105 group-hover:saturate-100"
                />
              </div>
              <div className="p-5 md:p-6">
                <p className="font-mono text-[9px] uppercase tracking-[0.26em] text-gold">
                  {s.tag}
                </p>
                <h3 className="mt-2 font-display text-xl font-semibold text-snow">
                  {s.title}
                </h3>
                <p className="mt-1.5 text-sm text-snow/60">{s.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
