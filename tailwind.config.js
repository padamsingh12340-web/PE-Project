/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Dark theme base
        ink: {
          950: '#070a13',
          900: '#0b0f1a',
          850: '#0f1422',
          800: '#141a2b',
          750: '#1a2236',
          700: '#222c44',
          600: '#2d3a57',
          500: '#3b4d72',
        },
        // Cricket accent
        cricket: {
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          lime: '#a3e635',
        },
        // Football accent
        football: {
          400: '#22d3ee',
          500: '#06b6d4',
          600: '#0891b2',
        },
        // Esports accent
        esports: {
          400: '#c084fc',
          500: '#a855f7',
          600: '#9333ea',
          magenta: '#ec4899',
        },
        accent: {
          gold: '#fbbf24',
          orange: '#f97316',
          red: '#ef4444',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Poppins', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'pulse-slow': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'count-up': 'countUp 0.6s ease-out',
        'slide-up': 'slideUp 0.4s ease-out',
        'fade-in': 'fadeIn 0.3s ease-out',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'shimmer': 'shimmer 1.5s infinite linear',
        'bar-grow': 'barGrow 0.8s ease-out',
      },
      keyframes: {
        countUp: {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        glow: {
          '0%': { boxShadow: '0 0 4px rgba(34,197,94,0.3)' },
          '100%': { boxShadow: '0 0 16px rgba(34,197,94,0.6)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        barGrow: {
          '0%': { width: '0%' },
          '100%': { width: 'var(--bar-width)' },
        },
      },
    },
  },
  plugins: [],
};
