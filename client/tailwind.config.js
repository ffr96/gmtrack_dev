/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      animation: {
        fadeIn: "FadeIn 0.35s ease-in-out",
        fadeOut: "FadeOut 0.35s ease-in-out forwards",
        fadeInSlow: "FadeIn 1.35s ease-in-out",
        fadeOutSlow: "FadeOut 1.35s ease-in-out forwards",
        colorsPalette: "ColorsPalette 20s infinite alternate",
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
        ColorsPalette: {
          "0%": {
            background: "#CCFBF1",
          },
          "25%": {
            background: "#99F6E4",
          },
          "50%": {
            background: "#A7F3D0",
          },
          "75%": {
            background: "#5EEAD4",
          },
          "100%": {
            background: "#99F6E4",
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
