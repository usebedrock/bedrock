module.exports = {
  styleguide: {
    snippetLanguage: 'html',
    colors: './content/scss/settings/_colors.scss',
    categoryOrder: [
      'Style guide',
      'Patterns',
      'Overviews',
      'Components',
    ]
  },
  ui: {
    dark: false
  },
  icons: {
    generateIconsFromSource: false,
    hasSvgIcons: true
  },
  jade: {
    pretty: true,
    basedir: "./content"
  },
  prettify: {
    logSuccess: false,
      indentSize: 2,
      unformatted: ['pre', 'textarea'],
      extraLiners: ['body']
  },
};
