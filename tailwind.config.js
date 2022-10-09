/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    colors: {
      "primary-100": "hsl(237, 100%, 4%)",
      "primary-200": "hsl(235, 16%, 15%)",
      "primary-300": "hsl(235, 12%, 19%)",
      "primary-400": "hsl(236, 11%, 27%)",
      "primary-450": "hsl(216, 15%, 37%)",
      "primary-500": "hsl(216, 15%, 57%)",
      "primary-600": "hsl(242, 48%, 58%)",
      "primary-700": "hsl(243, 100%, 82%)",

      "neutral-400": "hsl(239, 69%, 88%)",

      "neutral-500": "hsl(221, 69%, 94%)",
      "neutral-700": "hsl(220, 69%, 97%)",
      "neutral-900": "hsl(0, 0%, 100%)",

      "danger-500": "hsl(0, 78%, 63%)",
      "danger-600": "hsl(0, 100%, 80%)",

      "backdrop-500": "hsla(237, 20%, 4%,.5)",
    },
    screens: {
      sm: "375px",
      md: "768px",
      lg: "1440px",
    },
    extend: {},
  },
  plugins: [],
};
