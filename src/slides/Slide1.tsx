import { IMG } from "../lib/images";
import { MaskLines, Reveal, Scramble } from "../lib/motion";
import { Watermark } from "../components/Chrome";

export default function Slide1() {
  return (
    <section id="page-1" className="slide relative flex min-h-svh flex-col overflow-hidden bg-ink">
      {/* full-bleed dawn backdrop */}
      <div className="absolute inset-0 overflow-hidden">
        <img
          src={IMG.hero}
          alt="Maasai Mara at dawn — acacia silhouettes and hot-air balloons in first light"
          className="kenburns h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/78 to-ink/25" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/25 to-ink/60" />
      </div>

      <Watermark num="01" tone="dark" />

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col justify-end px-6 pb-24 pt-28 md:px-12">
        {/* document header line */}
        <Reveal className="mb-10 flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-[10px] uppercase tracking-[0.3em] text-goldpale/90">
          <span>Kenya Association of Tour Operators</span>
          <span className="hidden h-px w-16 bg-gold/50 sm:block" />
          <span className="text-snow/55">Mini-pitch · 5 pages · read in 2 minutes</span>
        </Reveal>

        <h1 className="font-display font-semibold leading-[0.95] text-snow">
          <Scramble
            text="The Trust Gap"
            delay={200}
            className="block text-[15vw] sm:text-7xl lg:text-8xl xl:text-[7.5rem]"
          />
          <MaskLines
            startDelay={650}
            className="text-[15vw] sm:text-7xl lg:text-8xl xl:text-[7.5rem]"
            lines={[
              <>
                in <em className="italic text-goldbright">Kenyan Tourism.</em>
              </>,
            ]}
          />
        </h1>

        <div className="mt-12 grid items-end gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <Reveal delay={250}>
            <p className="max-w-xl text-[17px] leading-relaxed text-snow/85">
              Travellers have endless options for booking a safari — but a severe lack
              of trustworthy, consolidated information. They rely on foreign OTAs and
              commission-heavy platforms because there is{" "}
              <strong className="font-semibold text-snow">
                no unified, authoritative local media voice
              </strong>{" "}
              guiding them to verified operators.
            </p>
            <div className="mt-6 flex flex-wrap gap-3 font-mono text-[10px] uppercase tracking-[0.2em]">
              <span className="border border-gold/45 px-3 py-1.5 text-goldpale">
                395+ verified operators
              </span>
              <span className="border border-snow/25 px-3 py-1.5 text-snow/55 line-through decoration-gold/70">
                1 unified consumer voice
              </span>
            </div>
          </Reveal>

          <Reveal delay={420}>
            <div className="border-l-2 border-gold pl-6 md:pl-8">
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">
                The strategic question
              </p>
              <p className="mt-3 font-display text-xl font-medium italic leading-snug text-snow md:text-[1.55rem]">
                Can KATO&rsquo;s institutional authority and network of 395+ operators
                become a consumer-facing media engine that drives direct discovery and
                trust?
              </p>
            </div>
          </Reveal>
        </div>
      </div>

      {/* scroll cue */}
      <div data-chrome className="pointer-events-none absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 sm:flex">
        <span className="font-mono text-[9px] uppercase tracking-[0.34em] text-snow/50">
          Scroll
        </span>
        <span className="cue-float block h-8 w-px bg-gradient-to-b from-gold to-transparent" />
      </div>
    </section>
  );
}
