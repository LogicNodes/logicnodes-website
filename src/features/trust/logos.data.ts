// Import logo images
import type { ImageMetadata } from 'astro';
import jakonLogo from '@assets/logos/jakon-logo.png';
import rogmLogo from '@assets/logos/rogm-logo.png';
import scanvaegtLogo from '@assets/logos/scanvaegt-logo.png';
import snLogo from '@assets/logos/sn-logo.png';
import sufLogo from '@assets/logos/suf-logo.png';
import vindstoedLogo from '@assets/logos/vindstød-logo.png';
import hommelhoffLogo from '@assets/logos/hommelhoff-logo.png';

// Define logo interface
interface Logo {
  src: ImageMetadata;
  alt: string;
}

export const LOGOS: Logo[] = [
  { src: jakonLogo, alt: 'Jakon Logo' },
  { src: rogmLogo, alt: 'Raundahl & Moesby Logo' },
  { src: scanvaegtLogo, alt: 'Scanvaegt Systems Logo' },
  { src: snLogo, alt: 'Sjællandske Nyheder Logo' },
  { src: sufLogo, alt: 'SUF logo' },
  { src: vindstoedLogo, alt: 'Vindstød Logo' },
  { src: hommelhoffLogo, alt: 'Hörmelhoff Logo' }
] 