/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './modules/**/*.{js,ts,jsx,tsx,mdx}',
    './helpers/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      screens: {
        xxs: { max: "387px" },
        xs: { max: "492px" },
        sm: { max: "640px" },
        md: { max: "768px" },
        lg: { max: "992px" },
        xl: { max: "1280px" },
      },
    },
  },
  plugins: [],
}
