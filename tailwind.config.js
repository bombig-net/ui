/** @type {import('tailwindcss').Config} */
import rawTokens from './tokens.json' assert { type: 'json' };
import { groupTokensByType } from './src/lib/groupTokensByType';
const tokens = groupTokensByType(rawTokens);

export default {
    darkMode: 'class',
    content: [
        './src/**/*.{js,jsx,ts,tsx}',
    ],
    theme: {
        extend: {
            colors: {
                brand: tokens.color.brand,
                secondary: tokens.color.secondary,
                black: tokens.color.black,
                white: tokens.color.white,
            },
            fontSize: {
                xs: [tokens.typography.xs.fontSize, {
                    lineHeight: tokens.typography.xs.lineHeight,
                    letterSpacing: tokens.typography.xs.letterSpacing,
                }],
                sm: [tokens.typography.sm.fontSize, {
                    lineHeight: tokens.typography.sm.lineHeight,
                    letterSpacing: tokens.typography.sm.letterSpacing,
                }],
                base: [tokens.typography.base.fontSize, {
                    lineHeight: tokens.typography.base.lineHeight,
                    letterSpacing: tokens.typography.base.letterSpacing,
                }],
                lg: [tokens.typography.lg.fontSize, {
                    lineHeight: tokens.typography.lg.lineHeight,
                    letterSpacing: tokens.typography.lg.letterSpacing,
                }],
                xl: [tokens.typography.xl.fontSize, {
                    lineHeight: tokens.typography.xl.lineHeight,
                    letterSpacing: tokens.typography.xl.letterSpacing,
                }],
                '2xl': [tokens.typography['2xl'].fontSize, {
                    lineHeight: tokens.typography['2xl'].lineHeight,
                    letterSpacing: tokens.typography['2xl'].letterSpacing,
                }],
                '3xl': [tokens.typography['3xl'].fontSize, {
                    lineHeight: tokens.typography['3xl'].lineHeight,
                    letterSpacing: tokens.typography['3xl'].letterSpacing,
                }],
                '4xl': [tokens.typography['4xl'].fontSize, {
                    lineHeight: tokens.typography['4xl'].lineHeight,
                    letterSpacing: tokens.typography['4xl'].letterSpacing,
                }],
                '5xl': [tokens.typography['5xl'].fontSize, {
                    lineHeight: tokens.typography['5xl'].lineHeight,
                    letterSpacing: tokens.typography['5xl'].letterSpacing,
                }],
                '6xl': [tokens.typography['6xl'].fontSize, {
                    lineHeight: tokens.typography['6xl'].lineHeight,
                    letterSpacing: tokens.typography['6xl'].letterSpacing,
                }],
                '7xl': [tokens.typography['7xl'].fontSize, {
                    lineHeight: tokens.typography['7xl'].lineHeight,
                    letterSpacing: tokens.typography['7xl'].letterSpacing,
                }],
                '8xl': [tokens.typography['8xl'].fontSize, {
                    lineHeight: tokens.typography['8xl'].lineHeight,
                    letterSpacing: tokens.typography['8xl'].letterSpacing,
                }],
                '9xl': [tokens.typography['9xl'].fontSize, {
                    lineHeight: tokens.typography['9xl'].lineHeight,
                    letterSpacing: tokens.typography['9xl'].letterSpacing,
                }],
            }
        }
    },
    plugins: [],
}
