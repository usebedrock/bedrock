module.exports = {
  styleguide: {
    snippetLanguage: 'html',
    colors: './content/scss/_colors.scss',
    categoryOrder: [
      'Style guide',
      'Design patterns',
      'Components'
    ],
    componentCategories: {
      c: 'Components',
      org: 'Organisms',
      aov: 'Overviews',
      u: 'Utilities'
    }
  },
  icons: {
    generateIconFont: false,
    iconFontPath: "./content/scss/_icon-font.scss",
    hasSvgIcons: true,
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
