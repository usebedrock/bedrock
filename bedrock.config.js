/**
 * Bedrock configuration
 * Extends the default config object in core/discovery/config.js
 * For docs, see https://bedrockapp.org/documentation/configuration/
*/

module.exports = {
  js: {
    minify: true
  },
  css: {
    purge: true,
    compiler: 'postcss',
    minify: true
  }
};
