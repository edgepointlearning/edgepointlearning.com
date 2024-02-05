function tocShortcode(titlesArray) {
  let listItems = '';

  // Generate list items dynamically
  for (let i = 0; i < titlesArray.length; i++) {
    listItems += `<li><a href="#section${i + 1}" class="font-semibold hover:text-blue-700">${titlesArray[i]}</a></li>`;
  }

  const tableofContents = `
    <div class="rounded-lg p-4 not-prose font-sans border-b-4 bg-edgepoint-50 border-b-slate-400 ">
      <p class="font-extrabold uppercase text-lg mb-1 text-slate-600 ">🔍 What you’ll find in this post</p>
      <ul class="list-disc list-inside">
        ${listItems}
      </ul>
    </div>
  `;

  return tableofContents.split('\n').map(line => line.trim()).join(' ');
};

module.exports = eleventyConfig => {
  eleventyConfig.addShortcode("toc", tocShortcode);
};