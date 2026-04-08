/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'green-dark':    '#0B3D2E',
        'green-mid':     '#1A5C3A',
        'green-light':   '#6FAF73',
        'yellow-accent': '#F4B942',
        'yellow-dark':   '#D4942A',
      },
      keyframes: {
        'solar-ray': {
          '0%, 100%': { transform: 'scale(1)', opacity: '0.6' },
          '50%':      { transform: 'scale(1.15)', opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-20px)' },
        },
        rotateSun: {
          from: { transform: 'rotate(0deg)' },
          to:   { transform: 'rotate(360deg)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(244,185,66,0.3)' },
          '50%':      { boxShadow: '0 0 60px rgba(244,185,66,0.8)' },
        },
      },
      animation: {
        'solar-ray': 'solar-ray 3s ease-in-out infinite',
        float:       'float 6s ease-in-out infinite',
        rotateSun:   'rotateSun 20s linear infinite',
        pulseGlow:   'pulseGlow 2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
