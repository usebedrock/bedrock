/**
 * Bedrock configuration
 * For docs, see https://bedrockapp.org/documentation/configuration/ 
 * Inline docs available in the default config object
*/

module.exports = {
  pageTree: {
    layoutStyle: 'sidebar',
    title: 'Prototype nav'
  },
  js: {
    minify: false
  },
  css: {
    compiler: 'scss',
    minify: false,
    purge: false
  },
  styleguide: {
    title: 'Styleguide'
    url: '/styleguide',
    homepage: '/styleguide/docs/introduction.html',
    overrideStyleguideTemplates: false,
    search: true,
    colors: './content/scss/_colors.scss',
    categoryOrder: [
      'Style guide',
      'Design patterns',
      'Components'
    ],
    componentCategories: {
      aov: 'Overviews',
      c: 'Components',
    },
    codeSamples: {
      jsx: false
    }
  },
};
