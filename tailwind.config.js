/** @type {import('tailwindcss').Config} */
export default {
    darkMode: 'class',
    content: [
        './src/**/*.{js,jsx,ts,tsx}',
    ],
    theme: {
        extend: {
            colors: {
                // We'll define our color palette here later
                // For now using slate colors for dark mode
            },
        },
    },
    plugins: [],
}
