/**
 * Bedrock configuration
 * For docs, see https://bedrockapp.org/documentation/configuration/
 * Inline docs available in the default config object
*/

module.exports = {
  pageTree: {
    layoutStyle: 'fixed' // 'sidebar' or 'fixed'
  },
  js: {
    minify: false
  },
  css: {
    compiler: 'postcss',
    minify: false,
    purge: true
  },
  styleguide: {
    categoryOrder: [
      'Style guide',
      'Design patterns',
      'Components'
    ],
    componentCategories: {
      aov: 'Overviews',
      t: 'Tailwind snippets',
      c: 'Components'
    }
  },
};
