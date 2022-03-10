module.exports = {
  theme: {
    screens: {
      'sm': '640px',
      'md': '768px',
      'mg': '930px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    extend: {
      colors: {
        primary: '#12529e',
      }
    }
  },
  variants: {
    extend: {
      display: ['group-hover'],
    },
  },
  content: [
    "./src/_includes/**/*.{html,md,11ty.js,liquid,njk,hbs,mustache,ejs,haml,pug}",
    "./src/index.{html,md,11ty.js,liquid,njk,hbs,mustache,ejs,haml,pug}",
    // "./src/blog/**/*.{html,md,11ty.js,liquid,njk,hbs,mustache,ejs,haml,pug}",
    // "./src/pages/**/*.{html,md,11ty.js,liquid,njk,hbs,mustache,ejs,haml,pug}",
  ],
  plugins: [
    require('@tailwindcss/typography'),
  ]
}