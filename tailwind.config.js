const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  theme: {
    extend: {
      colors: {
        'epl': '#12529e',
        'epl-light': '#186dd2', //blue-600
        'epl-dark': '#0b315e',
      }
    }
  },
  content: [
    './src/**/*.{html,md,11ty.js,liquid,njk,hbs,mustache,ejs,haml,pug,json,js}',
  ],
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
  ]
}