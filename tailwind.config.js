/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./dist/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        'primary-orange': '#F39C12',    // Official brand orange
        'dark-orange': '#DC7B08',        // Hover states (15% darker)
        'light-orange': '#F8C471',       // Backgrounds/accents (30% lighter)
        'primary-black': '#1a1a1a',      // Dark backgrounds
        'dark-grey': '#4a4a4a',          // Secondary text
        'medium-grey': '#808080',        // Tertiary text
        'light-grey': '#f5f5f5',         // Section backgrounds
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
