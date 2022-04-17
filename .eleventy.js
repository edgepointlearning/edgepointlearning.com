const metagen = require('eleventy-plugin-metagen');
const svgSprite = require("eleventy-plugin-svg-sprite");
const sitemap = require("@quasibit/eleventy-plugin-sitemap");

const Image = require("@11ty/eleventy-img");
const path = require("path");

async function pictureShortcode(src, alt, css=" ", sizes = "100vw", loading = "lazy", decoding = "async") {

  let url = path.join("./src/assets/images/", src);

  let stats = await Image(url, {
    widths: [600, 1024],
    formats: ["svg", "avif", "webp", "jpeg"],
    urlPath: "/img/opt/",
    outputDir: "./_dist/img/opt/",
  });

  let imageAttributes = {
    alt,
    class: css,
    sizes,
    loading,
    decoding,
  };

  return Image.generateHTML(stats, imageAttributes, {
    whitespaceMode: "inline",
  });
}


module.exports = function(eleventyConfig) {

  eleventyConfig.addPassthroughCopy({
    './node_modules/alpinejs/dist/cdn.js': './js/alpine.js',
  });
  eleventyConfig.addPassthroughCopy('src/js');
  eleventyConfig.addPassthroughCopy('src/static');

  eleventyConfig.addWatchTarget('./tailwind.config.js');
  eleventyConfig.addWatchTarget('./src/css/*.css');

  eleventyConfig.addLiquidShortcode("picture", pictureShortcode);

  eleventyConfig.addPlugin(metagen);
  
  eleventyConfig.addPlugin(svgSprite, {
    path: "./src/assets/sprites",
  });

  eleventyConfig.addPlugin(sitemap, {
    sitemap: {
      hostname: "https://www.edgepointlearning.com",
    },
  });

  return {
    dir: {
      input: 'src',
      output: '_dist'
    }
  }

};