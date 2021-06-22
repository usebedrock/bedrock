/**
 * Bedrock production configuration
 * This object will get merged into the bedrock config object
*/

module.exports = {
  pageTree: false,
  js: {
    minify: true
  },
  css: {
    minify: true,
    purge: true,
    compiler: 'scss'
  },
  testValueOnlyInProdConfig: 'yo'
};