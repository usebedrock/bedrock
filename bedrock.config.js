module.exports = {
  styleguide: {
    snippetLanguage: 'html',
    colors: './content/colors/colors.json',
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
      br: 'Bedrock components',
      c: 'Custom components'
    }
  },
  ui: {
    dark: false
  },
  icons: {
    generateIconFont: false,
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
