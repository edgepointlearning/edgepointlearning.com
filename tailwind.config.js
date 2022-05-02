const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  theme: {
    screens: {
      xs: "400px",
      sm: "640px",
      md: "768px",
      mg: "850px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    extend: {
      fontFamily: {
        // 'sans': ['Noto Sans', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        epl: "#12529e",
        "epl-light": "#186dd2", //blue-600
        "epl-dark": "#0b315e",
      },
    },
  },
  variants: {
    extend: {
      display: ["group-hover"],
    },
  },
  content: [
    // './src/_includes/**/*.{html,md,11ty.js,liquid,njk,hbs,mustache,ejs,haml,pug}',
    // './src/collections/**/*.{html,md,11ty.js,liquid,njk,hbs,mustache,ejs,haml,pug}',
    "./src/**/*.{html,md,11ty.js,liquid,njk,hbs,mustache,ejs,haml,pug}",
  ],
  plugins: [require("@tailwindcss/typography"), require("@tailwindcss/forms")],
};
// https://www.tailwindshades.com/#color=212.57142857142856%2C79.54545454545455%2C34.509803921568626&step-up=8&step-down=11&hue-shift=0&name=tory-blue&overrides=e30%3D
// 'tory-blue': {
//   DEFAULT: '#12529E',
//   '50': '#78AFF0',
//   '100': '#66A4EE',
//   '200': '#418EE9',
//   '300': '#1C78E5',
//   '400': '#1665C3',
//   '500': '#12529E',
//   '600': '#0C386C',
//   '700': '#071E39',
//   '800': '#010407',
//   '900': '#000000'
// },
