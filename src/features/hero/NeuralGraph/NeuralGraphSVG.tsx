// Fully-responsive SVG + thin-canvas overlay (keeps old pulse logic)
import React, {
  useRef, useState, useEffect, useMemo
} from 'react';
import type { MouseEvent } from 'react';

import {
  NODES, LINKS, ICONS, GRAPH_COLORS, SIZE
} from './graph.data';
import { COLORS } from '@lib/colors';

/* ----------------------------- helpers ----------------------------- */
type Hover = string | undefined;

const SPEED   = 250;  // px / s – identical to old impl.
const JITTER  = 0.20;
const PULSES  = 2;               /* rectangles per link */

/* id → children map (outbound only) */
function buildAdjacency() {
  const m = new Map<string, string[]>();
  for (const { from, to } of LINKS) {
    if (!m.has(from)) m.set(from, []);
    m.get(from)!.push(to);
  }
  return m;
}

function computeActiveLinks(
  start: Hover,
  adj:   Map<string,string[]>
) {
  const out = new Set<string>();
  if (!start) return out;
  const q = [start];
  const seen = new Set(q);
  while (q.length) {
    const id = q.shift()!;
    for (const child of adj.get(id) ?? []) {
      out.add(`${id}->${child}`);
      if (!seen.has(child)) { seen.add(child); q.push(child); }
    }
  }
  return out;
}

