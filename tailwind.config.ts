import type { Config } from 'tailwindcss'
import plugin from 'tailwindcss/plugin'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        dark: 'rgba(17, 17, 20, 1)',
        white: 'rgba(255, 255, 255, 1)',
        'dark-orange': 'rgba(192, 192, 192, 1)',
        'dark-opacity-80': 'rgba(17, 17, 20, 0.8)',
        'white-opacity-80': 'rgba(255, 255, 255, 0.8)',
      },
      fontFamily: {
        'libre-bodoni': ['var(--font-libre-bodoni)'],
        'plus-jakarta-sans': ['var(--font-plus-jakarta-sans)'],
      },
      fontSize: {
        h1: ['100px', '118px'],
        h2: ['64px', '74px'],
        h3: ['40px', '50px'],
        h4: ['30px', '40px'],
        '24': ['24px', '34px'],
        '22': ['22px', '32px'],
        '20': ['20px', '34px'],
        '18': ['18px', '28px'],
        '16-bold': ['16px', '26px'],
        '16': ['16px', '26px'],
        '14': ['14px', '24px'],
        'mobile-h1': ['36px', '52px'],
        'mobile-h2': ['34px', '44px'],
      },
    },
  },
  plugins: [
    plugin(({ addUtilities, addComponents }) => {
      addUtilities({
        '.text-style-h1': {
          '@apply text-h1 font-bold font-libre-bodoni': {},
        },
        '.text-style-h2': {
          '@apply text-h2 font-medium font-libre-bodoni': {},
        },
        '.text-style-mobile-h1': {
          '@apply text-mobile-h1 font-bold font-libre-bodoni': {},
        },
        '.text-style-mobile-h2': {
          '@apply text-mobile-h2 font-medium font-libre-bodoni': {},
        },
        '.text-sytle-h3': {
          '@apply text-h3 font-medium font-libre-bodoni': {},
        },
        '.text-style-h4': {
          '@apply text-h4 font-medium font-libre-bodoni': {},
        },
        '.text-style-24': {
          '@apply text-22 font-medium font-libre-bodoni': {},
        },
        '.text-style-22': {
          '@apply text-24 font-medium font-libre-bodoni': {},
        },
        '.text-style-20': {
          '@apply text-20 font-normal font-plus-jakarta-sans': {},
        },
        '.text-style-18': {
          '@apply text-18 font-semibold font-plus-jakarta-sans': {},
        },
        '.text-style-16-semibold': {
          '@apply text-16 font-semibold font-plus-jakarta-sans': {},
        },
        '.text-style-16': {
          '@apply text-16 font-normal font-plus-jakarta-sans': {},
        },
        '.text-style-14': {
          '@apply text-14 font-normal font-plus-jakarta-sans': {},
        },
      })

      addComponents({
        '.button-dark-orange': {
          '@apply bg-dark-orange py-[8px] px-[20px] transition-transform duration-150 hover:scale-[1.03]': {},
        },
        '.button-dark-orange-full': {
          '@apply w-full bg-dark-orange py-[8px] px-[20px] transition-transform duration-150 hover:scale-[1.03]': {},
        },
        '.button-dark': {
          '@apply bg-dark py-[8px] px-[20px] text-white transition-transform duration-150 hover:scale-[1.03]': {},
        },
        '.button-border': {
          '@apply bg-transparent border border-dark-orange py-[8px] px-[20px] transition-transform duration-150 hover:scale-[1.03]':
            {},
        },
        '.invisible-screen-cover': {
          '@apply fixed top-0 left-0 bg-white opacity-0 w-screen h-screen z-50': {},
        },
      })
    }),
  ],
}

export default config
