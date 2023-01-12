// used in 00.base.njk to conditionally load analytics
// exposes my environmental variable from package.json
// https://www.11ty.dev/docs/data-js/#example-exposing-environment-variables
// When MY_ENVIRONMENT is set, the value from myProject.environment will be 
// globally available to be used in your templates. If the variable hasn’t
// been set, the fallback "development" will be used.
module.exports = function() {
  return {
    environment: process.env.NODE_ENV || "development"
  };
};