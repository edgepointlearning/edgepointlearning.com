// https://www.npmjs.com/package/markdown-it-link-attributes
// https://giuliachiola.dev/posts/add-html-classes-to-11ty-markdown-content/

const markdownIt = require('markdown-it');
const markdownItAttrs = require('markdown-it-attrs');
const mila = require("markdown-it-link-attributes");

const markdownItOptions = {
  html: true,
  breaks: true,
  linkify: true
}

const milaOptions = {
  matcher(href, config) {
    return href.startsWith("http");
  },
  attrs: {
    target: "_blank",
    rel: "noopener",
  },
};

const markdownLib = markdownIt(markdownItOptions).use(markdownItAttrs).use(mila, milaOptions);

function markdownFilter(content) {
  const md = new markdownIt({
    html: true,
    breaks: true
  });

  return md.render(content);
};

module.exports = eleventyConfig => {
  eleventyConfig.setLibrary('md', markdownLib);
  eleventyConfig.addFilter('markdownFilter', markdownFilter);

};