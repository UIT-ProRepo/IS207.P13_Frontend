import type { Config } from 'tailwindcss'
import plugin from 'tailwindcss/plugin'
import { addIconSelectors } from '@iconify/tailwind'

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
        /* Text */
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
        '.text-style-h3': {
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
        '.text-style-error': {
          '@apply text-14 font-normal font-plus-jakarta-sans text-red-500': {},
        },
        /* Others */
        '.fixed-center': {
          '@apply fixed left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2': {},
        },
        '.no-scrollbar': {
          '-ms-overflow-style': 'none',
          'scrollbar-width': 'none',
        },
        '.no-scrollbar::-webkit-scrollbar': {
          display: 'none',
        },
      })
      addComponents({
        /* Button */
        '.button-dark-orange': {
          '@apply w-fit bg-dark-orange py-2 px-8 transition-transform duration-150 enabled:hover:scale-[1.03]': {},
        },
        '.button-dark-orange-full': {
          '@apply w-full bg-dark-orange py-2 px-8 transition-transform duration-150 enabled:hover:scale-[1.03]': {},
        },
        '.button-dark': {
          '@apply w-fit bg-dark py-2 px-8 text-white transition-transform duration-150 enabled:hover:scale-[1.03]': {},
        },
        '.button-border': {
          '@apply bg-transparent border border-dark-orange py-2 px-8 transition-transform duration-150 enabled:hover:scale-[1.03]':
            {},
        },
        '.button-border-bottom': {
          '@apply border-0 border-b border-dark text-style-16': {},
        },
        /* Input */
        '.input-border-bottom': {
          '@apply border-0 border-b border-b-dark-orange bg-transparent py-3 focus:border-b-dark text-style-16': {},
        },
        '.input-border-white': {
          '@apply border border-white bg-transparent rounded px-4 py-3 text-style-16': {},
        },
        '.input-border-white-full': {
          '@apply w-full border border-white bg-transparent rounded px-4 py-3 text-style-16': {},
        },
        '.input-normal': {
          '@apply border border-dark-orange bg-white rounded-lg px-4 py-1 text-style-16': {},
          boxShadow: '1px 1px 3px 0px rgba(0, 0, 0, 0.10)',
        },
        '.input-normal-full': {
          '@apply w-full border border-dark-orange bg-white rounded-lg px-4 py-1 text-style-16': {},
          boxShadow: '1px 1px 3px 0px rgba(0, 0, 0, 0.10)',
        },
        /* Table */
        '.table': {
          '@apply w-full min-w-[32rem] border border-dark-orange [&_td]:px-4 [&_td]:py-2 [&_th]:px-4 [&_th]:py-2': {},
        },
        /* Modal */
        '.modal-EDF2F9': {
          '@apply w-full max-w-[32rem] max-h-screen overflow-y-scroll no-scrollbar rounded-2xl bg-[#EDF2F9] p-6 xl:p-8':
            {},
        },
        '.modal-white': {
          '@apply w-full max-w-[32rem] max-h-screen overflow-y-scroll no-scrollbar rounded-2xl bg-white p-6 xl:p-8 border border-dark-orange':
            {},
        },
        /* Others */
        '.page-content': {
          '@apply w-full my-24 xl:my-32': {},
        },
        '.screen-cover-invisible': {
          '@apply fixed top-0 left-0 bg-white opacity-0 w-screen h-screen z-20': {},
        },
        '.screen-cover-dark-opacity-80': {
          '@apply fixed top-0 left-0 bg-dark-opacity-80 w-screen h-screen z-20': {},
        },
      })
    }),
    addIconSelectors(['mdi-light', 'vscode-icons']),
  ],
}

export default config
