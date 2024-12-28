/** @type {import('tailwindcss').Config} */
export default {
    darkMode: 'class',
    content: [
        './src/**/*.{js,jsx,ts,tsx}',
    ],
    theme: {
        extend: {
            colors: {
                brand: 'var(--global-brand)',
                secondary: 'var(--global-secondary)',
                black: 'var(--global-black)',
                white: 'var(--global-white)',
            }
        },
    },
    plugins: [],
}
