const defaultTheme = require("tailwindcss/defaultTheme")

module.exports = {
  theme: {
    extend: {
      colors: {
        "edgepoint": {
          50: "#DFECFB",
          100: "#C3DBF8",
          200: "#88B7F1",
          300: "#4C94EB",
          400: "#1971DC",
          500: "#12529E",
          600: "#0F4280",
          700: "#0B3160",
          800: "#072140",
          900: "#041020",
          950: "#02070E"
        }
      }
    }
  },
  content: [
    "./src/**/*.{html,md,11ty.js,liquid,njk,hbs,mustache,ejs,haml,pug,json,js}",
  ],
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/forms"),
  ]
}