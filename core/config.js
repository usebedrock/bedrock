module.exports = {
  styleguide: {
    snippetLanguage: 'html',
    colors: './content/scss/settings/_colors.scss',
    showIndividualComponentsInNav: false,
    categoryOrder: [
      'Style guide',
      'Patterns',
      'Overviews',
      'Components',
    ]
  },
  icons: {
    generateIconsFromSource: true,
  },
  jade: {
    pretty: true
  },
  prettify: {
    logSuccess: false,
      indentSize: 2,
      unformatted: ['pre', 'textarea'],
      extraLiners: ['body']
  },
  patternClasses: {
    'bc-scrollable-container': ['c-sample-content-tall'],
    'bc-navbar': ['c-sample-content-tall'],
    'tooltip': ['c-sample-tooltip-visible'],
    'b-modal': ['c-sample-modal-visible'],
    'tables': ['c-sample-overflow']
  },
  modernizr: {
    minify: true,
    options: [
      'setClasses'
    ],
    'feature-detects': [
      'test/css/flexbox'
    ]
  }
};
