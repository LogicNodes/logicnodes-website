/* ------------------------------------------------------------------
 *  Horizontal “AI across all sectors” graph – data + icon imports
 * -----------------------------------------------------------------*/
import robotIcon        from '@assets/icons/graph/robot.svg?url';
import microscopeIcon     from '@assets/icons/graph/microscope.svg?url';
import maritimeIcon      from '@assets/icons/graph/anchor.svg?url';
import programmingIcon    from '@assets/icons/graph/programming.svg?url';

import healthcareIcon     from '@assets/icons/graph/stethoscope.svg?url';
import retailIcon         from '@assets/icons/graph/shopping-cart.svg?url';
import logisticsIcon      from '@assets/icons/graph/truck.svg?url';
import lawIcon            from '@assets/icons/graph/scale.svg?url';
import financeIcon        from '@assets/icons/graph/banknote.svg?url';
import energyIcon         from '@assets/icons/graph/zap.svg?url';
import agricultureIcon    from '@assets/icons/graph/corn.svg?url';
import educationIcon      from '@assets/icons/graph/graduation.svg?url';
import manufacturingIcon  from '@assets/icons/graph/factory.svg?url';
import mediaIcon          from '@assets/icons/graph/newspaper.svg?url';
import hrIcon             from '@assets/icons/graph/computer.svg?url';
import realEstateIcon     from '@assets/icons/graph/government.svg?url';
import governmentIcon     from '@assets/icons/graph/shield.svg?url';
import constructionIcon   from '@assets/icons/graph/drill.svg?url';

import { COLORS } from '@lib/colors';

/* ---------- types ---------- */
export type GraphNode = {
  id: string;
  x: number;
  y: number;
  icon: keyof typeof ICONS;
};

export type GraphLink = { from: string; to: string };

/* ---------- palette & size ---------- */
export const GRAPH_COLORS = {
  node: COLORS.dark,
  line: COLORS.dark,
  accent: COLORS.accent,
};

export const SIZE = { r: 20 };

/* ---------- icon map ---------- */
export const ICONS = {
  robot:          robotIcon,
  science:        microscopeIcon,
  maritime:       maritimeIcon,
  programming:    programmingIcon,
  healthcare:     healthcareIcon,
  retail:         retailIcon,
  logistics:      logisticsIcon,
  law:            lawIcon,
  finance:        financeIcon,
  energy:         energyIcon,
  agriculture:    agricultureIcon,
  education:      educationIcon,
  manufacturing:  manufacturingIcon,
  media:          mediaIcon,
  hr:             hrIcon,
  real_estate:    realEstateIcon,
  government:     governmentIcon,
  construction:   constructionIcon,
} as const;

/* ---------- node coordinates ---------- */
/* Column x-positions (150 px apart) */
const X = [-50, 50, 150, 300, 400, 500];
const Y2 = [100, 200];
const Y3 = [50, 150, 250];
const Y4 = [0, 100, 200, 300];

/* 2-3-4-4-3-2 layout (18 sectors) */
export const SECTOR_NODES: GraphNode[] = [
  // column -1 (2)
  { id: '-1-0', x: X[0], y: Y2[0], icon: 'robot' },
  { id: '-1-1', x: X[0], y: Y2[1], icon: 'science' },

  // column 0 (3)
  { id: '0-0', x: X[1], y: Y3[0], icon: 'healthcare' },
  { id: '0-1', x: X[1], y: Y3[1], icon: 'retail' },
  { id: '0-2', x: X[1], y: Y3[2], icon: 'logistics' },

  // column 1 (4)
  { id: '1-0', x: X[2], y: Y4[0], icon: 'law' },
  { id: '1-1', x: X[2], y: Y4[1], icon: 'finance' },
  { id: '1-2', x: X[2], y: Y4[2], icon: 'energy' },
  { id: '1-3', x: X[2], y: Y4[3], icon: 'agriculture' },

  // column 2 (4)
  { id: '2-0', x: X[3], y: Y4[0], icon: 'education' },
  { id: '2-1', x: X[3], y: Y4[1], icon: 'manufacturing' },
  { id: '2-2', x: X[3], y: Y4[2], icon: 'media' },
  { id: '2-3', x: X[3], y: Y4[3], icon: 'hr' },

  // column 3 (3)
  { id: '3-0', x: X[4], y: Y3[0], icon: 'real_estate' },
  { id: '3-1', x: X[4], y: Y3[1], icon: 'government' },
  { id: '3-2', x: X[4], y: Y3[2], icon: 'construction' },

  // column 4 (2)
  { id: '4-0', x: X[5], y: Y2[0], icon: 'maritime' },
  { id: '4-1', x: X[5], y: Y2[1], icon: 'programming' },
];

/* ---------- links (fully-connected between neighbouring columns) ---------- */
export const SECTOR_LINKS: GraphLink[] = [
  /* -1 → 0 (6 links) */
  { from: '-1-0', to: '0-0' }, { from: '-1-0', to: '0-1' },
  { from: '-1-1', to: '0-1' }, { from: '-1-1', to: '0-2' },

  /* 0 → 1 (6 links) */
  { from: '0-0', to: '1-0' }, { from: '0-0', to: '1-1' },
  { from: '0-1', to: '1-1' }, { from: '0-1', to: '1-2' },
  { from: '0-2', to: '1-2' }, { from: '0-2', to: '1-3' },

  /* 1 → 2 (10 links) */
  { from: '1-0', to: '2-0' }, { from: '1-0', to: '2-1' },
  { from: '1-1', to: '2-0' }, { from: '1-1', to: '2-1' }, { from: '1-1', to: '2-2' },
  { from: '1-2', to: '2-1' }, { from: '1-2', to: '2-2' }, { from: '1-2', to: '2-3' },
  { from: '1-3', to: '2-2' }, { from: '1-3', to: '2-3' },

  /* 2 → 3 (6 links) */
  { from: '2-0', to: '3-0' },
  { from: '2-1', to: '3-0' }, { from: '2-1', to: '3-1' },
  { from: '2-2', to: '3-1' }, { from: '2-2', to: '3-2' },
  { from: '2-3', to: '3-2' },

  /* 3 → 4 (6 links) */
  { from: '3-0', to: '4-0' },
  { from: '3-1', to: '4-0' }, { from: '3-1', to: '4-1' },
  { from: '3-2', to: '4-1' },
];
