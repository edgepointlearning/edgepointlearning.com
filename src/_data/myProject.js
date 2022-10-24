// used in 00.base.njk to conditionally load analytics
// exposes my environmental variable from package.json
module.exports = function() {
  return {
    environment: process.env.ELEVENTY_ENV
  };
};