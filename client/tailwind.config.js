/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      animation: {
        fadeIn: "FadeIn 0.35s ease-in-out",
        fadeOut: "FadeOut 0.35s ease-in-out forwards",
      },
      keyframes: {
        FadeIn: {
          "0%": {
            opacity: 0,
          },
          "100%": { opacity: 100 },
        },
        FadeOut: {
          "0%": { opacity: 100 },
          "100%": {
            opacity: 0,
          },
        },
      },
    },
    fontFamily: {
      raleway: "Raleway",
      workSans: "Work Sans",
    },
  },
  plugins: [],
};
