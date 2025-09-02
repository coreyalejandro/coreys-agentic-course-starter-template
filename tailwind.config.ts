import type { Config } from 'tailwindcss'

export default {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#111827',
          soft: '#e5e7eb',
          accent: '#0ea5e9'
        }
      }
    }
  },
  plugins: []
} satisfies Config
