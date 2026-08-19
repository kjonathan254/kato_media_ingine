import { Kicker, Watermark } from "../components/Chrome";
import { MaskLines, Reveal, useCountUp, useInView } from "../lib/motion";

/* ---------- custom inline icons ---------- */
function ShieldIcon() {
  return (
    <svg viewBox="0 0 48 48" className="h-14 w-14 transition-transform duration-500 group-hover:-translate-y-1 group-hover:scale-105" aria-hidden="true">
      <path
        d="M24 4 40 10.2V22c0 10-6.9 17.1-16 20.2C14.9 39.1 8 32 8 22V10.2L24 4Z"
        fill="none"
        stroke="var(--color-moss)"
        strokeWidth="2"
      />
      <path d="M17 24.5 22 29.5 31.5 18.5" fill="none" stroke="var(--color-gold)" strokeWidth="2.6" />
    </svg>
  );
}

function NetworkIcon() {
  const spokes = [
    [24, 8],
    [38, 16],
    [38, 32],
    [24, 40],
    [10, 32],
    [10, 16],
  ];
  return (
    <svg viewBox="0 0 48 48" className="h-14 w-14 transition-transform duration-500 group-hover:-translate-y-1 group-hover:scale-105" aria-hidden="true">
      {spokes.map(([x, y], i) => (
        <line key={i} x1="24" y1="24" x2={x} y2={y} stroke="var(--color-moss)" strokeWidth="1.5" strokeOpacity="0.55" />
      ))}
      {spokes.map(([x, y], i) => (
        <circle
          key={`n${i}`}
          cx={x}
          cy={y}
          r="3.2"
          fill={i === 1 ? "var(--color-gold)" : "none"}
          stroke="var(--color-moss)"
          strokeWidth="1.8"
        />
      ))}
      <circle cx="24" cy="24" r="5.4" fill="var(--color-moss)" />
      <circle cx="24" cy="24" r="1.8" fill="var(--color-goldbright)" />
    </svg>
  );
}

function DataIcon() {
  return (
    <svg viewBox="0 0 48 48" className="h-14 w-14 transition-transform duration-500 group-hover:-translate-y-1 group-hover:scale-105" aria-hidden="true">
      <path d="M24 5 43 14.5 24 24 5 14.5 24 5Z" fill="none" stroke="var(--color-moss)" strokeWidth="2" />
      <path d="m5 24 19 9.5L43 24" fill="none" stroke="var(--color-moss)" strokeWidth="2" strokeOpacity="0.65" />
      <path d="m5 33 19 9.5L43 33" fill="none" stroke="var(--color-gold)" strokeWidth="2.2" />
    </svg>
  );
}

/* ---------- assets ---------- */
const ASSETS = [
  {
    index: "A—01",
    title: "Authority",
    body: "A recognised standard of quality and a bonded membership scheme.",
    Icon: ShieldIcon,
  },
  {
    index: "A—02",
    title: "Network",
    body: "395+ verified operators with diverse, specialised offerings.",
    Icon: NetworkIcon,
  },
  {
    index: "A—03",
    title: "Data",
    body: "Deep institutional knowledge of destinations, seasons, pricing and safety.",
    Icon: DataIcon,
  },
];

export default function Slide2() {
  const [statRef, statIn] = useInView<HTMLDivElement>(0.4);
  const operators = useCountUp(395, statIn, 1500);

  return (
    <section id="page-2" className="slide relative min-h-svh overflow-hidden bg-paper text-ink">
      <div className="blueprint pointer-events-none absolute inset-0" />
      <Watermark num="03" tone="light" />

      <div className="relative mx-auto w-full max-w-7xl px-6 py-24 md:px-12 md:py-28">
        <Reveal>
          <Kicker num="03" label="What KATO Already Has" tone="light" />
        </Reveal>

        <div className="mt-10 flex flex-wrap items-end justify-between gap-10">
          <div className="max-w-3xl">
            <h2 className="font-display text-4xl font-semibold leading-[1.02] md:text-6xl">
              <MaskLines
                lines={[
                  <>KATO does not need</>,
                  <>
                    to build{" "}
                    <em className="italic text-fern">new infrastructure.</em>
                  </>,
                ]}
              />
            </h2>
            <Reveal delay={200}>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink/70">
                You already hold the most valuable assets in the Kenyan tourism
                ecosystem:
              </p>
            </Reveal>
          </div>

          <div
            ref={statRef}
            className="border-l-2 border-gold pl-6 md:pl-8"
          >
            <p className="font-display text-6xl font-semibold leading-none text-moss md:text-7xl">
              {operators}
              <span className="text-gold">+</span>
            </p>
            <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.26em] text-ink/55">
              Verified member operators
            </p>
          </div>
        </div>

        {/* three asset columns */}
        <div className="mt-14 grid border-t border-ink/15 md:grid-cols-3">
          {ASSETS.map(({ index, title, body, Icon }, i) => (
            <Reveal
              key={title}
              delay={i * 140}
              className="group relative border-b border-ink/10 p-8 transition-colors duration-300 last:border-b-0 hover:bg-ink/[0.035] md:border-b-0 md:border-r md:p-10 md:last:border-r-0"
            >
              <span className="absolute right-6 top-7 font-mono text-[10px] tracking-[0.2em] text-ink/35">
                {index}
              </span>
              <Icon />
              <h3 className="mt-6 font-display text-2xl font-semibold">{title}</h3>
              <span className="mt-2 block h-0.5 w-8 bg-gold transition-all duration-500 group-hover:w-16" />
              <p className="mt-4 text-[15px] leading-relaxed text-ink/70">{body}</p>
            </Reveal>
          ))}
        </div>

        {/* the gap callout */}
        <Reveal delay={160} className="relative mt-16 bg-ink px-8 py-10 text-paper md:px-12 md:py-12">
          {["top-3 left-3 border-t-2 border-l-2", "top-3 right-3 border-t-2 border-r-2", "bottom-3 left-3 border-b-2 border-l-2", "bottom-3 right-3 border-b-2 border-r-2"].map(
            (pos) => (
              <span key={pos} aria-hidden="true" className={`pointer-events-none absolute h-4 w-4 border-gold ${pos}`} />
            )
          )}
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">
            The gap — where the value leaks
          </p>
          <p className="mt-4 max-w-4xl font-display text-2xl font-medium leading-snug md:text-4xl">
            These assets currently live as{" "}
            <span className="text-snow/55 line-through decoration-gold decoration-2">B2B</span>{" "}
            directory listings. They are not packaged as{" "}
            <span className="text-goldbright">B2C media.</span>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
