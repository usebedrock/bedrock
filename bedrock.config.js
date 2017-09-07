module.exports = {
  styleguide: {
    snippetLanguage: 'html',
    colors: './content/scss/_settings.colors.scss',
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
    generateIconFont: false,
    hasSvgIcons: true
  },
  pug: {
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
