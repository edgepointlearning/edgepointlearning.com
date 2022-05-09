// https://victorcamnerin.com/articles/parsing-markdown-in-frontmatter-for-eleventy-templates-using-filters/
// https://github.com/markdown-it/markdown-it#init-with-presets-and-options
const MarkdownIt = require('markdown-it');

module.exports = content => {
  const md = new MarkdownIt({
    html: true,
    breaks: true
  });

  return md.render(content);
};