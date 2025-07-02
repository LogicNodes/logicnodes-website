// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx}'],
  theme: {
    colors: {
      /* default Tailwind colours … */
      white:  '#ffffff',                 // new token
      ln: {                              // ↳ LogicNodes palette
        accent: '#ff931e',
        'accent-dark': '#e87800',        // darker version of accent
        light:  '#f2f9ff',
        dark:   '#3f495d',
        bg:     '#f9f9f9',               // body background color
      },
      transparent: 'transparent',        // keep Tailwind utilities working
      current:     'currentColor',
      black: '#000000',                  // needed for shadows
    },
    extend: {
      fontFamily: {
        sans: ['"Readex Pro"', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'heading-xl': ['2.5rem', { lineHeight: '1.2' }],
        'heading-lg': ['2rem', { lineHeight: '1.3' }],
        'heading-md': ['1.5rem', { lineHeight: '1.4' }],
        'heading-sm': ['1.25rem', { lineHeight: '1.4' }],
        'body-lg': ['1.125rem', { lineHeight: '1.75' }],
        body: ['1rem', { lineHeight: '1.75' }],
        sm: ['0.875rem', { lineHeight: '1.5' }],
      },
      spacing: {
        section: '5rem',
        gutter: '2rem',
      },
      opacity: {
        '20': '0.2',  // For shadow opacity
      }
    },
  },
};
