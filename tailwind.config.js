/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/modules/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        black: '#0a0a0a',
        ink: '#050505',
        surface: '#121212',

        gold: {
          400: '#f5d76e',
          500: '#e8c547',
          600: '#c9a227',
        },

        purple: {
          400: '#a855f7',
          500: '#8b5cf6',
          600: '#7c3aed',
        },

        cream: '#f5f0e8',
        bone: '#e8e0d5',
      },

      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        bebas: ['var(--font-bebas)', 'sans-serif'],
        anton: ['var(--font-anton)', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },

      boxShadow: {
        brutal: '4px 4px 0 0 #e8c547',
        'brutal-purple': '4px 4px 0 0 #8b5cf6',
        'brutal-white': '4px 4px 0 0 #f5f0e8',
      },

      backgroundImage: {
        'stripes':
          'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(232, 197, 71, 0.03) 10px, rgba(232, 197, 71, 0.03) 20px)',
      },
    },
  },
  plugins: [],
}