module.exports = (mp4, styles="") => {
  return `
  <video autoplay loop muted playsinline class="${styles}">
    <source src="/videos/${mp4}" type="video/mp4" />
    Your browser does not support the video element.
  </video>`;
};

