import { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{js,ts,vue}'],
  theme: {
    extend: {
      fontSize: {
        '2xs': '0.6rem',
        '3xs': '0.55rem',
      },
    },
  },
  plugins: [],
} satisfies Config
