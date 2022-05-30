module.exports = {
  content: [
    "./site/layouts/**/*.html",
    "./site/content/**/*.{html,md}",
    "./site/static/js/site.js",
  ],
  darkMode: "class",
  theme: {
    extend: {},
  },
  plugins: [require("@tailwindcss/typography")],
};