/* ---------------------------- component ---------------------------- */
export default function NeuralGraphSVG({
}: {}) {
  const ref     = useRef<HTMLDivElement>(null);
  const cvsRef  = useRef<HTMLCanvasElement>(null);

  const [size, setSize] = useState({ w: 700, h: 350 });
  const [hover, setHover] = useState<Hover>(undefined);
  const [tooltip, setTooltip] = useState<null | {
    node: typeof NODES[number];
    x: number; y: number; tx: string; ty: string;
  }>(null);

  /* Re-measure whenever the wrapper changes ----------------------- */
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    function measure() {
      if (!el) return;
      const w = el.clientWidth;
      /* keep original aspect ratio (1000 : 700 = 1 : 0.7) */
      setSize({ w, h: w * 0.7 });
    }
    measure();                              // initial
    const ro = new ResizeObserver(measure); // and on resize
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  /* node positions in **pixels** for the current box ---------------- */
  const nodesPx = useMemo(() => NODES.map(n => ({
    ...n, px: n.u * size.w, py: n.v * size.h,
  })), [size]);

  const posMap = useMemo(() =>
    new Map(nodesPx.map(n => [n.id, { x: n.px, y: n.py }])),
  [nodesPx]);

  const adjacency = useMemo(buildAdjacency, []);
  const active    = useMemo(
    () => computeActiveLinks(hover, adjacency),
  [hover, adjacency]);

  /* ----------------------------------------------------------------- *
   * pulse scheduling (copied 1-to-1 from the old ForceGraph code)     *
   * ----------------------------------------------------------------- */
  const timings = useMemo(() => {
    if (!hover) return new Map<string, {start:number; dur:number}>();
    const t = new Map<string,{start:number;dur:number}>();
    const arrive = new Map<string,number>().set(hover,0);
    const q = [hover];
    while (q.length) {
      const id = q.shift()!;
      const t0 = arrive.get(id)!;
      for (const child of adjacency.get(id) ?? []) {
        const linkId = `${id}->${child}`;
        if (t.has(linkId)) continue;
        const a = posMap.get(id)!;
        const b = posMap.get(child)!;
        const dist = Math.hypot(b.x-a.x, b.y-a.y);
        const dur  = dist / SPEED;
        t.set(linkId, { start: t0, dur });
        const eta = t0 + dur + Math.random()*JITTER;
        if (!arrive.has(child)) { arrive.set(child, eta); q.push(child); }
      }
    }
    return t;
  }, [hover, adjacency, posMap]);

  /* ----------------------------------------------------------------- *
   *  Canvas layer: travelling rectangles (pulse)                      *
   * ----------------------------------------------------------------- */
  useEffect(() => {
    const canvas = cvsRef.current; if (!canvas) return;
    canvas.width  = size.w;
    canvas.height = size.h;
    const ctx = canvas.getContext('2d')!;

    let raf = 0, t0 = performance.now();
    const animate = (now:number) => {
      const dt = (now-t0)/1000;   // seconds
      ctx.clearRect(0,0,canvas.width,canvas.height);

      timings.forEach(({start,dur}, id) => {
        if (dt < start) return;
        const [from,to] = id.split('->');
        const A = posMap.get(from)!; const B = posMap.get(to)!;
        const dx = B.x-A.x, dy = B.y-A.y;
        const angle = Math.atan2(dy,dx);
        const len   = Math.hypot(dx,dy);

        const prog = ((dt-start)/dur) % 1; // 0..1
        for (let i=0;i<PULSES;i++){
          const p = (prog + i/PULSES) % 1;
          /* no extra offsets – canvas sits under the nodes */
          const x = A.x + dx*p;
          const y = A.y + dy*p;
          ctx.save();
          ctx.translate(x,y); ctx.rotate(angle);
          ctx.fillStyle = GRAPH_COLORS.accent;
          ctx.globalAlpha = 0.8;
          ctx.fillRect(-15,-2,30,4);
          ctx.restore();
        }
      });

      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [size, timings, posMap]);

  /* preload images once --------------------------------------------- */
  const iconImg = useMemo(() => {
    const m:Record<string,HTMLImageElement> = {};
    Object.entries(ICONS).forEach(([k,url]) => {
      const i = new Image(); i.src = url; m[k]=i;
    });
    return m;
  }, []);

  /* ------------------------------------------------------------ *
   *  helpers for tool-tip positioning                            *
   * ------------------------------------------------------------ */
  const showTooltip = (node: typeof nodesPx[number], e: MouseEvent) => {
    if (!node.info) return;
    const box = ref.current!.getBoundingClientRect();
    const PAD = 16, W = 260, H = 90;
    const x = node.px, y = node.py - 40;         // always above node centre
    let tx = '-50%', ty = '-110%';
    
    // Only adjust horizontal positioning, keep it above the node
    if (x < PAD + W/2)               tx = '0';
    if (x > size.w - PAD - W/2)      tx = '-100%';
    
    // Special case for rightmost nodes (u=1) - position above and to the left
    if (node.u >= 0.75) {             // Using 0.95 to catch nodes with u=1
      tx = '-75%';                   // Move tooltip more to the left
    }
    
    setTooltip({ node, x, y, tx, ty });
  };
  const hideTooltip = () => setTooltip(null);

  return (
    <div ref={ref} className="relative w-full h-full select-none">
      {/* ---------- layer 0 : edges ---------- */}
      <svg
        viewBox={`0 0 ${size.w} ${size.h}`}
        width="100%" height="100%"
        className="absolute inset-0 z-0 pointer-events-none"
        overflow="visible"
      >
        {LINKS.map(l => {
          const a = posMap.get(l.from)!;
          const b = posMap.get(l.to)!;
          return (
            <line
              key={`${l.from}-${l.to}`}
              x1={a.x} y1={a.y} x2={b.x} y2={b.y}
              stroke={GRAPH_COLORS.line}
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          );
        })}
      </svg>

      {/* ---------- layer 1 : canvas pulses ---------- */}
      <canvas
        ref={cvsRef}
        className="absolute inset-0 pointer-events-none z-10"
      />

      {/* ---------- layer 2 : nodes ---------- */}
      <svg
        viewBox={`0 0 ${size.w} ${size.h}`}
        width="100%" height="100%"
        className="absolute inset-0 z-20"
        overflow="visible"
      >
        {nodesPx.map(n => {
          const r = hover===n.id ? SIZE.rHover : SIZE.r;
          return (
            <g
              key={n.id}
              transform={`translate(${n.px} ${n.py})`}
              onMouseEnter={(e)=>{ setHover(n.id); showTooltip(n,e); }}
              onMouseLeave={()=>{ setHover(undefined); hideTooltip(); }}
              style={{cursor:'pointer'}}
            >
              <circle
                r={r}
                fill={GRAPH_COLORS.node}
                stroke={hover===n.id ? GRAPH_COLORS.accent : 'none'}
                strokeWidth={SIZE.stroke}
                filter="url(#ds)"
              />
              {n.icon && (
                <image
                  href={ICONS[n.icon]}
                  width={r*1.3} height={r*1.3}
                  x={-r*0.65} y={-r*0.65}
                  style={{pointerEvents:'none'}}
                />
              )}
            </g>
          );
        })}

        {/* drop-shadow filter (same as before) */}
        <defs>
          <filter id="ds" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="0" dy="4" stdDeviation="4"
                          floodColor="rgba(0,0,0,0.2)" />
          </filter>
        </defs>
      </svg>

      {/* tool-tip sits on top of everything */}
      {tooltip && (
        <div
          className="absolute pointer-events-none bg-white rounded-md
                     shadow-md px-4 py-2 max-w-xs w-max
                     text-ln-dark z-30"
          style={{
            left: tooltip.x, top: tooltip.y,
            transform: `translate(${tooltip.tx}, ${tooltip.ty})`
          }}
        >
          <h3 className="text-heading-md mb-1">{tooltip.node.info!.title}</h3>
          <p className="text-sm leading-snug">{tooltip.node.info!.text}</p>
        </div>
      )}
    </div>
  );
} 