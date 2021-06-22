/**
 * Bedrock configuration
 * For docs, see https://bedrockapp.org/documentation/configuration/ 
 * Inline docs available in the default config object
 */

module.exports = {
  pageTree: {
    layoutStyle: 'sidebar'
  },
  js: {
    minify: false
  },
  html: {
    minify: true
  },
  css: {
    compiler: 'scss',
    minify: false,
    purge: false
  },
  styleguide: {
    categoryOrder: [
      'Style guide',
      'Design patterns',
      'Components'
    ],
    componentCategories: {
      aov: 'Overviews',
      c: 'Components',
    }
  },
};
