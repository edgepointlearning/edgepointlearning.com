// Plugin Imports
const emojiReadTime = require("@11tyrocks/eleventy-plugin-emoji-readtime");
const metagen = require('eleventy-plugin-metagen');
const sitemap = require("@quasibit/eleventy-plugin-sitemap");
const svgSprite = require("eleventy-plugin-svg-sprite");



// Shortcode Imports
const Image = require("@11ty/eleventy-img");
Image.concurrency = 8; // default is 10
const path = require("path");
const gifShortcode = require('./src/_includes/shortcodes/gif');
const vimeoShortcode = require('./src/_includes/shortcodes/vimeo');



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



// Image
function pictureShortcode(src, alt, css, sizes = "100vw", loading = "lazy", decoding = "async", fetchpriority = "auto") {
  let url = `./src/assets/images/${src}`;
  let options = {
    widths: [420, 770, 1280],
    formats: ["webp", "jpeg"], //formats: ["svg", "avif", "webp", "jpeg"],
    urlPath: "/img/opt/",
    outputDir: "./_site/img/opt/",
  };
  Image(url, options);
  let imageAttributes = {
    alt,
    class: css,
    sizes,
    loading,
    decoding,
    fetchpriority
  };
  let metadata = Image.statsSync(url, options);
  return Image.generateHTML(metadata, imageAttributes, {
    whitespaceMode: "inline",
  });
}
// Hero video
function heroShortcode(img, mp4, css, fetchpriority = "auto") {
  let options = {
    widths: [420],
    formats: ["jpeg"],
    urlPath: "/img/opt/",
    outputDir: "./_site/img/opt/",
  };
  let url = `./src/assets/images/${img}`; // image source directory
  let vid = `/videos/${mp4}`; // video passthrough destination

  Image(url, options);
  let metadata = Image.statsSync(url, options);

  let data = metadata.jpeg[metadata.jpeg.length - 1];

  return `
  <video autoplay loop muted playsinline class="${css}" poster="${data.url}" fetchpriority="${fetchpriority}">
    <source src="${vid}" type="video/mp4" />
    Your browser does not support the video element.
  </video>
  `;
}
// Open Graph Image
function ogImageShortcode(src, baseUrl) {
  let url = `./src/assets/images/${src}`;
  let options = {
    widths: [660],
    formats: ["jpeg"],
    urlPath: "/img/og/",
    outputDir: "./_site/img/og/",
  };
  Image(url, options);

  let metadata = Image.statsSync(url, options);

  let data = metadata.jpeg[metadata.jpeg.length - 1];
  return `<meta property="og:image" content="${baseUrl}${data.url}" >`;
}



module.exports = function(eleventyConfig) {
  // https://giuliachiola.dev/posts/add-html-classes-to-11ty-markdown-content/
  eleventyConfig.setLibrary('md', markdownLib);

  //conditionally ignore files https://11ty.rocks/posts/ignore-11ty-files-with-environment-variables/
  // if (process.env.NODE_ENV === "development") {
    eleventyConfig.ignores.add("./src/collections/blog/20*/**");
  // }


  // passthrough behavior
  eleventyConfig.setServerPassthroughCopyBehavior("copy");// the default is "passthrough"
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



  // watch for changes
  eleventyConfig.addWatchTarget('./tailwind.config.js');
  eleventyConfig.addWatchTarget('./src/assets/css/*.css');
  eleventyConfig.addWatchTarget('./src/assets/sprites/');



  // Add Shortcodes
  eleventyConfig.addShortcode("ogImage", ogImageShortcode);
  eleventyConfig.addShortcode("picture", pictureShortcode);
  eleventyConfig.addShortcode("hero", heroShortcode);
  
  eleventyConfig.addShortcode("gif", gifShortcode);
  eleventyConfig.addShortcode("vimeo", vimeoShortcode);



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


  // Transforms
  eleventyConfig.addPlugin(require('./src/_11ty/html-config.js'))

  return {
    dir: {
      input: 'src',
      output: '_site'
    },
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: 'njk',
  };
};