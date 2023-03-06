function learnShortcode (title, preamble, linkText, linkUrl) {
  const learnMore = `
    <div class="rounded-lg bg-blue-200 p-4 not-prose font-sans border-b-4 border-b-sky-600 ">
      <p class="font-extrabold uppercase text-lg text-blue-900/50">${title}</p>
      <p class="my-2 leading-tight">${preamble}</p>
      <p>
        <span class="inline-block text-xl md:text-2xl leading-none align-top">👉</span>
        <a href="${linkUrl}" target="_blank" class="font-semibold underline hover:text-blue-800">${linkText}</a>
      </p>
    </div>`
  return learnMore.split('\n').map(line => line.trim()).join(' ')
};

module.exports = eleventyConfig => {

  eleventyConfig.addShortcode("learn", learnShortcode);

};