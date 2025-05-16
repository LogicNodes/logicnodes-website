// src/lib/colors.ts
// Define colors to match tailwind.config.js
// We manually sync these values with the Tailwind config
export const COLORS = {
  accent: '#ff931e',
  dark: '#3f495d',
  light: '#f2f9ff',
  bg: '#f9f9f9',
  white: '#ffffff',
};

// Add a comment explaining why we don't import directly from Tailwind
/**
 * Note: We're not importing directly from tailwind.config.js because:
 * 1. It uses CommonJS format (module.exports) which isn't directly importable in ESM
 * 2. Vite/Astro has issues with directly importing the Tailwind config
 * 
 * If colors change in Tailwind, remember to update them here manually.
 */ 