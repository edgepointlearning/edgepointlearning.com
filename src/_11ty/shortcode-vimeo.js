function vimeoShortcode (vimeoID, styles="", thumb="") {
  return `
    <div class="vi-lazyload ${styles}" data-id="${vimeoID}" data-thumb="${thumb}" data-logo="0"></div>
  `;
};

module.exports = eleventyConfig => {

  eleventyConfig.addShortcode("vimeo", vimeoShortcode);

};