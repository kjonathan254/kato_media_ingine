import { cx } from "../lib/motion";

export type SlideMeta = {
  id: string;
  num: string;
  title: string;
  short: string;
};

/* ------------------------------------------------------------------ */
export function Monogram({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 46" className={className} aria-hidden="true">
      <path
        d="M20 2 36 8.5V23c0 10.4-7.6 17.6-16 21C11.6 40.6 4 33.4 4 23V8.5L20 2Z"
        fill="none"
        stroke="var(--color-gold)"
        strokeWidth="2"
      />
      <path
        d="M20 6.5 32 11.4V23c0 8.3-6 14.2-12 17-6-2.8-12-8.7-12-17V11.4L20 6.5Z"
        fill="none"
        stroke="var(--color-gold)"
        strokeOpacity="0.35"
        strokeWidth="1"
      />
      <path
        d="M14.5 14v17M14.5 23.5 26 14M17.5 21 26.5 31"
        fill="none"
        stroke="var(--color-goldbright)"
        strokeWidth="2.6"
        strokeLinecap="square"
      />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
export function ProgressBar({ value }: { value: number }) {
  return (
    <div className="fixed left-0 top-0 z-[70] h-[3px] w-full bg-transparent">
      <div
        className="h-full bg-gold shadow-[0_0_12px_rgba(201,162,39,0.7)]"
        style={{ width: `${Math.round(value * 1000) / 10}%` }}
      />
    </div>
  );
}

/* ------------------------------------------------------------------ */
export function TopBar({
  slides,
  active,
  onNav,
}: {
  slides: SlideMeta[];
  active: number;
  onNav: (i: number) => void;
}) {
  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50">
      <div className="flex h-14 items-center justify-between border-b border-gold/15 bg-ink/90 px-4 backdrop-blur-[3px] md:px-8">
        <button
          onClick={() => onNav(0)}
          className="pointer-events-auto flex items-center gap-3 text-left"
          aria-label="Back to page one"
        >
          <Monogram className="h-8 w-7 shrink-0" />
          <span className="leading-none">
            <span className="block font-display text-[15px] font-semibold tracking-wide text-snow">
              KATO
            </span>
            <span className="mt-1 block font-mono text-[9px] uppercase tracking-[0.28em] text-gold/80">
              Media Engine Proposal
            </span>
          </span>
        </button>

        <nav className="pointer-events-auto hidden items-center gap-1 lg:flex">
          {slides.map((s, i) => (
            <button
              key={s.id}
              onClick={() => onNav(i)}
              className={cx(
                "group relative px-3 py-2 font-mono text-[10px] uppercase tracking-[0.18em] transition-colors duration-300",
                i === active ? "text-goldbright" : "text-snow/50 hover:text-snow"
              )}
            >
              <span className="mr-1.5 text-gold/70">{s.num}</span>
              {s.short}
              <span
                className={cx(
                  "absolute inset-x-3 bottom-0 h-px origin-left bg-gold transition-transform duration-300",
                  i === active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                )}
              />
            </button>
          ))}
        </nav>

        <div className="pointer-events-auto flex items-center gap-2 border border-gold/30 px-3 py-1.5">
          <span className="blink-dot h-1.5 w-1.5 rounded-full bg-goldbright" />
          <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-goldpale">
            CEO Briefing · 2 min
          </span>
        </div>
      </div>
    </header>
  );
}

/* ------------------------------------------------------------------ */
export function SideRail({
  slides,
  active,
  onNav,
}: {
  slides: SlideMeta[];
  active: number;
  onNav: (i: number) => void;
}) {
  return (
    <nav
      className="pointer-events-none fixed right-6 top-1/2 z-50 hidden -translate-y-1/2 flex-col items-end gap-4 md:flex"
      aria-label="Pages"
    >
      {slides.map((s, i) => (
        <button
          key={s.id}
          onClick={() => onNav(i)}
          className="pointer-events-auto group flex items-center gap-3"
          aria-label={`Page ${s.num}: ${s.title}`}
        >
          <span
            className={cx(
              "translate-x-2 font-mono text-[9px] uppercase tracking-[0.2em] opacity-0 transition-all duration-300",
              i === active
                ? "translate-x-0 text-goldbright opacity-100"
                : "text-snow/60 group-hover:translate-x-0 group-hover:opacity-100"
            )}
          >
            {s.short}
          </span>
          <span
            className={cx(
              "block rotate-45 border transition-all duration-300",
              i === active
                ? "h-2.5 w-2.5 border-goldbright bg-goldbright"
                : "h-2 w-2 border-snow/40 bg-transparent group-hover:border-gold"
            )}
          />
        </button>
      ))}
    </nav>
  );
}

/* ------------------------------------------------------------------ */
export function BottomBar({ active, total }: { active: number; total: number }) {
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-40 hidden items-center justify-between px-8 pb-4 sm:flex">
      <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-snow/45">
        Page {String(active + 1).padStart(2, "0")} — {String(total).padStart(2, "0")}
      </span>
      <span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-snow/45">
        <kbd className="border border-snow/25 px-1.5 py-0.5">↑</kbd>
        <kbd className="border border-snow/25 px-1.5 py-0.5">↓</kbd>
        navigate
      </span>
    </div>
  );
}

/* ------------------------------------------------------------------ */
export function Kicker({
  num,
  label,
  tone = "dark",
}: {
  num: string;
  label: string;
  tone?: "dark" | "light";
}) {
  return (
    <div
      className={cx(
        "flex items-center gap-4",
        tone === "dark" ? "text-gold" : "text-moss"
      )}
    >
      <span className="h-2 w-2 rotate-45 bg-gold" />
      <span className="font-mono text-[11px] font-medium uppercase tracking-[0.34em]">
        Page {num} · {label}
      </span>
      <span
        className={cx(
          "h-px flex-1",
          tone === "dark" ? "bg-snow/15" : "bg-ink/15"
        )}
      />
    </div>
  );
}

/* ------------------------------------------------------------------ */
export function Watermark({ num, tone = "dark" }: { num: string; tone?: "dark" | "light" }) {
  return (
    <span
      aria-hidden="true"
      className="pointer-events-none absolute -bottom-[4vw] right-0 select-none font-display text-[38vw] font-bold leading-[0.8] lg:text-[22rem]"
      style={{ color: tone === "dark" ? "rgba(236,234,222,0.035)" : "rgba(11,29,20,0.045)" }}
    >
      {num}
    </span>
  );
}
