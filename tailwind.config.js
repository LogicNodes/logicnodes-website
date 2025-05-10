// tailwind.config.js
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ln: {
          accent: '#ff931e',
          light: '#f2f9ff',
          dark: '#3f495d',
        },
      },
      fontFamily: {
        sans: ['"Readex Pro"', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'heading-xl': ['2.5rem', { lineHeight: '1.2' }],
        'heading-lg': ['2rem', { lineHeight: '1.3' }],
        'heading-md': ['1.5rem', { lineHeight: '1.4' }],
        body: ['1rem', { lineHeight: '1.75' }],
        sm: ['0.875rem', { lineHeight: '1.5' }],
      },
      spacing: {
        section: '5rem',
        gutter: '2rem',
      },
    },
  },
};
