/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'russian-violet': '#462255',
        'mauve': '#C2AFF0',
        'mint': '#62A87C',
        'light-green': '#7EE081',
        'icterine': '#FCFC62',
        // Specifiskas krāsas ar caurspīdīgumu
        'card-bg': 'rgba(255, 255, 255, 0.5)',
        'input-bg': 'rgba(255, 255, 255, 0.7)',
        'card-border': 'rgba(70, 34, 85, 0.1)',
        'placeholder-color': 'rgba(70, 34, 85, 0.6)',
        'tag-bg': 'rgba(98, 168, 124, 0.2)',
        'tag-text': '#14532d',
      },
      fontFamily: {
        sans: ['var(--font-inter)'],
      },
    },
  },
  plugins: [],
}
