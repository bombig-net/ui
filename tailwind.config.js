/** @type {import('tailwindcss').Config} */
export default {
    darkMode: 'class',
    content: [
        './src/**/*.{js,jsx,ts,tsx}',
    ],
    theme: {
        extend: {
            colors: {
                brand: 'rgb(var(--global-brand))',
                secondary: 'rgb(var(--global-secondary))',
                black: 'rgb(var(--global-black))',
                white: 'rgb(var(--global-white))',
            }
        },
    },
    plugins: [],
}
