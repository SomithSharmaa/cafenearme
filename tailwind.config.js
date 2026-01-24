/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'cafe-mint': '#DDFBF2', // More vibrant/lighter mint
                'cafe-sidebar': '#CBF5EA', // Sidebar specific mint
                'cafe-text': '#1F2937',
                'pastel-yellow': '#FDF6E3',
                'pastel-green': '#E8F5E9',
            },
        },
    },
    plugins: [],
}
