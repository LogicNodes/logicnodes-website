import React, {
    useState,
    useRef,
    useLayoutEffect,
    useEffect,
    type MutableRefObject,
  } from 'react';
  import clsx from 'clsx';
  
  const ACCENT = '#ff931e';   // ln.accent
  const DARK   = '#3f495d';   // ln.dark (node outline when idle)
  const LIGHT  = '#f2f9ff';   // ln.light (node fill + default wire)
  
  const CARDS = [
    {
      title: 'Indsigt',
      body:
        'Få en klar forståelse af, hvad AI er, og hvordan konkrete værktøjer allerede i dag kan forbedre effektiviteten i jeres virksomhed.',
      icon: '/icons/info.svg',
    },
    {
      title: 'Identifikation',
      body:
        'Opnå overblik over de områder i jeres forretning, hvor AI har størst potentiale til at skabe værdi og forbedre arbejdsgange.',
      icon: '/icons/insight.svg',
    },
    {
      title: 'Implementering',
      body:
        'Få hjælp til at implementere AI i jeres arbejds­gange gennem et struktureret forløb med udgangspunkt i jeres hverdag.',
      icon: '/icons/implement.svg',
    },
    {
      title: 'Innovation',
      body:
        'Differentiér jer med innovative AI-løsninger, der er specialdesignet til jeres virksomhed og jeres udfordringer.',
      icon: '/icons/custom.svg',
    },
  ];
  
  // zig-zag X positions (inside a 120-px wide SVG)
  const X = [0, 120, 0, 120];
  
  // node sizes
  const R = { base: 50, hot: 60 };
  const ICON_SCALE = 1.3; // icon ≈ 120 % of radius
  
  export default function ServicesSection() {
    const [active, setActive] = useState(-1);           // −1 = none
    const [centers, setCenters] = useState<number[]>([]);
  
    // refs for measurement
    const cardRefs = useRef<HTMLDivElement[]>([]) as MutableRefObject<
      HTMLDivElement[]
    >;
    const graphicRef = useRef<HTMLDivElement>(null);
  
    // ── measure card centres ────────────────────────────────────────────
    const measure = () => {
      if (!graphicRef.current) return;
      const originY = graphicRef.current.getBoundingClientRect().top;
      const ys = cardRefs.current.map(el =>
        el
          ? el.getBoundingClientRect().top + el.offsetHeight / 2 - originY
          : 0
      );
      setCenters(ys);
    };
  
    useLayoutEffect(measure, []);
    useEffect(() => {
      window.addEventListener('resize', measure);
      return () => window.removeEventListener('resize', measure);
    }, []);
  
    const hot = (i: number) => i <= active;
  
    return (
      <section id="services" className="bg-ln-dark py-section px-gutter text-white">
        <div
          className="max-w-7xl mx-auto grid gap-16
                     lg:grid-cols-[minmax(0,45%)_minmax(320px,55%)]">
  
          {/* ─────────────── GRAPHIC ─────────────── */}
          <div ref={graphicRef} className="flex items-start justify-center">
            <svg
              width="120"
              height={centers.length ? Math.max(...centers) + R.hot + 20 : 1}
              className="overflow-visible select-none">
  
              {/* drop-shadow definition (same values as hero) */}
              <defs>
                <filter id="ds" x="-50%" y="-50%" width="200%" height="200%">
                  <feDropShadow
                    dx="0"
                    dy="4"
                    stdDeviation="4"
                    floodColor="rgba(0,0,0,.20)"
                  />
                </filter>
              </defs>
  
              {/* ── wires ── */}
              {centers.slice(0, -1).map((y1, i) => {
                const y2 = centers[i + 1];
                const x1 = X[i];
                const x2 = X[i + 1];
                const dx = x2 - x1;
                const dy = y2 - y1;
                const len = Math.hypot(dx, dy);
  
                const r1 = hot(i) ? R.hot : R.base;
                const r2 = hot(i + 1) ? R.hot : R.base;
  
                // trim so the line stops right at the node rim
                const sx = x1 + (dx / len) * r1;
                const sy = y1 + (dy / len) * r1;
                const ex = x2 - (dx / len) * r2;
                const ey = y2 - (dy / len) * r2;
  
                const lit = active >= i + 1;
  
                return (
                  <line
                    key={i}
                    x1={sx}
                    y1={sy}
                    x2={ex}
                    y2={ey}
                    stroke={lit ? ACCENT : LIGHT}          // default wire = ln.light
                    strokeWidth={lit ? 6 : 2}
                    strokeLinecap="round"
                    style={{ transition: 'all .15s ease-out' }}
                    filter="url(#ds)"
                  />
                );
              })}
  
              {/* ── nodes ── */}
              {centers.map((y, i) => {
                const isHot = hot(i);
                const radius = isHot ? R.hot : R.base;
                const iconSize = radius * ICON_SCALE;
                return (
                  <g
                    key={i}
                    onMouseEnter={() => setActive(i)}
                    onMouseLeave={() => setActive(-1)}
                    style={{ cursor: 'pointer', transition: 'all .15s ease-out' }}
                    filter="url(#ds)"
                  >
                    <circle
                      cx={X[i]}
                      cy={y}
                      r={radius}
                      fill={LIGHT}
                      stroke={isHot ? ACCENT : DARK}
                      strokeWidth={isHot ? 5 : 2}
                    />
                    <image
                      href={CARDS[i].icon}
                      width={iconSize}
                      height={iconSize}
                      x={X[i] - iconSize / 2}
                      y={y - iconSize / 2}
                      preserveAspectRatio="xMidYMid meet"
                      style={{ pointerEvents: 'none' }}
                    />
                  </g>
                );
              })}
            </svg>
          </div>
  
          {/* ─────────────── CARDS ─────────────── */}
          <div className="space-y-10">
            <h2 className="text-heading-lg font-extrabold leading-tight">
              <span className="block uppercase tracking-wider text-sm mb-1 text-ln-accent">
                LogicNodes kan
              </span>
              hjælpe din virksomhed med
            </h2>
  
            <div className="flex flex-col gap-6">
              {CARDS.map((c, i) => (
                <div
                  key={i}
                  ref={el => {
                    if (el) cardRefs.current[i] = el;
                  }}
                  onMouseEnter={() => setActive(i)}
                  onMouseLeave={() => setActive(-1)}
                  className={clsx(
                    'bg-white text-ln-dark p-6 rounded-2xl space-y-2',
                    'shadow-xl transition-[transform,box-shadow] duration-150 ease-out',
                    hot(i) && 'shadow-2xl -translate-x-1'
                  )}
                >
                  <h3 className="font-bold text-heading-md text-ln-accent">{c.title}</h3>
                  <p className="text-body">{c.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }
  