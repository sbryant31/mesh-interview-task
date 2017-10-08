/*
 * Requires specified strings as environment variables.
 * Good pattern for configuration
 *
 * Source: https://github.com/alvarcarto/url-to-pdf-api
 *
 * */
const _ = require('lodash');

function requireEnvs(arr) {
  _.each(arr, varName => {
    if (!process.env[varName]) {
      throw new Error('Environment variable not set: ' + varName);
    }
  });
}

module.exports = requireEnvs;
