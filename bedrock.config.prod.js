/**
 * Bedrock production configuration
 * ---
 * This object will get merged into the bedrock config object and contains specific values for production
 * Use `NODE_ENV=production npm run build` to run a production build
*/

module.exports = {
  noIndex: false,
  pageTree: false,
  styleguide: false,
  js: {
    minify: true
  },
  css: {
    minify: true,
    purge: true,
    compiler: 'scss'
  },
};