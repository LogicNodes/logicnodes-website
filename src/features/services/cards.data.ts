// Import icons using the new path structure
import infoIcon      from '@assets/icons/graph/info.svg?url';
import insightIcon   from '@assets/icons/graph/insight.svg?url';
import implementIcon from '@assets/icons/graph/implement.svg?url';
import customIcon    from '@assets/icons/graph/custom.svg?url';
import { COLORS } from '@lib/colors';

export const ACCENT = COLORS.accent;
export const DARK   = COLORS.dark;
export const LIGHT  = COLORS.light;

export const CARDS = [
  {
    title: 'Indsigt',
    body:
      'Få en klar forståelse af, hvad AI er, og hvordan konkrete værktøjer allerede i dag kan forbedre effektiviteten i jeres virksomhed.',
    icon: infoIcon,
  },
  {
    title: 'Identifikation',
    body:
      'Opnå overblik over de områder i jeres forretning, hvor AI har størst potentiale til at skabe værdi og forbedre arbejdsgange.',
    icon: insightIcon,
  },
  {
    title: 'Implementering',
    body:
      'Få hjælp til at implementere AI i jeres arbejds­gange gennem et struktureret forløb med udgangspunkt i jeres hverdag.',
    icon: implementIcon,
  },
  {
    title: 'Innovation',
    body:
      'Differentiér jer med innovative AI-løsninger, der er specialdesignet til jeres virksomhed og jeres udfordringer.',
    icon: customIcon,
  },
];

// zig-zag X positions (inside a 120-px wide SVG)
export const X = [0, 120, 0, 120];

// node sizes
export const R = { base: 50, hot: 60 };
export const ICON_SCALE = 1.3; // icon ≈ 120 % of radius 