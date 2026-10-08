/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: '#4B35E8',
        'brand-dark': '#3524C8',
        'brand-light': '#EEF0FF',
        'brand-mid': '#8B7FF5',
        lime: '#C5FF00',
        'lime-dark': '#A8E000',
        'lime-bg': '#F4FFD6',
        ink: '#12112A',
        'ink-2': '#3D3B5C',
        'ink-3': '#7A788F',
        'ink-4': '#B8B6CC',
        'surface': '#F6F5FF',
        'surface-2': '#EDEEFF',
        'surface-border': '#DDD9FF',
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        'card': '0 1px 12px 0 rgba(75,53,232,0.07), 0 1px 3px 0 rgba(0,0,0,0.04)',
        'card-hover': '0 8px 30px 0 rgba(75,53,232,0.14)',
        'brand': '0 4px 20px 0 rgba(75,53,232,0.35)',
        'lime': '0 4px 20px 0 rgba(197,255,0,0.45)',
      },
    },
  },
  plugins: [],
}
