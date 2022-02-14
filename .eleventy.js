const Image = require("@11ty/eleventy-img");
const path = require("path");


async function pictureShortcode(src, cls, alt, sizes = "") {

  let imgSrc = path.join("./src/assets/images/", src);

  let metadata = await Image(imgSrc, {
    widths: [600, 1024],
    formats: ["webp", "jpeg"],
    urlPath: "/img/opt/",
    outputDir: "./_dist/img/opt/",
    filenameFormat: function (id, src, width, format, options) {
      const extension = path.extname(src);
      const name = path.basename(src, extension);
      return `${name}-${id}-${width}.${format}`;
    },
  });

  let imageAttributes = {
    class: cls,
    alt,
    sizes,
    loading:"lazy",
    decoding: "async" 
  };

  return Image.generateHTML(metadata, imageAttributes, {
    whitespaceMode: "inline",
  });
}


module.exports = function(eleventyConfig) {

  eleventyConfig.addWatchTarget('./src/tailwind.config.js');
  eleventyConfig.addWatchTarget('./src/css/*.css');

  eleventyConfig.addLiquidShortcode("picture", pictureShortcode);

  return {
    dir: {
      input: 'src',
      output: '_dist'
    }
  }

};