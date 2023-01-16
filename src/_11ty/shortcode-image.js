const Image = require("@11ty/eleventy-img");
Image.concurrency = 8; // default is 10

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
function ogImageShortcode(src, baseUrl, schema) {
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
  if (schema) {
    return `${baseUrl}${data.url}`;
  }
  return `<meta property="og:image" content="${baseUrl}${data.url}" >`;
}


module.exports = eleventyConfig => {
  eleventyConfig.addShortcode("ogImage", ogImageShortcode);
  eleventyConfig.addShortcode("picture", pictureShortcode);
  eleventyConfig.addShortcode("hero", heroShortcode);
};