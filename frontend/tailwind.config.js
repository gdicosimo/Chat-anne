/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./public/assets/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      mobile: '480px',
      tablet: '768px',
      pcsmall: '976px',
      pclarge: '1440px',
    },
    extend: {
      colors: {
        color: {
          black: "#151515",
          middleblack: "#1E1E1E",
          lightblack: "#2B2B2B",
          cream:"#FDF0D5",
          gray:"#D0D0D0",
        },
      },
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

