/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        void: '#0A0A14',
        plasma: '#7B61FF',
        'plasma-light': '#A594FF',
        'plasma-dark': '#5B41DF',
        ghost: '#F0EFF4',
        graphite: '#18181B',
        'void-2': '#12121F',
        'void-3': '#1A1A2E',
        'void-4': '#0F0F1A',
        muted: '#6B6B8A',
        'muted-light': '#9898B8',
      },
      fontFamily: {
        sora: ['Sora', 'sans-serif'],
        instrument: ['"Instrument Serif"', 'serif'],
        fira: ['"Fira Code"', 'monospace'],
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
        '5xl': '3rem',
      },
      backdropBlur: {
        xs: '2px',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 8s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'scan': 'scan 3s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px #7B61FF, 0 0 10px #7B61FF' },
          '100%': { boxShadow: '0 0 20px #7B61FF, 0 0 40px #7B61FF, 0 0 60px #7B61FF' },
        },
        scan: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100vw)' },
        },
      },
      backgroundImage: {
        'plasma-gradient': 'linear-gradient(135deg, #7B61FF 0%, #A594FF 50%, #5B41DF 100%)',
        'void-gradient': 'linear-gradient(180deg, #0A0A14 0%, #12121F 100%)',
      },
    },
  },
  plugins: [],
}
