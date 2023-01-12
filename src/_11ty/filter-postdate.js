// https://11ty.rocks/eleventyjs/dates/#postdate-filter
// {{ page.date | postDate }} -> Nov 23, 2020

const { DateTime } = require("luxon");

module.exports = eleventyConfig => {

  eleventyConfig.addFilter("postDate", (dateObj) => {
    return DateTime.fromJSDate(dateObj).toLocaleString(DateTime.DATE_MED);
  });

};