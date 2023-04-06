const Image = require("@11ty/eleventy-img");

async function svgIcon(src, css) {
  let url = `./src/assets/sprites/${src}`;
  let metadata = await Image(url, {
    formats: ['svg'],
    dryRun: true,
  })

  let str = metadata.svg[0].buffer.toString();
  let index = str.indexOf('>')
  if (index !== -1) {
    return str.slice(0, index) + ' class="' + css + '"' + str.slice(index);
  }

  return str
};

module.exports = eleventyConfig => {
  eleventyConfig.addNunjucksAsyncShortcode("svg", svgIcon);
};