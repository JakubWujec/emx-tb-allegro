/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        mainOrange: "#ec6839",
        mainOrangeDarker: "#E64C14",
        white: "#fff",
      },
    },
  },
  plugins: [],
};
