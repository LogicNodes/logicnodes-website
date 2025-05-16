import React, { useState, useRef, useEffect } from 'react';
import { ACCENT, DARK, LIGHT, X, R, ICON_SCALE, CARDS } from './cards.data';

const SHADOW_OPACITY = 0.2;

export default function ServicesGraphic() {
  const [centers, setCenters] = useState<number[]>([]);
  const [active, setActive] = useState(-1); // -1 = none
  const graphicRef = useRef<HTMLDivElement>(null);

  const measure = () => {
    if (!graphicRef.current) return;
    const cards = Array.from(
      document.querySelectorAll<HTMLElement>('.service-card')
    );
    if (!cards.length) {
      console.log('No service cards found');
      return;
    }
    
    const originY = graphicRef.current.getBoundingClientRect().top;
    const ys = cards.map(
      el => el.getBoundingClientRect().top + el.offsetHeight / 2 - originY
    );
    setCenters(ys);
  };

  useEffect(() => {
    // Add a small delay to ensure cards are rendered
    const timer = setTimeout(() => {
      measure();
    }, 100);
    
    window.addEventListener('resize', measure);
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', measure);
    };
  }, []);

  // Add card hover effect handlers
  useEffect(() => {
    const cards = Array.from(
      document.querySelectorAll<HTMLElement>('.service-card')
    );
    
    const handleMouseEnter = (index: number) => () => {
      setActive(index);
      // Add active class to current and previous cards
      cards.forEach((card, i) => {
        if (i <= index) {
          card.classList.add('active');
        } else {
          card.classList.remove('active');
        }
      });
    };
    
    const handleMouseLeave = () => {
      setActive(-1);
      // Remove active class from all cards
      cards.forEach((card) => {
        card.classList.remove('active');
      });
    };
    
    cards.forEach((card, index) => {
      card.addEventListener('mouseenter', handleMouseEnter(index));
      card.addEventListener('mouseleave', handleMouseLeave);
    });
    
    return () => {
      cards.forEach((card, index) => {
        card.removeEventListener('mouseenter', handleMouseEnter(index));
        card.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, [centers.length]); // Reattach when centers change

  // Helper function to determine if a node is 'hot' (active)
  const hot = (i: number) => i <= active;

  // If no centers are measured, show fallback
  if (!centers.length) {
    return (
      <div ref={graphicRef} className="flex items-start justify-center h-full">
        <div className="mt-10 text-ln-accent">Loading graphic...</div>
      </div>
    );
  }

  return (
    <div ref={graphicRef} className="flex items-start justify-center">
      <svg
        width="120"
        height={Math.max(...centers) + R.hot + 20}
        className="overflow-visible select-none"
      >
        <defs>
          <filter id="ds" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow
              dx="0"
              dy="4"
              stdDeviation="4"
              floodColor={`rgba(0,0,0,${SHADOW_OPACITY})`}
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
              stroke={lit ? ACCENT : LIGHT}
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
  );
} 