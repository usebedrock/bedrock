module.exports = {
  styleguide: {
    snippetLanguage: 'jade',
    colors: './content/scss/settings/_colors.scss',
    showIndividualComponentsInNav: false,
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
    'b-tooltip': ['c-sample-tooltip-visible'],
    'b-modal': ['c-sample-modal-visible']
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
