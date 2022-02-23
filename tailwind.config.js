const { fontFamily } = require('tailwindcss/defaultTheme');

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', ...fontFamily.sans],
      },
      colors: {
        primary: 'var(--primary)',
        'primary-light': 'var(--primary-light)',
        'primary-hover': 'var(--primary-hover)',
      },
      outlineOffset: {
        selected: '-2px',
      },
      keyframes: {
        progress: {
          '0%': { transform: 'scaleX(1)' },
          '100%': { transform: 'scaleX(0)' },
        },
      },
      animation: {
        progress: '3000ms linear 1 forwards',
      },
      gridTemplateColumns: {
        dashboard: '1fr 3fr',
        editor: '4fr 1fr',
      },
      minHeight: {
        editor: '100px',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
  ],
};
