/** @type {import('tailwindcss').Config} */
import rawTokens from './tokens.json' assert { type: 'json' };
import { groupTokensByType } from './src/lib/groupTokensByType.ts';

const tokens = groupTokensByType(rawTokens);

console.log(tokens);

export default {
    darkMode: 'class',
    content: [
        './src/**/*.{js,jsx,ts,tsx}',
    ],
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
                }
            },
            fontFamily: {
                sans: [tokens.fontFamilies['font-sans']],
                serif: [tokens.fontFamilies['font-serif']],
            },
            fontSize: {
                xs: [tokens.typography['text-xs'].fontSize, {
                    lineHeight: tokens.typography['text-xs'].lineHeight,
                    letterSpacing: tokens.typography['text-xs'].letterSpacing,
                }],
                sm: [tokens.typography['text-sm'].fontSize, {
                    lineHeight: tokens.typography['text-sm'].lineHeight,
                    letterSpacing: tokens.typography['text-sm'].letterSpacing,
                }],
                base: [tokens.typography['text-base'].fontSize, {
                    lineHeight: tokens.typography['text-base'].lineHeight,
                    letterSpacing: tokens.typography['text-base'].letterSpacing,
                }],
                lg: [tokens.typography['text-lg'].fontSize, {
                    lineHeight: tokens.typography['text-lg'].lineHeight,
                    letterSpacing: tokens.typography['text-lg'].letterSpacing,
                }],
                xl: [tokens.typography['text-xl'].fontSize, {
                    lineHeight: tokens.typography['text-xl'].lineHeight,
                    letterSpacing: tokens.typography['text-xl'].letterSpacing,
                }],
                '2xl': [tokens.typography['text-2xl'].fontSize, {
                    lineHeight: tokens.typography['text-2xl'].lineHeight,
                    letterSpacing: tokens.typography['text-2xl'].letterSpacing,
                }],
                '3xl': [tokens.typography['text-3xl'].fontSize, {
                    lineHeight: tokens.typography['text-3xl'].lineHeight,
                    letterSpacing: tokens.typography['text-3xl'].letterSpacing,
                }],
                '4xl': [tokens.typography['text-4xl'].fontSize, {
                    lineHeight: tokens.typography['text-4xl'].lineHeight,
                    letterSpacing: tokens.typography['text-4xl'].letterSpacing,
                }],
                '5xl': [tokens.typography['text-5xl'].fontSize, {
                    lineHeight: tokens.typography['text-5xl'].lineHeight,
                    letterSpacing: tokens.typography['text-5xl'].letterSpacing,
                }],
                '6xl': [tokens.typography['text-6xl'].fontSize, {
                    lineHeight: tokens.typography['text-6xl'].lineHeight,
                    letterSpacing: tokens.typography['text-6xl'].letterSpacing,
                }],
                '7xl': [tokens.typography['text-7xl'].fontSize, {
                    lineHeight: tokens.typography['text-7xl'].lineHeight,
                    letterSpacing: tokens.typography['text-7xl'].letterSpacing,
                }],
                '8xl': [tokens.typography['text-8xl'].fontSize, {
                    lineHeight: tokens.typography['text-8xl'].lineHeight,
                    letterSpacing: tokens.typography['text-8xl'].letterSpacing,
                }],
                '9xl': [tokens.typography['text-9xl'].fontSize, {
                    lineHeight: tokens.typography['text-9xl'].lineHeight,
                    letterSpacing: tokens.typography['text-9xl'].letterSpacing,
                }],
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
                tighter: tokens.letterSpacing['tracking-tighter'],
                tight: tokens.letterSpacing['tracking-tight'],
                normal: tokens.letterSpacing['tracking-normal'],
                wide: tokens.letterSpacing['tracking-wide'],
                wider: tokens.letterSpacing['tracking-wider'],
                widest: tokens.letterSpacing['tracking-widest'],
            }
        }
    },
    plugins: [],
}
