import type { ImageMetadata } from 'astro';

/** ----------------------------------------------------------------
 *  Data shape the reusable <SolutionSection> expects
 * ----------------------------------------------------------------*/
export type Card = { num: number; title: string; body: string };

export type Media =
  | { type: 'image'; src: string; alt: string }  // Changed ImageMetadata to string for now
  | { type: 'video';  src: string; poster?: string }; // poster → optional thumbnail

export type Solution = {
  /** slug-style id (helps with hashes / keys) */
  id: string;
  title: string;
  body: string;
  media: Media;
  cards: Card[];
};

/** ----------------------------------------------------------------
 *  Page content – fill / extend as you add new solutions
 * ----------------------------------------------------------------*/
// Using placeholder image URLs until actual assets are available
// These will need to be replaced with real image imports when available

// Placeholder image/video paths
const virkImg = '/placeholder-virk.jpg';
const rackVid = '/placeholder-video.mp4';
const rackPoster = '/placeholder-poster.jpg';

export const SOLUTIONS: Solution[] = [
  {
    id: 'virk-agent',
    title: 'Virk-agenten',
    body:
      'Virk-agenten er en AI, der har adgang til alle oplysningerne på Virk. Den kan analysere og præsentere relevant information baseret på dine behov.',
    media: { type: 'image', src: virkImg, alt: 'Skærmbillede af Virk-agenten' },
    cards: [
      { num: 1, title: 'Information',  body: 'AI indsamler data fra virk.dk' },
      { num: 2, title: 'Indsigt',      body: 'Automatisk klassificering af virksomhedsdata' },
      { num: 3, title: 'Handling',     body: 'Skræddersyet rapport til dig' },
    ],
  },
  {
    id: 'rackbeat-agent',
    title: 'Rackbeat-agenten',
    body:
      'Rackbeat-agenten forbinder sig til jeres lager­system og holder styr på lagerbeholdning og logistik med intelligent forudsigelse af behov.',
    media: {
      type: 'video',
      src: rackVid,
      poster: rackPoster,
    },
    cards: [
      { num: 1, title: 'Information',  body: 'Overvåger lagerbeholdning' },
      { num: 2, title: 'Indsigt',      body: 'Forudser behov i god tid' },
      { num: 3, title: 'Handling',     body: 'Automatisk genbestilling' },
    ],
  },
  /* … just keep pushing objects in here to add new sections … */
]; 