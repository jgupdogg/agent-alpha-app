/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}", // Ensure all your components are included
  ],
  darkMode: 'class', // Enable dark mode using a CSS class
  theme: {
    extend: {
      colors: {
        primary: '#66C3FF',        // Maya Blue
        secondary: '#53D8FB',      // Vivid Sky Blue
        tertiary: '#D4AFB9',       // Orchard Pink
        'dark-bg': '#363732',      // Black Olive
        'light-bg': '#DCE1E9',     // Alive Blue
      },
      minWidth: {
        '0': '0',
        'full': '100%',    // Ensure we can use the min-w-full utility
        'screen': '100vw', // Full width of the screen
      },
      width: {
        'screen': '100vw', // Full width of the screen
      },
      animation: {
        fadeIn: 'fadeIn 0.3s ease-out forwards',
      },
    },
  },
  plugins: [],
};
