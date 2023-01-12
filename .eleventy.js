// Plugin Imports
const emojiReadTime = require("@11tyrocks/eleventy-plugin-emoji-readtime");
const metagen = require('eleventy-plugin-metagen');
const sitemap = require("@quasibit/eleventy-plugin-sitemap");
const svgSprite = require("eleventy-plugin-svg-sprite");

// Filters
const { DateTime } = require("luxon");
const markdownFilter = require('./src/_includes/filters/markdown-filter.js');


// Markdown
const markdownIt = require('markdown-it');
const markdownItAttrs = require('markdown-it-attrs');
const markdownItOptions = {
  html: true,
  breaks: true,
  linkify: true
}
let mila = require("markdown-it-link-attributes");
let milaOptions = {
  // https://www.npmjs.com/package/markdown-it-link-attributes
  matcher(href, config) {
    return href.startsWith("http");
  },
  attrs: {
    target: "_blank",
    rel: "noopener",
  },
};
const markdownLib = markdownIt(markdownItOptions)
  .use(markdownItAttrs)
  .use(mila, milaOptions);



module.exports = function(eleventyConfig) {


  // https://giuliachiola.dev/posts/add-html-classes-to-11ty-markdown-content/
  eleventyConfig.setLibrary('md', markdownLib);


  //conditionally ignore files
  if (process.env.NODE_ENV === "development") {
    eleventyConfig.ignores.add("./src/collections/blog/20*/**");
  }


  // passthrough assets & custom scripts
  eleventyConfig.addPassthroughCopy({'src/assets/static' : '/'});
  eleventyConfig.addPassthroughCopy({'src/assets/js' : '/js/'});
  eleventyConfig.addPassthroughCopy({'src/assets/videos' : '/videos/'});
  // passthrough node_modules
  eleventyConfig.addPassthroughCopy({'./node_modules/alpinejs/dist/cdn.min.js' : './js/alpine.min.js'});
  eleventyConfig.addPassthroughCopy({'./node_modules/@justinribeiro/lite-youtube/lite-youtube.js' : './js/lite-youtube.js'});
  eleventyConfig.addPassthroughCopy({'./node_modules/@justinribeiro/lite-youtube/lite-youtube.js.map' : './js/lite-youtube.js.map'});
  eleventyConfig.addPassthroughCopy({'./node_modules/sharer.js/sharer.min.js' : './js/sharer.min.js'});
  eleventyConfig.addPassthroughCopy({'./node_modules/clipboard/dist/clipboard.min.js' : './js/clipboard.min.js'});
  // passthrough behavior
  eleventyConfig.setServerPassthroughCopyBehavior("copy");// the default is "passthrough"
  

  // watch for changes
  eleventyConfig.addWatchTarget('./tailwind.config.js');
  eleventyConfig.addWatchTarget('./src/assets/css/*.css');
  eleventyConfig.addWatchTarget('./src/assets/sprites/');


	// Filters
  eleventyConfig.addFilter('markdownFilter', markdownFilter);
  eleventyConfig.addFilter("postDate", (dateObj) => {
    return DateTime.fromJSDate(dateObj).toLocaleString(DateTime.DATE_MED);
  });
  
  
  // Plugins
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
  

  // import external configs
  eleventyConfig.addPlugin(require('./src/_11ty/shortcode-gif.js'))
  eleventyConfig.addPlugin(require('./src/_11ty/shortcode-vimeo.js'))
  eleventyConfig.addPlugin(require('./src/_11ty/shortcode-image.js'))
  eleventyConfig.addPlugin(require('./src/_11ty/transform-html.js'))

  return {
    dir: {
      input: 'src',
      output: '_site'
    },
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: 'njk',
  };
};