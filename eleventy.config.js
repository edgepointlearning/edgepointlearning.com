// Plugin Imports
// const emojiReadTime = require("@11tyrocks/eleventy-plugin-emoji-readtime");
const metagen = require('eleventy-plugin-metagen');
const sitemap = require("@quasibit/eleventy-plugin-sitemap");

module.exports = function (eleventyConfig) {

  // reload dev server from postcss & esbuild output in package.json
  eleventyConfig.setServerOptions({
    watch: ["_site/assets/*.{js,css}"],
  });

  //conditionally ignore files for faster dev builds
  if (process.env.NODE_ENV === "development") {
    eleventyConfig.ignores.add("./src/collections/blog/20*/**");
  }

  // passthrough assets & custom scripts
  eleventyConfig.addPassthroughCopy({ 'src/assets/static': '/' });
  eleventyConfig.addPassthroughCopy({ 'src/assets/videos': '/videos/' });
  // passthrough behavior
  eleventyConfig.setServerPassthroughCopyBehavior("copy"); // the default is "passthrough"

  // watch for changes
  eleventyConfig.addWatchTarget('./tailwind.config.js');
  eleventyConfig.addWatchTarget('./src/assets/css/*.css');
  eleventyConfig.addWatchTarget('./src/assets/sprites/');

  // Plugins
  // eleventyConfig.addPlugin(emojiReadTime);
  eleventyConfig.addPlugin(metagen);
  eleventyConfig.addPlugin(sitemap, {
    sitemap: {
      hostname: "https://www.edgepointlearning.com",
    },
  });

  // import external configs
  eleventyConfig.addPlugin(require('./src/_11ty/filter-readTime.js'))
  eleventyConfig.addPlugin(require('./src/_11ty/filter-postdate.js'))
  eleventyConfig.addPlugin(require('./src/_11ty/filter-markdown.js'))
  eleventyConfig.addPlugin(require('./src/_11ty/shortcode-gif.js'))
  // eleventyConfig.addPlugin(require('./src/_11ty/shortcode-vimeo.js'))
  eleventyConfig.addPlugin(require('./src/_11ty/shortcode-image.js'))
  eleventyConfig.addPlugin(require('./src/_11ty/shortcode-svg.js'))
  eleventyConfig.addPlugin(require('./src/_11ty/transform-html.js'))

  eleventyConfig.addPlugin(require('./src/_11ty/shortcode-learn.js'))
  eleventyConfig.addPlugin(require('./src/_11ty/shortcode-toc.js'))

  eleventyConfig.addPlugin(require('./src/_11ty/pagefind.js'))

  return {
    dir: {
      input: 'src',
      output: '_site'
    },
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: 'njk',
  };
};