module.exports = {
  plugins: [
    require('postcss-import'),
    require('tailwindcss/nesting'),
    require('tailwindcss'),
    require('postcss-lightningcss')({
			browsers: 'defaults',
			lightningcssOptions: {
				minify: (process.env.NODE_ENV === "production" ? true : false)
			},
		}),
  ]
}