const colors = require('tailwindcss/colors')

const config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    colors: {
      ...colors,
      primary: '#190631',
      primaryLight: '#4F2189',
      secondary: '#FF7B01',
      gray: '#D9D9D9',
    },
  },
  plugins: [],
}
export default config
