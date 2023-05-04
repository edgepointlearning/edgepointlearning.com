// https://rknight.me/using-pagefind-with-eleventy-for-search/
const { execSync } = require('child_process')

module.exports = eleventyConfig => {
  eleventyConfig.on('eleventy.after', () => {
    execSync(`npx pagefind --source _site --glob \"**/*.html\"`, { encoding: 'utf-8' })
  })
}