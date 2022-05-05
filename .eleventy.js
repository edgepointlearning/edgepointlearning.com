const emojiReadTime = require("@11tyrocks/eleventy-plugin-emoji-readtime");
const faviconsPlugin = require("eleventy-plugin-gen-favicons");
const metagen = require('eleventy-plugin-metagen');
const sitemap = require("@quasibit/eleventy-plugin-sitemap");
const svgSprite = require("eleventy-plugin-svg-sprite");
const Image = require("@11ty/eleventy-img");
const path = require("path");

// async function pictureShortcode(src, alt, css=" ", sizes = "100vw", loading = "lazy", decoding = "async") {

//   let url = path.join("./src/assets/images/", src);

//   let stats = await Image(url, {
//     widths: [600, 1024],
//     formats: ["svg", "avif", "webp", "jpeg"],
//     urlPath: "/img/opt/",
//     outputDir: "./_dist/img/opt/",
//   });

//   let imageAttributes = {
//     alt,
//     class: css,
//     sizes,
//     loading,
//     decoding,
//   };

//   return Image.generateHTML(stats, imageAttributes, {
//     whitespaceMode: "inline",
//   });
// }

function pictureShortcode(src, alt, css, sizes = "100vw", loading = "lazy", decoding = "async") {

  let url = `./src/assets/images/${src}`;

  let options = {
    widths: [320, 660, 1280],
    formats: ["svg", "avif", "webp", "jpeg"],
    urlPath: "/img/opt/",
    outputDir: "./_dist/img/opt/",
  };

  Image(url, options);

  let imageAttributes = {
    alt,
    class: css,
    sizes,
    loading,
    decoding,
  };
  
  let metadata = Image.statsSync(url, options);

  return Image.generateHTML(metadata, imageAttributes, {
    whitespaceMode: "inline",
  });
}


module.exports = function(eleventyConfig) {
  // passthrough static files
  eleventyConfig.addPassthroughCopy({'./node_modules/alpinejs/dist/cdn.js' : './js/alpine.js'});
  eleventyConfig.addPassthroughCopy({'./node_modules/sharer.js/sharer.min.js' : './js/sharer.min.js'});
  eleventyConfig.addPassthroughCopy({'./node_modules/clipboard/dist/clipboard.min.js' : './js/clipboard.min.js'});
  
  
  eleventyConfig.addPassthroughCopy({'src/assets/js' : '/js/'});
  eleventyConfig.addPassthroughCopy({'src/assets/static' : '/static/'});
  // watch for tailwind changes
  eleventyConfig.addWatchTarget('./tailwind.config.js');
  eleventyConfig.addWatchTarget('./src/assets/css/*.css');
  // add eleventy-img shortcode
  eleventyConfig.addNunjucksShortcode("picture", pictureShortcode);

  // add plugins
  eleventyConfig.addPlugin(faviconsPlugin, {
    'outputDir': './_dist',
    'manifestData': {'name': 'EdgePoint Learning'},
    'generateManifest': true
  });

  eleventyConfig.addPlugin(emojiReadTime);

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
    },
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: 'njk',
  };

};