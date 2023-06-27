/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: "#102335",
        primary: "#102335",
        mainOrange: "#ec6839",
        mainOrangeDarker: "#E64C14",
        white: "#fff",
      },
    },
  },
  plugins: [],
};
