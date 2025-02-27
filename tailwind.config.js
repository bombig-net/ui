/** @type {import('tailwindcss').Config} */
const rawTokens = require('./tokens.json');
const { groupTokensByType } = require('./src/lib/groupTokensByType.ts');

const tokens = groupTokensByType(rawTokens);

module.exports = {
    darkMode: 'class',
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {
            colors: {
                duck: {
                    50: tokens.color['duck-50'],
                    100: tokens.color['duck-100'],
                    200: tokens.color['duck-200'],
                    300: tokens.color['duck-300'],
                    400: tokens.color['duck-400'],
                    500: tokens.color['duck-500'],
                    600: tokens.color['duck-600'],
                    700: tokens.color['duck-700'],
                    800: tokens.color['duck-800'],
                    900: tokens.color['duck-900'],
                    950: tokens.color['duck-950'],
                },
                meteor: {
                    50: tokens.color['meteor-50'],
                    100: tokens.color['meteor-100'],
                    200: tokens.color['meteor-200'],
                    300: tokens.color['meteor-300'],
                    400: tokens.color['meteor-400'],
                    500: tokens.color['meteor-500'],
                    600: tokens.color['meteor-600'],
                    700: tokens.color['meteor-700'],
                    800: tokens.color['meteor-800'],
                    900: tokens.color['meteor-900'],
                    950: tokens.color['meteor-950'],
                },
            },
            fontFamily: {
                sans: [tokens.fontFamilies['font-sans']],
                serif: [tokens.fontFamilies['font-serif']],
            },
            fontSize: {
                xs: [
                    tokens.typography['text-xs'].fontSize,
                    {
                        lineHeight: tokens.typography['text-xs'].lineHeight,
                        letterSpacing: tokens.typography['text-xs'].letterSpacing,
                    },
                ],
                sm: [
                    tokens.typography['text-sm'].fontSize,
                    {
                        lineHeight: tokens.typography['text-sm'].lineHeight,
                        letterSpacing: tokens.typography['text-sm'].letterSpacing,
                    },
                ],
                base: [
                    tokens.typography['text-base'].fontSize,
                    {
                        lineHeight: tokens.typography['text-base'].lineHeight,
                        letterSpacing: tokens.typography['text-base'].letterSpacing,
                    },
                ],
                lg: [
                    tokens.typography['text-lg'].fontSize,
                    {
                        lineHeight: tokens.typography['text-lg'].lineHeight,
                        letterSpacing: tokens.typography['text-lg'].letterSpacing,
                    },
                ],
                xl: [
                    tokens.typography['text-xl'].fontSize,
                    {
                        lineHeight: tokens.typography['text-xl'].lineHeight,
                        letterSpacing: tokens.typography['text-xl'].letterSpacing,
                    },
                ],
                '2xl': [
                    tokens.typography['text-2xl'].fontSize,
                    {
                        lineHeight: tokens.typography['text-2xl'].lineHeight,
                        letterSpacing: tokens.typography['text-2xl'].letterSpacing,
                    },
                ],
                '3xl': [
                    tokens.typography['text-3xl'].fontSize,
                    {
                        lineHeight: tokens.typography['text-3xl'].lineHeight,
                        letterSpacing: tokens.typography['text-3xl'].letterSpacing,
                    },
                ],
                '4xl': [
                    tokens.typography['text-4xl'].fontSize,
                    {
                        lineHeight: tokens.typography['text-4xl'].lineHeight,
                        letterSpacing: tokens.typography['text-4xl'].letterSpacing,
                    },
                ],
                '5xl': [
                    tokens.typography['text-5xl'].fontSize,
                    {
                        lineHeight: tokens.typography['text-5xl'].lineHeight,
                        letterSpacing: tokens.typography['text-5xl'].letterSpacing,
                    },
                ],
                '6xl': [
                    tokens.typography['text-6xl'].fontSize,
                    {
                        lineHeight: tokens.typography['text-6xl'].lineHeight,
                        letterSpacing: tokens.typography['text-6xl'].letterSpacing,
                    },
                ],
                '7xl': [
                    tokens.typography['text-7xl'].fontSize,
                    {
                        lineHeight: tokens.typography['text-7xl'].lineHeight,
                        letterSpacing: tokens.typography['text-7xl'].letterSpacing,
                    },
                ],
                '8xl': [
                    tokens.typography['text-8xl'].fontSize,
                    {
                        lineHeight: tokens.typography['text-8xl'].lineHeight,
                        letterSpacing: tokens.typography['text-8xl'].letterSpacing,
                    },
                ],
                '9xl': [
                    tokens.typography['text-9xl'].fontSize,
                    {
                        lineHeight: tokens.typography['text-9xl'].lineHeight,
                        letterSpacing: tokens.typography['text-9xl'].letterSpacing,
                    },
                ],
            },
            lineHeight: {
                3: tokens.lineHeights['leading-3'],
                4: tokens.lineHeights['leading-4'],
                5: tokens.lineHeights['leading-5'],
                6: tokens.lineHeights['leading-6'],
                7: tokens.lineHeights['leading-7'],
                8: tokens.lineHeights['leading-8'],
                9: tokens.lineHeights['leading-9'],
                10: tokens.lineHeights['leading-10'],
                none: tokens.lineHeights['leading-none'],
                tight: tokens.lineHeights['leading-tight'],
                snug: tokens.lineHeights['leading-snug'],
                normal: tokens.lineHeights['leading-normal'],
                relaxed: tokens.lineHeights['leading-relaxed'],
                loose: tokens.lineHeights['leading-loose'],
            },
            letterSpacing: {
                tightest: tokens.letterSpacing['tracking-tightest'],
                tighter: tokens.letterSpacing['tracking-tighter'],
                tight: tokens.letterSpacing['tracking-tight'],
                normal: tokens.letterSpacing['tracking-normal'],
                wide: tokens.letterSpacing['tracking-wide'],
                wider: tokens.letterSpacing['tracking-wider'],
                widest: tokens.letterSpacing['tracking-widest'],
            },
            spacing: {
                0: tokens.spacing['spacing-0'],
                px: tokens.spacing['spacing-px'],
                0.5: tokens.spacing['spacing-0.5'],
                1: tokens.spacing['spacing-1'],
                1.5: tokens.spacing['spacing-1.5'],
                2: tokens.spacing['spacing-2'],
                2.5: tokens.spacing['spacing-2.5'],
                3: tokens.spacing['spacing-3'],
                3.5: tokens.spacing['spacing-3.5'],
                4: tokens.spacing['spacing-4'],
                5: tokens.spacing['spacing-5'],
                6: tokens.spacing['spacing-6'],
                7: tokens.spacing['spacing-7'],
                8: tokens.spacing['spacing-8'],
                9: tokens.spacing['spacing-9'],
                10: tokens.spacing['spacing-10'],
                11: tokens.spacing['spacing-11'],
                12: tokens.spacing['spacing-12'],
                14: tokens.spacing['spacing-14'],
                16: tokens.spacing['spacing-16'],
                20: tokens.spacing['spacing-20'],
                24: tokens.spacing['spacing-24'],
                28: tokens.spacing['spacing-28'],
                32: tokens.spacing['spacing-32'],
                36: tokens.spacing['spacing-36'],
                40: tokens.spacing['spacing-40'],
                44: tokens.spacing['spacing-44'],
                48: tokens.spacing['spacing-48'],
                52: tokens.spacing['spacing-52'],
                56: tokens.spacing['spacing-56'],
                60: tokens.spacing['spacing-60'],
                64: tokens.spacing['spacing-64'],
                72: tokens.spacing['spacing-72'],
                80: tokens.spacing['spacing-80'],
                96: tokens.spacing['spacing-96'],
            },
            borderRadius: {
                none: tokens.borderRadius['radius-none'],
                sm: tokens.borderRadius['radius-sm'],
                DEFAULT: tokens.borderRadius['radius-base'],
                md: tokens.borderRadius['radius-md'],
                lg: tokens.borderRadius['radius-lg'],
                xl: tokens.borderRadius['radius-xl'],
                '2xl': tokens.borderRadius['radius-2xl'],
                '3xl': tokens.borderRadius['radius-3xl'],
                full: tokens.borderRadius['radius-full'],
            },
            borderWidth: {
                DEFAULT: tokens.borderWidth['border-base'],
                0: tokens.borderWidth['border-0'],
                2: tokens.borderWidth['border-2'],
                4: tokens.borderWidth['border-4'],
                8: tokens.borderWidth['border-8'],
            },
            boxShadow: {
                sm: tokens.boxShadow['shadow-sm'],
                DEFAULT: tokens.boxShadow['shadow-base'],
                md: tokens.boxShadow['shadow-md'],
                lg: tokens.boxShadow['shadow-lg'],
                xl: tokens.boxShadow['shadow-xl'],
                '2xl': tokens.boxShadow['shadow-2xl'],
                inner: tokens.boxShadow['shadow-inner'],
                none: tokens.boxShadow['shadow-none'],
            },
            fontWeights: {
                thin: tokens.fontWeights['weight-thin'],
                extralight: tokens.fontWeights['weight-extralight'],
                light: tokens.fontWeights['weight-light'],
                normal: tokens.fontWeights['weight-normal'],
                medium: tokens.fontWeights['weight-medium'],
                semibold: tokens.fontWeights['weight-semibold'],
                bold: tokens.fontWeights['weight-bold'],
                extrabold: tokens.fontWeights['weight-extrabold'],
                black: tokens.fontWeights['weight-black'],
            },
            opacity: {
                0: tokens.opacity['opacity-0'],
                5: tokens.opacity['opacity-5'],
                10: tokens.opacity['opacity-10'],
                15: tokens.opacity['opacity-15'],
                20: tokens.opacity['opacity-20'],
                25: tokens.opacity['opacity-25'],
                30: tokens.opacity['opacity-30'],
                35: tokens.opacity['opacity-35'],
                40: tokens.opacity['opacity-40'],
                45: tokens.opacity['opacity-45'],
                50: tokens.opacity['opacity-50'],
                55: tokens.opacity['opacity-55'],
                60: tokens.opacity['opacity-60'],
                65: tokens.opacity['opacity-65'],
                70: tokens.opacity['opacity-70'],
                75: tokens.opacity['opacity-75'],
                80: tokens.opacity['opacity-80'],
                85: tokens.opacity['opacity-85'],
                90: tokens.opacity['opacity-90'],
                95: tokens.opacity['opacity-95'],
                100: tokens.opacity['opacity-100'],
            },
            keyframes: {
                'accordion-down': {
                    from: { height: '0' },
                    to: { height: 'var(--radix-accordion-content-height)' },
                },
                'accordion-up': {
                    from: { height: 'var(--radix-accordion-content-height)' },
                    to: { height: '0' },
                },
                'fade-in': {
                    from: { opacity: 0 },
                    to: { opacity: 1 },
                },
                'fade-out': {
                    from: { opacity: 1 },
                    to: { opacity: 0 },
                },
                'slide-in-from-left-52': {
                    from: { transform: 'translateX(-13rem)' },
                    to: { transform: 'translateX(0)' },
                },
                'slide-in-from-right-52': {
                    from: { transform: 'translateX(13rem)' },
                    to: { transform: 'translateX(0)' },
                },
                'slide-out-to-left-52': {
                    from: { transform: 'translateX(0)' },
                    to: { transform: 'translateX(-13rem)' },
                },
                'slide-out-to-right-52': {
                    from: { transform: 'translateX(0)' },
                    to: { transform: 'translateX(13rem)' },
                },
                'zoom-in-95': {
                    '0%': { opacity: 0, transform: 'scale(0.95)' },
                    '100%': { opacity: 1, transform: 'scale(1)' },
                },
                'zoom-out-95': {
                    '0%': { opacity: 1, transform: 'scale(1)' },
                    '100%': { opacity: 0, transform: 'scale(0.95)' },
                },
            },
            animation: {
                'accordion-down': 'accordion-down 0.2s ease-out',
                'accordion-up': 'accordion-up 0.2s ease-out',
                'fade-in': 'fade-in 0.2s ease-out',
                'fade-out': 'fade-out 0.2s ease-out',
                'slide-in-from-left': 'slide-in-from-left-52 0.3s ease-out',
                'slide-in-from-right': 'slide-in-from-right-52 0.3s ease-out',
                'slide-out-to-left': 'slide-out-to-left-52 0.3s ease-out',
                'slide-out-to-right': 'slide-out-to-right-52 0.3s ease-out',
                'zoom-in': 'zoom-in-95 0.2s ease-out',
                'zoom-out': 'zoom-out-95 0.2s ease-out',
            },
        },
    },
    plugins: [],
};
