import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";

export const cx = (...a: Array<string | false | null | undefined>) =>
  a.filter(Boolean).join(" ");

/* ------------------------------------------------------------------ */
export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState<boolean>(() =>
    typeof window !== "undefined"
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
      : false
  );
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const fn = () => setReduced(mq.matches);
    mq.addEventListener?.("change", fn);
    return () => mq.removeEventListener?.("change", fn);
  }, []);
  return reduced;
}

/* ------------------------------------------------------------------ */
export function useInView<T extends HTMLElement>(
  threshold = 0.18,
  rootMargin = "0px 0px -8% 0px"
): [React.RefObject<T>, boolean] {
  const ref = useRef<T>(null) as React.RefObject<T>;
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold, rootMargin }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold, rootMargin]);
  return [ref, inView];
}

/* ------------------------------------------------------------------ */
type RevealProps = {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: keyof React.JSX.IntrinsicElements;
  style?: CSSProperties;
};

export function Reveal({
  children,
  delay = 0,
  className = "",
  as = "div",
  style,
}: RevealProps) {
  const [ref, inView] = useInView<HTMLElement>(0.12);
  const Tag = as as React.ElementType;
  return (
    <Tag
      ref={ref}
      className={cx("reveal", inView && "in", className)}
      style={{ ...style, ["--rd" as string]: `${delay}ms` } as CSSProperties}
    >
      {children}
    </Tag>
  );
}

/* ------------------------------------------------------------------ */
export function MaskLines({
  lines,
  className,
  lineClassName,
  stagger = 110,
  startDelay = 0,
}: {
  lines: ReactNode[];
  className?: string;
  lineClassName?: string;
  stagger?: number;
  startDelay?: number;
}) {
  const [ref, inView] = useInView<HTMLSpanElement>(0.3);
  return (
    <span ref={ref} className={cx("block", inView && "in", className)}>
      {lines.map((line, i) => (
        <span key={i} className="mask-line">
          <span
            className={lineClassName}
            style={{ transitionDelay: `${startDelay + i * stagger}ms` }}
          >
            {line}
          </span>
        </span>
      ))}
    </span>
  );
}

/* ------------------------------------------------------------------ */
const SCRAMBLE_CHARS = "KATOKENY#×/\\+—·";

export function Scramble({
  text,
  className,
  speed = 26,
  delay = 0,
}: {
  text: string;
  className?: string;
  speed?: number;
  delay?: number;
}) {
  const reduced = useReducedMotion();
  const [ref, inView] = useInView<HTMLSpanElement>(0.3);
  const [out, setOut] = useState(() => text.replace(/[^\s]/g, "\u00A0"));

  useEffect(() => {
    if (!inView) return;
    if (reduced) {
      setOut(text);
      return;
    }
    let iv: number | undefined;
    let frame = 0;
    const total = Math.max(16, Math.round(text.length * 1.7));
    const to = window.setTimeout(() => {
      iv = window.setInterval(() => {
        frame += 1;
        const resolved = Math.floor((frame / total) * text.length);
        let s = "";
        for (let i = 0; i < text.length; i += 1) {
          const c = text[i];
          if (c === " ") {
            s += " ";
            continue;
          }
          s +=
            i < resolved
              ? c
              : SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
        }
        setOut(s);
        if (frame >= total) {
          setOut(text);
          if (iv) window.clearInterval(iv);
        }
      }, speed);
    }, delay);
    return () => {
      window.clearTimeout(to);
      if (iv) window.clearInterval(iv);
    };
  }, [inView, reduced, text, speed, delay]);

  return (
    <span ref={ref} className={className} aria-label={text}>
      {out}
    </span>
  );
}

/* ------------------------------------------------------------------ */
export function useCountUp(target: number, run: boolean, duration = 1400) {
  const reduced = useReducedMotion();
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!run) return;
    if (reduced) {
      setVal(target);
      return;
    }
    let raf = 0;
    const t0 = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(target * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [run, target, duration, reduced]);
  return val;
}
