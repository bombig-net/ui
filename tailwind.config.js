/** @type {import('tailwindcss').Config} */
// Standalone configuration with hardcoded values from processed tokens
export default {
    darkMode: 'class',
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {
            colors: {
                duck: {
                    50: '#fefde8',
                    100: '#fffcc2',
                    200: '#fff687',
                    300: '#ffe943',
                    400: '#ffd506',
                    500: '#efbe03',
                    600: '#ce9300',
                    700: '#a46804',
                    800: '#88510b',
                    900: '#734210',
                    950: '#432205',
                },
                meteor: {
                    50: '#fefaec',
                    100: '#faf1cb',
                    200: '#f6e291',
                    300: '#f1cd58',
                    400: '#edb932',
                    500: '#e69b1a',
                    600: '#da7f15',
                    700: '#a95414',
                    800: '#894217',
                    900: '#713716',
                    950: '#411b07',
                },
                aqua: {
                    50: '#E6FFFF',
                    100: '#99FFFF',
                    200: '#66FFFF',
                    300: '#4DFFFF',
                    400: '#33FFFF',
                    500: '#00FFFF',
                    600: '#00CCCC',
                    700: '#009999',
                    800: '#008080',
                    900: '#004D4D',
                    950: '#001A1A',
                },
            },
            fontFamily: {
                sans: ['Euclid Circular B'],
                serif: ['Geist Mono'],
            },
            fontSize: {
                xs: [
                    '13px',
                    {
                        lineHeight: '18px',
                        letterSpacing: '-0.025em',
                    },
                ],
                sm: [
                    '16px',
                    {
                        lineHeight: '24px',
                        letterSpacing: '-0.025em',
                    },
                ],
                base: [
                    '20px',
                    {
                        lineHeight: '28px',
                        letterSpacing: '-0.025em',
                    },
                ],
                lg: [
                    '25px',
                    {
                        lineHeight: '32px',
                        letterSpacing: '-0.05em',
                    },
                ],
                xl: [
                    '31px',
                    {
                        lineHeight: '36px',
                        letterSpacing: '-0.05em',
                    },
                ],
                '2xl': [
                    '39px',
                    {
                        lineHeight: '44px',
                        letterSpacing: '-0.05em',
                    },
                ],
                '3xl': [
                    '49px',
                    {
                        lineHeight: '56px',
                        letterSpacing: '-0.075em',
                    },
                ],
                '4xl': [
                    '61px',
                    {
                        lineHeight: '100%',
                        letterSpacing: '-0.075em',
                    },
                ],
                '5xl': [
                    '76px',
                    {
                        lineHeight: '100%',
                        letterSpacing: '-0.075em',
                    },
                ],
                '6xl': [
                    '95px',
                    {
                        lineHeight: '100%',
                        letterSpacing: '-0.075em',
                    },
                ],
                '7xl': [
                    '119px',
                    {
                        lineHeight: '100%',
                        letterSpacing: '-0.075em',
                    },
                ],
                '8xl': [
                    '149px',
                    {
                        lineHeight: '100%',
                        letterSpacing: '-0.075em',
                    },
                ],
                '9xl': [
                    '128px',
                    {
                        lineHeight: '100%',
                        letterSpacing: '0px',
                    },
                ],
            },
            lineHeight: {
                3: '0.75rem',
                4: '1rem',
                5: '1.25rem',
                6: '1.5rem',
                7: '1.75rem',
                8: '2rem',
                9: '2.25rem',
                10: '2.5rem',
                none: '100%',
                tight: '125%',
                snug: '137.5%',
                normal: '150%',
                relaxed: '162.5%',
                loose: '200%',
            },
            letterSpacing: {
                tightest: '-0.075em',
                tighter: '-0.05em',
                tight: '-0.025em',
                normal: '0em',
                wide: '0.025em',
                wider: '0.05em',
                widest: '0.1em',
            },
            spacing: {
                0: '0px',
                px: '1px',
                0.5: '2px',
                1: '4px',
                1.5: '6px',
                2: '8px',
                2.5: '10px',
                3: '12px',
                3.5: '14px',
                4: '16px',
                5: '20px',
                6: '24px',
                7: '28px',
                8: '32px',
                9: '36px',
                10: '40px',
                11: '44px',
                12: '48px',
                14: '56px',
                16: '64px',
                20: '80px',
                24: '96px',
                28: '112px',
                32: '128px',
                36: '144px',
                40: '160px',
                44: '176px',
                48: '192px',
                52: '208px',
                56: '224px',
                60: '240px',
                64: '256px',
                72: '288px',
                80: '320px',
                96: '384px',
            },
            borderRadius: {
                none: '0px',
                sm: '2px',
                DEFAULT: '4px',
                md: '6px',
                lg: '8px',
                xl: '12px',
                '2xl': '16px',
                '3xl': '24px',
                full: '9999px',
            },
            borderWidth: {
                DEFAULT: '1px',
                0: '0px',
                2: '2px',
                4: '4px',
                8: '8px',
            },
            boxShadow: {
                sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
                DEFAULT: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
                md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
                lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
                xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
                '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
                inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
                none: 'none',
            },
            fontWeight: {
                thin: '100',
                extralight: '200',
                light: '300',
                normal: '400',
                medium: '500',
                semibold: '600',
                bold: '700',
                extrabold: '800',
                black: '900',
            },
            opacity: {
                0: '0',
                5: '0.05',
                10: '0.1',
                15: '0.15',
                20: '0.2',
                25: '0.25',
                30: '0.3',
                35: '0.35',
                40: '0.4',
                45: '0.45',
                50: '0.5',
                55: '0.55',
                60: '0.6',
                65: '0.65',
                70: '0.7',
                75: '0.75',
                80: '0.8',
                85: '0.85',
                90: '0.9',
                95: '0.95',
                100: '1',
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
