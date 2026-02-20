/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                ocean: {
                    dark: '#001e3c', // Deep navy
                    medium: '#003366', // Medium blue
                    light: '#005580', // Lighter blue
                    accent: '#00aaff', // Cyan accent
                },
                gold: {
                    DEFAULT: '#ffd700',
                    glow: '#ffcc00',
                },
                wood: {
                    DEFAULT: '#8b4513',
                    dark: '#5c3a21',
                }
            },
            fontFamily: {
                serif: ['"Cinzel"', 'serif'], // Pirate-y font
                sans: ['"Inter"', 'sans-serif'],
            },
            animation: {
                'slow-spin': 'spin 20s linear infinite',
                'float': 'float 6s ease-in-out infinite',
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-20px)' },
                }
            }
        },
    },
    plugins: [],
}
