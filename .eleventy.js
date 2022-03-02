const Image = require("@11ty/eleventy-img");
const path = require("path");

module.exports = function(eleventyConfig) {

  eleventyConfig.addWatchTarget('./src/tailwind.config.js');
  eleventyConfig.addWatchTarget('./src/css/*.css');

  // eleventyConfig.addLiquidShortcode("picture", pictureShortcode);
  eleventyConfig.addLiquidShortcode("image", imageShortcode);

  return {
    dir: {
      input: 'src',
      output: '_dist'
    }
  }

};

const ImageWidths = {
  ORIGINAL: null,
  PLACEHOLDER: 24,
};

const imageShortcode = async (
  relativeSrc,
  alt,
  cls,
  widths = [600, 1280],
  baseFormat = 'jpeg',
  optimizedFormats = ['webp'],
  sizes = '100vw'
) => {
  const { dir: imgDir } = path.parse(relativeSrc);
  const fullSrc = path.join('src/assets/images/', relativeSrc);

  const imageMetadata = await Image(fullSrc, {
    widths: [ImageWidths.ORIGINAL, ImageWidths.PLACEHOLDER, ...widths],
    formats: [...optimizedFormats, baseFormat],
    outputDir: path.join('_dist', imgDir),
    urlPath: imgDir,
    filenameFormat: (hash, src, width, format) => {
      const suffix = width === ImageWidths.PLACEHOLDER ? 'placeholder' : width;
      const extension = path.extname(src);
      const name = path.basename(src, extension);
      return `${name}-${hash}-${suffix}.${format}`;
    },
  });

  // Map each unique format (e.g., jpeg, webp) to its smallest and largest images
  const formatSizes = Object.entries(imageMetadata).reduce((formatSizes, [format, images]) => {
    if (!formatSizes[format]) {
      const placeholder = images.find((image) => image.width === ImageWidths.PLACEHOLDER);
      // 11ty sorts the sizes in ascending order under the hood
      const largestVariant = images[images.length - 1];

      formatSizes[format] = {
        placeholder,
        largest: largestVariant,
      };
    }
    return formatSizes;
  }, {});

  // Chain class names w/ the classNames package; optional
  // const picture = `<picture class="${classNames('lazy-picture', className)}"> //removed to use without classNames
  const picture = `<picture class="lazy-picture">
  ${Object.values(imageMetadata)
    // Map each format to the source HTML markup
    .map((formatEntries) => {
      // The first entry is representative of all the others since they each have the same shape
      const { format: formatName, sourceType } = formatEntries[0];

      const placeholderSrcset = formatSizes[formatName].placeholder.url;
      const actualSrcset = formatEntries
        // We don't need the placeholder image in the srcset
        .filter((image) => image.width !== ImageWidths.PLACEHOLDER)
        // All non-placeholder images get mapped to their srcset
        .map((image) => image.srcset)
        .join(', ');

      return `<source type="${sourceType}" srcset="${placeholderSrcset}" data-srcset="${actualSrcset}" data-sizes="${sizes}">`;
    })
    .join('\n')}
    <img
      src="${formatSizes[baseFormat].placeholder.url}"
      data-src="${formatSizes[baseFormat].largest.url}"
      width="${formatSizes[baseFormat].largest.width}"
      height="${formatSizes[baseFormat].largest.height}"
      alt="${alt}"
      class="${cls} lazy-img"
      loading="lazy">
  </picture>`;

  return picture;

};

