/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      dropShadow: {
        "3xl": " 0px 0px 5px #000000",
      },
      backgroundImage: {
        "bg-overlay": "linear-gradient(rgb(0, 0, 0, 0.1), rgb(0, 0, 0, 1))",
        transition: " opacity 0.3s",
      },
      box: {
        shadow: "rgba(0, 0, 0, 0.86) 0px 22px 40px 6px;",
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
