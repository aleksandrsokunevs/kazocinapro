/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'russian-violet': '#462255',
        'mauve': '#C2AFF0',
        'mint': '#62A87C',
        'light-green': '#7EE081',
        'icterine': '#FCFC62',
      },
      fontFamily: {
        sans: ['var(--font-inter)'],
        // serif var izņemt, vai atstāt noklusēto Tailwind serif:
        // serif: ['ui-serif', 'Georgia', 'Cambria', "Times New Roman", 'Times', 'serif'],
      },
    },
  },
  plugins: [],
}