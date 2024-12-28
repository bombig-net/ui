/** @type {import('tailwindcss').Config} */
import tokens from './tokens/tokens.json' assert { type: 'json' };

export default {
    darkMode: 'class',
    content: [
        './src/**/*.{js,jsx,ts,tsx}',
    ],
    theme: {
        fontSize: {
            'xs': [
                tokens.global['text-xs'].value.fontSize,
                {
                    lineHeight: tokens.global['text-xs'].value.lineHeight,
                    letterSpacing: tokens.global['text-xs'].value.letterSpacing,
                }
            ]
        },
        extend: {
            colors: {
                brand: tokens.global.brand.value,
                secondary: tokens.global.secondary.value,
                black: tokens.global.black.value,
                white: tokens.global.white.value,
            }
        }
    },
    plugins: [],
}
