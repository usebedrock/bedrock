module.exports = {
  styleguide: {
    snippetLanguage: 'html',
    colors: './content/scss/_settings.colors.scss',
    categoryOrder: [
      'Style guide',
      'Patterns',
      'Overviews',
      'Components',
    ],
    componentCategories: {
      b: 'Bootstrap additions',
      f: 'Foundation additions',
      bc: 'Bootstrap custom components',
      fc: 'Foundation custom components',
      mdc: 'Material design components',
      br: 'Bedrock components',
      c: 'Custom components'
    }
  },
  icons: {
    generateIconFont: false,
    iconFontPath: "./content/scss/settings/_icon-font.scss",
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
