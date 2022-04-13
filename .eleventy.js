const metagen = require('eleventy-plugin-metagen');
const svgSprite = require("eleventy-plugin-svg-sprite");
const sitemap = require("@quasibit/eleventy-plugin-sitemap");

const Image = require("@11ty/eleventy-img");
const path = require("path");

async function pictureShortcode(src, alt, cls, sizes = "100vw", load = "lazy", decode = "async") {

  let imgSrc = path.join("./src/assets/images/", src);

  let metadata = await Image(imgSrc, {
    widths: [600, 1024],
    formats: ["svg", "avif", "webp", "jpeg"],
    urlPath: "/img/opt/",
    outputDir: "./_dist/img/opt/",
    filenameFormat: function (id, src, width, format, options) {
      const extension = path.extname(src);
      const name = path.basename(src, extension);
      return `${name}-${id}-${width}.${format}`;
    },
  });

  let imageAttributes = {
    alt,
    class: cls,
    sizes,
    loading: load,
    decoding: decode
  };

  return Image.generateHTML(metadata, imageAttributes, {
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

  eleventyConfig.addShortcode("picture", pictureShortcode);

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