module.exports = (Gif) => {
  return `
  <video autoplay loop muted playsinline class="mx-auto rounded-lg">
    <source src="/videos/${Gif}" type="video/mp4" />
    Your browser does not support the video element.
  </video>`;
};

