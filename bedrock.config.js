module.exports = {
  styleguide: {
    snippetLanguage: 'pug',
    colors: './content/scss/_colors.scss',
    categoryOrder: [
      'Style guide',
      'Design patterns',
      'Components',
      'Material design components'
    ],
    componentCategories: {
      aov: 'Overviews',
      mdc: 'Material design components',
    }
  },
  icons: {
    generateIconFont: false,
    iconFontPath: "./content/scss/_icon-font.scss",
    hasSvgIcons: false,
    svgIconClassPrefix: 'svg-icon',
    iconFontClassPrefix: 'if'
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
