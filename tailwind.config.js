/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'cafe-mint': '#DDFBF2',
                'cafe-sidebar': '#CBF5EA',
                'cafe-text': '#1F2937',
                'pastel-yellow': '#FDF6E3',
                'pastel-green': '#E8F5E9',
                'cafe-rose': '#D63B7D', // similar to the blrbloom pink magenta tone
                'cafe-sand': '#FDFBF7', // warm off-white background
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                serif: ['"Playfair Display"', 'serif'],
            },
        },
    },
    plugins: [],
}
